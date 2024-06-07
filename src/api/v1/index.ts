import UsersRoutes from './routes/users.route'
import GamesRoutes from './routes/games.route'
import express from 'express'
// import { AuthorizationMiddleware } from '../../middleware'

const app = express()

/**
 * Authorization present in router.
 */
app.use('/users', UsersRoutes)
/**
 * Authorize user for accessing endpoints below.
 */
// app.use(AuthorizationMiddleware.authorizeUser)

app.use('/games', GamesRoutes)

export default app
