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
  const [loading,setLoading] = useState(false)
  const handleChange= (e) => {
    setForm({...form , [e.target.name] : e.target.value})
  }
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!form.photo || !form.prompt) alert("Please Generate a Photo before trying to share")
    setLoading(true)
    try {
      const postsData = await fetch('https://gpt3-myapp.onrender.com/api/v1/post',
      {
        method : "POST",
        headers : {
        'Content-Type' : 'application/json',
        },
        body : JSON.stringify(form)
      })
      const posts = await postsData.json()
      console.log(posts)
      navigate("/")
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }

  }
  const handleSurpriseMe = () =>{
    const randomPrompt = getRandomPrompts(form.prompt)
    setForm({...form, prompt : randomPrompt})
  }
  const generateImage = async() =>{
    if(form.prompt){
      setpostLoading(true)
      try{
        const image = await fetch("https://gpt3-myapp.onrender.com/api/v1/dalle",
          {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',
            },
            body : JSON.stringify({prompt : form.prompt})
          }
        )
        const Imagedata = await image.json()
        console.log(Imagedata)
        setForm({...form , photo : `data:image/jpeg;base64,${Imagedata.photo}`})
      }catch(err){
        alert(err)
      }finally{
        setpostLoading(false)
      }
      
    }else{
      alert("please enter a Prompt")
    }
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
            name = 'prompt'
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
                className='w-full h-full object-contain'
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {postLoading && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-black rounded-lg opacity-50'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button 
            type='button'
            onClick={generateImage}
            className='text-white text-sm w-full sm:w-auto px-5 py-2.5 bg-green-700 rounded-md font-medium'>
              {postLoading ? 'Genrating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created your image, you can share it with others in the community</p>
          <button 
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-6 py-2.5 text-center'>
              {loading ? 'Sharing...' : 'Share with the Commnity'}
            </button>
        </div>
      </form>
      </div>
    </section>
  )
}

export default CreatePost