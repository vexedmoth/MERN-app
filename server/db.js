import mysqlPromise from "mysql2/promise";

export const pool = new mysqlPromise.createPool({
  host: "localhost",
  user: "vexedmoth",
  database: "taskdb",
  password: "123",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});
