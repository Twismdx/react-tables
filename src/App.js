import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Table16 from './Table16.js'
import Table17 from './Table16.js'
import Table18 from './Table16.js'
import Table19 from './Table16.js'
import Table20 from './Table16.js'
import Table21 from './Table16.js'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/table16" component={Table16} />
        <Route path="/table17" component={Table17} />
        <Route path="/table18" component={Table18} />
        <Route path="/table19" component={Table19} />
        <Route path="/table20" component={Table20} />
        <Route path="/table21" component={Table21} />
        {/* Add more routes if you have more versions */}
      </Switch>
    </Router>
  )
}

export default App
