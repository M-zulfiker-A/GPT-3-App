import React from 'react'

const Cards = ({key , Posts}) => {
  console.log(Posts.photo)
  return (
    <img src={Posts.photo} />
  )
}

export default Cards