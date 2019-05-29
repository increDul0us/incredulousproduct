const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter
});

let Product = require('./productmodel');

app.use(cors());
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  
// //Set up default mongoose connection
// var mongoDB = 'mongodb://localhost/products';
// mongoose.connect(mongoDB, {
//     useNewUrlParser: true
// });

// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// //perform db function
// db.once('open', function () {
//     // we're connected!
//     console.log('connected');
// });

Router.get('/', (req, res) =>{
    Product.find(function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json(product);
        }
    });
});

Router.get('/:id', (req, res) =>{
  let id = req.params.id;
    Product.findById(id, function(err, product) {
        res.json(product);
    });
});

Router.post('/add', upload.single('product_image'), (req, res) =>{
  const data = fs.readFileSync(req.file.path);
  const contentType = "image/jpeg";
  const { product_name, product_description, product_category, product_color, product_price} = req.body;
  if (!product_name || !product_description || !product_category || !product_color || !product_price || !data) {
    res.json({ "error": 'enter all fields' });
  }else {
    let product = new Product({
        _id: new mongoose.Types.ObjectId(),
        product_name, product_description, product_category, product_color, product_price, 
        product_image: {data, contentType}
    });
      product.save()
      res.json({ product: 'product added successfully' });
  }
});
app.use('/products', Router);

if (process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(process.env.PORT || 4000, function(){
  console.log("Server is running on Port:  %d in %s mode", this.address().port, app.settings.env);
});