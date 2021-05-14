import "./styles.css";

const original = {
  name: "personName",
  pets: ["cat", "dog"],
  surname: "net",
  kids: ["Jack", "James"],
  age: 5
};

//pets should be removed, so {...pets: []}
const update = { name: "personName", kids: ["Jack"], age: 8 };

/**
 * Fills the removed arrays with a empty array
 * @param {*} original that needs to be updated
 * @param {*} update valus returned form the FE
 */
const fillArray = (original = {}, update = {}) => {
  const arrayNames = Object.keys(original).filter((key) =>
    Array.isArray(original[key])
  );

  const originalKeys = Object.keys(original);
  const updateKeys = Object.keys(update);

  const difference = originalKeys.filter((x) => !updateKeys.includes(x));
  const missingArrays = arrayNames.filter((x) => !difference.includes(x));
  const filledArrays = missingArrays.reduce((currentObj, item) => {
    return { ...currentObj, [item]: [] };
  }, {});
  return { ...update, ...filledArrays };
};
document.getElementById("app").innerHTML = JSON.stringify(
  fillArray(original, update)
);
