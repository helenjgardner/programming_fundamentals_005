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
  let valArray=Object.values(object);
  let currMin=valArray[0];
  //valArray.forEach(n => {
    valArray.forEach(function(n) {
      if (n < currMin){
        currMin=n;
      }
  })
  return currMin;
  // get values, loop through each value, compare to previous

}

/*
  This function receives an object, whose values will all be numbers, and returns the largest number in the object.
*/
function max(object) {
  let valArray=Object.values(object);
  let currMax=valArray[0];
  valArray.forEach(function (n){
    // come back to this
    // if (typeof(n)!='number'){
    //   return valArray;  //if the array contains a non number then just return array
    // }
    // else if (n>currMax){
    //    currMax=n;
    // }
    if (n>currMax)
       { currMax=n; }
  })
  return currMax;
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
  let keyArray=Object.keys(object);
  found=keyArray.indexOf(key);
  if (found > -1){
    return object[key];    
  }
  else {return undefined;}
}

/*
  This function will receive an object and a key, and will return true if the object has the given key, and false if not.
*/
function has(object, key) {
  let keyArray=Object.keys(object);
  found=keyArray.indexOf(key);
  if (found > -1){
    return true;    
  }
  else {return false;}
}


/*
  This function receives an object, whose values will all be numbers, and returns the sum of all these numbers.
*/
function sum(object) {
  let valArray=Object.values(object);
  let total=0;
  valArray.forEach(function (item){
    //console.log('hi');
    if (typeof(item)==='number'){
      total=total+item;
    }
  });

  return total;
}

/*
  This function receives an object and will return a new object with the keys and values inverted. See the tests for examples of this.
*/
function invert(object) {
  valArray=Object.values(object);
  keyArray=Object.keys(object);
  const newObj={};
  index=0;
  for (const key of valArray) {
      newObj[key] = keyArray[index];
      index++;
 }
  return newObj;
}

/*
  This function reveives an array of objects. It should return a single object, which is a combination of all the objects in the array.
*/
function addAll(arr) {

  let newP={};
  arr.forEach(function(item){
    newP=Object.assign(newP, item);
  })
  
  return newP;
}

// =============== PART 2 - Functions as Values ================

/*
  This function allows you to find a value from an object which fulfils a criteria. It receives an object and a matcher function. It should test each value in the object against the matcher function and if a matching value is found, the value should be returned. Otherwise, return null.
*/
function find(obj, matcherFunc) {}

/*
  This function allows you to test whether every value in an object matches a certain criteria. For example, is every value greater than 100? The function receives an object and a tester function. If all values in the object pass the tester function, true is returned. Otherwise, return false.
*/
function every(obj, func) {}

/*
  This function allows you to test whether some values in an object match a certain criteria. For example, are at least some of the values greater than 100? The function receives an object and a tester function. If at least 1 of the values in the object pass the tester function, true is returned. Otherwise, return false.
*/
function some(obj, func) {}

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
}

module.exports = setUpGlobalObject;
