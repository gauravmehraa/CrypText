import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Settings from './pages/Settings';

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className='sm:p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/'>
          <Route index element={authUser? <Home/>: <Navigate to='/login'/>}/>
          <Route path='login' element={authUser? <Navigate to='/'/>: <Login/>}/>
          <Route path='signup' element={authUser? <Navigate to='/'/>: <SignUp/>}/>
          <Route path='settings' element={authUser? <Settings/>: <Navigate to='/login'/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
