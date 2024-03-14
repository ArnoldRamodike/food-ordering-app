import React, { useState } from 'react'
import Trash from '@/components/icons/Trash';
import Plus from '@/components/icons/Plus';
import Up from '@/components/icons/ChevronUp';
import Down from '@/components/icons/ChevronDown';

export default function MenuItemsPriceProps ({name,addLabel, props, setProps})  {

    const [isOpen, setIsOpen] = useState(false);

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, {name:'', price:0}];
        }) 
    }

    function editProp(ev, index, prop) {
        const newValue = ev.target.value;
        setProps(prevSized => {
            const newSizes = [...prevSized];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    function removeProp(indexToRemove){
        setProps(prev => prev.filter((v, index) =>
        index !== indexToRemove));
    }
  
  return (
    <div className='bg-gray-200 p-2 rounded-md mb-2'>

            <button type='button' className='inline-flex p-1 justify-start' onClick={() => setIsOpen(prev => !isOpen)}>              

                <span className='text-gray-700'>{name}</span> 
                <span className='text-gray-700'>({props?.length})</span> 
                {isOpen && ( 
                    <Up/>
                )}
                 {!isOpen && ( 
                    <Down/> 
                )}
            </button>
            <div className={isOpen ? 'block' : 'hidden'}>
            
     
        {props?.length > 0 && props.map((size, index) => (
          <div className='flex items-end gap-2' key={index}>
            <div>
                <label>Name</label>
                <input type='text' placeholder='Size nname' value={size.name} onChange={ev => editProp(ev, index, 'name' )}/>
            </div>
            <div>
            <label>Size price</label>
                <input type='text' placeholder='Extra Price' value={size.price} onChange={ev => editProp(ev, index, 'price')}/>
            </div>
            <div>
                <button type='button' onClick={() => removeProp(index)} className='bg-white mb-2 px-0'><Trash/></button>
            </div>

         </div>
    ))}
    <button type='button' onClick={addProp} className='bg-white items-center'> 
        <Plus className='w-4 h-4'/> {addLabel}
    </button>
    </div>    
  </div>
  )
}
