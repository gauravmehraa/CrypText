import { ChangeEventHandler } from "react"

const Gender = (props: { onUpdate: ChangeEventHandler<HTMLInputElement>, selectedGender: string }) => {
  return (
    <div className='flex mt-2'>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer ${props.selectedGender==="Male"? "selected": ""}`}>
          <span className='label-text'>Male</span>
          <input
            type='checkbox'
            className="checkbox checkbox-error border-slate-900"
            checked={props.selectedGender === "Male"}
            value="Male"
            onChange={(e) => props.onUpdate(e)}
          />
        </label>
      </div>
      <div className='form-control'>
      <label className={`label gap-2 cursor-pointer ${props.selectedGender==="Female"? "selected": ""}`}>
          <span className='label-text'>Female</span>
          <input 
            type='checkbox'
            className="checkbox checkbox-error border-slate-900"
            checked={props.selectedGender === "Female"}
            value="Female"
            onChange={(e) => props.onUpdate(e)}
          />
        </label>
      </div>
    </div>
  )
}

export default Gender
