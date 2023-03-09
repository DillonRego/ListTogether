const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// Add mongdb user services
const listServices = require("./models/task-services");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/lists', async (req, res) => {
  const { userUuid } = req.query;
  try {
    const lists_from_db = await listServices.getLists(userUuid);
    res.send({ tasks_list: lists_from_db });
  } catch (error) {
    console.log('Mongoose error: ' + error);
    res.status(500).send('An error ocurred in the server.');
  }
});

app.get('/lists/:id', async (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = await listServices.findListById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else
        res.send({ tasks_list: result });
});

app.post("/lists", async (req, res) => {
    console.log("received post request")
    const list = req.body;
    const savedList = await listServices.addList(list);
    if (savedList)
        res.status(201).send(savedList);
    else 
        res.status(500).end();
});

app.delete("/lists/:id", async (req, res) => {
    console.log("received delete request");
    const id = req.params["id"];
    console.log(id);
    if (deleteListById(id))
        res.status(204).end();
    else
        res.status(404).send("Resource not found.");
});

async function deleteListById(id) {
    try {
        if (await taskServices.deleteList(id)) return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/*image requests start here*/

// Create a schema for the images
const imageSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
});

// Create a model for the images
const Image = mongoose.model('Image', imageSchema);

// Configure multer to store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Define a route for handling image uploads
app.post('/upload', upload.single('image'), (req, res, next) => {
    // Create a new image from the request data
    const newImage = new Image({
      name: req.body.name,
      data: req.file.buffer,
      contentType: req.file.mimetype
    });
  
    // Save the image to MongoDB
    newImage.save((err, image) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send('Image saved successfully');
    });
});

// Define a route for retrieving images
app.get('/images/:id', (req, res, next) => {
    // Find the image by ID in MongoDB
    Image.findById(req.params.id, (err, image) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!image) {
        return res.status(404).send('Image not found');
      }
  
      // Send the image data as a response with the appropriate Content-Type header
      const formattedImage = (image => ({
        _id: image._id.toString(),
        data: image.data.toString('base64'),
        contentType: image.contentType,
        filename: image.filename,
      }));
      res.send(formattedImage(image));
    });
});

app.get('/images', async (req, res) => {
    try {
      const images = await Image.find();
      const formattedImages = images.map(image => ({
        _id: image._id.toString(),
        data: image.data.toString('base64'),
        contentType: image.contentType,
        filename: image.filename,
      }));
      res.send(formattedImages);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
});

//image requests end here

app.listen(process.env.PORT || port, () => {
    if (process.env.PORT) {
        console.log(`REST API is listening on port: ${process.env.PORT}.`);
    } else console.log(`REST API is listening on port: ${port}.`);
});