const express = require('express');
const dotenv = require('dotenv');
const {conn,db} = require('./utils/db');
const { urlencoded } = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const path = require('path');


//importing routes 
const authRoutes = require('./routes/authRoutes');
const homeRoutes = require('./routes/homeRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const eventRoutes = require('./routes/eventRoutes');
const publicationRoutes = require('./routes/publicationRoutes');
const getInvolvedRoutes = require('./routes/getInvolvedRoutes');
const contactRoutes = require('./routes/contactRoutes');
const registrationRoutes = require('./routes/registrationRoutes');
const imageRoutes = require('./routes/imageRoute');
const footerRoutes = require('./routes/footerRoutes');





//set dotenv path
dotenv.config({path:'./utils/.env'})

//initialize app
const app = express();

//connect database
conn();


//middlewares
app.use(urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())
//enable cors
app.use(cors());

// //set static folder
var publicDir = require('path').join(__dirname,'/public'); 
app.use(express.static(publicDir)); 




//setting up routes
app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/aboutUs', aboutUsRoutes);
app.use('/event', eventRoutes);
app.use('/publication', publicationRoutes);
app.use('/getInvolved', getInvolvedRoutes);
app.use('/contactUs', contactRoutes);
app.use('/member', registrationRoutes);
app.use('/image', imageRoutes);
app.use('/footer',footerRoutes );


app.set("port", process.env.PORT || 5000)








//listen app
app.listen(process.env.PORT || 5000,()=>{
    console.log('App is listening in port 5000')
})