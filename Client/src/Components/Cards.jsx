import React from 'react'
import { downloadImage } from '../utils'
import { download } from '../assets'

const Cards = ({_id , name , prompt , photo}) => {
  return (
    <div className='rounded-xl group relative card shadow-card hover:shadow-cardhover'>
      <img
        className='object-cover w-full h-auto rounded-xl'
        src={photo} 
        alt={prompt}
      />
      <div className='group-hover:flex flex-col max-h-[50%] hidden absolute bottom-0 left-0 right-0 bg-black m-1 p-4 rounded-md'>
        <p className='text-white text-sm overflow-y-auto prompt'>{prompt}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='bg-green-700 rounded-full w-7 h-7 flex items-center text-white font-bold text-xs justify-center'>{name[0]}</div>
            <p className='text-white text-sm'>{name}</p>
          </div>
          <img className='object-cover w-7 h-7 invert' onClick={()=> downloadImage(_id , photo)} src={download} alt="download image" />
        </div>
      </div>
    </div>
  )
}

export default Cards