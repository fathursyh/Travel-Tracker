import pg from 'pg';

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  password: "12345",
  database: "worlds",
  port: 5433
});


db.connect();
export const getData = async(query) => {
  let result = await db.query(query);
  return result['rows'];
};

export const insertData = async(body) => {
  const country_code = await db.query(`select code from country_code where lower(country_name) = '${body.toLowerCase()}'`);

  db.query(`insert into visited_country(country_code) values('${country_code['rows'][0].code}')`).catch((err) => {
    console.error(err);
  });
}