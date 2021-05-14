import "./styles.css";

const original = {
  name: "personName",
  pets: ["cat", "dog"],
  surname: "net",
  kids: ["Jack", "James"],
  age: 5
};

//pets should be removed, so {...pets: [], surname}
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
  console.log(missingArrays);
  const filledArrays = missingArrays.reduce((currentObj, item) => {
    console.log("inLoop", { [item]: [] });
    const obj =
      currentObj instanceof Object
        ? { ...currentObj, [item]: [] }
        : { [item]: [] };

    console.log(obj);
    return obj;
  });

  console.log("filledArays", filledArrays);

  return filledArrays;

  // const item = Object.keys(update).reduce((currentObj, currentKey) => {
  //   const arrNameLength = arrayNames.filter((arr) => arr === currentKey).length;

  //   const validatedCurrentObject =
  //     currentObj instanceof Object
  //       ? { ...currentObj }
  //       : { [currentObj]: original[currentObj] };

  //   if (arrNameLength && Array.isArray(update[currentKey])) {
  //     return { ...validatedCurrentObject, [currentKey]: [] };
  //   } else {
  //     return { ...validatedCurrentObject, [currentKey]: update[currentKey] };
  //   }
  // });

  // return item;
};
document.getElementById("app").innerHTML = JSON.stringify(
  fillArray(original, update)
);
