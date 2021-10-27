import React, {useState, createContext} from 'react'

export const AirDataContext = createContext()

export const AirDataContextProvider = props => {
    const [airData, setAirData] = useState ("")
    return <AirDataContext.Provider value={[airData, setAirData]}>{props.children}</AirDataContext.Provider>
}
