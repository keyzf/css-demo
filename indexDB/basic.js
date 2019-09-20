/**
 * 键路径(keyPath)  键生成器(autoIncrement)   描述
   No	              No	                     这种对象存储空间可以持有任意类型的值，甚至是像数字和字符串这种基本数据类型的值。每当我                                            们想要增加一个新值的时候，必须提供一个单独的键参数。

   Yes	            No	                     这种对象存储空间只能持有 JavaScript 对象。这些对象必须具有一个和 key path 同名的属性。

   No	              Yes	                     这种对象存储空间可以持有任意类型的值。键会为我们自动生成，或者如果你想要使用一个特定键                                            的话你可以提供一个单独的键参数。

   Yes	            Yes	                     这种对象存储空间只能持有 JavaScript 对象。通常一个键被生成的同时，生成的键的值被存储在                                           对象中的一个和 key path 同名的属性中。然而，如果这样的一个属性已经存在的话，这个属性的                                           值被用作键而不会生成一个新的键。 
 * 
 */

var databaseName = "base";
var version = "1";
var request = window.indexedDB.open(databaseName, version);

request.onerror = function(event) {
  console.log("数据库打开报错");
};

var db;

request.onupgradeneeded = function(event) {
  var db = event.target.result;
  if (!db.objectStoreNames.contains("person")) {
    objectStore = db.createObjectStore("person", { keyPath: "id" });
    objectStore.createIndex("name", "name", { unique: false });
    objectStore.createIndex("email", "email", { unique: true });
  }
};

function add(value) {
  request.onsuccess = function() {
    db = request.result;
    var data = db
      .transaction(["person"], "readwrite")
      .objectStore("person")
      .add(value);

    data.onsuccess = function(event) {
      console.log("数据写入成功");
    };

    data.onerror = function(event) {
      console.log("数据写入失败");
    };
  };
}

function read(index) {
  request.onsuccess = function() {
    db = request.result;
    var transaction = db.transaction(["person"]);
    var objectStore = transaction.objectStore("person");
    var data = objectStore.get(index);

    data.onerror = function(event) {
      console.log("事务失败");
    };

    data.onsuccess = function(event) {
      if (request.result) {
        const result =  event.target.result
        console.log(result)
        console.log("Name: " + result.name);
        console.log("Age: " + result.age);
        console.log("Email: " + result.email);
        return result
      } else {
        console.log("未获得数据记录");
      }
    };
  };
}

// 遍历数据
function readAll() {
  request.onsuccess = function() {
    db = request.result;
    var objectStore = db.transaction("person").objectStore("person");

    objectStore.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;

      if (cursor) {
        console.log("Id: " + cursor.key);
        console.log("Name: " + cursor.value.name);
        console.log("Age: " + cursor.value.age);
        console.log("Email: " + cursor.value.email);
        cursor.continue();
      } else {
        console.log("没有更多数据了！");
      }
    };
  };
}

// readAll();

// 更新数据
function update(index,value) {
  request.onsuccess = function() {
    db = request.result;
    var data = db
      .transaction(["person"], "readwrite")
      .objectStore("person")
      .put(data);

    data.onsuccess = function(event) {
      console.log("数据更新成功");
    };

    data.onerror = function(event) {
      console.log("数据更新失败");
    };
  };
}

// update();

add({ id: 2, name: "李四", age: 18, email: "lisi@example.com" });
add({ id: 1, name: "张三", age: 24, email: "zhangsan@example.com" });
add({ id: 3, name: "王五", age: 8, email: "王五@example.com" });

read(2)
