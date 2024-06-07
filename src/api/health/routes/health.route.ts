import { Router } from 'express'

import * as HealthService from '../services/health.service'

const router = Router()

router.get('/',
  HealthService.returnSuccessStatus
)

export default router
