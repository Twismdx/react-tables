import React, { useEffect, useState } from 'react'
import './home.css'
import Table1 from './Table1'
import Table2 from './Table2'

const Split12 = () => {

    return (
        <div className='split'>
            <div className='left'>
                <Table1 split={true} />
            </div>
            <div className='right'>
                <Table2 split={true} />
            </div>
        </div>
    )
}

export default Split12
