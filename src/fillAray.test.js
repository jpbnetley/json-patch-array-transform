import fillArray from "./utils/fillAray";

describe("test Fill Array", () => {
  test("see if shallow array that got removed, gets replaced with an empty array", () => {
    const original = {
      name: "personName",
      pets: ["cat", "dog"],
      surname: "net",
      kids: ["Jack", "James"]
    };

    const update = { name: "personName", kids: ["Jack"] };

    const result = { name: "personName", kids: ["Jack"], pets: [] };

    expect(fillArray(original, update)).toEqual(result);
  });

  test("see if deep array that got removed, by 1 element, still patches 1 element of the array", () => {
    const original = {
      name: "personName",
      pets: [
        { name: "cat1", kittens: ["lew", "Chris"] },
        { name: "cat12", kittens: ["Denice", "Jamie"] }
      ],
      surname: "net",
      kids: ["Jack", "James"]
    };

    const update = {
      name: "personName",
      pets: [{ name: "cat1", kittens: ["lew", "Chris"] }],
      kids: ["Jack"]
    };

    const result = {
      name: "personName",
      pets: [{ name: "cat1", kittens: ["lew", "Chris"] }],
      kids: ["Jack"]
    };

    expect(fillArray(original, update)).toEqual(result);
  });

  test("see if deep array that got removed, produces empty array", () => {
    const original = {
      name: "personName",
      pets: [
        { name: "cat1", kittens: ["lew", "Chris"] },
        { name: "cat12", kittens: ["Denice", "Jamie"] }
      ],
      surname: "net",
      kids: ["Jack", "James"]
    };

    const update = { name: "personName" };

    const result = { name: "personName", kids: ["Jack"], pets: [] };

    expect(fillArray(original, update)).toEqual(result);
  });

  test("see if deep array that got removed, gets replaced with an empty array", () => {
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
    //deps.array should be removed, so {...deps.array : []}
    const update = {
      name: "personName",
      kids: ["Jack"],
      pets: ["cat", "dog"],
      age: 8,
      deps: {
        name: "Kat"
      }
    };
    const result = {
      name: "personName",
      kids: ["Jack"],
      age: 8,
      pets: [],
      deps: {
        name: "",
        arr: []
      }
    };

    expect(fillArray(original, update)).toEqual(result);
  });
});
