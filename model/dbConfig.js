import mysql from "mysql2";
export default mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Server.123",
    database: "shoesmall",
    connectionLimit: 10
});