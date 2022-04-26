import { ClassNames } from '@emotion/react'
import React from 'react'
import "./EditDog.css"

const EditDog = (props) => {
  return (
    <div className='EditDog'>
        <h1 className='EditDog--header'>Edit dog</h1>
        <form className='EditDog--form'>
            <input type="text" name="name" placeholder='Cashtan'/>
            <input type="text" name="breed" placeholder='Mixed'/>
            <input type="text" name="age" placeholder='4 years'/>
            <textarea placeholder='Vivamus eleifend est pharetra metus fringilla, in vehicula est sagittis. 
            ellentesque sem mauris, porta non dolor eget, condimentum viverra metus. Donec tincidunt tortor turpis, nec malesuada libero cursus fermentum.'/>
            <div className='EditDog--buttons'>
                <input type="button" value="Upload a picture"/>
                <input type="submit" value="Finish"/>
            </div>
        </form>
        <h1>Dog's id: {props.dogId}</h1>
    </div>


  )
}

export default EditDog