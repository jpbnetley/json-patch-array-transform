import "./styles.css";

const oridginal = {
  name: "name",
  pets: ["cat", "dog"],
  surname: "net",
  kids: []
};
const update = { name: "name" };

const arrayNames = Object.keys(oridginal).filter((key) =>
  Array.isArray(oridginal[key])
);

const item = Object.keys(update).map((keyName) => {
  if (arrayNames.filter((arr) => arr === keyName).length === 0) {
    console.log(keyName);
    return Object.assign(keyName, []);
  } else {
    return update[keyName];
  }
});

document.getElementById("app").innerHTML = JSON.stringify(item);
