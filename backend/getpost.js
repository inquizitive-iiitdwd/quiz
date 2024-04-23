import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import pg from "pg"

const app = express();
const port = 1000;

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT","PATCH","DELETE"]
  }));

  const dbConfig = {
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "Mahesh@1802",
    port: 4000, // Corrected port number for PostgreSQL
  };
  
  const db = new pg.Client(dbConfig);//one of the difference from my code
  db.connect()
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error("Error connecting to database:", err));

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Write your code here//
console.log("hello")
//CHALLENGE 1: GET All posts
app.get("/posts",async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM post");
    console.log(result.rows)
    res.json(result.rows); // Sending array of questions as JSON response
  } catch (err) {
    console.error("Error getting post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
 
});
//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id",async(req,res)=>{
  const ide=parseInt(req.params.id);
  try {
    const result = await db.query("SELECT * FROM post WHERE id=($1)",[ide]);
    console.log(result.rows)
    res.json(result.rows); // Sending array of questions as JSON response
  } catch (err) {
    console.error("Error getting post:", err);
    res.status(500).json({ error: "Internal server error" });
  }
})

//CHALLENGE 3: POST a new post
app.post("/posts",(req,res)=>{
  console.log(req.body)
  const newpost={
    id: posts.length+1,
    title: req.body.title,
    content:req.body.content,
    author: req.body.author,
    date: req.body.date,
  }
  posts.push(newpost)
  //console.log(newpost)
  res.json(newpost)
})
//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id",(req,res)=>{
  const ide=parseInt(req.params.id);
  const exitingpost=posts.find((m)=>m.id===ide)
  const replacepost={
    id:ide,
    title: req.body.title || exitingpost.title,
    content:req.body.content || exitingpost.content,
    author: req.body.author || exitingpost.author,
    date: req.body.date,
  }
  const foundpostindex=posts.findIndex((m)=>m.id===ide)
   posts[foundpostindex]=replacepost
   console.log(replacepost)
   res.json(replacepost)
})
//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id",(req,res)=>{
  const ide=parseInt(req.params.id);
  const foundpostindex=posts.findIndex((m)=>m.id===ide)
  if(foundpostindex>-1){
posts.splice(ide-1,1)
res.json(posts)
  }else{
res.status(404).send('id not found')
  }
})

console.log(port)
app.listen(port, () => {
  console.log(`getpost.js API is running at http://localhost:${port}`);
});
