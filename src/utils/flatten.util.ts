import camelcaseKeys from 'camelcase-keys'

/**
 * Converts all object keys to camelcase style.
 */
export const flattenObject = (object: any) => camelcaseKeys(object, { deep: true })

const flatten = (obj: any) : any =>
  Object.keys(obj).reduce((memo, prop) =>
    Object.assign({}, memo,
      Object.prototype.toString.call(obj[prop]) === '[object Object]' ? flatten(obj[prop]) : { [prop]: obj[prop] }
    ), {})

/**
 * Convert all nested object to linear.
 */
export const flattenNestedObject = (object: any) => camelcaseKeys(flatten(object), { deep: true })

export const flattenNestedObjectWithOriginal = (object: any) => flatten(object)
