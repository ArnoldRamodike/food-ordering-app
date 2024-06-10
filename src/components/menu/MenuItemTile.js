import Image from 'next/image';
import React from 'react'

export default function MenuItemTile  ({onAddToCart, ...item}){
    const {image, name, description, basePrice, sizes, extraIngridientPrices } = item;
  return (
    <div className="bg-gray-300 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <div className="text-center h-40 ">
            <Image className="block mx-auto aspect-square object-cover h-full rounded-lg" src={image} alt={'Meal'} width={200} height={100}/>
        </div>

        <h4 className="font-semibold my-3 text-xl">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-1"> {description}</p>
        <button className="mt-4 bg-primary text-white px-4 py-4" type='button' onClick={onAddToCart}> 
            {(sizes?.length > 0 || extraIngridientPrices?.length > 0) ? (
                <span>Add to Cart (From R{basePrice}) </span>
            ) : (
                <span>add to cart R{basePrice}</span>
            )}
   
        </button>
    </div>
  )
}

