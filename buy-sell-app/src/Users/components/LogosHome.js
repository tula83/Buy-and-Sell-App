import React from 'react'
import '../CSS/logos.css'

const LogosHome = ({galleryImages}) => {
return (
        <div className='all'>
<h3 >Brands Available</h3>
        
            <div className='galleryWrap'>
                
                {
                    galleryImages && galleryImages.map((slide, index) => {
                        return (
                            <div className='single' key={index} >
                                <img src={slide.img} alt='' />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )

}

export default LogosHome;