// import dotenv from 'dotenv';
// import { Sequelize } from 'sequelize';

// dotenv.config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USERNAME,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'postgres',
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false
//             }
//         },
//         logging: false,
//         pool: {
//             max: 5,
//             min: 0,
//             acquire: 30000,
//             idle: 10000
//         }
//     }
// );

// async function testConnection() {
//     console.log('Connecting to database:', {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         database: process.env.DB_NAME,
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD
//     });
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection successful! 🎉');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// testConnection();

// export default sequelize;


import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

// First check for DATABASE_URL which Railway typically provides
let sequelize;

if (process.env.DATABASE_URL) {
    console.log('Connecting using DATABASE_URL');
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
} else {
    // Fallback to individual connection parameters
    console.log('Connecting using individual parameters');
    sequelize = new Sequelize(
        process.env.DB_NAME || process.env.PGDATABASE,
        process.env.DB_USERNAME || process.env.DB_USER || process.env.PGUSER,
        process.env.DB_PASSWORD || process.env.PGPASSWORD,
        {
            host: process.env.DB_HOST || process.env.PGHOST,
            port: process.env.DB_PORT || process.env.PGPORT || 5432,
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
}

async function testConnection() {
    console.log('Attempting to connect with configuration:', {
        database_url: process.env.DATABASE_URL ? 'Set (hidden for security)' : 'Not set',
        host: process.env.DB_HOST || process.env.PGHOST,
        port: process.env.DB_PORT || process.env.PGPORT,
        database: process.env.DB_NAME || process.env.PGDATABASE,
        username: process.env.DB_USERNAME || process.env.DB_USER || process.env.PGUSER,
        // Not showing password for security
    });

    try {
        await sequelize.authenticate();
        console.log('Database connection successful! 🎉');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

export default sequelize;