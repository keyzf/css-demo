function log(title,message,color){
  console.log(`%c ${title} ->`,`background:${color};color:#fff;font-weight:700;border-radius:3px;padding:1px 5px 1px 0;`,message)

}

log('哈哈哈', [1,2,3,4,5], '#2db7f5')
log('重要', [1,2,3,4,5], 'red')
log('log', [1,2,3,4,5], '#666')



void function(global){
	var mapping = {}, cache = {};
	global.startModule = function(m){
		require(m).start();
	};
	global.define = function(id, func){
		mapping[id] = func;
	};
	global.require = function(id){
		if(cache[id])
			return cache[id];
		else
			return cache[id] = mapping[id]({});
	};
}(this);


define('msg',function(exports){
  exports.error = function (message){
    console.log(`%c 错误提示 ->`,`background:#f00;color:#fff;font-weight:700;border-radius:3px;padding:1px 5px 1px 0;`,message)
  }

  exports.info = function (message){
    console.log(`%c 提示 ->`,`background:#666;color:#fff;font-weight:700;border-radius:3px;padding:1px 5px 1px 0;`,message)
  }

  exports.success = function (message){
    console.log(`%c 成功提示 ->`,`background:#2db7f5;color:#fff;font-weight:700;border-radius:3px;padding:1px 5px 1px 0;`, message)
  }

  return exports

})

var msg = require('msg')

msg.error('this is a important message!')