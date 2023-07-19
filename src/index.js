import express from "express";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import { Video } from "./model/video.model.js";
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 2002;

app.get("/", async (req, res) => {
  res.send("server is working");
});

// to save youtube data in the server
app.post("/saveData", async (req, res) => {
   getYouTubeData();
  const savedData = await Video.create(videoDataArr);
  res.send(savedData);
});

// endpoint to get data from database
app.get("/getData", async (req, res) => {
  const page = 1; // Get the page number from the query parameter
  const pageSize = 10; // Get the page size from the query parameter
  const sortField = "publishedAt"; // Get the field to sort by from the query parameter
  const sortOrder = -1;
  try {
    const videoData = await Video.find({})
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    res.status(200).send({ videoData });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// endpoint to search form video stored in database
app.get("/search", async (req, res) => {
  const query = req.body.query;
  console.log({ query });
  const searchKeyword = {
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  };

  const page = 1; // Get the page number from the query parameter
  const pageSize = 10; // Get the page size from the query parameter
  const sortField = "publishedAt"; // Get the field to sort by from the query parameter
  const sortOrder = -1;

  try {
    const searchedData = await Video.find(searchKeyword)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.status(200).send(searchedData);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

const SearchQuery = "latest news";
let videoDataArr = [];

// to get latest data from youtube
const getYouTubeData = async () => {
  try {
    const res = await axios.get(
      `${process.env.BASE_URL}${process.env.API_KEY}&type=video&q=${SearchQuery} &maxResults=5&part=snippet`
    );

    const items = res.data.items;
    let arr = items.map((item) => {
      let dateStr = res.data.items[0].snippet.publishedAt;
      const timestamp = Date.parse(dateStr);
      return {
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: timestamp,
        thumbnail: item.snippet.thumbnails.default.url,
      };
    });
    videoDataArr = [...arr];
    console.log({ videoDataArr });
  } catch (err) {
    console.log(err.message);
  }
};

// to start the server with mongo connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("port 2002 running");
    });
  })
  .catch((err) => console.log(err.message));
