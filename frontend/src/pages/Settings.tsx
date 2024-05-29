import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import useSettings from "../hooks/useSettings";
import { useSettingsContext } from "../context/SettingsContext";
import { useState } from "react";
import Setting from "../components/Setting";

const Settings = () => {
  const { saving, save, resetting, reset } = useSettings();
  const { settings } = useSettingsContext();
  const [updatedSettings, setUpdatedSettings] = useState(settings) || null;

  return (
    <div className='flex flex-col mx-4 sm:mx-0 overflow-hidden w-full max-sm:-mt-16 lg:w-3/5 h-fit border rounded-lg border-cryptext-gray'>

      <div className='flex gap-2 bg-cryptext-white/90 h-12 sm:h-20 items-center px-4 py-2 mb-2 text-xl text-cr'>
        <Link to='/'><IoArrowBackOutline className='text-cryptext-red hover:text-cryptext-green w-6 h-6 sm:w-8 sm:h-8'/></Link>
        <p className='w-full font-semibold text-cryptext-black text-lg sm:text-xl text-center mr-6 sm:mr-8'>Settings</p>
      </div>
      
      <div className="h-full">
        <Setting title="24-Hour Time Format" leftText="Off" rightText="On">
          <input
            type="checkbox"
            className="toggle toggle-error toggle-sm sm:toggle-md"
            checked={updatedSettings?.timeFormat || false}
            onClick={() => setUpdatedSettings({...updatedSettings, timeFormat: !updatedSettings?.timeFormat || false})}
            onChange={(e) => {}}
          />
        </Setting>
        <Setting title="Show Dates on Messages" leftText="Off" rightText="On">
          <input
            type="checkbox"
            className="toggle toggle-error toggle-sm sm:toggle-md"
            checked={updatedSettings?.dateStamp || false}
            onClick={() => setUpdatedSettings({...updatedSettings, dateStamp: !updatedSettings?.dateStamp || false})}
            onChange={(e) => {}}
          />
        </Setting>
      </div>

      <div className="p-8 flex justify-end gap-4">
        <button
          onClick={() => {reset(); setUpdatedSettings(null)}}
          className='btn mt-auto flex start bg-cryptext-red/80 text-cryptext-white'
        >
          { 
          resetting ?
          <>
            <span className='loading loading-spinner'></span> Resetting
          </>
          :
          <>
            <GrPowerReset className='w-4 h-4 mr-2 text-cryptext-white'/> Reset
          </>
          }
        </button>
        <button
          onClick={() => save(updatedSettings)}
          className='btn mt-auto flex start bg-cryptext-red/80 text-cryptext-white'
        >
          { 
          saving ?
          <>
            <span className='loading loading-spinner'></span> Saving
          </>
          :
          <>
            <FaCheck className='w-4 h-4 mr-2 text-cryptext-white'/> Save
          </>
          }
        </button>
      </div>
    </div>
  )
};

export default Settings;