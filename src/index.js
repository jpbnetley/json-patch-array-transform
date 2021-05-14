import "./styles.css";

const original = {
  name: "personName",
  pets: ["cat", "dog"],
  surname: "net",
  kids: ["Jack", "James"]
};
const update = { name: "personName", kids: ["Jack"] };

const fillArray = (original = {}, update = {}) => {
  const arrayNames = Object.keys(original).filter((key) =>
    Array.isArray(original[key])
  );

  const item = Object.keys(update).reduce((currentObj, currentKey) => {
    const arrNameLength = arrayNames.filter((arr) => arr === currentKey).length;

    if (arrNameLength && Array.isArray(update[currentKey])) {
      return { ...currentObj, [currentKey]: [] };
    } else {
      return { ...currentObj, [currentKey]: update[currentKey] };
    }
  });

  return item;
};
document.getElementById("app").innerHTML = JSON.stringify(
  fillArray(original, update)
);
