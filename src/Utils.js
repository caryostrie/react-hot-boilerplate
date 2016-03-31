var Utils = {
  generateGuid: function() {
    // rfc4122 version 4 compliant
    // see http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    // Original solution - http://www.broofa.com/2008/09/javascript-uuid-function/
    // Updated with - http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var d = Date.now();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
  },
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  areObjectsEqual: function(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }
};
export default Utils;
