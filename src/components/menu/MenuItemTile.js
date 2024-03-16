import React from 'react'

export default function MenuItemTile  ({onAddToCart, ...item}){
    const {image, name, description, basePrice, sizes, extraIngridientPrices } = item;
  return (
    <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <div className="text-center">
            <img className="max-h-auto max-h-24 block mx-auto" src={image} alt={'Meal'}/>
        </div>

        <h4 className="font-semibold my-3 text-xl">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-3"> {description}</p>
        <button className="mt-4 bg-primary text-white px-4 py-4" type='button' onClick={onAddToCart}> 
            {(sizes?.length > 0 || extraIngridientPrices?.length > 0) ? (
                <span>Add to Cart (From ${basePrice}) </span>
            ) : (
                <span>add to cart ${basePrice}</span>
            )}
   
        </button>
    </div>
  )
}

