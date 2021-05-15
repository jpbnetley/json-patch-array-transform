import "./styles.css";
const original = {
  name: "personName",
  pets: ["cat", "dog"],
  surname: "net",
  kids: ["Jack", "James"],
  deps: {
    name: "Kat",
    arr: [1, 2, 3]
  },
  age: 5
};
//pets should be removed, so {...pets: []}
const update = {
  name: "personName",
  kids: ["Jack"],
  age: 8,
  deps: {
    name: "Kat"
  }
};
// update => Edited values to be PATCHed
/**
 * Fills the removed arrays with an empty array
 * @param {*} original that needs to be updated
 * @param {*} update valus returned form the FE
 */
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
  if (!arrayNames.length) return nested;
  const originalKeys = Object.keys(original);
  const updateKeys = Object.keys(nested);
  if (!originalKeys.length || !updateKeys.length) return nested || {};
  const difference = originalKeys.filter((x) => !updateKeys.includes(x));
  const missingArrays = arrayNames.filter((x) => difference.includes(x));
  const filledArrays = missingArrays.reduce((currentObj, key) => {
    return { ...currentObj, [key]: [] };
  }, {});
  return { ...update, ...filledArrays };
};
// Expected OUtcome: {"name":"personName","kids":["Jack"],"age":8,"pets":[], deps: {
// name: "",
//   arr: []
// }}
document.getElementById("app").innerHTML = JSON.stringify(
  fillArray(original, update)
);
