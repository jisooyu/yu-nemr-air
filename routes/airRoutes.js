const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const Air = mongoose.model('airs')

const axdata = require( '../publicDataAPI/axiosFetch' )

module.exports = app => {
    app.post( '/airdata/update', requireLogin, async ( req, res ) => {
        try {
            await axdata(req.body.station, ( error, { airquality } = {} ) => {
                
                Air.findOne( { time: airquality.time, location:airquality.location }, ( err, doc ) => {
                    if ( doc ) {
                        res.status(302).send( "Duplicate document exists" )
                    } else {
                        const air = new Air( {
                            location, time, pm10, pm25, no2
                        } = airquality  )
                        air.save()
                        // res.send('Air quality data are saved.')
                        res.send(air)
                    }
                } )
            } )
        } catch ( e ) {
            res.status( 400 ).send( e )
        }
    })
    
    app.get('/airdata/display', requireLogin, async (req, res) => {
        try {
            const airdata = await Air.find({})
            res.send(airdata)
        } catch (e) {
            res.status(500).send()
        }
    })

    app.get('/airdata/Date/:date', async (req, res) => {
        const measureDate = req.params.date
        try {
            const air = await Air.find({time:{$regex:measureDate}})
            if (!air) {
                return res.status(404).send()
            }
            res.send(air)
        } catch (e) {
            res.status(500).send()
        }
    } )

    app.get('/airdata/Time/:time', async (req, res) => {
        const measureTime = req.params.time
        
        try {
            const air = await Air.find( { time: measureTime })
            if (!air) {
                return res.status(404).send()
            }
            res.send(air)
        } catch (e) {
            res.status(500).send()
        }
    } )

    app.get('/airdata/:id', async (req, res) => {
        const dataID = req.params.id
        console.log("dataID from /airdata/:id", dataID)
        try {
            const air = await Air.find( { _id: dataID })
            console.log("air from /airdata/:id", air)
            if (!air) {
                return res.status(404).send()
            }
            res.send(air)
        } catch (e) {
            res.status(500).send()
        }
    } )

    app.delete('/airdata/:time', async (req, res) => {
        try {
            const air = await Air.findByIdAndDelete(req.params.time)

            if (!air) {
                res.status(404).send()
            }

            res.send(air)
        } catch (e) {
            res.status(500).send()
        }
    })
}
