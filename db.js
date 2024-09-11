import pg from 'pg';
import 'dotenv/config';

export class PostgressDB {
  constructor() {
    this.db = new pg.Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      port: process.env.PG_PORT,
      statement_timeout: 5000,
    });
    this.db.connect();
  }
  
  // GET DATA METHOD
  getData = async(field='*', table) => {
    const query = `select ${field} from ${table}`;
    let result = await this.db.query(query);
    return result['rows'];
  };

  getOptionData = async() => {
    const query = 'select * from country_code left join visited_country on country_code.code = visited_country.country_code where visited_country.id is null AND visited_country.country_code is null;';
    let result = await this.db.query(query);
    return result['rows'];
  }

  // INSERT DATA METHOD
  insertData = async(body) => {
    const country_code = await this.db.query('select code from country_code where lower(country_name) = $1', [body.toLowerCase()])
    this.db.query('insert into visited_country(country_code) values($1)', [country_code['rows'][0]['code']])
    .catch((err) => {
      // query FAILED
      return false; 
    });
    // query SUCCESS
    return true;
  }
}