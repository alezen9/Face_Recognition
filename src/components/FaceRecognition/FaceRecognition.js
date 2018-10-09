import React from 'react';
import './FaceRecognition.css'

const showFaces = (array,s) => {
    if(array){
        return Array.from(array).map((el,index) => {
            return <div key={index} className='bounding_box grow' style={{top: el.topRow, right: el.rightCol, bottom: el.bottomRow, left: el.leftCol, display: s}}></div>
        })
    }
}

const FaceRecognition = ({imageUrl, box, show}) => {
    return (
        <div className='center'>
            <div className='absolute mt2 photoDiv'>
                <img id='inputImage' className='photo' src={imageUrl} alt='' />
                {showFaces(box,show)}
            </div>
        </div>
    );
}

export default FaceRecognition;