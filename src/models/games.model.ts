
import { Games, Skills } from './definitions'
import { Sequelize } from 'sequelize'
import { StatusEnum } from '../config/enums/status.enum'
import { parseGetResponse } from '../utils/database.util'
import { FlattenGamesAttributes } from '../types/models/games'
import { SkillsAttributes } from '../types/models/skills'
import { Op } from 'sequelize'

export const getRandomSkills = (): Promise<SkillsAttributes[]> => {
  return Skills.findAll({
    order: Sequelize.literal('random()'),
    limit: 3
  }).then((results) => results.map(parseGetResponse)) as Promise<SkillsAttributes[]>
}

export const getRandomGamesBySkill = (skillId: number): Promise<FlattenGamesAttributes[]> => {
  return Games.findAll({
    where: {
      skill_id: skillId,
      status: StatusEnum.Active
    },
    order: Sequelize.literal('random()'),
    limit: 2
  }).then((results) => results.map(parseGetResponse)) as Promise<FlattenGamesAttributes[]>
}

export const getRecommendedGame = (gameIds: number[]): Promise<FlattenGamesAttributes> => {
  return Games.findOne({
    where: {
      id: { [Op.notIn]: gameIds },
      status: StatusEnum.Active
    },
    order: Sequelize.literal('random()')
  }).then(parseGetResponse) as Promise<FlattenGamesAttributes>
}

export const getRandomGameBySkill = (skillId: number): Promise<FlattenGamesAttributes> => {
  return Games.findOne({
    where: {
      skill_id: skillId,
      status: StatusEnum.Active
    },
    order: Sequelize.literal('random()')
  }).then(parseGetResponse) as Promise<FlattenGamesAttributes>
}
