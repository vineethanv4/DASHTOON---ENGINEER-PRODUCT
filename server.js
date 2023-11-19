import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Blob } from 'buffer'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import multer from 'multer'

globalThis.Blob = Blob
const app = express();
// const upload = multer();
const PORT = process.env.PORT || 5000;

// app.use(express.json());
app.use(express.static('public'));
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use((req, res, next) => {
  console.log('Request size:', req.get('Content-Length'));
  next();
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

mongoose.connect("mongodb://localhost:27017/<database>", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database schema
const comicPostSchema = new mongoose.Schema({
  username: String,
  panels: [String],
  comic_name: String,
  images: [String],
});

const ComicPost = mongoose.model('ComicPost', comicPostSchema);

//new route to fetch unique comic names
app.get('/fetch-comic-names', async (req, res) => {
  try {
    console.log("Backend fetching names");
    const uniqueComicNames = await ComicPost.distinct('comic_name');
    res.json(uniqueComicNames);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//new route to fetch details about specific comic
app.get('/fetch-comic/:comicName', async (req, res) => {
  try {
    const { comicName } = req.params;
    const comicData = await ComicPost.findOne({ comic_name: comicName }).lean();
    res.json(comicData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/fetch-comic-posts', async (req, res) => {
  try {
    const comicPosts = await ComicPost.find({}, { username: 1, panels: 1, images: 1 }).lean();
    res.json(comicPosts);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// new route to save the created comic
app.post('/save-comic-post', upload.none(), async (req, res) => {
  // const { username, panels, images } = req.body;
  // console.log("vineeth");
  // console.log(username);
  // console.log(panels);
  // console.log(images);
  console.log(req.body);
  try {
    const { username, panels, comic_name } = req.body;
    // const images = req.files.map(file => file.buffer.toString('base64'));
    console.log(username);
    // console.log(req.body.image_1);
    // const images = String(req.body.image_1);
    const images = [];
    for (let i = 1; i <= 10; i++) {
      const base64String = req.body[`image_${i}`];
      if (base64String) {
        images.push(base64String);
      }
    }
    // console.log(images);
    const comicPost = new ComicPost({ username, panels, comic_name, images });
    await comicPost.save();

    res.json({ success: true, message: 'Comic post data saved successfully' });
  } catch (error) {
    console.log("here is the error")
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// new route to generate the images from input text
app.post('/generate-comic', async (req, res) => {
  const { username, panels } = req.body;
  // const comicPost = new ComicPost({username, panels });
  // await comicPost.save();
  async function query(data) {
    console.log(data);
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.arrayBuffer();
    return result;
  }
  const images = [];
  const promises = panels.map(panel => {
    return query({ inputs: panel })
      .then(response => {
        // Use image
        const uint8Array = new Uint8Array(response);
        const base64String = Buffer.from(uint8Array).toString('base64');
        images.push(base64String);
        console.log(uint8Array);
        const blob = new Blob([uint8Array], { type: 'image/png' }); // Adjust the MIME type as needed
        const dataURL = URL.createObjectURL(blob);
        console.log(dataURL);
        console.log(response);
        console.log(1);
      })
      .catch(error => {
        console.error('Error generating image:', error);
        // Handle errors as needed
      });
  });

  Promise.all(promises)
    .then(() => {
      console.log(images);
      res.json({
        success: true,
        message: 'Comic images generated successfully',
        images: images,
      });
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });

});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
