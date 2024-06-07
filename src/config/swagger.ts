import swaggerAutogen from 'swagger-autogen'
import { path } from 'app-root-path'
import { config } from 'dotenv'

/**
 * Read env variables from .env file.
 */
config({ path: `${path}/.env` })

import CONFIG from '../config'
const { MODE, PORT, HOST } = CONFIG

const doc = {
  info: {
    title: 'Go Squire API',
    description: 'Description'
  },
  host: `localhost:${PORT}`,
  basePath: '/api/v1',
  schemes: ['https', 'http']
}

if (MODE !== 'development') {
  doc.host = HOST
}
const outputFile = '../../swagger.json'
const endpointsFiles = ['./src/api/v1/index.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  require('../bin/www')
})
