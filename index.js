import express from "express";
import bodyParser from "body-parser";
import { PostgressDB } from "./db.js";

const app = express();
const port = 3000;
const db = new PostgressDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let negara = [];
  const countries = await db.getData(`select country_code from visited_country`);
  const total = await db.getData(`select count(id) from visited_country`);

  countries.forEach(data=>{
    negara.push(data.country_code);
})
  res.render('index.ejs', {
    total: total[0].count,
    countries: negara,
  });
});

app.post("/add", async (req, res) => {
  db.insertData(req.body.country);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
