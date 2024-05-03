import React, { useEffect, useState } from 'react'
import './home.css'
import Table18 from './Table18'
import Table21 from './Table21'

const Split1821 = () => {

    return (
        <div className='split'>
            <div className='left'>
                <Table18 />
            </div>
            <div className='right'>
                <Table21 />
            </div>
        </div>
    )
}

export default Split1821
