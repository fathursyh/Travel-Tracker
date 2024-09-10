import pg from 'pg';

export class PostgressDB {
  constructor() {
    this.db = new pg.Client({
      user: "postgres",
      host: "localhost",
      password: "12345",
      database: "worlds",
      port: 5433,
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

  // INSERT DATA METHOD
  insertData = async(body) => {
    const country_code = await this.db.query('select code from country_code where lower(country_name) = $1', [body.toLowerCase()])
    this.db.query('insert into visited_country(country_code) values($1)', [country_code['rows'][0].code])
    .catch((err) => {
      // query FAILED
      return false;
    });
    // query SUCCESS
    return true;
  }
}