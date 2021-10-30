import React from 'react';
import { Col, Card, CardImg, CardTitle, ListGroup, ListGroupItem} from 'reactstrap'


const DisplayCards = ({ location, time, pm10, pm25, no2 }) => {
  const clearSky = 'images/clean-air.jpeg'
  const graySky = "images/dirty_air.jpeg"
  const perplexed = "images/perplexed.jpeg"

  
  let cardImage =  ( pm10 <=55 || pm25 <= 25) ? clearSky : graySky
  if (pm10 ==="-" || pm25 ==="-"){
    cardImage = perplexed
  }
  const bg = (pm10 !== "-" || pm25 !== "-") && pm25 <= 35 ? '#a2eaf8' : "#dbd8e3"
  
  return (
<Col sm="4" >
      <Card body style={{ width: '18rem', backgroundColor: bg  }} key={time.toString()}>
          <CardImg className="card-image-resizing" src={cardImage} top width="100%"/>
              <CardTitle className="title text-center">{ location } 측정치</CardTitle>
          <ListGroup variant="flush">
            <ListGroupItem> { time } </ListGroupItem>
            <ListGroupItem>pm10: { pm10 } ㎍/m³</ListGroupItem>
            <ListGroupItem>pm2.5: { pm25 } ㎍/m³</ListGroupItem>
            <ListGroupItem>no2: { no2 } ㎍/m³</ListGroupItem>
          </ListGroup>
      </Card>
    </Col>
  )


}

export default DisplayCards;