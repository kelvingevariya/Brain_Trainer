import { Model } from 'sequelize'

// import CONFIG from '../config'

import { flattenObject, flattenNestedObjectWithOriginal } from './flatten.util'

// import { SortByOccasion } from '../types/utils/database'
// import { FlattenFlowerCategory } from '../types/models/flower-categories'


/**
 * Parser for sequelize get resource responses.
 */
export const parseGetResponse = (resultEntity: Model<any, any> | null) => {
  if (resultEntity) {
    const response = resultEntity.get({ plain: true })

    return flattenObject(response)
  }

  return resultEntity
}

/**
 * Parser for sequelize get resource responses.
 */
export const parseGetResponseOriginal = (resultEntity: Model<any, any> | null) => {
  if (resultEntity) {
    const response = resultEntity.get({ plain: true })

    return response
  }

  return resultEntity
}
/**
 * Parser for sequelize get resource responses.
 */
export const parseGetResponseLinear = (resultEntity: Model<any, any> | null) => {
  if (resultEntity) {
    const response = resultEntity.get({ plain: true })

    return flattenNestedObjectWithOriginal(response)
  }

  return resultEntity
}

/**
 * Parser for sequelize create resource responses.
 */
export const parseCreateResponse = (resultEntity: Model<any, any>) => {
  const response = resultEntity.get({ plain: true })

  return flattenObject(response)
}

/**
 * Checks if Stripe's webhook state has higher priority, then returns `true`, otherwise `false`.
 */
// export const checkIfAllowed = (currentState: string, oldState: string) => {
//   const currentStatePriority = WEBHOOK_STATUSES[currentState]
//   const oldStatePriority = WEBHOOK_STATUSES[oldState]

//   return currentStatePriority > oldStatePriority
// }

/**
 * Sorts categories response by occasion for frontend.
 */
// export const sortCategoriesByOccasion = (categories: FlattenFlowerCategory[]) => {
//   return categories.reduce((acc: SortByOccasion[], item) => {
//     const { id, occasion, categoryImageUrl, price, size, imageUrl, currencyCode } = item

//     const index = acc.findIndex((item) => item.occasion === occasion)

//     if (index >= 0) {
//       const optionData = {
//         id,
//         price,
//         size,
//         imageUrl,
//         currencyCode
//       }
//       acc[index].options.push(optionData)

//       return acc
//     }

//     const occasionObject = {
//       occasion,
//       categoryImageUrl,
//       options: [
//         {
//           id,
//           price,
//           size,
//           imageUrl,
//           currencyCode
//         }
//       ]
//     }
//     acc.push(occasionObject)

//     return acc
//   }, [])
// }
