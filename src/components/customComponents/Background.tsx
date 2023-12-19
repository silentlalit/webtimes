import React from 'react'

const Background = () => {
    return (
        <div style={{ position: 'relative', zIndex: -1 }}>
            <div className='background_wrapper' />
            <div className='top_dot sticky_dot' />
            <div className='left_dot sticky_dot' />
            <div className='right_dot sticky_dot' />
        </div>
    )
}

export default Background;