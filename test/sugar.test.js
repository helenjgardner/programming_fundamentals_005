const setUpGlobalObject = require("../lib/sugar");

// Invoking this function adds the new methods to the Global Object
setUpGlobalObject();

describe("Object.size", () => {
  test("returns the correct size when given an object", () => {
    expect(
      Object.size({
        a: 1,
        b: 2,
        c: 3
      })
    ).toBe(3);

    expect(
      Object.size({
        a: 1,
        b: 2,
        c: 3,
        d: 4
      })
    ).toBe(4);

    expect(
      Object.size({
        name: "Susan"
      })
    ).toBe(1);

    expect(Object.size({})).toBe(0);
  });
});

describe("Object.min", () => {
  test("returns the smallest number of all values in an object", () => {
    expect(
      Object.min({
        a: 4,
        b: 3,
        c: 2,
        d: 9
      })
    ).toBe(2);

    expect(
      Object.min({
        a: 434,
        b: 342,
        c: 200,
        d: 9
      })
    ).toBe(9);
    //additional test added to incorporate negative numbers
    expect(
      Object.min({
        a: 1,
        b: 0,
        c: -1,
        d: 0
      })
    ).toBe(-1);

    expect(
      Object.min({
        a: -1,
        b: 0,
        c: -101,
        d: -10
      })
    ).toBe(-101);
  });
});

describe("Object.max", () => {
  test("returns the largest number of all values in an object", () => {
    expect(
      Object.max({
        a: 4,
        b: 3,
        c: 2,
        d: 9
      })
    ).toBe(9);

    expect(
      Object.max({
        a: 434,
        b: 342,
        c: 200,
        d: 9
      })
    ).toBe(434);

    // added new test 24/9/19  return null if there is a non number value
    expect(
      Object.max({
        a: 434,
        b: 'string'
      })
    ).toEqual(null);
  });
});

describe("Object.clone", () => {
  test("returns a copy of the object", () => {
    const person1 = {
      name: "Sally",
      location: "Leeds"
    };
    const person2 = Object.clone(person1);

    expect(person2 === person1).toBe(false);
    expect(person2.name).toBe("Sally");
    expect(person2.location).toBe("Leeds");
  });
});

describe("Object.get", () => {
  test("returns the value for the given key", () => {
    expect(
      Object.get(
        {
          name: "Sally",
          location: "Leeds"
        },
        "name"
      )
    ).toBe("Sally");

    expect(
      Object.get(
        {
          name: "Sally",
          location: "Leeds"
        },
        "location"
      )
    ).toBe("Leeds");
  });

  test("returns undefined if the key is not found", () => {
    expect(
      Object.get(
        {
          name: "Sally",
          location: "Leeds"
        },
        "address"
      )
    ).toBe(undefined);

    expect(
      Object.get(
        {
          name: "Sally",
          location: "Leeds"
        },
        "age"
      )
    ).toBe(undefined);
  });
});

describe("Object.has", () => {
  test("returns true if the object has the give key", () => {
    const obj1 = { name: "Sally", location: "Leeds" };
    expect(Object.has(obj1, "name")).toBe(true);
    expect(Object.has(obj1, "location")).toBe(true);
  });

  test("returns false if the object does not have the give key", () => {
    const obj1 = { name: "Sally", location: "Leeds" };
    expect(Object.has(obj1, "postcode")).toBe(false);
    expect(Object.has(obj1, "address")).toBe(false);
  });

  test("returns true if the object has the given key, but it is a falsey value", () => {
    const obj1 = {
      name: "Sally",
      location: "Leeds",
      address: null,
      signedIn: false
    };
    expect(Object.has(obj1, "signedIn")).toBe(true);
    expect(Object.has(obj1, "address")).toBe(true);
  });
});

describe("Object.sum", () => {
  test("returns the sum of all the values when all values are numbers", () => {
    const obj = {
      a: 1,
      b: 4,
      c: 10
    };
    expect(Object.sum(obj)).toBe(15);
  });

  test("returns 0 when the object has no key-value pairs", () => {
    const obj = {};
    expect(Object.sum(obj)).toBe(0);
  });

  test("ignores non-number values", () => {
    const obj = {
      a: 1,
      b: 4,
      c: false,
      d: 10,
      e: "cat"
    };
    expect(Object.sum(obj)).toBe(15);
  });

  test("returns 0 if no values are numbers", () => {
    const obj = {
      a: "dog",
      b: "foo",
      c: "bar",
      d: "snail",
      e: "cat"
    };
    expect(Object.sum(obj)).toBe(0);
  });
});

describe("Object.invert", () => {
  test("returns a new object which is the inversion of the given object", () => {
    const original = {
      name: "Sally",
      location: "Leeds"
    };

    const expected = {
      Sally: "name",
      Leeds: "location"
    };

    // Checking we are getting a new object created
    expect(Object.invert(original) === original).toBe(false);

    expect(Object.invert(original)).toEqual(expected);
  });

  test("also works with more complex values", () => {
    const original = {
      name: "Sally",
      location: "Leeds",
      address: "5 Hull Road, Beeston"
    };

    const expected = {
      Sally: "name",
      Leeds: "location",
      "5 Hull Road, Beeston": "address"
    };

    expect(Object.invert(original)).toEqual(expected);
  });
});

describe("Object.addAll", () => {
  test("Creates a new object out of all the objects in an array", () => {
    const objects = [{ a: 1 }, { b: 3 }, { c: "foo" }];

    const expected = {
      a: 1,
      b: 3,
      c: "foo"
    };

    expect(Object.addAll(objects)).toEqual(expected);
  });

  test("Later objects in the array with the same keys as earlier objects overwrite previous ones", () => {
    const objects = [{ a: 1 }, { b: 3 }, { a: "foo" }];

    const expected = {
      a: "foo",
      b: 3
    };

    expect(Object.addAll(objects)).toEqual(expected);
  });

  test("Works with objects that have multiple key-value pairs", () => {
    const objects = [{ a: 1 }, { b: 3 }, { c: "foo", d: "bar" }];

    const expected = {
      a: 1,
      b: 3,
      c: "foo",
      d: "bar"
    };

    expect(Object.addAll(objects)).toEqual(expected);
  });
});

describe("Object.find", () => {
  test("returns the found value if the object contains a value that matches the matcher function", () => {
    function matcherFunc(val) {
      return val > 99;
    }

    const obj = {
      a: 1,
      b: 220,
      c: 33,
      d: 44
    };

    const result = Object.find(obj, matcherFunc);

    expect(result).toBe(220);
  });

  test("returns null if the object does not contain a value that matches the matcher function", () => {
    function matcherFunc(val) {
      return val > 99;
    }

    const obj = {
      a: 1,
      b: 22,
      c: 4,
      d: 12
    };

    const result = Object.find(obj, matcherFunc);

    expect(result).toBe(null);
  });

  //  new test added 24/9/19
  test("returns second value if more than one value matches function", () => {
    function matcherFunc(val) {
      return val > 99;
    }

    const obj = {
      a: 1,
      b: 220,
      c: 4,
      d: 120
    };

    const result = Object.find(obj, matcherFunc);

    expect(result).toBe(120);
  });

  //  new test added 24/9/19
  test("returns the found value if a different function is passed", () => {
    function matcherFunc(val) {
      return val < 99;
    }

    const obj = {
      a: 1,
      b: 220,
      c: 100,
      d: 120
    };

    const result = Object.find(obj, matcherFunc);

    expect(result).toBe(1);
  });
});

describe("Object.every", () => {
  test("returns true if all values in the object pass the condition of the matcher the function", () => {
    function matcherFunc(val) {
      return val > 99;
    }

    const obj = {
      a: 100,
      b: 220,
      c: 500,
      d: 603
    };

    const result = Object.every(obj, matcherFunc);

    expect(result).toBe(true);
  });

  test("returns false if not all values in the object pass the condition of the matcher the function", () => {
    function matcherFunc(val) {
      return val > 99;
    }

    const obj = {
      a: 10,
      b: 220,
      c: 400,
      d: 122
    };

    const result = Object.every(obj, matcherFunc);

    expect(result).toBe(false);
  });

  //  new test added 24/9/19
  test("returns false when using new function and not all values match", () => {
    function matcherFunc(val) {
      return val < 99;
    }

    const obj = {
      a: 1,
      b: 220,
      c: 100,
      d: 120
    };

    const result = Object.every(obj, matcherFunc);

    expect(result).toBe(false);
  });

  //  new test added 24/9/19
  test("returns true when using new function and all values match", () => {
    function matcherFunc(val) {
      return val < 99;
    }

    const obj = {
      a: 1,
      b: 2,
      c: 1,
      d: 1
    };

    const result = Object.every(obj, matcherFunc);

    expect(result).toBe(true);
  });
});

describe("Object.some", () => {
  test("returns true if one or more values in the object pass the condition of the matcher the function", () => {
    function matcherFunc(val) {
      return val > 99;
    }

    const obj = {
      a: 100,
      b: 2,
      c: 500,
      d: 5
    };

    const result = Object.some(obj, matcherFunc);

    expect(result).toBe(true);
  });

  test("returns false if none of the values in the object pass the condition of the matcher the function", () => {
    function matcherFunc(val) {
      return val > 99;
    }

    const obj = {
      a: 10,
      b: 20,
      c: 40,
      d: 12
    };

    const result = Object.some(obj, matcherFunc);

    expect(result).toBe(false);
  });
});

// tests for two new functions 3/10/19

describe("Object.remove", () => {
  test("returns complete object if none values pass the condition", () => {
    function removeFunc(val) {
      return val > 10;
    }
    const obj = {
      first: 10,
      second: 9,
      third: 0
    };
    const myResult = Object.remove(obj, removeFunc);
    expect(myResult).toEqual(obj);
  });
  test("returns filtered object if some values pass the condition", () => {
    function removeFunc(val) {
      return val > 10;
    }
    const obj = {
      first: 10,
      second:11,
      third: 12
    };
    const expected = {
      first: 10
    };
    const myResult = Object.remove(obj, removeFunc);
    expect(myResult).toEqual(expected);
  });
  test("returns empty object if all values pass condition", () =>{
    function removeFunc(val){
      return val < 2;
    }
    const obj = {
      first: 1,
      second:1,
      third: 0
    };
    const expected = {};
    const result=Object.remove(obj,removeFunc);
    expect(result).toEqual(expected);
  })
});

describe("Object.forEach", () =>{
   test("returns object with function applied numeric", () =>{
     function triple(val){
        return val*3;
     }
     const myObj={stock: 10, warehouses: 2, lorries: 200};
     const expObj={stock: 30, warehouses: 6, lorries: 600};
     const myResult=Object.forEach(myObj,triple);
     expect(myResult).toEqual(expObj);
   });
   test("returns object with function applied string", () =>{
    function firstInitial(val){
       return val.slice(0,1);
    }
    const myObj={firstName: "Helen", middleName: "Jane", surname: "Gardner"};
    const expObj={firstName: "H", middleName: "J", surname: "G"};
    const myResult=Object.forEach(myObj,firstInitial);
    expect(myResult).toEqual(expObj);
  });
});