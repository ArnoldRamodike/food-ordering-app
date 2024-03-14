import React from 'react'
import Trash from '@/components/icons/Trash';
import Plus from '@/components/icons/Plus';

export default function MenuItemsPriceProps ({name,addLabel, props, setProps})  {

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
        <label>{name}</label>
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
  )
}
