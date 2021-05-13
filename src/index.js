import "./styles.css";

const oridginal = {
  name: "personName",
  pets: ["cat", "dog"],
  surname: "net",
  kids: ["Jack", "James"]
};
const update = { name: "personName", kids: ["Jack"] };

const arrayNames = Object.keys(oridginal).filter((key) =>
  Array.isArray(oridginal[key])
);

const item = Object.keys(update).reduce((currentObj, currentKey) => {
  const arrNameLength = arrayNames.filter((arr) => arr === currentKey).length;
  if (arrNameLength && Array.isArray(update[currentKey])) {
    return { ...currentObj, [currentKey]: [] };
  } else {
    return { ...currentObj, [currentKey]: update[currentKey] };
  }
});

document.getElementById("app").innerHTML = JSON.stringify(item);
