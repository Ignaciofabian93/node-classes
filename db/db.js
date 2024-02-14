import Pool from "pg-pool";

const db = new Pool({
  host: "ep-curly-feather-a56awvbo.us-east-2.aws.neon.fl0.io",
  port: 5432,
  database: "database",
  user: "fl0user",
  password: "W8CsDN2wobtV",
  ssl: true,
});

export default db;
