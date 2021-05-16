import "./styles.css";
import fillArray from "./utils/fillAray";

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
// nested: arr should be removed, so {...arr: []}
const update = {
  name: "personName",
  kids: ["Jack"],
  age: 8,
  deps: {
    name: "Kat"
  }
};
/* Expected Outcome: 
{
  "name":"personName","
  kids":["Jack"],
  "age":8,
  "pets":[], <-
  deps: {
    name: "",
    arr: []  <-
    }
} */
document.getElementById("app").innerHTML = JSON.stringify(
  fillArray(original, update)
);
