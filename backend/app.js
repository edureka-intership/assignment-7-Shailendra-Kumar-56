const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();

const routes = require ('./Routes/index');
const paymentRoutes = require("./Controller/payment");

dotenv.config();

const port = process.env.PORT || 5600;
const hostname = 'localhost';
const dbUrl = 'mongodb://127.0.0.1:27017/zomato';
const atlasDbUrl = 'mongodb+srv://shailendra:HdcWIDNIxNxIkC82@cluster0.uo0vhft.mongodb.net/zomato?retryWrites=true&w=majority'

//const atlasDbUrl = 'mongodb+srv://user_56:7ggxEKPWJ0b5iRvX@cluster0.ujnvih3.mongodb.net/zomato_db56?retryWrites=true&w=majority'


//user_56
//7ggxEKPWJ0b5iRvX

const corsOptions ={
    origin:'http://localhost:4000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use ('/', routes);

mongoose.connect(atlasDbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
})

.then( res => {
    app.listen(port, hostname, () => {
        console.log(`Server is running at ${hostname}:${port}`)
    });
})
.catch(err => console.log(err));