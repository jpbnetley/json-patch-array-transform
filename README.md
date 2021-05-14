# json-patch-array-transform

Created with CodeSandbox

## Goal

JSON Patch to remove all entries for an array field then either remove all the entries in that field or replace the field with an empty array

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
```
