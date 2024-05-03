import React, { useEffect, useState } from 'react'
import './home.css'
import Table18 from './Table18'
import Table20 from './Table20'

const Split1820 = () => {

    return (
        <div className='split'>
            <div className='left'>
                <Table18 />
            </div>
            <div className='right'>
                <Table20 />
            </div>
        </div>
    )
}

export default Split1820
