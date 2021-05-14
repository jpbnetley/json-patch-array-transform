import "./styles.css";

const original = {
  name: "personName",
  pets: ["cat", "dog"],
  surname: "net",
  kids: ["Jack", "James"],
  age: 5
};
const update = { name: "personName", kids: ["Jack"], age: 8 };

const fillArray = (original = {}, update = {}) => {
  const arrayNames = Object.keys(original).filter((key) =>
    Array.isArray(original[key])
  );

  const item = Object.keys(update).reduce((currentObj, currentKey) => {
    const arrNameLength = arrayNames.filter((arr) => arr === currentKey).length;

    const validatedCurrentObject =
      currentObj instanceof Object
        ? { ...currentObj }
        : { [currentObj]: original[currentObj] };

    if (arrNameLength && Array.isArray(update[currentKey])) {
      return { ...validatedCurrentObject, [currentKey]: [] };
    } else {
      return { ...validatedCurrentObject, [currentKey]: update[currentKey] };
    }
  });

  return item;
};
document.getElementById("app").innerHTML = JSON.stringify(
  fillArray(original, update)
);
