import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config';
import { PostgressDB } from "./db.js";

const app = express();
const port = 3000;
const db = new PostgressDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET HOME
app.get("/", async (req, res) => {
  let countryCode = [];
  let countryName = [];
  const codeQuery = await db.getData('*', 'visited_country');
  const nameQuery = await db.getOptionData();
  const total = await db.getData('count(id)', 'visited_country');

  codeQuery.forEach(data=>{
    countryCode.push(data.country_code);
  });
  nameQuery.forEach(data=>{
    countryName.push(data.country_name);
  });
  res.render('index.ejs', {
    options: countryName,
    total: total[0].count,
    countries: countryCode,
  });
});

// ADD COUNTRY
app.post("/add", async (req, res) => {
  db.insertData(req.body.country).then((data) => {
    if(data==true) {
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
