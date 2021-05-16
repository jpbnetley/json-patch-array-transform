/**
 * Gets the nested object
 * @param {*} original that needs to be updated
 * @param {*} update values returned form the FE
 */
const getNested = (original = {}, update = {}) => {
  return Object.keys(original).reduce((acc, key) => {
    const value = original[key];
    const isObject = typeof value === "object" && !Array.isArray(value);
    const newValue = isObject
      ? fillArray(original[key], update[key])
      : update[key];

    if (!newValue) return acc;
    return acc ? { ...acc, [key]: newValue } : { [key]: newValue };
  }, {});
};

/**
 * Fills the removed arrays with a empty array
 * @param {*} original that needs to be updated
 * @param {*} update values returned form the FE
 */
const fillArray = (original = {}, update = {}) => {
  const nested = getNested(original, update);

  console.log("nested", nested);

  const arrayNames = Object.keys(original).filter((key) =>
    Array.isArray(original[key])
  );

  const newUpdatedValues = Object.keys(nested).length ? nested : update;

  //If there are no arrays, can exit array check
  if (!arrayNames.length) return newUpdatedValues;

  const originalKeys = Object.keys(original);
  const updateKeys = Object.keys(newUpdatedValues);

  //if there are no items to check, can exit array check
  if (!originalKeys.length || !updateKeys.length) return newUpdatedValues || {};

  const difference = originalKeys.filter((x) => !updateKeys.includes(x));
  const missingArrays = arrayNames.filter((x) => difference.includes(x));
  const filledArrays = missingArrays.reduce((currentObj, key) => {
    return { ...currentObj, [key]: [] };
  }, {});

  return { ...newUpdatedValues, ...filledArrays };
};

export default fillArray;
