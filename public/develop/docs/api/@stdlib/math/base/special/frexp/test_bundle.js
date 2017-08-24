// modules are defined as an array
// [ module function, map of requireuires ]
//
// map of requireuires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the requireuire for previous bundles

(function outer (modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;

    function findProxyquireifyName() {
        var deps = Object.keys(modules)
            .map(function (k) { return modules[k][1]; });

        for (var i = 0; i < deps.length; i++) {
            var pq = deps[i]['proxyquireify'];
            if (pq) return pq;
        }
    }

    var proxyquireifyName = findProxyquireifyName();

    function newRequire(name, jumped){
        // Find the proxyquireify module, if present
        var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];

        // Proxyquireify provides a separate cache that is used when inside
        // a proxyquire call, and is set to null outside a proxyquire call.
        // This allows the regular caching semantics to work correctly both
        // inside and outside proxyquire calls while keeping the cached
        // modules isolated.
        // When switching from one proxyquire call to another, it clears
        // the cache to prevent contamination between different sets
        // of stubs.
        var currentCache = (pqify && pqify.exports._cache) || cache;

        if(!currentCache[name]) {
            if(!modules[name]) {
                // if we cannot find the the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof require == "function" && require;
                if (!jumped && currentRequire) return currentRequire(name, true);

                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) return previousRequire(name, true);
                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }
            var m = currentCache[name] = {exports:{}};

            // The normal browserify require function
            var req = function(x){
                var id = modules[name][1][x];
                return newRequire(id ? id : x);
            };

            // The require function substituted for proxyquireify
            var moduleRequire = function(x){
                var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];
                // Only try to use the proxyquireify version if it has been `require`d
                if (pqify && pqify.exports._proxy) {
                    return pqify.exports._proxy(req, x);
                } else {
                    return req(x);
                }
            };

            modules[name][0].call(m.exports,moduleRequire,m,m.exports,outer,modules,currentCache,entry);
        }
        return currentCache[name].exports;
    }
    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
})
({1:[function(require,module,exports){
'use strict';

// FUNCTIONS //

var has = Object.prototype.hasOwnProperty;


// MAIN //

/**
* Tests if an object has a specified property.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object has a specified property
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'bap' );
* // returns false
*/
function hasOwnProp( value, property ) {
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	return has.call( value, property );
} // end FUNCTION hasOwnProp()


// EXPORTS //

module.exports = hasOwnProp;

},{}],2:[function(require,module,exports){
'use strict';

/**
* Test whether an object has a specified property.
*
* @module @stdlib/assert/has-own-property
*
* @example
* var hasOwnProp = require( '@stdlib/assert/has-own-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* bool = hasOwnProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasOwnProp = require( './has_own_property.js' );


// EXPORTS //

module.exports = hasOwnProp;

},{"./has_own_property.js":1}],3:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array.
*
* @module @stdlib/assert/is-array
*
* @example
* var isArray = require( '@stdlib/assert/is-array' );
*
* var bool = isArray( [] );
* // returns true
*
* bool = isArray( {} );
* // returns false
*/

// MODULES //

var isArray = require( './is_array.js' );


// EXPORTS //

module.exports = isArray;

},{"./is_array.js":4}],4:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an array
*
* @example
* var bool = isArray( [] );
* // returns true
*
* @example
* var bool = isArray( {} );
* // returns false
*/
function isArray( value ) {
	return ( nativeClass( value ) === '[object Array]' );
} // end FUNCTION isArray()


// EXPORTS //

module.exports = Array.isArray || isArray;

},{"@stdlib/utils/native-class":140}],5:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = true;

},{}],6:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a Buffer instance.
*
* @module @stdlib/assert/is-buffer
*
* @example
* var isBuffer = require( '@stdlib/assert/is-buffer' );
*
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* v = isBuffer( {} );
* // returns false
*/

// MODULES //

var isBuffer = require( './is_buffer.js' );


// EXPORTS //

module.exports = isBuffer;

},{"./is_buffer.js":7}],7:[function(require,module,exports){
'use strict';

// MODULES //

var isObjectLike = require( '@stdlib/assert/is-object-like' );


// MAIN //

/**
* Tests if a value is a Buffer instance.
*
* @param {*} value - value to validate
* @returns {boolean} boolean indicating if a value is a Buffer instance
*
* @example
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
*
* @example
* var v = isBuffer( {} );
* // returns false
*
* @example
* var v = isBuffer( [] );
* // returns false
*/
function isBuffer( value ) {
	return (
		isObjectLike( value ) &&
		(
			// eslint-disable-next-line no-underscore-dangle
			value._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
			(
				value.constructor &&
				// WARNING: `typeof` is not a foolproof check, as certain envs consider RegExp and NodeList instances to be functions
				typeof value.constructor.isBuffer === 'function' &&
				value.constructor.isBuffer( value )
			)
		)
	);
} // end FUNCTION isBuffer()


// EXPORTS //

module.exports = isBuffer;

},{"@stdlib/assert/is-object-like":24}],8:[function(require,module,exports){
'use strict';

/**
* Test if a value is a function.
*
* @module @stdlib/assert/is-function
*
* @example
* var isFunction = require( '@stdlib/assert/is-function' );
*
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/

// MODULES //

var isFunction = require( './is_function.js' );


// EXPORTS //

module.exports = isFunction;

},{"./is_function.js":9}],9:[function(require,module,exports){
'use strict';

// MODULES //

var typeOf = require( '@stdlib/utils/type-of' );


// MAIN //

/**
* Tests if a value is a function.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a function
*
* @example
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/
function isFunction( value ) {
	// Note: cannot use `typeof` directly, as various browser engines incorrectly return `'function'` when operating on non-function objects, such as regular expressions and NodeLists.
	return ( typeOf( value ) === 'function' );
} // end FUNCTION isFunction()


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":149}],10:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is an integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an integer
*
* @example
* var bool = isInteger( 5.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isInteger( -3.14 );
* // returns false
*
* @example
* var bool = isInteger( null );
* // returns false
*/
function isInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./object.js":13,"./primitive.js":14}],11:[function(require,module,exports){
'use strict';

/**
* Test if a value is an integer.
*
* @module @stdlib/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/assert/is-integer' );
*
* var bool = isInteger( 5.0 );
* // returns true
*
* bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isInteger( -3.14 );
* // returns false
*
* bool = isInteger( null );
* // returns false
*
* @example
* // Use interface to check for integer primitives...
* var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
*
* var bool = isInteger( -3.0 );
* // returns true
*
* bool = isInteger( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for integer objects...
* var isInteger = require( '@stdlib/assert/is-integer' ).isObject;
*
* var bool = isInteger( 3.0 );
* // returns false
*
* bool = isInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isInteger, 'isPrimitive', isPrimitive );
setReadOnly( isInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isInteger;

},{"./generic.js":10,"./object.js":13,"./primitive.js":14,"@stdlib/utils/define-read-only-property":129}],12:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var isInt = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a number primitive is an integer value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a number primitive is an integer value
*/
function isInteger( value ) {
	return (
		value < PINF &&
		value > NINF &&
		isInt( value )
	);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/assert/is-integer":40,"@stdlib/math/constants/float64-ninf":121,"@stdlib/math/constants/float64-pinf":122}],13:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number object having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having an integer value
*
* @example
* var bool = isInteger( 3.0 );
* // returns false
*
* @example
* var bool = isInteger( new Number( 3.0 ) );
* // returns true
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value.valueOf() )
	);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":12,"@stdlib/assert/is-number":19}],14:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number primitive having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having an integer value
*
* @example
* var bool = isInteger( -3.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( -3.0 ) );
* // returns false
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value )
	);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":12,"@stdlib/assert/is-number":19}],15:[function(require,module,exports){
'use strict';

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],16:[function(require,module,exports){
'use strict';

/**
* Returns a boolean indicating if an environment is little endian.
*
* @module @stdlib/assert/is-little-endian
*
* @example
* var IS_LITTLE_ENDIAN = require( '@stdlib/assert/is-little-endian' );
*
* var bool = IS_LITTLE_ENDIAN;
* // returns <boolean>
*/

// MODULES //

var IS_LITTLE_ENDIAN = require( './is_little_endian.js' );


// EXPORTS //

module.exports = IS_LITTLE_ENDIAN;

},{"./is_little_endian.js":17}],17:[function(require,module,exports){
'use strict';

// MODULES //

var ctors = require( './ctors.js' );


// MAIN //

/**
* Returns a boolean indicating if an environment is little endian.
*
* @returns {boolean} boolean indicating if an environment is little endian
*
* @example
* var bool = isLittleEndian();
* // returns <boolean>
*/
function isLittleEndian() {
	var uint16view;
	var uint8view;

	uint16view = new ctors[ 'uint16' ]( 1 );

	// Set the uint16 view to a value having distinguishable lower and higher order words.
	// 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
} // end FUNCTION isLittleEndian()


// EXPORTS //

module.exports = isLittleEndian();

},{"./ctors.js":15}],18:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a number
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* bool = isNumber( NaN );
* // returns true
*
* @example
* bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{"./object.js":20,"./primitive.js":21}],19:[function(require,module,exports){
'use strict';

/**
* Test if a value is a number.
*
* @module @stdlib/assert/is-number
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' );
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( null );
* // returns false
*
* @example
* // Use interface to check for number primitives...
* var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns false
*
* @example
* // Use interface to check for number objects...
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNumber;

},{"./generic.js":18,"./object.js":20,"./primitive.js":21,"@stdlib/utils/define-read-only-property":129}],20:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


// MAIN //

/**
* Tests if a value is a number object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object
*
* @example
* var bool = isNumber( 3.14 );
* // returns false
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*/
function isNumber( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":23,"@stdlib/utils/detect-tostringtag-support":133,"@stdlib/utils/native-class":140}],21:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{}],22:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],23:[function(require,module,exports){
'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value can be serialized
*/
function test( value ) {
	try {
		toString.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./tostring.js":22}],24:[function(require,module,exports){
'use strict';

/**
* Test if a value is object-like.
*
* @module @stdlib/assert/is-object-like
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' );
*
* var bool = isObjectLike( {} );
* // returns true
*
* bool = isObjectLike( [] );
* // returns true
*
* bool = isObjectLike( null );
* // returns false
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' ).isObjectLikeArray;
*
* var bool = isObjectLike( [ {}, [] ] );
* // returns true
*
* bool = isObjectLike( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isObjectLike = require( './is_object_like.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./is_object_like.js":25,"@stdlib/assert/tools/array-function":35,"@stdlib/utils/define-read-only-property":129}],25:[function(require,module,exports){
'use strict';

/**
* Tests if a value is object-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is object-like
*
* @example
* var bool = isObjectLike( {} );
* // returns true
*
* @example
* var bool = isObjectLike( [] );
* // returns true
*
* @example
* var bool = isObjectLike( null );
* // returns false
*/
function isObjectLike( value ) {
	return (
		value !== null &&
		typeof value === 'object'
	);
} // end FUNCTION isObjectLike()


// EXPORTS //

module.exports = isObjectLike;

},{}],26:[function(require,module,exports){
'use strict';

/**
* Test if a value is an object.
*
* @module @stdlib/assert/is-object
*
* @example
* var isObject = require( '@stdlib/assert/is-object' );
*
* var bool = isObject( {} );
* // returns true
*
* bool = isObject( true );
* // returns false
*/

// MODULES //

var isObject = require( './is_object.js' );


// EXPORTS //

module.exports = isObject;

},{"./is_object.js":27}],27:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Tests if a value is an object; e.g., {}.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an object
*
* @example
* var bool = isObject( {} );
* // returns true
*
* @example
* var bool = isObject( null );
* // returns false
*/
function isObject( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		!isArray( value )
	);
} // end FUNCTION isObject()


// EXPORTS //

module.exports = isObject;

},{"@stdlib/assert/is-array":3}],28:[function(require,module,exports){
'use strict';

/**
* Test if a value is a plain object.
*
* @module @stdlib/assert/is-plain-object
*
* @example
* var isPlainObject = require( '@stdlib/assert/is-plain-object' );
*
* var bool = isPlainObject( {} );
* // returns true
*
* bool = isPlainObject( null );
* // returns false
*/

// MODULES //

var isPlainObject = require( './is_plain_object.js' );


// EXPORTS //

module.exports = isPlainObject;

},{"./is_plain_object.js":29}],29:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-object' );
var isFunction = require( '@stdlib/assert/is-function' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var objectPrototype = Object.prototype;


// FUNCTIONS //

/**
* Tests that an object only has own properties.
*
* @private
* @param {Object} obj - value to test
* @returns {boolean} boolean indicating if an object only has own properties
*/
function ownProps( obj ) {
	var key;

	// NOTE: possibility of perf boost if key enumeration order is known (see http://stackoverflow.com/questions/18531624/isplainobject-thing).
	for ( key in obj ) {
		if ( !hasOwnProp( obj, key ) ) {
			return false;
		}
	}
	return true;
} // end FUNCTION ownProps()


// MAIN //

/**
* Tests if a value is a plain object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a plain object
*
* @example
* var bool = isPlainObject( {} );
* // returns true
*
* @example
* var bool = isPlainObject( null );
* // returns false
*/
function isPlainObject( value ) {
	var proto;

	// Screen for obvious non-objects...
	if ( !isObject( value ) ) {
		return false;
	}
	// Objects with no prototype (e.g., `Object.create( null )`) are plain...
	proto = getPrototypeOf( value );
	if ( !proto ) {
		return true;
	}
	// Objects having a prototype are plain if and only if they are constructed with a global `Object` function and the prototype points to the prototype of a plain object...
	return (
		// Cannot have own `constructor` property:
		!hasOwnProp( value, 'constructor' ) &&

		// Prototype `constructor` property must be a function (see also https://bugs.jquery.com/ticket/9897 and http://stackoverflow.com/questions/18531624/isplainobject-thing):
		hasOwnProp( proto, 'constructor' ) &&
		isFunction( proto.constructor ) &&
		nativeClass( proto.constructor ) === '[object Function]' &&

		// Test for object-specific method:
		hasOwnProp( proto, 'isPrototypeOf' ) &&
		isFunction( proto.isPrototypeOf ) &&

		(
			// Test if the prototype matches the global `Object` prototype (same realm):
			proto === objectPrototype ||

			// Test that all properties are own properties (cross-realm; *most* likely a plain object):
			ownProps( value )
		)
	);
} // end FUNCTION isPlainObject()


// EXPORTS //

module.exports = isPlainObject;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-function":8,"@stdlib/assert/is-object":26,"@stdlib/utils/get-prototype-of":136,"@stdlib/utils/native-class":140}],30:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a positive integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a positive integer
*
* @example
* var bool = isPositiveInteger( 5.0 );
* // returns true
*
* @example
* var bool = isPositiveInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isPositiveInteger( 0.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( -5.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( 3.14 );
* // returns false
*
* @example
* var bool = isPositiveInteger( null );
* // returns false
*/
function isPositiveInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"./object.js":32,"./primitive.js":33}],31:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a positive integer.
*
* @module @stdlib/assert/is-positive-integer
*
* @example
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' );
*
* var bool = isPositiveInteger( 5.0 );
* // returns true
*
* bool = isPositiveInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isPositiveInteger( -5.0 );
* // returns false
*
* bool = isPositiveInteger( 3.14 );
* // returns false
*
* bool = isPositiveInteger( null );
* // returns false
*
* @example
* // Use interface to check for positive integer primitives...
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
*
* var bool = isPositiveInteger( 3.0 );
* // returns true
*
* bool = isPositiveInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for positive integer objects...
* var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isObject;
*
* var bool = isPositiveInteger( 3.0 );
* // returns false
*
* bool = isPositiveInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isPositiveInteger, 'isPrimitive', isPrimitive );
setReadOnly( isPositiveInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isPositiveInteger;

},{"./generic.js":30,"./object.js":32,"./primitive.js":33,"@stdlib/utils/define-read-only-property":129}],32:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a positive integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a positive integer value
*
* @example
* var bool = isPositiveInteger( 3.0 );
* // returns false
*
* @example
* var bool = isPositiveInteger( new Number( 3.0 ) );
* // returns true
*/
function isPositiveInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() > 0.0
	);
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"@stdlib/assert/is-integer":11}],33:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a positive integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a positive integer value
*
* @example
* var bool = isPositiveInteger( 3.0 );
* // returns true
*
* @example
* var bool = isPositiveInteger( new Number( 3.0 ) );
* // returns false
*/
function isPositiveInteger( value ) {
	return (
		isInteger( value ) &&
		value > 0.0
	);
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"@stdlib/assert/is-integer":11}],34:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Returns a function which tests if every element in an array passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arrayfcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `' + predicate + '`.' );
	}
	return every;
	/**
	* Tests if every element in an array passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArray( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	} // end FUNCTION every()
} // end FUNCTION arrayfcn()


// EXPORTS //

module.exports = arrayfcn;

},{"@stdlib/assert/is-array":3}],35:[function(require,module,exports){
'use strict';

/**
* Return a function which tests if every element in an array passes a test condition.
*
* @module @stdlib/assert/tools/array-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arrayfcn = require( '@stdlib/assert/tools/array-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arrayfcn = require( './arrayfcn.js' );


// EXPORTS //

module.exports = arrayfcn;

},{"./arrayfcn.js":34}],36:[function(require,module,exports){
'use strict';

/**
* Test if a finite numeric value is an even number.
*
* @module @stdlib/math/base/assert/is-even
*
* @example
* var isEven = require( '@stdlib/math/base/assert/is-even' );
*
* var bool = isEven( 5.0 );
* // returns false
*
* bool = isEven( -2.0 );
* // returns true
*
* bool = isEven( 0.0 );
* // returns true
*
* bool = isEven( NaN );
* // returns false
*/

// MODULES //

var isEven = require( './is_even.js' );


// EXPORTS //

module.exports = isEven;

},{"./is_even.js":37}],37:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a finite numeric value is an even number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an even number
*
* @example
* var bool = isEven( 5.0 );
* // returns false
*
* @example
* var bool = isEven( -2.0 );
* // returns true
*
* @example
* var bool = isEven( 0.0 );
* // returns true
*
* @example
* var bool = isEven( NaN );
* // returns false
*/
function isEven( x ) {
	return isInteger( x/2.0 );
} // end FUNCTION isEven()


// EXPORTS //

module.exports = isEven;

},{"@stdlib/math/base/assert/is-integer":40}],38:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is infinite.
*
* @module @stdlib/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
*
* var bool = isInfinite( Number.POSITIVE_INFINITY );
* // returns true
*
* bool = isInfinite( Number.NEGATIVE_INFINITY );
* // returns true
*
* bool = isInfinite( 5.0 );
* // returns false
*
* bool = isInfinite( NaN );
* // returns false
*/

// MODULES //

var isInfinite = require( './is_infinite.js' );


// EXPORTS //

module.exports = isInfinite;

},{"./is_infinite.js":39}],39:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Number.POSITIVE_INFINITY );
* // returns true
*
* @example
* var bool = isInfinite( Number.NEGATIVE_INFINITY );
* // returns true
*
* @example
* var bool = isInfinite( 5.0 );
* // returns false
*
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
} // end FUNCTION isInfinite()


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/math/constants/float64-ninf":121,"@stdlib/math/constants/float64-pinf":122}],40:[function(require,module,exports){
'use strict';

/**
* Test if a finite double-precision floating-point number is an integer.
*
* @module @stdlib/math/base/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/math/base/assert/is-integer' );
*
* var bool = isInteger( 1.0 );
* // returns true
*
* bool = isInteger( 3.14 );
* // returns false
*/

// MODULES //

var isInteger = require( './is_integer.js' );


// EXPORTS //

module.exports = isInteger;

},{"./is_integer.js":41}],41:[function(require,module,exports){
'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is an integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an integer
*
* @example
* var bool = isInteger( 1.0 );
* // returns true
*
* @example
* var bool = isInteger( 3.14 );
* // returns false
*/
function isInteger( x ) {
	return (floor(x) === x);
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/special/floor":67}],42:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is `NaN`.
*
* @module @stdlib/math/base/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/math/base/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 7.0 );
* // returns false
*/

// MODULES //

var isnan = require( './is_nan.js' );


// EXPORTS //

module.exports = isnan;

},{"./is_nan.js":43}],43:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if a numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 7.0 );
* // returns false
*/
function isnan( x ) {
	return (x !== x);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{}],44:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zero
*
* @example
* var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( 0.0 );
* // returns false
*/

// MODULES //

var isNegativeZero = require( './is_negative_zero.js' );


// EXPORTS //

module.exports = isNegativeZero;

},{"./is_negative_zero.js":45}],45:[function(require,module,exports){
'use strict';

// MODULES //

var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( 0.0 );
* // returns false
*/
function isNegativeZero( x ) {
	return (x === 0.0 && 1.0/x === NINF);
} // end FUNCTION isNegativeZero()


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/math/constants/float64-ninf":121}],46:[function(require,module,exports){
'use strict';

/**
* Test if a finite numeric value is an odd number.
*
* @module @stdlib/math/base/assert/is-odd
*
* @example
* var isOdd = require( '@stdlib/math/base/assert/is-odd' );
*
* var bool = isOdd( 5.0 );
* // returns true
*
* bool = isOdd( -2.0 );
* // returns false
*
* bool = isOdd( 0.0 );
* // returns false
*
* bool = isOdd( NaN );
* // returns false
*/

// MODULES //

var isOdd = require( './is_odd.js' );


// EXPORTS //

module.exports = isOdd;

},{"./is_odd.js":47}],47:[function(require,module,exports){
'use strict';

// MODULES //

var isEven = require( '@stdlib/math/base/assert/is-even' );


// MAIN //

/**
* Tests if a finite numeric value is an odd number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an odd number
*
* @example
* var bool = isOdd( 5.0 );
* // returns true
*
* @example
* var bool = isOdd( -2.0 );
* // returns false
*
* @example
* var bool = isOdd( 0.0 );
* // returns false
*
* @example
* var bool = isOdd( NaN );
* // returns false
*/
function isOdd( x ) {
	// Check sign to prevent overflow...
	if ( x > 0.0 ) {
		return isEven( x-1.0 );
	}
	return isEven( x+1.0 );
} // end FUNCTION isOdd()


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/math/base/assert/is-even":36}],48:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// VARIABLES //

var NUM_WARMUPS = 8;
var TABLE_SIZE = 32;


// MAIN //

/**
* Initializes a shuffle table.
*
* @private
* @param {Function} rand - pseudorandom number generator
* @returns {NumberArray} shuffle table
*/
function createTable( rand ) {
	var table;
	var v;
	var i;

	// "warm-up" the PRNG...
	for ( i = 0; i < NUM_WARMUPS; i++ ) {
		v = rand();
	}
	// Prevent the above loop from being discarded by the compiler...
	if ( isnan( v ) ) {
		throw new Error( 'unexpected error. PRNG returned `NaN`.' );
	}
	// Create the shuffle table...
	table = new Array( TABLE_SIZE );
	for ( i = TABLE_SIZE-1; i >= 0; i-- ) {
		table[ i ] = rand();
	}
	return table;
} // end FUNCTION createTable()


// EXPORTS //

module.exports = createTable;

},{"@stdlib/math/base/assert/is-nan":42}],49:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var floor = require( '@stdlib/math/base/special/floor' );
var INT32_MAX = require( '@stdlib/math/constants/int32-max' );
var minstd = require( '@stdlib/math/base/random/minstd' ).factory;
var createTable = require( './create_table.js' );


// VARIABLES //

var NORMALIZATION_CONSTANT = INT32_MAX - 1;
var MAX_SEED = INT32_MAX - 1;


// MAIN //

/**
* Returns a linear congruential pseudorandom number generator (LCG) whose output is shuffled.
*
* @param {PositiveInteger} [seed] - pseudorandom number generator seed
* @throws {TypeError} must provide a positive integer
* @throws {RangeError} must provide a positive integer less than the maximum signed 32-bit integer
* @returns {Function} shuffled LCG
*
* @example
* var minstd = factory();
*
* var v = minstd();
* // returns <number>
*
* @example
* // Return a seeded LCG:
* var minstd = factory( 1234 );
*
* var v = minstd();
* // returns 1421600654
*/
function factory( seed ) {
	var table;
	var state;
	var rand;
	if ( arguments.length ) {
		if ( !isPositiveInteger( seed ) ) {
			throw new TypeError( 'invalid input argument. Must provide a positive integer. Value: `' + seed + '`.' );
		}
		if ( seed > MAX_SEED ) {
			throw new RangeError( 'invalid input argument. Must provide a positive integer less than the maximum signed 32-bit integer. Value: `' + seed + '`.' );
		}
		rand = minstd( seed );
	} else {
		rand = minstd();
	}
	table = createTable( rand );
	state = table[ 0 ];

	setReadOnly( minstdShuffle, 'NAME', 'minstd-shuffle' );
	setReadOnly( minstdShuffle, 'SEED', rand.SEED );
	setReadOnly( minstdShuffle, 'MIN', 1 );
	setReadOnly( minstdShuffle, 'MAX', INT32_MAX-1 );
	setReadOnly( minstdShuffle, 'normalized', normalized );

	setReadOnly( normalized, 'NAME', minstdShuffle.NAME );
	setReadOnly( normalized, 'SEED', minstdShuffle.SEED );
	setReadOnly( normalized, 'MIN', (minstdShuffle.MIN-1) / NORMALIZATION_CONSTANT );
	setReadOnly( normalized, 'MAX', (minstdShuffle.MAX-1) / NORMALIZATION_CONSTANT );

	return minstdShuffle;

	/**
	* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
	*
	* @private
	* @returns {PositiveInteger} pseudorandom integer
	*
	* @example
	* var v = minstd();
	* // returns <number>
	*/
	function minstdShuffle() {
		var i = floor( table.length * (state/INT32_MAX) );

		// Pull a state from the table and replace:
		state = table[ i ];
		table[ i ] = rand();

		return state;
	} // end FUNCTION minstdShuffle()

	/**
	* Generates a pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var v = normalized()
	* // returns <number>
	*/
	function normalized() {
		return (minstdShuffle()-1) / NORMALIZATION_CONSTANT;
	} // end FUNCTION normalized()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./create_table.js":48,"@stdlib/assert/is-positive-integer":31,"@stdlib/math/base/random/minstd":54,"@stdlib/math/base/special/floor":67,"@stdlib/math/constants/int32-max":124,"@stdlib/utils/define-read-only-property":129}],50:[function(require,module,exports){
'use strict';

/**
* A linear congruential pseudorandom number generator (LCG) whose output is shuffled.
*
* @module @stdlib/math/base/random/minstd-shuffle
*
* @example
* var minstd = require( '@stdlib/math/base/random/minstd-shuffle' );
*
* var v = minstd();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/math/base/random/minstd' ).factory;
*
* var minstd = factory( 1234 );
*
* var v = minstd();
* // returns 1421600654
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var minstd = require( './minstd_shuffled.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( minstd, 'factory', factory );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":49,"./minstd_shuffled.js":51,"@stdlib/utils/define-read-only-property":129}],51:[function(require,module,exports){
'use strict';

// MODULES //

var factory = require( './factory.js' );
var randint32 = require( './rand_int32.js' );


// MAIN //

/**
* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
*
* #### Method
*
* This implementation shuffles the output of a linear congruential pseudorandom number generator (LCG) using a shuffle table in accordance with the Bays-Durham algorithm.
*
*
* #### References
*
* * Bays, Carter, and S. D. Durham. 1976. "Improving a Poor Random Number Generator." *ACM Transactions on Mathematical Software* 2 (1). New York, NY, USA: ACM: 59–64. doi:[10.1145/355666.355670](http://dx.doi.org/10.1145/355666.355670).
* * Herzog, T.N., and G. Lord. 2002. *Applications of Monte Carlo Methods to Finance and Insurance*. ACTEX Publications. [https://books.google.com/books?id=vC7I\\\_gdX-A0C](https://books.google.com/books?id=vC7I\_gdX-A0C).
* * Press, William H., Brian P. Flannery, Saul A. Teukolsky, and William T. Vetterling. 1992. *Numerical Recipes in C: The Art of Scientific Computing, Second Edition*. Cambridge University Press.
*
*
* @function minstd
* @type {Function}
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = minstd();
* // returns <number>
*/
var minstd = factory( randint32() );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":49,"./rand_int32.js":52}],52:[function(require,module,exports){
'use strict';

// MODULES //

var INT32_MAX = require( '@stdlib/math/constants/int32-max' );
var floor = require( '@stdlib/math/base/special/floor' );


// VARIABLES //

var MAX = INT32_MAX - 1;


// MAIN //

/**
* Returns a pseudorandom integer on the interval \\([1, 2^{31}-1)\\).
*
* @private
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = randint();
* // returns <number>
*/
function randint32() {
	var v = floor( 1.0 + (MAX*Math.random()) );
	return v|0; // asm type annotation
} // end FUNCTION randint32()


// EXPORTS //

module.exports = randint32;

},{"@stdlib/math/base/special/floor":67,"@stdlib/math/constants/int32-max":124}],53:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;
var INT32_MAX = require( '@stdlib/math/constants/int32-max' );
var randint32 = require( './rand_int32.js' );


// VARIABLES //

var NORMALIZATION_CONSTANT = INT32_MAX - 1;
var MAX_SEED = INT32_MAX - 1;
var A = 16807|0; // asm type annotation


// MAIN //

/**
* Returns a linear congruential pseudorandom number generator (LCG) based on Park and Miller.
*
* @param {PositiveInteger} [seed] - pseudorandom number generator seed
* @throws {TypeError} must provide a positive integer
* @throws {RangeError} must provide a positive integer less than the maximum signed 32-bit integer
* @returns {Function} LCG
*
* @example
* var minstd = factory();
*
* var v = minstd();
* // returns <number>
*
* @example
* // Return a seeded LCG:
* var minstd = factory( 1234 );
*
* var v = minstd();
* // returns 20739838
*/
function factory( seed ) {
	var state;
	if ( arguments.length ) {
		if ( !isPositiveInteger( seed ) ) {
			throw new TypeError( 'invalid input argument. Must provide a positive integer. Value: `' + seed + '`.' );
		}
		if ( seed > MAX_SEED ) {
			throw new RangeError( 'invalid input argument. Must provide a positive integer less than the maximum signed 32-bit integer. Value: `' + seed + '`.' );
		}
		state = seed|0; // asm type annotation
	} else {
		state = randint32();
	}
	setReadOnly( minstd, 'NAME', 'minstd' );
	setReadOnly( minstd, 'SEED', state );
	setReadOnly( minstd, 'MIN', 1 );
	setReadOnly( minstd, 'MAX', INT32_MAX-1 );
	setReadOnly( minstd, 'normalized', normalized );

	setReadOnly( normalized, 'NAME', minstd.NAME );
	setReadOnly( normalized, 'SEED', minstd.SEED );
	setReadOnly( normalized, 'MIN', (minstd.MIN-1.0) / NORMALIZATION_CONSTANT );
	setReadOnly( normalized, 'MAX', (minstd.MAX-1.0) / NORMALIZATION_CONSTANT );

	return minstd;

	/**
	* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
	*
	* @private
	* @returns {PositiveInteger} pseudorandom integer
	*
	* @example
	* var v = minstd();
	* // returns <number>
	*/
	function minstd() {
		state = ( A * state ) % INT32_MAX;
		return state|0; // asm type annotation
	} // end FUNCTION minstd()

	/**
	* Generates a pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var v = normalized()
	* // returns <number>
	*/
	function normalized() {
		return (minstd()-1) / NORMALIZATION_CONSTANT;
	} // end FUNCTION normalized()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./rand_int32.js":56,"@stdlib/assert/is-positive-integer":31,"@stdlib/math/constants/int32-max":124,"@stdlib/utils/define-read-only-property":129}],54:[function(require,module,exports){
'use strict';

/**
* A linear congruential pseudorandom number generator (LCG) based on Park and Miller.
*
* @module @stdlib/math/base/random/minstd
*
* @example
* var minstd = require( '@stdlib/math/base/random/minstd' );
*
* var v = minstd();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/math/base/random/minstd' ).factory;
*
* var minstd = factory( 1234 );
*
* var v = minstd();
* // returns 20739838
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var minstd = require( './minstd.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( minstd, 'factory', factory );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":53,"./minstd.js":55,"@stdlib/utils/define-read-only-property":129}],55:[function(require,module,exports){
'use strict';

// MODULES //

var factory = require( './factory.js' );
var randint32 = require( './rand_int32.js' );


// MAIN //

/**
* Generates a pseudorandom integer on the interval \\( [1,2^{31}-1) \\).
*
* #### Method
*
* Linear congruential generators (LCGs) use the recurrence relation
*
* ``` tex
* X_{n+1} = ( a \cdot X_n + c ) \operatorname{mod}(m)
* ```
*
* where the modulus \\( m \\) is a prime number or power of a prime number and \\( a \\) is a primitive root modulo \\( m \\).
*
* <!-- <note> -->
*
* For an LCG to be a Lehmer RNG, the seed \\( X_0 \\) must be coprime to \\( m \\).
*
* <!-- </note> -->
*
* In this implementation, the constants \\( a \\), \\( c \\), and \\( m \\) have the values
*
* ``` tex
* \begin{align*}
* a &= 7^5 = 16807 \\
* c &= 0 \\
* m &= 2^{31} - 1 = 2147483647
* \end{align*}
* ```
*
* <!-- <note> -->
*
* The constant \\( m \\) is a Mersenne prime (modulo \\(31\\)).
*
* <!-- </note> -->
*
* <!-- <note> -->
*
* The constant \\( a \\) is a primitive root (modulo \\(31\\)).
*
* <!-- </note> -->
*
* Accordingly, the maximum possible product is
*
* ``` tex
* 16807 \cdot (m - 1) \approx 2^{46}
* ```
*
* The values for \\( a \\), \\( c \\), and \\( m \\) are taken from Park and Miller, "Random Number Generators: Good Ones Are Hard To Find". Park's and Miller's article is also the basis for a recipe in the second edition of *Numerical Recipes in C*.
*
*
* #### Notes
*
* * The generator has a period of approximately \\(2.1\mbox{e}9\\) (see [Numerical Recipes in C, 2nd Edition](#references), p. 279).
*
*
* #### References
*
* * Park, S. K., and K. W. Miller. 1988. "Random Number Generators: Good Ones Are Hard to Find." *Communications of the ACM* 31 (10). New York, NY, USA: ACM: 1192–1201. doi:[10.1145/63039.63042](http://dx.doi.org/10.1145/63039.63042).
* * Press, William H., Brian P. Flannery, Saul A. Teukolsky, and William T. Vetterling. 1992. *Numerical Recipes in C: The Art of Scientific Computing, Second Edition*. Cambridge University Press.
*
*
* @function minstd
* @type {Function}
* @returns {PositiveInteger} pseudorandom integer
*
* @example
* var v = minstd();
* // returns <number>
*/
var minstd = factory( randint32() );


// EXPORTS //

module.exports = minstd;

},{"./factory.js":53,"./rand_int32.js":56}],56:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"@stdlib/math/base/special/floor":67,"@stdlib/math/constants/int32-max":124,"dup":52}],57:[function(require,module,exports){
module.exports={
	"name": "minstd-shuffle"
}

},{}],58:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var defaults = require( './defaults.json' );
var PRNGS = require( './prngs.js' );


// MAIN //

/**
* Returns a pseudorandom number generator for generating uniformly distributed random numbers on the interval \\( [0,1) \\).
*
* @param {Options} opts - function options
* @param {string} [opts.name='minstd-shuffle'] - name of pseudorandom number generator
* @param {*} [opts.seed] - pseudorandom number generator seed
* @throws {TypeError} must provide an object
* @throws {Error} must provide the name of a supported pseudorandom number generator
* @returns {Function} pseudorandom number generator
*
* @example
* var uniform = factory();
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'name': 'minstd'
* });
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'seed': 12345
* });
* var v = uniform();
* // returns <number>
*
* @example
* var uniform = factory({
*     'name': 'minstd',
*     'seed': 12345
* });
* var v = uniform();
* // returns <number>
*/
function factory( opts ) {
	var rand;
	var name;
	var prng;
	var seed;
	if ( arguments.length ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'invalid input argument. Must provide an object. Value: `' + opts + '`.' );
		}
		if ( hasOwnProp( opts, 'name' ) ) {
			name = opts.name;
		} else {
			name = defaults.name;
		}
		if ( hasOwnProp( opts, 'seed' ) ) {
			seed = opts.seed;
		}
	} else {
		name = defaults.name;
	}
	prng = PRNGS[ name ];
	if ( prng === void 0 ) {
		throw new Error( 'invalid option. Unrecognized/unsupported PRNG. Option: `' + name + '`.' );
	}
	if ( seed === void 0 ) {
		rand = prng.factory();
	} else {
		rand = prng.factory( seed );
	}
	setReadOnly( uniform, 'NAME', 'uniform' );
	setReadOnly( uniform, 'SEED', rand.normalized.SEED );
	setReadOnly( uniform, 'MIN', rand.normalized.MIN );
	setReadOnly( uniform, 'MAX', rand.normalized.MAX );
	setReadOnly( uniform, 'PRNG', rand );

	return uniform;

	/**
	* Returns a uniformly distributed pseudorandom number on the interval \\( [0,1) \\).
	*
	* @private
	* @returns {number} pseudorandom number
	*
	* @example
	* var v = uniform();
	* // returns <number>
	*/
	function uniform() {
		return rand.normalized();
	} // end FUNCTION uniform()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./defaults.json":57,"./prngs.js":60,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":28,"@stdlib/utils/define-read-only-property":129}],59:[function(require,module,exports){
'use strict';

/**
* Uniformly distributed pseudorandom numbers on the interval \\( [0,1) \\).
*
* @module @stdlib/math/base/random/randu
*
* @example
* var randu = require( '@stdlib/math/base/random/randu' );
*
* var v = randu();
* // returns <number>
*
* @example
* var factory = require( '@stdlib/math/base/random/randu' ).factory;
*
* var randu = factory({
*     'name': 'minstd',
*     'seed': 12345
* });
*
* var v = randu();
* // returns <number>
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var randu = require( './uniform.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( randu, 'factory', factory );


// EXPORTS //

module.exports = randu;

},{"./factory.js":58,"./uniform.js":61,"@stdlib/utils/define-read-only-property":129}],60:[function(require,module,exports){
'use strict';

// MAIN //

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/math/base/random/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/math/base/random/minstd-shuffle' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/math/base/random/minstd":54,"@stdlib/math/base/random/minstd-shuffle":50}],61:[function(require,module,exports){
'use strict';

// MODULES //

var factory = require( './factory.js' );


// MAIN //

/**
* Returns a uniformly distributed random number on the interval \\( [0,1) \\).
*
* @name uniform
* @type {Function}
* @returns {number} pseudorandom number
*
* @example
* var v = uniform();
* // returns <number>
*/
var uniform = factory();


// EXPORTS //

module.exports = uniform;

},{"./factory.js":58}],62:[function(require,module,exports){
'use strict';

/**
* Computes the absolute value of `x`.
*
* @param {number} x - input value
* @returns {number} absolute value
*
* @example
* var v = abs( -1.0 );
* // returns 1.0
*
* @example
* var v = abs( 2.0 );
* // returns 2.0
*
* @example
* var v = abs( 0.0 );
* // returns 0.0
*
* @example
* var v = abs( -0.0 );
* // returns 0.0
*
* @example
* var v = abs( NaN );
* // returns NaN
*/
function abs( x ) {
	if ( x < 0.0 ) {
		return -x;
	}
	if ( x === 0.0 ) {
		return 0.0; // handle negative zero
	}
	return x;
} // end FUNCTION abs()


// EXPORTS //

module.exports = abs;

},{}],63:[function(require,module,exports){
'use strict';

/**
* Compute an absolute value.
*
* @module @stdlib/math/base/special/abs
*
* @example
* var abs = require( '@stdlib/math/base/special/abs' );
*
* var v = abs( -1.0 );
* // returns 1.0
*
* v = abs( 2.0 );
* // returns 2.0
*
* v = abs( 0.0 );
* // returns 0.0
*
* v = abs( -0.0 );
* // returns 0.0
*
* v = abs( NaN );
* // returns NaN
*/

// MODULES //

var abs = require( './abs.js' );


// EXPORTS //

module.exports = abs;

},{"./abs.js":62}],64:[function(require,module,exports){
'use strict';

// MODULES //

var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000;

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff;


// MAIN //

/**
* Returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a double-precision floating-point number
*
* @example
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* @example
* var z = copysign( -0.0, 1.0 );
* // returns 0.0
*/
function copysign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	x = toWords( x );
	hx = x[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, x[ 1 ] );
} // end FUNCTION copysign()


// EXPORTS //

module.exports = copysign;

},{"@stdlib/math/base/utils/float64-from-words":94,"@stdlib/math/base/utils/float64-get-high-word":98,"@stdlib/math/base/utils/float64-to-words":110}],65:[function(require,module,exports){
'use strict';

/**
* Return a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @module @stdlib/math/base/special/copysign
*
* @example
* var copysign = require( '@stdlib/math/base/special/copysign' );
*
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* z = copysign( -0.0, 1.0 );
* // returns 0.0
*/

// MODULES //

var copysign = require( './copysign.js' );


// EXPORTS //

module.exports = copysign;

},{"./copysign.js":64}],66:[function(require,module,exports){
'use strict';

// TODO: implementation (?)

/**
* Rounds a numeric value toward negative infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = floor( -4.2 );
* // returns -5.0
*
* @example
* var v = floor( 9.99999 );
* // returns 9.0
*
* @example
* var v = floor( 0.0 );
* // returns 0.0
*
* @example
* var v = floor( NaN );
* // returns NaN
*/
var floor = Math.floor;


// EXPORTS //

module.exports = floor;

},{}],67:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward negative infinity.
*
* @module @stdlib/math/base/special/floor
*
* @example
* var floor = require( '@stdlib/math/base/special/floor' );
*
* var v = floor( -4.2 );
* // returns -5.0
*
* v = floor( 9.99999 );
* // returns 9.0
*
* v = floor( 0.0 );
* // returns 0.0
*
* v = floor( NaN );
* // returns NaN
*/

// MODULES //

var floor = require( './floor.js' );


// EXPORTS //

module.exports = floor;

},{"./floor.js":66}],68:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var normalize = require( '@stdlib/math/base/utils/float64-normalize' );
var floatExp = require( '@stdlib/math/base/utils/float64-exponent' );
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );


// VARIABLES //

// Exponent all 0s: 1 00000000000 11111111111111111111
var CLEAR_EXP_MASK = 0x800fffff; // 2148532223

// Exponent equal to 1022 (BIAS-1): 0 01111111110 00000000000000000000
var SET_EXP_MASK = 0x3fe00000; // 1071644672


// MAIN //

/**
* Splits a double-precision floating-point number into a normalized fraction and an integer power of two.
*
* @param {number} x - input value
* @returns {NumberArray} two element array containing a normalized fraction and an exponent
*
* @example
* var out = frexp( 4.0 );
* // returns [ 0.5, 3 ]
*
* @example
* var out = frexp( 0.0 );
* // returns [ 0.0, 0 ]
*
* @example
* var out = frexp( -0.0 );
* // returns [ -0.0, 0 ]
*
* @example
* var out = frexp( NaN );
* // returns [ NaN, 0 ]
*
* @example
* var out = frexp( Number.POSITIVE_INFINITY );
* // returns [ Number.POSITIVE_INFINITY, 0 ]
*
* @example
* var out = frexp( Number.NEGATIVE_INFINITY );
* // returns [ Number.NEGATIVE_INFINITY, 0 ]
*/
function frexp( x ) {
	var high;
	var exp;
	var w;
	if (
		x === 0.0 ||  // handles -0
		isnan( x ) ||
		isInfinite( x )
	) {
		return [ x, 0 ];
	}
	// If `x` is subnormal, normalize it...
	x = normalize( x );

	// Extract the exponent from `x` and add the normalization exponent:
	exp = floatExp( x[0] ) + x[ 1 ] + 1;

	// Break `x` into two unsigned 32-bit integers (higher and lower order words):
	w = toWords( x[ 0 ] );
	high = w[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits within the higher order word to BIAS-1 (1023-1=1022):
	high |= SET_EXP_MASK;

	// Create a new floating-point number:
	x = fromWords( high, w[ 1 ] );

	return [ x, exp ];
} // end FUNCTION frexp()


// EXPORTS //

module.exports = frexp;

},{"@stdlib/math/base/assert/is-infinite":38,"@stdlib/math/base/assert/is-nan":42,"@stdlib/math/base/utils/float64-exponent":92,"@stdlib/math/base/utils/float64-from-words":94,"@stdlib/math/base/utils/float64-normalize":102,"@stdlib/math/base/utils/float64-to-words":110}],69:[function(require,module,exports){
'use strict';

/**
* Split a double-precision floating-point number into a normalized fraction and an integer power of two.
*
* @module @stdlib/math/base/special/frexp
*
* @example
* var frexp = require( '@stdlib/math/base/special/frexp' );
*
* var out = frexp( 4.0 );
* // returns [ 0.5, 3 ]
*
* out = frexp( 0.0 );
* // returns [ 0.0, 0 ]
*
* out = frexp( -0.0 );
* // returns [ -0.0, 0 ]
*
* out = frexp( NaN );
* // returns [ NaN, 0 ]
*
* out = frexp( Number.POSITIVE_INFINITY );
* // returns [ Number.POSITIVE_INFINITY, 0 ]
*
* out = frexp( Number.NEGATIVE_INFINITY );
* // returns [ Number.NEGATIVE_INFINITY, 0 ]
*/

// MODULES //

var frexp = require( './frexp.js' );


// EXPORTS //

module.exports = frexp;

},{"./frexp.js":68}],70:[function(require,module,exports){
module.exports={"expected":[[-0.9765625,10],[-0.9746210238568589,10],[-0.9726795477137177,10],[-0.9707380715705766,10],[-0.9687965954274353,10],[-0.9668551192842942,10],[-0.9649136431411531,10],[-0.9629721669980119,10],[-0.9610306908548708,10],[-0.9590892147117296,10],[-0.9571477385685885,10],[-0.9552062624254473,10],[-0.9532647862823062,10],[-0.951323310139165,10],[-0.9493818339960238,10],[-0.9474403578528827,10],[-0.9454988817097415,10],[-0.9435574055666004,10],[-0.9416159294234593,10],[-0.9396744532803181,10],[-0.937732977137177,10],[-0.9357915009940357,10],[-0.9338500248508946,10],[-0.9319085487077535,10],[-0.9299670725646123,10],[-0.9280255964214712,10],[-0.92608412027833,10],[-0.9241426441351889,10],[-0.9222011679920478,10],[-0.9202596918489065,10],[-0.9183182157057654,10],[-0.9163767395626242,10],[-0.9144352634194831,10],[-0.9124937872763419,10],[-0.9105523111332008,10],[-0.9086108349900597,10],[-0.9066693588469185,10],[-0.9047278827037774,10],[-0.9027864065606361,10],[-0.900844930417495,10],[-0.8989034542743539,10],[-0.8969619781312127,10],[-0.8950205019880716,10],[-0.8930790258449304,10],[-0.8911375497017893,10],[-0.8891960735586482,10],[-0.8872545974155069,10],[-0.8853131212723658,10],[-0.8833716451292246,10],[-0.8814301689860835,10],[-0.8794886928429424,10],[-0.8775472166998012,10],[-0.8756057405566601,10],[-0.8736642644135189,10],[-0.8717227882703777,10],[-0.8697813121272365,10],[-0.8678398359840954,10],[-0.8658983598409543,10],[-0.8639568836978131,10],[-0.862015407554672,10],[-0.8600739314115308,10],[-0.8581324552683897,10],[-0.8561909791252486,10],[-0.8542495029821073,10],[-0.8523080268389662,10],[-0.850366550695825,10],[-0.8484250745526839,10],[-0.8464835984095428,10],[-0.8445421222664016,10],[-0.8426006461232605,10],[-0.8406591699801192,10],[-0.8387176938369781,10],[-0.836776217693837,10],[-0.8348347415506958,10],[-0.8328932654075547,10],[-0.8309517892644135,10],[-0.8290103131212724,10],[-0.8270688369781312,10],[-0.82512736083499,10],[-0.823185884691849,10],[-0.8212444085487077,10],[-0.8193029324055666,10],[-0.8173614562624254,10],[-0.8154199801192843,10],[-0.8134785039761432,10],[-0.811537027833002,10],[-0.8095955516898609,10],[-0.8076540755467196,10],[-0.8057125994035785,10],[-0.8037711232604374,10],[-0.8018296471172962,10],[-0.7998881709741551,10],[-0.7979466948310139,10],[-0.7960052186878728,10],[-0.7940637425447317,10],[-0.7921222664015904,10],[-0.7901807902584493,10],[-0.7882393141153081,10],[-0.786297837972167,10],[-0.7843563618290258,10],[-0.7824148856858847,10],[-0.7804734095427436,10],[-0.7785319333996024,10],[-0.7765904572564613,10],[-0.77464898111332,10],[-0.7727075049701789,10],[-0.7707660288270378,10],[-0.7688245526838966,10],[-0.7668830765407555,10],[-0.7649416003976143,10],[-0.7630001242544732,10],[-0.7610586481113321,10],[-0.7591171719681908,10],[-0.7571756958250497,10],[-0.7552342196819085,10],[-0.7532927435387674,10],[-0.7513512673956262,10],[-0.7494097912524851,10],[-0.747468315109344,10],[-0.7455268389662028,10],[-0.7435853628230616,10],[-0.7416438866799204,10],[-0.7397024105367793,10],[-0.7377609343936382,10],[-0.735819458250497,10],[-0.7338779821073559,10],[-0.7319365059642147,10],[-0.7299950298210736,10],[-0.7280535536779325,10],[-0.7261120775347912,10],[-0.7241706013916501,10],[-0.7222291252485089,10],[-0.7202876491053678,10],[-0.7183461729622267,10],[-0.7164046968190855,10],[-0.7144632206759444,10],[-0.7125217445328031,10],[-0.710580268389662,10],[-0.7086387922465208,10],[-0.7066973161033797,10],[-0.7047558399602386,10],[-0.7028143638170974,10],[-0.7008728876739563,10],[-0.6989314115308151,10],[-0.696989935387674,10],[-0.6950484592445328,10],[-0.6931069831013916,10],[-0.6911655069582505,10],[-0.6892240308151093,10],[-0.6872825546719682,10],[-0.6853410785288271,10],[-0.6833996023856859,10],[-0.6814581262425448,10],[-0.6795166500994035,10],[-0.6775751739562624,10],[-0.6756336978131213,10],[-0.6736922216699801,10],[-0.671750745526839,10],[-0.6698092693836978,10],[-0.6678677932405567,10],[-0.6659263170974155,10],[-0.6639848409542743,10],[-0.6620433648111332,10],[-0.660101888667992,10],[-0.6581604125248509,10],[-0.6562189363817097,10],[-0.6542774602385686,10],[-0.6523359840954275,10],[-0.6503945079522863,10],[-0.6484530318091452,10],[-0.6465115556660039,10],[-0.6445700795228628,10],[-0.6426286033797217,10],[-0.6406871272365805,10],[-0.6387456510934394,10],[-0.6368041749502982,10],[-0.6348626988071571,10],[-0.632921222664016,10],[-0.6309797465208747,10],[-0.6290382703777336,10],[-0.6270967942345924,10],[-0.6251553180914513,10],[-0.6232138419483101,10],[-0.621272365805169,10],[-0.6193308896620279,10],[-0.6173894135188867,10],[-0.6154479373757455,10],[-0.6135064612326043,10],[-0.6115649850894632,10],[-0.6096235089463221,10],[-0.6076820328031809,10],[-0.6057405566600398,10],[-0.6037990805168986,10],[-0.6018576043737575,10],[-0.5999161282306164,10],[-0.5979746520874751,10],[-0.596033175944334,10],[-0.5940916998011928,10],[-0.5921502236580517,10],[-0.5902087475149106,10],[-0.5882672713717694,10],[-0.5863257952286283,10],[-0.584384319085487,10],[-0.5824428429423459,10],[-0.5805013667992047,10],[-0.5785598906560636,10],[-0.5766184145129225,10],[-0.5746769383697813,10],[-0.5727354622266402,10],[-0.570793986083499,10],[-0.5688525099403579,10],[-0.5669110337972167,10],[-0.5649695576540755,10],[-0.5630280815109344,10],[-0.5610866053677932,10],[-0.5591451292246521,10],[-0.557203653081511,10],[-0.5552621769383698,10],[-0.5533207007952287,10],[-0.5513792246520874,10],[-0.5494377485089463,10],[-0.5474962723658051,10],[-0.545554796222664,10],[-0.5436133200795229,10],[-0.5416718439363817,10],[-0.5397303677932406,10],[-0.5377888916500994,10],[-0.5358474155069582,10],[-0.5339059393638171,10],[-0.5319644632206759,10],[-0.5300229870775348,10],[-0.5280815109343936,10],[-0.5261400347912525,10],[-0.5241985586481114,10],[-0.5222570825049702,10],[-0.520315606361829,10],[-0.5183741302186878,10],[-0.5164326540755467,10],[-0.5144911779324056,10],[-0.5125497017892644,10],[-0.5106082256461233,10],[-0.5086667495029821,10],[-0.506725273359841,10],[-0.5047837972166997,10],[-0.5028423210735586,10],[-0.5009008449304175,10],[-0.9979187375745527,9],[-0.9940357852882704,9],[-0.9901528330019881,9],[-0.9862698807157058,9],[-0.9823869284294234,9],[-0.9785039761431411,9],[-0.9746210238568589,9],[-0.9707380715705766,9],[-0.9668551192842942,9],[-0.9629721669980119,9],[-0.9590892147117296,9],[-0.9552062624254473,9],[-0.951323310139165,9],[-0.9474403578528827,9],[-0.9435574055666004,9],[-0.9396744532803181,9],[-0.9357915009940357,9],[-0.9319085487077535,9],[-0.9280255964214712,9],[-0.9241426441351889,9],[-0.9202596918489065,9],[-0.9163767395626242,9],[-0.9124937872763419,9],[-0.9086108349900597,9],[-0.9047278827037774,9],[-0.900844930417495,9],[-0.8969619781312127,9],[-0.8930790258449304,9],[-0.8891960735586482,9],[-0.8853131212723658,9],[-0.8814301689860835,9],[-0.8775472166998012,9],[-0.8736642644135189,9],[-0.8697813121272365,9],[-0.8658983598409543,9],[-0.862015407554672,9],[-0.8581324552683897,9],[-0.8542495029821073,9],[-0.850366550695825,9],[-0.8464835984095428,9],[-0.8426006461232605,9],[-0.8387176938369781,9],[-0.8348347415506958,9],[-0.8309517892644135,9],[-0.8270688369781312,9],[-0.823185884691849,9],[-0.8193029324055666,9],[-0.8154199801192843,9],[-0.811537027833002,9],[-0.8076540755467196,9],[-0.8037711232604374,9],[-0.7998881709741551,9],[-0.7960052186878728,9],[-0.7921222664015904,9],[-0.7882393141153081,9],[-0.7843563618290258,9],[-0.7804734095427436,9],[-0.7765904572564613,9],[-0.7727075049701789,9],[-0.7688245526838966,9],[-0.7649416003976143,9],[-0.7610586481113321,9],[-0.7571756958250497,9],[-0.7532927435387674,9],[-0.7494097912524851,9],[-0.7455268389662028,9],[-0.7416438866799204,9],[-0.7377609343936382,9],[-0.7338779821073559,9],[-0.7299950298210736,9],[-0.7261120775347912,9],[-0.7222291252485089,9],[-0.7183461729622267,9],[-0.7144632206759444,9],[-0.710580268389662,9],[-0.7066973161033797,9],[-0.7028143638170974,9],[-0.6989314115308151,9],[-0.6950484592445328,9],[-0.6911655069582505,9],[-0.6872825546719682,9],[-0.6833996023856859,9],[-0.6795166500994035,9],[-0.6756336978131213,9],[-0.671750745526839,9],[-0.6678677932405567,9],[-0.6639848409542743,9],[-0.660101888667992,9],[-0.6562189363817097,9],[-0.6523359840954275,9],[-0.6484530318091452,9],[-0.6445700795228628,9],[-0.6406871272365805,9],[-0.6368041749502982,9],[-0.632921222664016,9],[-0.6290382703777336,9],[-0.6251553180914513,9],[-0.621272365805169,9],[-0.6173894135188867,9],[-0.6135064612326043,9],[-0.6096235089463221,9],[-0.6057405566600398,9],[-0.6018576043737575,9],[-0.5979746520874751,9],[-0.5940916998011928,9],[-0.5902087475149106,9],[-0.5863257952286283,9],[-0.5824428429423459,9],[-0.5785598906560636,9],[-0.5746769383697813,9],[-0.570793986083499,9],[-0.5669110337972167,9],[-0.5630280815109344,9],[-0.5591451292246521,9],[-0.5552621769383698,9],[-0.5513792246520874,9],[-0.5474962723658051,9],[-0.5436133200795229,9],[-0.5397303677932406,9],[-0.5358474155069582,9],[-0.5319644632206759,9],[-0.5280815109343936,9],[-0.5241985586481114,9],[-0.520315606361829,9],[-0.5164326540755467,9],[-0.5125497017892644,9],[-0.5086667495029821,9],[-0.5047837972166997,9],[-0.5009008449304175,9],[-0.9940357852882704,8],[-0.9862698807157058,8],[-0.9785039761431411,8],[-0.9707380715705766,8],[-0.9629721669980119,8],[-0.9552062624254473,8],[-0.9474403578528827,8],[-0.9396744532803181,8],[-0.9319085487077535,8],[-0.9241426441351889,8],[-0.9163767395626242,8],[-0.9086108349900597,8],[-0.900844930417495,8],[-0.8930790258449304,8],[-0.8853131212723658,8],[-0.8775472166998012,8],[-0.8697813121272365,8],[-0.862015407554672,8],[-0.8542495029821073,8],[-0.8464835984095428,8],[-0.8387176938369781,8],[-0.8309517892644135,8],[-0.823185884691849,8],[-0.8154199801192843,8],[-0.8076540755467196,8],[-0.7998881709741551,8],[-0.7921222664015904,8],[-0.7843563618290258,8],[-0.7765904572564613,8],[-0.7688245526838966,8],[-0.7610586481113321,8],[-0.7532927435387674,8],[-0.7455268389662028,8],[-0.7377609343936382,8],[-0.7299950298210736,8],[-0.7222291252485089,8],[-0.7144632206759444,8],[-0.7066973161033797,8],[-0.6989314115308151,8],[-0.6911655069582505,8],[-0.6833996023856859,8],[-0.6756336978131213,8],[-0.6678677932405567,8],[-0.660101888667992,8],[-0.6523359840954275,8],[-0.6445700795228628,8],[-0.6368041749502982,8],[-0.6290382703777336,8],[-0.621272365805169,8],[-0.6135064612326043,8],[-0.6057405566600398,8],[-0.5979746520874751,8],[-0.5902087475149106,8],[-0.5824428429423459,8],[-0.5746769383697813,8],[-0.5669110337972167,8],[-0.5591451292246521,8],[-0.5513792246520874,8],[-0.5436133200795229,8],[-0.5358474155069582,8],[-0.5280815109343936,8],[-0.520315606361829,8],[-0.5125497017892644,8],[-0.5047837972166997,8],[-0.9940357852882704,7],[-0.9785039761431411,7],[-0.9629721669980119,7],[-0.9474403578528827,7],[-0.9319085487077535,7],[-0.9163767395626242,7],[-0.900844930417495,7],[-0.8853131212723658,7],[-0.8697813121272365,7],[-0.8542495029821073,7],[-0.8387176938369781,7],[-0.823185884691849,7],[-0.8076540755467196,7],[-0.7921222664015904,7],[-0.7765904572564613,7],[-0.7610586481113321,7],[-0.7455268389662028,7],[-0.7299950298210736,7],[-0.7144632206759444,7],[-0.6989314115308151,7],[-0.6833996023856859,7],[-0.6678677932405567,7],[-0.6523359840954275,7],[-0.6368041749502982,7],[-0.621272365805169,7],[-0.6057405566600398,7],[-0.5902087475149106,7],[-0.5746769383697813,7],[-0.5591451292246521,7],[-0.5436133200795229,7],[-0.5280815109343936,7],[-0.5125497017892644,7],[-0.9940357852882704,6],[-0.9629721669980119,6],[-0.9319085487077535,6],[-0.900844930417495,6],[-0.8697813121272365,6],[-0.8387176938369781,6],[-0.8076540755467196,6],[-0.7765904572564613,6],[-0.7455268389662028,6],[-0.7144632206759444,6],[-0.6833996023856859,6],[-0.6523359840954275,6],[-0.621272365805169,6],[-0.5902087475149106,6],[-0.5591451292246521,6],[-0.5280815109343936,6],[-0.9940357852882704,5],[-0.9319085487077535,5],[-0.8697813121272365,5],[-0.8076540755467196,5],[-0.7455268389662028,5],[-0.6833996023856859,5],[-0.621272365805169,5],[-0.5591451292246521,5],[-0.9940357852882704,4],[-0.8697813121272365,4],[-0.7455268389662028,4],[-0.621272365805169,4],[-0.9940357852882704,3],[-0.7455268389662028,3],[-0.9940357852882704,2],[-0.9940357852882704,1],[0.0,0],[0.9940357852882704,1],[0.9940357852882704,2],[0.7455268389662028,3],[0.9940357852882704,3],[0.621272365805169,4],[0.7455268389662028,4],[0.8697813121272365,4],[0.9940357852882704,4],[0.5591451292246521,5],[0.621272365805169,5],[0.6833996023856859,5],[0.7455268389662028,5],[0.8076540755467196,5],[0.8697813121272365,5],[0.9319085487077535,5],[0.9940357852882704,5],[0.5280815109343936,6],[0.5591451292246521,6],[0.5902087475149106,6],[0.621272365805169,6],[0.6523359840954275,6],[0.6833996023856859,6],[0.7144632206759444,6],[0.7455268389662028,6],[0.7765904572564613,6],[0.8076540755467196,6],[0.8387176938369781,6],[0.8697813121272365,6],[0.900844930417495,6],[0.9319085487077535,6],[0.9629721669980119,6],[0.9940357852882704,6],[0.5125497017892644,7],[0.5280815109343936,7],[0.5436133200795229,7],[0.5591451292246521,7],[0.5746769383697813,7],[0.5902087475149106,7],[0.6057405566600398,7],[0.621272365805169,7],[0.6368041749502982,7],[0.6523359840954275,7],[0.6678677932405567,7],[0.6833996023856859,7],[0.6989314115308151,7],[0.7144632206759444,7],[0.7299950298210736,7],[0.7455268389662028,7],[0.7610586481113321,7],[0.7765904572564613,7],[0.7921222664015904,7],[0.8076540755467196,7],[0.823185884691849,7],[0.8387176938369781,7],[0.8542495029821073,7],[0.8697813121272365,7],[0.8853131212723658,7],[0.900844930417495,7],[0.9163767395626242,7],[0.9319085487077535,7],[0.9474403578528827,7],[0.9629721669980119,7],[0.9785039761431411,7],[0.9940357852882704,7],[0.5047837972166997,8],[0.5125497017892644,8],[0.520315606361829,8],[0.5280815109343936,8],[0.5358474155069582,8],[0.5436133200795229,8],[0.5513792246520874,8],[0.5591451292246521,8],[0.5669110337972167,8],[0.5746769383697813,8],[0.5824428429423459,8],[0.5902087475149106,8],[0.5979746520874751,8],[0.6057405566600398,8],[0.6135064612326043,8],[0.621272365805169,8],[0.6290382703777336,8],[0.6368041749502982,8],[0.6445700795228628,8],[0.6523359840954275,8],[0.660101888667992,8],[0.6678677932405567,8],[0.6756336978131213,8],[0.6833996023856859,8],[0.6911655069582505,8],[0.6989314115308151,8],[0.7066973161033797,8],[0.7144632206759444,8],[0.7222291252485089,8],[0.7299950298210736,8],[0.7377609343936382,8],[0.7455268389662028,8],[0.7532927435387674,8],[0.7610586481113321,8],[0.7688245526838966,8],[0.7765904572564613,8],[0.7843563618290258,8],[0.7921222664015904,8],[0.7998881709741551,8],[0.8076540755467196,8],[0.8154199801192843,8],[0.823185884691849,8],[0.8309517892644135,8],[0.8387176938369781,8],[0.8464835984095428,8],[0.8542495029821073,8],[0.862015407554672,8],[0.8697813121272365,8],[0.8775472166998012,8],[0.8853131212723658,8],[0.8930790258449304,8],[0.900844930417495,8],[0.9086108349900597,8],[0.9163767395626242,8],[0.9241426441351889,8],[0.9319085487077535,8],[0.9396744532803181,8],[0.9474403578528827,8],[0.9552062624254473,8],[0.9629721669980119,8],[0.9707380715705766,8],[0.9785039761431411,8],[0.9862698807157058,8],[0.9940357852882704,8],[0.5009008449304175,9],[0.5047837972166997,9],[0.5086667495029821,9],[0.5125497017892644,9],[0.5164326540755467,9],[0.520315606361829,9],[0.5241985586481114,9],[0.5280815109343936,9],[0.5319644632206759,9],[0.5358474155069582,9],[0.5397303677932406,9],[0.5436133200795229,9],[0.5474962723658051,9],[0.5513792246520874,9],[0.5552621769383698,9],[0.5591451292246521,9],[0.5630280815109344,9],[0.5669110337972167,9],[0.570793986083499,9],[0.5746769383697813,9],[0.5785598906560636,9],[0.5824428429423459,9],[0.5863257952286283,9],[0.5902087475149106,9],[0.5940916998011928,9],[0.5979746520874751,9],[0.6018576043737575,9],[0.6057405566600398,9],[0.6096235089463221,9],[0.6135064612326043,9],[0.6173894135188867,9],[0.621272365805169,9],[0.6251553180914513,9],[0.6290382703777336,9],[0.632921222664016,9],[0.6368041749502982,9],[0.6406871272365805,9],[0.6445700795228628,9],[0.6484530318091452,9],[0.6523359840954275,9],[0.6562189363817097,9],[0.660101888667992,9],[0.6639848409542743,9],[0.6678677932405567,9],[0.671750745526839,9],[0.6756336978131213,9],[0.6795166500994035,9],[0.6833996023856859,9],[0.6872825546719682,9],[0.6911655069582505,9],[0.6950484592445328,9],[0.6989314115308151,9],[0.7028143638170974,9],[0.7066973161033797,9],[0.710580268389662,9],[0.7144632206759444,9],[0.7183461729622267,9],[0.7222291252485089,9],[0.7261120775347912,9],[0.7299950298210736,9],[0.7338779821073559,9],[0.7377609343936382,9],[0.7416438866799204,9],[0.7455268389662028,9],[0.7494097912524851,9],[0.7532927435387674,9],[0.7571756958250497,9],[0.7610586481113321,9],[0.7649416003976143,9],[0.7688245526838966,9],[0.7727075049701789,9],[0.7765904572564613,9],[0.7804734095427436,9],[0.7843563618290258,9],[0.7882393141153081,9],[0.7921222664015904,9],[0.7960052186878728,9],[0.7998881709741551,9],[0.8037711232604374,9],[0.8076540755467196,9],[0.811537027833002,9],[0.8154199801192843,9],[0.8193029324055666,9],[0.823185884691849,9],[0.8270688369781312,9],[0.8309517892644135,9],[0.8348347415506958,9],[0.8387176938369781,9],[0.8426006461232605,9],[0.8464835984095428,9],[0.850366550695825,9],[0.8542495029821073,9],[0.8581324552683897,9],[0.862015407554672,9],[0.8658983598409543,9],[0.8697813121272365,9],[0.8736642644135189,9],[0.8775472166998012,9],[0.8814301689860835,9],[0.8853131212723658,9],[0.8891960735586482,9],[0.8930790258449304,9],[0.8969619781312127,9],[0.900844930417495,9],[0.9047278827037774,9],[0.9086108349900597,9],[0.9124937872763419,9],[0.9163767395626242,9],[0.9202596918489065,9],[0.9241426441351889,9],[0.9280255964214712,9],[0.9319085487077535,9],[0.9357915009940357,9],[0.9396744532803181,9],[0.9435574055666004,9],[0.9474403578528827,9],[0.951323310139165,9],[0.9552062624254473,9],[0.9590892147117296,9],[0.9629721669980119,9],[0.9668551192842942,9],[0.9707380715705766,9],[0.9746210238568589,9],[0.9785039761431411,9],[0.9823869284294234,9],[0.9862698807157058,9],[0.9901528330019881,9],[0.9940357852882704,9],[0.9979187375745527,9],[0.5009008449304175,10],[0.5028423210735586,10],[0.5047837972166997,10],[0.506725273359841,10],[0.5086667495029821,10],[0.5106082256461233,10],[0.5125497017892644,10],[0.5144911779324056,10],[0.5164326540755467,10],[0.5183741302186878,10],[0.520315606361829,10],[0.5222570825049702,10],[0.5241985586481114,10],[0.5261400347912525,10],[0.5280815109343936,10],[0.5300229870775348,10],[0.5319644632206759,10],[0.5339059393638171,10],[0.5358474155069582,10],[0.5377888916500994,10],[0.5397303677932406,10],[0.5416718439363817,10],[0.5436133200795229,10],[0.545554796222664,10],[0.5474962723658051,10],[0.5494377485089463,10],[0.5513792246520874,10],[0.5533207007952287,10],[0.5552621769383698,10],[0.557203653081511,10],[0.5591451292246521,10],[0.5610866053677932,10],[0.5630280815109344,10],[0.5649695576540755,10],[0.5669110337972167,10],[0.5688525099403579,10],[0.570793986083499,10],[0.5727354622266402,10],[0.5746769383697813,10],[0.5766184145129225,10],[0.5785598906560636,10],[0.5805013667992047,10],[0.5824428429423459,10],[0.584384319085487,10],[0.5863257952286283,10],[0.5882672713717694,10],[0.5902087475149106,10],[0.5921502236580517,10],[0.5940916998011928,10],[0.596033175944334,10],[0.5979746520874751,10],[0.5999161282306164,10],[0.6018576043737575,10],[0.6037990805168986,10],[0.6057405566600398,10],[0.6076820328031809,10],[0.6096235089463221,10],[0.6115649850894632,10],[0.6135064612326043,10],[0.6154479373757455,10],[0.6173894135188867,10],[0.6193308896620279,10],[0.621272365805169,10],[0.6232138419483101,10],[0.6251553180914513,10],[0.6270967942345924,10],[0.6290382703777336,10],[0.6309797465208747,10],[0.632921222664016,10],[0.6348626988071571,10],[0.6368041749502982,10],[0.6387456510934394,10],[0.6406871272365805,10],[0.6426286033797217,10],[0.6445700795228628,10],[0.6465115556660039,10],[0.6484530318091452,10],[0.6503945079522863,10],[0.6523359840954275,10],[0.6542774602385686,10],[0.6562189363817097,10],[0.6581604125248509,10],[0.660101888667992,10],[0.6620433648111332,10],[0.6639848409542743,10],[0.6659263170974155,10],[0.6678677932405567,10],[0.6698092693836978,10],[0.671750745526839,10],[0.6736922216699801,10],[0.6756336978131213,10],[0.6775751739562624,10],[0.6795166500994035,10],[0.6814581262425448,10],[0.6833996023856859,10],[0.6853410785288271,10],[0.6872825546719682,10],[0.6892240308151093,10],[0.6911655069582505,10],[0.6931069831013916,10],[0.6950484592445328,10],[0.696989935387674,10],[0.6989314115308151,10],[0.7008728876739563,10],[0.7028143638170974,10],[0.7047558399602386,10],[0.7066973161033797,10],[0.7086387922465208,10],[0.710580268389662,10],[0.7125217445328031,10],[0.7144632206759444,10],[0.7164046968190855,10],[0.7183461729622267,10],[0.7202876491053678,10],[0.7222291252485089,10],[0.7241706013916501,10],[0.7261120775347912,10],[0.7280535536779325,10],[0.7299950298210736,10],[0.7319365059642147,10],[0.7338779821073559,10],[0.735819458250497,10],[0.7377609343936382,10],[0.7397024105367793,10],[0.7416438866799204,10],[0.7435853628230616,10],[0.7455268389662028,10],[0.747468315109344,10],[0.7494097912524851,10],[0.7513512673956262,10],[0.7532927435387674,10],[0.7552342196819085,10],[0.7571756958250497,10],[0.7591171719681908,10],[0.7610586481113321,10],[0.7630001242544732,10],[0.7649416003976143,10],[0.7668830765407555,10],[0.7688245526838966,10],[0.7707660288270378,10],[0.7727075049701789,10],[0.77464898111332,10],[0.7765904572564613,10],[0.7785319333996024,10],[0.7804734095427436,10],[0.7824148856858847,10],[0.7843563618290258,10],[0.786297837972167,10],[0.7882393141153081,10],[0.7901807902584493,10],[0.7921222664015904,10],[0.7940637425447317,10],[0.7960052186878728,10],[0.7979466948310139,10],[0.7998881709741551,10],[0.8018296471172962,10],[0.8037711232604374,10],[0.8057125994035785,10],[0.8076540755467196,10],[0.8095955516898609,10],[0.811537027833002,10],[0.8134785039761432,10],[0.8154199801192843,10],[0.8173614562624254,10],[0.8193029324055666,10],[0.8212444085487077,10],[0.823185884691849,10],[0.82512736083499,10],[0.8270688369781312,10],[0.8290103131212724,10],[0.8309517892644135,10],[0.8328932654075547,10],[0.8348347415506958,10],[0.836776217693837,10],[0.8387176938369781,10],[0.8406591699801192,10],[0.8426006461232605,10],[0.8445421222664016,10],[0.8464835984095428,10],[0.8484250745526839,10],[0.850366550695825,10],[0.8523080268389662,10],[0.8542495029821073,10],[0.8561909791252486,10],[0.8581324552683897,10],[0.8600739314115308,10],[0.862015407554672,10],[0.8639568836978131,10],[0.8658983598409543,10],[0.8678398359840954,10],[0.8697813121272365,10],[0.8717227882703777,10],[0.8736642644135189,10],[0.8756057405566601,10],[0.8775472166998012,10],[0.8794886928429424,10],[0.8814301689860835,10],[0.8833716451292246,10],[0.8853131212723658,10],[0.8872545974155069,10],[0.8891960735586482,10],[0.8911375497017893,10],[0.8930790258449304,10],[0.8950205019880716,10],[0.8969619781312127,10],[0.8989034542743539,10],[0.900844930417495,10],[0.9027864065606361,10],[0.9047278827037774,10],[0.9066693588469185,10],[0.9086108349900597,10],[0.9105523111332008,10],[0.9124937872763419,10],[0.9144352634194831,10],[0.9163767395626242,10],[0.9183182157057654,10],[0.9202596918489065,10],[0.9222011679920478,10],[0.9241426441351889,10],[0.92608412027833,10],[0.9280255964214712,10],[0.9299670725646123,10],[0.9319085487077535,10],[0.9338500248508946,10],[0.9357915009940357,10],[0.937732977137177,10],[0.9396744532803181,10],[0.9416159294234593,10],[0.9435574055666004,10],[0.9454988817097415,10],[0.9474403578528827,10],[0.9493818339960238,10],[0.951323310139165,10],[0.9532647862823062,10],[0.9552062624254473,10],[0.9571477385685885,10],[0.9590892147117296,10],[0.9610306908548708,10],[0.9629721669980119,10],[0.9649136431411531,10],[0.9668551192842942,10],[0.9687965954274353,10],[0.9707380715705766,10],[0.9726795477137177,10],[0.9746210238568589,10],[0.9765625,10]],"x":[-1000.0,-998.0119284294235,-996.0238568588469,-994.0357852882704,-992.0477137176938,-990.0596421471173,-988.0715705765408,-986.0834990059642,-984.0954274353877,-982.1073558648111,-980.1192842942346,-978.131212723658,-976.1431411530815,-974.155069582505,-972.1669980119284,-970.1789264413519,-968.1908548707753,-966.2027833001988,-964.2147117296223,-962.2266401590457,-960.2385685884692,-958.2504970178926,-956.2624254473161,-954.2743538767396,-952.286282306163,-950.2982107355865,-948.3101391650099,-946.3220675944334,-944.3339960238569,-942.3459244532803,-940.3578528827038,-938.3697813121272,-936.3817097415507,-934.3936381709741,-932.4055666003976,-930.4174950298211,-928.4294234592445,-926.441351888668,-924.4532803180914,-922.4652087475149,-920.4771371769384,-918.4890656063618,-916.5009940357853,-914.5129224652087,-912.5248508946322,-910.5367793240557,-908.5487077534791,-906.5606361829026,-904.572564612326,-902.5844930417495,-900.596421471173,-898.6083499005964,-896.6202783300199,-894.6322067594433,-892.6441351888668,-890.6560636182902,-888.6679920477137,-886.6799204771372,-884.6918489065606,-882.7037773359841,-880.7157057654075,-878.727634194831,-876.7395626242545,-874.7514910536779,-872.7634194831014,-870.7753479125248,-868.7872763419483,-866.7992047713718,-864.8111332007952,-862.8230616302187,-860.8349900596421,-858.8469184890656,-856.8588469184891,-854.8707753479125,-852.882703777336,-850.8946322067594,-848.9065606361829,-846.9184890656063,-844.9304174950298,-842.9423459244533,-840.9542743538767,-838.9662027833002,-836.9781312127236,-834.9900596421471,-833.0019880715706,-831.013916500994,-829.0258449304175,-827.0377733598409,-825.0497017892644,-823.0616302186879,-821.0735586481113,-819.0854870775348,-817.0974155069582,-815.1093439363817,-813.1212723658052,-811.1332007952286,-809.1451292246521,-807.1570576540755,-805.168986083499,-803.1809145129224,-801.1928429423459,-799.2047713717694,-797.2166998011928,-795.2286282306163,-793.2405566600397,-791.2524850894632,-789.2644135188867,-787.2763419483101,-785.2882703777336,-783.300198807157,-781.3121272365805,-779.324055666004,-777.3359840954274,-775.3479125248509,-773.3598409542743,-771.3717693836978,-769.3836978131212,-767.3956262425447,-765.4075546719682,-763.4194831013916,-761.4314115308151,-759.4433399602385,-757.455268389662,-755.4671968190855,-753.4791252485089,-751.4910536779324,-749.5029821073558,-747.5149105367793,-745.5268389662028,-743.5387673956262,-741.5506958250497,-739.5626242544731,-737.5745526838966,-735.5864811133201,-733.5984095427435,-731.610337972167,-729.6222664015904,-727.6341948310139,-725.6461232604373,-723.6580516898608,-721.6699801192843,-719.6819085487077,-717.6938369781312,-715.7057654075546,-713.7176938369781,-711.7296222664016,-709.741550695825,-707.7534791252485,-705.7654075546719,-703.7773359840954,-701.7892644135189,-699.8011928429423,-697.8131212723658,-695.8250497017892,-693.8369781312127,-691.8489065606362,-689.8608349900596,-687.8727634194831,-685.8846918489065,-683.89662027833,-681.9085487077534,-679.9204771371769,-677.9324055666004,-675.9443339960238,-673.9562624254473,-671.9681908548707,-669.9801192842942,-667.9920477137177,-666.0039761431411,-664.0159045725646,-662.027833001988,-660.0397614314115,-658.051689860835,-656.0636182902584,-654.0755467196819,-652.0874751491053,-650.0994035785288,-648.1113320079523,-646.1232604373757,-644.1351888667992,-642.1471172962226,-640.1590457256461,-638.1709741550695,-636.182902584493,-634.1948310139165,-632.2067594433399,-630.2186878727634,-628.2306163021868,-626.2425447316103,-624.2544731610338,-622.2664015904572,-620.2783300198807,-618.2902584493041,-616.3021868787276,-614.3141153081511,-612.3260437375745,-610.337972166998,-608.3499005964214,-606.3618290258449,-604.3737574552684,-602.3856858846918,-600.3976143141153,-598.4095427435387,-596.4214711729622,-594.4333996023856,-592.4453280318091,-590.4572564612326,-588.469184890656,-586.4811133200795,-584.4930417495029,-582.5049701789264,-580.51689860835,-578.5288270377733,-576.5407554671968,-574.5526838966202,-572.5646123260437,-570.5765407554672,-568.5884691848906,-566.6003976143141,-564.6123260437375,-562.624254473161,-560.6361829025844,-558.6481113320079,-556.6600397614314,-554.6719681908548,-552.6838966202783,-550.6958250497017,-548.7077534791252,-546.7196819085488,-544.7316103379721,-542.7435387673956,-540.755467196819,-538.7673956262425,-536.779324055666,-534.7912524850894,-532.803180914513,-530.8151093439363,-528.8270377733598,-526.8389662027834,-524.8508946322067,-522.8628230616303,-520.8747514910536,-518.8866799204771,-516.8986083499005,-514.910536779324,-512.9224652087476,-510.934393638171,-508.94632206759445,-506.9582504970179,-504.97017892644135,-502.9821073558648,-500.99403578528825,-499.00596421471175,-497.0178926441352,-495.02982107355865,-493.0417495029821,-491.05367793240555,-489.065606361829,-487.0775347912525,-485.08946322067595,-483.1013916500994,-481.11332007952285,-479.1252485089463,-477.1371769383698,-475.14910536779325,-473.1610337972167,-471.17296222664015,-469.1848906560636,-467.19681908548705,-465.20874751491056,-463.220675944334,-461.23260437375745,-459.2445328031809,-457.25646123260435,-455.26838966202786,-453.2803180914513,-451.29224652087476,-449.3041749502982,-447.31610337972165,-445.3280318091451,-443.3399602385686,-441.35188866799206,-439.3638170974155,-437.37574552683895,-435.3876739562624,-433.3996023856859,-431.41153081510936,-429.4234592445328,-427.43538767395626,-425.4473161033797,-423.45924453280315,-421.47117296222666,-419.4831013916501,-417.49502982107356,-415.506958250497,-413.51888667992046,-411.53081510934396,-409.5427435387674,-407.55467196819086,-405.5666003976143,-403.57852882703776,-401.5904572564612,-399.6023856858847,-397.61431411530816,-395.6262425447316,-393.63817097415506,-391.6500994035785,-389.662027833002,-387.67395626242546,-385.6858846918489,-383.69781312127236,-381.7097415506958,-379.72166998011926,-377.73359840954276,-375.7455268389662,-373.75745526838966,-371.7693836978131,-369.78131212723656,-367.79324055666007,-365.8051689860835,-363.81709741550696,-361.8290258449304,-359.84095427435386,-357.8528827037773,-355.8648111332008,-353.87673956262427,-351.8886679920477,-349.90059642147116,-347.9125248508946,-345.9244532803181,-343.93638170974157,-341.948310139165,-339.96023856858847,-337.9721669980119,-335.98409542743536,-333.99602385685887,-332.0079522862823,-330.01988071570577,-328.0318091451292,-326.04373757455267,-324.05566600397617,-322.0675944333996,-320.07952286282307,-318.0914512922465,-316.10337972166997,-314.1153081510934,-312.1272365805169,-310.13916500994037,-308.1510934393638,-306.16302186878727,-304.1749502982107,-302.1868787276342,-300.1988071570577,-298.2107355864811,-296.22266401590457,-294.234592445328,-292.24652087475147,-290.258449304175,-288.2703777335984,-286.2823061630219,-284.2942345924453,-282.30616302186877,-280.3180914512922,-278.3300198807157,-276.3419483101392,-274.3538767395626,-272.36580516898607,-270.3777335984095,-268.389662027833,-266.4015904572565,-264.4135188866799,-262.4254473161034,-260.4373757455268,-258.44930417495027,-256.4612326043738,-254.47316103379723,-252.48508946322067,-250.49701789264412,-248.5089463220676,-246.52087475149105,-244.5328031809145,-242.54473161033798,-240.55666003976143,-238.5685884691849,-236.58051689860835,-234.5924453280318,-232.60437375745528,-230.61630218687873,-228.62823061630218,-226.64015904572565,-224.6520874751491,-222.66401590457255,-220.67594433399603,-218.68787276341948,-216.69980119284295,-214.7117296222664,-212.72365805168985,-210.73558648111333,-208.74751491053678,-206.75944333996023,-204.7713717693837,-202.78330019880715,-200.7952286282306,-198.80715705765408,-196.81908548707753,-194.831013916501,-192.84294234592446,-190.8548707753479,-188.86679920477138,-186.87872763419483,-184.89065606361828,-182.90258449304176,-180.9145129224652,-178.92644135188866,-176.93836978131213,-174.95029821073558,-172.96222664015906,-170.9741550695825,-168.98608349900596,-166.99801192842943,-165.00994035785288,-163.02186878727633,-161.0337972166998,-159.04572564612326,-157.0576540755467,-155.06958250497019,-153.08151093439363,-151.0934393638171,-149.10536779324056,-147.117296222664,-145.1292246520875,-143.14115308151094,-141.15308151093438,-139.16500994035786,-137.1769383697813,-135.18886679920476,-133.20079522862824,-131.2127236580517,-129.22465208747514,-127.23658051689861,-125.24850894632206,-123.26043737574552,-121.27236580516899,-119.28429423459245,-117.2962226640159,-115.30815109343936,-113.32007952286283,-111.33200795228628,-109.34393638170974,-107.3558648111332,-105.36779324055667,-103.37972166998011,-101.39165009940358,-99.40357852882704,-97.4155069582505,-95.42743538767395,-93.43936381709742,-91.45129224652088,-89.46322067594433,-87.47514910536779,-85.48707753479125,-83.49900596421472,-81.51093439363817,-79.52286282306163,-77.53479125248509,-75.54671968190856,-73.558648111332,-71.57057654075547,-69.58250497017893,-67.59443339960238,-65.60636182902584,-63.618290258449306,-61.63021868787276,-59.642147117296226,-57.65407554671968,-55.66600397614314,-53.6779324055666,-51.68986083499006,-49.70178926441352,-47.713717693836976,-45.72564612326044,-43.737574552683895,-41.74950298210736,-39.761431411530815,-37.77335984095428,-35.785288270377734,-33.79721669980119,-31.809145129224653,-29.821073558648113,-27.83300198807157,-25.84493041749503,-23.856858846918488,-21.868787276341948,-19.880715705765407,-17.892644135188867,-15.904572564612327,-13.916500994035784,-11.928429423459244,-9.940357852882704,-7.952286282306163,-5.964214711729622,-3.9761431411530817,-1.9880715705765408,0.0,1.9880715705765408,3.9761431411530817,5.964214711729622,7.952286282306163,9.940357852882704,11.928429423459244,13.916500994035784,15.904572564612327,17.892644135188867,19.880715705765407,21.868787276341948,23.856858846918488,25.84493041749503,27.83300198807157,29.821073558648113,31.809145129224653,33.79721669980119,35.785288270377734,37.77335984095428,39.761431411530815,41.74950298210736,43.737574552683895,45.72564612326044,47.713717693836976,49.70178926441352,51.68986083499006,53.6779324055666,55.66600397614314,57.65407554671968,59.642147117296226,61.63021868787276,63.618290258449306,65.60636182902584,67.59443339960238,69.58250497017893,71.57057654075547,73.558648111332,75.54671968190856,77.53479125248509,79.52286282306163,81.51093439363817,83.49900596421472,85.48707753479125,87.47514910536779,89.46322067594433,91.45129224652088,93.43936381709742,95.42743538767395,97.4155069582505,99.40357852882704,101.39165009940358,103.37972166998011,105.36779324055667,107.3558648111332,109.34393638170974,111.33200795228628,113.32007952286283,115.30815109343936,117.2962226640159,119.28429423459245,121.27236580516899,123.26043737574552,125.24850894632206,127.23658051689861,129.22465208747514,131.2127236580517,133.20079522862824,135.18886679920476,137.1769383697813,139.16500994035786,141.15308151093438,143.14115308151094,145.1292246520875,147.117296222664,149.10536779324056,151.0934393638171,153.08151093439363,155.06958250497019,157.0576540755467,159.04572564612326,161.0337972166998,163.02186878727633,165.00994035785288,166.99801192842943,168.98608349900596,170.9741550695825,172.96222664015906,174.95029821073558,176.93836978131213,178.92644135188866,180.9145129224652,182.90258449304176,184.89065606361828,186.87872763419483,188.86679920477138,190.8548707753479,192.84294234592446,194.831013916501,196.81908548707753,198.80715705765408,200.7952286282306,202.78330019880715,204.7713717693837,206.75944333996023,208.74751491053678,210.73558648111333,212.72365805168985,214.7117296222664,216.69980119284295,218.68787276341948,220.67594433399603,222.66401590457255,224.6520874751491,226.64015904572565,228.62823061630218,230.61630218687873,232.60437375745528,234.5924453280318,236.58051689860835,238.5685884691849,240.55666003976143,242.54473161033798,244.5328031809145,246.52087475149105,248.5089463220676,250.49701789264412,252.48508946322067,254.47316103379723,256.4612326043738,258.44930417495027,260.4373757455268,262.4254473161034,264.4135188866799,266.4015904572565,268.389662027833,270.3777335984095,272.36580516898607,274.3538767395626,276.3419483101392,278.3300198807157,280.3180914512922,282.30616302186877,284.2942345924453,286.2823061630219,288.2703777335984,290.258449304175,292.24652087475147,294.234592445328,296.22266401590457,298.2107355864811,300.1988071570577,302.1868787276342,304.1749502982107,306.16302186878727,308.1510934393638,310.13916500994037,312.1272365805169,314.1153081510934,316.10337972166997,318.0914512922465,320.07952286282307,322.0675944333996,324.05566600397617,326.04373757455267,328.0318091451292,330.01988071570577,332.0079522862823,333.99602385685887,335.98409542743536,337.9721669980119,339.96023856858847,341.948310139165,343.93638170974157,345.9244532803181,347.9125248508946,349.90059642147116,351.8886679920477,353.87673956262427,355.8648111332008,357.8528827037773,359.84095427435386,361.8290258449304,363.81709741550696,365.8051689860835,367.79324055666007,369.78131212723656,371.7693836978131,373.75745526838966,375.7455268389662,377.73359840954276,379.72166998011926,381.7097415506958,383.69781312127236,385.6858846918489,387.67395626242546,389.662027833002,391.6500994035785,393.63817097415506,395.6262425447316,397.61431411530816,399.6023856858847,401.5904572564612,403.57852882703776,405.5666003976143,407.55467196819086,409.5427435387674,411.53081510934396,413.51888667992046,415.506958250497,417.49502982107356,419.4831013916501,421.47117296222666,423.45924453280315,425.4473161033797,427.43538767395626,429.4234592445328,431.41153081510936,433.3996023856859,435.3876739562624,437.37574552683895,439.3638170974155,441.35188866799206,443.3399602385686,445.3280318091451,447.31610337972165,449.3041749502982,451.29224652087476,453.2803180914513,455.26838966202786,457.25646123260435,459.2445328031809,461.23260437375745,463.220675944334,465.20874751491056,467.19681908548705,469.1848906560636,471.17296222664015,473.1610337972167,475.14910536779325,477.1371769383698,479.1252485089463,481.11332007952285,483.1013916500994,485.08946322067595,487.0775347912525,489.065606361829,491.05367793240555,493.0417495029821,495.02982107355865,497.0178926441352,499.00596421471175,500.99403578528825,502.9821073558648,504.97017892644135,506.9582504970179,508.94632206759445,510.934393638171,512.9224652087476,514.910536779324,516.8986083499005,518.8866799204771,520.8747514910536,522.8628230616303,524.8508946322067,526.8389662027834,528.8270377733598,530.8151093439363,532.803180914513,534.7912524850894,536.779324055666,538.7673956262425,540.755467196819,542.7435387673956,544.7316103379721,546.7196819085488,548.7077534791252,550.6958250497017,552.6838966202783,554.6719681908548,556.6600397614314,558.6481113320079,560.6361829025844,562.624254473161,564.6123260437375,566.6003976143141,568.5884691848906,570.5765407554672,572.5646123260437,574.5526838966202,576.5407554671968,578.5288270377733,580.51689860835,582.5049701789264,584.4930417495029,586.4811133200795,588.469184890656,590.4572564612326,592.4453280318091,594.4333996023856,596.4214711729622,598.4095427435387,600.3976143141153,602.3856858846918,604.3737574552684,606.3618290258449,608.3499005964214,610.337972166998,612.3260437375745,614.3141153081511,616.3021868787276,618.2902584493041,620.2783300198807,622.2664015904572,624.2544731610338,626.2425447316103,628.2306163021868,630.2186878727634,632.2067594433399,634.1948310139165,636.182902584493,638.1709741550695,640.1590457256461,642.1471172962226,644.1351888667992,646.1232604373757,648.1113320079523,650.0994035785288,652.0874751491053,654.0755467196819,656.0636182902584,658.051689860835,660.0397614314115,662.027833001988,664.0159045725646,666.0039761431411,667.9920477137177,669.9801192842942,671.9681908548707,673.9562624254473,675.9443339960238,677.9324055666004,679.9204771371769,681.9085487077534,683.89662027833,685.8846918489065,687.8727634194831,689.8608349900596,691.8489065606362,693.8369781312127,695.8250497017892,697.8131212723658,699.8011928429423,701.7892644135189,703.7773359840954,705.7654075546719,707.7534791252485,709.741550695825,711.7296222664016,713.7176938369781,715.7057654075546,717.6938369781312,719.6819085487077,721.6699801192843,723.6580516898608,725.6461232604373,727.6341948310139,729.6222664015904,731.610337972167,733.5984095427435,735.5864811133201,737.5745526838966,739.5626242544731,741.5506958250497,743.5387673956262,745.5268389662028,747.5149105367793,749.5029821073558,751.4910536779324,753.4791252485089,755.4671968190855,757.455268389662,759.4433399602385,761.4314115308151,763.4194831013916,765.4075546719682,767.3956262425447,769.3836978131212,771.3717693836978,773.3598409542743,775.3479125248509,777.3359840954274,779.324055666004,781.3121272365805,783.300198807157,785.2882703777336,787.2763419483101,789.2644135188867,791.2524850894632,793.2405566600397,795.2286282306163,797.2166998011928,799.2047713717694,801.1928429423459,803.1809145129224,805.168986083499,807.1570576540755,809.1451292246521,811.1332007952286,813.1212723658052,815.1093439363817,817.0974155069582,819.0854870775348,821.0735586481113,823.0616302186879,825.0497017892644,827.0377733598409,829.0258449304175,831.013916500994,833.0019880715706,834.9900596421471,836.9781312127236,838.9662027833002,840.9542743538767,842.9423459244533,844.9304174950298,846.9184890656063,848.9065606361829,850.8946322067594,852.882703777336,854.8707753479125,856.8588469184891,858.8469184890656,860.8349900596421,862.8230616302187,864.8111332007952,866.7992047713718,868.7872763419483,870.7753479125248,872.7634194831014,874.7514910536779,876.7395626242545,878.727634194831,880.7157057654075,882.7037773359841,884.6918489065606,886.6799204771372,888.6679920477137,890.6560636182902,892.6441351888668,894.6322067594433,896.6202783300199,898.6083499005964,900.596421471173,902.5844930417495,904.572564612326,906.5606361829026,908.5487077534791,910.5367793240557,912.5248508946322,914.5129224652087,916.5009940357853,918.4890656063618,920.4771371769384,922.4652087475149,924.4532803180914,926.441351888668,928.4294234592445,930.4174950298211,932.4055666003976,934.3936381709741,936.3817097415507,938.3697813121272,940.3578528827038,942.3459244532803,944.3339960238569,946.3220675944334,948.3101391650099,950.2982107355865,952.286282306163,954.2743538767396,956.2624254473161,958.2504970178926,960.2385685884692,962.2266401590457,964.2147117296223,966.2027833001988,968.1908548707753,970.1789264413519,972.1669980119284,974.155069582505,976.1431411530815,978.131212723658,980.1192842942346,982.1073558648111,984.0954274353877,986.0834990059642,988.0715705765408,990.0596421471173,992.0477137176938,994.0357852882704,996.0238568588469,998.0119284294235,1000.0]}
},{}],71:[function(require,module,exports){
module.exports={"expected":[[0.7654505172902097,-664],[0.7646896320841559,-664],[0.763928746878102,-664],[0.7631678616720481,-664],[0.7624069764659942,-664],[0.7616460912599403,-664],[0.7608852060538864,-664],[0.7601243208478325,-664],[0.7593634356417787,-664],[0.7586025504357248,-664],[0.7578416652296709,-664],[0.7570807800236169,-664],[0.756319894817563,-664],[0.7555590096115092,-664],[0.7547981244054554,-664],[0.7540372391994015,-664],[0.7532763539933476,-664],[0.7525154687872937,-664],[0.7517545835812398,-664],[0.7509936983751859,-664],[0.750232813169132,-664],[0.7494719279630782,-664],[0.7487110427570242,-664],[0.7479501575509703,-664],[0.7471892723449164,-664],[0.7464283871388626,-664],[0.7456675019328087,-664],[0.7449066167267548,-664],[0.744145731520701,-664],[0.7433848463146471,-664],[0.7426239611085932,-664],[0.7418630759025393,-664],[0.7411021906964854,-664],[0.7403413054904314,-664],[0.7395804202843775,-664],[0.7388195350783237,-664],[0.7380586498722698,-664],[0.737297764666216,-664],[0.7365368794601621,-664],[0.7357759942541082,-664],[0.7350151090480543,-664],[0.7342542238420005,-664],[0.7334933386359466,-664],[0.7327324534298926,-664],[0.7319715682238387,-664],[0.7312106830177848,-664],[0.7304497978117309,-664],[0.729688912605677,-664],[0.7289280273996231,-664],[0.7281671421935693,-664],[0.7274062569875155,-664],[0.7266453717814616,-664],[0.7258844865754077,-664],[0.7251236013693538,-664],[0.7243627161632998,-664],[0.723601830957246,-664],[0.7228409457511921,-664],[0.7220800605451382,-664],[0.7213191753390843,-664],[0.7205582901330304,-664],[0.7197974049269765,-664],[0.7190365197209226,-664],[0.7182756345148689,-664],[0.717514749308815,-664],[0.7167538641027611,-664],[0.7159929788967071,-664],[0.7152320936906532,-664],[0.7144712084845993,-664],[0.7137103232785454,-664],[0.7129494380724916,-664],[0.7121885528664377,-664],[0.7114276676603838,-664],[0.7106667824543299,-664],[0.709905897248276,-664],[0.7091450120422222,-664],[0.7083841268361682,-664],[0.7076232416301144,-664],[0.7068623564240605,-664],[0.7061014712180066,-664],[0.7053405860119527,-664],[0.7045797008058988,-664],[0.7038188155998449,-664],[0.703057930393791,-664],[0.7022970451877372,-664],[0.7015361599816833,-664],[0.7007752747756294,-664],[0.7000143895695755,-664],[0.6992535043635216,-664],[0.6984926191574677,-664],[0.6977317339514139,-664],[0.69697084874536,-664],[0.6962099635393061,-664],[0.6954490783332522,-664],[0.6946881931271983,-664],[0.6939273079211444,-664],[0.6931664227150905,-664],[0.6924055375090366,-664],[0.6916446523029827,-664],[0.6908837670969289,-664],[0.690122881890875,-664],[0.6893619966848211,-664],[0.6886011114787672,-664],[0.6878402262727134,-664],[0.6870793410666595,-664],[0.6863184558606056,-664],[0.6855575706545517,-664],[0.6847966854484978,-664],[0.6840358002424438,-664],[0.6832749150363899,-664],[0.682514029830336,-664],[0.6817531446242822,-664],[0.6809922594182284,-664],[0.6802313742121745,-664],[0.6794704890061206,-664],[0.6787096038000667,-664],[0.6779487185940128,-664],[0.677187833387959,-664],[0.6764269481819051,-664],[0.6756660629758511,-664],[0.6749051777697972,-664],[0.6741442925637433,-664],[0.6733834073576894,-664],[0.6726225221516355,-664],[0.6718616369455818,-664],[0.6711007517395279,-664],[0.670339866533474,-664],[0.6695789813274201,-664],[0.6688180961213662,-664],[0.6680572109153122,-664],[0.6672963257092583,-664],[0.6665354405032045,-664],[0.6657745552971506,-664],[0.6650136700910967,-664],[0.6642527848850428,-664],[0.6634918996789889,-664],[0.6627310144729351,-664],[0.6619701292668813,-664],[0.6612092440608274,-664],[0.6604483588547735,-664],[0.6596874736487195,-664],[0.6589265884426656,-664],[0.6581657032366117,-664],[0.6574048180305578,-664],[0.656643932824504,-664],[0.6558830476184501,-664],[0.6551221624123962,-664],[0.6543612772063423,-664],[0.6536003920002885,-664],[0.6528395067942346,-664],[0.6520786215881808,-664],[0.6513177363821268,-664],[0.6505568511760729,-664],[0.649795965970019,-664],[0.6490350807639651,-664],[0.6482741955579112,-664],[0.6475133103518573,-664],[0.6467524251458034,-664],[0.6459915399397496,-664],[0.6452306547336957,-664],[0.6444697695276419,-664],[0.6437088843215879,-664],[0.642947999115534,-664],[0.6421871139094801,-664],[0.6414262287034262,-664],[0.6406653434973724,-664],[0.6399044582913185,-664],[0.6391435730852646,-664],[0.6383826878792107,-664],[0.6376218026731568,-664],[0.6368609174671029,-664],[0.636100032261049,-664],[0.6353391470549952,-664],[0.6345782618489413,-664],[0.6338173766428874,-664],[0.6330564914368335,-664],[0.6322956062307796,-664],[0.6315347210247257,-664],[0.6307738358186719,-664],[0.630012950612618,-664],[0.6292520654065641,-664],[0.6284911802005102,-664],[0.6277302949944563,-664],[0.6269694097884023,-664],[0.6262085245823484,-664],[0.6254476393762947,-664],[0.6246867541702408,-664],[0.6239258689641869,-664],[0.623164983758133,-664],[0.6224040985520791,-664],[0.6216432133460252,-664],[0.6208823281399714,-664],[0.6201214429339175,-664],[0.6193605577278635,-664],[0.6185996725218096,-664],[0.6178387873157557,-664],[0.6170779021097018,-664],[0.616317016903648,-664],[0.6155561316975942,-664],[0.6147952464915403,-664],[0.6140343612854864,-664],[0.6132734760794325,-664],[0.6125125908733786,-664],[0.6117517056673247,-664],[0.6109908204612707,-664],[0.6102299352552168,-664],[0.609469050049163,-664],[0.6087081648431091,-664],[0.6079472796370552,-664],[0.6071863944310014,-664],[0.6064255092249475,-664],[0.6056646240188936,-664],[0.6049037388128398,-664],[0.6041428536067859,-664],[0.603381968400732,-664],[0.602621083194678,-664],[0.6018601979886241,-664],[0.6010993127825702,-664],[0.6003384275765163,-664],[0.5995775423704625,-664],[0.5988166571644086,-664],[0.5980557719583548,-664],[0.5972948867523009,-664],[0.596534001546247,-664],[0.5957731163401931,-664],[0.5950122311341391,-664],[0.5942513459280853,-664],[0.5934904607220314,-664],[0.5927295755159775,-664],[0.5919686903099236,-664],[0.5912078051038697,-664],[0.5904469198978158,-664],[0.589686034691762,-664],[0.5889251494857082,-664],[0.5881642642796543,-664],[0.5874033790736004,-664],[0.5866424938675464,-664],[0.5858816086614925,-664],[0.5851207234554386,-664],[0.5843598382493848,-664],[0.5835989530433309,-664],[0.582838067837277,-664],[0.5820771826312231,-664],[0.5813162974251692,-664],[0.5805554122191153,-664],[0.5797945270130614,-664],[0.5790336418070077,-664],[0.5782727566009537,-664],[0.5775118713948998,-664],[0.5767509861888459,-664],[0.575990100982792,-664],[0.5752292157767381,-664],[0.5744683305706842,-664],[0.5737074453646304,-664],[0.5729465601585765,-664],[0.5721856749525226,-664],[0.5714247897464687,-664],[0.5706639045404147,-664],[0.5699030193343609,-664],[0.569142134128307,-664],[0.5683812489222532,-664],[0.5676203637161993,-664],[0.5668594785101454,-664],[0.5660985933040915,-664],[0.5653377080980376,-664],[0.5645768228919837,-664],[0.5638159376859299,-664],[0.563055052479876,-664],[0.562294167273822,-664],[0.5615332820677681,-664],[0.5607723968617143,-664],[0.5600115116556604,-664],[0.5592506264496065,-664],[0.5584897412435527,-664],[0.5577288560374988,-664],[0.5569679708314449,-664],[0.556207085625391,-664],[0.5554462004193371,-664],[0.5546853152132831,-664],[0.5539244300072292,-664],[0.5531635448011754,-664],[0.5524026595951215,-664],[0.5516417743890677,-664],[0.5508808891830138,-664],[0.5501200039769599,-664],[0.549359118770906,-664],[0.5485982335648522,-664],[0.5478373483587983,-664],[0.5470764631527444,-664],[0.5463155779466904,-664],[0.5455546927406365,-664],[0.5447938075345826,-664],[0.5440329223285287,-664],[0.5432720371224748,-664],[0.5425111519164211,-664],[0.5417502667103672,-664],[0.5409893815043133,-664],[0.5402284962982594,-664],[0.5394676110922055,-664],[0.5387067258861516,-664],[0.5379458406800977,-664],[0.5371849554740438,-664],[0.5364240702679899,-664],[0.535663185061936,-664],[0.5349022998558821,-664],[0.5341414146498282,-664],[0.5333805294437743,-664],[0.5326196442377206,-664],[0.5318587590316667,-664],[0.5310978738256128,-664],[0.5303369886195588,-664],[0.5295761034135049,-664],[0.528815218207451,-664],[0.5280543330013971,-664],[0.5272934477953433,-664],[0.5265325625892894,-664],[0.5257716773832355,-664],[0.5250107921771816,-664],[0.5242499069711277,-664],[0.523489021765074,-664],[0.5227281365590201,-664],[0.5219672513529661,-664],[0.5212063661469122,-664],[0.5204454809408583,-664],[0.5196845957348044,-664],[0.5189237105287505,-664],[0.5181628253226966,-664],[0.5174019401166428,-664],[0.5166410549105889,-664],[0.515880169704535,-664],[0.5151192844984811,-664],[0.5143583992924273,-664],[0.5135975140863733,-664],[0.5128366288803194,-664],[0.5120757436742656,-664],[0.5113148584682117,-664],[0.5105539732621578,-664],[0.5097930880561039,-664],[0.50903220285005,-664],[0.5082713176439961,-664],[0.5075104324379422,-664],[0.5067495472318884,-664],[0.5059886620258345,-664],[0.5052277768197806,-664],[0.5044668916137267,-664],[0.5037060064076728,-664],[0.5029451212016189,-664],[0.502184235995565,-664],[0.5014233507895112,-664],[0.5006624655834573,-664],[0.9998031607548067,-665],[0.9982813903426989,-665],[0.9967596199305913,-665],[0.9952378495184835,-665],[0.9937160791063757,-665],[0.992194308694268,-665],[0.9906725382821601,-665],[0.9891507678700523,-665],[0.9876289974579446,-665],[0.9861072270458369,-665],[0.9845854566337291,-665],[0.9830636862216212,-665],[0.9815419158095134,-665],[0.9800201453974057,-665],[0.978498374985298,-665],[0.9769766045731902,-665],[0.9754548341610824,-665],[0.9739330637489746,-665],[0.9724112933368668,-665],[0.970889522924759,-665],[0.9693677525126513,-665],[0.9678459821005436,-665],[0.9663242116884357,-665],[0.964802441276328,-665],[0.9632806708642202,-665],[0.9617589004521124,-665],[0.9602371300400047,-665],[0.9587153596278969,-665],[0.9571935892157891,-665],[0.9556718188036813,-665],[0.9541500483915736,-665],[0.9526282779794658,-665],[0.9511065075673579,-665],[0.9495847371552503,-665],[0.9480629667431425,-665],[0.9465411963310347,-665],[0.945019425918927,-665],[0.9434976555068192,-665],[0.9419758850947113,-665],[0.9404541146826036,-665],[0.9389323442704959,-665],[0.9374105738583881,-665],[0.9358888034462803,-665],[0.9343670330341725,-665],[0.9328452626220647,-665],[0.931323492209957,-665],[0.9298017217978493,-665],[0.9282799513857415,-665],[0.9267581809736336,-665],[0.9252364105615258,-665],[0.9237146401494181,-665],[0.9221928697373104,-665],[0.9206710993252026,-665],[0.9191493289130949,-665],[0.917627558500987,-665],[0.9161057880888792,-665],[0.9145840176767714,-665],[0.9130622472646638,-665],[0.911540476852556,-665],[0.9100187064404481,-665],[0.9084969360283404,-665],[0.9069751656162326,-665],[0.9054533952041248,-665],[0.9039316247920172,-665],[0.9024098543799093,-665],[0.9008880839678015,-665],[0.8993663135556937,-665],[0.897844543143586,-665],[0.8963227727314782,-665],[0.8948010023193705,-665],[0.8932792319072627,-665],[0.8917574614951549,-665],[0.8902356910830471,-665],[0.8887139206709394,-665],[0.8871921502588316,-665],[0.8856703798467238,-665],[0.884148609434616,-665],[0.8826268390225083,-665],[0.8811050686104005,-665],[0.8795832981982927,-665],[0.8780615277861848,-665],[0.8765397573740772,-665],[0.8750179869619694,-665],[0.8734962165498616,-665],[0.8719744461377539,-665],[0.870452675725646,-665],[0.8689309053135382,-665],[0.8674091349014305,-665],[0.8658873644893228,-665],[0.864365594077215,-665],[0.8628438236651073,-665],[0.8613220532529994,-665],[0.8598002828408916,-665],[0.8582785124287838,-665],[0.8567567420166762,-665],[0.8552349716045684,-665],[0.8537132011924605,-665],[0.8521914307803528,-665],[0.850669660368245,-665],[0.8491478899561372,-665],[0.8476261195440296,-665],[0.8461043491319217,-665],[0.8445825787198139,-665],[0.8430608083077061,-665],[0.8415390378955984,-665],[0.8400172674834906,-665],[0.8384954970713829,-665],[0.836973726659275,-665],[0.8354519562471673,-665],[0.8339301858350595,-665],[0.8324084154229517,-665],[0.830886645010844,-665],[0.8293648745987362,-665],[0.8278431041866284,-665],[0.8263213337745207,-665],[0.8247995633624129,-665],[0.8232777929503051,-665],[0.8217560225381972,-665],[0.8202342521260896,-665],[0.8187124817139818,-665],[0.817190711301874,-665],[0.8156689408897663,-665],[0.8141471704776585,-665],[0.8126254000655506,-665],[0.811103629653443,-665],[0.8095818592413352,-665],[0.8080600888292274,-665],[0.8065383184171196,-665],[0.8050165480050118,-665],[0.803494777592904,-665],[0.8019730071807963,-665],[0.8004512367686886,-665],[0.7989294663565808,-665],[0.7974076959444729,-665],[0.7958859255323651,-665],[0.7943641551202574,-665],[0.7928423847081497,-665],[0.791320614296042,-665],[0.7897988438839342,-665],[0.7882770734718263,-665],[0.7867553030597185,-665],[0.7852335326476108,-665],[0.7837117622355031,-665],[0.7821899918233953,-665],[0.7806682214112874,-665],[0.7791464509991797,-665],[0.7776246805870719,-665],[0.7761029101749641,-665],[0.7745811397628564,-665],[0.7730593693507486,-665],[0.7715375989386408,-665],[0.770015828526533,-665],[0.7684940581144253,-665],[0.7669722877023175,-665],[0.7654505172902097,-665],[0.763928746878102,-665],[0.7624069764659942,-665],[0.7608852060538864,-665],[0.7593634356417787,-665],[0.7578416652296709,-665],[0.756319894817563,-665],[0.7547981244054554,-665],[0.7532763539933476,-665],[0.7517545835812398,-665],[0.750232813169132,-665],[0.7487110427570242,-665],[0.7471892723449164,-665],[0.7456675019328087,-665],[0.744145731520701,-665],[0.7426239611085932,-665],[0.7411021906964854,-665],[0.7395804202843775,-665],[0.7380586498722698,-665],[0.7365368794601621,-665],[0.7350151090480543,-665],[0.7334933386359466,-665],[0.7319715682238387,-665],[0.7304497978117309,-665],[0.7289280273996231,-665],[0.7274062569875155,-665],[0.7258844865754077,-665],[0.7243627161632998,-665],[0.7228409457511921,-665],[0.7213191753390843,-665],[0.7197974049269765,-665],[0.7182756345148689,-665],[0.7167538641027611,-665],[0.7152320936906532,-665],[0.7137103232785454,-665],[0.7121885528664377,-665],[0.7106667824543299,-665],[0.7091450120422222,-665],[0.7076232416301144,-665],[0.7061014712180066,-665],[0.7045797008058988,-665],[0.703057930393791,-665],[0.7015361599816833,-665],[0.7000143895695755,-665],[0.6984926191574677,-665],[0.69697084874536,-665],[0.6954490783332522,-665],[0.6939273079211444,-665],[0.6924055375090366,-665],[0.6908837670969289,-665],[0.6893619966848211,-665],[0.6878402262727134,-665],[0.6863184558606056,-665],[0.6847966854484978,-665],[0.6832749150363899,-665],[0.6817531446242822,-665],[0.6802313742121745,-665],[0.6787096038000667,-665],[0.677187833387959,-665],[0.6756660629758511,-665],[0.6741442925637433,-665],[0.6726225221516355,-665],[0.6711007517395279,-665],[0.6695789813274201,-665],[0.6680572109153122,-665],[0.6665354405032045,-665],[0.6650136700910967,-665],[0.6634918996789889,-665],[0.6619701292668813,-665],[0.6604483588547735,-665],[0.6589265884426656,-665],[0.6574048180305578,-665],[0.6558830476184501,-665],[0.6543612772063423,-665],[0.6528395067942346,-665],[0.6513177363821268,-665],[0.649795965970019,-665],[0.6482741955579112,-665],[0.6467524251458034,-665],[0.6452306547336957,-665],[0.6437088843215879,-665],[0.6421871139094801,-665],[0.6406653434973724,-665],[0.6391435730852646,-665],[0.6376218026731568,-665],[0.636100032261049,-665],[0.6345782618489413,-665],[0.6330564914368335,-665],[0.6315347210247257,-665],[0.630012950612618,-665],[0.6284911802005102,-665],[0.6269694097884023,-665],[0.6254476393762947,-665],[0.6239258689641869,-665],[0.6224040985520791,-665],[0.6208823281399714,-665],[0.6193605577278635,-665],[0.6178387873157557,-665],[0.616317016903648,-665],[0.6147952464915403,-665],[0.6132734760794325,-665],[0.6117517056673247,-665],[0.6102299352552168,-665],[0.6087081648431091,-665],[0.6071863944310014,-665],[0.6056646240188936,-665],[0.6041428536067859,-665],[0.602621083194678,-665],[0.6010993127825702,-665],[0.5995775423704625,-665],[0.5980557719583548,-665],[0.596534001546247,-665],[0.5950122311341391,-665],[0.5934904607220314,-665],[0.5919686903099236,-665],[0.5904469198978158,-665],[0.5889251494857082,-665],[0.5874033790736004,-665],[0.5858816086614925,-665],[0.5843598382493848,-665],[0.582838067837277,-665],[0.5813162974251692,-665],[0.5797945270130614,-665],[0.5782727566009537,-665],[0.5767509861888459,-665],[0.5752292157767381,-665],[0.5737074453646304,-665],[0.5721856749525226,-665],[0.5706639045404147,-665],[0.569142134128307,-665],[0.5676203637161993,-665],[0.5660985933040915,-665],[0.5645768228919837,-665],[0.563055052479876,-665],[0.5615332820677681,-665],[0.5600115116556604,-665],[0.5584897412435527,-665],[0.5569679708314449,-665],[0.5554462004193371,-665],[0.5539244300072292,-665],[0.5524026595951215,-665],[0.5508808891830138,-665],[0.549359118770906,-665],[0.5478373483587983,-665],[0.5463155779466904,-665],[0.5447938075345826,-665],[0.5432720371224748,-665],[0.5417502667103672,-665],[0.5402284962982594,-665],[0.5387067258861516,-665],[0.5371849554740438,-665],[0.535663185061936,-665],[0.5341414146498282,-665],[0.5326196442377206,-665],[0.5310978738256128,-665],[0.5295761034135049,-665],[0.5280543330013971,-665],[0.5265325625892894,-665],[0.5250107921771816,-665],[0.523489021765074,-665],[0.5219672513529661,-665],[0.5204454809408583,-665],[0.5189237105287505,-665],[0.5174019401166428,-665],[0.515880169704535,-665],[0.5143583992924273,-665],[0.5128366288803194,-665],[0.5113148584682117,-665],[0.5097930880561039,-665],[0.5082713176439961,-665],[0.5067495472318884,-665],[0.5052277768197806,-665],[0.5037060064076728,-665],[0.502184235995565,-665],[0.5006624655834573,-665],[0.9982813903426989,-666],[0.9952378495184835,-666],[0.992194308694268,-666],[0.9891507678700523,-666],[0.9861072270458369,-666],[0.9830636862216212,-666],[0.9800201453974057,-666],[0.9769766045731902,-666],[0.9739330637489746,-666],[0.970889522924759,-666],[0.9678459821005436,-666],[0.964802441276328,-666],[0.9617589004521124,-666],[0.9587153596278969,-666],[0.9556718188036813,-666],[0.9526282779794658,-666],[0.9495847371552503,-666],[0.9465411963310347,-666],[0.9434976555068192,-666],[0.9404541146826036,-666],[0.9374105738583881,-666],[0.9343670330341725,-666],[0.931323492209957,-666],[0.9282799513857415,-666],[0.9252364105615258,-666],[0.9221928697373104,-666],[0.9191493289130949,-666],[0.9161057880888792,-666],[0.9130622472646638,-666],[0.9100187064404481,-666],[0.9069751656162326,-666],[0.9039316247920172,-666],[0.9008880839678015,-666],[0.897844543143586,-666],[0.8948010023193705,-666],[0.8917574614951549,-666],[0.8887139206709394,-666],[0.8856703798467238,-666],[0.8826268390225083,-666],[0.8795832981982927,-666],[0.8765397573740772,-666],[0.8734962165498616,-666],[0.870452675725646,-666],[0.8674091349014305,-666],[0.864365594077215,-666],[0.8613220532529994,-666],[0.8582785124287838,-666],[0.8552349716045684,-666],[0.8521914307803528,-666],[0.8491478899561372,-666],[0.8461043491319217,-666],[0.8430608083077061,-666],[0.8400172674834906,-666],[0.836973726659275,-666],[0.8339301858350595,-666],[0.830886645010844,-666],[0.8278431041866284,-666],[0.8247995633624129,-666],[0.8217560225381972,-666],[0.8187124817139818,-666],[0.8156689408897663,-666],[0.8126254000655506,-666],[0.8095818592413352,-666],[0.8065383184171196,-666],[0.803494777592904,-666],[0.8004512367686886,-666],[0.7974076959444729,-666],[0.7943641551202574,-666],[0.791320614296042,-666],[0.7882770734718263,-666],[0.7852335326476108,-666],[0.7821899918233953,-666],[0.7791464509991797,-666],[0.7761029101749641,-666],[0.7730593693507486,-666],[0.770015828526533,-666],[0.7669722877023175,-666],[0.763928746878102,-666],[0.7608852060538864,-666],[0.7578416652296709,-666],[0.7547981244054554,-666],[0.7517545835812398,-666],[0.7487110427570242,-666],[0.7456675019328087,-666],[0.7426239611085932,-666],[0.7395804202843775,-666],[0.7365368794601621,-666],[0.7334933386359466,-666],[0.7304497978117309,-666],[0.7274062569875155,-666],[0.7243627161632998,-666],[0.7213191753390843,-666],[0.7182756345148689,-666],[0.7152320936906532,-666],[0.7121885528664377,-666],[0.7091450120422222,-666],[0.7061014712180066,-666],[0.703057930393791,-666],[0.7000143895695755,-666],[0.69697084874536,-666],[0.6939273079211444,-666],[0.6908837670969289,-666],[0.6878402262727134,-666],[0.6847966854484978,-666],[0.6817531446242822,-666],[0.6787096038000667,-666],[0.6756660629758511,-666],[0.6726225221516355,-666],[0.6695789813274201,-666],[0.6665354405032045,-666],[0.6634918996789889,-666],[0.6604483588547735,-666],[0.6574048180305578,-666],[0.6543612772063423,-666],[0.6513177363821268,-666],[0.6482741955579112,-666],[0.6452306547336957,-666],[0.6421871139094801,-666],[0.6391435730852646,-666],[0.636100032261049,-666],[0.6330564914368335,-666],[0.630012950612618,-666],[0.6269694097884023,-666],[0.6239258689641869,-666],[0.6208823281399714,-666],[0.6178387873157557,-666],[0.6147952464915403,-666],[0.6117517056673247,-666],[0.6087081648431091,-666],[0.6056646240188936,-666],[0.602621083194678,-666],[0.5995775423704625,-666],[0.596534001546247,-666],[0.5934904607220314,-666],[0.5904469198978158,-666],[0.5874033790736004,-666],[0.5843598382493848,-666],[0.5813162974251692,-666],[0.5782727566009537,-666],[0.5752292157767381,-666],[0.5721856749525226,-666],[0.569142134128307,-666],[0.5660985933040915,-666],[0.563055052479876,-666],[0.5600115116556604,-666],[0.5569679708314449,-666],[0.5539244300072292,-666],[0.5508808891830138,-666],[0.5478373483587983,-666],[0.5447938075345826,-666],[0.5417502667103672,-666],[0.5387067258861516,-666],[0.535663185061936,-666],[0.5326196442377206,-666],[0.5295761034135049,-666],[0.5265325625892894,-666],[0.523489021765074,-666],[0.5204454809408583,-666],[0.5174019401166428,-666],[0.5143583992924273,-666],[0.5113148584682117,-666],[0.5082713176439961,-666],[0.5052277768197806,-666],[0.502184235995565,-666],[0.9982813903426989,-667],[0.992194308694268,-667],[0.9861072270458369,-667],[0.9800201453974057,-667],[0.9739330637489746,-667],[0.9678459821005436,-667],[0.9617589004521124,-667],[0.9556718188036813,-667],[0.9495847371552503,-667],[0.9434976555068192,-667],[0.9374105738583881,-667],[0.931323492209957,-667],[0.9252364105615258,-667],[0.9191493289130949,-667],[0.9130622472646638,-667],[0.9069751656162326,-667],[0.9008880839678015,-667],[0.8948010023193705,-667],[0.8887139206709394,-667],[0.8826268390225083,-667],[0.8765397573740772,-667],[0.870452675725646,-667],[0.864365594077215,-667],[0.8582785124287838,-667],[0.8521914307803528,-667],[0.8461043491319217,-667],[0.8400172674834906,-667],[0.8339301858350595,-667],[0.8278431041866284,-667],[0.8217560225381972,-667],[0.8156689408897663,-667],[0.8095818592413352,-667],[0.803494777592904,-667],[0.7974076959444729,-667],[0.791320614296042,-667],[0.7852335326476108,-667],[0.7791464509991797,-667],[0.7730593693507486,-667],[0.7669722877023175,-667],[0.7608852060538864,-667],[0.7547981244054554,-667],[0.7487110427570242,-667],[0.7426239611085932,-667],[0.7365368794601621,-667],[0.7304497978117309,-667],[0.7243627161632998,-667],[0.7182756345148689,-667],[0.7121885528664377,-667],[0.7061014712180066,-667],[0.7000143895695755,-667],[0.6939273079211444,-667],[0.6878402262727134,-667],[0.6817531446242822,-667],[0.6756660629758511,-667],[0.6695789813274201,-667],[0.6634918996789889,-667],[0.6574048180305578,-667],[0.6513177363821268,-667],[0.6452306547336957,-667],[0.6391435730852646,-667],[0.6330564914368335,-667],[0.6269694097884023,-667],[0.6208823281399714,-667],[0.6147952464915403,-667],[0.6087081648431091,-667],[0.602621083194678,-667],[0.596534001546247,-667],[0.5904469198978158,-667],[0.5843598382493848,-667],[0.5782727566009537,-667],[0.5721856749525226,-667],[0.5660985933040915,-667],[0.5600115116556604,-667],[0.5539244300072292,-667],[0.5478373483587983,-667],[0.5417502667103672,-667],[0.535663185061936,-667],[0.5295761034135049,-667],[0.523489021765074,-667],[0.5174019401166428,-667],[0.5113148584682117,-667],[0.5052277768197806,-667],[0.9982813903426989,-668],[0.9861072270458369,-668],[0.9739330637489746,-668],[0.9617589004521124,-668],[0.9495847371552503,-668],[0.9374105738583881,-668],[0.9252364105615258,-668],[0.9130622472646638,-668],[0.9008880839678015,-668],[0.8887139206709394,-668],[0.8765397573740772,-668],[0.864365594077215,-668],[0.8521914307803528,-668],[0.8400172674834906,-668],[0.8278431041866284,-668],[0.8156689408897663,-668],[0.803494777592904,-668],[0.791320614296042,-668],[0.7791464509991797,-668],[0.7669722877023175,-668],[0.7547981244054554,-668],[0.7426239611085932,-668],[0.7304497978117309,-668],[0.7182756345148689,-668],[0.7061014712180066,-668],[0.6939273079211444,-668],[0.6817531446242822,-668],[0.6695789813274201,-668],[0.6574048180305578,-668],[0.6452306547336957,-668],[0.6330564914368335,-668],[0.6208823281399714,-668],[0.6087081648431091,-668],[0.596534001546247,-668],[0.5843598382493848,-668],[0.5721856749525226,-668],[0.5600115116556604,-668],[0.5478373483587983,-668],[0.535663185061936,-668],[0.523489021765074,-668],[0.5113148584682117,-668],[0.9982813903426989,-669],[0.9739330637489746,-669],[0.9495847371552503,-669],[0.9252364105615258,-669],[0.9008880839678015,-669],[0.8765397573740772,-669],[0.8521914307803528,-669],[0.8278431041866284,-669],[0.803494777592904,-669],[0.7791464509991797,-669],[0.7547981244054554,-669],[0.7304497978117309,-669],[0.7061014712180066,-669],[0.6817531446242822,-669],[0.6574048180305578,-669],[0.6330564914368335,-669],[0.6087081648431091,-669],[0.5843598382493848,-669],[0.5600115116556604,-669],[0.535663185061936,-669],[0.5113148584682117,-669],[0.9739330637489746,-670],[0.9252364105615258,-670],[0.8765397573740772,-670],[0.8278431041866284,-670],[0.7791464509991797,-670],[0.7304497978117309,-670],[0.6817531446242822,-670],[0.6330564914368335,-670],[0.5843598382493848,-670],[0.535663185061936,-670],[0.9739330637489746,-671],[0.8765397573740772,-671],[0.7791464509991797,-671],[0.6817531446242822,-671],[0.5843598382493848,-671],[0.9739330637489746,-672],[0.7791464509991797,-672],[0.5843598382493848,-672],[0.7791464509991797,-673],[0.7791464509991797,-674],[0.8988465674311579,-1023]],"x":[1.0e-200,9.990059642147117e-201,9.980119284294234e-201,9.970178926441352e-201,9.960238568588469e-201,9.950298210735586e-201,9.940357852882704e-201,9.930417495029821e-201,9.920477137176938e-201,9.910536779324056e-201,9.900596421471173e-201,9.890656063618289e-201,9.880715705765406e-201,9.870775347912525e-201,9.860834990059642e-201,9.85089463220676e-201,9.840954274353877e-201,9.831013916500994e-201,9.821073558648111e-201,9.811133200795229e-201,9.801192842942346e-201,9.791252485089463e-201,9.781312127236579e-201,9.771371769383697e-201,9.761431411530814e-201,9.751491053677933e-201,9.74155069582505e-201,9.731610337972167e-201,9.721669980119285e-201,9.711729622266402e-201,9.701789264413519e-201,9.691848906560637e-201,9.681908548707754e-201,9.67196819085487e-201,9.662027833001987e-201,9.652087475149104e-201,9.642147117296222e-201,9.63220675944334e-201,9.622266401590458e-201,9.612326043737575e-201,9.602385685884692e-201,9.59244532803181e-201,9.582504970178927e-201,9.572564612326043e-201,9.56262425447316e-201,9.552683896620277e-201,9.542743538767395e-201,9.532803180914512e-201,9.52286282306163e-201,9.512922465208747e-201,9.502982107355866e-201,9.493041749502983e-201,9.4831013916501e-201,9.473161033797217e-201,9.463220675944333e-201,9.45328031809145e-201,9.443339960238568e-201,9.433399602385685e-201,9.423459244532803e-201,9.41351888667992e-201,9.403578528827037e-201,9.393638170974155e-201,9.383697813121273e-201,9.37375745526839e-201,9.363817097415508e-201,9.353876739562624e-201,9.343936381709741e-201,9.333996023856858e-201,9.324055666003976e-201,9.314115308151093e-201,9.30417495029821e-201,9.294234592445328e-201,9.284294234592445e-201,9.274353876739562e-201,9.264413518886681e-201,9.254473161033797e-201,9.244532803180914e-201,9.234592445328032e-201,9.224652087475149e-201,9.214711729622266e-201,9.204771371769383e-201,9.194831013916501e-201,9.184890656063618e-201,9.174950298210735e-201,9.165009940357853e-201,9.15506958250497e-201,9.145129224652087e-201,9.135188866799205e-201,9.125248508946322e-201,9.11530815109344e-201,9.105367793240557e-201,9.095427435387674e-201,9.085487077534791e-201,9.075546719681909e-201,9.065606361829026e-201,9.055666003976143e-201,9.045725646123259e-201,9.035785288270376e-201,9.025844930417495e-201,9.015904572564612e-201,9.00596421471173e-201,8.996023856858847e-201,8.986083499005964e-201,8.976143141153082e-201,8.966202783300199e-201,8.956262425447316e-201,8.946322067594434e-201,8.93638170974155e-201,8.926441351888667e-201,8.916500994035784e-201,8.906560636182901e-201,8.89662027833002e-201,8.886679920477138e-201,8.876739562624255e-201,8.866799204771372e-201,8.85685884691849e-201,8.846918489065607e-201,8.836978131212724e-201,8.82703777335984e-201,8.817097415506957e-201,8.807157057654075e-201,8.797216699801192e-201,8.787276341948309e-201,8.777335984095428e-201,8.767395626242545e-201,8.757455268389663e-201,8.74751491053678e-201,8.737574552683897e-201,8.727634194831013e-201,8.71769383697813e-201,8.707753479125248e-201,8.697813121272365e-201,8.687872763419482e-201,8.6779324055666e-201,8.667992047713717e-201,8.658051689860836e-201,8.648111332007953e-201,8.63817097415507e-201,8.628230616302188e-201,8.618290258449304e-201,8.608349900596421e-201,8.598409542743538e-201,8.588469184890655e-201,8.578528827037773e-201,8.56858846918489e-201,8.558648111332007e-201,8.548707753479125e-201,8.538767395626243e-201,8.528827037773361e-201,8.518886679920478e-201,8.508946322067594e-201,8.499005964214711e-201,8.489065606361829e-201,8.479125248508946e-201,8.469184890656063e-201,8.45924453280318e-201,8.449304174950298e-201,8.439363817097415e-201,8.429423459244532e-201,8.419483101391651e-201,8.409542743538767e-201,8.399602385685884e-201,8.389662027833002e-201,8.379721669980119e-201,8.369781312127236e-201,8.359840954274354e-201,8.349900596421471e-201,8.339960238568588e-201,8.330019880715706e-201,8.320079522862823e-201,8.31013916500994e-201,8.300198807157058e-201,8.290258449304175e-201,8.280318091451292e-201,8.27037773359841e-201,8.260437375745527e-201,8.250497017892644e-201,8.240556660039761e-201,8.230616302186879e-201,8.220675944333996e-201,8.210735586481113e-201,8.20079522862823e-201,8.190854870775347e-201,8.180914512922464e-201,8.170974155069583e-201,8.1610337972167e-201,8.151093439363817e-201,8.141153081510935e-201,8.131212723658052e-201,8.121272365805169e-201,8.111332007952287e-201,8.101391650099404e-201,8.09145129224652e-201,8.081510934393637e-201,8.071570576540754e-201,8.061630218687872e-201,8.05168986083499e-201,8.041749502982108e-201,8.031809145129225e-201,8.021868787276342e-201,8.01192842942346e-201,8.001988071570577e-201,7.992047713717694e-201,7.98210735586481e-201,7.972166998011927e-201,7.962226640159045e-201,7.952286282306162e-201,7.94234592445328e-201,7.932405566600398e-201,7.922465208747515e-201,7.912524850894633e-201,7.90258449304175e-201,7.892644135188867e-201,7.882703777335985e-201,7.8727634194831e-201,7.862823061630218e-201,7.852882703777335e-201,7.842942345924453e-201,7.83300198807157e-201,7.823061630218687e-201,7.813121272365806e-201,7.803180914512923e-201,7.79324055666004e-201,7.783300198807158e-201,7.773359840954274e-201,7.763419483101391e-201,7.753479125248508e-201,7.743538767395626e-201,7.733598409542743e-201,7.72365805168986e-201,7.713717693836978e-201,7.703777335984095e-201,7.693836978131214e-201,7.683896620278331e-201,7.673956262425448e-201,7.664015904572564e-201,7.654075546719682e-201,7.644135188866799e-201,7.634194831013916e-201,7.624254473161033e-201,7.614314115308151e-201,7.604373757455268e-201,7.594433399602385e-201,7.584493041749503e-201,7.57455268389662e-201,7.564612326043739e-201,7.554671968190855e-201,7.544731610337972e-201,7.534791252485089e-201,7.524850894632207e-201,7.514910536779324e-201,7.504970178926441e-201,7.495029821073559e-201,7.485089463220676e-201,7.475149105367793e-201,7.46520874751491e-201,7.455268389662026e-201,7.445328031809145e-201,7.435387673956262e-201,7.42544731610338e-201,7.415506958250497e-201,7.405566600397614e-201,7.395626242544732e-201,7.385685884691849e-201,7.375745526838966e-201,7.365805168986084e-201,7.355864811133201e-201,7.345924453280317e-201,7.335984095427434e-201,7.326043737574553e-201,7.31610337972167e-201,7.306163021868787e-201,7.296222664015905e-201,7.286282306163022e-201,7.27634194831014e-201,7.266401590457257e-201,7.256461232604374e-201,7.24652087475149e-201,7.236580516898607e-201,7.226640159045725e-201,7.216699801192842e-201,7.20675944333996e-201,7.196819085487078e-201,7.186878727634195e-201,7.176938369781313e-201,7.16699801192843e-201,7.157057654075547e-201,7.147117296222665e-201,7.13717693836978e-201,7.127236580516898e-201,7.117296222664015e-201,7.107355864811132e-201,7.09741550695825e-201,7.087475149105368e-201,7.077534791252486e-201,7.067594433399603e-201,7.05765407554672e-201,7.047713717693838e-201,7.037773359840955e-201,7.027833001988071e-201,7.017892644135188e-201,7.007952286282305e-201,6.998011928429423e-201,6.98807157057654e-201,6.978131212723657e-201,6.968190854870775e-201,6.958250497017893e-201,6.948310139165011e-201,6.938369781312128e-201,6.928429423459244e-201,6.918489065606361e-201,6.908548707753479e-201,6.898608349900596e-201,6.888667992047713e-201,6.87872763419483e-201,6.868787276341948e-201,6.858846918489065e-201,6.848906560636182e-201,6.838966202783301e-201,6.829025844930419e-201,6.819085487077534e-201,6.809145129224652e-201,6.799204771371769e-201,6.789264413518886e-201,6.779324055666004e-201,6.769383697813121e-201,6.759443339960238e-201,6.749502982107356e-201,6.739562624254473e-201,6.72962226640159e-201,6.719681908548709e-201,6.709741550695825e-201,6.699801192842942e-201,6.68986083499006e-201,6.679920477137177e-201,6.669980119284294e-201,6.660039761431411e-201,6.650099403578529e-201,6.640159045725646e-201,6.630218687872763e-201,6.62027833001988e-201,6.610337972166998e-201,6.600397614314115e-201,6.590457256461233e-201,6.58051689860835e-201,6.570576540755467e-201,6.560636182902585e-201,6.550695825049702e-201,6.540755467196819e-201,6.530815109343936e-201,6.520874751491053e-201,6.510934393638171e-201,6.5009940357852884e-201,6.491053677932406e-201,6.481113320079523e-201,6.47117296222664e-201,6.461232604373757e-201,6.451292246520875e-201,6.441351888667992e-201,6.43141153081511e-201,6.421471172962226e-201,6.4115308151093435e-201,6.401590457256461e-201,6.391650099403579e-201,6.381709741550696e-201,6.371769383697813e-201,6.36182902584493e-201,6.3518886679920474e-201,6.341948310139165e-201,6.332007952286282e-201,6.3220675944334e-201,6.312127236580517e-201,6.302186878727634e-201,6.292246520874751e-201,6.2823061630218686e-201,6.272365805168986e-201,6.262425447316103e-201,6.2524850894632206e-201,6.242544731610338e-201,6.232604373757455e-201,6.2226640159045725e-201,6.212723658051689e-201,6.202783300198807e-201,6.1928429423459244e-201,6.182902584493042e-201,6.172962226640159e-201,6.1630218687872764e-201,6.153081510934393e-201,6.143141153081511e-201,6.133200795228628e-201,6.123260437375746e-201,6.113320079522863e-201,6.1033797216699795e-201,6.093439363817097e-201,6.083499005964215e-201,6.073558648111332e-201,6.0636182902584495e-201,6.053677932405566e-201,6.0437375745526834e-201,6.033797216699801e-201,6.023856858846919e-201,6.013916500994036e-201,6.0039761431411534e-201,5.99403578528827e-201,5.984095427435387e-201,5.9741550695825046e-201,5.964214711729623e-201,5.95427435387674e-201,5.9443339960238566e-201,5.934393638170974e-201,5.924453280318091e-201,5.9145129224652085e-201,5.9045725646123265e-201,5.894632206759443e-201,5.8846918489065604e-201,5.874751491053678e-201,5.864811133200795e-201,5.8548707753479124e-201,5.8449304174950304e-201,5.834990059642147e-201,5.825049701789264e-201,5.8151093439363816e-201,5.805168986083499e-201,5.795228628230616e-201,5.7852882703777336e-201,5.775347912524851e-201,5.765407554671968e-201,5.7554671968190855e-201,5.745526838966203e-201,5.7355864811133194e-201,5.7256461232604375e-201,5.715705765407555e-201,5.705765407554672e-201,5.6958250497017894e-201,5.685884691848906e-201,5.675944333996023e-201,5.6660039761431406e-201,5.656063618290259e-201,5.646123260437376e-201,5.636182902584493e-201,5.62624254473161e-201,5.616302186878727e-201,5.6063618290258445e-201,5.5964214711729625e-201,5.58648111332008e-201,5.5765407554671964e-201,5.566600397614314e-201,5.556660039761431e-201,5.5467196819085484e-201,5.5367793240556664e-201,5.526838966202783e-201,5.5168986083499e-201,5.5069582504970176e-201,5.497017892644135e-201,5.487077534791252e-201,5.47713717693837e-201,5.467196819085487e-201,5.457256461232604e-201,5.4473161033797215e-201,5.437375745526839e-201,5.427435387673956e-201,5.4174950298210735e-201,5.407554671968191e-201,5.397614314115308e-201,5.3876739562624254e-201,5.377733598409543e-201,5.367793240556659e-201,5.357852882703777e-201,5.347912524850895e-201,5.337972166998012e-201,5.328031809145129e-201,5.3180914512922466e-201,5.308151093439363e-201,5.298210735586481e-201,5.2882703777335985e-201,5.278330019880716e-201,5.268389662027833e-201,5.25844930417495e-201,5.248508946322067e-201,5.238568588469185e-201,5.2286282306163024e-201,5.21868787276342e-201,5.208747514910536e-201,5.1988071570576536e-201,5.188866799204771e-201,5.178926441351889e-201,5.168986083499006e-201,5.1590457256461236e-201,5.14910536779324e-201,5.1391650099403575e-201,5.129224652087475e-201,5.119284294234593e-201,5.10934393638171e-201,5.099403578528827e-201,5.089463220675944e-201,5.0795228628230614e-201,5.069582504970179e-201,5.059642147117296e-201,5.049701789264413e-201,5.039761431411531e-201,5.029821073558648e-201,5.019880715705765e-201,5.0099403578528826e-201,5.0e-201,4.990059642147117e-201,4.9801192842942345e-201,4.970178926441352e-201,4.960238568588469e-201,4.9502982107355865e-201,4.940357852882703e-201,4.930417495029821e-201,4.9204771371769384e-201,4.910536779324056e-201,4.900596421471173e-201,4.8906560636182896e-201,4.880715705765407e-201,4.870775347912525e-201,4.860834990059642e-201,4.8508946322067596e-201,4.840954274353877e-201,4.8310139165009935e-201,4.821073558648111e-201,4.811133200795229e-201,4.801192842942346e-201,4.7912524850894635e-201,4.78131212723658e-201,4.7713717693836974e-201,4.761431411530815e-201,4.751491053677933e-201,4.74155069582505e-201,4.731610337972167e-201,4.721669980119284e-201,4.711729622266401e-201,4.7017892644135186e-201,4.6918489065606366e-201,4.681908548707754e-201,4.6719681908548705e-201,4.662027833001988e-201,4.652087475149105e-201,4.6421471172962225e-201,4.6322067594433405e-201,4.622266401590457e-201,4.6123260437375744e-201,4.602385685884692e-201,4.592445328031809e-201,4.582504970178926e-201,4.572564612326044e-201,4.562624254473161e-201,4.552683896620278e-201,4.5427435387673956e-201,4.532803180914513e-201,4.5228628230616295e-201,4.5129224652087476e-201,4.502982107355865e-201,4.493041749502982e-201,4.4831013916500995e-201,4.473161033797217e-201,4.4632206759443334e-201,4.453280318091451e-201,4.443339960238569e-201,4.433399602385686e-201,4.4234592445328034e-201,4.41351888667992e-201,4.403578528827037e-201,4.3936381709741546e-201,4.3836978131212726e-201,4.37375745526839e-201,4.3638170974155065e-201,4.353876739562624e-201,4.343936381709741e-201,4.3339960238568585e-201,4.3240556660039765e-201,4.314115308151094e-201,4.3041749502982104e-201,4.294234592445328e-201,4.284294234592445e-201,4.274353876739562e-201,4.2644135188866804e-201,4.254473161033797e-201,4.244532803180914e-201,4.2345924453280316e-201,4.224652087475149e-201,4.214711729622266e-201,4.2047713717693836e-201,4.194831013916501e-201,4.184890656063618e-201,4.1749502982107355e-201,4.165009940357853e-201,4.15506958250497e-201,4.1451292246520874e-201,4.135188866799205e-201,4.125248508946322e-201,4.1153081510934394e-201,4.105367793240557e-201,4.095427435387673e-201,4.085487077534791e-201,4.0755467196819086e-201,4.065606361829026e-201,4.055666003976143e-201,4.04572564612326e-201,4.035785288270377e-201,4.025844930417495e-201,4.0159045725646125e-201,4.00596421471173e-201,3.996023856858847e-201,3.986083499005964e-201,3.976143141153081e-201,3.966202783300199e-201,3.9562624254473164e-201,3.946322067594434e-201,3.93638170974155e-201,3.9264413518886676e-201,3.916500994035785e-201,3.906560636182903e-201,3.89662027833002e-201,3.886679920477137e-201,3.876739562624254e-201,3.8667992047713715e-201,3.856858846918489e-201,3.846918489065607e-201,3.836978131212724e-201,3.827037773359841e-201,3.817097415506958e-201,3.8071570576540754e-201,3.797216699801193e-201,3.78727634194831e-201,3.777335984095427e-201,3.7673956262425446e-201,3.757455268389662e-201,3.747514910536779e-201,3.7375745526838966e-201,3.727634194831013e-201,3.717693836978131e-201,3.7077534791252485e-201,3.697813121272366e-201,3.687872763419483e-201,3.6779324055666005e-201,3.667992047713717e-201,3.658051689860835e-201,3.6481113320079524e-201,3.63817097415507e-201,3.628230616302187e-201,3.6182902584493036e-201,3.608349900596421e-201,3.598409542743539e-201,3.588469184890656e-201,3.5785288270377736e-201,3.56858846918489e-201,3.5586481113320075e-201,3.548707753479125e-201,3.538767395626243e-201,3.52882703777336e-201,3.5188866799204775e-201,3.508946322067594e-201,3.4990059642147114e-201,3.489065606361829e-201,3.479125248508947e-201,3.469184890656064e-201,3.4592445328031806e-201,3.449304174950298e-201,3.439363817097415e-201,3.4294234592445326e-201,3.4194831013916506e-201,3.409542743538767e-201,3.3996023856858845e-201,3.389662027833002e-201,3.379721669980119e-201,3.3697813121272365e-201,3.3598409542743545e-201,3.349900596421471e-201,3.3399602385685884e-201,3.330019880715706e-201,3.320079522862823e-201,3.31013916500994e-201,3.300198807157058e-201,3.290258449304175e-201,3.280318091451292e-201,3.2703777335984096e-201,3.2604373757455265e-201,3.2504970178926442e-201,3.2405566600397615e-201,3.2306163021868785e-201,3.220675944333996e-201,3.210735586481113e-201,3.2007952286282304e-201,3.190854870775348e-201,3.180914512922465e-201,3.1709741550695824e-201,3.1610337972167e-201,3.151093439363817e-201,3.1411530815109343e-201,3.1312127236580516e-201,3.121272365805169e-201,3.1113320079522863e-201,3.1013916500994036e-201,3.091451292246521e-201,3.0815109343936382e-201,3.0715705765407555e-201,3.061630218687873e-201,3.0516898608349898e-201,3.0417495029821074e-201,3.0318091451292248e-201,3.0218687872763417e-201,3.0119284294234594e-201,3.0019880715705767e-201,2.9920477137176937e-201,2.9821073558648113e-201,2.9721669980119283e-201,2.9622266401590456e-201,2.9522862823061633e-201,2.9423459244532802e-201,2.9324055666003975e-201,2.9224652087475152e-201,2.912524850894632e-201,2.9025844930417495e-201,2.8926441351888668e-201,2.882703777335984e-201,2.8727634194831014e-201,2.8628230616302187e-201,2.852882703777336e-201,2.842942345924453e-201,2.8330019880715703e-201,2.823061630218688e-201,2.813121272365805e-201,2.8031809145129222e-201,2.79324055666004e-201,2.783300198807157e-201,2.7733598409542742e-201,2.7634194831013915e-201,2.7534791252485088e-201,2.743538767395626e-201,2.7335984095427434e-201,2.7236580516898608e-201,2.713717693836978e-201,2.7037773359840954e-201,2.6938369781312127e-201,2.6838966202783297e-201,2.6739562624254473e-201,2.6640159045725646e-201,2.6540755467196816e-201,2.6441351888667993e-201,2.6341948310139166e-201,2.6242544731610335e-201,2.6143141153081512e-201,2.604373757455268e-201,2.5944333996023855e-201,2.584493041749503e-201,2.57455268389662e-201,2.5646123260437374e-201,2.554671968190855e-201,2.544731610337972e-201,2.5347912524850894e-201,2.5248508946322067e-201,2.514910536779324e-201,2.5049701789264413e-201,2.4950298210735586e-201,2.485089463220676e-201,2.4751491053677932e-201,2.4652087475149106e-201,2.455268389662028e-201,2.4453280318091448e-201,2.4353876739562625e-201,2.4254473161033798e-201,2.4155069582504968e-201,2.4055666003976144e-201,2.3956262425447317e-201,2.3856858846918487e-201,2.3757455268389664e-201,2.3658051689860833e-201,2.3558648111332006e-201,2.3459244532803183e-201,2.3359840954274353e-201,2.3260437375745526e-201,2.3161033797216703e-201,2.3061630218687872e-201,2.2962226640159045e-201,2.286282306163022e-201,2.276341948310139e-201,2.2664015904572565e-201,2.2564612326043738e-201,2.246520874751491e-201,2.2365805168986084e-201,2.2266401590457254e-201,2.216699801192843e-201,2.20675944333996e-201,2.1968190854870773e-201,2.186878727634195e-201,2.176938369781312e-201,2.1669980119284292e-201,2.157057654075547e-201,2.147117296222664e-201,2.137176938369781e-201,2.1272365805168985e-201,2.1172962226640158e-201,2.107355864811133e-201,2.0974155069582504e-201,2.0874751491053677e-201,2.077534791252485e-201,2.0675944333996024e-201,2.0576540755467197e-201,2.0477137176938366e-201,2.0377733598409543e-201,2.0278330019880716e-201,2.0178926441351886e-201,2.0079522862823063e-201,1.9980119284294236e-201,1.9880715705765405e-201,1.9781312127236582e-201,1.968190854870775e-201,1.9582504970178925e-201,1.94831013916501e-201,1.938369781312127e-201,1.9284294234592444e-201,1.918489065606362e-201,1.908548707753479e-201,1.8986083499005963e-201,1.8886679920477137e-201,1.878727634194831e-201,1.8687872763419483e-201,1.8588469184890656e-201,1.848906560636183e-201,1.8389662027833002e-201,1.8290258449304175e-201,1.819085487077535e-201,1.8091451292246518e-201,1.7992047713717695e-201,1.7892644135188868e-201,1.7793240556660037e-201,1.7693836978131214e-201,1.7594433399602387e-201,1.7495029821073557e-201,1.7395626242544734e-201,1.7296222664015903e-201,1.7196819085487076e-201,1.7097415506958253e-201,1.6998011928429423e-201,1.6898608349900596e-201,1.6799204771371772e-201,1.6699801192842942e-201,1.6600397614314115e-201,1.650099403578529e-201,1.640159045725646e-201,1.6302186878727633e-201,1.6202783300198808e-201,1.610337972166998e-201,1.6003976143141152e-201,1.5904572564612325e-201,1.58051689860835e-201,1.5705765407554672e-201,1.5606361829025845e-201,1.5506958250497018e-201,1.5407554671968191e-201,1.5308151093439364e-201,1.5208747514910537e-201,1.5109343936381709e-201,1.5009940357852884e-201,1.4910536779324057e-201,1.4811133200795228e-201,1.4711729622266401e-201,1.4612326043737576e-201,1.4512922465208747e-201,1.441351888667992e-201,1.4314115308151094e-201,1.4214711729622265e-201,1.411530815109344e-201,1.4015904572564611e-201,1.3916500994035784e-201,1.3817097415506958e-201,1.371769383697813e-201,1.3618290258449304e-201,1.3518886679920477e-201,1.3419483101391648e-201,1.3320079522862823e-201,1.3220675944333996e-201,1.3121272365805168e-201,1.302186878727634e-201,1.2922465208747516e-201,1.2823061630218687e-201,1.272365805168986e-201,1.2624254473161033e-201,1.2524850894632206e-201,1.242544731610338e-201,1.2326043737574553e-201,1.2226640159045724e-201,1.2127236580516899e-201,1.2027833001988072e-201,1.1928429423459244e-201,1.1829025844930417e-201,1.1729622266401592e-201,1.1630218687872763e-201,1.1530815109343936e-201,1.143141153081511e-201,1.1332007952286282e-201,1.1232604373757455e-201,1.1133200795228627e-201,1.10337972166998e-201,1.0934393638170975e-201,1.0834990059642146e-201,1.073558648111332e-201,1.0636182902584492e-201,1.0536779324055666e-201,1.0437375745526839e-201,1.0337972166998012e-201,1.0238568588469183e-201,1.0139165009940358e-201,1.0039761431411531e-201,9.940357852882703e-202,9.840954274353876e-202,9.74155069582505e-202,9.642147117296222e-202,9.542743538767395e-202,9.443339960238568e-202,9.343936381709741e-202,9.244532803180915e-202,9.145129224652088e-202,9.045725646123259e-202,8.946322067594434e-202,8.846918489065607e-202,8.747514910536778e-202,8.648111332007952e-202,8.548707753479127e-202,8.449304174950298e-202,8.349900596421471e-202,8.250497017892644e-202,8.151093439363816e-202,8.05168986083499e-202,7.952286282306163e-202,7.852882703777336e-202,7.753479125248509e-202,7.654075546719682e-202,7.554671968190854e-202,7.455268389662028e-202,7.355864811133201e-202,7.256461232604374e-202,7.157057654075547e-202,7.05765407554672e-202,6.958250497017892e-202,6.858846918489065e-202,6.7594433399602385e-202,6.660039761431412e-202,6.560636182902584e-202,6.461232604373758e-202,6.36182902584493e-202,6.262425447316103e-202,6.163021868787276e-202,6.0636182902584495e-202,5.964214711729622e-202,5.864811133200796e-202,5.765407554671968e-202,5.666003976143141e-202,5.566600397614313e-202,5.467196819085487e-202,5.36779324055666e-202,5.268389662027833e-202,5.168986083499006e-202,5.069582504970179e-202,4.970178926441351e-202,4.870775347912525e-202,4.771371769383698e-202,4.671968190854871e-202,4.572564612326044e-202,4.473161033797217e-202,4.373757455268389e-202,4.274353876739563e-202,4.1749502982107355e-202,4.075546719681908e-202,3.9761431411530813e-202,3.8767395626242545e-202,3.777335984095427e-202,3.6779324055666003e-202,3.5785288270377734e-202,3.479125248508946e-202,3.3797216699801192e-202,3.280318091451292e-202,3.180914512922465e-202,3.081510934393638e-202,2.982107355864811e-202,2.882703777335984e-202,2.7833001988071567e-202,2.68389662027833e-202,2.584493041749503e-202,2.4850894632206757e-202,2.385685884691849e-202,2.286282306163022e-202,2.1868787276341946e-202,2.0874751491053677e-202,1.9880715705765407e-202,1.8886679920477136e-202,1.7892644135188867e-202,1.6898608349900596e-202,1.5904572564612325e-202,1.4910536779324054e-202,1.3916500994035783e-202,1.2922465208747515e-202,1.1928429423459244e-202,1.0934393638170973e-202,9.940357852882703e-203,8.946322067594434e-203,7.952286282306163e-203,6.958250497017892e-203,5.964214711729622e-203,4.9701789264413516e-203,3.9761431411530813e-203,2.982107355864811e-203,1.9880715705765407e-203,9.940357852882703e-204,1.0e-308]}
},{}],72:[function(require,module,exports){
module.exports={"expected":[[0.5752618031559393,-1029],[0.5746899723376941,-1029],[0.574118141519449,-1029],[0.5735463107012038,-1029],[0.5729744798829586,-1029],[0.5724026490647134,-1029],[0.5718308182464682,-1029],[0.571258987428223,-1029],[0.5706871566099778,-1029],[0.5701153257917326,-1029],[0.5695434949734874,-1029],[0.5689716641552423,-1029],[0.5683998333369686,-1029],[0.5678280025187235,-1029],[0.5672561717004783,-1029],[0.5666843408822331,-1029],[0.5661125100639879,-1029],[0.5655406792457427,-1029],[0.5649688484274975,-1029],[0.5643970176092523,-1029],[0.5638251867910071,-1029],[0.5632533559727619,-1029],[0.5626815251545167,-1029],[0.5621096943362716,-1029],[0.5615378635180264,-1029],[0.5609660326997812,-1029],[0.560394201881536,-1029],[0.5598223710632908,-1029],[0.5592505402450456,-1029],[0.5586787094268004,-1029],[0.5581068786085552,-1029],[0.55753504779031,-1029],[0.5569632169720649,-1029],[0.5563913861538197,-1029],[0.5558195553355745,-1029],[0.5552477245173009,-1029],[0.5546758936990557,-1029],[0.5541040628808105,-1029],[0.5535322320625653,-1029],[0.5529604012443201,-1029],[0.5523885704260749,-1029],[0.5518167396078297,-1029],[0.5512449087895845,-1029],[0.5506730779713394,-1029],[0.5501012471530942,-1029],[0.549529416334849,-1029],[0.5489575855166038,-1029],[0.5483857546983586,-1029],[0.5478139238801134,-1029],[0.5472420930618682,-1029],[0.546670262243623,-1029],[0.5460984314253778,-1029],[0.5455266006071327,-1029],[0.5449547697888875,-1029],[0.5443829389706423,-1029],[0.5438111081523971,-1029],[0.5432392773341519,-1029],[0.5426674465159067,-1029],[0.5420956156976331,-1029],[0.5415237848793879,-1029],[0.5409519540611427,-1029],[0.5403801232428975,-1029],[0.5398082924246523,-1029],[0.5392364616064071,-1029],[0.538664630788162,-1029],[0.5380927999699168,-1029],[0.5375209691516716,-1029],[0.5369491383334264,-1029],[0.5363773075151812,-1029],[0.535805476696936,-1029],[0.5352336458786908,-1029],[0.5346618150604456,-1029],[0.5340899842422004,-1029],[0.5335181534239553,-1029],[0.5329463226057101,-1029],[0.5323744917874649,-1029],[0.5318026609692197,-1029],[0.5312308301509745,-1029],[0.5306589993327293,-1029],[0.5300871685144841,-1029],[0.5295153376962105,-1029],[0.5289435068779653,-1029],[0.5283716760597201,-1029],[0.5277998452414749,-1029],[0.5272280144232298,-1029],[0.5266561836049846,-1029],[0.5260843527867394,-1029],[0.5255125219684942,-1029],[0.524940691150249,-1029],[0.5243688603320038,-1029],[0.5237970295137586,-1029],[0.5232251986955134,-1029],[0.5226533678772682,-1029],[0.522081537059023,-1029],[0.5215097062407779,-1029],[0.5209378754225327,-1029],[0.5203660446042875,-1029],[0.5197942137860423,-1029],[0.5192223829677971,-1029],[0.5186505521495519,-1029],[0.5180787213313067,-1029],[0.5175068905130615,-1029],[0.5169350596948163,-1029],[0.5163632288765427,-1029],[0.5157913980582975,-1029],[0.5152195672400524,-1029],[0.5146477364218072,-1029],[0.514075905603562,-1029],[0.5135040747853168,-1029],[0.5129322439670716,-1029],[0.5123604131488264,-1029],[0.5117885823305812,-1029],[0.511216751512336,-1029],[0.5106449206940908,-1029],[0.5100730898758457,-1029],[0.5095012590576005,-1029],[0.5089294282393553,-1029],[0.5083575974211101,-1029],[0.5077857666028649,-1029],[0.5072139357846197,-1029],[0.5066421049663745,-1029],[0.5060702741481293,-1029],[0.5054984433298841,-1029],[0.504926612511639,-1029],[0.5043547816933938,-1029],[0.5037829508751486,-1029],[0.503211120056875,-1029],[0.5026392892386298,-1029],[0.5020674584203846,-1029],[0.5014956276021394,-1029],[0.5009237967838942,-1029],[0.500351965965649,-1029],[0.9995602702948077,-1030],[0.9984166086583173,-1030],[0.9972729470218269,-1030],[0.9961292853853365,-1030],[0.9949856237488461,-1030],[0.9938419621123558,-1030],[0.9926983004758654,-1030],[0.991554638839375,-1030],[0.9904109772028846,-1030],[0.9892673155663942,-1030],[0.9881236539299039,-1030],[0.9869799922934135,-1030],[0.9858363306569231,-1030],[0.9846926690204327,-1030],[0.9835490073839424,-1030],[0.982405345747452,-1030],[0.9812616841109616,-1030],[0.9801180224744144,-1030],[0.978974360837924,-1030],[0.9778306992014336,-1030],[0.9766870375649432,-1030],[0.9755433759284529,-1030],[0.9743997142919625,-1030],[0.9732560526554721,-1030],[0.9721123910189817,-1030],[0.9709687293824913,-1030],[0.969825067746001,-1030],[0.9686814061095106,-1030],[0.9675377444730202,-1030],[0.9663940828365298,-1030],[0.9652504212000395,-1030],[0.9641067595635491,-1030],[0.9629630979270587,-1030],[0.9618194362905683,-1030],[0.9606757746540779,-1030],[0.9595321130175876,-1030],[0.9583884513810972,-1030],[0.9572447897446068,-1030],[0.9561011281081164,-1030],[0.954957466471626,-1030],[0.9538138048350788,-1030],[0.9526701431985884,-1030],[0.9515264815620981,-1030],[0.9503828199256077,-1030],[0.9492391582891173,-1030],[0.9480954966526269,-1030],[0.9469518350161366,-1030],[0.9458081733796462,-1030],[0.9446645117431558,-1030],[0.9435208501066654,-1030],[0.942377188470175,-1030],[0.9412335268336847,-1030],[0.9400898651971943,-1030],[0.9389462035607039,-1030],[0.9378025419242135,-1030],[0.9366588802877232,-1030],[0.9355152186512328,-1030],[0.9343715570147424,-1030],[0.933227895378252,-1030],[0.9320842337417616,-1030],[0.9309405721052713,-1030],[0.9297969104687809,-1030],[0.9286532488322905,-1030],[0.9275095871957433,-1030],[0.9263659255592529,-1030],[0.9252222639227625,-1030],[0.9240786022862721,-1030],[0.9229349406497818,-1030],[0.9217912790132914,-1030],[0.920647617376801,-1030],[0.9195039557403106,-1030],[0.9183602941038203,-1030],[0.9172166324673299,-1030],[0.9160729708308395,-1030],[0.9149293091943491,-1030],[0.9137856475578587,-1030],[0.9126419859213684,-1030],[0.911498324284878,-1030],[0.9103546626483876,-1030],[0.9092110010118972,-1030],[0.9080673393754068,-1030],[0.9069236777389165,-1030],[0.9057800161024261,-1030],[0.9046363544659357,-1030],[0.9034926928294453,-1030],[0.902349031192955,-1030],[0.9012053695564077,-1030],[0.9000617079199174,-1030],[0.898918046283427,-1030],[0.8977743846469366,-1030],[0.8966307230104462,-1030],[0.8954870613739558,-1030],[0.8943433997374655,-1030],[0.8931997381009751,-1030],[0.8920560764644847,-1030],[0.8909124148279943,-1030],[0.889768753191504,-1030],[0.8886250915550136,-1030],[0.8874814299185232,-1030],[0.8863377682820328,-1030],[0.8851941066455424,-1030],[0.884050445009052,-1030],[0.8829067833725617,-1030],[0.8817631217360713,-1030],[0.8806194600995809,-1030],[0.8794757984630905,-1030],[0.8783321368266002,-1030],[0.8771884751901098,-1030],[0.8760448135536194,-1030],[0.8749011519170722,-1030],[0.8737574902805818,-1030],[0.8726138286440914,-1030],[0.871470167007601,-1030],[0.8703265053711107,-1030],[0.8691828437346203,-1030],[0.8680391820981299,-1030],[0.8668955204616395,-1030],[0.8657518588251492,-1030],[0.8646081971886588,-1030],[0.8634645355521684,-1030],[0.862320873915678,-1030],[0.8611772122791876,-1030],[0.8600335506426973,-1030],[0.8588898890062069,-1030],[0.8577462273697165,-1030],[0.8566025657332261,-1030],[0.8554589040967358,-1030],[0.8543152424602454,-1030],[0.853171580823755,-1030],[0.8520279191872646,-1030],[0.8508842575507742,-1030],[0.849740595914227,-1030],[0.8485969342777366,-1030],[0.8474532726412463,-1030],[0.8463096110047559,-1030],[0.8451659493682655,-1030],[0.8440222877317751,-1030],[0.8428786260952847,-1030],[0.8417349644587944,-1030],[0.840591302822304,-1030],[0.8394476411858136,-1030],[0.8383039795493232,-1030],[0.8371603179128329,-1030],[0.8360166562763425,-1030],[0.8348729946398521,-1030],[0.8337293330033617,-1030],[0.8325856713668713,-1030],[0.831442009730381,-1030],[0.8302983480938906,-1030],[0.8291546864574002,-1030],[0.8280110248209098,-1030],[0.8268673631844194,-1030],[0.8257237015479291,-1030],[0.8245800399114387,-1030],[0.8234363782748915,-1030],[0.8222927166384011,-1030],[0.8211490550019107,-1030],[0.8200053933654203,-1030],[0.81886173172893,-1030],[0.8177180700924396,-1030],[0.8165744084559492,-1030],[0.8154307468194588,-1030],[0.8142870851829684,-1030],[0.8131434235464781,-1030],[0.8119997619099877,-1030],[0.8108561002734973,-1030],[0.8097124386370069,-1030],[0.8085687770005165,-1030],[0.8074251153640262,-1030],[0.8062814537275358,-1030],[0.8051377920910454,-1030],[0.803994130454555,-1030],[0.8028504688180647,-1030],[0.8017068071815743,-1030],[0.8005631455450839,-1030],[0.7994194839085935,-1030],[0.7982758222721031,-1030],[0.7971321606355559,-1030],[0.7959884989990655,-1030],[0.7948448373625752,-1030],[0.7937011757260848,-1030],[0.7925575140895944,-1030],[0.791413852453104,-1030],[0.7902701908166136,-1030],[0.7891265291801233,-1030],[0.7879828675436329,-1030],[0.7868392059071425,-1030],[0.7856955442706521,-1030],[0.7845518826341618,-1030],[0.7834082209976714,-1030],[0.782264559361181,-1030],[0.7811208977246906,-1030],[0.7799772360882002,-1030],[0.7788335744517099,-1030],[0.7776899128152195,-1030],[0.7765462511787291,-1030],[0.7754025895422387,-1030],[0.7742589279057484,-1030],[0.773115266269258,-1030],[0.7719716046327676,-1030],[0.7708279429962204,-1030],[0.76968428135973,-1030],[0.7685406197232396,-1030],[0.7673969580867492,-1030],[0.7662532964502589,-1030],[0.7651096348137685,-1030],[0.7639659731772781,-1030],[0.7628223115407877,-1030],[0.7616786499042973,-1030],[0.760534988267807,-1030],[0.7593913266313166,-1030],[0.7582476649948262,-1030],[0.7571040033583358,-1030],[0.7559603417218455,-1030],[0.7548166800853551,-1030],[0.7536730184488647,-1030],[0.7525293568123743,-1030],[0.7513856951758839,-1030],[0.7502420335393936,-1030],[0.7490983719029032,-1030],[0.7479547102664128,-1030],[0.7468110486299224,-1030],[0.745667386993432,-1030],[0.7445237253568848,-1030],[0.7433800637203944,-1030],[0.7422364020839041,-1030],[0.7410927404474137,-1030],[0.7399490788109233,-1030],[0.7388054171744329,-1030],[0.7376617555379426,-1030],[0.7365180939014522,-1030],[0.7353744322649618,-1030],[0.7342307706284714,-1030],[0.733087108991981,-1030],[0.7319434473554907,-1030],[0.7307997857190003,-1030],[0.7296561240825099,-1030],[0.7285124624460195,-1030],[0.7273688008095291,-1030],[0.7262251391730388,-1030],[0.7250814775365484,-1030],[0.723937815900058,-1030],[0.7227941542635676,-1030],[0.7216504926270773,-1030],[0.7205068309905869,-1030],[0.7193631693540965,-1030],[0.7182195077175493,-1030],[0.7170758460810589,-1030],[0.7159321844445685,-1030],[0.7147885228080781,-1030],[0.7136448611715878,-1030],[0.7125011995350974,-1030],[0.711357537898607,-1030],[0.7102138762621166,-1030],[0.7090702146256262,-1030],[0.7079265529891359,-1030],[0.7067828913526455,-1030],[0.7056392297161551,-1030],[0.7044955680796647,-1030],[0.7033519064431744,-1030],[0.702208244806684,-1030],[0.7010645831701936,-1030],[0.6999209215337032,-1030],[0.6987772598972128,-1030],[0.6976335982607225,-1030],[0.6964899366242321,-1030],[0.6953462749877417,-1030],[0.6942026133512513,-1030],[0.693058951714761,-1030],[0.6919152900782137,-1030],[0.6907716284417234,-1030],[0.689627966805233,-1030],[0.6884843051687426,-1030],[0.6873406435322522,-1030],[0.6861969818957618,-1030],[0.6850533202592715,-1030],[0.6839096586227811,-1030],[0.6827659969862907,-1030],[0.6816223353498003,-1030],[0.68047867371331,-1030],[0.6793350120768196,-1030],[0.6781913504403292,-1030],[0.6770476888038388,-1030],[0.6759040271673484,-1030],[0.674760365530858,-1030],[0.6736167038943677,-1030],[0.6724730422578773,-1030],[0.6713293806213869,-1030],[0.6701857189848965,-1030],[0.6690420573484062,-1030],[0.6678983957119158,-1030],[0.6667547340753686,-1030],[0.6656110724388782,-1030],[0.6644674108023878,-1030],[0.6633237491658974,-1030],[0.662180087529407,-1030],[0.6610364258929167,-1030],[0.6598927642564263,-1030],[0.6587491026199359,-1030],[0.6576054409834455,-1030],[0.6564617793469552,-1030],[0.6553181177104648,-1030],[0.6541744560739744,-1030],[0.653030794437484,-1030],[0.6518871328009936,-1030],[0.6507434711645033,-1030],[0.6495998095280129,-1030],[0.6484561478915225,-1030],[0.6473124862550321,-1030],[0.6461688246185417,-1030],[0.6450251629820514,-1030],[0.643881501345561,-1030],[0.6427378397090706,-1030],[0.6415941780725802,-1030],[0.640450516436033,-1030],[0.6393068547995426,-1030],[0.6381631931630523,-1030],[0.6370195315265619,-1030],[0.6358758698900715,-1030],[0.6347322082535811,-1030],[0.6335885466170907,-1030],[0.6324448849806004,-1030],[0.63130122334411,-1030],[0.6301575617076196,-1030],[0.6290139000711292,-1030],[0.6278702384346388,-1030],[0.6267265767981485,-1030],[0.6255829151616581,-1030],[0.6244392535251677,-1030],[0.6232955918886773,-1030],[0.622151930252187,-1030],[0.6210082686156966,-1030],[0.6198646069792062,-1030],[0.6187209453427158,-1030],[0.6175772837062254,-1030],[0.6164336220697351,-1030],[0.6152899604332447,-1030],[0.6141462987966975,-1030],[0.6130026371602071,-1030],[0.6118589755237167,-1030],[0.6107153138872263,-1030],[0.609571652250736,-1030],[0.6084279906142456,-1030],[0.6072843289777552,-1030],[0.6061406673412648,-1030],[0.6049970057047744,-1030],[0.6038533440682841,-1030],[0.6027096824317937,-1030],[0.6015660207953033,-1030],[0.6004223591588129,-1030],[0.5992786975223225,-1030],[0.5981350358858322,-1030],[0.5969913742493418,-1030],[0.5958477126128514,-1030],[0.594704050976361,-1030],[0.5935603893398707,-1030],[0.5924167277033803,-1030],[0.5912730660668899,-1030],[0.5901294044303995,-1030],[0.5889857427939091,-1030],[0.5878420811573619,-1030],[0.5866984195208715,-1030],[0.5855547578843812,-1030],[0.5844110962478908,-1030],[0.5832674346114004,-1030],[0.58212377297491,-1030],[0.5809801113384196,-1030],[0.5798364497019293,-1030],[0.5786927880654389,-1030],[0.5775491264289485,-1030],[0.5764054647924581,-1030],[0.5752618031559678,-1030],[0.5741181415194774,-1030],[0.572974479882987,-1030],[0.5718308182464966,-1030],[0.5706871566100062,-1030],[0.5695434949735159,-1030],[0.5683998333370255,-1030],[0.5672561717005351,-1030],[0.5661125100640447,-1030],[0.5649688484275543,-1030],[0.563825186791064,-1030],[0.5626815251545736,-1030],[0.5615378635180264,-1030],[0.560394201881536,-1030],[0.5592505402450456,-1030],[0.5581068786085552,-1030],[0.5569632169720649,-1030],[0.5558195553355745,-1030],[0.5546758936990841,-1030],[0.5535322320625937,-1030],[0.5523885704261033,-1030],[0.551244908789613,-1030],[0.5501012471531226,-1030],[0.5489575855166322,-1030],[0.5478139238801418,-1030],[0.5466702622436515,-1030],[0.5455266006071611,-1030],[0.5443829389706707,-1030],[0.5432392773341803,-1030],[0.5420956156976899,-1030],[0.5409519540611996,-1030],[0.5398082924247092,-1030],[0.5386646307882188,-1030],[0.5375209691517284,-1030],[0.536377307515238,-1030],[0.5352336458786908,-1030],[0.5340899842422004,-1030],[0.5329463226057101,-1030],[0.5318026609692197,-1030],[0.5306589993327293,-1030],[0.5295153376962389,-1030],[0.5283716760597486,-1030],[0.5272280144232582,-1030],[0.5260843527867678,-1030],[0.5249406911502774,-1030],[0.523797029513787,-1030],[0.5226533678772967,-1030],[0.5215097062408063,-1030],[0.5203660446043159,-1030],[0.5192223829678255,-1030],[0.5180787213313351,-1030],[0.5169350596948448,-1030],[0.5157913980583544,-1030],[0.514647736421864,-1030],[0.5135040747853736,-1030],[0.5123604131488833,-1030],[0.5112167515123929,-1030],[0.5100730898759025,-1030],[0.5089294282393553,-1030],[0.5077857666028649,-1030],[0.5066421049663745,-1030],[0.5054984433298841,-1030],[0.5043547816933938,-1030],[0.5032111200569034,-1030],[0.502067458420413,-1030],[0.5009237967839226,-1030],[0.9995602702948645,-1031],[0.9972729470218837,-1031],[0.994985623748903,-1031],[0.9926983004759222,-1031],[0.9904109772029415,-1031],[0.9881236539299607,-1031],[0.98583633065698,-1031],[0.9835490073839992,-1031],[0.9812616841110184,-1031],[0.9789743608380377,-1031],[0.9766870375650569,-1031],[0.9743997142920762,-1031],[0.9721123910190954,-1031],[0.9698250677461147,-1031],[0.9675377444731339,-1031],[0.9652504212000395,-1031],[0.9629630979270587,-1031],[0.9606757746540779,-1031],[0.9583884513810972,-1031],[0.9561011281081164,-1031],[0.9538138048351357,-1031],[0.9515264815621549,-1031],[0.9492391582891742,-1031],[0.9469518350161934,-1031],[0.9446645117432126,-1031],[0.9423771884702319,-1031],[0.9400898651972511,-1031],[0.9378025419242704,-1031],[0.9355152186512896,-1031],[0.9332278953783089,-1031],[0.9309405721053281,-1031],[0.9286532488323473,-1031],[0.9263659255593666,-1031],[0.9240786022863858,-1031],[0.9217912790134051,-1031],[0.9195039557404243,-1031],[0.9172166324674436,-1031],[0.9149293091943491,-1031],[0.9126419859213684,-1031],[0.9103546626483876,-1031],[0.9080673393754068,-1031],[0.9057800161024261,-1031],[0.9034926928294453,-1031],[0.9012053695564646,-1031],[0.8989180462834838,-1031],[0.8966307230105031,-1031],[0.8943433997375223,-1031],[0.8920560764645415,-1031],[0.8897687531915608,-1031],[0.88748142991858,-1031],[0.8851941066455993,-1031],[0.8829067833726185,-1031],[0.8806194600996378,-1031],[0.878332136826657,-1031],[0.8760448135536762,-1031],[0.8737574902806955,-1031],[0.8714701670077147,-1031],[0.869182843734734,-1031],[0.8668955204617532,-1031],[0.8646081971887725,-1031],[0.862320873915678,-1031],[0.8600335506426973,-1031],[0.8577462273697165,-1031],[0.8554589040967358,-1031],[0.853171580823755,-1031],[0.8508842575507742,-1031],[0.8485969342777935,-1031],[0.8463096110048127,-1031],[0.844022287731832,-1031],[0.8417349644588512,-1031],[0.8394476411858705,-1031],[0.8371603179128897,-1031],[0.8348729946399089,-1031],[0.8325856713669282,-1031],[0.8302983480939474,-1031],[0.8280110248209667,-1031],[0.8257237015479859,-1031],[0.8234363782750052,-1031],[0.8211490550020244,-1031],[0.8188617317290436,-1031],[0.8165744084560629,-1031],[0.8142870851830821,-1031],[0.8119997619101014,-1031],[0.8097124386370069,-1031],[0.8074251153640262,-1031],[0.8051377920910454,-1031],[0.8028504688180647,-1031],[0.8005631455450839,-1031],[0.7982758222721031,-1031],[0.7959884989991224,-1031],[0.7937011757261416,-1031],[0.7914138524531609,-1031],[0.7891265291801801,-1031],[0.7868392059071994,-1031],[0.7845518826342186,-1031],[0.7822645593612378,-1031],[0.7799772360882571,-1031],[0.7776899128152763,-1031],[0.7754025895422956,-1031],[0.7731152662693148,-1031],[0.7708279429963341,-1031],[0.7685406197233533,-1031],[0.7662532964503725,-1031],[0.7639659731773918,-1031],[0.761678649904411,-1031],[0.7593913266314303,-1031],[0.7571040033583358,-1031],[0.7548166800853551,-1031],[0.7525293568123743,-1031],[0.7502420335393936,-1031],[0.7479547102664128,-1031],[0.745667386993432,-1031],[0.7433800637204513,-1031],[0.7410927404474705,-1031],[0.7388054171744898,-1031],[0.736518093901509,-1031],[0.7342307706285283,-1031],[0.7319434473555475,-1031],[0.7296561240825667,-1031],[0.727368800809586,-1031],[0.7250814775366052,-1031],[0.7227941542636245,-1031],[0.7205068309906437,-1031],[0.718219507717663,-1031],[0.7159321844446822,-1031],[0.7136448611717015,-1031],[0.7113575378987207,-1031],[0.7090702146257399,-1031],[0.7067828913527592,-1031],[0.7044955680796647,-1031],[0.702208244806684,-1031],[0.6999209215337032,-1031],[0.6976335982607225,-1031],[0.6953462749877417,-1031],[0.693058951714761,-1031],[0.6907716284417802,-1031],[0.6884843051687994,-1031],[0.6861969818958187,-1031],[0.6839096586228379,-1031],[0.6816223353498572,-1031],[0.6793350120768764,-1031],[0.6770476888038957,-1031],[0.6747603655309149,-1031],[0.6724730422579341,-1031],[0.6701857189849534,-1031],[0.6678983957119726,-1031],[0.6656110724389919,-1031],[0.6633237491660111,-1031],[0.6610364258930304,-1031],[0.6587491026200496,-1031],[0.6564617793470688,-1031],[0.6541744560740881,-1031],[0.6518871328009936,-1031],[0.6495998095280129,-1031],[0.6473124862550321,-1031],[0.6450251629820514,-1031],[0.6427378397090706,-1031],[0.6404505164360899,-1031],[0.6381631931631091,-1031],[0.6358758698901283,-1031],[0.6335885466171476,-1031],[0.6313012233441668,-1031],[0.6290139000711861,-1031],[0.6267265767982053,-1031],[0.6244392535252246,-1031],[0.6221519302522438,-1031],[0.619864606979263,-1031],[0.6175772837062823,-1031],[0.6152899604333015,-1031],[0.6130026371603208,-1031],[0.61071531388734,-1031],[0.6084279906143593,-1031],[0.6061406673413785,-1031],[0.6038533440683977,-1031],[0.601566020795417,-1031],[0.5992786975223225,-1031],[0.5969913742493418,-1031],[0.594704050976361,-1031],[0.5924167277033803,-1031],[0.5901294044303995,-1031],[0.5878420811574188,-1031],[0.585554757884438,-1031],[0.5832674346114572,-1031],[0.5809801113384765,-1031],[0.5786927880654957,-1031],[0.576405464792515,-1031],[0.5741181415195342,-1031],[0.5718308182465535,-1031],[0.5695434949735727,-1031],[0.567256171700592,-1031],[0.5649688484276112,-1031],[0.5626815251546304,-1031],[0.5603942018816497,-1031],[0.5581068786086689,-1031],[0.5558195553356882,-1031],[0.5535322320627074,-1031],[0.5512449087897267,-1031],[0.5489575855166322,-1031],[0.5466702622436515,-1031],[0.5443829389706707,-1031],[0.5420956156976899,-1031],[0.5398082924247092,-1031],[0.5375209691517284,-1031],[0.5352336458787477,-1031],[0.5329463226057669,-1031],[0.5306589993327862,-1031],[0.5283716760598054,-1031],[0.5260843527868246,-1031],[0.5237970295138439,-1031],[0.5215097062408631,-1031],[0.5192223829678824,-1031],[0.5169350596949016,-1031],[0.5146477364219209,-1031],[0.5123604131489401,-1031],[0.5100730898759593,-1031],[0.5077857666029786,-1031],[0.5054984433299978,-1031],[0.5032111200570171,-1031],[0.5009237967840363,-1031],[0.9972729470221111,-1032],[0.9926983004759222,-1032],[0.9881236539299607,-1032],[0.9835490073839992,-1032],[0.9789743608380377,-1032],[0.9743997142920762,-1032],[0.9698250677461147,-1032],[0.9652504212001531,-1032],[0.9606757746541916,-1032],[0.9561011281082301,-1032],[0.9515264815622686,-1032],[0.9469518350163071,-1032],[0.9423771884703456,-1032],[0.9378025419243841,-1032],[0.9332278953784225,-1032],[0.928653248832461,-1032],[0.9240786022864995,-1032],[0.919503955740538,-1032],[0.9149293091945765,-1032],[0.910354662648615,-1032],[0.9057800161026535,-1032],[0.901205369556692,-1032],[0.8966307230107304,-1032],[0.8920560764647689,-1032],[0.88748142991858,-1032],[0.8829067833726185,-1032],[0.878332136826657,-1032],[0.8737574902806955,-1032],[0.869182843734734,-1032],[0.8646081971887725,-1032],[0.860033550642811,-1032],[0.8554589040968494,-1032],[0.8508842575508879,-1032],[0.8463096110049264,-1032],[0.8417349644589649,-1032],[0.8371603179130034,-1032],[0.8325856713670419,-1032],[0.8280110248210804,-1032],[0.8234363782751188,-1032],[0.8188617317291573,-1032],[0.8142870851831958,-1032],[0.8097124386372343,-1032],[0.8051377920912728,-1032],[0.8005631455453113,-1032],[0.7959884989993498,-1032],[0.7914138524533882,-1032],[0.7868392059074267,-1032],[0.7822645593612378,-1032],[0.7776899128152763,-1032],[0.7731152662693148,-1032],[0.7685406197233533,-1032],[0.7639659731773918,-1032],[0.7593913266314303,-1032],[0.7548166800854688,-1032],[0.7502420335395072,-1032],[0.7456673869935457,-1032],[0.7410927404475842,-1032],[0.7365180939016227,-1032],[0.7319434473556612,-1032],[0.7273688008096997,-1032],[0.7227941542637382,-1032],[0.7182195077177767,-1032],[0.7136448611718151,-1032],[0.7090702146258536,-1032],[0.7044955680798921,-1032],[0.6999209215339306,-1032],[0.6953462749879691,-1032],[0.6907716284420076,-1032],[0.686196981896046,-1032],[0.6816223353500845,-1032],[0.6770476888038957,-1032],[0.6724730422579341,-1032],[0.6678983957119726,-1032],[0.6633237491660111,-1032],[0.6587491026200496,-1032],[0.6541744560740881,-1032],[0.6495998095281266,-1032],[0.6450251629821651,-1032],[0.6404505164362035,-1032],[0.635875869890242,-1032],[0.6313012233442805,-1032],[0.626726576798319,-1032],[0.6221519302523575,-1032],[0.617577283706396,-1032],[0.6130026371604345,-1032],[0.608427990614473,-1032],[0.6038533440685114,-1032],[0.5992786975225499,-1032],[0.5947040509765884,-1032],[0.5901294044306269,-1032],[0.5855547578846654,-1032],[0.5809801113387039,-1032],[0.5764054647927424,-1032],[0.5718308182465535,-1032],[0.567256171700592,-1032],[0.5626815251546304,-1032],[0.5581068786086689,-1032],[0.5535322320627074,-1032],[0.5489575855167459,-1032],[0.5443829389707844,-1032],[0.5398082924248229,-1032],[0.5352336458788614,-1032],[0.5306589993328998,-1032],[0.5260843527869383,-1032],[0.5215097062409768,-1032],[0.5169350596950153,-1032],[0.5123604131490538,-1032],[0.5077857666030923,-1032],[0.5032111200571308,-1032],[0.9972729470223385,-1033],[0.9881236539304155,-1033],[0.9789743608384924,-1033],[0.9698250677465694,-1033],[0.9606757746546464,-1033],[0.9515264815627233,-1033],[0.9423771884708003,-1033],[0.9332278953784225,-1033],[0.9240786022864995,-1033],[0.9149293091945765,-1033],[0.9057800161026535,-1033],[0.8966307230107304,-1033],[0.8874814299188074,-1033],[0.8783321368268844,-1033],[0.8691828437349614,-1033],[0.8600335506430383,-1033],[0.8508842575511153,-1033],[0.8417349644591923,-1033],[0.8325856713672692,-1033],[0.8234363782753462,-1033],[0.8142870851834232,-1033],[0.8051377920915002,-1033],[0.7959884989995771,-1033],[0.7868392059076541,-1033],[0.7776899128157311,-1033],[0.768540619723808,-1033],[0.759391326631885,-1033],[0.750242033539962,-1033],[0.741092740448039,-1033],[0.7319434473556612,-1033],[0.7227941542637382,-1033],[0.7136448611718151,-1033],[0.7044955680798921,-1033],[0.6953462749879691,-1033],[0.686196981896046,-1033],[0.677047688804123,-1033],[0.6678983957122,-1033],[0.658749102620277,-1033],[0.6495998095283539,-1033],[0.6404505164364309,-1033],[0.6313012233445079,-1033],[0.6221519302525849,-1033],[0.6130026371606618,-1033],[0.6038533440687388,-1033],[0.5947040509768158,-1033],[0.5855547578848928,-1033],[0.5764054647929697,-1033],[0.5672561717010467,-1033],[0.5581068786091237,-1033],[0.5489575855172006,-1033],[0.5398082924252776,-1033],[0.5306589993333546,-1033],[0.5215097062409768,-1033],[0.5123604131490538,-1033],[0.5032111200571308,-1033],[0.9881236539304155,-1034],[0.9698250677465694,-1034],[0.9515264815627233,-1034],[0.9332278953788773,-1034],[0.9149293091950312,-1034],[0.8966307230111852,-1034],[0.8783321368273391,-1034],[0.8600335506434931,-1034],[0.841734964459647,-1034],[0.823436378275801,-1034],[0.8051377920919549,-1034],[0.7868392059081089,-1034],[0.7685406197242628,-1034],[0.7502420335404167,-1034],[0.7319434473565707,-1034],[0.7136448611727246,-1034],[0.6953462749888786,-1034],[0.6770476888050325,-1034],[0.6587491026211865,-1034],[0.6404505164373404,-1034],[0.6221519302525849,-1034],[0.6038533440687388,-1034],[0.5855547578848928,-1034],[0.5672561717010467,-1034],[0.5489575855172006,-1034],[0.5306589993333546,-1034],[0.5123604131495085,-1034],[0.988123653931325,-1035],[0.9515264815636328,-1035],[0.9149293091959407,-1035],[0.8783321368282486,-1035],[0.8417349644605565,-1035],[0.8051377920928644,-1035],[0.7685406197251723,-1035],[0.7319434473574802,-1035],[0.6953462749897881,-1035],[0.658749102622096,-1035],[0.6221519302544039,-1035],[0.5855547578867117,-1035],[0.5489575855190196,-1035],[0.5123604131513275,-1035],[0.9515264815672708,-1036],[0.8783321368318866,-1036],[0.8051377920928644,-1036],[0.7319434473574802,-1036],[0.658749102622096,-1036],[0.5855547578867117,-1036],[0.5123604131513275,-1036],[0.8783321368318866,-1037],[0.7319434473611182,-1037],[0.5855547578903497,-1037],[0.8783321368391626,-1038],[0.5855547578976257,-1038],[0.5855547579121776,-1039],[0.5,-1073]],"x":[1.0e-310,9.990059642147e-311,9.9801192842942e-311,9.9701789264414e-311,9.9602385685885e-311,9.9502982107357e-311,9.940357852883e-311,9.93041749503e-311,9.920477137177e-311,9.910536779324e-311,9.9005964214714e-311,9.8906560636185e-311,9.880715705765e-311,9.8707753479123e-311,9.8608349900594e-311,9.8508946322066e-311,9.8409542743537e-311,9.831013916501e-311,9.821073558648e-311,9.811133200795e-311,9.8011928429423e-311,9.7912524850894e-311,9.7813121272365e-311,9.7713717693837e-311,9.761431411531e-311,9.751491053678e-311,9.741550695825e-311,9.731610337972e-311,9.7216699801194e-311,9.7117296222665e-311,9.7017892644137e-311,9.691848906561e-311,9.681908548708e-311,9.671968190855e-311,9.662027833002e-311,9.652087475149e-311,9.642147117296e-311,9.632206759443e-311,9.6222664015903e-311,9.6123260437374e-311,9.6023856858846e-311,9.5924453280317e-311,9.582504970179e-311,9.572564612326e-311,9.562624254473e-311,9.5526838966203e-311,9.5427435387674e-311,9.5328031809145e-311,9.5228628230617e-311,9.512922465209e-311,9.502982107356e-311,9.493041749503e-311,9.48310139165e-311,9.4731610337974e-311,9.4632206759445e-311,9.4532803180916e-311,9.443339960239e-311,9.433399602386e-311,9.4234592445326e-311,9.4135188866797e-311,9.403578528827e-311,9.393638170974e-311,9.383697813121e-311,9.3737574552683e-311,9.3638170974154e-311,9.3538767395626e-311,9.3439363817097e-311,9.333996023857e-311,9.324055666004e-311,9.314115308151e-311,9.3041749502982e-311,9.2942345924454e-311,9.2842942345925e-311,9.2743538767397e-311,9.264413518887e-311,9.254473161034e-311,9.244532803181e-311,9.234592445328e-311,9.2246520874754e-311,9.2147117296225e-311,9.204771371769e-311,9.1948310139163e-311,9.1848906560634e-311,9.1749502982106e-311,9.1650099403577e-311,9.155069582505e-311,9.145129224652e-311,9.135188866799e-311,9.1252485089463e-311,9.1153081510934e-311,9.1053677932405e-311,9.0954274353877e-311,9.085487077535e-311,9.075546719682e-311,9.065606361829e-311,9.055666003976e-311,9.0457256461234e-311,9.0357852882705e-311,9.0258449304177e-311,9.015904572565e-311,9.005964214712e-311,8.996023856859e-311,8.986083499006e-311,8.976143141153e-311,8.9662027833e-311,8.956262425447e-311,8.9463220675943e-311,8.9363817097414e-311,8.9264413518886e-311,8.9165009940357e-311,8.906560636183e-311,8.89662027833e-311,8.886679920477e-311,8.8767395626243e-311,8.8667992047714e-311,8.8568588469185e-311,8.8469184890657e-311,8.836978131213e-311,8.82703777336e-311,8.817097415507e-311,8.807157057654e-311,8.7972166998014e-311,8.7872763419485e-311,8.7773359840956e-311,8.767395626243e-311,8.75745526839e-311,8.7475149105366e-311,8.7375745526837e-311,8.727634194831e-311,8.717693836978e-311,8.707753479125e-311,8.6978131212723e-311,8.6878727634194e-311,8.6779324055665e-311,8.6679920477137e-311,8.658051689861e-311,8.648111332008e-311,8.638170974155e-311,8.628230616302e-311,8.6182902584494e-311,8.6083499005965e-311,8.5984095427437e-311,8.588469184891e-311,8.578528827038e-311,8.568588469185e-311,8.558648111332e-311,8.5487077534794e-311,8.5387673956265e-311,8.5288270377736e-311,8.5188866799203e-311,8.5089463220674e-311,8.4990059642146e-311,8.4890656063617e-311,8.479125248509e-311,8.469184890656e-311,8.459244532803e-311,8.4493041749503e-311,8.4393638170974e-311,8.4294234592445e-311,8.4194831013917e-311,8.409542743539e-311,8.399602385686e-311,8.389662027833e-311,8.37972166998e-311,8.3697813121274e-311,8.3598409542745e-311,8.3499005964217e-311,8.339960238569e-311,8.330019880716e-311,8.320079522863e-311,8.31013916501e-311,8.3001988071574e-311,8.290258449304e-311,8.280318091451e-311,8.2703777335983e-311,8.2604373757454e-311,8.2504970178926e-311,8.2405566600397e-311,8.230616302187e-311,8.220675944334e-311,8.210735586481e-311,8.2007952286283e-311,8.1908548707754e-311,8.1809145129225e-311,8.1709741550697e-311,8.161033797217e-311,8.151093439364e-311,8.141153081511e-311,8.131212723658e-311,8.1212723658054e-311,8.1113320079525e-311,8.1013916500996e-311,8.091451292247e-311,8.081510934394e-311,8.071570576541e-311,8.0616302186877e-311,8.051689860835e-311,8.041749502982e-311,8.031809145129e-311,8.0218687872763e-311,8.0119284294234e-311,8.0019880715705e-311,7.9920477137177e-311,7.982107355865e-311,7.972166998012e-311,7.962226640159e-311,7.952286282306e-311,7.9423459244534e-311,7.9324055666005e-311,7.9224652087477e-311,7.912524850895e-311,7.902584493042e-311,7.892644135189e-311,7.882703777336e-311,7.8727634194834e-311,7.8628230616305e-311,7.8528827037776e-311,7.842942345925e-311,7.8330019880714e-311,7.8230616302186e-311,7.8131212723657e-311,7.803180914513e-311,7.79324055666e-311,7.783300198807e-311,7.7733598409543e-311,7.7634194831014e-311,7.7534791252485e-311,7.7435387673957e-311,7.733598409543e-311,7.72365805169e-311,7.713717693837e-311,7.703777335984e-311,7.6938369781314e-311,7.6838966202785e-311,7.6739562624257e-311,7.664015904573e-311,7.65407554672e-311,7.644135188867e-311,7.634194831014e-311,7.6242544731614e-311,7.6143141153085e-311,7.604373757455e-311,7.5944333996023e-311,7.5844930417494e-311,7.5745526838966e-311,7.5646123260437e-311,7.554671968191e-311,7.544731610338e-311,7.534791252485e-311,7.5248508946323e-311,7.5149105367794e-311,7.5049701789265e-311,7.4950298210737e-311,7.485089463221e-311,7.475149105368e-311,7.465208747515e-311,7.455268389662e-311,7.4453280318094e-311,7.4353876739565e-311,7.4254473161036e-311,7.415506958251e-311,7.405566600398e-311,7.395626242545e-311,7.3856858846917e-311,7.375745526839e-311,7.365805168986e-311,7.355864811133e-311,7.3459244532803e-311,7.3359840954274e-311,7.3260437375745e-311,7.3161033797217e-311,7.306163021869e-311,7.296222664016e-311,7.286282306163e-311,7.27634194831e-311,7.2664015904574e-311,7.2564612326045e-311,7.2465208747517e-311,7.236580516899e-311,7.226640159046e-311,7.216699801193e-311,7.20675944334e-311,7.1968190854874e-311,7.1868787276345e-311,7.1769383697816e-311,7.166998011929e-311,7.1570576540754e-311,7.1471172962226e-311,7.1371769383697e-311,7.127236580517e-311,7.117296222664e-311,7.107355864811e-311,7.0974155069583e-311,7.0874751491054e-311,7.0775347912525e-311,7.0675944333997e-311,7.057654075547e-311,7.047713717694e-311,7.037773359841e-311,7.027833001988e-311,7.0178926441354e-311,7.0079522862825e-311,6.9980119284297e-311,6.988071570577e-311,6.978131212724e-311,6.968190854871e-311,6.958250497018e-311,6.9483101391654e-311,6.9383697813125e-311,6.928429423459e-311,6.9184890656063e-311,6.9085487077534e-311,6.8986083499006e-311,6.8886679920477e-311,6.878727634195e-311,6.868787276342e-311,6.858846918489e-311,6.8489065606363e-311,6.8389662027834e-311,6.8290258449305e-311,6.8190854870777e-311,6.809145129225e-311,6.799204771372e-311,6.789264413519e-311,6.779324055666e-311,6.7693836978134e-311,6.7594433399605e-311,6.7495029821076e-311,6.739562624255e-311,6.729622266402e-311,6.719681908549e-311,6.709741550696e-311,6.699801192843e-311,6.68986083499e-311,6.679920477137e-311,6.6699801192843e-311,6.6600397614314e-311,6.6500994035785e-311,6.6401590457257e-311,6.630218687873e-311,6.62027833002e-311,6.610337972167e-311,6.600397614314e-311,6.5904572564614e-311,6.5805168986085e-311,6.5705765407557e-311,6.560636182903e-311,6.55069582505e-311,6.540755467197e-311,6.530815109344e-311,6.5208747514914e-311,6.5109343936385e-311,6.5009940357856e-311,6.491053677933e-311,6.48111332008e-311,6.4711729622266e-311,6.4612326043737e-311,6.451292246521e-311,6.441351888668e-311,6.431411530815e-311,6.4214711729623e-311,6.4115308151094e-311,6.4015904572565e-311,6.3916500994037e-311,6.381709741551e-311,6.371769383698e-311,6.361829025845e-311,6.351888667992e-311,6.3419483101394e-311,6.3320079522865e-311,6.3220675944337e-311,6.312127236581e-311,6.302186878728e-311,6.292246520875e-311,6.282306163022e-311,6.2723658051693e-311,6.2624254473165e-311,6.2524850894636e-311,6.2425447316103e-311,6.2326043737574e-311,6.2226640159046e-311,6.2127236580517e-311,6.202783300199e-311,6.192842942346e-311,6.182902584493e-311,6.1729622266402e-311,6.1630218687874e-311,6.1530815109345e-311,6.1431411530817e-311,6.133200795229e-311,6.123260437376e-311,6.113320079523e-311,6.10337972167e-311,6.0934393638174e-311,6.0834990059645e-311,6.0735586481116e-311,6.063618290259e-311,6.053677932406e-311,6.043737574553e-311,6.0337972167e-311,6.0238568588473e-311,6.013916500994e-311,6.003976143141e-311,5.9940357852883e-311,5.9840954274354e-311,5.9741550695825e-311,5.9642147117297e-311,5.954274353877e-311,5.944333996024e-311,5.934393638171e-311,5.924453280318e-311,5.9145129224654e-311,5.9045725646125e-311,5.8946322067597e-311,5.884691848907e-311,5.874751491054e-311,5.864811133201e-311,5.854870775348e-311,5.8449304174954e-311,5.8349900596425e-311,5.8250497017896e-311,5.815109343937e-311,5.805168986084e-311,5.7952286282306e-311,5.7852882703777e-311,5.775347912525e-311,5.765407554672e-311,5.755467196819e-311,5.7455268389663e-311,5.7355864811134e-311,5.7256461232605e-311,5.7157057654077e-311,5.705765407555e-311,5.695825049702e-311,5.685884691849e-311,5.675944333996e-311,5.6660039761434e-311,5.6560636182905e-311,5.6461232604377e-311,5.636182902585e-311,5.626242544732e-311,5.616302186879e-311,5.606361829026e-311,5.5964214711733e-311,5.5864811133205e-311,5.5765407554676e-311,5.5666003976143e-311,5.5566600397614e-311,5.5467196819086e-311,5.5367793240557e-311,5.526838966203e-311,5.51689860835e-311,5.506958250497e-311,5.4970178926442e-311,5.4870775347914e-311,5.4771371769385e-311,5.4671968190857e-311,5.457256461233e-311,5.44731610338e-311,5.437375745527e-311,5.427435387674e-311,5.4174950298214e-311,5.4075546719685e-311,5.3976143141156e-311,5.387673956263e-311,5.37773359841e-311,5.367793240557e-311,5.357852882704e-311,5.3479125248513e-311,5.337972166998e-311,5.328031809145e-311,5.3180914512923e-311,5.3081510934394e-311,5.2982107355865e-311,5.2882703777337e-311,5.278330019881e-311,5.268389662028e-311,5.258449304175e-311,5.248508946322e-311,5.2385685884694e-311,5.2286282306165e-311,5.2186878727637e-311,5.208747514911e-311,5.198807157058e-311,5.188866799205e-311,5.178926441352e-311,5.1689860834994e-311,5.1590457256465e-311,5.1491053677936e-311,5.139165009941e-311,5.129224652088e-311,5.119284294235e-311,5.1093439363817e-311,5.099403578529e-311,5.089463220676e-311,5.079522862823e-311,5.0695825049703e-311,5.0596421471174e-311,5.0497017892645e-311,5.0397614314117e-311,5.029821073559e-311,5.019880715706e-311,5.009940357853e-311,5.0e-311,4.9900596421474e-311,4.9801192842945e-311,4.9701789264417e-311,4.960238568589e-311,4.950298210736e-311,4.940357852883e-311,4.93041749503e-311,4.9204771371773e-311,4.9105367793245e-311,4.9005964214716e-311,4.890656063619e-311,4.8807157057654e-311,4.8707753479126e-311,4.8608349900597e-311,4.850894632207e-311,4.840954274354e-311,4.831013916501e-311,4.8210735586482e-311,4.8111332007954e-311,4.8011928429425e-311,4.7912524850897e-311,4.781312127237e-311,4.771371769384e-311,4.761431411531e-311,4.751491053678e-311,4.7415506958254e-311,4.7316103379725e-311,4.7216699801196e-311,4.711729622267e-311,4.701789264414e-311,4.691848906561e-311,4.681908548708e-311,4.6719681908553e-311,4.6620278330025e-311,4.652087475149e-311,4.6421471172963e-311,4.6322067594434e-311,4.6222664015905e-311,4.6123260437377e-311,4.602385685885e-311,4.592445328032e-311,4.582504970179e-311,4.572564612326e-311,4.5626242544734e-311,4.5526838966205e-311,4.5427435387677e-311,4.532803180915e-311,4.522862823062e-311,4.512922465209e-311,4.502982107356e-311,4.4930417495034e-311,4.4831013916505e-311,4.4731610337976e-311,4.463220675945e-311,4.453280318092e-311,4.443339960239e-311,4.433399602386e-311,4.423459244533e-311,4.41351888668e-311,4.403578528827e-311,4.3936381709743e-311,4.3836978131214e-311,4.3737574552685e-311,4.3638170974157e-311,4.353876739563e-311,4.34393638171e-311,4.333996023857e-311,4.324055666004e-311,4.3141153081514e-311,4.3041749502985e-311,4.2942345924456e-311,4.284294234593e-311,4.27435387674e-311,4.264413518887e-311,4.254473161034e-311,4.2445328031813e-311,4.2345924453285e-311,4.2246520874756e-311,4.214711729623e-311,4.20477137177e-311,4.1948310139165e-311,4.1848906560637e-311,4.174950298211e-311,4.165009940358e-311,4.155069582505e-311,4.145129224652e-311,4.1351888667994e-311,4.1252485089465e-311,4.1153081510937e-311,4.105367793241e-311,4.095427435388e-311,4.085487077535e-311,4.075546719682e-311,4.0656063618294e-311,4.0556660039765e-311,4.0457256461236e-311,4.035785288271e-311,4.025844930418e-311,4.015904572565e-311,4.005964214712e-311,3.9960238568593e-311,3.9860834990065e-311,3.976143141153e-311,3.9662027833003e-311,3.9562624254474e-311,3.9463220675945e-311,3.9363817097417e-311,3.926441351889e-311,3.916500994036e-311,3.906560636183e-311,3.89662027833e-311,3.8866799204774e-311,3.8767395626245e-311,3.8667992047717e-311,3.856858846919e-311,3.846918489066e-311,3.836978131213e-311,3.82703777336e-311,3.8170974155074e-311,3.8071570576545e-311,3.7972166998016e-311,3.787276341949e-311,3.777335984096e-311,3.767395626243e-311,3.75745526839e-311,3.747514910537e-311,3.737574552684e-311,3.727634194831e-311,3.7176938369783e-311,3.7077534791254e-311,3.6978131212725e-311,3.6878727634197e-311,3.677932405567e-311,3.667992047714e-311,3.658051689861e-311,3.648111332008e-311,3.6381709741554e-311,3.6282306163025e-311,3.6182902584496e-311,3.608349900597e-311,3.598409542744e-311,3.588469184891e-311,3.578528827038e-311,3.5685884691853e-311,3.5586481113325e-311,3.5487077534796e-311,3.538767395627e-311,3.528827037774e-311,3.5188866799205e-311,3.5089463220677e-311,3.499005964215e-311,3.489065606362e-311,3.479125248509e-311,3.469184890656e-311,3.4592445328034e-311,3.4493041749505e-311,3.4393638170977e-311,3.429423459245e-311,3.419483101392e-311,3.409542743539e-311,3.399602385686e-311,3.3896620278334e-311,3.3797216699805e-311,3.3697813121276e-311,3.359840954275e-311,3.349900596422e-311,3.339960238569e-311,3.330019880716e-311,3.3200795228633e-311,3.3101391650105e-311,3.3001988071576e-311,3.2902584493043e-311,3.2803180914514e-311,3.2703777335985e-311,3.2604373757457e-311,3.250497017893e-311,3.24055666004e-311,3.230616302187e-311,3.220675944334e-311,3.2107355864814e-311,3.2007952286285e-311,3.1908548707757e-311,3.180914512923e-311,3.17097415507e-311,3.161033797217e-311,3.151093439364e-311,3.1411530815114e-311,3.1312127236585e-311,3.1212723658056e-311,3.111332007953e-311,3.1013916501e-311,3.091451292247e-311,3.081510934394e-311,3.0715705765413e-311,3.061630218688e-311,3.051689860835e-311,3.0417495029823e-311,3.0318091451294e-311,3.0218687872765e-311,3.0119284294237e-311,3.001988071571e-311,2.992047713718e-311,2.982107355865e-311,2.972166998012e-311,2.9622266401594e-311,2.9522862823065e-311,2.9423459244536e-311,2.932405566601e-311,2.922465208748e-311,2.912524850895e-311,2.902584493042e-311,2.8926441351893e-311,2.8827037773365e-311,2.8727634194836e-311,2.862823061631e-311,2.852882703778e-311,2.842942345925e-311,2.8330019880717e-311,2.823061630219e-311,2.813121272366e-311,2.803180914513e-311,2.79324055666e-311,2.7833001988074e-311,2.7733598409545e-311,2.7634194831017e-311,2.753479125249e-311,2.743538767396e-311,2.733598409543e-311,2.72365805169e-311,2.7137176938374e-311,2.7037773359845e-311,2.6938369781316e-311,2.683896620279e-311,2.673956262426e-311,2.664015904573e-311,2.65407554672e-311,2.6441351888673e-311,2.6341948310145e-311,2.6242544731616e-311,2.614314115309e-311,2.6043737574554e-311,2.5944333996025e-311,2.5844930417497e-311,2.574552683897e-311,2.564612326044e-311,2.554671968191e-311,2.544731610338e-311,2.5347912524854e-311,2.5248508946325e-311,2.5149105367797e-311,2.504970178927e-311,2.495029821074e-311,2.485089463221e-311,2.475149105368e-311,2.4652087475154e-311,2.4552683896625e-311,2.4453280318096e-311,2.435387673957e-311,2.425447316104e-311,2.415506958251e-311,2.405566600398e-311,2.3956262425453e-311,2.385685884692e-311,2.375745526839e-311,2.3658051689863e-311,2.3558648111334e-311,2.3459244532805e-311,2.3359840954277e-311,2.326043737575e-311,2.316103379722e-311,2.306163021869e-311,2.296222664016e-311,2.2862823061634e-311,2.2763419483105e-311,2.2664015904576e-311,2.256461232605e-311,2.246520874752e-311,2.236580516899e-311,2.226640159046e-311,2.2166998011933e-311,2.2067594433405e-311,2.1968190854876e-311,2.186878727635e-311,2.176938369782e-311,2.166998011929e-311,2.1570576540757e-311,2.147117296223e-311,2.13717693837e-311,2.127236580517e-311,2.117296222664e-311,2.1073558648114e-311,2.0974155069585e-311,2.0874751491057e-311,2.077534791253e-311,2.0675944334e-311,2.057654075547e-311,2.047713717694e-311,2.0377733598414e-311,2.0278330019885e-311,2.0178926441356e-311,2.007952286283e-311,1.99801192843e-311,1.988071570577e-311,1.978131212724e-311,1.9681908548713e-311,1.9582504970185e-311,1.9483101391656e-311,1.9383697813128e-311,1.9284294234594e-311,1.9184890656065e-311,1.9085487077537e-311,1.898608349901e-311,1.888667992048e-311,1.878727634195e-311,1.868787276342e-311,1.8588469184894e-311,1.8489065606365e-311,1.8389662027837e-311,1.829025844931e-311,1.819085487078e-311,1.809145129225e-311,1.799204771372e-311,1.7892644135193e-311,1.7793240556665e-311,1.7693836978136e-311,1.759443339961e-311,1.749502982108e-311,1.739562624255e-311,1.729622266402e-311,1.7196819085493e-311,1.7097415506965e-311,1.699801192843e-311,1.6898608349902e-311,1.6799204771374e-311,1.6699801192845e-311,1.6600397614317e-311,1.650099403579e-311,1.640159045726e-311,1.630218687873e-311,1.62027833002e-311,1.6103379721674e-311,1.6003976143145e-311,1.5904572564616e-311,1.580516898609e-311,1.570576540756e-311,1.560636182903e-311,1.55069582505e-311,1.5407554671973e-311,1.5308151093445e-311,1.5208747514916e-311,1.510934393639e-311,1.500994035786e-311,1.491053677933e-311,1.48111332008e-311,1.471172962227e-311,1.461232604374e-311,1.451292246521e-311,1.441351888668e-311,1.4314115308154e-311,1.4214711729625e-311,1.4115308151097e-311,1.401590457257e-311,1.391650099404e-311,1.381709741551e-311,1.371769383698e-311,1.3618290258454e-311,1.3518886679925e-311,1.3419483101396e-311,1.332007952287e-311,1.322067594434e-311,1.312127236581e-311,1.302186878728e-311,1.2922465208753e-311,1.2823061630225e-311,1.2723658051696e-311,1.2624254473168e-311,1.252485089464e-311,1.2425447316105e-311,1.2326043737577e-311,1.222664015905e-311,1.212723658052e-311,1.202783300199e-311,1.192842942346e-311,1.1829025844934e-311,1.1729622266405e-311,1.1630218687877e-311,1.153081510935e-311,1.143141153082e-311,1.133200795229e-311,1.123260437376e-311,1.1133200795233e-311,1.1033797216705e-311,1.0934393638176e-311,1.083499005965e-311,1.073558648112e-311,1.063618290259e-311,1.053677932406e-311,1.0437375745533e-311,1.0337972167005e-311,1.0238568588476e-311,1.0139165009942e-311,1.0039761431414e-311,9.940357852885e-312,9.840954274357e-312,9.74155069583e-312,9.6421471173e-312,9.54274353877e-312,9.44333996024e-312,9.343936381714e-312,9.244532803185e-312,9.145129224656e-312,9.04572564613e-312,8.9463220676e-312,8.84691848907e-312,8.74751491054e-312,8.648111332013e-312,8.548707753485e-312,8.449304174956e-312,8.34990059643e-312,8.2504970179e-312,8.15109343937e-312,8.05168986084e-312,7.95228628231e-312,7.85288270378e-312,7.75347912525e-312,7.65407554672e-312,7.554671968194e-312,7.455268389665e-312,7.355864811137e-312,7.25646123261e-312,7.15705765408e-312,7.05765407555e-312,6.95825049702e-312,6.858846918494e-312,6.759443339965e-312,6.660039761436e-312,6.56063618291e-312,6.46123260438e-312,6.36182902585e-312,6.26242544732e-312,6.163021868793e-312,6.063618290265e-312,5.964214711736e-312,5.864811133208e-312,5.76540755468e-312,5.666003976145e-312,5.566600397617e-312,5.46719681909e-312,5.36779324056e-312,5.26838966203e-312,5.1689860835e-312,5.069582504974e-312,4.970178926445e-312,4.870775347917e-312,4.77137176939e-312,4.67196819086e-312,4.57256461233e-312,4.4731610338e-312,4.373757455273e-312,4.274353876745e-312,4.174950298216e-312,4.07554671969e-312,3.97614314116e-312,3.87673956263e-312,3.7773359841e-312,3.677932405573e-312,3.578528827045e-312,3.479125248516e-312,3.379721669982e-312,3.280318091454e-312,3.180914512925e-312,3.081510934397e-312,2.98210735587e-312,2.88270377734e-312,2.78330019881e-312,2.68389662028e-312,2.584493041754e-312,2.485089463225e-312,2.385685884696e-312,2.28628230617e-312,2.18687872764e-312,2.08747514911e-312,1.98807157058e-312,1.888667992053e-312,1.789264413525e-312,1.689860834996e-312,1.59045725647e-312,1.49105367794e-312,1.39165009941e-312,1.29224652088e-312,1.192842942353e-312,1.09343936382e-312,9.9403578529e-313,8.9463220676e-313,7.95228628234e-313,6.95825049705e-313,5.96421471177e-313,4.9701789265e-313,3.9761431412e-313,2.9821073559e-313,1.9880715706e-313,9.9403578534e-314,5.0e-324]}
},{}],73:[function(require,module,exports){
module.exports={"expected":[[0.6532100883151302,665],[0.5662215783079956,1014],[0.5662215783079956,1015],[0.8493323674619934,1015],[0.5662215783079956,1016],[0.7077769728849945,1016],[0.8493323674619934,1016],[0.9908877620389923,1016],[0.5662215783079956,1017],[0.636999275596495,1017],[0.7077769728849945,1017],[0.7785546701734939,1017],[0.8493323674619934,1017],[0.9201100647504928,1017],[0.9908877620389923,1017],[0.5308327296637458,1018],[0.5662215783079956,1018],[0.6016104269522453,1018],[0.636999275596495,1018],[0.6723881242407448,1018],[0.7077769728849945,1018],[0.7431658215292442,1018],[0.7785546701734939,1018],[0.8139435188177436,1018],[0.8493323674619934,1018],[0.8847212161062431,1018],[0.9201100647504928,1018],[0.9554989133947426,1018],[0.9908877620389923,1018],[0.513138305341621,1019],[0.5308327296637458,1019],[0.5485271539858707,1019],[0.5662215783079956,1019],[0.5839160026301204,1019],[0.6016104269522453,1019],[0.6193048512743702,1019],[0.636999275596495,1019],[0.6546936999186199,1019],[0.6723881242407448,1019],[0.6900825485628697,1019],[0.7077769728849945,1019],[0.7254713972071194,1019],[0.7431658215292442,1019],[0.760860245851369,1019],[0.7785546701734939,1019],[0.7962490944956188,1019],[0.8139435188177436,1019],[0.8316379431398685,1019],[0.8493323674619934,1019],[0.8670267917841182,1019],[0.8847212161062431,1019],[0.902415640428368,1019],[0.9201100647504928,1019],[0.9378044890726177,1019],[0.9554989133947426,1019],[0.9731933377168674,1019],[0.9908877620389923,1019],[0.5042910931805585,1020],[0.513138305341621,1020],[0.5219855175026835,1020],[0.5308327296637458,1020],[0.5396799418248083,1020],[0.5485271539858707,1020],[0.5573743661469333,1020],[0.5662215783079956,1020],[0.575068790469058,1020],[0.5839160026301204,1020],[0.592763214791183,1020],[0.6016104269522453,1020],[0.6104576391133076,1020],[0.6193048512743702,1020],[0.6281520634354326,1020],[0.636999275596495,1020],[0.6458464877575574,1020],[0.6546936999186199,1020],[0.6635409120796824,1020],[0.6723881242407448,1020],[0.6812353364018071,1020],[0.6900825485628697,1020],[0.6989297607239321,1020],[0.7077769728849945,1020],[0.7166241850460568,1020],[0.7254713972071194,1020],[0.7343186093681818,1020],[0.7431658215292442,1020],[0.7520130336903066,1020],[0.760860245851369,1020],[0.7697074580124316,1020],[0.7785546701734939,1020],[0.7874018823345563,1020],[0.7962490944956188,1020],[0.8050963066566813,1020],[0.8139435188177436,1020],[0.8227907309788061,1020],[0.8316379431398685,1020],[0.840485155300931,1020],[0.8493323674619934,1020],[0.8581795796230558,1020],[0.8670267917841182,1020],[0.8758740039451808,1020],[0.8847212161062431,1020],[0.8935684282673054,1020],[0.902415640428368,1020],[0.9112628525894304,1020],[0.9201100647504928,1020],[0.9289572769115552,1020],[0.9378044890726177,1020],[0.9466517012336801,1020],[0.9554989133947426,1020],[0.9643461255558049,1020],[0.9731933377168674,1020],[0.9820405498779299,1020],[0.9908877620389923,1020],[0.9997349742000546,1020],[0.5042910931805585,1021],[0.5087146992610898,1021],[0.513138305341621,1021],[0.5175619114221522,1021],[0.5219855175026835,1021],[0.5264091235832147,1021],[0.5308327296637458,1021],[0.535256335744277,1021],[0.5396799418248083,1021],[0.5441035479053395,1021],[0.5485271539858707,1021],[0.5529507600664019,1021],[0.5573743661469333,1021],[0.5617979722274644,1021],[0.5662215783079956,1021],[0.5706451843885267,1021],[0.575068790469058,1021],[0.5794923965495893,1021],[0.5839160026301204,1021],[0.5883396087106516,1021],[0.592763214791183,1021],[0.5971868208717142,1021],[0.6016104269522453,1021],[0.6060340330327765,1021],[0.6104576391133076,1021],[0.614881245193839,1021],[0.6193048512743702,1021],[0.6237284573549013,1021],[0.6281520634354326,1021],[0.6325756695159639,1021],[0.636999275596495,1021],[0.6414228816770262,1021],[0.6458464877575574,1021],[0.6502700938380888,1021],[0.6546936999186199,1021],[0.6591173059991511,1021],[0.6635409120796824,1021],[0.6679645181602136,1021],[0.6723881242407448,1021],[0.676811730321276,1021],[0.6812353364018071,1021],[0.6856589424823384,1021],[0.6900825485628697,1021],[0.6945061546434008,1021],[0.6989297607239321,1021],[0.7033533668044633,1021],[0.7077769728849945,1021],[0.7122005789655257,1021],[0.7166241850460568,1021],[0.7210477911265881,1021],[0.7254713972071194,1021],[0.7298950032876506,1021],[0.7343186093681818,1021],[0.738742215448713,1021],[0.7431658215292442,1021],[0.7475894276097754,1021],[0.7520130336903066,1021],[0.7564366397708379,1021],[0.760860245851369,1021],[0.7652838519319003,1021],[0.7697074580124316,1021],[0.7741310640929627,1021],[0.7785546701734939,1021],[0.7829782762540252,1021],[0.7874018823345563,1021],[0.7918254884150876,1021],[0.7962490944956188,1021],[0.80067270057615,1021],[0.8050963066566813,1021],[0.8095199127372125,1021],[0.8139435188177436,1021],[0.8183671248982748,1021],[0.8227907309788061,1021],[0.8272143370593373,1021],[0.8316379431398685,1021],[0.8360615492203997,1021],[0.840485155300931,1021],[0.8449087613814622,1021],[0.8493323674619934,1021],[0.8537559735425245,1021],[0.8581795796230558,1021],[0.8626031857035871,1021],[0.8670267917841182,1021],[0.8714503978646494,1021],[0.8758740039451808,1021],[0.8802976100257119,1021],[0.8847212161062431,1021],[0.8891448221867743,1021],[0.8935684282673054,1021],[0.8979920343478368,1021],[0.902415640428368,1021],[0.9068392465088991,1021],[0.9112628525894304,1021],[0.9156864586699617,1021],[0.9201100647504928,1021],[0.924533670831024,1021],[0.9289572769115552,1021],[0.9333808829920865,1021],[0.9378044890726177,1021],[0.9422280951531489,1021],[0.9466517012336801,1021],[0.9510753073142114,1021],[0.9554989133947426,1021],[0.9599225194752737,1021],[0.9643461255558049,1021],[0.9687697316363362,1021],[0.9731933377168674,1021],[0.9776169437973986,1021],[0.9820405498779299,1021],[0.986464155958461,1021],[0.9908877620389923,1021],[0.9953113681195235,1021],[0.9997349742000546,1021],[0.502079290140293,1022],[0.5042910931805585,1022],[0.5065028962208241,1022],[0.5087146992610898,1022],[0.5109265023013554,1022],[0.513138305341621,1022],[0.5153501083818867,1022],[0.5175619114221522,1022],[0.5197737144624178,1022],[0.5219855175026835,1022],[0.524197320542949,1022],[0.5264091235832147,1022],[0.5286209266234803,1022],[0.5308327296637458,1022],[0.5330445327040115,1022],[0.535256335744277,1022],[0.5374681387845427,1022],[0.5396799418248083,1022],[0.5418917448650739,1022],[0.5441035479053395,1022],[0.5463153509456051,1022],[0.5485271539858707,1022],[0.5507389570261364,1022],[0.5529507600664019,1022],[0.5551625631066676,1022],[0.5573743661469333,1022],[0.5595861691871987,1022],[0.5617979722274644,1022],[0.5640097752677299,1022],[0.5662215783079956,1022],[0.5684333813482613,1022],[0.5706451843885267,1022],[0.5728569874287924,1022],[0.575068790469058,1022],[0.5772805935093236,1022],[0.5794923965495893,1022],[0.5817041995898548,1022],[0.5839160026301204,1022],[0.5861278056703861,1022],[0.5883396087106516,1022],[0.5905514117509173,1022],[0.592763214791183,1022],[0.5949750178314485,1022],[0.5971868208717142,1022],[0.5993986239119796,1022],[0.6016104269522453,1022],[0.603822229992511,1022],[0.6060340330327765,1022],[0.6082458360730422,1022],[0.6104576391133076,1022],[0.6126694421535733,1022],[0.614881245193839,1022],[0.6170930482341045,1022],[0.6193048512743702,1022],[0.6215166543146359,1022],[0.6237284573549013,1022],[0.625940260395167,1022],[0.6281520634354326,1022],[0.6303638664756982,1022],[0.6325756695159639,1022],[0.6347874725562294,1022],[0.636999275596495,1022],[0.6392110786367606,1022],[0.6414228816770262,1022],[0.6436346847172919,1022],[0.6458464877575574,1022],[0.6480582907978231,1022],[0.6502700938380888,1022],[0.6524818968783542,1022],[0.6546936999186199,1022],[0.6569055029588855,1022],[0.6591173059991511,1022],[0.6613291090394168,1022],[0.6635409120796824,1022],[0.6657527151199479,1022],[0.6679645181602136,1022],[0.6701763212004791,1022],[0.6723881242407448,1022],[0.6745999272810104,1022],[0.676811730321276,1022],[0.6790235333615416,1022],[0.6812353364018071,1022],[0.6834471394420728,1022],[0.6856589424823384,1022],[0.687870745522604,1022],[0.6900825485628697,1022],[0.6922943516031352,1022],[0.6945061546434008,1022],[0.6967179576836665,1022],[0.6989297607239321,1022],[0.7011415637641977,1022],[0.7033533668044633,1022],[0.7055651698447288,1022],[0.7077769728849945,1022],[0.7099887759252601,1022],[0.7122005789655257,1022],[0.7144123820057913,1022],[0.7166241850460568,1022],[0.7188359880863225,1022],[0.7210477911265881,1022],[0.7232595941668537,1022],[0.7254713972071194,1022],[0.727683200247385,1022],[0.7298950032876506,1022],[0.7321068063279161,1022],[0.7343186093681818,1022],[0.7365304124084474,1022],[0.738742215448713,1022],[0.7409540184889786,1022],[0.7431658215292442,1022],[0.7453776245695098,1022],[0.7475894276097754,1022],[0.749801230650041,1022],[0.7520130336903066,1022],[0.7542248367305723,1022],[0.7564366397708379,1022],[0.7586484428111034,1022],[0.760860245851369,1022],[0.7630720488916347,1022],[0.7652838519319003,1022],[0.7674956549721659,1022],[0.7697074580124316,1022],[0.7719192610526971,1022],[0.7741310640929627,1022],[0.7763428671332283,1022],[0.7785546701734939,1022],[0.7807664732137596,1022],[0.7829782762540252,1022],[0.7851900792942907,1022],[0.7874018823345563,1022],[0.7896136853748219,1022],[0.7918254884150876,1022],[0.7940372914553532,1022],[0.7962490944956188,1022],[0.7984608975358845,1022],[0.80067270057615,1022],[0.8028845036164156,1022],[0.8050963066566813,1022],[0.8073081096969468,1022],[0.8095199127372125,1022],[0.811731715777478,1022],[0.8139435188177436,1022],[0.8161553218580093,1022],[0.8183671248982748,1022],[0.8205789279385405,1022],[0.8227907309788061,1022],[0.8250025340190716,1022],[0.8272143370593373,1022],[0.8294261400996029,1022],[0.8316379431398685,1022],[0.8338497461801342,1022],[0.8360615492203997,1022],[0.8382733522606653,1022],[0.840485155300931,1022],[0.8426969583411965,1022],[0.8449087613814622,1022],[0.8471205644217278,1022],[0.8493323674619934,1022],[0.8515441705022591,1022],[0.8537559735425245,1022],[0.8559677765827902,1022],[0.8581795796230558,1022],[0.8603913826633214,1022],[0.8626031857035871,1022],[0.8648149887438525,1022],[0.8670267917841182,1022],[0.8692385948243839,1022],[0.8714503978646494,1022],[0.8736622009049151,1022],[0.8758740039451808,1022],[0.8780858069854462,1022],[0.8802976100257119,1022],[0.8825094130659774,1022],[0.8847212161062431,1022],[0.8869330191465088,1022],[0.8891448221867743,1022],[0.89135662522704,1022],[0.8935684282673054,1022],[0.8957802313075711,1022],[0.8979920343478368,1022],[0.9002038373881023,1022],[0.902415640428368,1022],[0.9046274434686337,1022],[0.9068392465088991,1022],[0.9090510495491648,1022],[0.9112628525894304,1022],[0.913474655629696,1022],[0.9156864586699617,1022],[0.9178982617102271,1022],[0.9201100647504928,1022],[0.9223218677907585,1022],[0.924533670831024,1022],[0.9267454738712897,1022],[0.9289572769115552,1022],[0.9311690799518209,1022],[0.9333808829920865,1022],[0.935592686032352,1022],[0.9378044890726177,1022],[0.9400162921128833,1022],[0.9422280951531489,1022],[0.9444398981934146,1022],[0.9466517012336801,1022],[0.9488635042739457,1022],[0.9510753073142114,1022],[0.9532871103544769,1022],[0.9554989133947426,1022],[0.9577107164350082,1022],[0.9599225194752737,1022],[0.9621343225155394,1022],[0.9643461255558049,1022],[0.9665579285960706,1022],[0.9687697316363362,1022],[0.9709815346766018,1022],[0.9731933377168674,1022],[0.975405140757133,1022],[0.9776169437973986,1022],[0.9798287468376643,1022],[0.9820405498779299,1022],[0.9842523529181955,1022],[0.986464155958461,1022],[0.9886759589987266,1022],[0.9908877620389923,1022],[0.9930995650792579,1022],[0.9953113681195235,1022],[0.9975231711597892,1022],[0.9997349742000546,1022],[0.5009733886201602,1023],[0.502079290140293,1023],[0.5031851916604257,1023],[0.5042910931805585,1023],[0.5053969947006914,1023],[0.5065028962208241,1023],[0.507608797740957,1023],[0.5087146992610898,1023],[0.5098206007812226,1023],[0.5109265023013554,1023],[0.5120324038214882,1023],[0.513138305341621,1023],[0.5142442068617538,1023],[0.5153501083818867,1023],[0.5164560099020195,1023],[0.5175619114221522,1023],[0.518667812942285,1023],[0.5197737144624178,1023],[0.5208796159825506,1023],[0.5219855175026835,1023],[0.5230914190228163,1023],[0.524197320542949,1023],[0.5253032220630818,1023],[0.5264091235832147,1023],[0.5275150251033475,1023],[0.5286209266234803,1023],[0.529726828143613,1023],[0.5308327296637458,1023],[0.5319386311838786,1023],[0.5330445327040115,1023],[0.5341504342241443,1023],[0.535256335744277,1023],[0.5363622372644099,1023],[0.5374681387845427,1023],[0.5385740403046755,1023],[0.5396799418248083,1023],[0.5407858433449411,1023],[0.5418917448650739,1023],[0.5429976463852066,1023],[0.5441035479053395,1023],[0.5452094494254723,1023],[0.5463153509456051,1023],[0.5474212524657379,1023],[0.5485271539858707,1023],[0.5496330555060035,1023],[0.5507389570261364,1023],[0.5518448585462692,1023],[0.5529507600664019,1023],[0.5540566615865348,1023],[0.5551625631066676,1023],[0.5562684646268004,1023],[0.5573743661469333,1023],[0.5584802676670659,1023],[0.5595861691871987,1023],[0.5606920707073315,1023],[0.5617979722274644,1023],[0.5629038737475972,1023],[0.5640097752677299,1023],[0.5651156767878628,1023],[0.5662215783079956,1023],[0.5673274798281284,1023],[0.5684333813482613,1023],[0.5695392828683941,1023],[0.5706451843885267,1023],[0.5717510859086596,1023],[0.5728569874287924,1023],[0.5739628889489252,1023],[0.575068790469058,1023],[0.5761746919891908,1023],[0.5772805935093236,1023],[0.5783864950294564,1023],[0.5794923965495893,1023],[0.5805982980697221,1023],[0.5817041995898548,1023],[0.5828101011099877,1023],[0.5839160026301204,1023],[0.5850219041502532,1023],[0.5861278056703861,1023],[0.5872337071905188,1023],[0.5883396087106516,1023],[0.5894455102307845,1023],[0.5905514117509173,1023],[0.5916573132710501,1023],[0.592763214791183,1023],[0.5938691163113157,1023],[0.5949750178314485,1023],[0.5960809193515813,1023],[0.5971868208717142,1023],[0.5982927223918469,1023],[0.5993986239119796,1023],[0.6005045254321125,1023],[0.6016104269522453,1023],[0.6027163284723781,1023],[0.603822229992511,1023],[0.6049281315126437,1023],[0.6060340330327765,1023],[0.6071399345529094,1023],[0.6082458360730422,1023],[0.609351737593175,1023],[0.6104576391133076,1023],[0.6115635406334405,1023],[0.6126694421535733,1023],[0.6137753436737061,1023],[0.614881245193839,1023],[0.6159871467139717,1023],[0.6170930482341045,1023],[0.6181989497542374,1023],[0.6193048512743702,1023],[0.620410752794503,1023],[0.6215166543146359,1023],[0.6226225558347686,1023],[0.6237284573549013,1023],[0.6248343588750342,1023],[0.625940260395167,1023],[0.6270461619152998,1023],[0.6281520634354326,1023],[0.6292579649555654,1023],[0.6303638664756982,1023],[0.631469767995831,1023],[0.6325756695159639,1023],[0.6336815710360966,1023],[0.6347874725562294,1023],[0.6358933740763623,1023],[0.636999275596495,1023],[0.6381051771166278,1023],[0.6392110786367606,1023],[0.6403169801568934,1023],[0.6414228816770262,1023],[0.6425287831971591,1023],[0.6436346847172919,1023],[0.6447405862374247,1023],[0.6458464877575574,1023],[0.6469523892776903,1023],[0.6480582907978231,1023],[0.6491641923179559,1023],[0.6502700938380888,1023],[0.6513759953582214,1023],[0.6524818968783542,1023],[0.6535877983984871,1023],[0.6546936999186199,1023],[0.6557996014387527,1023],[0.6569055029588855,1023],[0.6580114044790183,1023],[0.6591173059991511,1023],[0.660223207519284,1023],[0.6613291090394168,1023],[0.6624350105595495,1023],[0.6635409120796824,1023],[0.6646468135998151,1023],[0.6657527151199479,1023],[0.6668586166400807,1023],[0.6679645181602136,1023],[0.6690704196803463,1023],[0.6701763212004791,1023],[0.671282222720612,1023],[0.6723881242407448,1023],[0.6734940257608776,1023],[0.6745999272810104,1023],[0.6757058288011432,1023],[0.676811730321276,1023],[0.6779176318414089,1023],[0.6790235333615416,1023],[0.6801294348816743,1023],[0.6812353364018071,1023],[0.68234123792194,1023],[0.6834471394420728,1023],[0.6845530409622056,1023],[0.6856589424823384,1023],[0.6867648440024712,1023],[0.687870745522604,1023],[0.6889766470427369,1023],[0.6900825485628697,1023],[0.6911884500830023,1023],[0.6922943516031352,1023],[0.693400253123268,1023],[0.6945061546434008,1023],[0.6956120561635337,1023],[0.6967179576836665,1023],[0.6978238592037992,1023],[0.6989297607239321,1023],[0.7000356622440649,1023],[0.7011415637641977,1023],[0.7022474652843305,1023],[0.7033533668044633,1023],[0.704459268324596,1023],[0.7055651698447288,1023],[0.7066710713648617,1023],[0.7077769728849945,1023],[0.7088828744051272,1023],[0.7099887759252601,1023],[0.7110946774453929,1023],[0.7122005789655257,1023],[0.7133064804856586,1023],[0.7144123820057913,1023],[0.7155182835259241,1023],[0.7166241850460568,1023],[0.7177300865661898,1023],[0.7188359880863225,1023],[0.7199418896064553,1023],[0.7210477911265881,1023],[0.7221536926467209,1023],[0.7232595941668537,1023],[0.7243654956869866,1023],[0.7254713972071194,1023],[0.7265772987272521,1023],[0.727683200247385,1023],[0.7287891017675178,1023],[0.7298950032876506,1023],[0.7310009048077835,1023],[0.7321068063279161,1023],[0.7332127078480489,1023],[0.7343186093681818,1023],[0.7354245108883146,1023],[0.7365304124084474,1023],[0.7376363139285801,1023],[0.738742215448713,1023],[0.7398481169688458,1023],[0.7409540184889786,1023],[0.7420599200091115,1023],[0.7431658215292442,1023],[0.7442717230493769,1023],[0.7453776245695098,1023],[0.7464835260896426,1023],[0.7475894276097754,1023],[0.7486953291299083,1023],[0.749801230650041,1023],[0.7509071321701738,1023],[0.7520130336903066,1023],[0.7531189352104395,1023],[0.7542248367305723,1023],[0.755330738250705,1023],[0.7564366397708379,1023],[0.7575425412909707,1023],[0.7586484428111034,1023],[0.7597543443312363,1023],[0.760860245851369,1023],[0.7619661473715018,1023],[0.7630720488916347,1023],[0.7641779504117675,1023],[0.7652838519319003,1023],[0.7663897534520331,1023],[0.7674956549721659,1023],[0.7686015564922987,1023],[0.7697074580124316,1023],[0.7708133595325644,1023],[0.7719192610526971,1023],[0.7730251625728298,1023],[0.7741310640929627,1023],[0.7752369656130955,1023],[0.7763428671332283,1023],[0.7774487686533612,1023],[0.7785546701734939,1023],[0.7796605716936267,1023],[0.7807664732137596,1023],[0.7818723747338924,1023],[0.7829782762540252,1023],[0.784084177774158,1023],[0.7851900792942907,1023],[0.7862959808144235,1023],[0.7874018823345563,1023],[0.7885077838546892,1023],[0.7896136853748219,1023],[0.7907195868949547,1023],[0.7918254884150876,1023],[0.7929313899352204,1023],[0.7940372914553532,1023],[0.7951431929754861,1023],[0.7962490944956188,1023],[0.7973549960157515,1023],[0.7984608975358845,1023],[0.7995667990560172,1023],[0.80067270057615,1023],[0.8017786020962828,1023],[0.8028845036164156,1023],[0.8039904051365484,1023],[0.8050963066566813,1023],[0.8062022081768141,1023],[0.8073081096969468,1023],[0.8084140112170796,1023],[0.8095199127372125,1023],[0.8106258142573453,1023],[0.811731715777478,1023],[0.8128376172976108,1023],[0.8139435188177436,1023],[0.8150494203378764,1023],[0.8161553218580093,1023],[0.8172612233781421,1023],[0.8183671248982748,1023],[0.8194730264184077,1023],[0.8205789279385405,1023],[0.8216848294586733,1023],[0.8227907309788061,1023],[0.823896632498939,1023],[0.8250025340190716,1023],[0.8261084355392044,1023],[0.8272143370593373,1023],[0.8283202385794701,1023],[0.8294261400996029,1023],[0.8305320416197357,1023],[0.8316379431398685,1023],[0.8327438446600013,1023],[0.8338497461801342,1023],[0.834955647700267,1023],[0.8360615492203997,1023],[0.8371674507405326,1023],[0.8382733522606653,1023],[0.8393792537807981,1023],[0.840485155300931,1023],[0.8415910568210637,1023],[0.8426969583411965,1023],[0.8438028598613293,1023],[0.8449087613814622,1023],[0.846014662901595,1023],[0.8471205644217278,1023],[0.8482264659418606,1023],[0.8493323674619934,1023],[0.8504382689821262,1023],[0.8515441705022591,1023],[0.8526500720223918,1023],[0.8537559735425245,1023],[0.8548618750626574,1023],[0.8559677765827902,1023],[0.857073678102923,1023],[0.8581795796230558,1023],[0.8592854811431886,1023],[0.8603913826633214,1023],[0.8614972841834542,1023],[0.8626031857035871,1023],[0.8637090872237199,1023],[0.8648149887438525,1023],[0.8659208902639854,1023],[0.8670267917841182,1023],[0.868132693304251,1023],[0.8692385948243839,1023],[0.8703444963445167,1023],[0.8714503978646494,1023],[0.8725562993847823,1023],[0.8736622009049151,1023],[0.8747681024250479,1023],[0.8758740039451808,1023],[0.8769799054653135,1023],[0.8780858069854462,1023],[0.879191708505579,1023],[0.8802976100257119,1023],[0.8814035115458447,1023],[0.8825094130659774,1023],[0.8836153145861103,1023],[0.8847212161062431,1023],[0.8858271176263759,1023],[0.8869330191465088,1023],[0.8880389206666415,1023],[0.8891448221867743,1023],[0.8902507237069072,1023],[0.89135662522704,1023],[0.8924625267471727,1023],[0.8935684282673054,1023],[0.8946743297874383,1023],[0.8957802313075711,1023],[0.8968861328277039,1023],[0.8979920343478368,1023],[0.8990979358679696,1023],[0.9002038373881023,1023],[0.9013097389082352,1023],[0.902415640428368,1023],[0.9035215419485008,1023],[0.9046274434686337,1023],[0.9057333449887663,1023],[0.9068392465088991,1023],[0.907945148029032,1023],[0.9090510495491648,1023],[0.9101569510692976,1023],[0.9112628525894304,1023],[0.9123687541095632,1023],[0.913474655629696,1023],[0.9145805571498288,1023],[0.9156864586699617,1023],[0.9167923601900944,1023],[0.9178982617102271,1023],[0.91900416323036,1023],[0.9201100647504928,1023],[0.9212159662706256,1023],[0.9223218677907585,1023],[0.9234277693108912,1023],[0.924533670831024,1023],[0.9256395723511569,1023],[0.9267454738712897,1023],[0.9278513753914225,1023],[0.9289572769115552,1023],[0.9300631784316881,1023],[0.9311690799518209,1023],[0.9322749814719536,1023],[0.9333808829920865,1023],[0.9344867845122192,1023],[0.935592686032352,1023],[0.9366985875524849,1023],[0.9378044890726177,1023],[0.9389103905927505,1023],[0.9400162921128833,1023],[0.9411221936330161,1023],[0.9422280951531489,1023],[0.9433339966732818,1023],[0.9444398981934146,1023],[0.9455457997135472,1023],[0.9466517012336801,1023],[0.9477576027538129,1023],[0.9488635042739457,1023],[0.9499694057940785,1023],[0.9510753073142114,1023],[0.9521812088343441,1023],[0.9532871103544769,1023],[0.9543930118746098,1023],[0.9554989133947426,1023],[0.9566048149148754,1023],[0.9577107164350082,1023],[0.958816617955141,1023],[0.9599225194752737,1023],[0.9610284209954066,1023],[0.9621343225155394,1023],[0.9632402240356721,1023],[0.9643461255558049,1023],[0.9654520270759378,1023],[0.9665579285960706,1023],[0.9676638301162034,1023],[0.9687697316363362,1023],[0.969875633156469,1023],[0.9709815346766018,1023],[0.9720874361967347,1023],[0.9731933377168674,1023],[0.9742992392370002,1023],[0.975405140757133,1023],[0.9765110422772658,1023],[0.9776169437973986,1023],[0.9787228453175315,1023],[0.9798287468376643,1023],[0.980934648357797,1023],[0.9820405498779299,1023],[0.9831464513980627,1023],[0.9842523529181955,1023],[0.9853582544383283,1023],[0.986464155958461,1023],[0.9875700574785938,1023],[0.9886759589987266,1023],[0.9897818605188595,1023],[0.9908877620389923,1023],[0.991993663559125,1023],[0.9930995650792579,1023],[0.9942054665993907,1023],[0.9953113681195235,1023],[0.9964172696396564,1023],[0.9975231711597892,1023],[0.9986290726799218,1023],[0.9997349742000546,1023],[0.5004204378600937,1024],[0.5009733886201602,1024],[0.5015263393802265,1024],[0.502079290140293,1024],[0.5026322409003594,1024],[0.5031851916604257,1024],[0.5037381424204922,1024],[0.5042910931805585,1024],[0.504844043940625,1024],[0.5053969947006914,1024],[0.5059499454607578,1024],[0.5065028962208241,1024],[0.5070558469808906,1024],[0.507608797740957,1024],[0.5081617485010234,1024],[0.5087146992610898,1024],[0.5092676500211561,1024],[0.5098206007812226,1024],[0.5103735515412889,1024],[0.5109265023013554,1024],[0.5114794530614218,1024],[0.5120324038214882,1024],[0.5125853545815546,1024],[0.513138305341621,1024],[0.5136912561016874,1024],[0.5142442068617538,1024],[0.5147971576218201,1024],[0.5153501083818867,1024],[0.515903059141953,1024],[0.5164560099020195,1024],[0.5170089606620858,1024],[0.5175619114221522,1024],[0.5181148621822186,1024],[0.518667812942285,1024],[0.5192207637023515,1024],[0.5197737144624178,1024],[0.5203266652224843,1024],[0.5208796159825506,1024],[0.521432566742617,1024],[0.5219855175026835,1024],[0.5225384682627499,1024],[0.5230914190228163,1024],[0.5236443697828826,1024],[0.524197320542949,1024],[0.5247502713030154,1024],[0.5253032220630818,1024],[0.5258561728231483,1024],[0.5264091235832147,1024],[0.526962074343281,1024],[0.5275150251033475,1024],[0.5280679758634138,1024],[0.5286209266234803,1024],[0.5291738773835467,1024],[0.529726828143613,1024],[0.5302797789036795,1024],[0.5308327296637458,1024],[0.5313856804238123,1024],[0.5319386311838786,1024],[0.532491581943945,1024],[0.5330445327040115,1024],[0.5335974834640779,1024],[0.5341504342241443,1024],[0.5347033849842107,1024],[0.535256335744277,1024],[0.5358092865043435,1024],[0.5363622372644099,1024],[0.5369151880244764,1024],[0.5374681387845427,1024],[0.538021089544609,1024],[0.5385740403046755,1024],[0.5391269910647418,1024],[0.5396799418248083,1024],[0.5402328925848747,1024],[0.5407858433449411,1024],[0.5413387941050075,1024],[0.5418917448650739,1024],[0.5424446956251403,1024],[0.5429976463852066,1024],[0.5435505971452732,1024],[0.5441035479053395,1024],[0.5446564986654059,1024],[0.5452094494254723,1024],[0.5457624001855387,1024],[0.5463153509456051,1024],[0.5468683017056716,1024],[0.5474212524657379,1024],[0.5479742032258044,1024],[0.5485271539858707,1024],[0.5490801047459372,1024],[0.5496330555060035,1024],[0.5501860062660698,1024],[0.5507389570261364,1024],[0.5512919077862027,1024],[0.5518448585462692,1024],[0.5523978093063355,1024],[0.5529507600664019,1024],[0.5535037108264683,1024],[0.5540566615865348,1024],[0.5546096123466012,1024],[0.5551625631066676,1024],[0.5557155138667339,1024],[0.5562684646268004,1024]],"x":[1.0e200,9.940357852882704e304,1.9880715705765407e305,2.982107355864811e305,3.9761431411530815e305,4.970178926441352e305,5.964214711729622e305,6.958250497017893e305,7.952286282306163e305,8.946322067594434e305,9.940357852882704e305,1.0934393638170974e306,1.1928429423459244e306,1.2922465208747515e306,1.3916500994035786e306,1.4910536779324055e306,1.5904572564612326e306,1.6898608349900597e306,1.7892644135188867e306,1.8886679920477138e306,1.988071570576541e306,2.0874751491053677e306,2.1868787276341947e306,2.2862823061630218e306,2.385685884691849e306,2.485089463220676e306,2.584493041749503e306,2.68389662027833e306,2.7833001988071572e306,2.882703777335984e306,2.982107355864811e306,3.081510934393638e306,3.180914512922465e306,3.280318091451292e306,3.3797216699801193e306,3.4791252485089464e306,3.5785288270377735e306,3.6779324055666006e306,3.7773359840954276e306,3.876739562624255e306,3.976143141153082e306,4.075546719681909e306,4.1749502982107353e306,4.2743538767395624e306,4.3737574552683895e306,4.4731610337972166e306,4.5725646123260436e306,4.671968190854871e306,4.771371769383698e306,4.870775347912525e306,4.970178926441352e306,5.069582504970179e306,5.168986083499006e306,5.268389662027833e306,5.36779324055666e306,5.4671968190854873e306,5.5666003976143144e306,5.666003976143141e306,5.765407554671968e306,5.864811133200796e306,5.964214711729622e306,6.063618290258449e306,6.163021868787276e306,6.262425447316105e306,6.36182902584493e306,6.461232604373757e306,6.560636182902585e306,6.660039761431413e306,6.759443339960239e306,6.858846918489065e306,6.958250497017893e306,7.05765407554672e306,7.157057654075547e306,7.256461232604373e306,7.355864811133201e306,7.455268389662028e306,7.554671968190855e306,7.654075546719681e306,7.75347912524851e306,7.852882703777337e306,7.952286282306164e306,8.05168986083499e306,8.151093439363818e306,8.250497017892645e306,8.349900596421471e306,8.449304174950298e306,8.548707753479125e306,8.648111332007953e306,8.747514910536779e306,8.846918489065606e306,8.946322067594433e306,9.045725646123261e306,9.145129224652087e306,9.244532803180914e306,9.343936381709741e306,9.44333996023857e306,9.542743538767396e306,9.642147117296223e306,9.74155069582505e306,9.840954274353878e306,9.940357852882704e306,1.003976143141153e307,1.0139165009940358e307,1.0238568588469185e307,1.0337972166998012e307,1.0437375745526838e307,1.0536779324055666e307,1.0636182902584493e307,1.073558648111332e307,1.0834990059642146e307,1.0934393638170975e307,1.1033797216699802e307,1.1133200795228629e307,1.1232604373757455e307,1.1332007952286282e307,1.143141153081511e307,1.1530815109343936e307,1.1630218687872764e307,1.1729622266401592e307,1.1829025844930418e307,1.1928429423459244e307,1.202783300198807e307,1.2127236580516898e307,1.2226640159045727e307,1.2326043737574552e307,1.2425447316103378e307,1.252485089463221e307,1.2624254473161035e307,1.272365805168986e307,1.2823061630218687e307,1.2922465208747515e307,1.3021868787276343e307,1.312127236580517e307,1.3220675944333995e307,1.3320079522862826e307,1.3419483101391652e307,1.3518886679920477e307,1.3618290258449303e307,1.371769383697813e307,1.381709741550696e307,1.3916500994035786e307,1.4015904572564611e307,1.411530815109344e307,1.4214711729622268e307,1.4314115308151094e307,1.441351888667992e307,1.4512922465208746e307,1.4612326043737576e307,1.4711729622266402e307,1.4811133200795228e307,1.4910536779324056e307,1.5009940357852885e307,1.510934393638171e307,1.5208747514910536e307,1.5308151093439362e307,1.540755467196819e307,1.550695825049702e307,1.5606361829025845e307,1.5705765407554673e307,1.58051689860835e307,1.5904572564612327e307,1.6003976143141153e307,1.610337972166998e307,1.6202783300198807e307,1.6302186878727635e307,1.6401590457256461e307,1.650099403578529e307,1.6600397614314115e307,1.6699801192842941e307,1.679920477137177e307,1.6898608349900595e307,1.6998011928429424e307,1.709741550695825e307,1.7196819085487078e307,1.7296222664015906e307,1.7395626242544732e307,1.7495029821073558e307,1.7594433399602386e307,1.7693836978131212e307,1.779324055666004e307,1.7892644135188866e307,1.7992047713717695e307,1.8091451292246523e307,1.8190854870775349e307,1.8290258449304175e307,1.8389662027833e307,1.8489065606361829e307,1.8588469184890657e307,1.8687872763419483e307,1.8787276341948309e307,1.888667992047714e307,1.8986083499005965e307,1.908548707753479e307,1.9184890656063617e307,1.9284294234592445e307,1.9383697813121274e307,1.94831013916501e307,1.9582504970178925e307,1.9681908548707756e307,1.9781312127236582e307,1.9880715705765408e307,1.9980119284294234e307,2.007952286282306e307,2.017892644135189e307,2.0278330019880716e307,2.0377733598409542e307,2.047713717693837e307,2.0576540755467199e307,2.0675944333996024e307,2.077534791252485e307,2.0874751491053676e307,2.0974155069582507e307,2.1073558648111333e307,2.1172962226640158e307,2.1272365805168987e307,2.1371769383697815e307,2.147117296222664e307,2.1570576540755467e307,2.1669980119284293e307,2.176938369781312e307,2.186878727634195e307,2.1968190854870775e307,2.2067594433399603e307,2.216699801192843e307,2.2266401590457258e307,2.2365805168986083e307,2.246520874751491e307,2.256461232604374e307,2.2664015904572563e307,2.276341948310139e307,2.286282306163022e307,2.2962226640159046e307,2.306163021868787e307,2.31610337972167e307,2.326043737574553e307,2.3359840954274354e307,2.3459244532803185e307,2.3558648111332006e307,2.3658051689860837e307,2.375745526838966e307,2.385685884691849e307,2.395626242544732e307,2.405566600397614e307,2.415506958250497e307,2.4254473161033797e307,2.435387673956262e307,2.4453280318091453e307,2.455268389662028e307,2.4652087475149105e307,2.4751491053677936e307,2.4850894632206757e307,2.4950298210735587e307,2.504970178926442e307,2.514910536779324e307,2.524850894632207e307,2.534791252485089e307,2.544731610337972e307,2.554671968190855e307,2.5646123260437373e307,2.5745526838966204e307,2.584493041749503e307,2.5944333996023856e307,2.6043737574552686e307,2.6143141153081507e307,2.624254473161034e307,2.634194831013917e307,2.644135188866799e307,2.654075546719682e307,2.664015904572565e307,2.673956262425447e307,2.6838966202783303e307,2.6938369781312124e307,2.7037773359840955e307,2.7137176938369786e307,2.7236580516898606e307,2.7335984095427437e307,2.743538767395626e307,2.753479125248509e307,2.763419483101392e307,2.773359840954274e307,2.783300198807157e307,2.79324055666004e307,2.8031809145129223e307,2.8131212723658054e307,2.823061630218688e307,2.8330019880715705e307,2.8429423459244536e307,2.8528827037773357e307,2.862823061630219e307,2.8727634194831014e307,2.882703777335984e307,2.892644135188867e307,2.902584493041749e307,2.912524850894632e307,2.9224652087475153e307,2.9324055666003974e307,2.9423459244532805e307,2.952286282306163e307,2.9622266401590456e307,2.9721669980119287e307,2.9821073558648113e307,2.992047713717694e307,3.001988071570577e307,3.011928429423459e307,3.021868787276342e307,3.0318091451292247e307,3.0417495029821073e307,3.0516898608349904e307,3.0616302186878724e307,3.0715705765407555e307,3.081510934393638e307,3.0914512922465207e307,3.101391650099404e307,3.1113320079522864e307,3.121272365805169e307,3.131212723658052e307,3.1411530815109346e307,3.151093439363817e307,3.1610337972167e307,3.1709741550695824e307,3.1809145129224654e307,3.190854870775348e307,3.2007952286282306e307,3.210735586481113e307,3.220675944333996e307,3.230616302186879e307,3.2405566600397614e307,3.250497017892644e307,3.260437375745527e307,3.2703777335984097e307,3.2803180914512923e307,3.290258449304175e307,3.300198807157058e307,3.3101391650099405e307,3.320079522862823e307,3.3300198807157057e307,3.3399602385685883e307,3.3499005964214713e307,3.359840954274354e307,3.3697813121272365e307,3.379721669980119e307,3.389662027833002e307,3.399602385685885e307,3.4095427435387673e307,3.41948310139165e307,3.429423459244533e307,3.4393638170974156e307,3.449304174950298e307,3.459244532803181e307,3.469184890656064e307,3.4791252485089464e307,3.489065606361829e307,3.4990059642147116e307,3.5089463220675947e307,3.518886679920477e307,3.52882703777336e307,3.5387673956262424e307,3.548707753479125e307,3.558648111332008e307,3.5685884691848907e307,3.578528827037773e307,3.5884691848906563e307,3.598409542743539e307,3.6083499005964215e307,3.6182902584493046e307,3.6282306163021867e307,3.6381709741550697e307,3.6481113320079523e307,3.658051689860835e307,3.667992047713718e307,3.6779324055666e307,3.687872763419483e307,3.6978131212723657e307,3.7077534791252483e307,3.7176938369781314e307,3.727634194831014e307,3.7375745526838966e307,3.7475149105367796e307,3.7574552683896617e307,3.767395626242545e307,3.777335984095428e307,3.78727634194831e307,3.797216699801193e307,3.8071570576540756e307,3.817097415506958e307,3.8270377733598413e307,3.8369781312127234e307,3.8469184890656065e307,3.856858846918489e307,3.8667992047713716e307,3.8767395626242547e307,3.886679920477137e307,3.89662027833002e307,3.906560636182903e307,3.916500994035785e307,3.926441351888668e307,3.936381709741551e307,3.9463220675944333e307,3.9562624254473164e307,3.9662027833001985e307,3.9761431411530815e307,3.9860834990059646e307,3.9960238568588467e307,4.00596421471173e307,4.015904572564612e307,4.025844930417495e307,4.035785288270378e307,4.04572564612326e307,4.055666003976143e307,4.0656063618290263e307,4.0755467196819084e307,4.0854870775347915e307,4.095427435387674e307,4.1053677932405566e307,4.1153081510934397e307,4.125248508946322e307,4.135188866799205e307,4.145129224652088e307,4.15506958250497e307,4.165009940357853e307,4.174950298210735e307,4.1848906560636183e307,4.1948310139165014e307,4.2047713717693834e307,4.2147117296222665e307,4.224652087475149e307,4.2345924453280317e307,4.244532803180915e307,4.2544731610337974e307,4.26441351888668e307,4.274353876739563e307,4.284294234592445e307,4.294234592445328e307,4.304174950298211e307,4.3141153081510934e307,4.3240556660039764e307,4.3339960238568585e307,4.3439363817097416e307,4.353876739562624e307,4.363817097415507e307,4.37375745526839e307,4.3836978131212724e307,4.393638170974155e307,4.403578528827038e307,4.4135188866799207e307,4.4234592445328033e307,4.433399602385686e307,4.4433399602385684e307,4.4532803180914515e307,4.463220675944334e307,4.4731610337972167e307,4.4831013916501e307,4.493041749502982e307,4.502982107355865e307,4.512922465208748e307,4.52286282306163e307,4.532803180914513e307,4.542743538767396e307,4.552683896620278e307,4.562624254473161e307,4.572564612326044e307,4.582504970178927e307,4.592445328031809e307,4.602385685884692e307,4.612326043737574e307,4.622266401590457e307,4.63220675944334e307,4.642147117296223e307,4.652087475149106e307,4.662027833001988e307,4.671968190854871e307,4.681908548707753e307,4.691848906560637e307,4.70178926441352e307,4.711729622266401e307,4.721669980119284e307,4.731610337972167e307,4.74155069582505e307,4.751491053677932e307,4.761431411530815e307,4.771371769383698e307,4.78131212723658e307,4.791252485089464e307,4.801192842942346e307,4.811133200795228e307,4.821073558648112e307,4.831013916500994e307,4.840954274353877e307,4.850894632206759e307,4.860834990059642e307,4.870775347912524e307,4.880715705765407e307,4.890656063618291e307,4.900596421471173e307,4.910536779324056e307,4.920477137176938e307,4.930417495029821e307,4.940357852882704e307,4.950298210735587e307,4.96023856858847e307,4.970178926441351e307,4.980119284294235e307,4.990059642147117e307,5.0e307,5.009940357852884e307,5.019880715705765e307,5.029821073558648e307,5.03976143141153e307,5.049701789264414e307,5.059642147117297e307,5.069582504970178e307,5.079522862823062e307,5.089463220675944e307,5.099403578528827e307,5.10934393638171e307,5.119284294234593e307,5.129224652087475e307,5.139165009940358e307,5.149105367793241e307,5.159045725646123e307,5.168986083499006e307,5.178926441351889e307,5.188866799204771e307,5.198807157057654e307,5.208747514910537e307,5.21868787276342e307,5.228628230616301e307,5.238568588469185e307,5.248508946322068e307,5.25844930417495e307,5.268389662027834e307,5.278330019880715e307,5.288270377733598e307,5.298210735586482e307,5.308151093439364e307,5.318091451292247e307,5.32803180914513e307,5.337972166998012e307,5.347912524850894e307,5.357852882703777e307,5.367793240556661e307,5.377733598409543e307,5.387673956262425e307,5.397614314115308e307,5.407554671968191e307,5.417495029821074e307,5.427435387673957e307,5.437375745526839e307,5.447316103379721e307,5.457256461232605e307,5.467196819085487e307,5.47713717693837e307,5.487077534791252e307,5.497017892644135e307,5.506958250497018e307,5.5168986083499e307,5.526838966202784e307,5.536779324055666e307,5.546719681908548e307,5.556660039761432e307,5.566600397614314e307,5.576540755467197e307,5.58648111332008e307,5.596421471172962e307,5.606361829025845e307,5.616302186878728e307,5.626242544731611e307,5.636182902584493e307,5.646123260437376e307,5.656063618290259e307,5.666003976143141e307,5.675944333996024e307,5.685884691848907e307,5.695825049701789e307,5.705765407554671e307,5.715705765407555e307,5.725646123260438e307,5.73558648111332e307,5.745526838966203e307,5.755467196819085e307,5.765407554671968e307,5.775347912524851e307,5.785288270377734e307,5.795228628230617e307,5.805168986083498e307,5.815109343936382e307,5.825049701789264e307,5.834990059642147e307,5.844930417495031e307,5.854870775347912e307,5.864811133200795e307,5.874751491053678e307,5.884691848906561e307,5.894632206759443e307,5.904572564612326e307,5.914512922465209e307,5.924453280318091e307,5.934393638170975e307,5.944333996023857e307,5.954274353876739e307,5.964214711729623e307,5.974155069582505e307,5.984095427435388e307,5.99403578528827e307,6.003976143141154e307,6.013916500994035e307,6.023856858846918e307,6.033797216699802e307,6.043737574552684e307,6.053677932405567e307,6.063618290258449e307,6.073558648111332e307,6.083499005964215e307,6.093439363817098e307,6.103379721669981e307,6.113320079522862e307,6.123260437375745e307,6.133200795228628e307,6.143141153081511e307,6.153081510934394e307,6.163021868787276e307,6.172962226640159e307,6.182902584493041e307,6.192842942345925e307,6.202783300198808e307,6.212723658051689e307,6.222664015904573e307,6.232604373757455e307,6.242544731610338e307,6.252485089463221e307,6.262425447316104e307,6.272365805168986e307,6.282306163021869e307,6.292246520874752e307,6.302186878727634e307,6.312127236580517e307,6.3220675944334e307,6.332007952286282e307,6.341948310139165e307,6.351888667992048e307,6.361829025844931e307,6.371769383697812e307,6.381709741550696e307,6.391650099403579e307,6.401590457256461e307,6.411530815109345e307,6.421471172962226e307,6.431411530815109e307,6.441351888667992e307,6.451292246520875e307,6.461232604373758e307,6.47117296222664e307,6.481113320079523e307,6.491053677932405e307,6.500994035785288e307,6.510934393638172e307,6.520874751491054e307,6.530815109343936e307,6.540755467196819e307,6.550695825049702e307,6.560636182902585e307,6.570576540755468e307,6.58051689860835e307,6.590457256461232e307,6.600397614314116e307,6.610337972166998e307,6.620278330019881e307,6.630218687872763e307,6.640159045725646e307,6.650099403578529e307,6.660039761431411e307,6.669980119284295e307,6.679920477137177e307,6.689860834990059e307,6.699801192842943e307,6.709741550695825e307,6.719681908548708e307,6.729622266401591e307,6.739562624254473e307,6.749502982107356e307,6.759443339960238e307,6.769383697813122e307,6.779324055666004e307,6.789264413518886e307,6.79920477137177e307,6.809145129224652e307,6.819085487077535e307,6.829025844930418e307,6.8389662027833e307,6.848906560636182e307,6.858846918489066e307,6.868787276341949e307,6.878727634194831e307,6.888667992047714e307,6.898608349900596e307,6.908548707753479e307,6.918489065606362e307,6.928429423459245e307,6.938369781312128e307,6.948310139165009e307,6.958250497017893e307,6.968190854870775e307,6.978131212723658e307,6.988071570576542e307,6.998011928429423e307,7.007952286282306e307,7.017892644135189e307,7.027833001988072e307,7.037773359840954e307,7.047713717693837e307,7.05765407554672e307,7.067594433399602e307,7.077534791252485e307,7.087475149105368e307,7.09741550695825e307,7.107355864811133e307,7.117296222664016e307,7.127236580516899e307,7.137176938369781e307,7.147117296222665e307,7.157057654075546e307,7.166998011928429e307,7.176938369781313e307,7.186878727634195e307,7.196819085487078e307,7.20675944333996e307,7.216699801192843e307,7.226640159045726e307,7.236580516898609e307,7.246520874751492e307,7.256461232604373e307,7.266401590457256e307,7.276341948310139e307,7.286282306163022e307,7.296222664015905e307,7.306163021868787e307,7.31610337972167e307,7.326043737574552e307,7.335984095427436e307,7.345924453280319e307,7.3558648111332e307,7.365805168986084e307,7.375745526838966e307,7.385685884691849e307,7.395626242544731e307,7.405566600397615e307,7.415506958250497e307,7.425447316103379e307,7.435387673956263e307,7.445328031809145e307,7.455268389662028e307,7.465208747514911e307,7.475149105367793e307,7.485089463220676e307,7.495029821073559e307,7.504970178926442e307,7.514910536779323e307,7.524850894632207e307,7.53479125248509e307,7.544731610337972e307,7.554671968190856e307,7.564612326043737e307,7.57455268389662e307,7.584493041749503e307,7.594433399602386e307,7.604373757455269e307,7.614314115308151e307,7.624254473161034e307,7.634194831013916e307,7.644135188866799e307,7.654075546719683e307,7.664015904572565e307,7.673956262425447e307,7.68389662027833e307,7.693836978131213e307,7.703777335984096e307,7.713717693836978e307,7.723658051689861e307,7.733598409542743e307,7.743538767395626e307,7.753479125248509e307,7.763419483101392e307,7.773359840954274e307,7.783300198807157e307,7.79324055666004e307,7.803180914512922e307,7.813121272365806e307,7.823061630218689e307,7.83300198807157e307,7.842942345924454e307,7.852882703777336e307,7.862823061630219e307,7.872763419483102e307,7.882703777335984e307,7.892644135188867e307,7.902584493041749e307,7.912524850894633e307,7.922465208747515e307,7.932405566600397e307,7.942345924453281e307,7.952286282306163e307,7.962226640159046e307,7.972166998011929e307,7.982107355864811e307,7.992047713717693e307,8.001988071570577e307,8.01192842942346e307,8.021868787276342e307,8.031809145129224e307,8.041749502982107e307,8.05168986083499e307,8.0616302186878725e307,8.071570576540756e307,8.081510934393639e307,8.09145129224652e307,8.101391650099404e307,8.111332007952286e307,8.121272365805169e307,8.131212723658053e307,8.141153081510934e307,8.151093439363817e307,8.1610337972167e307,8.170974155069583e307,8.180914512922465e307,8.190854870775348e307,8.200795228628231e307,8.210735586481113e307,8.220675944333996e307,8.230616302186879e307,8.240556660039761e307,8.250497017892644e307,8.260437375745527e307,8.27037773359841e307,8.280318091451292e307,8.290258449304176e307,8.300198807157057e307,8.31013916500994e307,8.320079522862824e307,8.330019880715706e307,8.339960238568589e307,8.34990059642147e307,8.359840954274354e307,8.369781312127237e307,8.379721669980119e307,8.389662027833003e307,8.399602385685884e307,8.409542743538767e307,8.41948310139165e307,8.429423459244533e307,8.439363817097416e307,8.449304174950298e307,8.459244532803181e307,8.469184890656063e307,8.479125248508947e307,8.48906560636183e307,8.499005964214711e307,8.508946322067595e307,8.518886679920477e307,8.52882703777336e307,8.538767395626242e307,8.548707753479126e307,8.558648111332008e307,8.56858846918489e307,8.578528827037774e307,8.588469184890656e307,8.598409542743539e307,8.608349900596422e307,8.618290258449304e307,8.628230616302187e307,8.63817097415507e307,8.648111332007953e307,8.658051689860834e307,8.667992047713717e307,8.677932405566601e307,8.687872763419483e307,8.697813121272366e307,8.707753479125248e307,8.717693836978131e307,8.727634194831014e307,8.737574552683897e307,8.74751491053678e307,8.757455268389662e307,8.767395626242545e307,8.777335984095427e307,8.78727634194831e307,8.797216699801194e307,8.807157057654076e307,8.817097415506958e307,8.827037773359841e307,8.836978131212724e307,8.846918489065607e307,8.856858846918489e307,8.866799204771372e307,8.876739562624254e307,8.886679920477137e307,8.89662027833002e307,8.906560636182903e307,8.916500994035785e307,8.926441351888668e307,8.936381709741551e307,8.946322067594433e307,8.956262425447317e307,8.9662027833002e307,8.976143141153081e307,8.986083499005964e307,8.996023856858846e307,9.00596421471173e307,9.015904572564611e307,9.025844930417495e307,9.035785288270379e307,9.04572564612326e307,9.055666003976144e307,9.065606361829025e307,9.075546719681909e307,9.085487077534793e307,9.095427435387674e307,9.105367793240556e307,9.11530815109344e307,9.125248508946323e307,9.135188866799204e307,9.145129224652088e307,9.15506958250497e307,9.165009940357853e307,9.174950298210735e307,9.184890656063618e307,9.194831013916502e307,9.204771371769384e307,9.214711729622267e307,9.224652087475149e307,9.234592445328032e307,9.244532803180914e307,9.254473161033795e307,9.26441351888668e307,9.274353876739563e307,9.284294234592446e307,9.294234592445328e307,9.304174950298211e307,9.314115308151093e307,9.324055666003976e307,9.33399602385686e307,9.343936381709742e307,9.353876739562625e307,9.363817097415507e307,9.373757455268388e307,9.383697813121274e307,9.393638170974156e307,9.40357852882704e307,9.41351888667992e307,9.423459244532802e307,9.433399602385686e307,9.443339960238567e307,9.453280318091453e307,9.463220675944335e307,9.473161033797216e307,9.4831013916501e307,9.493041749502981e307,9.502982107355865e307,9.512922465208749e307,9.52286282306163e307,9.532803180914514e307,9.542743538767395e307,9.552683896620279e307,9.56262425447316e307,9.572564612326042e307,9.582504970178928e307,9.59244532803181e307,9.602385685884693e307,9.612326043737574e307,9.622266401590456e307,9.63220675944334e307,9.642147117296223e307,9.652087475149107e307,9.662027833001988e307,9.67196819085487e307,9.681908548707753e307,9.691848906560635e307,9.701789264413519e307,9.711729622266402e307,9.721669980119284e307,9.731610337972167e307,9.741550695825049e307,9.751491053677933e307,9.761431411530814e307,9.7713717693837e307,9.781312127236581e307,9.791252485089463e307,9.801192842942346e307,9.811133200795228e307,9.821073558648112e307,9.831013916500995e307,9.840954274353877e307,9.85089463220676e307,9.860834990059642e307,9.870775347912526e307,9.880715705765407e307,9.890656063618289e307,9.900596421471174e307,9.910536779324056e307,9.92047713717694e307,9.930417495029821e307,9.940357852882703e307,9.950298210735586e307,9.96023856858847e307,9.970178926441353e307,9.980119284294235e307,9.990059642147117e307,1.0e308]}
},{}],74:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isBrowser = require( '@stdlib/assert/is-browser' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var randu = require( '@stdlib/math/base/random/randu' );
var round = require( '@stdlib/math/base/special/round' );
var pow = require( '@stdlib/math/base/special/pow' );
var abs = require( '@stdlib/math/base/special/abs' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var frexp = require( './../lib' );


// FIXTURES //

var small = require( './fixtures/julia/x_1e-200_1e-308.json' );
var medium = require( './fixtures/julia/x_-1e3_1e3.json' );
var large = require( './fixtures/julia/x_1e200_1e308.json' );
var subnormal = require( './fixtures/julia/x_1e-310_5e-324.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof frexp, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (small `x`)', function test( t ) {
	var expected;
	var x;
	var f;
	var i;

	x = small.x;
	expected = small.expected;
	for ( i = 0; i < x.length; i++ ) {
		f = frexp( x[i] );
		t.deepEqual( f, expected[ i ], 'returns expected results for ' + x[i] );
	}
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (medium `x`)', function test( t ) {
	var expected;
	var x;
	var f;
	var i;

	x = medium.x;
	expected = medium.expected;
	for ( i = 0; i < x.length; i++ ) {
		f = frexp( x[i] );
		t.deepEqual( f, expected[ i ], 'returns expected results for ' + x[i] );
	}
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (large `x`)', function test( t ) {
	var expected;
	var x;
	var f;
	var i;

	x = large.x;
	expected = large.expected;
	for ( i = 0; i < x.length; i++ ) {
		f = frexp( x[i] );
		t.deepEqual( f, expected[ i ], 'returns expected results for ' + x[i] );
	}
	t.end();
});

tape( 'the function splits a floating-point number into a normalized fraction and an integer power of two (subnormal `x`)', function test( t ) {
	var expected;
	var x;
	var f;
	var i;

	x = subnormal.x;
	expected = subnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		f = frexp( x[i] );
		t.deepEqual( f, expected[ i ], 'returns expected results for ' + x[i] );
	}
	t.end();
});

tape( 'the returned normalized fraction and exponent satisfy the relation `x = frac * 2**exp`', function test( t ) {
	var total;
	var sign;
	var frac;
	var exp;
	var x;
	var f;
	var i;

	if ( isBrowser ) {
		total = 200;
	} else {
		total = 1000;
	}
	for ( i = 0; i < total; i++ ) {
		if ( randu() < 0.5 ) {
			sign = -1.0;
		} else {
			sign = 1.0;
		}
		frac = randu() * 10.0;
		exp = round( randu()*616.0 ) - 308;
		x = sign * frac * pow( 10.0, exp );
		f = frexp( x );

		if ( f[ 1 ] > BIAS ) {
			f = f[ 0 ] * pow( 2.0, BIAS ) * pow( 2.0, f[1]-BIAS );
		} else {
			f = f[ 0 ] * pow( 2.0, f[ 1 ] );
		}
		t.equal( f, x, 'frac * 2^exp equals ' + x );
	}
	t.end();
});

tape( 'the absolute value of the normalized fraction is on the interval `[1/2,1)`', function test( t ) {
	var total;
	var sign;
	var frac;
	var exp;
	var x;
	var f;
	var i;

	if ( isBrowser ) {
		total = 200;
	} else {
		total = 1000;
	}
	for ( i = 0; i < total; i++ ) {
		if ( randu() < 0.5 ) {
			sign = -1.0;
		} else {
			sign = 1.0;
		}
		frac = randu() * 10.0;
		exp = round( randu()*614.0 ) - 307;
		x = sign * frac * pow( 10.0, exp );
		f = frexp( x );

		// Compute the absolute value of the normalized fraction:
		f = abs( f[ 0 ] );

		t.ok( f >= 0.5 && f < 1.0, 'absolute value of the normalized fraction is on the interval [1/2,1). x: ' + x + '.' );
	}
	t.end();
});

tape( 'if provided `+0`, the function returns `[0,0]`', function test( t ) {
	var f = frexp( 0.0 );
	t.deepEqual( f, [0.0, 0], 'returns [0,0]' );
	t.end();
});

tape( 'if provided `-0`, the function returns `[-0,0]`', function test( t ) {
	var f = frexp( -0.0 );
	t.equal( isNegativeZero( f[0] ), true, 'first element is -0' );
	t.deepEqual( f, [-0.0, 0], 'returns [-0,0]' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `[+infinity,0]`', function test( t ) {
	var f = frexp( PINF );
	t.deepEqual( f, [PINF, 0], 'returns [+inf,0]' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `[-infinity,0]`', function test( t ) {
	var f = frexp( NINF );
	t.deepEqual( f, [NINF, 0], 'returns [-inf,0]' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `[NaN,0]`', function test( t ) {
	var f = frexp( NaN );
	t.equal( isnan( f[0] ), true, 'first element is NaN' );
	t.equal( f[ 1 ], 0, 'second element is 0' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/frexp/test/test.js")
},{"./../lib":69,"./fixtures/julia/x_-1e3_1e3.json":70,"./fixtures/julia/x_1e-200_1e-308.json":71,"./fixtures/julia/x_1e-310_5e-324.json":72,"./fixtures/julia/x_1e200_1e308.json":73,"@stdlib/assert/is-browser":5,"@stdlib/math/base/assert/is-nan":42,"@stdlib/math/base/assert/is-negative-zero":44,"@stdlib/math/base/random/randu":59,"@stdlib/math/base/special/abs":63,"@stdlib/math/base/special/pow":77,"@stdlib/math/base/special/round":85,"@stdlib/math/constants/float64-exponent-bias":115,"@stdlib/math/constants/float64-ninf":121,"@stdlib/math/constants/float64-pinf":122,"tape":210}],75:[function(require,module,exports){
'use strict';

/**
* Multiply a double-precision floating-point number by an integer power of two.
*
* @module @stdlib/math/base/special/ldexp
*
* @example
* var ldexp = require( '@stdlib/math/base/special/ldexp' );
*
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* x = ldexp( 0.0, 20 );
* // returns 0.0
*
* x = ldexp( -0.0, 39 );
* // returns -0.0
*
* x = ldexp( NaN, -101 );
* // returns NaN
*
* x = ldexp( Number.POSITIVE_INFINITY, 11 );
* // returns Number.POSITIVE_INFINITY
*
* x = ldexp( Number.NEGATIVE_INFINITY, -118 );
* // returns Number.NEGATIVE_INFINITY
*/

// MODULES //

var ldexp = require( './ldexp.js' );


// EXPORTS //

module.exports = ldexp;

},{"./ldexp.js":76}],76:[function(require,module,exports){
'use strict';

// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/math/constants/float64-max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/math/constants/float64-max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/math/constants/float64-min-base2-exponent-subnormal' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var normalize = require( '@stdlib/math/base/utils/float64-normalize' );
var floatExp = require( '@stdlib/math/base/utils/float64-exponent' );
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111
var CLEAR_EXP_MASK = 0x800fffff; // 2148532223


// MAIN //

/**
* Multiplies a double-precision floating-point number by an integer power of two.
*
* @param {number} frac - fraction
* @param {integer} exp - exponent
* @returns {number} double-precision floating-point number
*
* @example
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
*
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
*
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
*
* @example
* var x = ldexp( Number.POSITIVE_INFINITY, 11 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var x = ldexp( Number.NEGATIVE_INFINITY, -118 );
* // returns Number.NEGATIVE_INFINITY
*/
function ldexp( frac, exp ) {
	var high;
	var tmp;
	var w;
	var m;
	if (
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	tmp = normalize( frac );
	frac = tmp[ 0 ];
	exp += tmp[ 1 ];

	// Extract the exponent from `frac` and add it to `exp`:
	exp += floatExp( frac );

	// Check for underflow/overflow...
	if ( exp < MIN_SUBNORMAL_EXPONENT ) {
		return copysign( 0.0, frac );
	}
	if ( exp > MAX_EXPONENT ) {
		if ( frac < 0.0 ) {
			return NINF;
		}
		return PINF;
	}
	// Check for a subnormal and scale accordingly to retain precision...
	if ( exp <= MAX_SUBNORMAL_EXPONENT ) {
		exp += 52;
		m = TWO52_INV;
	} else {
		m = 1.0;
	}
	// Split the fraction into higher and lower order words:
	w = toWords( frac );
	high = w[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, w[ 1 ] );
} // end FUNCTION ldexp()


// EXPORTS //

module.exports = ldexp;

},{"@stdlib/math/base/assert/is-infinite":38,"@stdlib/math/base/assert/is-nan":42,"@stdlib/math/base/special/copysign":65,"@stdlib/math/base/utils/float64-exponent":92,"@stdlib/math/base/utils/float64-from-words":94,"@stdlib/math/base/utils/float64-normalize":102,"@stdlib/math/base/utils/float64-to-words":110,"@stdlib/math/constants/float64-exponent-bias":115,"@stdlib/math/constants/float64-max-base2-exponent":119,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":118,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":120,"@stdlib/math/constants/float64-ninf":121,"@stdlib/math/constants/float64-pinf":122}],77:[function(require,module,exports){
'use strict';

/**
* Evaluate the exponential function.
*
* @module @stdlib/math/base/special/pow
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* v = pow( 4.0, 0.5 );
* // returns 2.0
*
* v = pow( 100.0, 0.0 );
* // returns 1.0
*
* v = pow( Math.PI, 5.0 );
* // returns ~306.0197
*
* v = pow( Math.PI, -0.2 );
* // returns ~0.7954
*
* v = pow( NaN, 3.0 );
* // returns NaN
*
* v = pow( 5.0, NaN );
* // returns NaN
*
* v = pow( NaN, NaN );
* // returns NaN
*/

// MODULES //

var pow = require( './pow.js' );


// EXPORTS //

module.exports = pow;

},{"./pow.js":80}],78:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// VARIABLES //

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff;

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000;

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000;

// 0x20000000 = 536870912 => 0 01000000000 00000000000000000000 => biased exponent: 512 = -511+1023
var HIGH_BIASED_EXP_NEG_512 = 0x20000000;

// 0x00080000 = 524288 => 0 00000000000 10000000000000000000
var HIGH_SIGNIFICAND_HALF = 0x00080000;

// TODO: consider making an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20;

var TWO53 = 9007199254740992.0;	// 0x43400000, 0x00000000

// 2/(3*LN2)
var CP = 9.61796693925975554329e-01; // 0x3FEEC709, 0xDC3A03FD

// (float)CP
var CP_HI = 9.61796700954437255859e-01; // 0x3FEEC709, 0xE0000000

// Low: CP_HI
var CP_LO = -7.02846165095275826516e-09; // 0xBE3E2FE0, 0x145B01F5

var BP = [
	1.0,
	1.5
];
var DP_HI = [
	0.0,
	5.84962487220764160156e-01 // 0x3FE2B803, 0x40000000
];
var DP_LO = [
	0.0,
	1.35003920212974897128e-08 // 0x3E4CFDEB, 0x43CFD006
];

// Polynomial coefficients...
var L = [
	5.99999999999994648725e-01, // 0x3FE33333, 0x33333303
	4.28571428578550184252e-01, // 0x3FDB6DB6, 0xDB6FABFF
	3.33333329818377432918e-01, // 0x3FD55555, 0x518F264D
	2.72728123808534006489e-01, // 0x3FD17460, 0xA91D4101
	2.30660745775561754067e-01, // 0x3FCD864A, 0x93C9DB65
	2.06975017800338417784e-01  // 0x3FCA7E28, 0x4A454EEF
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyvalL = evalpoly( L );


// MAIN //

/**
* Computes \\(\operatorname{log2}(ax)\\).
*
* @private
* @param {number} ax - absolute value of `x`
* @param {number} ahx - high word of `ax`
* @returns {NumberArray} tuple comprised of high and low parts
*
* @example
* var t = log2ax( 9.0, 1075970048 ); // => [ t1, t2 ]
* // returns [ 3.169923782348633, 0.0000012190936795504075 ]
*/
function log2ax( ax, ahx ) {
	var tmp;
	var ss;  // `hs + ls`
	var s2;  // `ss` squared
	var hs;
	var ls;
	var ht;
	var lt;
	var bp;  // `BP` constant
	var dp;  // `DP` constant
	var hp;
	var lp;
	var hz;
	var lz;
	var t1;
	var t2;
	var t;
	var r;
	var u;
	var v;
	var n;
	var j;
	var k;

	n = 0;

	// Check if `x` is subnormal...
	if ( ahx < HIGH_MIN_NORMAL_EXP ) {
		ax *= TWO53;
		n -= 53;
		ahx = getHighWord( ax );
	}
	// Extract the unbiased exponent of `x`:
	n += (ahx >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS;

	// Isolate the significand bits of `x`:
	j = (ahx & HIGH_SIGNIFICAND_MASK);

	// Normalize `ahx` by setting the (biased) exponent to `1023`:
	ahx = (j | HIGH_BIASED_EXP_0);

	// Determine the interval of `|x|` by comparing significand bits...

	// |x| < sqrt(3/2)
	if ( j <= 0x3988E ) { // 0 00000000000 00111001100010001110
		k = 0;
	}
	// |x| < sqrt(3)
	else if ( j < 0xBB67A ) { // 0 00000000000 10111011011001111010
		k = 1;
	}
	// |x| >= sqrt(3)
	else {
		k = 0;
		n += 1;
		ahx -= HIGH_MIN_NORMAL_EXP;
	}
	// Load the normalized high word into `|x|`:
	ax = setHighWord( ax, ahx );

	// Compute `ss = hs + ls = (x-1)/(x+1)` or `(x-1.5)/(x+1.5)`:
	bp = BP[ k ]; // BP[0] = 1.0, BP[1] = 1.5
	u = ax - bp; // (x-1) || (x-1.5)
	v = 1.0 / (ax + bp); // 1/(x+1) || 1/(x+1.5)
	ss = u * v;
	hs = setLowWord( ss, 0 ); // set all low word (less significant significand) bits to 0s

	// Compute `ht = ax + bp` (via manipulation, i.e., bit flipping, of the high word):
	tmp = ((ahx>>1) | HIGH_BIASED_EXP_NEG_512) + HIGH_SIGNIFICAND_HALF;
	tmp += (k << 18); // `(k<<18)` can be considered the word equivalent of `1.0` or `1.5`
	ht = setHighWord( 0.0, tmp );
	lt = ax - (ht - bp);
	ls = v * ( ( u - (hs*ht) ) - ( hs*lt ) );

	// Compute `log(ax)`...

	s2 = ss * ss;
	r = s2 * s2 * polyvalL( s2 );
	r += ls * (hs + ss);
	s2 = hs * hs;
	ht = 3.0 + s2 + r;
	ht = setLowWord( ht, 0 );
	lt = r - ((ht-3.0) - s2);

	// u+v = ss*(1+...):
	u = hs * ht;
	v = ( ls*ht ) + ( lt*ss );

	// 2/(3LN2) * (ss+...):
	hp = u + v;
	hp = setLowWord( hp, 0 );
	lp = v - (hp - u);
	hz = CP_HI * hp; // CP_HI+CP_LO = 2/(3*LN2)
	lz = ( CP_LO*hp ) + ( lp*CP ) + DP_LO[ k ];

	// log2(ax) = (ss+...)*2/(3*LN2) = n + dp + hz + lz
	dp = DP_HI[ k ];
	t = n;
	t1 = ((hz+lz) + dp) + t; // log2(ax)
	t1 = setLowWord( t1, 0 );
	t2 = lz - (((t1-t) - dp) - hz);
	return [ t1, t2 ];
} // FUNCTION log2ax()


// EXPORTS //

module.exports = log2ax;

},{"@stdlib/math/base/tools/evalpoly":90,"@stdlib/math/base/utils/float64-get-high-word":98,"@stdlib/math/base/utils/float64-set-high-word":105,"@stdlib/math/base/utils/float64-set-low-word":107,"@stdlib/math/constants/float64-exponent-bias":115}],79:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );


// VARIABLES //

// 1/LN2
var INV_LN2 = 1.44269504088896338700e+00; // 0x3FF71547, 0x652B82FE

// High (24 bits): 1/LN2
var INV_LN2_HI = 1.44269502162933349609e+00; // 0x3FF71547, 0x60000000

// Low: 1/LN2
var INV_LN2_LO = 1.92596299112661746887e-08; // 0x3E54AE0B, 0xF85DDF44

// Polynomial coefficients for `x - x^2/2 + x^3/3 - x^4/4`...
var W = [
	0.5,
	-0.3333333333333333333333,
	0.25
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyvalW = evalpoly( W );


// MAIN //

/**
* Computes \\(\operatorname{log}(x)\\) assuming \\(|1-x|\\) is small and using the approximation \\(x - x^2/2 + x^3/3 - x^4/4\\).
*
* @private
* @param {number} ax - absolute value of `x`
* @returns {NumberArray} tuple comprised of high and low parts
*
* @example
* var t = logx( 9.0 ); // => [ t1, t2 ]
* // returns [ -1265.7236328125, -0.0008163940840404393 ]
*/
function logx( ax ) {
	var t2;
	var t1;
	var t;
	var w;
	var u;
	var v;

	t = ax - 1.0; // `t` has `20` trailing zeros
	w = t * t * polyvalW( t );
	u = INV_LN2_HI * t; // `INV_LN2_HI` has `21` significant bits
	v = ( t*INV_LN2_LO ) - ( w*INV_LN2 );
	t1 = u + v;
	t1 = setLowWord( t1, 0 );
	t2 = v - (t1 - u);
	return [ t1, t2 ];
} // end FUNCTION logx()


// EXPORTS //

module.exports = logx;

},{"@stdlib/math/base/tools/evalpoly":90,"@stdlib/math/base/utils/float64-set-low-word":107}],80:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var uint32ToInt32 = require( '@stdlib/math/base/utils/uint32-to-int32' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff;

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff;

// 0x41e00000 = 1105199104 => 0 10000011110 00000000000000000000 => biased exponent: 1054 = 31+1023 => 2^31
var HIGH_BIASED_EXP_31 = 0x41e00000;

// 0x43f00000 = 1139802112 => 0 10000111111 00000000000000000000 => biased exponent: 1087 = 64+1023 => 2^64
var HIGH_BIASED_EXP_64 = 0x43f00000;

// 0x40900000 = 1083179008 => 0 10000001001 00000000000000000000 => biased exponent: 1033 = 10+1023 => 2^10 = 1024
var HIGH_BIASED_EXP_10 = 0x40900000;

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000;

// 0x4090cc00 = 1083231232 => 0 10000001001 00001100110000000000
var HIGH_1075 = 0x4090cc00;

// 0xc090cc00 = 3230714880 => 1 10000001001 00001100110000000000
var HIGH_NEG_1075 = 0xc090cc00;

var HIGH_NUM_NONSIGN_BITS = 31;

var HUGE = 1.0e300;
var TINY = 1.0e-300;

// -(1024-log2(ovfl+.5ulp))
var OVT = 8.0085662595372944372e-17;


// MAIN //

/**
* Evaluates the exponential function.
*
* #### Method
*
* 1. Let \\(x = 2^n (1+f)\\).
*
* 2. Compute \\(\operatorname{log2}(x)\\) as
*
*   ``` tex
*   \operatorname{log2}(x) = w_1 + w_2
*   ```
*
*   where \\(w_1\\) has \\(53 - 24 = 29\\) bit trailing zeros.
*
* 3. Compute
*
*   ``` tex
*   y \cdot \operatorname{log2}(x) = n + y^\prime
*   ```
*
*   by simulating multi-precision arithmetic, where \\(|y^\prime| \leq 0.5\\).
*
* 4. Return
*
*   ``` tex
*   x^y = 2^n e^{y^\prime \cdot \mathrm{log2}}
*   ```
*
* #### Special Cases
*
* ``` tex
* \begin{align*}
* x^{\mathrm{NaN}} &= \mathrm{NaN} & \\
* (\mathrm{NaN})^y &= \mathrm{NaN} & \\
* 1^y &= 1 & \\
* x^0 &= 1 & \\
* x^1 &= x & \\
* (\pm 0)^\infty &= +0 & \\
* (\pm 0)^{-\infty} &= +\infty & \\
* (+0)^y &= +0 & \mathrm{if}\ y > 0 \\
* (+0)^y &= +\infty & \mathrm{if}\ y < 0 \\
* (-0)^y &= -\infty & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= +\infty & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= -0 & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y > 0 \\
* (-0)^y &= +0 & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y > 0 \\
* (-1)^{\pm\infty} &= \mathrm{NaN} & \\
* x^{\infty} &= +\infty & |x| > 1 \\
* x^{\infty} &= +0 & |x| < 1 \\
* x^{-\infty} &= +0 & |x| > 1 \\
* x^{-\infty} &= +\infty & |x| < 1 \\
* (-\infty)^y &= (-0)^y & \\
* \infty^y &= +0 & y < 0 \\
* \infty^y &= +\infty & y > 0 \\
* x^y &= \mathrm{NaN} & \mathrm{if}\ y\ \mathrm{is\ not\ a\ finite\ integer\ and}\ x < 0
* \end{align*}
* ```
*
*
* #### Notes
*
* - \\(\operatorname{pow}(x,y)\\) returns \\(x^y\\) nearly rounded. In particular, \\(\operatorname{pow}(<\mathrm{integer}>,<\mathrm{integer}>)\\) __always__ returns the correct integer, provided the value is representable.
* - The hexadecimal values shown in the source code are the intended values for used constants. Decimal values may be used, provided the compiler will accurately convert decimal to binary in order to produce the hexadecimal values.
*
*
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* @example
* var v = pow( 4.0, 0.5 );
* // returns 2.0
*
* @example
* var v = pow( 100.0, 0.0 );
* // returns 1.0
*
* @example
* var v = pow( Math.PI, 5.0 );
* // returns ~306.0197
*
* @example
* var v = pow( Math.PI, -0.2 );
* // returns ~0.7954
*
* @example
* var v = pow( NaN, 3.0 );
* // returns NaN
*
* @example
* var v = pow( 5.0, NaN );
* // returns NaN
*
* @example
* var v = pow( NaN, NaN );
* // returns NaN
*/
function pow( x, y ) {
	var ahx; // absolute value high word `x`
	var ahy; // absolute value high word `y`
	var ax;  // absolute value `x`
	var hx;  // high word `x`
	var lx;  // low word `x`
	var hy;  // high word `y`
	var ly;  // low word `y`
	var sx;  // sign `x`
	var sy;  // sign `y`
	var y1;
	var hp;
	var lp;
	var w;
	var t;
	var z;   // y prime
	var j;
	var i;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	// Split `y` into high and low words:
	hy = getHighWord( y );
	ly = getLowWord( y );

	// Special cases `y`...
	if ( ly === 0 ) {
		if ( y === 0.0 ) {
			return 1.0;
		}
		if ( y === 1.0 ) {
			return x;
		}
		if ( y === -1.0 ) {
			return 1.0 / x;
		}
		if ( y === 0.5 ) {
			return sqrt( x );
		}
		if ( y === -0.5 ) {
			return 1.0 / sqrt( x );
		}
		if ( y === 2.0 ) {
			return x * x;
		}
		if ( y === 3.0 ) {
			return x * x * x;
		}
		if ( y === 4.0 ) {
			x *= x;
			return x * x;
		}
		if ( isInfinite( y ) ) {
			return yIsInfinite( x, y );
		}
	}
	// Split `x` into high and low words:
	hx = getHighWord( x );
	lx = getLowWord( x );

	// Special cases `x`...
	if ( lx === 0 ) {
		if ( hx === 0 ) {
			return xIsZero( x, y );
		}
		if ( x === 1.0 ) {
			return 1.0;
		}
		if (
			x === -1.0 &&
			isOdd( y )
		) {
			return -1.0;
		}
		if ( isInfinite( x ) ) {
			if ( x === NINF ) {
				// pow( 1/x, -y )
				return pow( -0.0, -y );
			}
			if ( y < 0.0 ) {
				return 0.0;
			}
			return PINF;
		}
	}
	if (
		x < 0.0 &&
		isInteger( y ) === false
	) {
		// signal NaN...
		return (x-x)/(x-x);
	}
	ax = abs( x );

	// Remove the sign bits (i.e., get absolute values):
	ahx = (hx & ABS_MASK);
	ahy = (hy & ABS_MASK);

	// Extract the sign bits:
	sx = (hx >>> HIGH_NUM_NONSIGN_BITS);
	sy = (hy >>> HIGH_NUM_NONSIGN_BITS);

	// Determine the sign of the result...
	if ( sx && isOdd( y ) ) {
		sx = -1.0;
	} else {
		sx = 1.0;
	}
	// Case 1: `|y|` is huge...

	// |y| > 2^31
	if ( ahy > HIGH_BIASED_EXP_31 ) {
		// `|y| > 2^64`, then must over- or underflow...
		if ( ahy > HIGH_BIASED_EXP_64 ) {
			return yIsHuge( x, y );
		}
		// Over- or underflow if `x` is not close to unity...

		if ( ahx < HIGH_MAX_NEAR_UNITY ) {
			// y < 0
			if ( sy === 1 ) {
				// signal overflow...
				return sx * HUGE * HUGE;
			}
			// signal underflow...
			return sx * TINY * TINY;
		}
		if ( ahx > HIGH_BIASED_EXP_0 ) {
			// y > 0
			if ( sy === 0 ) {
				// signal overflow...
				return sx * HUGE * HUGE;
			}
			// signal underflow...
			return sx * TINY * TINY;
		}
		// At this point, `|1-x|` is tiny (`<= 2^-20`). Suffice to compute `log(x)` by `x - x^2/2 + x^3/3 - x^4/4`.
		t = logx( ax );
	}
	// Case 2: `|y|` is not huge...
	else {
		t = log2ax( ax, ahx );
	}
	// Split `y` into `y1 + y2` and compute `(y1+y2) * (t1+t2)`...
	y1 = setLowWord( y, 0 );
	lp = ( (y-y1)*t[0] ) + ( y*t[1] );
	hp = y1 * t[0];
	z = lp + hp;

	// Note: *can* be more performant to use `getHighWord` and `getLowWord` directly, but using `toWords` looks cleaner.
	w = toWords( z );
	j = uint32ToInt32( w[0] );
	i = uint32ToInt32( w[1] );

	// z >= 1024
	if ( j >= HIGH_BIASED_EXP_10 ) {
		// z > 1024
		if ( ((j-HIGH_BIASED_EXP_10)|i) !== 0 ) {
			// signal overflow...
			return sx * HUGE * HUGE;
		}
		else if ( (lp+OVT) > (z-hp) ) {
			// signal overflow...
			return sx * HUGE * HUGE;
		}
	}
	// z <= -1075
	else if ( (j&ABS_MASK) >= HIGH_1075 ) {
		// z < -1075
		if ( ((j-HIGH_NEG_1075)|i) !== 0 ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
		else if ( lp <= (z-hp) ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
	}
	// Compute `2^(hp+lp)`...
	z = pow2( j, hp, lp );

	return sx * z;
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":78,"./logx.js":79,"./pow2.js":81,"./x_is_zero.js":82,"./y_is_huge.js":83,"./y_is_infinite.js":84,"@stdlib/math/base/assert/is-infinite":38,"@stdlib/math/base/assert/is-integer":40,"@stdlib/math/base/assert/is-nan":42,"@stdlib/math/base/assert/is-odd":46,"@stdlib/math/base/special/abs":63,"@stdlib/math/base/special/sqrt":87,"@stdlib/math/base/utils/float64-get-high-word":98,"@stdlib/math/base/utils/float64-get-low-word":100,"@stdlib/math/base/utils/float64-set-low-word":107,"@stdlib/math/base/utils/float64-to-words":110,"@stdlib/math/base/utils/uint32-to-int32":113,"@stdlib/math/constants/float64-ninf":121,"@stdlib/math/constants/float64-pinf":122}],81:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var uint32ToInt32 = require( '@stdlib/math/base/utils/uint32-to-int32' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var LN2 = require( '@stdlib/math/constants/float64-ln-two' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff;

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff;

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000;

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000;

// TODO: consider making into an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20;

// High: LN2
var LN2_HI = 6.93147182464599609375e-01; // 0x3FE62E43, 0x00000000

// Low: LN2
var LN2_LO = -1.90465429995776804525e-09; // 0xBE205C61, 0x0CA86C39

// Polynomial coefficients...
var P = [
	1.66666666666666019037e-01,  // 0x3FC55555, 0x5555553E
	-2.77777777770155933842e-03, // 0xBF66C16C, 0x16BEBD93
	6.61375632143793436117e-05,  // 0x3F11566A, 0xAF25DE2C
	-1.65339022054652515390e-06, // 0xBEBBBD41, 0xC5D26BF1
	4.13813679705723846039e-08   // 0x3E663769, 0x72BEA4D0
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyvalP = evalpoly( P );


// MAIN //

/**
* Computes \\(2^{\mathrm{hp} + \mathrm{lp}\\).
*
* @private
* @param {number} j - high word of `hp + lp`
* @param {number} hp - first power summand
* @param {number} lp - second power summand
* @returns {number} function value
*
* @example
* var z = pow2( 1065961648, -0.3398475646972656, -0.000002438187359100815 );
* // returns 0.012345679012345678
*/
function pow2( j, hp, lp ) {
	var tmp;
	var t1;
	var t;
	var r;
	var u;
	var v;
	var w;
	var z;
	var n;
	var i;
	var k;

	i = (j & ABS_MASK);
	k = (i>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS;
	n = 0;

	// `|z| > 0.5`, set `n = z+0.5`
	if ( i > HIGH_BIASED_EXP_NEG_1 ) {
		n = j + (HIGH_MIN_NORMAL_EXP>>(k+1));
		k = ((n & ABS_MASK)>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS; // new k for n
		tmp = ((n & ~(HIGH_SIGNIFICAND_MASK >> k)));
		t = setHighWord( 0.0, tmp );
		n = ((n & HIGH_SIGNIFICAND_MASK)|HIGH_MIN_NORMAL_EXP) >>
			(HIGH_NUM_SIGNIFICAND_BITS-k);
		if ( j < 0 ) {
			n = -n;
		}
		hp -= t;
	}
	t = lp + hp;
	t = setLowWord( t, 0 );
	u = t * LN2_HI;
	v = ( (lp - (t-hp))*LN2 ) + ( t*LN2_LO );
	z = u + v;
	w = v - (z - u);
	t = z * z;
	t1 = z - ( t*polyvalP( t ) );
	r = ( (z*t1) / (t1-2.0) ) - ( w + (z*w) );
	z = 1.0 - (r - z);
	j = getHighWord( z );
	j = uint32ToInt32( j );
	j += (n << HIGH_NUM_SIGNIFICAND_BITS);

	// Check for subnormal output...
	if ( (j>>HIGH_NUM_SIGNIFICAND_BITS) <= 0 ) {
		z = ldexp( z, n );
	} else {
		z = setHighWord( z, j );
	}
	return z;
} // end FUNCTION pow2()


// EXPORTS //

module.exports = pow2;

},{"@stdlib/math/base/special/ldexp":75,"@stdlib/math/base/tools/evalpoly":90,"@stdlib/math/base/utils/float64-get-high-word":98,"@stdlib/math/base/utils/float64-set-high-word":105,"@stdlib/math/base/utils/float64-set-low-word":107,"@stdlib/math/base/utils/uint32-to-int32":113,"@stdlib/math/constants/float64-exponent-bias":115,"@stdlib/math/constants/float64-ln-two":117}],82:[function(require,module,exports){
'use strict';

// MODULES //

var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Evaluates the exponential function when  \\(|x| = 0\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 0.0, 2 );
* // returns 0.0
*
* @example
* var v = pow( -0.0, -9 );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = pow( 0.0, -9 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( -0.0, 9 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( 0.0, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( 0.0, Number.POSITIVE_INFINITY );
* // returns 0.0
*/
function pow( x, y ) {
	if ( y === NINF ) {
		return PINF;
	}
	if ( y === PINF ) {
		return 0.0;
	}
	if ( y > 0.0 ) {
		if ( isOdd( y ) ) {
			return x; // handles +-0
		}
		return 0.0;
	}
	// y < 0.0
	if ( isOdd( y ) ) {
		return copysign( PINF, x ); // handles +-0
	}
	return PINF;
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"@stdlib/math/base/assert/is-odd":46,"@stdlib/math/base/special/copysign":65,"@stdlib/math/constants/float64-ninf":121,"@stdlib/math/constants/float64-pinf":122}],83:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff;

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff;

var HUGE = 1.0e300;
var TINY = 1.0e-300;


// MAIN //

/**
* Evaluates the exponential function when \\(|y| > 2^64\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} overflow or underflow result
*
* @example
* var v = pow( 9.0, 3.6893488147419103e19 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( -3.14, -3.6893488147419103e19 );
* // returns 0.0
*/
function pow( x, y ) {
	var ahx;
	var hx;

	hx = getHighWord( x );
	ahx = (hx & ABS_MASK);

	if ( ahx <= HIGH_MAX_NEAR_UNITY ) {
		if ( y < 0 ) {
			// signal overflow...
			return HUGE * HUGE;
		}
		// signal underflow...
		return TINY * TINY;
	}
	// `x` has a biased exponent greater than or equal to `0`...

	if ( y > 0 ) {
		// signal overflow...
		return HUGE * HUGE;
	}
	// signal underflow...
	return TINY * TINY;
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"@stdlib/math/base/utils/float64-get-high-word":98}],84:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\( y = \pm \infty\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( -1.0, Number.POSITIVE_INFINITY );
* // returns NaN
*
* @example
* var v = pow( -1.0, Number.NEGATIVE_INFINITY );
* // returns NaN
*
* @example
* var v = pow( 1.0, Number.POSITIVE_INFINITY );
* // returns 1.0
*
* @example
* var v = pow( 1.0, Number.NEGATIVE_INFINITY );
* // returns 1.0
*
* @example
* var v = pow( 0.5, Number.POSITIVE_INFINITY );
* // returns 0.0
*
* @example
* var v = pow( 0.5, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( 1.5, Number.NEGATIVE_INFINITY );
* // returns 0.0
*
* @example
* var v = pow( 1.5, Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*/
function pow( x, y ) {
	if ( x === -1.0 ) {
		// Julia (0.4.2) and Python (2.7.9) return `1.0` (WTF???). JavaScript (`Math.pow`), R, and libm return `NaN`. We choose `NaN`, as the value is indeterminate; i.e., we cannot determine whether `y` is odd, even, or somewhere in between.
		return (x-x)/(x-x); // signal NaN
	}
	if ( x === 1.0 ) {
		return 1.0;
	}
	// (|x| > 1 && y === NINF) || (|x| < 1 && y === PINF)
	if ( (abs(x) < 1.0) === (y === PINF) ) {
		return 0.0;
	}
	// (|x| > 1 && y === PINF) || (|x| < 1 && y === NINF)
	return PINF;
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"@stdlib/math/base/special/abs":63,"@stdlib/math/constants/float64-pinf":122}],85:[function(require,module,exports){
'use strict';

// TODO: implementation

/**
* Round a numeric value to the nearest integer.
*
* @module @stdlib/math/base/special/round
*
* @example
* var round = require( '@stdlib/math/base/special/round' );
*
* var v = round( -4.2 );
* // returns -4.0
*
* v = round( -4.5 );
* // returns -4.0
*
* v = round( -4.6 );
* // returns -5.0
*
* v = round( 9.99999 );
* // returns 10.0
*
* v = round( 9.5 );
* // returns 10.0
*
* v = round( 9.2 );
* // returns 9.0
*
* v = round( 0.0 );
* // returns 0.0
*
* v = round( -0.0 );
* // returns -0.0
*
* v = round( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* v = round( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":86}],86:[function(require,module,exports){
'use strict';

// TODO: implementation

/**
* Rounds a numeric value to the nearest integer.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = round( -4.2 );
* // returns -4.0
*
* @example
* var v = round( -4.5 );
* // returns -4.0
*
* @example
* var v = round( -4.6 );
* // returns -5.0
*
* @example
* var v = round( 9.99999 );
* // returns 10.0
*
* @example
* var v = round( 9.5 );
* // returns 10.0
*
* @example
* var v = round( 9.2 );
* // returns 9.0
*
* @example
* var v = round( 0.0 );
* // returns 0.0
*
* @example
* var v = round( -0.0 );
* // returns -0.0
*
* @example
* var v = round( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = round( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round;


// EXPORTS //

module.exports = round;

},{}],87:[function(require,module,exports){
'use strict';

/**
* Compute the principal square root.
*
* @module @stdlib/math/base/special/sqrt
*
* @example
* var sqrt = require( '@stdlib/math/base/special/sqrt' );
*
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/

// MODULES //

var sqrt = Math.sqrt;


// EXPORTS //

module.exports = sqrt;

},{}],88:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* #### Notes
*
* * The implementation uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*
* @example
* var v = evalpoly( [3.0,2.0,1.0], 10.0 ); // 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*/
function evalpoly( c, x ) {
	var p;
	var i;

	i = c.length;
	if ( i < 2 || x === 0.0 ) {
		if ( i === 0 ) {
			return 0.0;
		}
		return c[ 0 ];
	}
	i -= 1;
	p = ( c[ i ] * x ) + c[ i-1 ];
	i -= 2;
	while ( i >= 0 ) {
		p = ( p * x ) + c[ i ];
		i -= 1;
	}
	return p;
} // end FUNCTION evalpoly()


// EXPORTS //

module.exports = evalpoly;

},{}],89:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( './evalpoly.js' );


// MAIN //

/**
* Generates a function for evaluating a polynomial.
*
* #### Notes
*
* * The compiled function uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @returns {Function} function for evaluating a polynomial
*
* @example
* var polyval = evalpoly.factory( [3.0,2.0,1.0] );
*
* var v = polyval( 10.0 ); // => 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* v = polyval( 5.0 ); // => 3*5^0 + 2*5^1 + 1*5^2
* // returns 38.0
*/
function factory( c ) {
	var f;
	var n;
	var m;
	var i;

	// Avoid exceeding the maximum stack size on V8 :(. Note that the choice of `500` was empirically determined...
	if ( c.length > 500 ) {
		return polyval;
	}
	// Code generation. Start with the function definition...
	f = 'return function evalpoly(x){';

	// Create the function body...
	n = c.length;

	// If no coefficients, the function always returns 0...
	if ( n === 0 ) {
		f += 'return 0.0;';
	}
	// If only one coefficient, the function always returns that coefficient...
	else if ( n === 1 ) {
		f += 'return ' + c[ 0 ] + ';';
	}
	// If more than one coefficient, apply Horner's method...
	else {
		// If `x == 0`, return the first coefficient...
		f += 'if(x===0.0){return ' + c[ 0 ] + ';}';

		// Otherwise, evaluate the polynomial...
		f += 'return ' + c[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += c[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';
	}
	// Close the function:
	f += '}';

	// Add a source directive for debugging:
	f += '//# sourceURL=evalpoly.factory.js';

	// Create the function in the global scope:
	return ( new Function( f ) )(); // eslint-disable-line no-new-func

	/*
	* returns
	*    function evalpoly( x ) {
	*        if ( x === 0.0 ) {
	*            return c[ 0 ];
	*        }
	*        return c[0]+x*(c[1]+x*(c[2]+x*(c[3]+...+x*(c[n-2]+x*c[n-1]))));
	*    }
	*/

	/**
	* Evaluates a polynomial.
	*
	* @private
	* @param {number} x - value at which to evaluate a polynomial
	* @returns {number} evaluated polynomial
	*/
	function polyval( x ) {
		return evalpoly( c, x );
	} // end FUNCTON polyval()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./evalpoly.js":88}],90:[function(require,module,exports){
'use strict';

/**
* Evaluate a polynomial.
*
* @module @stdlib/math/base/tools/evalpoly
*
* @example
* var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
*
* var v = evalpoly( [3.0,2.0,1.0], 10.0 ); // 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* @example
* var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
*
* var polyval = evalpoly.factory( [3.0,2.0,1.0] );
*
* var v = polyval( 10.0 ); // => 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* v = polyval( 5.0 ); // => 3*5^0 + 2*5^1 + 1*5^2
* // returns 38.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var evalpoly = require( './evalpoly.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( evalpoly, 'factory', factory );


// EXPORTS //

module.exports = evalpoly;

},{"./evalpoly.js":88,"./factory.js":89,"@stdlib/utils/define-read-only-property":129}],91:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var EXP_MASK = require( '@stdlib/math/constants/float64-high-word-exponent-mask' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// MAIN //

/**
* Returns an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {integer32} unbiased exponent
*
* @example
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
* @example
* var exp = exponent( -3.14 );
* // returns 1
* @example
* var exp = exponent( 0.0 );
* // returns 0
* @example
* var exp = exponent( NaN );
* // returns 1024
*/
function exponent( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) which contains the exponent:
	var high = getHighWord( x );

	// Apply a mask to isolate only the exponent bits and then shift off all bits which are part of the fraction:
	high = ( high & EXP_MASK ) >>> 20;

	// Remove the bias and return:
	return high - BIAS;
} // end FUNCTION exponent()


// EXPORTS //

module.exports = exponent;

},{"@stdlib/math/base/utils/float64-get-high-word":98,"@stdlib/math/constants/float64-exponent-bias":115,"@stdlib/math/constants/float64-high-word-exponent-mask":116}],92:[function(require,module,exports){
'use strict';

/**
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-exponent
*
* @example
* var exponent = require( '@stdlib/math/base/utils/float64-exponent );
*
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* exp = exponent( -3.14 );
* // returns 1
*
* exp = exponent( 0.0 );
* // returns 0
*
* exp = exponent( NaN );
* // returns 1024
*/

// MODULES //

var exponent = require( './exponent.js' );


// EXPORTS //

module.exports = exponent;

},{"./exponent.js":91}],93:[function(require,module,exports){
'use strict';

// MODULES //

var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Creates a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {uinteger32} high - higher order word (unsigned 32-bit integer)
* @param {uinteger32} low - lower order word (unsigned 32-bit integer)
* @returns {number} floating-point number
*
* @example
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
* @example
* var v = fromWords( 3221823995, 1413754136 );
* // returns 3.141592653589793
* @example
* var v = fromWords( 0, 0 );
* // returns 0.0
* @example
* var v = fromWords( 2147483648, 0 );
* // returns -0.0
* @example
* var v = fromWords( 2146959360, 0 );
* // returns NaN
* @example
* var v = fromWords( 2146435072, 0 );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = fromWords( 4293918720, 0 );
* // returns Number.NEGATIVE_INFINITY
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
} // end FUNCTION fromWords()


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":95}],94:[function(require,module,exports){
'use strict';

/**
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/math/base/utils/float64-from-words
*
* @example
* var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
*
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* v = fromWords( 3221823995, 1413754136 );
* // returns 3.141592653589793
*
* v = fromWords( 0, 0 );
* // returns 0.0
*
* v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* v = fromWords( 2146959360, 0 );
* // returns NaN
*
* v = fromWords( 2146435072, 0 );
* // returns Number.POSITIVE_INFINITY
*
* v = fromWords( 4293918720, 0 );
* // returns Number.NEGATIVE_INFINITY
*/

// MODULES //

var fromWords = require( './from_words.js' );


// EXPORTS //

module.exports = fromWords;

},{"./from_words.js":93}],95:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}


// EXPORTS //

module.exports = {
	'HIGH': HIGH,
	'LOW': LOW
};

},{"@stdlib/assert/is-little-endian":16}],96:[function(require,module,exports){
'use strict';

// MODULES //

var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - input value
* @returns {uinteger32} higher order word
*
* @example
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/
function getHighWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ HIGH ];
} // end FUNCTION getHighWord()


// EXPORTS //

module.exports = getHighWord;

},{"./high.js":97}],97:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
if ( isLittleEndian === true ) {
	HIGH = 1; // second index
} else {
	HIGH = 0; // first index
}


// EXPORTS //

module.exports = HIGH;

},{"@stdlib/assert/is-little-endian":16}],98:[function(require,module,exports){
'use strict';

/**
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-get-high-word
*
* @example
* var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var getHighWord = require( './get_high_word.js' );


// EXPORTS //

module.exports = getHighWord;

},{"./get_high_word.js":96}],99:[function(require,module,exports){
'use strict';

// MODULES //

var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns a 32-bit unsigned integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - input value
* @returns {uinteger32} lower order word
*
* @example
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/
function getLowWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ LOW ];
} // end FUNCTION getLowWord()


// EXPORTS //

module.exports = getLowWord;

},{"./low.js":101}],100:[function(require,module,exports){
'use strict';

/**
* Returns an unsigned 32-bit integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-get-low-word
*
* @example
* var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
*
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/

// MODULES //

var getLowWord = require( './get_low_word.js' );


// EXPORTS //

module.exports = getLowWord;

},{"./get_low_word.js":99}],101:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

},{"@stdlib/assert/is-little-endian":16}],102:[function(require,module,exports){
'use strict';

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/math/base/utils/float64-normalize
*
* @example
* var normalize = require( '@stdlib/math/base/utils/float64-normalize' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*/

// MODULES //

var normalize = require( './normalize.js' );


// EXPORTS //

module.exports = normalize;

},{"./normalize.js":103}],103:[function(require,module,exports){
'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/math/constants/float64-smallest-normal' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );


// VARIABLES //

// (1<<52)
var SCALAR = 4503599627370496;


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {number} x - input value
* @returns {NumberArray} a two-element array containing `y` and `exp`
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( 0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( Number.POSITIVE_INFINITY );
* // returns [ Number.POSITIVE_INFINITY, 0 ]
*
* @example
* var out = normalize( Number.NEGATIVE_INFINITY );
* // returns [ Number.NEGATIVE_INFINIY, 0 ]
*
* @example
* var out = normalize( NaN );
* // returns [ NaN, 0 ]
*/
function normalize( x ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		return [ x, 0 ];
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		return [ x*SCALAR, -52 ];
	}
	return [ x, 0 ];
} // end FUNCTION normalize()


// EXPORTS //

module.exports = normalize;

},{"@stdlib/math/base/assert/is-infinite":38,"@stdlib/math/base/assert/is-nan":42,"@stdlib/math/base/special/abs":63,"@stdlib/math/constants/float64-smallest-normal":123}],104:[function(require,module,exports){
arguments[4][97][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":16,"dup":97}],105:[function(require,module,exports){
'use strict';

/**
* Set the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-set-high-word
*
* @example
* var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
*
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
* var PINF = require( '@stdlib/math/constants/float64-pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var setHighWord = require( './set_high_word.js' );


// EXPORTS //

module.exports = setHighWord;

},{"./set_high_word.js":106}],106:[function(require,module,exports){
'use strict';

// MODULES //

var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the more significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - double
* @param {uinteger32} high - unsigned 32-bit integer to replace the higher order word of `x`
* @returns {number} double having the same lower order word as `x`
*
* @example
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); //  => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var PINF = require( '@stdlib/math/constants/float64-pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/
function setHighWord( x, high ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ HIGH ] = ( high >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
} // end FUNCTION setHighWord()


// EXPORTS //

module.exports = setHighWord;

},{"./high.js":104}],107:[function(require,module,exports){
'use strict';

/**
* Set the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-set-low-word
*
* @example
* var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
*
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
* var PINF = require( '@stdlib/math/constants/float64-pinf' );
* var NINF = require( '@stdlib/math/constants/float64-ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/

// MODULES //

var setLowWord = require( './set_low_word.js' );


// EXPORTS //

module.exports = setLowWord;

},{"./set_low_word.js":109}],108:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":16,"dup":101}],109:[function(require,module,exports){
'use strict';

// MODULES //

var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the less significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - double
* @param {uinteger32} low - unsigned 32-bit integer to replace the lower order word of `x`
* @returns {number} double having the same higher order word as `x`
*
* @example
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var PINF = require( '@stdlib/math/constants/float64-pinf' );
* var NINF = require( '@stdlib/math/constants/float64-ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/
function setLowWord( x, low ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ LOW ] = ( low >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
} // end FUNCTION setLowWord()


// EXPORTS //

module.exports = setLowWord;

},{"./low.js":108}],110:[function(require,module,exports){
'use strict';

/**
* Split a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/math/base/utils/float64-to-words
*
* @example
* var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/

// MODULES //

var toWords = require( './to_words.js' );


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":112}],111:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":16,"dup":95}],112:[function(require,module,exports){
'use strict';

// MODULES //

var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* #### Notes
*
* ``` text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - input value
* @returns {NumberArray} two-element array containing a higher order word and a lower order word
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/
function toWords( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return [ UINT32_VIEW[ HIGH ], UINT32_VIEW[ LOW ] ];
} // end FUNCTION toWords()


// EXPORTS //

module.exports = toWords;

},{"./indices.js":111}],113:[function(require,module,exports){
'use strict';

/**
* Convert an unsigned 32-bit integer to a signed 32-bit integer.
*
* @module @stdlib/math/base/utils/uint32-to-int32
*
* @example
* var float64ToUint32 = require( '@stdlib/math/base/utils/float64-to-uint32' );
* var uint32ToInt32 = require( '@stdlib/math/base/utils/uint32-to-int32' );
*
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/

// MODULES //

var uint32ToInt32 = require( './uint32_to_int32.js' );


// EXPORTS //

module.exports = uint32ToInt32;

},{"./uint32_to_int32.js":114}],114:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Converts an unsigned 32-bit integer to a signed 32-bit integer.
*
* @param {uinteger32} x - unsigned 32-bit integer
* @returns {integer32} signed 32-bit integer
*
* @example
* var float64ToUint32 = require( '@stdlib/math/base/utils/float64-to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* @example
* var float64ToUint32 = require( '@stdlib/math/base/utils/float64-to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/
function uint32ToInt32( x ) {
	// NOTE: we could also use typed-arrays to achieve the same end.
	return x|0; // asm type annotation
} // end FUNCTION uint32ToInt32()


// EXPORTS //

module.exports = uint32ToInt32;

},{}],115:[function(require,module,exports){
'use strict';

/**
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/math/constants/float64-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* The bias of a double-precision floating-point number's exponent. The bias can be computed via
*
* ``` tex
* \mathrm{bias} = 2^{k-1} - 1
* ```
*
* where \\(k\\) is the number of bits in the exponent; here, \\(k = 11\\).
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_EXPONENT_BIAS = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_EXPONENT_BIAS;

},{}],116:[function(require,module,exports){
'use strict';

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/math/constants/float64-high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ``` binarystring
* 0 11111111111 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7ff00000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_EXPONENT_MASK = 0x7ff00000;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;

},{}],117:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of `2`.
*
* @module @stdlib/math/constants/float64-ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/math/constants/float64-ln-two' );
* // returns 0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `2`.
*
* ``` tex
* \ln 2
* ```
*
* @constant
* @type {number}
* @default 0.6931471805599453
*/
var LN2 = 6.93147180559945309417232121458176568075500134360255254120680009493393621969694715605863326996418687542001481021e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN2;

},{}],118:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/math/constants/float64-max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ``` text
* 00000000000 => 0 - BIAS = -1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default -1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;

},{}],119:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/math/constants/float64-max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ``` text
* 11111111110 => 2046 - BIAS = 1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT;

},{}],120:[function(require,module,exports){
'use strict';

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/math/constants/float64-min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ``` text
* -(BIAS+(52-1)) = -(1023+51) = -1074
* ```
*
* where `BIAS = 1023` and `52` is the number of digits in the significand.
*
* @constant
* @type {integer32}
* @default -1074
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;

},{}],121:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/math/constants/float64-ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/math/constants/float64-ninf' );
* // returns Number.NEGATIVE_INFINITY
*/


// MAIN //

/**
* Double-precision floating-point negative infinity has the bit sequence
*
* ``` binarystring
* 1 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.NEGATIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_NINF = Number.NEGATIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_NINF;

},{}],122:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/math/constants/float64-pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/math/constants/float64-pinf' );
* // returns Number.POSITIVE_INFINITY
*/


// MAIN //

/**
* Double-precision floating-point positive infinity has the bit sequence
*
* ``` binarystring
* 0 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.POSITIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_PINF = Number.POSITIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_PINF;

},{}],123:[function(require,module,exports){
'use strict';

/**
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/math/constants/float64-smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/math/constants/float64-smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number has the value
*
* ``` tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 0 00000000001 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 2.2250738585072014e-308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_SMALLEST_NORMAL = 2.2250738585072014e-308;


// EXPORTS //

module.exports = FLOAT64_SMALLEST_NORMAL;

},{}],124:[function(require,module,exports){
'use strict';

/**
* Maximum signed 32-bit integer.
*
* @module @stdlib/math/constants/int32-max
* @type {integer32}
*
* @example
* var INT32_MAX = require( '@stdlib/math/constants/int32-max' );
* // returns 2147483647
*/


// MAIN //

/**
* The maximum signed 32-bit integer is given by
*
* ``` tex
* 2^{31} - 1
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 01111111111111111111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 2147483647
*/
var INT32_MAX = 2147483647|0; // asm type annotation


// EXPORTS //

module.exports = INT32_MAX;

},{}],125:[function(require,module,exports){
'use strict';

/**
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
* @type {RegExp}
*
* @example
* var RE_FUNCTION_NAME = require( '@stdlib/utils/regexp/function-name' );
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/


// MAIN //

/**
* Captures everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* Regular expression: `/^\s*function\s*([^(]*)/i`
*
* * `/^\s*`
*   - Match zero or more spaces at beginning
* * `function`
*   - Match the word `function`
* * `\s*`
*   - Match zero or more spaces after the word `function`
* * `()`
*   - Capture
* * `[^(]*`
*   - Match anything except a left parenthesis `(` zero or more times
* * `/i`
*   - ignore case
*
* @constant
* @type {RegExp}
* @default /^\s*function\s*([^(]*)/i
*/
var RE_FUNCTION_NAME = /^\s*function\s*([^(]*)/i;


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{}],126:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );
var RE = require( '@stdlib/regexp/function-name' );
var isBuffer = require( '@stdlib/assert/is-buffer' );


// MAIN //

/**
* Determines the name of a value's constructor.
*
* @param {*} v - input value
* @returns {string} name of a value's constructor
*
* @example
* var v = constructorName( 'a' );
* // returns 'String'
* @example
* var v = constructorName( 5 );
* // returns 'Number'
* @example
* var v = constructorName( null );
* // returns 'Null'
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
* @example
* var v = constructorName( function noop(){} );
* // returns 'Function'
*/
function constructorName( v ) {
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		return RE.exec( ctor.toString() )[ 1 ];
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
} // end FUNCTION constructorName()


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":6,"@stdlib/regexp/function-name":125,"@stdlib/utils/native-class":140}],127:[function(require,module,exports){
'use strict';

/**
* Determines the name of a value's constructor.
*
* @module @stdlib/utils/constructor-name
*
* @example
* var constructorName = require( '@stdlib/utils/constructor-name' );
*
* var v = constructorName( 'a' );
* // returns 'String'
*
* v = constructorName( {} );
* // returns 'Object'
*
* v = constructorName( true );
* // returns 'Boolean'
*/

// MODULES //

var constructorName = require( './constructor_name.js' );


// EXPORTS //

module.exports = constructorName;

},{"./constructor_name.js":126}],128:[function(require,module,exports){
'use strict';

/**
* Defines a read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
* setReadOnly( obj, 'foo', 'bar' );
* obj.foo = 'boop'; // => throws
*/
function setReadOnly( obj, prop, value ) {
	Object.defineProperty( obj, prop, {
		'value': value,
		'configurable': false,
		'writable': false,
		'enumerable': true
	});
} // end FUNCTION setReadOnly()


// EXPORTS //

module.exports = setReadOnly;

},{}],129:[function(require,module,exports){
'use strict';

/**
* Defines a read-only property.
*
* @module @stdlib/utils/define-read-only-property
*
* @example
* var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
*
* var obj = {};
* setReadOnly( obj, 'foo', 'bar' );
* obj.foo = 'boop'; // => throws
*/

// MODULES //

var setReadOnly = require( './define_read_only_property.js' );


// EXPORTS //

module.exports = setReadOnly;

},{"./define_read_only_property.js":128}],130:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests for native `Symbol` support.
*
* @returns {boolean} boolean indicating if an environment has `Symbol` support
*
* @example
* var bool = hasSymbolSupport();
* // returns <boolean>
*/
function hasSymbolSupport() {
	return (
		typeof Symbol === 'function' &&
		typeof Symbol( 'foo' ) === 'symbol'
	);
} // end FUNCTION hasSymbolSupport()


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],131:[function(require,module,exports){
'use strict';

/**
* Tests for native `Symbol` support.
*
* @module @stdlib/utils/detect-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/utils/detect-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = require( './detect_symbol_support.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

},{"./detect_symbol_support.js":130}],132:[function(require,module,exports){
'use strict';

// MODULES //

var hasSymbols = require( '@stdlib/utils/detect-symbol-support' )();


// MAIN //

/**
* Tests for native `toStringTag` support.
*
* @returns {boolean} boolean indicating if an environment has `toStringTag` support
*
* @example
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/
function hasToStringTagSupport() {
	return ( hasSymbols && typeof Symbol.toStringTag === 'symbol' );
} // end FUNCTION hasToStringTagSupport()


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/utils/detect-symbol-support":131}],133:[function(require,module,exports){
'use strict';

/**
* Tests for native `toStringTag` support.
*
* @module @stdlib/utils/detect-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/utils/detect-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = require( './has_tostringtag_support.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"./has_tostringtag_support.js":132}],134:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = require( './native.js' );
} else {
	getProto = require( './polyfill.js' );
}


// EXPORTS //

module.exports = getProto;

},{"./native.js":137,"./polyfill.js":138,"@stdlib/assert/is-function":8}],135:[function(require,module,exports){
'use strict';

// MODULES //

var getProto = require( './detect.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @param {*} value - input value
* @returns {(Object|null)} prototype
*
* @example
* var proto = getPrototypeOf( {} );
* // returns {}
*/
function getPrototypeOf( value ) {
	if (
		value === null ||
		value === void 0
	) {
		return null;
	}
	// In order to ensure consistent ES5/ES6 behavior, cast input value to an object (strings, numbers, booleans); ES5 `Object.getPrototypeOf` throws when provided primitives and ES6 `Object.getPrototypeOf` casts:
	value = Object( value );

	return getProto( value );
} // end FUNCTION getPrototypeOf()


// EXPORTS //

module.exports = getPrototypeOf;

},{"./detect.js":134}],136:[function(require,module,exports){
'use strict';

/**
* Return the prototype of a provided object.
*
* @module @stdlib/utils/get-prototype-of
*
* @example
* var getPrototype = require( '@stdlib/utils/get-prototype-of' );
*
* var proto = getPrototype( {} );
* // returns {}
*/

// MODULES //

var getPrototype = require( './get_prototype_of.js' );


// EXPORTS //

module.exports = getPrototype;

},{"./get_prototype_of.js":135}],137:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],138:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );
var getProto = require( './proto.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @private
* @param {Object} obj - input object
* @returns {(Object|null)} prototype
*/
function getPrototypeOf( obj ) {
	var proto = getProto( obj );
	if ( proto || proto === null ) {
		return proto;
	}
	if ( nativeClass( obj.constructor ) === '[object Function]' ) {
		// May break if the constructor has been tampered with...
		return obj.constructor.prototype;
	}
	if ( obj instanceof Object ) {
		return Object.prototype;
	}
	// Return `null` for objects created via `Object.create( null )`. Also return `null` for cross-realm objects on browsers that lack `__proto__` support, such as IE < 11.
	return null;
} // end FUNCTION getPrototypeOf()


// EXPORTS //

module.exports = getPrototypeOf;

},{"./proto.js":139,"@stdlib/utils/native-class":140}],139:[function(require,module,exports){
'use strict';

/**
* Returns the value of the `__proto__` property.
*
* @private
* @param {Object} obj - input object
* @returns {*} value of `__proto__` property
*/
function getProto( obj ) {
	// eslint-disable-next-line no-proto
	return obj.__proto__;
} // end FUNCTION getProto()


// EXPORTS //

module.exports = getProto;

},{}],140:[function(require,module,exports){
'use strict';

/**
* Returns a string value indicating a specification defined classification of an object.
*
* @module @stdlib/utils/native-class
*
* @example
* var nativeClass = require( '@stdlib/utils/native-class' );
*
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* str = nativeClass( 5 );
* // returns '[object Number]'
*
* function Beep() {
*     return this;
* }
* str = nativeClass( new Beep() );
* // returns '[object Object]'
*/

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();


// MAIN //

var nativeClass;
if ( hasToStringTag ) {
	nativeClass = require( './polyfill.js' );
} else {
	nativeClass = require( './native_class.js' );
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":141,"./polyfill.js":142,"@stdlib/utils/detect-tostringtag-support":133}],141:[function(require,module,exports){
'use strict';

// MODULES //

var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	return toStr.call( v );
} // end FUNCTION nativeClass()


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":143}],142:[function(require,module,exports){
'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var toStringTag = require( './tostringtag.js' );
var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification of an object in environments supporting `Symbol.toStringTag`.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	var isOwn;
	var tag;
	var out;

	if ( v === null || v === void 0 ) {
		return toStr.call( v );
	}
	tag = v[ toStringTag ];
	isOwn = hasOwnProp( v, toStringTag );

	// Attempt to override the `toStringTag` property. For built-ins having a `Symbol.toStringTag` property (e.g., `JSON`, `Math`, etc), the `Symbol.toStringTag` property is read-only (e.g., , so we need to wrap in a `try/catch`.
	try {
		v[ toStringTag ] = void 0;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return toStr.call( v );
	}
	out = toStr.call( v );

	if ( isOwn ) {
		v[ toStringTag ] = tag;
	} else {
		delete v[ toStringTag ];
	}
	return out;
} // end FUNCTION nativeClass()


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":143,"./tostringtag.js":144,"@stdlib/assert/has-own-property":2}],143:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],144:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],145:[function(require,module,exports){
'use strict';

// MODULES //

var RE = require( './fixtures/re.js' );
var nodeList = require( './fixtures/nodelist.js' );
var typedarray = require( './fixtures/typedarray.js' );


// MAIN //

/**
* Checks whether a polyfill is needed when using the `typeof` operator.
*
* @private
* @returns {boolean} boolean indicating whether a polyfill is needed
*/
function check() {
	if (
		// Chrome 1-12 returns 'function' for regular expression instances (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):
		typeof RE === 'function' ||
		// Safari 8 returns 'object' for typed array and weak map constructors (underscore #1929):
		typeof typedarray === 'object' ||
		// PhantomJS 1.9 returns 'function' for `NodeList` instances (underscore #2236):
		typeof nodeList === 'function'
	) {
		return true;
	}
	return false;
} // end FUNCTION check()


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":146,"./fixtures/re.js":147,"./fixtures/typedarray.js":148}],146:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":207}],147:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],148:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],149:[function(require,module,exports){
'use strict';

/**
* Determine a value's type.
*
* @module @stdlib/utils/type-of
*
* @example
* var typeOf = require( '@stdlib/utils/type-of' );
*
* var str = typeOf( 'a' );
* // returns 'string'
*
* str = typeOf( 5 );
* // returns 'number'
*/

// MODULES //

var usePolyfill = require( './check.js' );
var typeOf = require( './typeof.js' );
var polyfill = require( './polyfill.js' );


// EXPORTS //

module.exports = ( usePolyfill() ) ? polyfill : typeOf;

},{"./check.js":145,"./polyfill.js":150,"./typeof.js":151}],150:[function(require,module,exports){
'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	return ctorName( v ).toLowerCase();
} // end FUNCTION typeOf()


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":127}],151:[function(require,module,exports){
'use strict';

// MODULES //

var ctorName = require( '@stdlib/utils/constructor-name' );


// NOTES //

/*
* Built-in `typeof` operator behavior:
*
* ``` text
* typeof null => 'object'
* typeof undefined => 'undefined'
* typeof 'a' => 'string'
* typeof 5 => 'number'
* typeof NaN => 'number'
* typeof true => 'boolean'
* typeof false => 'boolean'
* typeof {} => 'object'
* typeof [] => 'object'
* typeof function foo(){} => 'function'
* typeof function* foo(){} => 'object'
* typeof Symbol() => 'symbol'
* ```
*
*/


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	var type;

	// Address `typeof null` => `object` (see http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null):
	if ( v === null ) {
		return 'null';
	}
	type = typeof v;

	// If the `typeof` operator returned something other than `object`, we are done. Otherwise, we need to check for an internal class name or search for a constructor.
	if ( type === 'object' ) {
		return ctorName( v ).toLowerCase();
	}
	return type;
} // end FUNCTION typeOf()


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":127}],152:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],153:[function(require,module,exports){

},{}],154:[function(require,module,exports){
arguments[4][153][0].apply(exports,arguments)
},{"dup":153}],155:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],156:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":152,"ieee754":175}],157:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":177}],158:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":159,"./lib/keys.js":160}],159:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],160:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],161:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var foreach = require('foreach');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":171,"object-keys":180}],162:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],163:[function(require,module,exports){
'use strict';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};
		// jscs:disable
		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;

},{"./helpers/isFinite":164,"./helpers/isNaN":165,"./helpers/mod":166,"./helpers/sign":167,"es-to-primitive/es5":168,"has":174,"is-callable":178}],164:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],165:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],166:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],167:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],168:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":169,"is-callable":178}],169:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],170:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],171:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],172:[function(require,module,exports){
var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],173:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":172}],174:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":173}],175:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],176:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],177:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],178:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],179:[function(require,module,exports){
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};
    
    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
    if (depth === undefined) depth = 0;
    if (depth >= maxDepth && maxDepth > 0
    && obj && typeof obj === 'object') {
        return '[Object]';
    }
    
    if (seen === undefined) seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }
    
    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }
    
    if (typeof obj === 'string') {
        return inspectString(obj);
    }
    else if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    else if (obj === null) {
        return 'null';
    }
    else if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
    }
    else if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    else if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        var xs = Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    else if (isError(obj)) {
        var parts = [];
        for (var key in obj) {
            if (!has(obj, key)) continue;
            
            if (/[^\w$]/.test(key)) {
                parts.push(inspect(key) + ': ' + inspect(obj[key]));
            }
            else {
                parts.push(key + ': ' + inspect(obj[key]));
            }
        }
        if (parts.length === 0) return '[' + obj + ']';
        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
    }
    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
        return obj.inspect();
    }
    else if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
        var xs = [], keys = [];
        for (var key in obj) {
            if (has(obj, key)) keys.push(key);
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/[^\w$]/.test(key)) {
                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
            }
            else xs.push(key + ': ' + inspect(obj[key], obj));
        }
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    else return String(obj);
};

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return Object.prototype.toString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = f.toString().match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return "'" + s + "'";
    
    function lowbyte (c) {
        var n = c.charCodeAt(0);
        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
        if (x) return '\\' + x;
        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
    }
}

},{}],180:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];
var equalsConstructorPrototype = function (o) {
	var ctor = o.constructor;
	return ctor && ctor.prototype === o;
};
var excludedKeys = {
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
	$outerHeight: true,
	$outerWidth: true,
	$pageXOffset: true,
	$pageYOffset: true,
	$parent: true,
	$scrollLeft: true,
	$scrollTop: true,
	$scrollX: true,
	$scrollY: true,
	$self: true,
	$webkitIndexedDB: true,
	$webkitStorageInfo: true,
	$window: true
};
var hasAutomationEqualityBug = (function () {
	/* global window */
	if (typeof window === 'undefined') { return false; }
	for (var k in window) {
		try {
			if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
				try {
					equalsConstructorPrototype(window[k]);
				} catch (e) {
					return true;
				}
			}
		} catch (e) {
			return true;
		}
	}
	return false;
}());
var equalsConstructorPrototypeIfNotBuggy = function (o) {
	/* global window */
	if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
		return equalsConstructorPrototype(o);
	}
	try {
		return equalsConstructorPrototype(o);
	} catch (e) {
		return false;
	}
};

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":181}],181:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],182:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":155}],183:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

}).call(this,require('_process'))
},{"_process":155}],184:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":185}],185:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"./_stream_readable":187,"./_stream_writable":189,"core-util-is":157,"inherits":176,"process-nextick-args":183}],186:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":188,"core-util-is":157,"inherits":176}],187:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":185,"./internal/streams/BufferList":190,"./internal/streams/destroy":191,"./internal/streams/stream":192,"_process":155,"core-util-is":157,"events":170,"inherits":176,"isarray":193,"process-nextick-args":183,"safe-buffer":200,"string_decoder/":194,"util":153}],188:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":185,"core-util-is":157,"inherits":176}],189:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/
var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":185,"./internal/streams/destroy":191,"./internal/streams/stream":192,"_process":155,"core-util-is":157,"inherits":176,"process-nextick-args":183,"safe-buffer":200,"util-deprecate":216}],190:[function(require,module,exports){
'use strict';

/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();
},{"safe-buffer":200}],191:[function(require,module,exports){
'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":183}],192:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":170}],193:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],194:[function(require,module,exports){
'use strict';

var Buffer = require('safe-buffer').Buffer;

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":200}],195:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":196}],196:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":185,"./lib/_stream_passthrough.js":186,"./lib/_stream_readable.js":187,"./lib/_stream_transform.js":188,"./lib/_stream_writable.js":189}],197:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":196}],198:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":189}],199:[function(require,module,exports){
(function (process){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this,require('_process'))
},{"_process":155,"through":215}],200:[function(require,module,exports){
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":156}],201:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":170,"inherits":176,"readable-stream/duplex.js":184,"readable-stream/passthrough.js":195,"readable-stream/readable.js":196,"readable-stream/transform.js":197,"readable-stream/writable.js":198}],202:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":163,"function-bind":173}],203:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":202,"./polyfill":204,"./shim":205,"define-properties":161,"function-bind":173}],204:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":202}],205:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":204,"define-properties":161}],206:[function(require,module,exports){
(function (global){
/* globals self, window, global */
/* eslint no-negated-condition: 0, no-new-func: 0 */

'use strict';

if (typeof self !== 'undefined') {
	module.exports = self;
} else if (typeof window !== 'undefined') {
	module.exports = window;
} else if (typeof global !== 'undefined') {
	module.exports = global;
} else {
	module.exports = Function('return this')();
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],207:[function(require,module,exports){
'use strict';

var defineProperties = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var polyfill = getPolyfill();

var getGlobal = function () { return polyfill; };

defineProperties(getGlobal, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = getGlobal;

},{"./implementation":206,"./polyfill":208,"./shim":209,"define-properties":161}],208:[function(require,module,exports){
(function (global){
'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (typeof global !== 'object' || !global || global.Math !== Math || global.Array !== Array) {
		return implementation;
	}
	return global;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./implementation":206}],209:[function(require,module,exports){
(function (global){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimGlobal() {
	var polyfill = getPolyfill();
	if (define.supportsDescriptors) {
		var descriptor = Object.getOwnPropertyDescriptor(polyfill, 'global');
		if (!descriptor || (descriptor.configurable && (descriptor.enumerable || descriptor.writable || global !== polyfill))) {
			Object.defineProperty(polyfill, 'global', {
				configurable: true,
				enumerable: false,
				value: polyfill,
				writable: false
			});
		}
	} else if (typeof global !== 'object' || global !== polyfill) {
		polyfill.global = polyfill;
	}
	return polyfill;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polyfill":208,"define-properties":161}],210:[function(require,module,exports){
(function (process){
var defined = require('defined');
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require('through');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };
    
    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

}).call(this,require('_process'))
},{"./lib/default_stream":211,"./lib/results":213,"./lib/test":214,"_process":155,"defined":162,"through":215}],211:[function(require,module,exports){
(function (process){
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        }
        else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

}).call(this,require('_process'))
},{"_process":155,"fs":154,"through":215}],212:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":155}],213:[function(require,module,exports){
(function (process){
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var through = require('through');
var resumer = require('resumer');
var inspect = require('object-inspect');
var bind = require('function-bind');
var has = require('has');
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    }
    else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (name) {
    this._only = name;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected);
        var ac = inspect(res.actual);
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        }
        else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t.name) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this,require('_process'))
},{"_process":155,"events":170,"function-bind":173,"has":174,"inherits":176,"object-inspect":179,"resumer":199,"through":215}],214:[function(require,module,exports){
(function (__dirname){
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var has = require('has');
var trim = require('string.prototype.trim');

var nextTick = require('./next_tick');

module.exports = Test;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        }
        else if (t === 'object') {
            opts = arg || opts;
        }
        else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            else return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (this._skip) {
        this.comment('SKIP ' + this.name);
    }
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    trim(msg).split('\n').forEach(function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = setTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        clearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    else {
        return this._plan - (this._progeny.length + this.assertCount);
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator)
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = path.dirname(__dirname) + '/';
        
        for (var i = 0; i < err.length; i++) {
            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
            if (!m) {
                continue;
            }
            
            var s = m[1].split(/\s+/);
            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
            if (!filem) {
                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);
                
                if (!filem) {
                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

                    if (!filem) {
                        continue;
                    }
                }
            }
            
            if (filem[1].slice(0, dir.length) === dir) {
                continue;
            }
            
            res.functionName = s[0];
            res.file = filem[1];
            res.line = Number(filem[2]);
            if (filem[3]) res.column = filem[3];
            
            res.at = m[1];
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : msg,
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : msg,
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


}).call(this,"/node_modules/tape/lib")
},{"./next_tick":212,"deep-equal":158,"defined":162,"events":170,"has":174,"inherits":176,"path":182,"string.prototype.trim":203}],215:[function(require,module,exports){
(function (process){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this,require('_process'))
},{"_process":155,"stream":201}],216:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[74]);
