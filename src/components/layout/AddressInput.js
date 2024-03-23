import React from 'react'

const AddressInput = ({addressProps, setAdressProp}) => {
    const {phone, country, city, streetAddress, postalCode} = addressProps;
  return (
    <>
        <input type='tel' placeholder='Phone number' value={phone} onChange={ev => setAdressProp('phone', ev.target.value)} />
        <input type='text' placeholder='Street address'  value={streetAddress} onChange={ev => setAdressProp('streetAddress', ev.target.value)} />
        <div className='flex gap-2 py-2'> 
          <input type='text' placeholder='City'  value={city} onChange={ev => setAdressProp('city', ev.target.value)}  style={{margin: '0'}}/>
          <input type='text' placeholder='Postal code'  value={postalCode} onChange={ev => setAdressProp('postalCode', ev.target.value)} style={{margin: '0'}}/>
        </div>
        
        <input type='text' placeholder='Country'  value={country} onChange={ev => setAdressProp('contry', ev.target.value)} />
    </>
  )
}

export default AddressInput