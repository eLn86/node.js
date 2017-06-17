const uuidV4 = require('uuid/v4');

let storeDefault = [
    { id: 1, name: 'Chewing Gum', color: 'Red', price: 60 },
    { id: 2, name: 'Pez', color: 'Green', price: 50 },
    { id: 3, name: 'Marshmellow', color: 'Pink', price: 40 },
    { id: 4, name: 'Candy Stick', color: 'Blue', price: 30 }];

let store = [];

//init function to push storeDefault to Store with UUIDs
let init = () => {
  storeDefault.forEach((candy) => {
    candy.id = uuidV4();
    store.push(candy);
  });
}
init();

/*
* Return all the candy
*/
exports.list = () => {
  return store;
};

/*
* Create candy (Crud)
*/
exports.create = (candy) => {
  candy.id = uuidV4();
  store.push(candy);
  return candy;
};

/*
* Get candy (cRud)
*/
exports.get = (id) => {
  const candyA = store.filter((candy) => {
    return candy.id === id;
  });

  // Check function for more than 1 candy with same id
  // Write the error to the log
  if (candyA.length > 1) {
    console.log('Error: you have more than 1 candy with the same id!');
  } else {
    return candyA[0];
  }
};

/*
* Update candy (crUd)
*/
exports.update = (newCandy) => {
  store.forEach((candy, index) => {
    if (candy.id === newCandy.id) {
      store[index] = newCandy;
    }
  });
  return newCandy;
};

/*
* Update candy (cruD)
*/
exports.delete = (id) => {
  let deleted = false;

  store.forEach((candy, index) => {
    if (candy.id == id) {
      store.splice(index, 1);
      deleted = true;
    }
  });
  return deleted;
};
