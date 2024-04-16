import React, { useEffect, useState } from 'react'
import EditableImage from '@/components/layout/EditableImage';
import MenuItemPriceProps from '@/components/layout/MenuItemsProps'
import ImageUpload from '@/components/layout/image-upload'

export default function MenuItemForm ({onSubmit, menuItem}) {

    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [category, setCategory] = useState(menuItem?.category || '')
    const [extraIngridientPrices, setExtraIngridientPrices] = useState(menuItem?.extraIngridientPrices || []);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
      fetch('/api/categories').then(res => {
        res.json().then(categories => {
        setCategories(categories)
        });
      });
    }, [])
    

    return (
    <>
        <form onSubmit={ ev => onSubmit(ev, {image, name, description, basePrice, sizes, extraIngridientPrices, category})} 
            className="mt-8 max-w-2xl mx-auto">
         <div className='grid items-start gap-4' style={{gridTemplateColumns: '.3fr .7fr'}}>
            <div>
                {/* <EditableImage link={image} setLink={setImage}/> */}
                <ImageUpload link={image} setLink={setImage}/>
            </div>

            <div className='grow'>
             <label>Item name</label> 
             <input type='text' value={name} onChange={ev => setName(ev.target.value)}/> 
             <label>Description</label> 
             <input type='text'  value={description} onChange={ev => setDescription(ev.target.value)}/> 
             <label>Category</label> 
             <select value={category} onChange={ev => setCategory(ev.target.value)}>
              {categories?.length > 0 && categories.map(c => (
                <option value={c._id}>{c.name}</option>
              ))}
              </select>
             <label>Base price</label> 
             <input type='text'  value={basePrice} onChange={ev => setBasePrice(ev.target.value)}/> 

             <MenuItemPriceProps name={'Sizes'} addLabel={'Add Item size'} props={sizes} setProps={setSizes} />
             <MenuItemPriceProps name={'Ingridientpricess'} addLabel={'Add Ingridient size'} props={extraIngridientPrices} setProps={setExtraIngridientPrices} />
              <button className='mb-2' type='submit'>Save</button> 
            </div>
         </div>   
        </form>
    </>
  )
}

