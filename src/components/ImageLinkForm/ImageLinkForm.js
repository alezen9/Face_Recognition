import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'This magic brain will detect faces in your pictures, give it a try!'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 shadow-5'>
                    <input className='pa2 w-70 center roundInput' type='text' onChange={onInputChange} />
                    <button className='w-30 grow link ph3 pv2 dib white bg-orange roundDetect' onClick={onButtonSubmit} >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;