const mongoose = require( 'mongoose' )
const { Schema } = mongoose;

const airSchema = new Schema({

    location: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: false
    },
    pm10: {
        type: String,
        required: true,
        trim: true
    },
    pm25: {
        type: String,
        required: true,
        trim: true
    },
    no2: {
        type: String,
        required: false,
        trim: true
    },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }
})

mongoose.model('airs', airSchema)
