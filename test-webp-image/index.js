define("mui/tangram/webp", function(e, t, i) {
  "use strict";
  var r = false;
  var n = false;
  var a = false;
  var u = [];
  var m = "";
  var o = 0;
  var s = 7;
  var d = window.g_config || {};
  i.exports = {
      init: function p() {
          var e = this;
          e._testJPG();
          e._testPNG();
          e._testAlpha()
      },
      _loadDone: function l(e, t) {
          o |= e;
          this._checkDone(t)
      },
      _testJPG: function g(e) {
          var t = this;
          var i = new Image;
          i.onload = function() {
              r = true;
              u.push("jpg");
              u.push("jpeg");
              t._loadDone(1, e)
          }
          ;
          i.onerror = function() {
              t._loadDone(1, e)
          }
          ;
          i.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"
      },
      _testPNG: function c(e) {
          var t = this;
          var i = new Image;
          i.onload = function() {
              n = true;
              u.push("png");
              t._loadDone(2, e)
          }
          ;
          i.onerror = function() {
              t._loadDone(2, e)
          }
          ;
          i.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA=="
      },
      _testAlpha: function f(e) {
          var t = this;
          var i = new Image;
          i.onload = function() {
              a = true;
              t._loadDone(4, e)
          }
          ;
          i.onerror = function() {
              t._loadDone(4, e)
          }
          ;
          i.src = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA=="
      },
      _checkDone: function x(e) {
          var t = this;
          if (o === s) {
              if (t["canAddSuffixReg"] === undefined) {
                  t._generateReg()
              }
              if (e && e.__webp__hadExec === undefined) {
                  e.__webp__hadExec = true;
                  S.isFunction(e) && e({
                      jpeg: r,
                      jpg: r,
                      png: n,
                      alpha: a
                  })
              }
          } else {
              return false
          }
      },
      _generateReg: function y() {
          m = u.join("|");
          if (u.length > 0) {
              this["canAddSuffixReg"] = new RegExp(m + "$","i");
              this["transformReg"] = new RegExp("(." + m + ')s*"',"gi")
          }
      },
      isSupport: function A(e) {
          var t = this;
          if (t._checkDone(e) === false) {
              t._testJPG(e);
              t._testPNG(e);
              t._testAlpha(e)
          }
          return {
              jpeg: r,
              jpg: r,
              png: n,
              alpha: a
          }
      },
      get: function v(e, t) {
          var i = this;
          if (o === s) {
              if (i.canAddSuffixReg && i.canAddSuffixReg.test(e)) {
                  if (n || n === false && e.indexOf(".png") < 0) {
                      return e + (t ? t : "_.webp")
                  }
              }
          }
          return e
      },
      transform: function h(e, t) {
          if (o === s) {
              if (this.transformReg !== undefined) {
                  e = e.replace(this.transformReg, "$1" + (t ? t : "_.webp") + '"');
                  if (n === false) {
                      e = e.replace(new RegExp("(\\.png_.+?\\.(?:jpg|jpeg))" + (t ? t : "_\\.webp"),"gi"), "$1")
                  }
              }
          }
          return e
      },
      suffix: function b(e, t) {
          var i = this;
          if (o === s) {
              if (i.canAddSuffixReg && i.canAddSuffixReg.test(e)) {
                  if (n || n === false && e.indexOf(".png") < 0) {
                      return t ? t : "_.webp"
                  }
              }
          }
          return ""
      }
  }
});


const testWebp = function(callback){
  var image = new Image();  
  image.onerror = function() {  
    callback(false);  
  };  
  image.onload = function() {  
    callback(image.width == 1);  
  };  
  image.src = 'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';  

}