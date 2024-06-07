import { Optional } from 'sequelize/types'
import { StatusEnum } from '../../config/enums/status.enum'

export interface SkillsAttributes {
  id: number,
  name: string,
  slug:string,
  status: StatusEnum
}

type SkillsOptionalColumns = 'id' | 'status'

export type SkillsCreationAttributes = Optional<SkillsAttributes, SkillsOptionalColumns>
