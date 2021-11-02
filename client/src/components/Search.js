import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import axios from 'axios'


const Search = () => {
    const [location, setLocation] = useState("")
    const[dataStatus, setDataStatus] = useState("")
    
    const onLocationChange = (e) => {
        setDataStatus("")
        setLocation(e.target.value)
    }

    const onUpdateSubmit = async (e) => {
        e.preventDefault()
        setDataStatus("........ Loading")
        try {
            const res = await axios.post('/airdata/update', { station: location })
            if (res) {
                setDataStatus("Data updated! Click Update Button")
                return res
            }
        } catch (err) {
            setDataStatus("No data to update!")
            return err
        }
    }

    const onAddClick = async () => {
        setDataStatus("Loading ........... ")
    }
    
    return (
        <div className="formLayout">
            <Form onSubmit={onUpdateSubmit}>
                <FormGroup>
                    <Label>Enter the location: {location}</Label>
                    <Input onChange={onLocationChange} />
                    <br></br>
                    <p>
                        UpdataDB Status:
                        <span id="renderRed">{dataStatus}</span>
                    </p>
                </FormGroup>
                    {
                        <Link to={'/display'}>
                            <div className="formSub">
                                <Button color="danger" onClick={onAddClick}>
                                Update Data
                                </Button>
                            </div>
                        </Link>
                    }
            </Form>
        </div>
    )
}

export default  Search;