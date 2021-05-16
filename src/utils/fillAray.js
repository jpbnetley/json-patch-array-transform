const fillArray = (original = {}, update = {}) => {
  const nested = Object.keys(original).reduce((acc, key) => {
    const value = original[key];
    const isObject = typeof value === "object" && !Array.isArray(value);
    const newValue = isObject
      ? fillArray(original[key], update[key])
      : update[key];
    return acc ? { ...acc, [key]: newValue } : { [key]: newValue };
  }, {});

  const arrayNames = Object.keys(original).filter((key) =>
    Array.isArray(original[key])
  );

  //If there are no arrays, can exit array check
  if (!arrayNames.length) return nested;

  const originalKeys = Object.keys(original);
  const updateKeys = Object.keys(nested);

  //if there are no items to check, can exit array check
  if (!originalKeys.length || !updateKeys.length) return nested || {};

  const difference = originalKeys.filter((x) => !updateKeys.includes(x));
  const missingArrays = arrayNames.filter((x) => difference.includes(x));
  const filledArrays = missingArrays.reduce((currentObj, key) => {
    return { ...currentObj, [key]: [] };
  }, {});

  // console.log("arrayNames", arrayNames);
  // console.log("difference", difference);
  // console.log("missingArrays", missingArrays);
  // console.log("filledArrays", filledArrays);

  return { ...update, ...filledArrays };
};

export default fillArray;
