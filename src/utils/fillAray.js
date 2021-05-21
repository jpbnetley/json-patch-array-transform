/**
 * Gets the nested object
 * @param {*} original that needs to be updated
 * @param {*} update values returned from the FE
 */
const getNested = (original = {}, update = {}) => {
  const originalKeys = Object.keys(original)
  const updateKeys = Object.keys(update)

  const nestedObject = originalKeys.reduce((acc, key) => {
    const value = original[key]
    const isObject = typeof value === 'object' && !Array.isArray(value)
    const newValue = isObject
      ? fillArray(original[key], update[key])
      : update[key]

    if (!newValue) return acc
    return acc ? { ...acc, [key]: newValue } : { [key]: newValue }
  }, {})
  // find keys that got added to the updated object, that is not in the original object
  const difference = updateKeys.filter((x) => !originalKeys.includes(x))
  const updatedAddedObject = difference.reduce((currentObj, key) => {
    return { ...currentObj, [key]: update[key] }
  }, {})
  return { ...nestedObject, ...updatedAddedObject }
}

/**
 * Fills the removed arrays with an empty array
 * @param {*} original that needs to be updated
 * @param {*} update values returned from the FE
 */
const fillArray = (original = {}, update = {}) => {
  const originalKeys = Object.keys(original)
  const nested = getNested(original, update)

  const arrayNames = originalKeys.filter((key) =>
    Array.isArray(original[key])
  )

  const newUpdatedValues = Object.keys(nested).length ? nested : update

  // If there are no arrays, can exit array check
  if (!arrayNames.length) return newUpdatedValues

  const updateKeys = Object.keys(newUpdatedValues)

  // if there are no items to check, can exit array check
  if (!originalKeys.length || !updateKeys.length) return newUpdatedValues || {}

  const difference = originalKeys.filter((x) => !updateKeys.includes(x))
  const missingArrays = arrayNames.filter((x) => difference.includes(x))
  const filledArrays = missingArrays.reduce((currentObj, key) => {
    return { ...currentObj, [key]: [] }
  }, {})

  return { ...newUpdatedValues, ...filledArrays }
}

export default fillArray
