import React , {useState, useEffect} from 'react'
import  {Cards , Loader , FormField} from "../Components"
const Home = () => {
  const [Loading , setLoading ] = useState(false)
  const [searchText, setsearchText] = useState("")
  const [allPosts , setallPosts] = useState([])
  const [searchedResults , setsearchedResults] = useState([])
  const [debouncedSearch , setdebouncedSearch] = useState(null)
  useEffect(()=>{
    (async function fetchdata(){
      try {
        setLoading(true)
        const Postsdata = await fetch('https://gpt3-myapp.onrender.com/api/v1/post',
        {
          method : "GET",
          headers : {
          'Content-Type' : 'application/json',
          },
        })
        if(Postsdata.ok){
          const Posts = await Postsdata.json()
          setallPosts(Posts.data.reverse())
        }
        
      } catch (error) {
        alert("Error Loading Posts"+ error)
      }finally{
        setLoading(false)
      }
    })()
  },[])

  const handleSearchChange = (e)=>{
    clearTimeout(debouncedSearch)
    setsearchText(e.target.value)
    setdebouncedSearch(
      setTimeout(()=>{
        const filteredItems = allPosts.filter(post => post.prompt.toLowerCase().includes(searchText.toLowerCase()) || post.name.toLowerCase().includes(searchText.toLowerCase()))
        setsearchedResults(filteredItems)
      },500)
    )
    
  }
  const RenderBody = ({data, title}) => {
    if(data.length > 0){
      return data.map(post => <Cards key={post._id} {...post}/>)
    }
    return(
      <h2 className='mt-5 font-bold text-[#6339ff] text-xl uppercase'>
        {title}
      </h2>
    )
  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-black text-[2rem]'>The Community Gallery</h1>
        <p className='mt-2 text-[#666e75] text-[1rem] max-w-[500px]'>Browse through the collection of some awesome artworks generated by Dall - E AI</p>
      </div>
      <div  className='mt-[1rem]'>
        <FormField 
          LabelName="Search Photo"
          name="search"
          type="text"
          placeholder="Search posts"
          value={searchText}
          handleChange = {handleSearchChange}
        />
      </div>
      <div  className='mt-[1rem]'>
        {
          Loading ? <Loader /> :
          <>
            {
              searchText && 
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Showing results for <span className='text-black'>{searchText}</span>
              </h2>
            }
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {
                searchText ? 
                  <RenderBody 
                    data = {searchedResults}
                    title = "No Search Results Found"
                  /> :
                  <RenderBody 
                    data = {allPosts}
                    title="No Posts Found"
                  />
              }
            </div>
          </>
        }
      </div>
    </section>
  )
}

export default Home