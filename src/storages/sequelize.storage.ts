import { Options, Sequelize } from 'sequelize'

import CONFIG from '../config'

import { ConnectionLogger } from '../utils/connection-logger.util'

const { DATABASE } = CONFIG

const SERVICE_NAME = 'Sequelize'
const logger = ConnectionLogger(SERVICE_NAME)

/**
 * Options for new Sequelize instance.
 */
const OPTIONS: Options = {
  host: DATABASE.HOST,
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    useUTC: false,
    multipleStatements: true,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

export const SequelizeClient = new Sequelize(DATABASE.SCHEMA, DATABASE.USERNAME, DATABASE.PASSWORD, OPTIONS)
// SequelizeClient.sync() // Added to reflect new table
SequelizeClient.authenticate(OPTIONS)
  .then(logger.logConnectionSuccess)
  .catch(logger.logConnectionFailure)
