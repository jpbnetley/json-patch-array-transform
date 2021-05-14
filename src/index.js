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

  if (!arrayNames.length) return update;

  const originalKeys = Object.keys(original);
  const updateKeys = Object.keys(update);

  if (!originalKeys.length || !updateKeys.length) return update || {};

  const difference = originalKeys.filter((x) => !updateKeys.includes(x));
  const missingArrays = arrayNames.filter((x) => difference.includes(x));
  const filledArrays = missingArrays.reduce((currentObj, item) => {
    return { ...currentObj, [item]: [] };
  }, {});

  console.log("difference", difference);
  console.log("missingArrays", missingArrays);
  console.log("filledArrays", filledArrays);
  return { ...update, ...filledArrays };
};
document.getElementById("app").innerHTML = JSON.stringify(
  fillArray(original, update)
);
