import Image from 'next/image'
import React from 'react'

function loading() {
    return (
        <div style={{
            width: '100%',
            height: '100%'
        }}>
            <Image src={'/videos/loading.gif'} fill alt={'loading'} />
        </div>
    )
}

export default loading