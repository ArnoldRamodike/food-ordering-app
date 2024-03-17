'use client'

import React, { useContext } from 'react'
import SectionHeader from '../../components/layout/SectionHeader';
import { cartContext, cartProductPrice } from '@/components/AppContext';
import Link from 'next/link'
import Image from 'next/image'
import Trash from '../../components/icons/Trash'
const Cart = () => {

  const {cartProducts, removeCartProduct} = useContext(cartContext);

  return (
    <section className='mt-8'>
      <div className="text-center">
        <SectionHeader MainHeader={'Cart'}/>
      </div>
 
      <div className='grid gap-4 grid-cols-2'>
        <div>
          {cartProducts?.length === 0 && (
            <div className="">NO PRoducts in your shopping cart <Link className='button' href={'/menu'}> Shop</Link> </div>
          )}
          {cartProducts?.length > 0 && cartProducts.map((product, index) =>(
            <div className="flex" key={product.id}>
              <div className="w-24 gap-4 mb-2 border-b py-2 items-center">
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
        </div>
        <div>
            right
        </div>
      </div>
    </section>
  )
}

export default Cart