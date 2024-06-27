import React, { useEffect, useState } from 'react'
import './home.css'
import Table1 from './Table1'
import Table2 from './Table2'

const Split12 = () => {

    return (
        <div className='split'>
            <div className='left'>
                <Table1 />
            </div>
            <div className='right'>
                <Table2 />
            </div>
        </div>
    )
}

export default Split12
