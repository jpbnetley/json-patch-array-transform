# json-patch-array-transform

Created with CodeSandbox

## Goal

When an array is removed, the array should default to an emoty array

```js
const original = {
  name: "personName",
  pets: ["cat", "dog"],
  surname: "net",
  kids: ["Jack", "James"],
  age: 5
};

//pets should be removed, so {...pets: []}
const update = { name: "personName", kids: ["Jack"], surname: "net", age: 8 };

const result = {
  name: "personName",
  pets: [],
  surname: "net",
  kids: ["Jack", "James"],
  age: 5
};
```
