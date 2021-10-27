import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import {AuthContextProvider} from '../contexts/AuthContext'
import {AirDataContextProvider} from '../contexts/AirDataContext'
import Login from './Login'
import Display from './Display'
import Search from './Search'


const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthContextProvider>
          <AirDataContextProvider>
              <Login />
              <Route exact path="/display" component={ Display } />
              <Route exact path="/search" component={ Search }  />
          </AirDataContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

  
export default App;
  