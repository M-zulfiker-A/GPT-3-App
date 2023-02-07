import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField , Loader } from '../Components'
import { getRandomPrompts } from '../utils'
import { preview } from '../assets'

const CreatePost = () => {
  const navigate = useNavigate()
  const [postLoading , setpostLoading] = useState(false)
  const [form, setForm] = useState({
    name : '',
    prompt : '',
    photo : ''
  })
  const handleChange =()=>{

  }
  const handleSubmit =()=>{

  }
  const handleSurpriseMe = () =>{

  }
  return (
    <section className='max-width-7xl mx-auto'>
      <div>
      <div>
        <h1 className='font-extrabold text-black text-[2rem]'>Create Images</h1>
        <p className='mt-2 text-[#666e75] text-[1rem] max-w-[500px]'>Create your pwn beautiful images with the help of Dall - E AI</p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            LabelName="Your Name"
            type = "text"
            name="name"
            placeholder = "Tony Stark"
            value = {form.name}
            handleChange={handleChange}
          />
          <FormField 
            LabelName="Prompt"
            type = "text"
            placeholder = "a macro 35mm photograph of two mice in Hawaii, they're each wearing tiny swimsuits and are carrying tiny surf boards, digital art"
            value = {form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe ={handleSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:rong-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img 
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain opacity-40'
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {postLoading && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-black rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
      </form>
      </div>
    </section>
  )
}

export default CreatePost