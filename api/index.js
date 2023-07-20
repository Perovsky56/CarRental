const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('./models/User.js');
const Car = require('./models/Car.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jsonWebTokenSecret = 'fas89fag89qjfascvknqw89asdoiuqwjsda';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req,res) => {
    const {name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req,res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passwordOK = bcrypt.compareSync(password, userDoc.password);
        if (passwordOK){
            jsonWebToken.sign({
                email:userDoc.email,
                id:userDoc._id
            }, jsonWebTokenSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(userDoc);
            });
        } else {
            res.status(422).json('hasło niepoprawne');
        }
    } else {
        res.status(422).json('nie znaleziono');
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token){
        jsonWebToken.verify(token, jsonWebTokenSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await User.findById(userData.id);

            res.json({name, email, _id});
        })
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
})

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i=0; i < req.files.length; i++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);
});

app.post('/cars', (req, res) => {
    const {token} = req.cookies;
    const {
        title, engineType, gearBoxType,
        prodYear, seats, addedPhotos,
        description, features, extraInfo,
        kilLimit, price,
    } = req.body;
    jsonWebToken.verify(token, jsonWebTokenSecret, {}, async (err, userData) => {
        if (err) throw err;
        const carDoc = await Car.create({
            owner:userData.id,
            title,
            engineType,
            gearBoxType,
            prodYear,
            seats,
            photos:addedPhotos,
            description,
            features,
            extraInfo,
            kilLimit,
            price,
        });
        res.json(carDoc);
    });
});

app.get('/user-cars', (req, res) => {
    const {token} = req.cookies;
    jsonWebToken.verify(token, jsonWebTokenSecret, {}, async (err, userData) => {
        const {id} = userData;
        res.json( await Car.find({owner:id}) );
    });
});

app.get('/cars/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await Car.findById(id));
});

app.put('/cars', async (req, res) => {
    const {token} = req.cookies;
    const {
        id, title, engineType, gearBoxType,
        prodYear, seats, addedPhotos,
        description, features, extraInfo,
        kilLimit, price,
    } = req.body;
    jsonWebToken.verify(token, jsonWebTokenSecret, {}, async (err, userData) => {
        if (err) throw err;
        const carDoc = await Car.findById(id);
        if (userData.id === carDoc.owner.toString()){
            carDoc.set({
                title,
                engineType,
                gearBoxType,
                prodYear,
                seats,
                photos:addedPhotos,
                description,
                features,
                extraInfo,
                kilLimit,
                price,
            });
            await carDoc.save();
            res.json('ok');
        }
    });
});


app.get('/cars', async (req, res) => {
    res.json(await Car.find());
})

app.listen(4000);

