import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Table16 from './Table16.js'
import Table17 from './Table17.js'
import Table18 from './Table18.js'
import Table19 from './Table19.js'
import Table20 from './Table20.js'
import Table21 from './Table21.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/table16" element={<Table16 />} />
        <Route path="/table17" element={<Table17 />} />
        <Route path="/table18" element={<Table18 />} />
        <Route path="/table19" element={<Table19 />} />
        <Route path="/table20" element={<Table20 />} />
        <Route path="/table21" element={<Table21 />} />
        {/* Add more routes if you have more versions */}
      </Routes>
    </Router>
  )
}

export default App