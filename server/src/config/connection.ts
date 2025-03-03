// import dotenv from 'dotenv';
// dotenv.config();

// import { Sequelize } from 'sequelize';

// const sequelize = process.env.DB_URL
//   ? new Sequelize(process.env.DB_URL)
//   : new Sequelize(
//       process.env.DB_NAME || '',
//       process.env.DB_USER || '',
//       process.env.DB_PASSWORD,
//       {
//         host: 'localhost',
//         dialect: 'postgres',
//         dialectOptions: {
//           decimalNumbers: true,
//         },
//       }
//     );

// export default sequelize;


import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

// Ensure proper typing for environment variables
const isProduction = process.env.NODE_ENV === 'production';

// Type definition for Sequelize
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: 'postgres',
      dialectOptions: isProduction
        ? {
            ssl: {
              require: true, // SSL is required in production (Render)
              rejectUnauthorized: false, // Disable SSL certificate validation (specific to Render)
            },
          }
        : {},
    })
  : new Sequelize(
      process.env.DB_NAME || '',  // Database name
      process.env.DB_USER || '',  // Database user
      process.env.DB_PASSWORD || '', // Database password (add default empty string for safety)
      {
        host: process.env.DB_HOST || 'localhost', // Default to localhost for local development
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true, // Ensure decimal numbers are returned correctly
        },
        port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432, // Ensure the port is treated as a number
      }
    );

export default sequelize;
