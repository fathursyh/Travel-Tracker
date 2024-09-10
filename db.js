import pg from 'pg';

export class PostgressDB {
  constructor() {
    this.db = new pg.Client({
      user: "postgres",
      host: "localhost",
      password: "12345",
      database: "worlds",
      port: 5433
    });
    this.db.connect();
  }

  getData = async(query) => {
    let result = await this.db.query(query);
    return result['rows'];
  };

  insertData = async(body) => {
    const country_code = await this.db.query(`select code from country_code where lower(country_name) = '${body.toLowerCase()}'`);
    this.db.query(`insert into visited_country(country_code) values('${country_code['rows'][0].code}')`).catch((err) => {
      console.error(err);
    });
  }
}