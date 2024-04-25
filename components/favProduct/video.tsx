import React from 'react'

const Video = () => {
    console.log("")
    return (
        <div className="relative w-full min-h-full">
            <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full">
                <video autoPlay loop typeof="video/mp4" src={"/images/favProducts/vid.mp4"} className='h-full object-cover w-full' />
            </div>
        </div>
    )
}

export default Video