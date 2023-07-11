const mongoose = requrire('mongoose');

const carSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    engineType: String,
    gearBoxType: String,
    prodYear: Number,
    seats: Number,
    photos: [String],
    descritpion: String,
    features: [String],
    extraInfo: String,
    kilLimit: Number,
});

const CarModel = mongoose.model('Car', carSchema);

module.exports = CarModel;