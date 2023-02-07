import React from 'react'

const FormField = ({LabelName , name , isSurpriseMe , placeholder , type , handleSurpriseMe , handleChange, value}) => {
  return (
    <div>
      <div className='flex items-center mb-2 gap-2'>
        <label
          htmlFor={name}
          className="text-sm block font-medium text-gray-900">
            {LabelName}
          </label>
        {isSurpriseMe && 
          <button type="button" onClick={handleSurpriseMe} className='font-semibold text-xs py-1 px-2 rounded-[5px] text-black bg-[#ECECF1]'>Surprise Me</button>
        }
      </div>
      <input
        id={name}
        type ={type}
        name = {name}
        placeholder = {placeholder}
        onChange ={handleChange}
        value = {value}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
      />

    </div>
  )
}

export default FormField