import Redis from 'ioredis'

import CONFIG from '../config'

import { ConnectionLogger } from '../utils/connection-logger.util'

const { REDIS, SERVICES } = CONFIG
const { URL } = REDIS

const logger = ConnectionLogger(SERVICES.REDIS)

const config = {
  maxRetriesPerRequest: null as any
}

export const RedisClient = new Redis(URL, config)

RedisClient.on('error', logger.logConnectionFailure)
RedisClient.on('connect', logger.logConnectionSuccess)
