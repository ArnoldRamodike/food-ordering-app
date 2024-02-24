import React from 'react'

function MenuItem() {
  return (
    <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <div className="text-center">
            <img className="max-h-auto max-h-24 block mx-auto" src={'/pizza.png'} alt={'salads'}/>
        </div>
    
    <h4 className="font-semibold my-3 text-xl">Peperoni Pizza</h4>
    <p className="text-gray-500 text-sm"> Best pizza in town</p>
    <button className="mt-4 bg-primary text-white px-4 py-4"> 
        Add to cart $12
    </button>
   </div>
  )
}

export default MenuItem