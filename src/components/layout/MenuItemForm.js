import React, { useState } from 'react'
import EditableImage from '@/components/layout/EditableImage';
import Trash from '@/components/icons/Trash';
import Plus from '@/components/icons/Plus';

export default function MenuItemForm ({onSubmit, menuItem}) {

    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [Sizes, setSizes] = useState([])
    
    function addSize() {
        setSizes(oldSizes => {
            return [...oldSizes, {name:'', price:0}];
        }) 
    }

    function editSize(ev, index, prop) {
        const newValue = ev.target.value;
        setSizes(prevSized => {
            const newSizes = [...prevSized];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    function removeSize(indexToRemove){
        setSizes(prev => prev.filter((v, index) =>
        index !== indexToRemove));
    }
  
    return (
    <>
        <form onSubmit={ ev => onSubmit(ev, {image, name, description, basePrice})} 
            className="mt-8 max-w-md mx-auto">
         <div className='grid items-start gap-4' style={{gridTemplateColumns: '.3fr .7fr'}}>
            <div>
                <EditableImage link={image} setLink={setImage}/>
            </div>

            <div className='grow'>
             <label>Item name</label> 
             <input type='text' value={name} onChange={ev => setName(ev.target.value)}/> 
             <label>Description</label> 
             <input type='text'  value={description} onChange={ev => setDescription(ev.target.value)}/> 
             <label>Base price</label> 
             <input type='text'  value={basePrice} onChange={ev => setBasePrice(ev.target.value)}/> 

             <div className='bg-gray-200 p-2 rounded-md mb-2'>
                <label>Sizes</label>
                {Sizes?.length > 0 && Sizes.map((size, index) => (
                    <div className='flex items-end gap-2' key={index}>
                        <div>
                            <label>Size name</label>
                            <input type='text' placeholder='Size nname' value={size.name} onChange={ev => editSize(ev, index, 'name' )}/>
                        </div>
                        <div>
                        <label>Size price</label>
                            <input type='text' placeholder='Extra Price' value={size.price} onChange={ev => editSize(ev, index, 'price')}/>
                        </div>
                        <div>
                            <button type='button' onClick={() => removeSize(index)} className='bg-white mb-2 px-0'><Trash/></button>
                        </div>

                    </div>
                ))}
                <button type='button' onClick={addSize} className='bg-white items-center'> 
                    <Plus className='w-4 h-4'/> Add Size price
                </button>
             </div>
             <button className='mb-2' type='submit'>Save</button> 
            </div>
         </div>   
        </form>
    </>
  )
}

