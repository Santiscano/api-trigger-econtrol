import mySQL from 'mysql2/promise';
import 'dotenv/config';

export const connection = mySQL.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB
});
export const connect = mySQL.createPool({
    host: process.env.HOST_ESPEJO_DB,
    user: process.env.USER_ESPEJO_DB,
    database: process.env.DATABASE_NAME_ESPEJO,
    password: process.env.PASSWORD_ESPEJO_DB
});
