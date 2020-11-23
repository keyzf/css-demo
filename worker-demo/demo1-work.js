var results = [];

function resultReceiver(event) {
  results.push(parseInt(event.data));
  if (results.length == 2) {
    postMessage(results[0] + results[1]);
  }
}

function errorReceiver(event) {
  throw event.data;
}

onmessage = function(event) {
  var n = parseInt(event.data);
  const result = n*100000000
  setTimeout(() => {
    console.log('=====onmessage', n, result)
    postMessage(result);
  }, 1000);
  
};

onerror = function(error)