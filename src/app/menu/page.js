'use client'

import React, { useEffect, useState } from 'react'
import SectionHeader from '../../components/layout/SectionHeader';
import MenuItem from '../../components/menu/MenuItem';

const MenuPage = () => {

    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
     fetch('/api/categories').then(res => {
        res.json().then( categories => setCategories(categories))
     });
    }, []);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
           res.json().then( menuitems => setMenuItems(menuitems))
        });
       }, [])
    
  return (
    <section className='mt-8'>
        {categories?.length > 0 && categories.map( c => (
         <div key={c._id}>
                <div className='text-center'>
                    <SectionHeader MainHeader={c.name}/>
                </div>
      
            <div className='grid grid-cols-3 gap-4 mt-6 mb-12'>
            {menuItems.filter(menuitem => menuitem.category === c._id).map(item => (
                <MenuItem {...item} key={item._id}/>
                ))} 
            </div>
        </div>
        ))}
    </section>
  )
}

export default MenuPage