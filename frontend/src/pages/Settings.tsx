import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import useSettings from "../hooks/useSettings";
import { useSettingsContext } from "../context/SettingsContext";
import { useState } from "react";

const Settings = () => {
  const { saving, save, resetting, reset } = useSettings();
  const { settings } = useSettingsContext();
  const [updatedSettings, setUpdatedSettings] = useState(settings) || null;
  const style = `flex p-2 mx-6 my-2 p-6 font-semibold justify-between rounded-xl bg-cryptext-gray h-16"`

  return (
    <div className='flex flex-col overflow-hidden xl:w-1/2 lg:w-full h-3/4 border rounded-lg border-cryptext-gray'>
      <div className='flex gap-2 bg-cryptext-white/90 min-h-20 items-center px-4 py-2 mb-2 text-xl text-cr'>
        <Link to='/'><IoArrowBackOutline className='text-cryptext-red hover:text-cryptext-green w-8 h-8'/></Link>
        <p className='w-full font-bold text-cryptext-black text-2xl text-center'>Settings</p>
      </div>
      <div className="h-full">
        <div className={style}>
          24-Hour Time Format
          <div className="flex gap-3">
            <div>Off</div>
            <input
              type="checkbox"
              className="toggle toggle-error"
              checked={updatedSettings?.timeFormat || false}
              onClick={() => setUpdatedSettings({...updatedSettings, timeFormat: !updatedSettings?.timeFormat || false})}
              onChange={(e) => {}}
            />
            <div>On</div>
          </div>
        </div>
      </div>
      <div className="p-8 flex justify-end gap-4">
      <button
          onClick={() => {reset(); setUpdatedSettings(null)}}
          className='btn mt-auto flex start bg-cryptext-red/80 text-cryptext-white'
        >
          { 
          resetting ? <><span className='loading loading-spinner'></span> Resetting </>
          :
          <>
            <GrPowerReset className='w-4 h-4 mr-2 text-cryptext-white'/>
            Reset
          </>
          }
        </button>
        <button
          onClick={() => save(updatedSettings)}
          className='btn mt-auto flex start bg-cryptext-red/80 text-cryptext-white'
        >
          { 
          saving ? <><span className='loading loading-spinner'></span> Saving </>
          :
          <>
            <FaCheck className='w-4 h-4 mr-2 text-cryptext-white'/>
            Save
          </>
          }
        </button>
      </div>
    </div>
  )
};

export default Settings;