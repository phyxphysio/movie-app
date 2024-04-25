const { Sequelize } = require('sequelize');
const path = require('path');
const { config } = require('process');

// pathing configuration
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config', 'config.json');
const sequelizeConfig = require(configPath)[env];


// create sequelize

const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
    host: sequelizeConfig.host,
    dialect: sequelizeConfig.dialect,
    port: sequelizeConfig.port,
    logging: false, // true for debugging
});

// test database
async function testDatabaseConnection() {
    try {
        await sequelize.authenticate();
        console.log('Database connection is successful.');
    } catch (err) {
        console.error('Unable to connect to the database:', err)
    }
}

// export
module.exports = {
    sequelize,
    testDatabaseConnection,
};