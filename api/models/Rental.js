const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    car: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Car'},
    user: {type:mongoose.Schema.Types.ObjectId, required:true},
    collectCar: {type:Date, required:true},
    returnCar: {type:Date, required:true},
    name: {type:String, required:true},
    mobile: {type:String, required: true},
    price: Number,
    withTransport: Boolean,
    pickupCoordinates: {type:String, required: false},
    returnCoordinates: {type:String, required: false},
});

const RentalModel = mongoose.model('Rental', rentalSchema);

module.exports = RentalModel;