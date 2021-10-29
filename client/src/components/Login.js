import React, {useEffect, useContext} from 'react'
import {Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

import axios from 'axios'

const Login = () => {
    const [state, setState] = useContext(AuthContext)

    useEffect(() => {
        console.log("state inside useEffect", state)
        async function fetchUser(){
            const res = await axios.get('/api/current_user')
             console.log("res inside useEffect", res)
            res.data === "" ? setState(false) : setState(res.data)
        }
        fetchUser()
    }, [])
    const auth= state
    const renderContent = () => {
        switch (auth) {
            case false:
                return <a href="/auth/google">Login With Google </a>;
            default:
                return (
                    <>
                        <Link to={"/display"}>Display</Link>
                        <Link to={"/search"}>Search</Link>
                        <a href="/api/logout">Logout</a>
                    </>
                );

        }
    }
    return (
        <div className="header">
            <p>{renderContent()}</p>
        </div>
    )
}

export default Login