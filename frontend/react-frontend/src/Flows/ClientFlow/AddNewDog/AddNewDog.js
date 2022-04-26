import { ClassNames } from '@emotion/react'
import React from 'react'
import "./AddNewDog.css"

const AddNewDog = (props) => {
  return (
    <div className='AddNewDog'>
        <h1 className='AddNewDog--header'>Add new dog</h1>
        <form className='AddNewDog--form'>
            <input type="text" name="name" placeholder='Name' className='name'/>
            <input type="text" name="breed" placeholder='Breed'/>
            <input type="text" name="age" placeholder='Age'/>
            <textarea placeholder='Description'/>
            <div className='AddNewDog--buttons'>
                <input type="button" value="Upload a picture"/>
                <input type="submit" value="Finish"/>
            </div>
        </form>
    </div>


  )
}

export default AddNewDog