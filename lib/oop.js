/**
 * @method extend
 * implementation of classical inheritance
 *
 */
function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype;
    if(superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}

/**
 * @method clone
 * implementation of prototypal inheritance
 */
function clone(object) {
    function F() {}
    F.prototype = object;
    return new F;
}

/**
 * @class Interface 
 * create a new Interface object
 * @param{string} name - the name of the Interface
 * @param{array} methods - an array containg the methods that are declared in the Interface
 */

var Interface = function(name, methods) {
    if (arguments.length != 2) {
        throw new Error("Interface constructor called with" + arguments.length + "arguments, but expected exactly 2.");
    }
    this.name = name;
    this.methods = [];
    for (var i=0, len=methods.length; i<len; i++) {
        if (typeof methods[i] !== 'string') {
            throw new Error("Interface constructor expects method names to be passed in as a string.");
        }
        this.methods.push(methods[i]);
    }
};

/**
 *  Static classic method
 */
Interface.ensureImplements = function(object) {
    if(arguments.length != 2){
        throw new Error("Function Interface.ensureImplements constructor called with " + arguments.length + " arguments, but expected exactly 2.");
    }
    for (var i=1, len=arguments.length; i<len; i++) {
        var _interface = arguments[i];
        if (_interface.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplements expects arguments two and above to be instances of Interface");
        }

        for (var j=0, methodsLen=_interface.methods.length; j<methodsLen; j++) {
            var method = _interface.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object " 
                                + "does not implement the " + _interface.name + "interface. Method " + method + " was not found." );
            }
        }
    }
};

module.exports.extend = extend;
module.exports.clone = clone;
module.exports.Interface = Interface;
