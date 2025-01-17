// =============== PART 1 - Advanced Objects ================

/*
  This function receives an object and returns the number 
  of key-value pairs (properties) in the object.
*/
function size(object) {
  return Object.keys(object).length;
}

/*
  This function receives an object, whose values will all be numbers, and returns the smallest number in the object.
*/
function min(object) {
  let valArray = Object.values(object);
  let currMin = valArray[0];
  valArray.forEach(function (n) {
    if (n < currMin) {
      currMin = n;
    }
  })
  return currMin;
  // get values, loop through each value, compare to previous

}

/*
  This function receives an object, whose values will all be numbers, and returns the largest number in the object.
*/
function max(object) {
  let valArray = Object.values(object);
  let currMax = valArray[0];
  let error = 0;
  valArray.forEach(function (n) {
    // if array contains a non number return the whole array
    if (typeof (n) != 'number') {
      error = 1;
    }
    else if (n > currMax) {
      currMax = n;
    }

  })
  if (error === 1) { return null; }
  else { return currMax; }
}

/*
  This function receives an object, and will return a clone of this object - i.e. a new object with the same key-value pairs.
*/
function clone(object) {
  return Object.assign({}, object);
}

/*
  This function receives an object and returns the value for the given key.
  If the key does not exist it returns undefined.
*/
function get(object, key) {
  return object[key];
}

/*
  This function will receive an object and a key, and will return true if the object has the given key, and false if not.
*/
function has(object, key) {
  if (object[key] !== undefined) { return true; }
  else { return false; }
}


/*
  This function receives an object, whose values will all be numbers, and returns the sum of all these numbers.
*/
function sum(object) {
  let valArray = Object.values(object);
  let total = 0;
  valArray.forEach(function (item) {
    if (typeof (item) === 'number') {
      total = total + item;
    }
  });
  return total;
}

/*
  This function receives an object and will return a new object with the keys and values inverted. See the tests for examples of this.
*/
function invert(object) {
  const newObj = {}
  for (let key in object) {
    const value = object[key];
    newObj[value] = key;
  }
  return newObj;
}

/*
  This function reveives an array of objects. It should return a single object, which is a combination of all the objects in the array.
*/
function addAll(arr) {
  let newO = {};
  arr.forEach(function (item) {
    newO = Object.assign(newO, item);
  })

  return newO;
}

// =============== PART 2 - Functions as Values ================

/*
  This function allows you to find a value from an object which fulfils a criteria. It receives an object and a matcher function. It should test each value in the object against the matcher function and if a matching value is found, the value should be returned. Otherwise, return null.
*/
function find(obj, matcherFunc) {
  let result = null;
  for (let key in obj) {
    let match = matcherFunc(obj[key]);
    if (match) {
      result = obj[key];
    }
  }
  return result;
}

/*
  This function allows you to test whether every value in an object matches a certain criteria. For example, is every value greater than 100? The function receives an object and a tester function. If all values in the object pass the tester function, true is returned. Otherwise, return false.
*/
function every(obj, func) {
  let result = false;
  for (let key in obj) {
    let match = func(obj[key]);
    if (match) {
      result = true;
    }
    else { return false; }
  }
  return result;
}

/*
  This function allows you to test whether some values in an object match a certain criteria. For example, are at least some of the values greater than 100? The function receives an object and a tester function. If at least 1 of the values in the object pass the tester function, true is returned. Otherwise, return false.
*/
function some(obj, func) {
  let result = false;
  for (let key in obj) {
    let match = func(obj[key]);
    if (match) {
      result = true;
    }
  }
  return result;
}

// New extra functions
// Return object with key/value pairs removed if value matches function

function remove(obj, func) {
  let newObj = {};

  for (let key in obj) {
    let match = func(obj[key]);
    if (!match) { newObj[key] = obj[key]; }
  }
  return newObj;

}

function forEach(obj, func) {
  for (let item in obj) {
    obj[item] = func(obj[item]);
  }
  return obj;
}

function setUpGlobalObject() {
  Object.size = size;
  Object.min = min;
  Object.max = max;
  Object.clone = clone;
  Object.get = get;
  Object.has = has;
  Object.sum = sum;
  Object.invert = invert;
  Object.addAll = addAll;
  Object.find = find;
  Object.every = every;
  Object.some = some;
  Object.remove = remove;
  Object.forEach = forEach;
}

module.exports = setUpGlobalObject;
