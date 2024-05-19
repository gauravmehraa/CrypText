import { useState } from 'react'
import toast from 'react-hot-toast';
import { useSettingsContext } from '../context/SettingsContext';

const useSettings = () => {
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const { setSettings } = useSettingsContext();

  const save = async(updatedSettings: any) => {
    if(resetting || saving){
      toast.error("Settings are already being updated")
      return; 
    }
    setSaving(true);
    try{
      setSettings(updatedSettings);
      localStorage.setItem("cryptext-settings", JSON.stringify(updatedSettings));
      toast.success("Settings successfully saved");
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setSaving(false);
    }
  }

  const reset = async() => {
    if(resetting || saving){
      toast.error("Settings are already being updated")
      return; 
    }
    setResetting(true);
    try{
      setSettings(null);
      localStorage.removeItem("cryptext-settings");
      save({});
      toast.success("Settings successfully reset");
    }
    catch (error){
      toast.error((error as Error).message);
    }
    finally{
      setResetting(false);
    }
  }

  return {save, saving, reset, resetting};
}
export default useSettings;
