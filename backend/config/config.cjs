//local config setup
// require('dotenv').config();

// module.exports = {
//     development: {
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_NAME,
//         host: process.env.DB_HOST,
//         dialect: 'postgres'
//     },
//     test: {
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_TEST_NAME,
//         host: process.env.DB_HOST,
//         dialect: 'postgres'
//     },
//     production: {
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_PROD_NAME,
//         host: process.env.DB_HOST,
//         dialect: 'postgres'
//     }
// };


//for NeonDB with SSL proff
require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        migrationsPath: "../src/migrations",
        seedersPath: "../src/seeders",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        ssl: true
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_TEST_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        migrationsPath: "../src/migrations",
        seedersPath: "../src/seeders",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        ssl: true
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_PROD_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        migrationsPath: "./src/migrations",
        seedersPath: "./src/seeders",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        ssl: true
    }
};