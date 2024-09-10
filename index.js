import express from "express";
import bodyParser from "body-parser";
import { getData, insertData } from "./db.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let negara = [];
  const countries = await getData(`select country_code from visited_country`);
  const total = await getData(`select count(id) from visited_country`);

  countries.forEach(data=>{
    negara.push(data.country_code);
})
  res.render('index.ejs', {
    total: total[0].count,
    countries: negara,
  });
});

app.post("/add", async (req, res) => {
  insertData(req.body.country);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
