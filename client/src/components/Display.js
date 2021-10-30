import React, { useEffect, useContext } from 'react';

import { Container, Row } from 'reactstrap';
import DisplayCards from './DisplayCards';

import axios from 'axios'
import { AirDataContext } from '../contexts/AirDataContext';

const Display = () => {
    const [airData, setAirData] = useContext(AirDataContext)
    // fetching the air data 
    useEffect( ()=> {
        async function fetchData (){
            const res = await axios.get('/airdata/display')
            setAirData(res.data)
        }
        fetchData()
    },[])
    
    let air = airData
    if (air){
        return (
            <div className="heading-menu">
                <h1 className="heading-h1">서울시 공기 정보</h1>
                <p className="heading-p">공기청정도 정보는 매시간마다 갱신됩니다. </p>
                <p className="heading-p">출처: 공공데이터포털</p>
                    <Container>
                        <Row>
                            {
                                air.sort((a, b) => a.time <= b.time ? 1:-1).map(
                                    (air) =><DisplayCards { ...air } key={air._id} />
                                )
                            }
                        </Row>
                    </Container>
            </div>        
        )
    }
    return <div> Loading... </div>
}


export default Display;