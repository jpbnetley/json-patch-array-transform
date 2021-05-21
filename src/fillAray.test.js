import fillArray from "./utils/fillAray";

describe("test Fill Array", () => {
  test("see if shallow item gets updated, result shows update", () => {
    const original = {
      name: "personName",
      pets: ["cat", "dog"],
      surname: "net",
      kids: ["Jack", "James"]
    };

    const update = {
      name: "John",
      pets: ["cat", "dog"],
      surname: "net",
      kids: ["Jack", "James"]
    };

    const result = {
      name: "John",
      pets: ["cat", "dog"],
      surname: "net",
      kids: ["Jack", "James"]
    };

    expect(fillArray(original, update)).toEqual(result);
  });

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
      kids: ["Jack", "James"]
    };

    const result = {
      name: "personName",
      pets: [{ name: "cat1", kittens: ["lew", "Chris"] }],
      kids: ["Jack", "James"]
    };

    expect(fillArray(original, update)).toEqual(result);
  });

  test("see if shallow array with objects that got removed, produces empty array", () => {
    const original = {
      name: "John",
      pets: [
        { name: "cat1", kittens: ["lew", "Chris"] },
        { name: "cat12", kittens: ["Denice", "Jamie"] }
      ],
      surname: "Doe",
      kids: ["Jack", "James"]
    };

    const update = { name: "Jane", kids: ["Jack"] };

    const result = { name: "Jane", kids: ["Jack"], pets: [] };

    expect(fillArray(original, update)).toEqual(result);
  });

  test("see if deep array that got removed, gets replaced with an empty array", () => {
    const original = {
      name: "John",
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
      name: "John",
      kids: ["Jack"],
      pets: ["cat", "dog"],
      surname: "net",
      age: 8,
      deps: {
        name: "Kat"
      }
    };
    const result = {
      name: "John",
      kids: ["Jack"],
      age: 8,
      pets: ["cat", "dog"],
      surname: "net",
      deps: {
        name: "Kat",
        arr: []
      }
    };

    expect(fillArray(original, update)).toEqual(result);
  });

  test("see if shalow and deep array that got removed, gets replaced with an empty array", () => {
    const original = {
      name: "John",
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
      name: "John",
      kids: ["Jack"],
      surname: "net",
      age: 8,
      deps: {
        name: "Kat"
      }
    };
    const result = {
      name: "John",
      kids: ["Jack"],
      age: 8,
      pets: [],
      surname: "net",
      deps: {
        name: "Kat",
        arr: []
      }
    };

    expect(fillArray(original, update)).toEqual(result);
  });

  test("see if all patch operations gets sent for a nested object, add 1 item", () => {
    const original = { name: "jack", kid: { name: "james" } };
    const update = {
      name: "jack",
      kid: { name: "james", surname: "Pieterse" }
    };
    const result = {
      name: "jack",
      kid: { name: "james", surname: "Pieterse" }
    };

    expect(fillArray(original, update)).toEqual(result);
  });
});
