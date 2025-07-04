import Image from 'next/image'
import React from 'react'

function Card() {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <Image
      src=""
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  )
}

export default Card