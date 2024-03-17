'use client'

import React, { useContext } from 'react'
import SectionHeader from '../../components/layout/SectionHeader';
import { cartContext, cartProductPrice } from '@/components/AppContext';
import Link from 'next/link'
import Image from 'next/image'
import Trash from '../../components/icons/Trash'
const Cart = () => {

  const {cartProducts, removeCartProduct} = useContext(cartContext);
  let total = 0;

  for(const p of cartProducts){
   
    total += cartProductPrice(p);

  }
console.log(total);
  return (
    <section className='mt-8'>
      <div className="text-center">
        <SectionHeader MainHeader={'Cart'}/>
      </div>
 
      <div className='mt-4 grid gap-4 grid-cols-2'>
        <div>
          {cartProducts?.length === 0 && (
            <div className=" text-center gap-4 py-8">NO PRoducts in your shopping cart <Link className='button m-4' href={'/menu'}> View our menu Items</Link> </div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) => (
            <div className="flex items-center gap-4 mb-2 border-b py-2" key={product.id}>
              <div className="w-24 ">
                  <Image src={product.image} alt='Cart Image' width={240} height={240}/>
              </div>
              <div className="text-centre">
                  <h3 className='font-semibold'>{product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-700">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                   {product.extraIngridientPrices?.length > 0 && (
                       
                    <div className="text-sm text-gray-500 ">              
                       {product.extraIngridientPrices.map(extra => (
                        <div>{extra.name} ${extra.price}</div>
                      ))}
                    </div>
                  )}
              </div>
              <div className='text-lg font-semibold'>
                 ${cartProductPrice(product)}
              </div>
              <div className='ml-2'>
                  <button className='p-2' type='button' onClick={() => removeCartProduct(index) }><Trash/></button>
              </div>
            </div>
          ))}
          <div className='py-4 text-right pr-16'>
            <span className='text-gray-500'> SubTotal: </span> <span className='text-lg font-semibold'>{total}</span>
          </div>
        </div>
        <div>
            right
        </div>
      </div>
    </section>
  )
}

export default Cart