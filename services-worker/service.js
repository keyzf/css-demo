var dataBase = value => new Promise((resolve, reject) =>  {
  
  if (value > 3) {
    console.log(value)
    resolve({ code: 0, data: { name: "success", value: 1 } });
  } else {
    reject({ code: 1, data: null });
  }
});



