import React, { useEffect, useState } from 'react'
import './home.css'
import Table19 from './Table19'
import Table20 from './Table20'

const Split1920 = () => {

    return (
        <div className='split'>
            <div className='left'>
                <Table19 />
            </div>
            <div className='right'>
                <Table20 />
            </div>
        </div>
    )
}

export default Split1920
