import React from "react"
import './UploadDogPic.css';

export default function UploadDogPic() {
    return (
        <div className="UploadDogPic">
            <h1 className="header">Upload your dog's picture</h1>
            <span className="UploadDogPic--circle"> </span>
            <button className="UploadDogPic--Button">
                <img className="UploadDogPic--btnimg" src = {require('../../Images/send.png')} />
                <p className="UploadDogPic--btntext">Upload a picture</p>
            </button>
            <button className="UploadDogPic--Button">
               <p className="UploadDogPic--btntext">Finish</p>
            </button>
        </div>

    )
}