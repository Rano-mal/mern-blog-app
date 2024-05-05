const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const { MongoClient } = require("mongodb");

// Initialing the Middleware.
// We use to have to install Body Parser but now it is a built in middleware function of express.
// It parses incoming JSON payload...
app.use(express.json({ extended: false }));

const withDB = async (operation, res) => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://ranom4047:x2AHYAgLQ2feu1oy@mern-blog-db.mpubt1u.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog-db"
    );
    const db = client.db("mern-blog-db");
    await operation(db);
    client.close();
  } catch (error) {
    console.error("Error connecting to db:", error);
    res
      .status(500)
      .json({ message: "Error connecting to db", error: error.message });
  }
};

app.get("/api/articles/:name", async (req, res) => {
  console.log("Fetching article:", req.params.name);
  withDB(async (db) => {
    const articleName = req.params.name;
    const collection = db.collection("articles");
    const articleInfo = await collection.findOne({ articleName: articleName });
    res.status(200).json(articleInfo);
  }, res);
});

app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    const updateAricleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updateAricleInfo);
  }, res);
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

// Just for test a Route for Now
// app.get('/', (req, res) => res.send("Hello, Duniya!"));
// app.post('/', (req, res) => res.send(`Hello ${req.body.name}`))
// app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`))
