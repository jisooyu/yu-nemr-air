import React, {useState, createContext} from 'react'

export const AuthContext = createContext()

const initState ={
    auth: false
}

export const AuthContextProvider = props => {
    const [state, setState] = useState(initState)
    return <AuthContext.Provider value={[state, setState]}>{props.children}</AuthContext.Provider>
}