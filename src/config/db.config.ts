import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

console.log("✅ DB_CA_CERT loaded:", !!process.env.DB_CA_CERT ? "YES" : "NO");
console.log("CA Length:", process.env.DB_CA_CERT?.length || 0);

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS as string,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',

        logging: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },

        dialectOptions: {
            ssl: {
                ca: process.env.DB_CA_CERT?.replace(/\\n/g, '\n'),
                rejectUnauthorized: true,
                minVersion: 'TLSv1.2',
            },
        },
    }
);

export default sequelize;