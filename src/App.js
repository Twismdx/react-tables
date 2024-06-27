import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Table1 from './Table1.js'
import Table2 from './Table2.js'
import Split12 from './Split1-2.js'
import Table16 from './Table16.js'
import Table17 from './Table17.js'
import Table18 from './Table18.js'
import Table19 from './Table19.js'
import Table20 from './Table20.js'
import Table21 from './Table21.js'
import Split1617 from './Split19-21.js'
import Split1820 from './Split18-20.js'
import Split1821 from './Split18-21.js'
import Split1920 from './Split19-20.js'
import Split1921 from './Split19-21.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/table1" element={<Table1 />} />
        <Route path="/table2" element={<Table2 />} />
        <Route path="/split1-2" element={<Split12 />} />
        <Route path="/table16" element={<Table16 />} />
        <Route path="/table17" element={<Table17 />} />
        <Route path="/table18" element={<Table18 />} />
        <Route path="/table19" element={<Table19 />} />
        <Route path="/table20" element={<Table20 />} />
        <Route path="/table21" element={<Table21 />} />
        <Route path="/split16-17" element={<Split1617 />} />
        <Route path="/split18-20" element={<Split1820 />} />
        <Route path="/split18-21" element={<Split1821 />} />
        <Route path="/split19-20" element={<Split1920 />} />
        <Route path="/split19-21" element={<Split1921 />} />
        {/* Add more routes if you have more versions */}
      </Routes>
    </Router>
  )
}

export default App