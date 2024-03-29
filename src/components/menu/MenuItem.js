import React, { useContext, useState } from 'react'
import { cartContext } from '../AppContext'
import toast from "react-hot-toast";
import MenuItemTile from './MenuItemTile';
import Image from 'next/image'

function MenuItem(menuItem) {
  const {image, name, description, basePrice, sizes, extraIngridientPrices} = menuItem;
  const {addToCart} = useContext(cartContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  function handleExtraClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras(prev => [...prev, extraThing]);
    }else{
      setSelectedExtras(prev => {
        return  prev.filter(e => e.name !== extraThing.name)
      });
    }
  }

  function handleAddToCartbuttonClick() {

    const hasOptions = sizes.length > 0 && extraIngridientPrices.length > 0;
    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      return
    }

      addToCart(menuItem, selectedSize, selectedPrice);
      setShowPopUp(false);
      toast.success('added to cart');
  }

  let selectedPrice = basePrice;
  if (selectedSize) {
  selectedPrice+= selectedSize.price;
  }
  if (selectedExtras) {
    for(const extra of selectedExtras){
      selectedPrice += extra.price;
    }
  }



  return (
    <>
      {showPopUp && (
        <div onClick={() => setShowPopUp(false)} className='fixed inset-0 bg-black/80 flex items-center justify-center'>
          <div onClick={ev => ev.stopPropagation()} className='my-8 bg-white p-2 rounded-lg max-w-md '>
            <div className='overflow-y-scroll p-2' style={{maxHeight: 'calc(100vh - 100px)'}}>
              <Image src={image} alt={'Product image'} width={300} height={200} className='mx-auto'/>
              <h2 className='text-lg font-bold text-center mb-2'>{name}</h2>
              <p className='text-center text-gray-500 text-sm mb-2'>{description}</p>
              {sizes?.length > 0 && (
                <div className='p-2'> 
                  <h3 className='text-center text-gray-700'>Add Extras</h3>
                  {sizes.map(size => (
                    <label className='flex items-center gap-2 p-4 border rounded-md mb-1' key={1}>
                      <input type='radio' name='size' onClick={() => setSelectedSize(size)} checked={selectedSize?.name === size.name}/> 
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}
              {extraIngridientPrices?.length > 0 && (
                <div className=' p-2'> 
                <h3 className='text-center text-gray-700'>Pick your size</h3>
                {extraIngridientPrices.map(ingridient => (
                  <label className='flex items-center gap-4 p-4 border rounded-md mb-1' key={1}>
                    <input type='checkbox' name={ingridient.name} onClick={ev => handleExtraClick(ev, ingridient)}/> 
                    {ingridient.name} +${ingridient.price}
                  </label>
                ))}
              </div>  
              )}
               <button type='button' onClick={handleAddToCartbuttonClick}
                className='bg-primary text-slate-100 sticky bottom-2'>
                 Add to cart ${selectedPrice}
                </button>
              <button className='mt-2' onClick={() => setShowPopUp(false)}>Cancel</button>
            </div>
        
          </div>
        </div>
      )}
     <MenuItemTile onAddToCart={handleAddToCartbuttonClick}  {...menuItem}/>
   </>
  )
}

export default MenuItem