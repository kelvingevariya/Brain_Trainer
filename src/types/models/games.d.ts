import { Optional } from 'sequelize/types'
import { StatusEnum } from '../../config/enums/status.enum'

export interface GamesAttributes {
  id: number,
  name: string,
  slug:string,
  status: StatusEnum,
  icon: string,
  description: string,
  goals: string,
  instruction: Array,
  order: number,
  levels: number,
  skill_id: number
}

type GamesOptionalColumns = 'id' | 'status'

export type GamesCreationAttributes = Optional<GamesAttributes, GamesOptionalColumns>

export interface FlattenGamesAttributes {
    id: number,
    name: string,
    slug:string,
    status: StatusEnum,
    icon: string,
    description: string,
    goals: string,
    instruction: Array,
    order: number,
    levels: number,
    skillId: number
}
