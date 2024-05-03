import React, { useEffect, useState } from 'react'
import './home.css'
import Table19 from './Table19'
import Table21 from './Table21'

const Split1921 = () => {

    return (
        <div className='split'>
            <div className='left'>
                <Table19 />
            </div>
            <div className='right'>
                <Table21 />
            </div>
        </div>
    )
}

export default Split1921
