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

// Check if DATABASE_URL is available (i.e., for Render deployment)
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    })
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD || '',
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

export default sequelize;
