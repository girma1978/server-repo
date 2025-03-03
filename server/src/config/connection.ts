import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

export default sequelize;




// import dotenv from 'dotenv';
// dotenv.config();

// import { Sequelize } from 'sequelize';

// const sequelize = process.env.DATABASE_URL
//   ? new Sequelize(process.env.DATABASE_URL, {
//       dialect: 'postgres',
//       dialectOptions: {
//         ssl: {
//           require: true,  // Ensure SSL is required for cloud (Render)
//           rejectUnauthorized: false,  // Allow self-signed certs (common for cloud)
//         },
//         decimalNumbers: true,
//       },
//     })
//   : new Sequelize(
//       process.env.DB_NAME || '',
//       process.env.DB_USER || '',
//       process.env.DB_PASSWORD || '',
//       {
//         host: process.env.DB_HOST || 'localhost',
//         // Convert DB_PORT to a number, default to 5432 if it's not set or invalid
//         port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
//         dialect: 'postgres',
//         dialectOptions: {
//           decimalNumbers: true,
//         },
//       }
//     );

// export default sequelize;
