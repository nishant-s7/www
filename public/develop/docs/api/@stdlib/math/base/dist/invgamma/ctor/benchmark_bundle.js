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
* Test if a value is array-like.
*
* @module @stdlib/assert/is-array-like
*
* @example
* var isArrayLike = require( '@stdlib/assert/is-array-like' );
*
* var bool = isArrayLike( [] );
* // returns true
*
* bool = isArrayLike( { 'length': 10 } );
* // returns true
*
* bool = isArrayLike( 'beep' );
* // returns true
*/

// MODULES //

var isArrayLike = require( './is_array_like.js' );


// EXPORTS //

module.exports = isArrayLike;

},{"./is_array_like.js":4}],4:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var MAX_LENGTH = require( '@stdlib/math/constants/uint32-max' );


// MAIN //

/**
* Tests if a value is array-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is array-like
*
* @example
* var bool = isArrayLike( [] );
* // returns true
*
* @example
* var bool = isArrayLike( {'length':10} );
* // returns true
*/
function isArrayLike( value ) {
	return (
		value !== void 0 &&
		value !== null &&
		typeof value !== 'function' &&
		typeof value.length === 'number' &&
		isInteger( value.length ) &&
		value.length >= 0 &&
		value.length <= MAX_LENGTH
	);
} // end FUNCTION isArrayLike()


// EXPORTS //

module.exports = isArrayLike;

},{"@stdlib/math/base/assert/is-integer":131,"@stdlib/math/constants/uint32-max":340}],5:[function(require,module,exports){
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

},{"./is_array.js":6}],6:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":398}],7:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a boolean.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a boolean
*
* @example
* var bool = isBoolean( false );
* // returns true
* @example
* var bool = isBoolean( true );
* // returns true
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":9,"./primitive.js":10}],8:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a boolean.
*
* @module @stdlib/assert/is-boolean
*
* @example
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* // Use interface to check for boolean primitives...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* // Use interface to check for boolean objects...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isObject;
*
* var bool = isBoolean( true );
* // returns false
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isBoolean = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./generic.js":7,"./object.js":9,"./primitive.js":10,"@stdlib/utils/define-read-only-property":374}],9:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


// MAIN //

/**
* Tests if a value is a boolean object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean object
*
* @example
* var bool = isBoolean( true );
* // returns false
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*/
function isBoolean( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Boolean]' );
	}
	return false;
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":12,"@stdlib/utils/detect-tostringtag-support":380,"@stdlib/utils/native-class":398}],10:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a boolean primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean primitive
*
* @example
* var bool = isBoolean( true );
* // returns true
* @example
* var bool = isBoolean( false );
* // returns true
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
} // end FUNCTION isBoolean()


// EXPORTS //

module.exports = isBoolean;

},{}],11:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],12:[function(require,module,exports){
'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
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

},{"./tostring.js":11}],13:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = true;

},{}],14:[function(require,module,exports){
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

},{"./is_buffer.js":15}],15:[function(require,module,exports){
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
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
* @example
* var v = isBuffer( {} );
* // returns false
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

},{"@stdlib/assert/is-object-like":53}],16:[function(require,module,exports){
'use strict';

/**
* Test if a value is an `Error` object.
*
* @module @stdlib/assert/is-error
*
* @example
* var isError = require( '@stdlib/assert/is-error' );
*
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* bool = isError( {} );
* // returns false
*/

// MODULES //

var isError = require( './is_error.js' );


// EXPORTS //

module.exports = isError;

},{"./is_error.js":17}],17:[function(require,module,exports){
'use strict';

// MODULES //

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an `Error` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `Error` object
*
* @example
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* @example
* var bool = isError( {} );
* // returns false
*/
function isError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `Error` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof Error ) {
		return true;
	}
	// Walk the prototype tree until we find an object having the desired native class...
	while ( value ) {
		if ( nativeClass( value ) === '[object Error]' ) {
			return true;
		}
		value = getPrototypeOf( value );
	}
	return false;
} // end FUNCTION isError()


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":386,"@stdlib/utils/native-class":398}],18:[function(require,module,exports){
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

},{"./is_function.js":19}],19:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":415}],20:[function(require,module,exports){
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
* @example
* var bool = isInteger( new Number( 5.0 ) );
* // returns true
* @example
* var bool = isInteger( -3.14 );
* // returns false
* @example
* var bool = isInteger( null );
* // returns false
*/
function isInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"./object.js":23,"./primitive.js":24}],21:[function(require,module,exports){
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

},{"./generic.js":20,"./object.js":23,"./primitive.js":24,"@stdlib/utils/define-read-only-property":374}],22:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var isInt = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a number primitive is an integer value.
*
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

},{"@stdlib/math/base/assert/is-integer":131,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],23:[function(require,module,exports){
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

},{"./integer.js":22,"@stdlib/assert/is-number":48}],24:[function(require,module,exports){
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

},{"./integer.js":22,"@stdlib/assert/is-number":48}],25:[function(require,module,exports){
'use strict';

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],26:[function(require,module,exports){
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

},{"./is_little_endian.js":27}],27:[function(require,module,exports){
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

},{"./ctors.js":25}],28:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( new Number( NaN ) );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( null );
* // returns false
*/
function isnan( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"./object.js":30,"./primitive.js":31}],29:[function(require,module,exports){
'use strict';

/**
* Test if a value is `NaN`.
*
* @module @stdlib/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( new Number( NaN ) );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( null );
* // returns false
*
* @example
* // Use interface to check for `NaN` primitives...
* var isnan = require( '@stdlib/assert/is-nan' ).isPrimitive;
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns false
*
* @example
* // Use interface to check for `NaN` objects...
* var isnan = require( '@stdlib/assert/is-nan' ).isObject;
*
* var bool = isnan( NaN );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isnan = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isnan, 'isPrimitive', isPrimitive );
setReadOnly( isnan, 'isObject', isObject );


// EXPORTS //

module.exports = isnan;

},{"./generic.js":28,"./object.js":30,"./primitive.js":31,"@stdlib/utils/define-read-only-property":374}],30:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a number object having a value of `NaN`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a value of `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns true
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value.valueOf() )
	);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":48,"@stdlib/math/base/assert/is-nan":133}],31:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isNan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Tests if a value is a `NaN` number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a `NaN` number primitive
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 3.14 );
* // returns false
*
* bool = isnan( new Number( NaN ) );
* // returns false
*/
function isnan( value ) {
	return (
		isNumber( value ) &&
		isNan( value )
	);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{"@stdlib/assert/is-number":48,"@stdlib/math/base/assert/is-nan":133}],32:[function(require,module,exports){
'use strict';

/**
* Test if a value is Node stream-like.
*
* @module @stdlib/assert/is-node-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
* var isNodeStreamLike = require( '@stdlib/assert/is-node-stream-like' );
*
* var stream = transformStream();
*
* var bool = isNodeStreamLike( stream );
* // returns true
*
* bool = isNodeStreamLike( {} );
* // returns false
*/

// MODULES //

var isNodeStreamLike = require( './is_stream_like.js' );


// EXPORTS //

module.exports = isNodeStreamLike;

},{"./is_stream_like.js":33}],33:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if a value is Node stream-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is Node stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* var stream = transformStream();
*
* var bool = isNodeStreamLike( stream );
* // returns true
*
* bool = isNodeStreamLike( {} );
* // returns false
*/
function isNodeStreamLike( value ) {
	return (
		// Must be an object:
		value !== null &&
		typeof value === 'object' &&

		// Should be an event emitter:
		typeof value.on === 'function' &&
		typeof value.once === 'function' &&
		typeof value.emit === 'function' &&
		typeof value.addListener === 'function' &&
		typeof value.removeListener === 'function' &&
		typeof value.removeAllListeners === 'function' &&

		// Should have a `pipe` method (Node streams inherit from `Stream`, including writable streams):
		typeof value.pipe === 'function'
	);
} // end FUNCTION isNodeStreamLike()


// EXPORTS //

module.exports = isNodeStreamLike;

},{}],34:[function(require,module,exports){
'use strict';

/**
* Test if a value is Node writable stream-like.
*
* @module @stdlib/assert/is-node-writable-stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
* var isNodeWritableStreamLike = require( '@stdlib/assert/is-node-writable-stream-like' );
*
* var stream = transformStream();
*
* var bool = isNodeWritableStreamLike( stream );
* // returns true
*
* bool = isNodeWritableStreamLike( {} );
* // returns false
*/

// MODULES //

var isNodeWritableStreamLike = require( './is_writable_stream_like.js' );


// EXPORTS //

module.exports = isNodeWritableStreamLike;

},{"./is_writable_stream_like.js":35}],35:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var isNodeStreamLike = require( '@stdlib/assert/is-node-stream-like' );


// MAIN //

/**
* Tests if a value is Node writable stream-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is Node writable stream-like
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* var stream = transformStream();
*
* var bool = isNodeWritableStreamLike( stream );
* // returns true
*
* bool = isNodeWritableStreamLike( {} );
* // returns false
*/
function isNodeWritableStreamLike( value ) {
	return (
		// Must be stream-like:
		isNodeStreamLike( value ) &&

		// Should have writable stream methods:
		typeof value._write === 'function' &&

		// Should have writable stream state:
		typeof value._writableState === 'object'
	);
} // end FUNCTION isNodeWritableStreamLike()


// EXPORTS //

module.exports = isNodeWritableStreamLike;

},{"@stdlib/assert/is-node-stream-like":32}],36:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array-like object containing only nonnegative integers.
*
* @module @stdlib/assert/is-nonnegative-integer-array
*
* @example
* var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' );
*
* var bool = isNonNegativeIntegerArray( [ 3.0, new Number(3.0) ] );
* // returns true
*
* bool = isNonNegativeIntegerArray( [ 3.0, '3.0' ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).primitives;
*
* var bool = isNonNegativeIntegerArray( [ 1.0, 0.0, 10.0 ] );
* // returns true
*
* bool = isNonNegativeIntegerArray( [ 3.0, new Number(1.0) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).objects;
*
* var bool = isNonNegativeIntegerArray( [ new Number(3.0), new Number(1.0) ] );
* // returns true
*
* bool = isNonNegativeIntegerArray( [ 1.0, 0.0, 10.0 ] );
* // returns false
*/

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-like-function' );


// MAIN //

var isNonNegativeIntegerArray = arrayfun( isNonNegativeInteger );
setReadOnly( isNonNegativeIntegerArray, 'primitives', arrayfun( isNonNegativeInteger.isPrimitive ) );
setReadOnly( isNonNegativeIntegerArray, 'objects', arrayfun( isNonNegativeInteger.isObject ) );


// EXPORTS //

module.exports = isNonNegativeIntegerArray;

},{"@stdlib/assert/is-nonnegative-integer":38,"@stdlib/assert/tools/array-like-function":81,"@stdlib/utils/define-read-only-property":374}],37:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a nonnegative integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
* @example
* var bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
* @example
* var bool = isNonNegativeInteger( -5.0 );
* // returns false
* @example
* var bool = isNonNegativeInteger( 3.14 );
* // returns false
* @example
* var bool = isNonNegativeInteger( null );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./object.js":39,"./primitive.js":40}],38:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a nonnegative integer.
*
* @module @stdlib/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* bool = isNonNegativeInteger( null );
* // returns false
*
* @example
* // Use interface to check for nonnegative integer primitives...
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for nonnegative integer objects...
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isObject;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNonNegativeInteger = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./generic.js":37,"./object.js":39,"./primitive.js":40,"@stdlib/utils/define-read-only-property":374}],39:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() >= 0
	);
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":21}],40:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value >= 0
	);
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":21}],41:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a nonnegative number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonnegative number
*
* @example
* var bool = isNonNegativeNumber( 5.0 );
* // returns true
* @example
* var bool = isNonNegativeNumber( new Number( 5.0 ) );
* // returns true
* @example
* var bool = isNonNegativeNumber( 3.14 );
* // returns true
* @example
* var bool = isNonNegativeNumber( -5.0 );
* // returns false
* @example
* var bool = isNonNegativeNumber( null );
* // returns false
*/
function isNonNegativeNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNonNegativeNumber()


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"./object.js":43,"./primitive.js":44}],42:[function(require,module,exports){
'use strict';

/**
* Test if a value is a nonnegative number.
*
* @module @stdlib/assert/is-nonnegative-number
*
* @example
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' );
*
* var bool = isNonNegativeNumber( 5.0 );
* // returns true
*
* bool = isNonNegativeNumber( new Number( 5.0 ) );
* // returns true
*
* bool = isNonNegativeNumber( 3.14 );
* // returns true
*
* bool = isNonNegativeNumber( -5.0 );
* // returns false
*
* bool = isNonNegativeNumber( null );
* // returns false
*
* @example
* // Use interface to check for nonnegative number primitives...
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' ).isPrimitive;
*
* var bool = isNonNegativeNumber( 3.0 );
* // returns true
*
* bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for nonnegative number objects...
* var isNonNegativeNumber = require( '@stdlib/assert/is-nonnegative-number' ).isObject;
*
* var bool = isNonNegativeNumber( 3.0 );
* // returns false
*
* bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNonNegativeNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"./generic.js":41,"./object.js":43,"./primitive.js":44,"@stdlib/utils/define-read-only-property":374}],43:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonnegative value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonnegative number value
*
* @example
* var bool = isNonNegativeNumber( 3.0 );
* // returns false
* @example
* var bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns true
*/
function isNonNegativeNumber( value ) {
	return (
		isNumber( value ) &&
		value.valueOf() >= 0.0
	);
} // end FUNCTION isNonNegativeNumber()


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"@stdlib/assert/is-number":48}],44:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonnegative value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonnegative number value
*
* @example
* var bool = isNonNegativeNumber( 3.0 );
* // returns true
* @example
* var bool = isNonNegativeNumber( new Number( 3.0 ) );
* // returns false
*/
function isNonNegativeNumber( value ) {
	return (
		isNumber( value ) &&
		value >= 0.0
	);
} // end FUNCTION isNonNegativeNumber()


// EXPORTS //

module.exports = isNonNegativeNumber;

},{"@stdlib/assert/is-number":48}],45:[function(require,module,exports){
'use strict';

/**
* Test if a value is `null`.
*
* @module @stdlib/assert/is-null
*
* @example
* var isNull = require( '@stdlib/assert/is-null' );
*
* var value = null;
*
* var bool = isNull( value );
* // returns true
*/

// MODULES //

var isNull = require( './is_null.js' );


// EXPORTS //

module.exports = isNull;

},{"./is_null.js":46}],46:[function(require,module,exports){
'use strict';

/**
* Tests if a value is `null`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is null
*
* @example
* var bool = isNull( null );
* // returns true
*
* bool = isNull( true );
* // returns false
*/
function isNull( value ) {
	return value === null;
} // end FUNCTION isNull()


// EXPORTS //

module.exports = isNull;

},{}],47:[function(require,module,exports){
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

},{"./object.js":49,"./primitive.js":50}],48:[function(require,module,exports){
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

},{"./generic.js":47,"./object.js":49,"./primitive.js":50,"@stdlib/utils/define-read-only-property":374}],49:[function(require,module,exports){
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

},{"./try2serialize.js":52,"@stdlib/utils/detect-tostringtag-support":380,"@stdlib/utils/native-class":398}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],52:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./tostring.js":51,"dup":12}],53:[function(require,module,exports){
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

},{"./is_object_like.js":54,"@stdlib/assert/tools/array-function":79,"@stdlib/utils/define-read-only-property":374}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{"./is_object.js":56}],56:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":5}],57:[function(require,module,exports){
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

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isPlainObject = require( './is_plain_object.js' );


// MAIN //

setReadOnly( isPlainObject, 'isPlainObjectArray', arrayfun( isPlainObject ) );


// EXPORTS //

module.exports = isPlainObject;

},{"./is_plain_object.js":58,"@stdlib/assert/tools/array-function":79,"@stdlib/utils/define-read-only-property":374}],58:[function(require,module,exports){
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

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-function":18,"@stdlib/assert/is-object":55,"@stdlib/utils/get-prototype-of":386,"@stdlib/utils/native-class":398}],59:[function(require,module,exports){
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
* @example
* var bool = isPositiveInteger( new Number( 5.0 ) );
* // returns true
* @example
* var bool = isPositiveInteger( 0.0 );
* // returns false
* @example
* var bool = isPositiveInteger( -5.0 );
* // returns false
* @example
* var bool = isPositiveInteger( 3.14 );
* // returns false
* @example
* var bool = isPositiveInteger( null );
* // returns false
*/
function isPositiveInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isPositiveInteger()


// EXPORTS //

module.exports = isPositiveInteger;

},{"./object.js":61,"./primitive.js":62}],60:[function(require,module,exports){
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

},{"./generic.js":59,"./object.js":61,"./primitive.js":62,"@stdlib/utils/define-read-only-property":374}],61:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":21}],62:[function(require,module,exports){
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

},{"@stdlib/assert/is-integer":21}],63:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a positive number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a positive number
*
* @example
* var bool = isPositiveNumber( 5.0 );
* // returns true
* @example
* var bool = isPositiveNumber( new Number( 5.0 ) );
* // returns true
* @example
* var bool = isPositiveNumber( 3.14 );
* // returns true
* @example
* var bool = isPositiveNumber( -5.0 );
* // returns false
* @example
* var bool = isPositiveNumber( null );
* // returns false
*/
function isPositiveNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isPositiveNumber()


// EXPORTS //

module.exports = isPositiveNumber;

},{"./object.js":65,"./primitive.js":66}],64:[function(require,module,exports){
'use strict';

/**
* Test if a value is a positive number.
*
* @module @stdlib/assert/is-positive-number
*
* @example
* var isPositiveNumber = require( '@stdlib/assert/is-positive-number' );
*
* var bool = isPositiveNumber( 5.0 );
* // returns true
*
* bool = isPositiveNumber( new Number( 5.0 ) );
* // returns true
*
* bool = isPositiveNumber( 3.14 );
* // returns true
*
* bool = isPositiveNumber( -5.0 );
* // returns false
*
* bool = isPositiveNumber( null );
* // returns false
*
* @example
* // Use interface to check for positive number primitives...
* var isPositiveNumber = require( '@stdlib/assert/is-positive-number' ).isPrimitive;
*
* var bool = isPositiveNumber( 3.0 );
* // returns true
*
* bool = isPositiveNumber( new Number( 3.0 ) );
* // returns false
*
* @example
* // Use interface to check for positive number objects...
* var isPositiveNumber = require( '@stdlib/assert/is-positive-number' ).isObject;
*
* var bool = isPositiveNumber( 3.0 );
* // returns false
*
* bool = isPositiveNumber( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositiveNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isPositiveNumber, 'isPrimitive', isPrimitive );
setReadOnly( isPositiveNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isPositiveNumber;

},{"./generic.js":63,"./object.js":65,"./primitive.js":66,"@stdlib/utils/define-read-only-property":374}],65:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a positive value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a positive value
*
* @example
* var bool = isPositiveNumber( 3.0 );
* // returns false
* @example
* var bool = isPositiveNumber( new Number( 3.0 ) );
* // returns true
*/
function isPositiveNumber( value ) {
	return (
		isNumber( value ) &&
		value.valueOf() > 0.0
	);
} // end FUNCTION isPositiveNumber()


// EXPORTS //

module.exports = isPositiveNumber;

},{"@stdlib/assert/is-number":48}],66:[function(require,module,exports){
'use strict';

// MODULES //

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a positive value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a positive value
*
* @example
* var bool = isPositiveNumber( 3.0 );
* // returns true
* @example
* var bool = isPositiveNumber( new Number( 3.0 ) );
* // returns false
*/
function isPositiveNumber( value ) {
	return (
		isNumber( value ) &&
		value > 0.0
	);
} // end FUNCTION isPositiveNumber()


// EXPORTS //

module.exports = isPositiveNumber;

},{"@stdlib/assert/is-number":48}],67:[function(require,module,exports){
'use strict';

var exec = RegExp.prototype.exec; // non-generic


// EXPORTS //

module.exports = exec;

},{}],68:[function(require,module,exports){
'use strict';

/**
* Test if a value is a regular expression.
*
* @module @stdlib/assert/is-regexp
*
* @example
* var isRegExp = require( '@stdlib/assert/is-regexp' );
*
* var bool = isRegExp( /\.+/ );
* // returns true
*
* bool = isRegExp( {} );
* // returns false
*/

// MODULES //

var isRegExp = require( './is_regexp.js' );


// EXPORTS //

module.exports = isRegExp;

},{"./is_regexp.js":69}],69:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2exec.js' );


// MAIN //

/**
* Tests if a value is a regular expression.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a regular expression
*
* @example
* var bool = isRegExp( /\.+/ );
* // returns true
*
* @example
* var bool = isRegExp( {} );
* // returns false
*/
function isRegExp( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object RegExp]' );
	}
	return false;
} // end FUNCTION isRegExp()


// EXPORTS //

module.exports = isRegExp;

},{"./try2exec.js":70,"@stdlib/utils/detect-tostringtag-support":380,"@stdlib/utils/native-class":398}],70:[function(require,module,exports){
'use strict';

// MODULES //

var exec = require( './exec.js' );


// MAIN //

/**
* Attempts to call a `RegExp` method.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if able to call a `RegExp` method
*/
function test( value ) {
	try {
		exec.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./exec.js":67}],71:[function(require,module,exports){
'use strict';

/**
* Test if a value is an array of strings.
*
* @module @stdlib/assert/is-string-array
*
* @example
* var isStringArray = require( '@stdlib/assert/is-string-array' );
*
* var bool = isStringArray( [ 'abc', 'def' ] );
* // returns true
*
* bool = isStringArray( [ 'abc', 123 ] );
* // returns false
*
* @example
* // Use interface to check for primitives...
* var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
*
* var bool = isStringArray( [ 'abc', 'def' ] );
* // returns true
*
* bool = isStringArray( [ 'abc', new String( 'def' ) ] );
* // returns false
*
* @example
* // Use interface to check for objects...
* var isStringArray = require( '@stdlib/assert/is-string-array' ).objects;
*
* var bool = isStringArray( [ new String( 'abc' ), new String( 'def' ) ] );
* // returns true
*
* bool = isStringArray( [ new String( 'abc' ), 'def' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isString = require( '@stdlib/assert/is-string' );


// MAIN //

var isStringArray = arrayfun( isString );
setReadOnly( isStringArray, 'primitives', arrayfun( isString.isPrimitive ) );
setReadOnly( isStringArray, 'objects', arrayfun( isString.isObject ) );


// EXPORTS //

module.exports = isStringArray;

},{"@stdlib/assert/is-string":73,"@stdlib/assert/tools/array-function":79,"@stdlib/utils/define-read-only-property":374}],72:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a string
*/
function isString( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{"./object.js":74,"./primitive.js":75}],73:[function(require,module,exports){
'use strict';

/**
* Test if a value is a string.
*
* @module @stdlib/assert/is-string
*
* @example
* var isString = require( '@stdlib/assert/is-string' );
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 5 );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isObject;
*
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 'beep' );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isString = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isString, 'isPrimitive', isPrimitive );
setReadOnly( isString, 'isObject', isObject );


// EXPORTS //

module.exports = isString;

},{"./generic.js":72,"./object.js":74,"./primitive.js":75,"@stdlib/utils/define-read-only-property":374}],74:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2valueof.js' );


// MAIN //

/**
* Tests if a value is a string object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string object
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
* @example
* var bool = isString( 'beep' );
* // returns false
*/
function isString( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object String]' );
	}
	return false;
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":76,"@stdlib/utils/detect-tostringtag-support":380,"@stdlib/utils/native-class":398}],75:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string primitive
*
* @example
* var bool = isString( 'beep' );
* // returns true
* @example
* var bool = isString( new String( 'beep' ) );
* // returns false
*/
function isString( value ) {
	return ( typeof value === 'string' );
} // end FUNCTION isString()


// EXPORTS //

module.exports = isString;

},{}],76:[function(require,module,exports){
'use strict';

// MODULES //

var valueOf = require( './valueof.js' ); // eslint-disable-line no-redeclare


// MAIN //

/**
* Attempts to extract a string value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a string can be extracted
*/
function test( value ) {
	try {
		valueOf.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./valueof.js":77}],77:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],78:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":5}],79:[function(require,module,exports){
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

},{"./arrayfcn.js":78}],80:[function(require,module,exports){
'use strict';

// MODULES //

var isArrayLike = require( '@stdlib/assert/is-array-like' );


// MAIN //

/**
* Returns a function which tests if every element in an array-like object passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array-like object function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arraylikefcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arraylikefcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `' + predicate + '`.' );
	}
	return every;
	/**
	* Tests if every element in an array-like object passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array-like object for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArrayLike( value ) ) {
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
} // end FUNCTION arraylikefcn()


// EXPORTS //

module.exports = arraylikefcn;

},{"@stdlib/assert/is-array-like":3}],81:[function(require,module,exports){
'use strict';

/**
* Return a function which tests if every element in an array-like object passes a test condition.
*
* @module @stdlib/assert/tools/array-like-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arraylikefcn = require( '@stdlib/assert/tools/array-like-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arraylikefcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arraylikefcn = require( './arraylikefcn.js' );


// EXPORTS //

module.exports = arraylikefcn;

},{"./arraylikefcn.js":80}],82:[function(require,module,exports){
'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/utils/transform' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isFunction = require( '@stdlib/assert/is-function' );
var createHarness = require( './harness' );
var harness = require( './get_harness.js' );


// VARIABLES //

var listeners = [];


// FUNCTIONS //

/**
* Callback invoked when a harness finishes running all benchmarks.
*
* @private
*/
function done() {
	var len;
	var f;
	var i;

	len = listeners.length;

	// Inform all the listeners that the harness has finished...
	for ( i = 0; i < len; i++ ) {
		f = listeners.shift();
		f();
	}
} // end FUNCTION done()

/**
* Creates a results stream.
*
* @memberof bench
* @param {Options} [options] - stream options
* @throws {Error} must provide valid stream options
* @returns {TransformStream} results stream
*/
function createStream( options ) {
	var stream;
	var bench;
	var opts;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	// If we have already created a harness, calling this function simply creates another results stream...
	if ( harness.cached ) {
		bench = harness();
		return bench.createStream( opts );
	}
	stream = new TransformStream( opts );
	opts.stream = stream;

	// Create a harness which uses the created output stream:
	harness( opts, done );

	return stream;
} // end FUNCTION createStream()

/**
* Adds a listener for when a harness finishes running all benchmarks.
*
* @memberof bench
* @param {Callback} clbk - listener
* @throws {TypeError} must provide a function
* @throws {Error} must provide a listener only once
* @returns {void}
*/
function onFinish( clbk ) {
	var i;
	if ( !isFunction( clbk ) ) {
		throw new TypeError( 'invalid input argument. Must provide a function. Value: `'+clbk+'`.' );
	}
	// Allow adding a listener only once...
	for ( i = 0; i < listeners.length; i++ ) {
		if ( clbk === listeners[ i ] ) {
			throw new Error( 'invalid input argument. Attempted to add duplicate listener.' );
		}
	}
	listeners.push( clbk );
} // end FUNCTION onFinish()


// MAIN //

/**
* Runs a benchmark.
*
* @param {string} name - benchmark name
* @param {Options} [options] - benchmark options
* @param {boolean} [options.skip=false] - boolean indicating whether to skip a benchmark
* @param {(PositiveInteger|null)} [options.iterations=null] - number of iterations
* @param {PositiveInteger} [options.repeats=3] - number of repeats
* @param {PositiveInteger} [options.timeout=300000] - number of milliseconds before a benchmark automatically fails
* @param {Function} [benchmark] - function containing benchmark code
* @throws {TypeError} first argument must be a string
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} benchmark argument must a function
* @returns {Benchmark} benchmark harness
*
* @example
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*/
function bench( name, options, benchmark ) {
	var h = harness( done );
	if ( arguments.length < 2 ) {
		h( name );
	} else if ( arguments.length === 2 ) {
		h( name, options );
	} else {
		h( name, options, benchmark );
	}
	return bench;
} // end FUNCTION bench()


// EXPORTS //

module.exports = bench;

setReadOnly( bench, 'createHarness', createHarness );
setReadOnly( bench, 'createStream', createStream );
setReadOnly( bench, 'onFinish', onFinish );

},{"./get_harness.js":104,"./harness":105,"@stdlib/assert/is-function":18,"@stdlib/streams/utils/transform":349,"@stdlib/utils/define-read-only-property":374}],83:[function(require,module,exports){
'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );


// MAIN //

/**
* Generates an assertion.
*
* @private
* @param {boolean} ok - assertion outcome
* @param {Options} opts - options
*/
function assert( ok, opts ) {
	/* eslint-disable no-invalid-this */
	var result;
	var err;

	result = {
		'id': this._count,
		'ok': ok,
		'skip': opts.skip,
		'todo': opts.todo,
		'name': opts.message || '(unnamed assert)',
		'operator': opts.operator
	};
	if ( hasOwnProp( opts, 'actual' ) ) {
		result.actual = opts.actual;
	}
	if ( hasOwnProp( opts, 'expected' ) ) {
		result.expected = opts.expected;
	}
	if ( !ok ) {
		result.error = opts.error || new Error( this.name );
		err = new Error( 'exception' );

		// TODO: generate an exception in order to locate the calling function (https://github.com/substack/tape/blob/master/lib/test.js#L215)
	}
	this._count += 1;
	this.emit( 'result', result );
} // end FUNCTION assert()


// EXPORTS //

module.exports = assert;

},{"@stdlib/assert/has-own-property":2}],84:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = clearTimeout;

},{}],85:[function(require,module,exports){
'use strict';

// MODULES //

var trim = require( '@stdlib/string/trim' );
var replace = require( '@stdlib/string/replace' );
var EOL = require( '@stdlib/regexp/eol' );


// VARIABLES //

var RE_COMMENT = /^#\s*/;


// MAIN //

/**
* Writes a comment.
*
* @private
* @param {string} msg - comment message
*/
function comment( msg ) {
	/* eslint-disable no-invalid-this */
	var lines;
	var i;
	msg = trim( msg );
	lines = msg.split( EOL );
	for ( i = 0; i < lines.length; i++ ) {
		msg = trim( lines[ i ] );
		msg = replace( msg, RE_COMMENT, '' );
		this.emit( 'result', msg );
	}
} // end FUNCTION comment()


// EXPORTS //

module.exports = comment;

},{"@stdlib/regexp/eol":341,"@stdlib/string/replace":355,"@stdlib/string/trim":359}],86:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that `actual` is deeply equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
function deepEqual( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this.comment( 'actual: '+actual+'. expected: '+expected+'. msg: '+msg+'.' );
	// TODO: implement
} // end FUNCTION deepEqual()


// EXPORTS //

module.exports = deepEqual;

},{}],87:[function(require,module,exports){
'use strict';

// MODULES //

var nextTick = require( './../utils/next_tick.js' );


// MAIN //

/**
* Ends a benchmark.
*
* @private
*/
function end() {
	/* eslint-disable no-invalid-this */
	var self = this;
	if ( this._ended ) {
		this.fail( '.end() called more than once' );
	} else {
		// Prevents releasing the zalgo when running synchronous benchmarks.
		nextTick( onTick );
	}
	this._ended = true;
	this._running = false;

	/**
	* Callback invoked upon a subsequent tick of the event loop.
	*
	* @private
	*/
	function onTick() {
		self.emit( 'end' );
	} // end FUNCTION onTick()
} // end FUNCTION end()


// EXPORTS //

module.exports = end;

},{"./../utils/next_tick.js":124}],88:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Returns a `boolean` indicating if a benchmark has ended.
*
* @private
* @returns {boolean} boolean indicating if a benchmark has ended
*/
function ended() {
	/* eslint-disable no-invalid-this */
	return this._ended;
} // end FUNCTION ended()


// EXPORTS //

module.exports = ended;

},{}],89:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that `actual` is strictly equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
function equal( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( actual === expected, {
		'message': msg || 'should be equal',
		'operator': 'equal',
		'expected': expected,
		'actual': actual
	});
} // end FUNCTION equal()


// EXPORTS //

module.exports = equal;

},{}],90:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Forcefully ends a benchmark.
*
* @private
* @returns {void}
*/
function exit() {
	/* eslint-disable no-invalid-this */
	if ( this._exited ) {
		// If we have already "exited", do not create more failing assertions when one should suffice...
		return;
	}
	// Only "exit" when a benchmark has either not yet been run or is currently running. If a benchmark has already ended, no need to generate a failing assertion.
	if ( !this._ended ) {
		this._exited = true;
		this.fail( 'benchmark exited without ending' );

		// Allow running benchmarks to call `end` on their own...
		if ( !this._running ) {
			this.end();
		}
	}
} // end FUNCTION exit()


// EXPORTS //

module.exports = exit;

},{}],91:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Generates a failing assertion.
*
* @private
* @param {string} msg - message
*/
function fail( msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( false, {
		'message': msg,
		'operator': 'fail'
	});
} // end FUNCTION fail()


// EXPORTS //

module.exports = fail;

},{}],92:[function(require,module,exports){
'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var inherit = require( '@stdlib/utils/inherit' );
var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var tic = require( '@stdlib/time/tic' );
var toc = require( '@stdlib/time/toc' );


// MAIN //

/**
* Benchmark constructor.
*
* @constructor
* @param {string} name - benchmark name
* @param {Options} opts - benchmark options
* @param {boolean} opts.skip - boolean indicating whether to skip a benchmark
* @param {PositiveInteger} opts.iterations - number of iterations
* @param {PositiveInteger} opts.timeout - number of milliseconds before a benchmark automatically fails
* @param {Function} [benchmark] - function containing benchmark code
* @returns {Benchmark} Benchmark instance
*
* @example
* var bench = new Benchmark( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.comment( 'Running benchmarks...' );
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.comment( 'Finished running benchmarks.' );
*     b.end();
* });
*/
function Benchmark( name, opts, benchmark ) {
	var hasTicked;
	var hasTocked;
	var self;
	var time;
	if ( !( this instanceof Benchmark ) ) {
		return new Benchmark( name, opts, benchmark );
	}
	self = this;
	hasTicked = false;
	hasTocked = false;

	EventEmitter.call( this );

	// Private properties:
	Object.defineProperty( this, '_benchmark', {
		'value': benchmark, // this may be `undefined`
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_skip', {
		'value': opts.skip,
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_ended', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_running', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_exited', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_count', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	// Read-only:
	setReadOnly( this, 'name', name );
	setReadOnly( this, 'tic', start );
	setReadOnly( this, 'toc', stop );
	setReadOnly( this, 'iterations', opts.iterations );
	setReadOnly( this, 'timeout', opts.timeout );

	return this;

	/**
	* Starts a benchmark timer.
	*
	* ## Notes
	*
	* * Using a scoped variable prevents nefarious mutation by bad actors hoping to manipulate benchmark results.
	* * The one attack vector which remains is manipulation of the `require` cache for `tic` and `toc`.
	* * One way to combat cache manipulation is by comparing the checksum of `Function#toString()` against known values.
	*
	* @private
	*/
	function start() {
		if ( hasTicked ) {
			self.fail( '.tic() called more than once' );
		} else {
			self.emit( 'tic' );
			hasTicked = true;
			time = tic();
		}
	} // end FUNCTION start()

	/**
	* Stops a benchmark timer.
	*
	* @private
	* @returns {void}
	*/
	function stop() {
		var elapsed;
		var secs;
		var rate;
		var out;

		if ( hasTicked === false ) {
			return self.fail( '.toc() called before .tic()' );
		}
		elapsed = toc( time );
		if ( hasTocked ) {
			return self.fail( '.toc() called more than once' );
		}
		hasTocked = true;
		self.emit( 'toc' );

		secs = elapsed[ 0 ] + ( elapsed[ 1 ]/1e9 );
		rate = self.iterations / secs;

		out = {
			'ok': true,
			'operator': 'result',
			'iterations': self.iterations,
			'elapsed': secs,
			'rate': rate
		};
		self.emit( 'result', out );
	} // end FUNCTION stop()
} // end FUNCTION Benchmark()

/*
* Inherit from the `EventEmitter` prototype.
*/
inherit( Benchmark, EventEmitter );

/**
* Runs a benchmark.
*
* @private
* @memberof Benchmark.prototype
* @function run
*/
Object.defineProperty( Benchmark.prototype, 'run', {
	'value': require( './run.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Forcefully ends a benchmark.
*
* @private
* @memberof Benchmark.prototype
* @function exit
*/
Object.defineProperty( Benchmark.prototype, 'exit', {
	'value': require( './exit.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Returns a `boolean` indicating if a benchmark has ended.
*
* @private
* @memberof Benchmark.prototype
* @function ended
* @returns {boolean} boolean indicating if a benchmark has ended
*/
Object.defineProperty( Benchmark.prototype, 'ended', {
	'value': require( './ended.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Generates an assertion.
*
* @private
* @memberof Benchmark.prototype
* @function _assert
* @param {boolean} ok - assertion outcome
* @param {Options} opts - options
*/
Object.defineProperty( Benchmark.prototype, '_assert', {
	'value': require( './assert.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Writes a comment.
*
* @memberof Benchmark.prototype
* @function comment
* @param {string} msg - comment message
*/
setReadOnly( Benchmark.prototype, 'comment', require( './comment.js' ) );

/**
* Generates an assertion which will be skipped.
*
* @memberof Benchmark.prototype
* @function skip
* @param {*} value - value
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'skip', require( './skip.js' ) );

/**
* Generates an assertion which should be implemented.
*
* @memberof Benchmark.prototype
* @function todo
* @param {*} value - value
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'todo', require( './todo.js' ) );

/**
* Generates a failing assertion.
*
* @memberof Benchmark.prototype
* @function fail
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'fail', require( './fail.js' ) );

/**
* Generates a passing assertion.
*
* @memberof Benchmark.prototype
* @function pass
* @param {string} msg - message
*/
setReadOnly( Benchmark.prototype, 'pass', require( './pass.js' ) );

/**
* Asserts that a `value` is truthy.
*
* @memberof Benchmark.prototype
* @function ok
* @param {*} value - value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'ok', require( './ok.js' ) );

/**
* Asserts that a `value` is falsy.
*
* @memberof Benchmark.prototype
* @function notOk
* @param {*} value - value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'notOk', require( './not_ok.js' ) );

/**
* Asserts that `actual` is strictly equal to `expected`.
*
* @memberof Benchmark.prototype
* @function equal
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'equal', require( './equal.js' ) );

/**
* Asserts that `actual` is not strictly equal to `expected`.
*
* @memberof Benchmark.prototype
* @function notEqual
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
setReadOnly( Benchmark.prototype, 'notEqual', require( './not_equal.js' ) );

/**
* Asserts that `actual` is deeply equal to `expected`.
*
* @memberof Benchmark.prototype
* @function deepEqual
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
setReadOnly( Benchmark.prototype, 'deepEqual', require( './deep_equal.js' ) );

/**
* Asserts that `actual` is not deeply equal to `expected`.
*
* @memberof Benchmark.prototype
* @function notDeepEqual
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
setReadOnly( Benchmark.prototype, 'notDeepEqual', require( './not_deep_equal.js' ) );

/**
* Ends a benchmark.
*
* @memberof Benchmark.prototype
* @function end
*/
setReadOnly( Benchmark.prototype, 'end', require( './end.js' ) );


// EXPORTS //

module.exports = Benchmark;

},{"./assert.js":83,"./comment.js":85,"./deep_equal.js":86,"./end.js":87,"./ended.js":88,"./equal.js":89,"./exit.js":90,"./fail.js":91,"./not_deep_equal.js":93,"./not_equal.js":94,"./not_ok.js":95,"./ok.js":96,"./pass.js":97,"./run.js":98,"./skip.js":100,"./todo.js":101,"@stdlib/time/tic":361,"@stdlib/time/toc":365,"@stdlib/utils/define-read-only-property":374,"@stdlib/utils/inherit":393,"events":426}],93:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that `actual` is not deeply equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] message
*/
function notDeepEqual( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this.comment( 'actual: '+actual+'. expected: '+expected+'. msg: '+msg+'.' );
	// TODO: implement
} // end FUNCTION notDeepEqual()


// EXPORTS //

module.exports = notDeepEqual;

},{}],94:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that `actual` is not strictly equal to `expected`.
*
* @private
* @param {*} actual - actual value
* @param {*} expected - expected value
* @param {string} [msg] - message
*/
function notEqual( actual, expected, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( actual !== expected, {
		'message': msg || 'should not be equal',
		'operator': 'notEqual',
		'expected': expected,
		'actual': actual
	});
} // end FUNCTION notEqual()


// EXPORTS //

module.exports = notEqual;

},{}],95:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that a `value` is falsy.
*
* @private
* @param {*} value - value
* @param {string} [msg] - message
*/
function notOk( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( !value, {
		'message': msg || 'should be falsy',
		'operator': 'notOk',
		'expected': false,
		'actual': value
	});
} // end FUNCTION notOk()


// EXPORTS //

module.exports = notOk;

},{}],96:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Asserts that a `value` is truthy.
*
* @private
* @param {*} value - value
* @param {string} [msg] - message
*/
function ok( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( !!value, {
		'message': msg || 'should be truthy',
		'operator': 'ok',
		'expected': true,
		'actual': value
	});
} // end FUNCTION ok()


// EXPORTS //

module.exports = ok;

},{}],97:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Generates a passing assertion.
*
* @private
* @param {string} msg - message
*/
function pass( msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( true, {
		'message': msg,
		'operator': 'pass'
	});
} // end FUNCTION pass()


// EXPORTS //

module.exports = pass;

},{}],98:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var timeout = require( './set_timeout.js' );
var clear = require( './clear_timeout.js' );


// MAIN //

/**
* Runs a benchmark.
*
* @private
* @returns {void}
*/
function run() {
	/* eslint-disable no-invalid-this */
	var self;
	var id;
	if ( this._skip ) {
		this.comment( 'SKIP '+this.name );
		return this.end();
	}
	if ( !this._benchmark ) {
		this.comment( 'TODO '+this.name );
		return this.end();
	}
	self = this;
	this._running = true;

	id = timeout( onTimeout, this.timeout );
	this.once( 'end', endTimeout );

	this.emit( 'prerun' );
	this._benchmark( this );
	this.emit( 'run' );

	/**
	* Callback invoked once a timeout ends.
	*
	* @private
	*/
	function onTimeout() {
		self.fail( 'benchmark timed out after '+self.timeout+'ms' );
	} // end FUNCTION onTimeout()

	/**
	* Clears a timeout.
	*
	* @private
	*/
	function endTimeout() {
		clear( id );
	} // end FUNCTION endTimeout()
} // end FUNCTION run()


// EXPORTS //

module.exports = run;

},{"./clear_timeout.js":84,"./set_timeout.js":99}],99:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = setTimeout;

},{}],100:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Generates an assertion which will be skipped.
*
* @private
* @param {*} value - value
* @param {string} msg - message
*/
function skip( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( true, {
		'message': msg,
		'operator': 'skip',
		'skip': true
	});
} // end FUNCTION skip()


// EXPORTS //

module.exports = skip;

},{}],101:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Generates an assertion which should be implemented.
*
* @private
* @param {*} value - value
* @param {string} msg - message
*/
function todo( value, msg ) {
	/* eslint-disable no-invalid-this */
	this._assert( !!value, {
		'message': msg,
		'operator': 'todo',
		'todo': true
	});
} // end FUNCTION todo()


// EXPORTS //

module.exports = todo;

},{}],102:[function(require,module,exports){
module.exports={
	"skip": false,
	"iterations": null,
	"repeats": 3,
	"timeout": 300000
}

},{}],103:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isObject = require( '@stdlib/assert/is-plain-object' );
var isNodeWritableStreamLike = require( '@stdlib/assert/is-node-writable-stream-like' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var pick = require( '@stdlib/utils/pick' );
var omit = require( '@stdlib/utils/omit' );
var noop = require( '@stdlib/utils/noop' );
var createHarness = require( './harness' );
var logStream = require( './log' );
var canEmitExit = require( './utils/can_emit_exit.js' );
var proc = require( './utils/process.js' );


// MAIN //

/**
* Creates a benchmark harness which supports closing when a process exits.
*
* @private
* @param {Options} [options] - function options
* @param {boolean} [options.autoclose] - boolean indicating whether to automatically close a harness after a harness finishes running all benchmarks
* @param {Stream} [options.stream] - output writable stream
* @param {Callback} [clbk] - callback to invoke when a harness finishes running all benchmarks
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} callback argument must be a function
* @returns {Function} benchmark harness
*
* @example
* var bench = createExitHarness( onFinish );
*
* function onFinish() {
*     bench.close();
* }
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*
* @example
* var stream = createExitHarness().createStream();
* stream.pipe( process.stdout );
*/
function createExitHarness() {
	var exitCode;
	var pipeline;
	var harness;
	var options;
	var stream;
	var topts;
	var opts;
	var clbk;

	if ( arguments.length === 0 ) {
		options = {};
		clbk = noop;
	} else if ( arguments.length === 1 ) {
		if ( isFunction( arguments[ 0 ] ) ) {
			options = {};
			clbk = arguments[ 0 ];
		} else if ( isObject( arguments[ 0 ] ) ) {
			options = arguments[ 0 ];
			clbk = noop;
		} else {
			throw new TypeError( 'invalid input argument. Must provide either an options object or a callback function. Value: `'+arguments[ 0 ]+'`.' );
		}
	} else {
		options = arguments[ 0 ];
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+options+'`.' );
		}
		clbk = arguments[ 1 ];
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'invalid input argument. Second argument must be a function. Value: `'+clbk+'`.' );
		}
	}
	opts = {};
	if ( hasOwnProp( options, 'autoclose' ) ) {
		opts.autoclose = options.autoclose;
		if ( !isBoolean( opts.autoclose ) ) {
			throw new TypeError( 'invalid option. `autoclose` option must be a boolean primitive. Option: `'+opts.autoclose+'`.' );
		}
	}
	if ( hasOwnProp( options, 'stream' ) ) {
		opts.stream = options.stream;
		if ( !isNodeWritableStreamLike( opts.stream ) ) {
			throw new TypeError( 'invalid option. `stream` option must be a writable stream. Option: `'+opts.stream+'`.' );
		}
	}
	exitCode = 0;

	// Create a new harness:
	topts = pick( opts, [ 'autoclose' ] );
	harness = createHarness( topts, done );

	// Create a results stream:
	topts = omit( options, [ 'autoclose', 'stream' ] );
	stream = harness.createStream( topts );

	// Pipe results to an output stream:
	pipeline = stream.pipe( opts.stream || logStream() );

	// If a process can emit an 'exit' event, capture errors in order to set the exit code...
	if ( canEmitExit ) {
		pipeline.on( 'error', onError );
		proc.on( 'exit', onExit );
	}
	return harness;

	/**
	* Callback invoked when a harness finishes.
	*
	* @private
	* @returns {void}
	*/
	function done() {
		return clbk();
	} // end FUNCTION done()

	/**
	* Callback invoked upon a stream `error` event.
	*
	* @private
	* @param {Error} error - error object
	*/
	function onError() {
		exitCode = 1;
	} // end FUNCTION onError()

	/**
	* Callback invoked upon an `exit` event.
	*
	* @private
	* @param {integer} code - exit code
	*/
	function onExit( code ) {
		if ( code !== 0 ) {
			// Allow the process to exit...
			return;
		}
		harness.close();
		proc.exit( exitCode || harness.exitCode );
	} // end FUNCTION onExit()
} // end FUNCTION createExitHarness()


// EXPORTS //

module.exports = createExitHarness;

},{"./harness":105,"./log":111,"./utils/can_emit_exit.js":122,"./utils/process.js":125,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-boolean":8,"@stdlib/assert/is-function":18,"@stdlib/assert/is-node-writable-stream-like":34,"@stdlib/assert/is-plain-object":57,"@stdlib/utils/noop":403,"@stdlib/utils/omit":405,"@stdlib/utils/pick":407}],104:[function(require,module,exports){
'use strict';

// MODULES //

var canEmitExit = require( './utils/can_emit_exit.js' );
var createExitHarness = require( './exit_harness.js' );


// VARIABLES //

var harness;


// MAIN //

/**
* Returns a benchmark harness. If a harness has already been created, returns the cached harness.
*
* @private
* @param {Options} [options] - harness options
* @param {Callback} [clbk] - callback to invoke when a harness finishes running all benchmarks
* @returns {Function} benchmark harness
*/
function getHarness( options, clbk ) {
	var opts;
	var cb;
	if ( harness ) {
		return harness;
	}
	if ( arguments.length > 1 ) {
		opts = options;
		cb = clbk;
	} else {
		opts = {};
		cb = options;
	}
	opts.autoclose = !canEmitExit;
	harness = createExitHarness( opts, cb );

	// Update state:
	getHarness.cached = true;

	return harness;
} // end FUNCTION getHarness()


// EXPORTS //

module.exports = getHarness;

},{"./exit_harness.js":103,"./utils/can_emit_exit.js":122}],105:[function(require,module,exports){
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isFunction = require( '@stdlib/assert/is-function' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var copy = require( '@stdlib/utils/copy' );
var Benchmark = require( './../benchmark-class' );
var Runner = require( './../runner' );
var nextTick = require( './../utils/next_tick.js' );
var DEFAULTS = require( './../defaults.json' );
var validate = require( './validate.js' );
var init = require( './init.js' );


// MAIN //

/**
* Creates a benchmark harness.
*
* @param {Options} [options] - function options
* @param {boolean} [options.autoclose] - boolean indicating whether to automatically close a harness after a harness finishes running all benchmarks
* @param {Callback} [clbk] - callback to invoke when a harness finishes running all benchmarks
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {TypeError} callback argument must be a function
* @returns {Function} benchmark harness
*
* @example
* var bench = createHarness( onFinish );
*
* function onFinish() {
*     bench.close();
*     console.log( 'Exit code: %d', bench.exitCode );
* }
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*
* @example
* var stream = createHarness().createStream();
* stream.pipe( process.stdout );
*/
function createHarness( options, clbk ) {
	var exitCode;
	var runner;
	var queue;
	var opts;
	var cb;

	opts = {};
	if ( arguments.length === 1 ) {
		if ( isFunction( options ) ) {
			cb = options;
		} else if ( isObject( options ) ) {
			opts = options;
		} else {
			throw new TypeError( 'invalid input argument. Must provide either an options object or a callback function. Value: `'+options+'`.' );
		}
	} else if ( arguments.length > 1 ) {
		if ( !isObject( options ) ) {
			throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+options+'`.' );
		}
		if ( hasOwnProp( options, 'autoclose' ) ) {
			opts.autoclose = options.autoclose;
			if ( !isBoolean( opts.autoclose ) ) {
				throw new TypeError( 'invalid option. `autoclose` option must be a boolean primitive. Option: `'+opts.autoclose+'`.' );
			}
		}
		cb = clbk;
		if ( !isFunction( cb ) ) {
			throw new TypeError( 'invalid input argument. Second argument must be a function. Value: `'+cb+'`.' );
		}
	}
	runner = new Runner();
	if ( opts.autoclose ) {
		runner.once( 'done', close );
	}
	if ( cb ) {
		runner.once( 'done', cb );
	}
	exitCode = 0;
	queue = [];

	/**
	* Benchmark harness.
	*
	* @private
	* @param {string} name - benchmark name
	* @param {Options} [options] - benchmark options
	* @param {boolean} [options.skip=false] - boolean indicating whether to skip a benchmark
	* @param {(PositiveInteger|null)} [options.iterations=null] - number of iterations
	* @param {PositiveInteger} [options.repeats=3] - number of repeats
	* @param {PositiveInteger} [options.timeout=300000] - number of milliseconds before a benchmark automatically fails
	* @param {Function} [benchmark] - function containing benchmark code
	* @throws {TypeError} first argument must be a string
	* @throws {TypeError} options argument must be an object
	* @throws {TypeError} must provide valid options
	* @throws {TypeError} benchmark argument must a function
	* @throws {Error} benchmark error
	* @returns {Function} benchmark harness
	*/
	function harness( name, options, benchmark ) {
		var opts;
		var err;
		var b;
		if ( !isString( name ) ) {
			throw new TypeError( 'invalid input argument. First argument must be a string. Value: `'+name+'`.' );
		}
		opts = copy( DEFAULTS );
		if ( arguments.length === 2 ) {
			if ( isFunction( options ) ) {
				b = options;
			} else {
				err = validate( opts, options );
				if ( err ) {
					throw err;
				}
			}
		} else if ( arguments.length > 2 ) {
			err = validate( opts, options );
			if ( err ) {
				throw err;
			}
			b = benchmark;
			if ( !isFunction( b ) ) {
				throw new TypeError( 'invalid input argument. Third argument must be a function. Value: `'+b+'`.' );
			}
		}
		// Add the benchmark to the initialization queue:
		queue.push( [ name, opts, b ] );

		// Perform initialization on the next turn of the event loop (note: this allows all benchmarks to be "registered" within the same turn of the loop; otherwise, we run the risk of registration-execution race conditions (i.e., a benchmark registers and executes before other benchmarks can register, depleting the benchmark queue and leading the harness to close)):
		if ( queue.length === 1 ) {
			nextTick( initialize );
		}
		return harness;
	} // end FUNCTION harness()

	/**
	* Initializes each benchmark.
	*
	* @private
	* @returns {void}
	*/
	function initialize() {
		var idx = -1;
		return next();

		/**
		* Initialize the next benchmark.
		*
		* @private
		* @returns {void}
		*/
		function next() {
			var args;

			idx += 1;

			// If all benchmarks have been initialized, begin running the benchmarks:
			if ( idx === queue.length ) {
				queue.length = 0;
				return runner.run();
			}
			// Initialize the next benchmark:
			args = queue[ idx ];
			init( args[ 0 ], args[ 1 ], args[ 2 ], onInit );
		} // end FUNCTION initBenchmark()

		/**
		* Callback invoked after performing initialization tasks.
		*
		* @private
		* @param {string} name - benchmark name
		* @param {Options} opts - benchmark options
		* @param {(Function|undefined)} benchmark - function containing benchmark code
		* @returns {void}
		*/
		function onInit( name, opts, benchmark ) {
			var b;
			var i;

			// Create a `Benchmark` instance for each repeat to ensure each benchmark has its own state...
			for ( i = 0; i < opts.repeats; i++ ) {
				b = new Benchmark( name, opts, benchmark );
				b.on( 'result', onResult );
				runner.push( b );
			}
			return next();
		} // end FUNCTION onInit()
	} // end FUNCTION initialize()

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(string|Object)} result - result
	*/
	function onResult( result ) {
		if (
			!isString( result ) &&
			!result.ok &&
			!result.todo
		) {
			exitCode = 1;
		}
	} // end FUNCTION onResult()

	/**
	* Returns a results stream.
	*
	* @private
	* @param {Object} [options] - options
	* @returns {TransformStream} transform stream
	*/
	function createStream( options ) {
		if ( arguments.length ) {
			return runner.createStream( options );
		}
		return runner.createStream();
	} // end FUNCTION createStream()

	/**
	* Closes a benchmark harness.
	*
	* @private
	*/
	function close() {
		runner.close();
	} // end FUNCTION close()

	/**
	* Forcefully exits a benchmark harness.
	*
	* @private
	*/
	function exit() {
		runner.exit();
	} // end FUNCTION exit()

	/**
	* Returns the harness exit code.
	*
	* @private
	* @returns {NonNegativeInteger} exit code
	*/
	function getExitCode() {
		return exitCode;
	} // end FUNCTION getExitCode()

	setReadOnly( harness, 'createStream', createStream );
	setReadOnly( harness, 'close', close );
	setReadOnly( harness, 'exit', exit );

	Object.defineProperty( harness, 'exitCode', {
		'configurable': false,
		'enumerable': true,
		'get': getExitCode
	});

	return harness;
} // end FUNCTION createHarness()


// EXPORTS //

module.exports = createHarness;

},{"./../benchmark-class":92,"./../defaults.json":102,"./../runner":119,"./../utils/next_tick.js":124,"./init.js":106,"./validate.js":109,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-boolean":8,"@stdlib/assert/is-function":18,"@stdlib/assert/is-plain-object":57,"@stdlib/assert/is-string":73,"@stdlib/utils/copy":371,"@stdlib/utils/define-read-only-property":374}],106:[function(require,module,exports){
'use strict';

// MODULES //

var pretest = require( './pretest.js' );
var iterations = require( './iterations.js' );


// MAIN //

/**
* Performs benchmark initialization tasks.
*
* @private
* @param {string} name - benchmark name
* @param {Options} opts - benchmark options
* @param {(Function|undefined)} benchmark - function containing benchmark code
* @param {Callback} clbk - callback to invoke after completing initialization tasks
* @returns {void}
*/
function init( name, opts, benchmark, clbk ) {
	// If no benchmark function, then the benchmark is considered a "todo", so no need to repeat multiple times...
	if ( !benchmark ) {
		opts.repeats = 1;
		return clbk( name, opts, benchmark );
	}
	// If the `skip` option to `true`, no need to initialize or repeat multiple times as will not be running the benchmark:
	if ( opts.skip ) {
		opts.repeats = 1;
		return clbk( name, opts, benchmark );
	}
	// Perform pretests:
	pretest( name, opts, benchmark, onPreTest );

	/**
	* Callback invoked upon completing pretests.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {void}
	*/
	function onPreTest( error ) {
		// If the pretests failed, don't run the benchmark multiple times...
		if ( error ) {
			opts.repeats = 1;
			opts.iterations = 1;
			return clbk( name, opts, benchmark );
		}
		// If a user specified an iteration number, we can begin running benchmarks...
		if ( opts.iterations ) {
			return clbk( name, opts, benchmark );
		}
		// Determine iteration number:
		iterations( name, opts, benchmark, onIterations );
	} // end FUNCTION onPreTest()

	/**
	* Callback invoked upon determining an iteration number.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {PositiveInteger} iter - number of iterations
	* @returns {void}
	*/
	function onIterations( error, iter ) {
		// If provided an error, then a benchmark failed, and, similar to pretests, don't run the benchmark multiple times...
		if ( error ) {
			opts.repeats = 1;
			opts.iterations = 1;
			return clbk( name, opts, benchmark );
		}
		opts.iterations = iter;
		return clbk( name, opts, benchmark );
	} // end FUNCTION onEnd()
} // end FUNCTION init()


// EXPORTS //

module.exports = init;

},{"./iterations.js":107,"./pretest.js":108}],107:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var copy = require( '@stdlib/utils/copy' );
var Benchmark = require( './../benchmark-class' );


// VARIABLES //

var MIN_TIME = 0.1; // seconds
var ITERATIONS = 10; // 10^1
var MAX_ITERATIONS = 10000000000; // 10^10


// MAIN //

/**
* Determines the number of iterations.
*
* @private
* @param {string} name - benchmark name
* @param {Options} options - benchmark options
* @param {(Function|undefined)} benchmark - function containing benchmark code
* @param {Callback} clbk - callback to invoke after determining number of iterations
* @returns {void}
*/
function iterations( name, options, benchmark, clbk ) {
	var opts;
	var time;

	// Elapsed time (in seconds):
	time = 0;

	// Create a local copy:
	opts = copy( options );
	opts.iterations = ITERATIONS;

	// Begin running benchmarks:
	return next();

	/**
	* Run a new benchmark.
	*
	* @private
	*/
	function next() {
		var b = new Benchmark( name, opts, benchmark );
		b.on( 'result', onResult );
		b.once( 'end', onEnd );
		b.run();
	} // end FUNCTION next()

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(string|Object)} result - result
	*/
	function onResult( result ) {
		if ( !isString( result ) && result.operator === 'result' ) {
			time = result.elapsed;
		}
	} // end FUNCTION onResult()

	/**
	* Callback invoked upon an `end` event.
	*
	* @private
	* @returns {void}
	*/
	function onEnd() {
		if (
			time < MIN_TIME &&
			opts.iterations < MAX_ITERATIONS
		) {
			opts.iterations *= 10;
			return next();
		}
		clbk( null, opts.iterations );
	} // end FUNCTION onEnd()
} // end FUNCTION iterations()


// EXPORTS //

module.exports = iterations;

},{"./../benchmark-class":92,"@stdlib/assert/is-string":73,"@stdlib/utils/copy":371}],108:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var copy = require( '@stdlib/utils/copy' );
var Benchmark = require( './../benchmark-class' );


// MAIN //

/**
* Runs pretests to sanity check and/or catch failures.
*
* @private
* @param {string} name - benchmark name
* @param {Options} options - benchmark options
* @param {(Function|undefined)} benchmark - function containing benchmark code
* @param {Callback} clbk - callback to invoke after completing pretests
*/
function pretest( name, options, benchmark, clbk ) {
	var fail;
	var opts;
	var tic;
	var toc;
	var b;

	// Counters to determine the number of `tic` and `toc` events:
	tic = 0;
	toc = 0;

	// Local copy:
	opts = copy( options );
	opts.iterations = 1;

	// Pretest to check for minimum requirements and/or errors...
	b = new Benchmark( name, opts, benchmark );
	b.on( 'result', onResult );
	b.on( 'tic', onTic );
	b.on( 'toc', onToc );
	b.once( 'end', onEnd );
	b.run();

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(string|Object)} result - result
	*/
	function onResult( result ) {
		if (
			!isString( result ) &&
			!result.ok &&
			!result.todo
		) {
			fail = true;
		}
	} // end FUNCTION onResult()

	/**
	* Callback invoked upon a `tic` event.
	*
	* @private
	*/
	function onTic() {
		tic += 1;
	} // end FUNCTION onTic()

	/**
	* Callback invoked upon a `toc` event.
	*
	* @private
	*/
	function onToc() {
		toc += 1;
	} // end FUNCTION onToc()

	/**
	* Callback invoked upon an `end` event.
	*
	* @private
	* @returns {void}
	*/
	function onEnd() {
		var err;
		if ( fail ) {
			// Possibility that failure is intermittent, but we will assume that the usual case is that the failure would persist across all repeats and no sense failing multiple times when once suffices.
			err = new Error( 'benchmark failed' );
		} else if ( tic !== 1 || toc !== 1 ) {
			// Unable to do anything definitive with timing information (e.g., a tic with no toc or vice versa, or benchmark function calls neither tic nor toc).
			err = new Error( 'invalid benchmark' );
		}
		if ( err ) {
			return clbk( err );
		}
		return clbk();
	} // end FUNCTION onEnd()
} // end FUNCTION pretest()


// EXPORTS //

module.exports = pretest;

},{"./../benchmark-class":92,"@stdlib/assert/is-string":73,"@stdlib/utils/copy":371}],109:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isNull = require( '@stdlib/assert/is-null' );
var isPositiveInteger = require( '@stdlib/assert/is-positive-integer' ).isPrimitive;


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {boolean} [options.skip] - boolean indicating whether to skip a benchmark
* @param {(PositiveInteger|null)} [options.iterations] - number of iterations
* @param {PositiveInteger} [options.repeats] - number of repeats
* @param {PositiveInteger} [options.timeout] - number of milliseconds before a benchmark automatically fails
* @returns {(Error|null)} error object or null
*
* @example
* var opts = {};
* var options = {
*     'skip': false,
*     'iterations': 1e6,
*     'repeats': 3,
*     'timeout': 10000
* };
*
* var err = validate( opts, options );
* if ( err ) {
*    throw err;
* }
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( hasOwnProp( options, 'skip' ) ) {
		opts.skip = options.skip;
		if ( !isBoolean( opts.skip ) ) {
			return new TypeError( 'invalid option. `skip` option must be a boolean primitive. Option: `' + opts.skip + '`.' );
		}
	}
	if ( hasOwnProp( options, 'iterations' ) ) {
		opts.iterations = options.iterations;
		if (
			!isPositiveInteger( opts.iterations ) &&
			!isNull( opts.iterations )
		) {
			return new TypeError( 'invalid option. `iterations` option must be either a positive integer or `null`. Option: `' + opts.iterations + '`.' );
		}
	}
	if ( hasOwnProp( options, 'repeats' ) ) {
		opts.repeats = options.repeats;
		if ( !isPositiveInteger( opts.repeats ) ) {
			return new TypeError( 'invalid option. `repeats` option must be a positive integer. Option: `' + opts.repeats + '`.' );
		}
	}
	if ( hasOwnProp( options, 'timeout' ) ) {
		opts.timeout = options.timeout;
		if ( !isPositiveInteger( opts.timeout ) ) {
			return new TypeError( 'invalid option. `timeout` option must be a positive integer. Option: `' + opts.timeout + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-boolean":8,"@stdlib/assert/is-null":45,"@stdlib/assert/is-plain-object":57,"@stdlib/assert/is-positive-integer":60}],110:[function(require,module,exports){
'use strict';

/**
* Benchmark harness.
*
* @module @stdlib/bench/harness
*
* @example
* var bench = require( '@stdlib/bench/harness' );
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*/

// MODULES //

var bench = require( './bench.js' );


// EXPORTS //

module.exports = bench;

},{"./bench.js":82}],111:[function(require,module,exports){
'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/utils/transform' );
var log = require( './log.js' );


// MAIN //

/**
* Returns a Transform stream for logging to the console.
*
* @private
* @returns {TransformStream} transform stream
*/
function createStream() {
	var stream;
	var line;

	stream = new TransformStream({
		'transform': transform,
		'flush': flush
	});
	line = '';

	return stream;

	/**
	* Callback invoked upon receiving a new chunk.
	*
	* @private
	* @param {(Buffer|string)} chunk - chunk
	* @param {string} enc - Buffer encoding
	* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
	*/
	function transform( chunk, enc, clbk ) {
		var c;
		var i;

		for ( i = 0; i < chunk.length; i++ ) {
			c = String.fromCharCode( chunk[ i ] );
			if ( c === '\n' ) {
				flush();
			} else {
				line += c;
			}
		}
		clbk();
	} // end FUNCTION transform()

	/**
	* Callback to flush data to `stdout`.
	*
	* @private
	* @param {Callback} [clbk] - callback to invoke after processing data
	* @returns {void}
	*/
	function flush( clbk ) {
		try {
			log( line );
		} catch ( err ) {
			stream.emit( 'error', err );
		}
		line = '';
		if ( clbk ) {
			return clbk();
		}
	} // end FUNCTION flush()
} // end FUNCTION createStream()


// EXPORTS //

module.exports = createStream;

},{"./log.js":112,"@stdlib/streams/utils/transform":349}],112:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Writes a string to the console.
*
* @private
* @param {string} str - string to write
*/
function log( str ) {
	console.log( str ); // eslint-disable-line no-console
} // end FUNCTION log()


// EXPORTS //

module.exports = log;

},{}],113:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Removes any pending benchmarks.
*
* @private
*/
function clear() {
	/* eslint-disable no-invalid-this */
	this._benchmarks.length = 0;
} // end FUNCTION clear()


// EXPORTS //

module.exports = clear;

},{}],114:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Closes a benchmark runner.
*
* @private
* @returns {void}
*/
function closeRunner() {
	/* eslint-disable no-invalid-this */
	var self = this;
	if ( this._closed ) {
		return;
	}
	this._closed = true;
	if ( this._benchmarks.length ) {
		this.clear();
		this._stream.write( '# WARNING: harness closed before completion.\n' );
	} else {
		this._stream.write( '#\n' );
		this._stream.write( '1..'+this.total+'\n' );
		this._stream.write( '# total '+this.total+'\n' );
		this._stream.write( '# pass  '+this.pass+'\n' );
		if ( this.fail ) {
			this._stream.write( '# fail  '+this.fail+'\n' );
		}
		if ( this.skip ) {
			this._stream.write( '# skip  '+this.skip+'\n' );
		}
		if ( this.todo ) {
			this._stream.write( '# todo  '+this.todo+'\n' );
		}
		if ( !this.fail ) {
			this._stream.write( '#\n# ok\n' );
		}
	}
	this._stream.once( 'close', onClose );
	this._stream.destroy();

	/**
	* Callback invoked upon a `close` event.
	*
	* @private
	*/
	function onClose() {
		self.emit( 'close' );
	} // end FUNCTION onClose()
} // end FUNCTION closeRunner()


// EXPORTS //

module.exports = closeRunner;

},{}],115:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var TransformStream = require( '@stdlib/streams/utils/transform' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var nextTick = require( './../utils/next_tick.js' );


// VARIABLES //

var TAP_HEADER = 'TAP version 13';


// MAIN //

/**
* Creates a results stream.
*
* @private
* @param {Options} [options] - stream options
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @returns {TransformStream} transform stream
*/
function createStream( options ) {
	/* eslint-disable no-invalid-this */
	var stream;
	var opts;
	var self;
	var id;

	self = this;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	stream = new TransformStream( opts );
	if ( opts.objectMode ) {
		id = 0;
		this.on( '_push', onPush );
		this.on( 'done', onDone );
	} else {
		stream.write( TAP_HEADER+'\n' );
		this._stream.pipe( stream );
	}
	this.on( '_run', onRun );
	return stream;

	/**
	* Runs the next benchmark.
	*
	* @private
	*/
	function next() {
		nextTick( onTick );
	} // end FUNCTION next()

	/**
	* Callback invoked upon the next tick.
	*
	* @private
	* @returns {void}
	*/
	function onTick() {
		var b = self._benchmarks.shift();
		if ( b ) {
			b.run();
			if ( !b.ended() ) {
				return b.once( 'end', next );
			}
			return next();
		}
		self._running = false;
		self.emit( 'done' );
	} // end FUNCTION onTick()

	/**
	* Callback invoked upon a run event.
	*
	* @private
	* @returns {void}
	*/
	function onRun() {
		if ( !self._running ) {
			self._running = true;
			return next();
		}
	} // end FUNCTION onRun()

	/**
	* Callback invoked upon a push event.
	*
	* @private
	* @param {Benchmark} b - benchmark
	*/
	function onPush( b ) {
		var bid = id;
		id += 1;

		b.once( 'prerun', onPreRun );
		b.on( 'result', onResult );
		b.on( 'end', onEnd );

		/**
		* Callback invoked upon a `prerun` event.
		*
		* @private
		*/
		function onPreRun() {
			var row = {
				'type': 'benchmark',
				'name': b.name,
				'id': bid
			};
			stream.write( row );
		} // end FUNCTION onPreRun()

		/**
		* Callback invoked upon a `result` event.
		*
		* @private
		* @param {(Object|string)} res - result
		*/
		function onResult( res ) {
			if ( isString( res ) ) {
				res = {
					'benchmark': bid,
					'type': 'comment',
					'name': res
				};
			} else if ( res.operator === 'result' ) {
				res.benchmark = bid;
				res.type = 'result';
			} else {
				res.benchmark = bid;
				res.type = 'assert';
			}
			stream.write( res );
		} // end FUNCTION onResult()

		/**
		* Callback invoked upon an `end` event.
		*
		* @private
		*/
		function onEnd() {
			stream.write({
				'benchmark': bid,
				'type': 'end'
			});
		} // end FUNCTION onEnd()
	} // end FUNCTION onPush()

	/**
	* Callback invoked upon a `done` event.
	*
	* @private
	*/
	function onDone() {
		stream.destroy();
	} // end FUNCTION onDone()
} // end FUNCTION createStream()


// EXPORTS //

module.exports = createStream;

},{"./../utils/next_tick.js":124,"@stdlib/assert/is-string":73,"@stdlib/streams/utils/transform":349}],116:[function(require,module,exports){
'use strict';

// MODULES //

var replace = require( '@stdlib/string/replace' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var RE_EOL = require( '@stdlib/regexp/eol' );


// VARIABLES //

var RE_WHITESPACE = /\s+/g;


// MAIN //

/**
* Encodes an assertion.
*
* @private
* @param {Object} result - result
* @param {PositiveInteger} count - result count
* @returns {string} encoded assertion
*/
function encodeAssertion( result, count ) {
	var actualStack;
	var errorStack;
	var expected;
	var actual;
	var indent;
	var stack;
	var lines;
	var out;
	var i;

	out = '';

	if ( !result.ok ) {
		out += 'not ';
	}
	// Add result count:
	out += 'ok ' + count;

	// Add description:
	if ( result.name ) {
		out += ' ' + replace( result.name.toString(), RE_WHITESPACE, ' ' );
	}
	// Append directives:
	if ( result.skip ) {
		out += ' # SKIP';
	} else if ( result.todo ) {
		out += ' # TODO';
	}
	out += '\n';
	if ( result.ok ) {
		return out;
	}
	// Format diagnostics as YAML...
	indent = '  ';
	out += indent + '---\n';
	out += indent + 'operator: ' + result.operator + '\n';
	if (
		hasOwnProp( result, 'actual' ) ||
		hasOwnProp( result, 'expected' )
	) {
		// TODO: inspect object logic (https://github.com/substack/tape/blob/master/lib/results.js#L145)
		expected = result.expected;
		actual = result.actual;
		if ( actual !== actual && expected !== expected ) {
			throw new Error( 'TODO: remove me' );
		}
	}
	if ( result.at ) {
		out += indent + 'at: ' + result.at + '\n';
	}
	if ( result.actual ) {
		actualStack = result.actual.stack;
	}
	if ( result.error ) {
		errorStack = result.error.stack;
	}
	if ( actualStack ) {
		stack = actualStack;
	} else {
		stack = errorStack;
	}
	if ( stack ) {
		lines = stack.toString().split( RE_EOL );
		out += indent + 'stack: |-\n';
		for ( i = 0; i < lines.length; i++ ) {
			out += indent + '  ' + lines[ i ] + '\n';
		}
	}
	out += indent + '...\n';
	return out;
} // end FUNCTION encodeAssertion()


// EXPORTS //

module.exports = encodeAssertion;

},{"@stdlib/assert/has-own-property":2,"@stdlib/regexp/eol":341,"@stdlib/string/replace":355}],117:[function(require,module,exports){
'use strict';

// VARIABLES //

var YAML_INDENT = '  ';
var YAML_BEGIN = YAML_INDENT + '---\n';
var YAML_END = YAML_INDENT + '...\n';


// MAIN //

/**
* Encodes a result as a YAML block.
*
* @private
* @param {Object} result - result
* @returns {string} encoded result
*/
function encodeResult( result ) {
	var out = YAML_BEGIN;
	out += YAML_INDENT + 'iterations: '+result.iterations+'\n';
	out += YAML_INDENT + 'elapsed: '+result.elapsed+'\n';
	out += YAML_INDENT + 'rate: '+result.rate+'\n';
	out += YAML_END;
	return out;
} // end FUNCTION encodeResult()


// EXPORTS //

module.exports = encodeResult;

},{}],118:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Forcefully exits a benchmark runner.
*
* @private
*/
function exit() {
	/* eslint-disable no-invalid-this */
	var self;
	var i;
	for ( i = 0; i < this._benchmarks.length; i++ ) {
		this._benchmarks[ i ].exit();
	}
	self = this;
	this.clear();
	this._stream.once( 'close', onClose );
	this._stream.destroy();

	/**
	* Callback invoked upon a `close` event.
	*
	* @private
	*/
	function onClose() {
		self.emit( 'close' );
	} // end FUNCTION onClose()
} // end FUNCTION exit()


// EXPORTS //

module.exports = exit;

},{}],119:[function(require,module,exports){
'use strict';

// MODULES //

var EventEmitter = require( 'events' ).EventEmitter;
var inherit = require( '@stdlib/utils/inherit' );
var TransformStream = require( '@stdlib/streams/utils/transform' );


// MAIN //

/**
* Benchmark runner.
*
* @private
* @constructor
* @returns {Runner} Runner instance
*
* @example
* var runner = new Runner();
*/
function Runner() {
	if ( !( this instanceof Runner ) ) {
		return new Runner();
	}
	EventEmitter.call( this );

	// Private properties:
	Object.defineProperty( this, '_benchmarks', {
		'value': [],
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_stream', {
		'value': new TransformStream(),
		'configurable': false,
		'writable': false,
		'enumerable': false
	});

	Object.defineProperty( this, '_closed', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	Object.defineProperty( this, '_running', {
		'value': false,
		'configurable': false,
		'writable': true,
		'enumerable': false
	});

	// Public properties:
	Object.defineProperty( this, 'total', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'fail', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'pass', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'skip', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	Object.defineProperty( this, 'todo', {
		'value': 0,
		'configurable': false,
		'writable': true,
		'enumerable': true
	});

	return this;
} // end FUNCTION Runner()

/*
* Inherit from the `EventEmitter` prototype.
*/
inherit( Runner, EventEmitter );

/**
* Adds a new benchmark.
*
* @private
* @memberof Runner.prototype
* @function push
* @param {Benchmark} b - benchmark
*/
Object.defineProperty( Runner.prototype, 'push', {
	'value': require( './push.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Creates a results stream.
*
* @private
* @memberof Runner.prototype
* @function createStream
* @param {Options} [options] - stream options
* @returns {TransformStream} transform stream
*/
Object.defineProperty( Runner.prototype, 'createStream', {
	'value': require( './create_stream.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Runs pending benchmarks.
*
* @private
* @memberof Runner.prototype
* @function run
*/
Object.defineProperty( Runner.prototype, 'run', {
	'value': require( './run.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Removes any pending benchmarks.
*
* @private
* @memberof Runner.prototype
* @function clear
*/
Object.defineProperty( Runner.prototype, 'clear', {
	'value': require( './clear.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Closes a benchmark runner.
*
* @private
* @memberof Runner.prototype
* @function close
*/
Object.defineProperty( Runner.prototype, 'close', {
	'value': require( './close.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});

/**
* Forcefully exits a benchmark runner.
*
* @private
* @memberof Runner.prototype
* @function exit
*/
Object.defineProperty( Runner.prototype, 'exit', {
	'value': require( './exit.js' ),
	'configurable': false,
	'writable': false,
	'enumerable': false
});


// EXPORTS //

module.exports = Runner;

},{"./clear.js":113,"./close.js":114,"./create_stream.js":115,"./exit.js":118,"./push.js":120,"./run.js":121,"@stdlib/streams/utils/transform":349,"@stdlib/utils/inherit":393,"events":426}],120:[function(require,module,exports){
/* eslint-disable no-underscore-dangle */
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var encodeAssertion = require( './encode_assertion.js' );
var encodeResult = require( './encode_result.js' );


// MAIN //

/**
* Adds a new benchmark.
*
* @private
* @param {Benchmark} b - benchmark
*/
function push( b ) {
	/* eslint-disable no-invalid-this */
	var self = this;

	this._benchmarks.push( b );

	b.once( 'prerun', onPreRun );
	b.on( 'result', onResult );

	this.emit( '_push', b );

	/**
	* Callback invoked upon a `prerun` event.
	*
	* @private
	*/
	function onPreRun() {
		self._stream.write( '# '+b.name+'\n' );
	} // end FUNCTION onPreRun()

	/**
	* Callback invoked upon a `result` event.
	*
	* @private
	* @param {(Object|string)} res - result
	* @returns {void}
	*/
	function onResult( res ) {
		// Check for a comment...
		if ( isString( res ) ) {
			return self._stream.write( '# '+res+'\n' );
		}
		if ( res.operator === 'result' ) {
			res = encodeResult( res );
			return self._stream.write( res );
		}
		self.total += 1;
		if ( res.ok ) {
			if ( res.skip ) {
				self.skip += 1;
			} else if ( res.todo ) {
				self.todo += 1;
			}
			self.pass += 1;
		}
		// According to the TAP spec, todos pass even if not "ok"...
		else if ( res.todo ) {
			self.pass += 1;
			self.todo += 1;
		}
		// Everything else is a failure...
		else {
			self.fail += 1;
		}
		res = encodeAssertion( res, self.total );
		self._stream.write( res );
	} // end FUNCTION onResult()
} // end FUNCTION push()


// EXPORTS //

module.exports = push;

},{"./encode_assertion.js":116,"./encode_result.js":117,"@stdlib/assert/is-string":73}],121:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Runs pending benchmarks.
*
* @private
*/
function run() {
	/* eslint-disable no-invalid-this */
	this.emit( '_run' );
} // end FUNCTION run()


// EXPORTS //

module.exports = run;

},{}],122:[function(require,module,exports){
'use strict';

// MODULES //

var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var canExit = require( './can_exit.js' );


// EXPORTS //

module.exports = ( !IS_BROWSER && canExit );

},{"./can_exit.js":123,"@stdlib/assert/is-browser":13}],123:[function(require,module,exports){
'use strict';

// MODULES //

var proc = require( './process.js' );


// EXPORTS //

module.exports = ( proc && typeof proc.exit === 'function' );

},{"./process.js":125}],124:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Runs a function on a subsequent turn of the event loop.
*
* ## Notes
*
* * `process.nextTick` is only Node.js.
* * `setImmediate` is non-standard.
* * Everything else is browser based (e.g., mutation observer, requestAnimationFrame, etc).
* * Only API which is universal is `setTimeout`.
* * Note that `0` is not actually `0ms`. Browser environments commonly have a minimum delay of `4ms`. This is acceptable. Here, the main intent of this function is to give the runtime a chance to run garbage collection, clear state, and tend to any other pending tasks before returning control to benchmark tasks. The larger aim (attainable or not) is to provide each benchmark run with as much of a fresh state as possible.
*
*
* @private
* @param {Function} fcn - function to run upon a subsequent turn of the event loop
*/
function nextTick( fcn ) {
	setTimeout( fcn, 0 );
} // end FUNCTION nextTick()


// EXPORTS //

module.exports = nextTick;

},{}],125:[function(require,module,exports){
(function (process){
'use strict';

// EXPORTS //

module.exports = process;

}).call(this,require('_process'))
},{"_process":420}],126:[function(require,module,exports){
'use strict';

/**
* Benchmark harness.
*
* @module @stdlib/bench
*
* @example
* var bench = require( '@stdlib/bench' );
*
* bench( 'beep', function benchmark( b ) {
*     var x;
*     var i;
*     b.tic();
*     for ( i = 0; i < b.iterations; i++ ) {
*         x = Math.sin( Math.random() );
*         if ( x !== x ) {
*             b.ok( false, 'should not return NaN' );
*         }
*     }
*     b.toc();
*     if ( x !== x ) {
*         b.ok( false, 'should not return NaN' );
*     }
*     b.end();
* });
*/

// MODULES //

var bench = require( '@stdlib/bench/harness' );


// EXPORTS //

module.exports = bench;

},{"@stdlib/bench/harness":110}],127:[function(require,module,exports){
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

},{"./is_even.js":128}],128:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":131}],129:[function(require,module,exports){
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

},{"./is_infinite.js":130}],130:[function(require,module,exports){
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
* @example
* var bool = isInfinite( Number.NEGATIVE_INFINITY );
* // returns true
* @example
* var bool = isInfinite( 5.0 );
* // returns false
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
} // end FUNCTION isInfinite()


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],131:[function(require,module,exports){
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

},{"./is_integer.js":132}],132:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":209}],133:[function(require,module,exports){
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

},{"./is_nan.js":134}],134:[function(require,module,exports){
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
* @example
* var bool = isnan( 7.0 );
* // returns false
*/
function isnan( x ) {
	return (x !== x);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{}],135:[function(require,module,exports){
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

},{"./is_negative_zero.js":136}],136:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":333}],137:[function(require,module,exports){
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

},{"./is_odd.js":138}],138:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":127}],139:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( -0.0 );
* // returns false
*/

// MODULES //

var isPositiveZero = require( './is_positive_zero.js' );


// EXPORTS //

module.exports = isPositiveZero;

},{"./is_positive_zero.js":140}],140:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Tests if a numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
} // end FUNCTION isPositiveZero()


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/math/constants/float64-pinf":335}],141:[function(require,module,exports){
'use strict';

// MODULES //

var gammainc = require( '@stdlib/math/base/special/gammainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for an inverse gamma distribution with shape parameter `alpha` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 1.0, 1.0 );
* // returns ~0.607
* @example
* var y = cdf( 2.0, 3.0, 1.0 );
* // returns ~0.986
* @example
* var y = cdf( -1.0, 2.0, 2.0 );
* // returns 0.0
* @example
* var y = cdf( +Infinity, 4.0, 2.0 );
* // returns 1.0
* @example
* var y = cdf( -Infinity, 4.0, 2.0 );
* // returns 0.0
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = cdf( 0.0, 0.0, NaN );
* // returns NaN
* @example
* var y = cdf( 2.0, -1.0, 1.0 );
* // returns NaN
* @example
* var y = cdf( 2.0, 1.0, -1.0 );
* // returns NaN
*/
function cdf( x, alpha, beta ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		return 0.0;
	}
	return gammainc( beta / x, alpha, true, true );
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/gammainc":220}],142:[function(require,module,exports){
'use strict';

// MODULES //

var gammainc = require( '@stdlib/math/base/special/gammainc' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for an inverse gamma distribution with shape parameter `alpha` and scale parameter `beta`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 3.0, 1.5 );
*
* var y = cdf( 1.0 );
* // returns ~0.809
*
* y = cdf( 2.0 );
* // returns ~0.96
*/
function factory( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return nan;
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for an inverse gamma distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= 0 ) {
			return 0;
		}
		return gammainc( beta / x, alpha, true, true );
	} // end FUNCTION cdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":144,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/gammainc":220}],143:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dist/invgamma/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dist/invgamma/cdf' );
*
* var y = cdf( 1.0, 8.0, 3.0 );
* // returns ~0.988
*
* y = cdf( 0.0, 1.0, 1.0 );
* // returns 0.0
*
* var mycdf = cdf.factory( 2.0, 0.5 );
* y = mycdf( 0.5 );
* // returns ~0.736
*
* y = mycdf( 2.0 );
* // returns ~0.973
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":141,"./factory.js":142,"@stdlib/utils/define-read-only-property":374}],144:[function(require,module,exports){
'use strict';

/**
* Evaluates the cumulative distribution function (CDF) for an invalid inverse gamma distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = cdf( 2.1 );
* // returns NaN
*/
function cdf() {
	return NaN;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;

},{}],145:[function(require,module,exports){
'use strict';

// MODULES //

var bench = require( '@stdlib/bench' );
var randu = require( '@stdlib/math/base/random/randu' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var pkg = require( './../package.json' ).name;
var InvGamma = require( './../lib' );


// MAIN //

bench( pkg+'::instantiation', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var i;

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		alpha = ( randu() * 10.0 ) + EPS;
		beta = ( randu() * 10.0 ) + EPS;
		dist = new InvGamma( alpha, beta );
		if ( !( dist instanceof InvGamma ) ) {
			b.fail( 'should return a distribution instance' );
		}
	}
	b.toc();
	if ( !( dist instanceof InvGamma ) ) {
		b.fail( 'should return a distribution instance' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::get:alpha', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var y;
	var i;

	alpha = 10.332;
	beta =15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		y = dist.alpha;
		if ( y !== alpha ) {
			b.fail( 'should return set value' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::set:alpha', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		y = ( 100.0*randu() ) + EPS;
		dist.alpha = y;
		if ( dist.alpha !== y ) {
			b.fail( 'should return set value' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::get:beta', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		y = dist.beta;
		if ( y !== beta ) {
			b.fail( 'should return set value' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::set:beta', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		y = ( 100.0*randu() ) + EPS;
		dist.beta = y;
		if ( dist.beta !== y ) {
			b.fail( 'should return set value' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':entropy', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		dist.alpha = ( 100.0*randu() ) + EPS;
		y = dist.entropy;
		if ( isnan( y ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':kurtosis', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		dist.alpha = ( 100.0*randu() ) + 4.0 + EPS;
		y = dist.kurtosis;
		if ( isnan( y ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':mean', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		dist.alpha = ( 100.0*randu() ) + 1.0 + EPS;
		y = dist.mean;
		if ( isnan( y ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':mode', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		dist.alpha = ( 100.0*randu() ) + EPS;
		y = dist.mode;
		if ( isnan( y ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':skewness', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		dist.alpha = ( 100.0*randu() ) + 3.0 + EPS;
		y = dist.skewness;
		if ( isnan( y ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':variance', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		dist.alpha = ( 100.0*randu() ) + 2.0 + EPS;
		y = dist.variance;
		if ( isnan( y ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':cdf', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var x;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		x = randu();
		y = dist.cdf( x );
		if ( isnan( y ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':pdf', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var x;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		x = randu();
		y = dist.pdf( x );
		if ( isnan( y ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+':quantile', function benchmark( b ) {
	var alpha;
	var beta;
	var dist;
	var x;
	var y;
	var i;

	alpha = 10.332;
	beta = 15.54321;
	dist = new InvGamma( alpha, beta );

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		x = randu();
		y = dist.quantile( x );
		if ( isnan( y ) ) {
			b.fail( 'should not return NaN' );
		}
	}
	b.toc();
	if ( isnan( y ) ) {
		b.fail( 'should not return NaN' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

},{"./../lib":147,"./../package.json":148,"@stdlib/bench":126,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/random/randu":180,"@stdlib/math/constants/float64-eps":319}],146:[function(require,module,exports){
/* eslint-disable no-restricted-syntax, no-invalid-this */
'use strict';

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isPositive = require( '@stdlib/assert/is-positive-number' ).isPrimitive;
var entropy = require( '@stdlib/math/base/dist/invgamma/entropy' );
var kurtosis = require( '@stdlib/math/base/dist/invgamma/kurtosis' );
var mean = require( '@stdlib/math/base/dist/invgamma/mean' );
var mode = require( '@stdlib/math/base/dist/invgamma/mode' );
var quantile = require( '@stdlib/math/base/dist/invgamma/quantile' );
var skewness = require( '@stdlib/math/base/dist/invgamma/skewness' );
var variance = require( '@stdlib/math/base/dist/invgamma/variance' );
var cdf = require( '@stdlib/math/base/dist/invgamma/cdf' );
var pdf = require( '@stdlib/math/base/dist/invgamma/pdf' );


// FUNCTIONS //

/**
* Evaluates the cumulative distribution function (CDF).
*
* @private
* @param {number} x - input value
* @returns {number} evaluated CDF
*/
function invgammaCDF( x ) {
	return cdf( x, this.alpha, this.beta );
} // end FUNCTION invgammaCDF()

/**
* Evaluates the probability density function (PDF).
*
* @private
* @param {number} x - input value
* @returns {number} evaluated PDF
*/
function invgammaPDF( x ) {
	return pdf( x, this.alpha, this.beta );
} // end FUNCTION invgammaPDF()

/**
* Evaluates the quantile function.
*
* @private
* @param {Probability} p - input probability
* @returns {number} evaluated quantile function
*/
function invgammaQuantile( p ) {
	return quantile( p, this.alpha, this.beta );
} // end FUNCTION invgammaQuantile()


// MAIN //

/**
* Inverse gamma distribution constructor.
*
* @constructor
* @param {PositiveNumber} [alpha=1.0] - shape parameter
* @param {PositiveNumber} [beta=1.0] - scale parameter
* @throws {TypeError} `alpha` must be a positive number
* @throws {TypeError} `beta` must be a positive number
* @returns {InvGamma} distribution instance
*
* @example
* var invgamma = new InvGamma( 1.0, 1.0 );
*
* var y = invgamma.cdf( 0.8 );
* // returns ~0.287
*
* var mode = invgamma.mode;
* // returns 0.5
*/
function InvGamma() {
	var alpha;
	var beta;
	if ( !(this instanceof InvGamma) ) {
		if ( arguments.length === 0 ) {
			return new InvGamma();
		}
		return new InvGamma( arguments[ 0 ], arguments[ 1 ] );
	}
	if ( arguments.length ) {
		alpha = arguments[ 0 ];
		beta = arguments[ 1 ];
		if ( !isPositive( alpha ) ) {
			throw new TypeError( 'invalid input argument. First shape parameter `alpha` must be a positive number. Value: `' + alpha + '`' );
		}
		if ( !isPositive( beta ) ) {
			throw new TypeError( 'invalid input argument. Second shape parameter `beta` must be a positive number. Value: `' + beta + '`' );
		}
	} else {
		alpha = 1.0;
		beta = 1.0;
	}
	Object.defineProperty( this, 'alpha', {
		'configurable': false,
		'enumerable': true,
		'get': function get() {
			return alpha;
		},
		'set': function set( value ) {
			if ( !isPositive( value ) ) {
				throw new TypeError( 'invalid value. Must be a positive number. Value: `' + value + '`' );
			}
			alpha = value;
		}
	});
	Object.defineProperty( this, 'beta', {
		'configurable': false,
		'enumerable': true,
		'get': function get() {
			return beta;
		},
		'set': function set( value ) {
			if ( !isPositive( value ) ) {
				throw new TypeError( 'invalid value. Must be a positive number. Value: `' + value + '`' );
			}
			beta = value;
		}
	});
	return this;
} // end FUNCTION InvGamma()

/**
* Inverse gamma distribution differential entropy.
*
* @memberof InvGamma.prototype
* @name entropy
* @type {number}
* @see [differential entropy]{@link https://en.wikipedia.org/wiki/Entropy_%28information_theory%29}
*
* @example
* var invgamma = new InvGamma( 4.0, 12.0 );
*
* var v = invgamma.entropy;
* // returns ~1.966
*/
Object.defineProperty( InvGamma.prototype, 'entropy', {
	'configurable': false,
	'enumerable': true,
	'get': function get() {
		return entropy( this.alpha, this.beta );
	}
});

/**
* Inverse gamma distribution excess kurtosis.
*
* @memberof InvGamma.prototype
* @name kurtosis
* @type {number}
* @see [kurtosis]{@link https://en.wikipedia.org/wiki/Kurtosis}
*
* @example
* var invgamma = new InvGamma( 6.0, 12.0 );
*
* var v = invgamma.kurtosis;
* // returns 19.0
*/
Object.defineProperty( InvGamma.prototype, 'kurtosis', {
	'configurable': false,
	'enumerable': true,
	'get': function get() {
		return kurtosis( this.alpha, this.beta );
	}
});

/**
* Inverse gamma distribution expected value.
*
* @memberof InvGamma.prototype
* @name mean
* @type {number}
* @see [expected value]{@link https://en.wikipedia.org/wiki/Expected_value}
*
* @example
* var invgamma = new InvGamma( 4.0, 12.0 );
*
* var v = invgamma.mean;
* // returns 4.0
*/
Object.defineProperty( InvGamma.prototype, 'mean', {
	'configurable': false,
	'enumerable': true,
	'get': function get() {
		return mean( this.alpha, this.beta );
	}
});

/**
* Inverse gamma distribution mode.
*
* @memberof InvGamma.prototype
* @name mode
* @type {number}
* @see [mode]{@link https://en.wikipedia.org/wiki/Mode_%28statistics%29}
*
* @example
* var invgamma = new InvGamma( 4.0, 12.0 );
*
* var v = invgamma.mode;
* // returns 2.4
*/
Object.defineProperty( InvGamma.prototype, 'mode', {
	'configurable': false,
	'enumerable': true,
	'get': function get() {
		return mode( this.alpha, this.beta );
	}
});

/**
* Inverse gamma distribution skewness.
*
* @memberof InvGamma.prototype
* @name skewness
* @type {number}
* @see [skewness]{@link https://en.wikipedia.org/wiki/Skewness}
*
* @example
* var invgamma = new InvGamma( 4.0, 12.0 );
*
* var v = invgamma.skewness;
* // returns ~5.657
*/
Object.defineProperty( InvGamma.prototype, 'skewness', {
	'configurable': false,
	'enumerable': true,
	'get': function get() {
		return skewness( this.alpha, this.beta );
	}
});

/**
* Inverse gamma distribution variance.
*
* @memberof InvGamma.prototype
* @name variance
* @type {number}
* @see [variance]{@link https://en.wikipedia.org/wiki/Variance}
*
* @example
* var invgamma = new InvGamma( 4.0, 12.0 );
*
* var v = invgamma.variance;
* // returns 8.0
*/
Object.defineProperty( InvGamma.prototype, 'variance', {
	'configurable': false,
	'enumerable': true,
	'get': function get() {
		return variance( this.alpha, this.beta );
	}
});

/**
* Evaluates the cumulative distribution function (CDF).
*
* @memberof InvGamma.prototype
* @name cdf
* @type {Function}
* @param {number} x - input value
* @returns {number} evaluated CDF
* @see [cdf]{@link https://en.wikipedia.org/wiki/Cumulative_distribution_function}
*
* @example
* var invgamma = new InvGamma( 2.0, 4.0 );
*
* var v = invgamma.cdf( 0.5 );
* // returns ~0.003
*/
setReadOnly( InvGamma.prototype, 'cdf', invgammaCDF );

/**
* Evaluates the probability density function (PDF).
*
* @memberof InvGamma.prototype
* @name pdf
* @type {Function}
* @param {number} x - input value
* @returns {number} evaluated PDF
* @see [pdf]{@link https://en.wikipedia.org/wiki/Probability_density_function}
*
* @example
* var invgamma = new InvGamma( 2.0, 4.0 );
*
* var v = invgamma.pdf( 0.8 );
* // returns ~0.211
*/
setReadOnly( InvGamma.prototype, 'pdf', invgammaPDF );

/**
* Evaluates the quantile function.
*
* @memberof InvGamma.prototype
* @name quantile
* @type {Function}
* @param {Probability} p - input probability
* @returns {number} evaluated quantile function
* @see [quantile function]{@link https://en.wikipedia.org/wiki/Quantile_function}
*
* @example
* var invgamma = new InvGamma( 2.0, 4.0 );
*
* var v = invgamma.quantile( 0.5 );
* // returns ~2.383
*/
setReadOnly( InvGamma.prototype, 'quantile', invgammaQuantile );


// EXPORTS //

module.exports = InvGamma;

},{"@stdlib/assert/is-positive-number":64,"@stdlib/math/base/dist/invgamma/cdf":143,"@stdlib/math/base/dist/invgamma/entropy":150,"@stdlib/math/base/dist/invgamma/kurtosis":151,"@stdlib/math/base/dist/invgamma/mean":153,"@stdlib/math/base/dist/invgamma/mode":155,"@stdlib/math/base/dist/invgamma/pdf":158,"@stdlib/math/base/dist/invgamma/quantile":162,"@stdlib/math/base/dist/invgamma/skewness":165,"@stdlib/math/base/dist/invgamma/variance":167,"@stdlib/utils/define-read-only-property":374}],147:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution constructor.
*
* @module @stdlib/math/base/dist/invgamma/ctor
*
* @example
* var InvGamma = require( '@stdlib/math/base/dist/invgamma/ctor' );
*
* var invgamma = new InvGamma( 1.0, 1.0 );
*
* var y = invgamma.cdf( 0.8 );
* // returns ~0.287
*
* var mode = invgamma.mode;
* // returns 0.5
*/

// MODULES //

var ctor = require( './ctor.js' );


// EXPORTS //

module.exports = ctor;

},{"./ctor.js":146}],148:[function(require,module,exports){
module.exports={
  "name": "@stdlib/math/base/dist/invgamma/ctor",
  "version": "0.0.0",
  "description": "Inverse gamma distribution constructor.",
  "author": {
    "name": "The Stdlib Authors",
    "url": "https://github.com/stdlib-js/stdlib/graphs/contributors"
  },
  "contributors": [
    {
      "name": "The Stdlib Authors",
      "url": "https://github.com/stdlib-js/stdlib/graphs/contributors"
    }
  ],
  "scripts": {},
  "main": "./lib",
  "repository": {
    "type": "git",
    "url": "git://github.com/stdlib-js/stdlib.git"
  },
  "homepage": "https://github.com/stdlib-js/stdlib",
  "keywords": [
    "stdlib",
    "stdmath",
    "statistics",
    "stats",
    "distribution",
    "dist",
    "object",
    "class",
    "constructor",
    "ctor",
    "probability",
    "prob",
    "inverse",
    "gamma",
    "invgamma",
    "cdf",
    "pdf",
    "quantile",
    "properties",
    "props"
  ],
  "bugs": {
    "url": "https://github.com/stdlib-js/stdlib/issues"
  },
  "dependencies": {},
  "devDependencies": {},
  "engines": {
    "node": ">=0.10.0"
  },
  "license": "Apache-2.0"
}

},{}],149:[function(require,module,exports){
'use strict';

// MODULES //

var digamma = require( '@stdlib/math/base/special/digamma' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Returns the differential entropy of an inverse gamma distribution.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {number} entropy
*
* @example
* var v = entropy( 1.0, 1.0 );
* // returns ~2.154
* @example
* var v = entropy( 4.0, 12.0 );
* // returns ~1.996
* @example
* var v = entropy( 8.0, 2.0 );
* // returns ~-0.922
* @example
* var v = entropy( 1.0, -0.1 );
* // returns NaN
* @example
* var v = entropy( -0.1, 1.0 );
* // returns NaN
* @example
* var v = entropy( 2.0, NaN );
* // returns NaN
* @example
* var v = entropy( NaN, 2.0 );
* // returns NaN
*/
function entropy( alpha, beta ) {
	var out;
	if ( alpha <= 0.0 || beta <= 0.0 ) {
		return NaN;
	}
	out = alpha + ln( beta*gamma( alpha ) );
	out -= ( 1.0+alpha ) * digamma( alpha );
	return out;
} // end FUNCTION entropy()


// EXPORTS //

module.exports = entropy;

},{"@stdlib/math/base/special/digamma":197,"@stdlib/math/base/special/gamma":211,"@stdlib/math/base/special/ln":241}],150:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution differential entropy.
*
* @module @stdlib/math/base/dist/invgamma/entropy
*
* @example
* var entropy = require( '@stdlib/math/base/dist/invgamma/entropy' );
*
* var v = entropy( 1.0, 1.0 );
* // returns ~2.154
*
* v = entropy( 4.0, 12.0 );
* // returns ~1.996
*
* v = entropy( 8.0, 2.0 );
* // returns ~-0.922
*/

// MODULES //

var entropy = require( './entropy.js' );


// EXPORTS //

module.exports = entropy;

},{"./entropy.js":149}],151:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution excess kurtosis.
*
* @module @stdlib/math/base/dist/invgamma/kurtosis
*
* @example
* var kurtosis = require( '@stdlib/math/base/dist/invgamma/kurtosis' );
*
* var v = kurtosis( 7.0, 5.0 );
* // returns 12.0
*
* v = kurtosis( 6.0, 12.0 );
* // returns 19.0
*
* v = kurtosis( 8.0, 2.0 );
* // returns ~8.7
*/

// MODULES //

var kurtosis = require( './kurtosis.js' );


// EXPORTS //

module.exports = kurtosis;

},{"./kurtosis.js":152}],152:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Returns the excess kurtosis of an inverse gamma distribution.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {PositiveNumber} kurtosis
*
* @example
* var v = kurtosis( 6.0, 1.0 );
* // returns 19.0
* @example
* var v = kurtosis( 5.0, 12.0 );
* // returns 42.0
* @example
* var v = kurtosis( 8.0, 2.0 );
* // returns ~8.7
* @example
* var v = kurtosis( 5.0, -0.1 );
* // returns NaN
* @example
* var v = kurtosis( 6.0, -0.1 );
* // returns NaN
* @example
* var v = kurtosis( -0.1, 1.0 );
* // returns NaN
* @example
* var v = kurtosis( 2.0, NaN );
* // returns NaN
* @example
* var v = kurtosis( NaN, 2.0 );
* // returns NaN
*/
function kurtosis( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 4.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	return ( ( 30.0*alpha ) - 66.0 ) / ( ( alpha-3.0 ) * ( alpha-4.0 ) );
} // end FUNCTION kurtosis()


// EXPORTS //

module.exports = kurtosis;

},{"@stdlib/math/base/assert/is-nan":133}],153:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution expected value.
*
* @module @stdlib/math/base/dist/invgamma/mean
*
* @example
* var mean = require( '@stdlib/math/base/dist/invgamma/mean' );
*
* var v = mean( 4.0, 12.0 );
* // returns 4.0
*
* v = mean( 8.0, 2.0 );
* // returns ~0.286
*/

// MODULES //

var mean = require( './mean.js' );


// EXPORTS //

module.exports = mean;

},{"./mean.js":154}],154:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Returns the expected value of an inverse gamma distribution.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {PositiveNumber} expected value
*
* @example
* var v = mean( 4.0, 12.0 );
* // returns 4.0
* @example
* var v = mean( 8.0, 2.0 );
* // returns ~0.286
* @example
* var v = mean( 1.0, 1.0 );
* // returns NaN
* @example
* var v = mean( 1.0, -0.1 );
* // returns NaN
* @example
* var v = mean( -0.1, 1.0 );
* // returns NaN
* @example
* var v = mean( 2.0, NaN );
* // returns NaN
* @example
* var v = mean( NaN, 2.0 );
* // returns NaN
*/
function mean( alpha, beta ) {
	if ( alpha <= 1.0 || beta <= 0.0 ) {
		return NaN;
	}
	return beta / ( alpha - 1.0 );
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;

},{}],155:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution mode.
*
* @module @stdlib/math/base/dist/invgamma/mode
*
* @example
* var mode = require( '@stdlib/math/base/dist/invgamma/mode' );
*
* var v = mode( 1.0, 1.0 );
* // returns 0.5
*
* v = mode( 4.0, 12.0 );
* // returns 2.4
*
* v = mode( 8.0, 2.0 );
* // returns ~0.222
*/

// MODULES //

var mode = require( './mode.js' );


// EXPORTS //

module.exports = mode;

},{"./mode.js":156}],156:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Returns the mode of an inverse gamma distribution.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {PositiveNumber} mode
*
* @example
* var v = mode( 1.0, 1.0 );
* // returns 0.5
* @example
* var v = mode( 4.0, 12.0 );
* // returns 2.4
* @example
* var v = mode( 8.0, 2.0 );
* // returns ~0.222
* @example
* var v = mode( 0.5, 2.0 );
* // returns NaN
* @example
* var v = mode( 1.0, -0.1 );
* // returns NaN
* @example
* var v = mode( -0.1, 1.0 );
* // returns NaN
* @example
* var v = mode( 2.0, NaN );
* // returns NaN
* @example
* var v = mode( NaN, 2.0 );
* // returns NaN
*/
function mode( alpha, beta ) {
	if ( alpha <= 0.0 || beta <= 0.0 ) {
		return NaN;
	}
	return beta / ( alpha + 1.0 );
} // end FUNCTION mode()


// EXPORTS //

module.exports = mode;

},{}],157:[function(require,module,exports){
'use strict';

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for an inverse gamma distribution with shape parameter `alpha` and scale parameter `beta`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} PDF
*
* @example
* var pdf = factory( 3.0, 1.5 );
*
* var y = pdf( 1.0 );
* // returns ~0.377
*
* y = pdf( 2.0 );
* // returns ~0.05
*/
function factory( alpha, beta ) {
	var firstTerm;
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return nan;
	}
	firstTerm = ( alpha * ln( beta ) ) - gammaln( alpha );
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for an inverse gamma distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( -1.2 );
	* // returns <number>
	*/
	function pdf( x ) {
		var lnl;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= 0.0 ) {
			return 0.0;
		}
		lnl = firstTerm - (( alpha + 1.0 ) * ln( x )) - (beta / x);
		return exp( lnl );
	} // end FUNCTION pdf()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":159,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/gammaln":238,"@stdlib/math/base/special/ln":241}],158:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution probability density function (PDF).
*
* @module @stdlib/math/base/dist/invgamma/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dist/invgamma/pdf' );
*
* var y = pdf( 2.0, 0.5, 1.0 );
* // returns ~0.121
*
* var myPDF = pdf.factory( 6.0, 7.0 );
* y = myPDF( 2.0 );
* // returns ~0.231
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":157,"./pdf.js":160,"@stdlib/utils/define-read-only-property":374}],159:[function(require,module,exports){
'use strict';

/**
* Evaluates the probability density function (PDF) for an invalid inverse gamma distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = pdf( 3.14 );
* // returns NaN
*/
function pdf() {
	return NaN;
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{}],160:[function(require,module,exports){
'use strict';

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for an inverse gamma distribution with shape parameter `alpha` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 0.5, 1.0 );
* // returns ~0.121
* @example
* var y = pdf( 0.2, 1.0, 1.0 );
* // returns ~0.168
* @example
* var y = pdf( -1.0, 4.0, 2.0 );
* // returns 0.0
* @example
* var y = pdf( NaN, 1.0, 1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = pdf( 0.0, 1.0, NaN );
* // returns NaN
* @example
* // Negative shape parameter:
* var y = pdf( 2.0, -1.0, 1.0 );
* // returns NaN
* @example
* // Negative scale parameter:
* var y = pdf( 2.0, 1.0, -1.0 );
* // returns NaN
*/
function pdf( x, alpha, beta ) {
	var lnl;
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		return 0.0;
	}
	lnl = (alpha * ln( beta )) - gammaln( alpha );
	lnl -= (alpha + 1.0) * ln( x );
	lnl -= beta / x;
	return exp( lnl );
} // end FUNCTION pdf()


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/gammaln":238,"@stdlib/math/base/special/ln":241}],161:[function(require,module,exports){
'use strict';

// MODULES //

var gammaincinv = require( '@stdlib/math/base/special/gammaincinv' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for an inverse gamma distribution with shape parameter `alpha` and scale parameter `beta`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 2.5, 0.5 );
* var y = quantile( 0.5 );
* // returns ~0.229
*
* y = quantile( 0.8 );
* // returns ~0.427
*/
function factory( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return nan;
	}
	return quantile;

	/**
	* Evaluates the quantile function for an iverse gamma distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return beta / gammaincinv( p, alpha, true );
	} // end FUNCTION quantile()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":163,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/gammaincinv":234}],162:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution quantile function.
*
* @module @stdlib/math/base/dist/invgamma/quantile
*
* @example
* var quantile = require( '@stdlib/math/base/dist/invgamma/quantile' );
*
* var y = quantile( 0.8, 1.0, 1.0 );
* // returns ~4.481
*
* var myquantile = quantile.factory( 2.0, 2.0 );
* y = myquantile( 0.8 );
* // returns ~2.426
*
* y = myquantile( 0.4 );
* // returns ~0.989
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = require( './quantile.js' );

},{"./factory.js":161,"./quantile.js":164,"@stdlib/utils/define-read-only-property":374}],163:[function(require,module,exports){
'use strict';

/**
* Evaluates the quantile function for an invalid inverse gamma distribution.
*
* @private
* @returns {number} `NaN`
*
* @example
* var y = quantile( 0.3 );
* // returns NaN
*/
function quantile() {
	return NaN;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{}],164:[function(require,module,exports){
'use strict';

// MODULES //

var gammaincinv = require( '@stdlib/math/base/special/gammaincinv' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the quantile function for a Inverse Gamma distribution with shape parameter `alpha` and scale parameter `beta` at a probability `p`.
*
* @param {Probability} p - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 2.0, 1.0 );
* // returns ~1.213
* @example
* var y = quantile( 0.5, 4.0, 2.0 );
* // returns ~0.545
* @example
* var y = quantile( 1.1, 1.0, 1.0 );
* // returns NaN
* @example
* var y = quantile( -0.2, 1.0, 1.0 );
* // returns NaN
* @example
* var y = quantile( NaN, 1.0, 1.0 );
* // returns NaN
* @example
* var y = quantile( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = quantile( 0.0, 1.0, NaN );
* // returns NaN
* @example
* // Non-positive shape parameter:
* var y = quantile( 0.5, -1.0, 1.0 );
* @example
* // Non-positive rate parameter:
* var y = quantile( 0.5, 1.0, -1.0 );
* // returns NaN
*/
function quantile( p, alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	return beta / gammaincinv( p, alpha, true );
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/gammaincinv":234}],165:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution skewness.
*
* @module @stdlib/math/base/dist/invgamma/skewness
*
* @example
* var skewness = require( '@stdlib/math/base/dist/invgamma/skewness' );
*
* var v = skewness( 4.0, 12.0 );
* // returns ~5.657
*
* v = skewness( 8.0, 2.0 );
* // returns ~1.96
*/

// MODULES //

var skewness = require( './skewness.js' );


// EXPORTS //

module.exports = skewness;

},{"./skewness.js":166}],166:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Returns the skewness of an inverse gamma distribution.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {PositiveNumber} skewness
*
* @example
* var v = skewness( 4.0, 12.0 );
* // returns ~5.657
* @example
* var v = skewness( 8.0, 2.0 );
* // returns ~1.96
* @example
* var v = skewness( 2.0, 1.0 );
* // returns NaN
* @example
* var v = skewness( 4.0, -0.1 );
* // returns NaN
* @example
* var v = skewness( -0.1, 1.0 );
* // returns NaN
* @example
* var v = skewness( 4.0, NaN );
* // returns NaN
* @example
* var v = skewness( NaN, 2.0 );
* // returns NaN
*/
function skewness( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 3.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	return 4.0 * sqrt( alpha - 2.0 ) / ( alpha - 3.0 );
} // end FUNCTION skewness()


// EXPORTS //

module.exports = skewness;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/sqrt":272}],167:[function(require,module,exports){
'use strict';

/**
* Inverse gamma distribution variance.
*
* @module @stdlib/math/base/dist/invgamma/variance
*
* @example
* var variance = require( '@stdlib/math/base/dist/invgamma/variance' );
*
* var v = variance( 5.0, 7.0 );
* // returns ~1.021
*
* v = variance( 4.0, 12.0 );
* // returns 8.0
*
* v = variance( 8.0, 2.0 );
* // returns ~0.014
*/

// MODULES //

var variance = require( './variance.js' );


// EXPORTS //

module.exports = variance;

},{"./variance.js":168}],168:[function(require,module,exports){
'use strict';

// MODULES //

var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Returns the variance of an inverse gamma distribution.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {PositiveNumber} variance
*
* @example
* var v = variance( 3.0, 5.0 );
* // returns ~6.25
* @example
* var v = variance( 4.0, 12.0 );
* // returns 8.0
* @example
* var v = variance( 8.0, 2.0 );
* // returns ~0.014
* @example
* var v = variance( 3.0, -0.1 );
* // returns NaN
* @example
* var v = variance( 1.5, 1.0 );
* // returns NaN
* @example
* var v = variance( 3.0, NaN );
* // returns NaN
* @example
* var v = variance( NaN, 2.0 );
* // returns NaN
*/
function variance( alpha, beta ) {
	if ( alpha <= 2.0 || beta <= 0.0 ) {
		return NaN;
	}
	return ( beta*beta ) / ( pow( alpha-1.0, 2.0 ) * ( alpha-2.0 ) );
} // end FUNCTION variance()


// EXPORTS //

module.exports = variance;

},{"@stdlib/math/base/special/pow":251}],169:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":133}],170:[function(require,module,exports){
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

},{"./create_table.js":169,"@stdlib/assert/is-positive-integer":60,"@stdlib/math/base/random/minstd":175,"@stdlib/math/base/special/floor":209,"@stdlib/math/constants/int32-max":339,"@stdlib/utils/define-read-only-property":374}],171:[function(require,module,exports){
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

},{"./factory.js":170,"./minstd_shuffled.js":172,"@stdlib/utils/define-read-only-property":374}],172:[function(require,module,exports){
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

},{"./factory.js":170,"./rand_int32.js":173}],173:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":209,"@stdlib/math/constants/int32-max":339}],174:[function(require,module,exports){
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

},{"./rand_int32.js":177,"@stdlib/assert/is-positive-integer":60,"@stdlib/math/constants/int32-max":339,"@stdlib/utils/define-read-only-property":374}],175:[function(require,module,exports){
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

},{"./factory.js":174,"./minstd.js":176,"@stdlib/utils/define-read-only-property":374}],176:[function(require,module,exports){
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

},{"./factory.js":174,"./rand_int32.js":177}],177:[function(require,module,exports){
arguments[4][173][0].apply(exports,arguments)
},{"@stdlib/math/base/special/floor":209,"@stdlib/math/constants/int32-max":339,"dup":173}],178:[function(require,module,exports){
module.exports={
	"name": "minstd-shuffle"
}

},{}],179:[function(require,module,exports){
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

},{"./defaults.json":178,"./prngs.js":181,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-plain-object":57,"@stdlib/utils/define-read-only-property":374}],180:[function(require,module,exports){
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

},{"./factory.js":179,"./uniform.js":182,"@stdlib/utils/define-read-only-property":374}],181:[function(require,module,exports){
'use strict';

// MAIN //

var prngs = {};

prngs[ 'minstd' ] = require( '@stdlib/math/base/random/minstd' );
prngs[ 'minstd-shuffle' ] = require( '@stdlib/math/base/random/minstd-shuffle' );


// EXPORTS //

module.exports = prngs;

},{"@stdlib/math/base/random/minstd":175,"@stdlib/math/base/random/minstd-shuffle":171}],182:[function(require,module,exports){
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

},{"./factory.js":179}],183:[function(require,module,exports){
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
* @example
* var v = abs( 2.0 );
* // returns 2.0
* @example
* var v = abs( 0.0 );
* // returns 0.0
* @example
* var v = abs( -0.0 );
* // returns 0.0
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

},{}],184:[function(require,module,exports){
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

},{"./abs.js":183}],185:[function(require,module,exports){
'use strict';

// TODO: implementation (?)

/**
* Rounds a numeric value toward positive infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = ceil( -4.2 );
* // returns -4.0
*
* @example
* var v = ceil( 9.99999 );
* // returns 10.0
*
* @example
* var v = ceil( 0.0 );
* // returns 0.0
*
* @example
* var v = ceil( NaN );
* // returns NaN
*/
var ceil = Math.ceil;


// EXPORTS //

module.exports = ceil;

},{}],186:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward positive infinity.
*
* @module @stdlib/math/base/special/ceil
*
* @example
* var ceil = require( '@stdlib/math/base/special/ceil' );
*
* var v = ceil( -4.2 );
* // returns -4.0
*
* v = ceil( 9.99999 );
* // returns 10.0
*
* v = ceil( 0.0 );
* // returns 0.0
*
* v = ceil( NaN );
* // returns NaN
*/

// MODULES //

var ceil = require( './ceil.js' );


// EXPORTS //

module.exports = ceil;

},{"./ceil.js":185}],187:[function(require,module,exports){
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
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
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

},{"@stdlib/math/base/utils/float64-from-words":295,"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-to-words":311}],188:[function(require,module,exports){
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

},{"./copysign.js":187}],189:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_cos.c?view=log}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var cosKernel = require( './cos_kernel.js' );
var sinKernel = require( './sin_kernel.js' );
var remPio2 = require( './rem_pio2.js' );


// MAIN //

/**
* Computes the cosine of a number.
*
* @param {number} x - input value
* @returns {number} cosine (in radians)
*
* @example
* var v = cos( 0.0 );
* // returns 1.0
* @example
* var v = cos( Math.PI/4.0 );
* // returns ~0.707
* @example
* var v = cos( -Math.PI/6.0 );
* // returns ~0.866
* @example
* var v = cos( NaN );
* // returns NaN
*/
function cos( x ) {
	var ix;
	var n;
	var y;
	var z;

	y = new Array( 2 );
	z = 0.0;
	ix = getHighWord( x );

	// Case: |x| ~< pi/4
	ix &= 0x7fffffff;
	if ( ix <= 0x3fe921fb ) {
		// Case: x < 2**-27
		if ( ix<0x3e400000 ) {
			if ( (x|0) === 0 ) {
				// Generate inexact...
				return 1.0;
			}
		}
		return cosKernel(x,z);
	}
	// Case: cos(Inf or NaN) is NaN */
	else if ( ix >= 0x7ff00000 ) {
		return NaN;
	}
	// Case: Argument reduction needed...
	else {
		n = remPio2( x, y );
		switch ( n & 3 ) {
		case 0:
			return cosKernel( y[0], y[1] );
		case 1:
			return -sinKernel( y[0], y[1], 1 );
		case 2:
			return -cosKernel( y[0], y[1] );
		default:
			return sinKernel( y[0], y[1], 1 );
		}
	}
} // end FUNCTION cos()


// EXPORTS //

module.exports = cos;

},{"./cos_kernel.js":190,"./rem_pio2.js":192,"./sin_kernel.js":194,"@stdlib/math/base/utils/float64-get-high-word":299}],190:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_cos.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// VARIABLES //

var C1  =  4.16666666666666019037e-02; /* 0x3FA55555, 0x5555554C */
var C2  = -1.38888888888741095749e-03; /* 0xBF56C16C, 0x16C15177 */
var C3  =  2.48015872894767294178e-05; /* 0x3EFA01A0, 0x19CB1590 */
var C4  = -2.75573143513906633035e-07; /* 0xBE927E4F, 0x809C52AD */
var C5  =  2.08757232129817482790e-09; /* 0x3E21EE9E, 0xBDB4B1C4 */
var C6  = -1.13596475577881948265e-11; /* 0xBDA8FAE9, 0xBE8838D4 */


// MAIN //

/**
* Compute the cos function on \\( [-\pi/4, \pi/4] \\), \\( \pi/4 \approx 0.785398164 \\)
*
* #### Method
*
* * Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive x.
* * If \\( x < 2^-27 \\), return 1 with inexact if \\( x \ne 0 \\).
* * \\( cos(x) \\) is approximated by a polynomial of degree 14 on \\( [0,\pi/4] \\)
*
*   ``` tex
*   \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*   ```
*
*   where the remez error is
*
*   ``` tex
*   \left| \cos(x) - \left( 1 - 0.5x^2 + C_1x^4 +C_2x^6 +C_3x^8 +C_4x^{10} +C_5x^{12}  +C_6x^{15} \right) \right| \le 2^{-58}
*   ```
* * Let \\( C_1x^4 +C_2x^6 +C_3x^8 +C_4x^{10} +C_5x^{12}  +C_6x^{14} \\), then
*
*   ``` tex
*    \cos(x) \approx 1 - \tfrac{x \cdot x}{2} + r
*   ```
*
*   Since \\( \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y \\), a correction term is necessary in \\( \cos(x) \\) and hence
*
*   ``` tex
*   \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*   ```
*
*   For better accuracy, rearrange to
*
*   ``` tex
*   \cos(x+y) \approx w + \left( tmp + ( r - x \cdot y ) \right)
*   ```
*
*   where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( tmp \\) is a tiny correction term ( \\( 1 - \frac{x \cdot x}{2} = w + tmp \\) exactly in infinite precision). The exactness of w + tmp in infinite precision depends on w and tmp having the same precision as x.
*
* @param {number} x - input value (assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of x.
* @returns {number} cosine (in radians)
*/
function cosKernel( x, y ) {
	var hz;
	var r;
	var w;
	var z;

	z  = x * x;
	w  = z * z;
	r  = z * ( C1 + z*(C2+z*C3) ) + w * w * ( C4 + z*(C5+z*C6) );
	hz = 0.5 * z;
	w  = 1.0 - hz;
	return w + ( ( (1.0-w) - hz ) + ( z*r - x*y ) );
} // end FUNCTION cosKernel()


// EXPORTS //

module.exports = cosKernel;

},{}],191:[function(require,module,exports){
'use strict';

/**
* Compute the cosine of a number.
*
* @module @stdlib/math/base/special/cos
*
* @example
* var cos = require( '@stdlib/math/base/special/cos' );
*
* var v = cos( 0.0 );
* // returns 1.0
*
* v = cos( Math.PI/4.0 );
* // returns ~0.707
*
* v = cos( -Math.PI/6.0 );
* // returns ~0.866
*/

// MODULES //

var cos = require( './cos.js' );


// EXPORTS //

module.exports = cos;

},{"./cos.js":189}],192:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*
* Optimized by Bruce D. Evans.
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
var round = require( '@stdlib/math/base/special/round' );
var remPio2Kernel = require( './rem_pio2_kernel.js' );


// VARIABLES //

var ZERO =  0.00000000000000000000e+00; /* 0x00000000, 0x00000000 */
var TWO24 =  1.67772160000000000000e+07; /* 0x41700000, 0x00000000 */

// 53 bits of 2/PI
var INVPIO2 =  6.36619772367581382433e-01; /* 0x3FE45F30, 0x6DC9C883 */

// First 33 bit of PI/2
var PIO2_1  =  1.57079632673412561417e+00; /* 0x3FF921FB, 0x54400000 */

// PIO2_1T = PI/2 - PIO2_1
var PIO2_1T =  6.07710050650619224932e-11; /* 0x3DD0B461, 0x1A626331 */

// Second 33 bit of PI/2
var PIO2_2  =  6.07710050630396597660e-11; /* 0x3DD0B461, 0x1A600000 */

// PIO2_2T = PI/2 - ( PIO2_1 + PIO2_2 )
var PIO2_2T =  2.02226624879595063154e-21; /* 0x3BA3198A, 0x2E037073 */

// Third 33 bit of PI/2
var PIO2_3  =  2.02226624871116645580e-21; /* 0x3BA3198A, 0x2E000000 */

// PIO2_3T = PI/2 - ( PIO2_1 + PIO2_2 + PIO2_3 )
var PIO2_3T =  8.47842766036889956997e-32; /* 0x397B839A, 0x252049C1 */


// MAIN //

/**
* Compute x - n*pi/2 = r. Returns n and stores the remainder `r`
* as two numbers y[0] and y[1] such that y[0]+y[1] = r.
*
* @private
* @param {number} x - input value
* @param {Array} y - remainder elements
* @returns {integer} n - factor of pi/2
*/
function remPio2( x, y ) {
	var low;
	var e0;
	var hx;
	var ix;
	var nx;
	var tx;
	var ty;
	var i;
	var n;
	var z;

	tx = new Array( 3 );
	ty = new Array( 2 );

	hx = getHighWord( x );
	ix = hx & 0x7fffffff;

	// Case: |x| ~<= pi/4 , no need for reduction
	if ( ix <= 0x3fe921fb ) {
		y[ 0 ] = x;
		y[ 1 ] = 0;
		return 0;
	}

	// Case: |x| ~<= 5pi/4
	if ( ix <= 0x400f6a7a ) {
		// Case: |x| ~= pi/2 or 2pi/2
		if ( (ix & 0xfffff) === 0x921fb ) {
			// Cancellation => use medium case
			return remPio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3pi/4
		if ( ix <= 0x4002d97c ) {
			if ( x > 0.0 ) {
				z = x - PIO2_1;
				y[ 0 ] = z - PIO2_1T;
				y[ 1 ] = ( z - y[0] ) - PIO2_1T;
				return 1.0;
			} else {
				z = x + PIO2_1;
				y[ 0 ] = z + PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + PIO2_1T;
				return -1.0;
			}
		}
		else {
			if ( x > 0.0 ) {
				z = x - 2 * PIO2_1;
				y[ 0 ] = z - 2 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) -2 * PIO2_1T;
				return 2;
			} else {
				z = x + 2 * PIO2_1;
				y[ 0 ] = z + 2 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + 2 * PIO2_1T;
				return -2;
			}
		}
	}
	// Case: |x| ~<= 9pi/4
	if ( ix <= 0x401c463b ) {
		// Case: |x| ~<= 7pi/4
		if ( ix <= 0x4015fdbc ) {
			// Case: |x| ~= 3pi/2
			if ( ix === 0x4012d97c ) {
				return remPio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - 3 * PIO2_1;
				y[ 0 ] = z - 3 * PIO2_1T;
				y[ 1 ] = (z-y[0]) - 3 * PIO2_1T;
				return 3;
			} else {
				z = x + 3 * PIO2_1;
				y[ 0 ] = z + 3 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + 3 * PIO2_1T;
				return -3;
			}
		} else {
			if ( ix === 0x401921fb ) {
				// Case: |x| ~= 4pi/2
				return remPio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - 4.0 * PIO2_1;
				y[ 0 ] = z - 4.0 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) - 4.0 * PIO2_1T;
				return +4;
			} else {
				z = x + 4.0 * PIO2_1;
				y[ 0 ] = z + 4.0 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + 4.0 * PIO2_1T;
				return -4;
			}
		}
	}
	// Case: |x| ~< 2^20*(pi/2), medium size
	if ( ix < 0x413921fb ) {
		return remPio2Medium( x, ix, y );
	}
	// All other (large) arguments...
	// Case: x is inf or NaN */
	if ( ix >= 0x7ff00000 ) {
		y[ 0 ] = y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|,ilogb(x)-23)...
	low = getLowWord( x );
	// e0 = ilogb(z)-23:
	e0 = ( ix >> 20 ) - 1046;
	z = fromWords( ix - ((e0<<20)|0), low );
	for ( i = 0; i < 2; i++ ) {
		tx[ i ] = z|0;
		z = ( z - tx[i] ) * TWO24;
	}
	tx[ 2 ] = z;
	nx = 3;
	while ( tx[ nx-1 ] === ZERO ) {
		// Skip zero term...
		nx--;
	}
	n = remPio2Kernel( tx, ty, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -ty[ 0 ];
		y[ 1 ] = -ty[ 1 ];
		return -n;
	}
	y[ 0 ] = ty[ 0 ];
	y[ 1 ] = ty[ 1 ];
	return n;
} // end FUNCTION remPio2()


/**
* Compute x - n*pi/2 = r for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {int32} ix - higher word
* @param {Array} y - remainder elements
* @returns {integer} n - factor of pi/2
*/
function remPio2Medium( x, ix, y ) {
	var high;
	var n;
	var t;
	var r;
	var w;
	var i;
	var j;

	n = round( x * INVPIO2 );
	r = x - n * PIO2_1;
	w = n * PIO2_1T;
	// 1st round good to 85 bit...
	j = ix >> 20;
	y[ 0 ] = r - w;
	high = getHighWord( y[0] );
	i = j - ( (high>>20) & 0x7ff );
	if ( i > 16 ) {
		// 2nd iteration needed, good to 118...
		t  = r;
		w  = n * PIO2_2;
		r  = t - w;
		w  = n * PIO2_2T - ( (t-r) - w );
		y[ 0 ] = r - w;
		high = getHighWord( y[0] );
		i = j - ( (high>>20) & 0x7ff );
		if ( i > 49 )  {
			// 3rd iteration need, 151 bits acc
			t  = r;
			w  = n * PIO2_3;
			r  = t - w;
			w  = n * PIO2_3T - ( (t-r) - w );
			y[ 0 ] = r - w;
		}
	}
	y[ 1 ] = ( r - y[0] ) - w;
	return n;
} // end FUNCTION remPio2Medium()


// EXPORTS //

module.exports = remPio2;

},{"./rem_pio2_kernel.js":193,"@stdlib/math/base/special/round":261,"@stdlib/math/base/utils/float64-from-words":295,"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-get-low-word":301}],193:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );


// VARIABLES //

var INIT_JK = [
	3,
	4,
	4,
	6
]; /* initial value for jk */

/*
* Table of constants for 2/pi, 396 Hex digits (476 decimal) of 2/pi
*
*		integer array, contains the (24*i)-th to (24*i+23)-th
*		bit of 2/pi after binary point. The corresponding
*		floating value is
*
*			ipio2[i] * 2^(-24(i+1)).
*
* NB: This table must have at least (e0-3)/24 + jk terms.
*     For quad precision (e0 <= 16360, jk = 6), this is 686.
*/
var IPIO2 = [
	0xA2F983, 0x6E4E44, 0x1529FC, 0x2757D1, 0xF534DD, 0xC0DB62,
	0x95993C, 0x439041, 0xFE5163, 0xABDEBB, 0xC561B7, 0x246E3A,
	0x424DD2, 0xE00649, 0x2EEA09, 0xD1921C, 0xFE1DEB, 0x1CB129,
	0xA73EE8, 0x8235F5, 0x2EBB44, 0x84E99C, 0x7026B4, 0x5F7E41,
	0x3991D6, 0x398353, 0x39F49C, 0x845F8B, 0xBDF928, 0x3B1FF8,
	0x97FFDE, 0x05980F, 0xEF2F11, 0x8B5A0A, 0x6D1F6D, 0x367ECF,
	0x27CB09, 0xB74F46, 0x3F669E, 0x5FEA2D, 0x7527BA, 0xC7EBE5,
	0xF17B3D, 0x0739F7, 0x8A5292, 0xEA6BFB, 0x5FB11F, 0x8D5D08,
	0x560330, 0x46FC7B, 0x6BABF0, 0xCFBC20, 0x9AF436, 0x1DA9E3,
	0x91615E, 0xE61B08, 0x659985, 0x5F14A0, 0x68408D, 0xFFD880,
	0x4D7327, 0x310606, 0x1556CA, 0x73A8C9, 0x60E27B, 0xC08C6B
];

// Double precision array, obtained by cutting pi/2 into 24 bits chunks...
var PIO2 = [
	1.57079625129699707031e+00, /* 0x3FF921FB, 0x40000000 */
	7.54978941586159635335e-08, /* 0x3E74442D, 0x00000000 */
	5.39030252995776476554e-15, /* 0x3CF84698, 0x80000000 */
	3.28200341580791294123e-22, /* 0x3B78CC51, 0x60000000 */
	1.27065575308067607349e-29, /* 0x39F01B83, 0x80000000 */
	1.22933308981111328932e-36, /* 0x387A2520, 0x40000000 */
	2.73370053816464559624e-44, /* 0x36E38222, 0x80000000 */
	2.16741683877804819444e-51 /* 0x3569F31D, 0x00000000 */
];
var TWO24 =  1.67772160000000000000e+07; /* 0x41700000, 0x00000000 */
var TWON24 =  5.96046447753906250000e-08; /* 0x3E700000, 0x00000000 */


// FUNCTIONS //

/**
* Helper function performing the computation for remPio2Kernel().
*
* @private
* @param {PositiveNumber} x - input value
* @param {Array} y - ouput result in an array of double precision numbers.
* @param {integer} jz - number of terms of ipio2[] used.
* @param {Array} q - array with integral value, representing the 24-bits chunk of the product of x and 2/pi.
* @param {integer} q0 - the corresponding exponent of q[0]. Note that the exponent for q[i] would be q0-24*i.
* @param {integer} jk - jk+1 is the initial number of terms of IPIO2[] needed in the computation.
* @param {integer} jv - index for pointing to the suitable ipio2[] for the computation
* @param {integer} jx - nx - 1
* @param {Array} f - IPIO2[] in floating point
* @param {PositiveInteger} prec - precision in bits (can be 24 (single), 53 (double), 64 (extended), 113 (quad))
* @returns {number} last three digits of N
*/
function compute( x, y, jz, q, q0, jk, jv, jx, f, prec ) {
	var carry;
	var fq;
	var fw;
	var ih;
	var iq;
	var jp;
	var i;
	var k;
	var n;
	var j;
	var z;

	// jp+1 is the number of terms in PIo2[] needed:
	jp = jk;

	fq = new Array( 20 );
	iq = new Array( 20 );

	// Distill q[] into iq[] reversingly...
	for ( i = 0, j = jz, z = q[ jz ]; j > 0; i++, j-- ) {
		fw = ( TWON24 * z ) | 0;
		iq[ i ] = ( z-TWO24 * fw ) | 0;
		z = q[ j-1 ] + fw;
	}

	// Compute n...
	z  = ldexp( z, q0 );
	// Trim off integer >= 8:
	z -= 8.0 * floor( z * 0.125 );
	n  = z | 0;
	z -= n;
	ih = 0;
	if ( q0 > 0 ) {
		// Need iq[jz-1] to determine n...
		i  = ( iq[jz-1] >> (24-q0) );
		n += i;
		iq[ jz-1 ] -= i << (24-q0);
		ih = iq[ jz-1 ] >> (23-q0);
	}
	else if ( q0 === 0 ) {
		ih = iq[ jz-1 ] >> 23;
	}
	else if ( z >= 0.5 ) {
		ih = 2;
	}
	// Case: q > 0.5
	if ( ih > 0 ) {
		n += 1;
		carry = 0;
		// Compute 1-q:
		for ( i = 0; i < jz; i++ ) {
			j = iq[ i ];
			if ( carry === 0 ) {
				if ( j !== 0 ) {
					carry = 1;
					iq[ i ] = 0x1000000 - j;
				}
			} else  {
				iq[ i ] = 0xffffff - j;
			}
		}
		if ( q0 > 0 ) {
			// Rare case: chance is 1 in 12...
			switch ( q0 ) {
			case 1:
				iq[ jz-1 ] &= 0x7fffff;
			break;
			case 2:
				iq[ jz-1 ] &= 0x3fffff;
			break;
			}
		}
		if ( ih === 2 ) {
			z = 1.0 - z;
			if ( carry !== 0 ) {
				z -= ldexp( 1.0, q0 );
			}
		}
	}
	// Check if recomputation is needed...
	if ( z === 0.0 ) {
		j = 0;
		for ( i = jz - 1; i >= jk; i-- ) {
			j |= iq[ i ];
		}
		if ( j === 0 ) {
			// Need recomputation...
			for( k = 1; iq[jk-k] === 0; k++ ) {}   /* k = no. of terms needed */
			for ( i = jz + 1; i <= jz + k; i++ ) {
				// Add q[jz+1] to q[jz+k]...
				f[ jx+i ] = IPIO2[ jv+i ];
				for ( j = 0, fw = 0.0; j <= jx; j++ ) {
					fw += x[ j ] * f[ jx + i-j ];
				}
				q[ i ] = fw;
			}
			jz += k;
			return compute( x, y, jz, q, q0, jk, jv, jx, f, prec );
		}
	}
	// Chop off zero terms...
	if ( z === 0.0 ) {
		jz -= 1;
		q0 -= 24;
		while ( iq[jz] === 0 ) {
			jz--;
			q0-=24;
		}
	} else {
		// Break z into 24-bit if necessary...
		z = ldexp( z, -q0 );
		if ( z >= TWO24 ) {
			fw = (TWON24*z) | 0;
			iq[ jz ] = ( z - TWO24*fw ) | 0;
			jz += 1;
			q0 += 24;
			iq[ jz ] = fw;
		} else {
			iq[ jz ] = z | 0;
		}
	}
	// Convert integer "bit" chunk to floating-point value...
	fw = ldexp( 1.0, q0 );
	for( i = jz; i >= 0; i-- ) {
		q[ i ] = fw * iq[i];
		fw *= TWON24;
	}
	// Compute PIo2[0,...,jp]*q[jz,...,0]...
	for( i = jz; i >= 0; i-- ) {
		for( fw = 0.0, k = 0; k <= jp && k <= jz - i; k++ ) {
			fw += PIO2[ k ] * q[ i+k ];
		}
		fq[ jz-i ] = fw;
	}
	// Compress fq[] into y[]...
	switch ( prec ) {
	case 0:
		fw = 0.0;
		for ( i = jz; i >= 0; i-- ) {
			fw += fq[ i ];
		}
		y[ 0 ] = ( ih === 0 )? fw: -fw;
	break;
	case 1:
	case 2:
		fw = 0.0;
		for ( i = jz; i >= 0; i-- ) {
			fw += fq[ i ];
		}
		y[ 0 ] = ( ih === 0 ) ? fw: -fw;
		fw = fq[ 0 ] - fw;
		for ( i = 1; i <= jz; i++ ) {
			fw += fq[i];
		}
		y[ 1 ] = ( ih === 0 )? fw: -fw;
	break;
	case 3:
		for ( i = jz; i > 0; i-- ) {
			fw = fq[ i-1 ] + fq[ i ];
			fq[ i ] += fq[ i-1 ]-fw;
			fq[ i-1 ] = fw;
		}
		for ( i = jz; i > 1; i-- ) {
			fw = fq[ i-1 ] + fq[ i ];
			fq[ i ]  += fq[ i-1 ] - fw;
			fq[ i-1 ] = fw;
		}
		for ( fw = 0.0, i = jz; i >= 2; i-- ) {
			fw += fq[ i ];
		}
		if ( ih === 0 ) {
			y[ 0 ] =  fq[ 0 ];
			y[ 1 ] =  fq[ 1 ];
			y[ 2 ] =  fw;
		} else {
			y[ 0 ] = -fq[ 0 ];
			y[ 1 ] = -fq[ 1 ];
			y[ 2 ] = -fw;
		}
	}
	return n & 7;
} // end FUNCTION compute()


// MAIN //

/*
* Return the last three digits of N with `y = x - N*pi/2` so that `|y| < pi/2`.
*
* #### Method
*
* The method is to compute the integer (mod 8) and fraction parts of (2/pi)*x without doing the full multiplication. In general we skip the part of the product that are known to be a huge integer (more accurately, = 0 mod 8 ). Thus the number of operations are independent of the exponent of the input.
*
* @param {PositiveNumber} x - input value
* @param {Array} y - ouput result in an array of double precision numbers.
* @param {PositiveInteger} e0 - The exponent of x[0]. Must be <= 16360
* @param {PositiveInteger} nx - dimension of x[]
* @param {PositiveInteger} prec - precision in bits (can be 24 (single), 53 (double), 64 (extended), 113 (quad))
* @returns {number} last three digits of N
*/
function remPio2Kernel( x, y, e0, nx, prec ) {
	var fw;
	var jk;
	var jv;
	var jx;
	var jz;
	var q0;
	var i;
	var j;
	var f;
	var m;
	var q;

	f = new Array( 20 );
	q = new Array( 20 );

	// Initialize jk...
	jk = INIT_JK[ prec ];
	// Determine jx, jv, q0, note that 3 > q0
	jx =  nx - 1;
	jv = ( e0 - 3 ) / 24;
	jv = jv | 0;
	if ( jv < 0 ) {
		jv = 0;
	}
	q0 =  e0 - 24 * ( jv + 1 );

	// Set up f[0] to f[jx+jk] where f[jx+jk] = ipio2[jv+jk]:
	j = jv - jx;
	m = jx + jk;
	for ( i = 0; i <= m; i++, j++ ) {
		f[ i ] = ( j < 0 ) ? 0.0 : IPIO2[ j ];
	}
	// Compute q[0],q[1],...q[jk]:
	for ( i = 0; i <= jk; i++ ) {
		for ( j = 0, fw = 0.0; j <= jx; j++ ) {
			fw += x[ j ] * f[ jx + i-j ];
		}
		q[ i ] = fw;
	}
	jz = jk;
	return compute( x, y, jz, q, q0, jk, jv, jx, f, prec );
} // end FUNCTION remPio2Kernel()


// EXPORTS //

module.exports = remPio2Kernel;

},{"@stdlib/math/base/special/floor":209,"@stdlib/math/base/special/ldexp":239}],194:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_sin.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// VARIABLES //

var S1  = -1.66666666666666324348e-01; /* 0xBFC55555, 0x55555549 */
var S2  =  8.33333333332248946124e-03; /* 0x3F811111, 0x1110F8A6 */
var S3  = -1.98412698298579493134e-04; /* 0xBF2A01A0, 0x19C161D5 */
var S4  =  2.75573137070700676789e-06; /* 0x3EC71DE3, 0x57B1FE7D */
var S5  = -2.50507602534068634195e-08; /* 0xBE5AE5E6, 0x8A2B9CEB */
var S6  =  1.58969099521155010221e-10; /* 0x3DE5D93A, 0x5ACFD57C */


// MAIN //

/**
* Computes the sin function on \\( \approx [-\pi/4, \pi/4] \\) (except on -0), \\( \pi/4 \approx 0.7854 \\)
*
* #### Method
*
* * Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive x.
* * Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves -0. Callers may do the optimization \\( \sin(x) \approx x \\) for tiny x.
* * \\( \sin(x) \\) is approximated by a polynomial of degree 13 on \\( \left[0,\tfrac{pi}{4} \right] \\)
*
*   ``` tex
*   \sin(x) \approx x + S_1 \cdot x^3 + \ldots + S_6 \cdot x^{13}
*   ```
*
*   where
*
*   ``` tex
*   \left| \frac{\sin(x)}{x} \left( 1 + S_1 \cdot x + S_2 \cdot x + S_3 \cdot x + S_4 \cdot x + S_5 \cdot x + S_6 \cdot x \right) \right| \le 2^{-58}
*   ```
*
* * We have \\( \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y \\). For better accuracy, let
*
*   ``` tex
*   r = x^3 * \left( S_2 + x^2 \cdot \left( S_3 + x^2 * \left( S_4 + x^2 \cdot ( S_5+x^2 \cdot S_6 ) \right) \right) \right)
*   ```
*
*   then
*
*   ``` tex
*   \sin(x) = x + \left( S_1 \cdot x + ( x \cdot (r-y/2) + y ) \right)
*   ```
*
* @param {number} x - input value (assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of x.
* @param {number} iy - indicates whether y is 0. (if iy = 0, y assumed to be 0).
* @returns sine (in radians)
*/
function sinKernel( x, y, iy ) {
	var r;
	var v;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = S2 + z * ( S3 + z*S4 ) + z * w * ( S5 + z*S6 );
	v = z * x;
	if ( iy === 0 ) {
		return x + v * ( S1 + z*r );
	}
	else {
		return x - ( ( z * (0.5*y-v*r) - y ) - v * S1 );
	}
} // end FUNCTION sinKernel()


// EXPORTS //

module.exports = sinKernel;

},{}],195:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var ln = require( '@stdlib/math/base/special/ln' );


// VARIABLES //

var P = [
	0.083333333333333333333333333333333333333333333333333,
	-0.0083333333333333333333333333333333333333333333333333,
	0.003968253968253968253968253968253968253968253968254,
	-0.0041666666666666666666666666666666666666666666666667,
	0.0075757575757575757575757575757575757575757575757576,
	-0.021092796092796092796092796092796092796092796092796,
	0.083333333333333333333333333333333333333333333333333,
	-0.44325980392156862745098039215686274509803921568627
];


// FUNCTIONS //

// Compile a function to evaluate a polynomial based on the above coefficients...
var polyval = evalpoly( P );


// MAIN //

/**
* Evaluates the digamma function via asymptotic expansion.
*
* @param {number} x - input value
* @returns {number} function value
*/
function digamma( x ) {
	var y;
	var z;
	x -= 1.0;
	y = ln(x) + ( 1.0 / (2.0*x) );
	z = 1.0 / (x*x);
	return y - ( z*polyval( z ) );
} // end FUNCTION digamma()


// EXPORTS //

module.exports = digamma;

},{"@stdlib/math/base/special/ln":241,"@stdlib/math/base/tools/evalpoly":285}],196:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_53_0/libs/math/doc/sf_and_dist/html/math_toolkit/special/sf_gamma/digamma.html}.
*
* The implementation follows the original but has been reformatted and modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var tan = require( '@stdlib/math/base/special/tan' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var asymptoticApprox = require( './asymptotic_expansion.js' );
var rationalApprox = require( './rational_approximation.js' );


// VARIABLES //

var MIN_SAFE_ASYMPTOTIC = 10.0; // BIG


// MAIN //

/**
* Evaluates the digamma function.
*
* #### Method
*
* 1. For \\(x < 0\\), we use the reflection formula
*
*    ``` tex
*    \psi(1-x) = \psi(x) + \frac{\pi}{\tan(\pi x)}
*    ```
*
*    to make \\(x\\) positive.
*
* 2. For \\(x \in [0,1]\\), we use the recurrence relation
*
*    ``` tex
*    \psi(x) = \psi(x+1) - \frac{1}{x}
*    ```
*
*    to shift the evaluation range to \\([1,2]\\).
*
* 3. For \\(x \in [1,2]\\), we use a rational approximation of the form
*
*    ``` tex
*    \psi(x) = (x - \mathrm{root})(Y + \operatorname{R}(x-1))
*    ```
*
*    where \\(\mathrm{root}\\) is the location of the positive root of \\(\psi\\), \\(Y\\) is a constant, and \\(R\\) is optimized for low absolute error compared to \\(Y\\).
*
*    <!-- <note>-->
*    Note that, since \\(\mathrm{root}\\) is irrational, we need twice as many digits in \\(\mathrm{root}\\) as in \\(x\\) in order to avoid cancellation error during subtraction, assuming \\(x\\) has an exact value. This means that, even if \\(x\\) is rounded to the next representable value, the result of \\(\psi(x)\\) will not be zero.
*    <!-- </note> -->
*    <!-- <note> -->
*    This approach gives 17-digit precision.
*    <!-- </note> -->
*
* 4. For \\(x \in [2,\mathrm{BIG}]\\), we use the recurrence relation
*
*    ``` tex
*    \psi(x+1) = \psi(x) + \frac{1}{x}
*    ```
*
*    to shift the evaluation range to \\([1,2]\\).
*
* 5. For \\(x > \mathrm{BIG}\\), we use the asymptotic expression
*
*    ``` tex
*    \psi(x) = \ln(x) + \frac{1}{2x} - \biggl( \frac{B_{21}}{2x^2} + \frac{B_{22}}{4x^4} + \frac{B_{23}}{6x^6} + \ldots \biggr)
*    ```
*
*    This expansion, however, is divergent after a few terms. The number of terms depends on \\(x\\). Accordingly, we must choose a value of \\(\mathrm{BIG}\\) which allows us to truncate the series at a term that is too small to have an effect on the result. Setting \\(\mathrm{BIG} = 10\\), allows us to truncate the series early and evaluate as \\(1/x^2\\).
*
*    <!-- <note> -->
*    This approach gives 17-digit precision for \\(x \geq 10\\).
*    <!-- </note> -->
*
* #### Notes
*
* * Maximum deviation found: \\(1.466\\mbox{e-}18\\)
* * Max error found: \\(2.452\mbox{e-}17\\) (double precision)
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = digamma( -2.5 );
* // returns ~1.103
* @example
* var v = digamma( 1.0 );
* // returns ~-0.577
* @example
* var v = digamma( 10.0 );
* // returns ~2.252
* @example
* var v = digamma( NaN );
* // returns NaN
* @example
* var v = digamma( -1.0 );
* // returns NaN
*/
function digamma( x ) {
	var rem;
	var tmp;
	if ( isnan( x ) || x === 0.0 ) {
		return NaN;
	}
	// If `x` is negative, use reflection...
	if ( x <= -1.0 ) {
		// Reflect:
		x = 1.0 - x;

		// Argument reduction for tan:
		rem = x - floor(x);

		// Shift to negative if > 0.5:
		if ( rem > 0.5 ) {
			rem -= 1.0;
		}
		// Check for evaluation at a negative pole:
		if ( rem === 0.0 ) {
			return NaN;
		}
		tmp = PI / tan( PI * rem );
	} else {
		tmp = 0.0;
	}
	// If we're above the lower-limit for the asymptotic expansion, then use it...
	if ( x >= MIN_SAFE_ASYMPTOTIC ) {
		tmp += asymptoticApprox( x );
		return tmp;
	}
	// If x > 2, reduce to the interval [1,2]...
	while ( x > 2.0 ) {
		x -= 1.0;
		tmp += 1.0/x;
	}
	// If x < 1, use recurrence to shift to > 1..
	while ( x < 1.0 ) {
		tmp -= 1.0/x;
		x += 1.0;
	}
	tmp += rationalApprox( x );
	return tmp;
} // end FUNCTION digamma()


// EXPORTS //

module.exports = digamma;

},{"./asymptotic_expansion.js":195,"./rational_approximation.js":198,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/floor":209,"@stdlib/math/base/special/tan":273,"@stdlib/math/constants/float64-pi":334}],197:[function(require,module,exports){
'use strict';

/**
* Evaluate the digamma function.
*
* @module @stdlib/math/base/special/digamma
*
* @example
* var digamma = require( '@stdlib/math/base/special/digamma' );
*
* var v = digamma( -2.5 );
* // returns ~1.103
*
* v = digamma( 1.0 );
* // returns ~-0.577
*
* v = digamma( 10.0 );
* // returns ~2.252
*
* v = digamma( NaN );
* // returns NaN
*
* v = digamma( -1.0 );
* // returns NaN
*/

// MODULES //

var digamma = require( './digamma.js' );


// EXPORTS //

module.exports = digamma;

},{"./digamma.js":196}],198:[function(require,module,exports){
'use strict';

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;


// VARIABLES //

var root1 = 1569415565 / 1073741824;
var root2 = ( 381566830 / 1073741824 ) / 1073741824;
var root3 = 0.9016312093258695918615325266959189453125e-19;
var Y = 0.99558162689208984;
var P = [
	0.25479851061131551,
	-0.32555031186804491,
	-0.65031853770896507,
	-0.28919126444774784,
	-0.045251321448739056,
	-0.0020713321167745952,
	0
];
var Q = [
	1.0,
	2.0767117023730469,
	1.4606242909763515,
	0.43593529692665969,
	0.054151797245674225,
	0.0021284987017821144,
	-0.55789841321675513e-6
];


// FUNCTIONS //

// Compile a function to evaluate a rational function based on the above coefficients...
var rateval = evalrational( P, Q );


// MAIN //

/**
* Evaluates the digamma function over interval `[1,2]`.
*
* @param {number} x - input value
* @returns {number} function value
*/
function digamma( x ) {
	var g;
	var r;
	g = x - root1;
	g -= root2;
	g -= root3;
	r = rateval( x - 1.0 );
	return (g*Y) + (g*r);
} // end FUNCTION digamma()


// EXPORTS //

module.exports = digamma;

},{"@stdlib/math/base/tools/evalrational":288}],199:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c?revision=268523&view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// VARIABLES //

var TINY = 1.0e-300;

// 2**-56 = 1/(2**56) = 1/72057594037927940
var SMALL = 1.3877787807814457e-17;

var ERX = 8.45062911510467529297e-1; // 0x3FEB0AC1, 0x60000000

// Coefficients for approximation to erf on [0, 0.84375)
var PPC = 1.28379167095512558561e-1;  // 0x3FC06EBA, 0x8214DB68
var PP = [
	-3.25042107247001499370e-1, // 0xBFD4CD7D, 0x691CB913
	-2.84817495755985104766e-2, // 0xBF9D2A51, 0xDBD7194F
	-5.77027029648944159157e-3, // 0xBF77A291, 0x236668E4
	-2.37630166566501626084e-5  // 0xBEF8EAD6, 0x120016AC
];
var QQC = 1.0;
var QQ = [
	3.97917223959155352819e-1, // 0x3FD97779, 0xCDDADC09
	6.50222499887672944485e-2, // 0x3FB0A54C, 0x5536CEBA
	5.08130628187576562776e-3, // 0x3F74D022, 0xC4D36B0F
	1.32494738004321644526e-4, // 0x3F215DC9, 0x221C1A10
	-3.96022827877536812320e-6 // 0xBED09C43, 0x42A26120
];

// Coefficients for approximation to erf on [0.84375, 1.25)
var PAC = -2.36211856075265944077e-3; // 0xBF6359B8, 0xBEF77538
var PA = [
	4.14856118683748331666e-1,  // 0x3FDA8D00, 0xAD92B34D
	-3.72207876035701323847e-1, // 0xBFD7D240, 0xFBB8C3F1
	3.18346619901161753674e-1,  // 0x3FD45FCA, 0x805120E4
	-1.10894694282396677476e-1, // 0xBFBC6398, 0x3D3E28EC
	3.54783043256182359371e-2,  // 0x3FA22A36, 0x599795EB
	-2.16637559486879084300e-3  // 0xBF61BF38, 0x0A96073F
];
var QAC = 1.0;
var QA = [
	1.06420880400844228286e-1, // 0x3FBB3E66, 0x18EEE323
	5.40397917702171048937e-1, // 0x3FE14AF0, 0x92EB6F33
	7.18286544141962662868e-2, // 0x3FB2635C, 0xD99FE9A7
	1.26171219808761642112e-1, // 0x3FC02660, 0xE763351F
	1.36370839120290507362e-2, // 0x3F8BEDC2, 0x6B51DD1C
	1.19844998467991074170e-2  // 0x3F888B54, 0x5735151D
];

// Coefficients for approximation to erfc on [1.25, 1/0.35)
var RAC = -9.86494403484714822705e-3; // 0xBF843412, 0x600D6435
var RA = [
	-6.93858572707181764372e-1, // 0xBFE63416, 0xE4BA7360
	-1.05586262253232909814e1,  // 0xC0251E04, 0x41B0E726
	-6.23753324503260060396e1,  // 0xC04F300A, 0xE4CBA38D
	-1.62396669462573470355e2,  // 0xC0644CB1, 0x84282266
	-1.84605092906711035994e2,  // 0xC067135C, 0xEBCCABB2
	-8.12874355063065934246e1,  // 0xC0545265, 0x57E4D2F2
	-9.81432934416914548592     // 0xC023A0EF, 0xC69AC25C
];
var SAC = 1.0;
var SA = [
	1.96512716674392571292e1,  // 0x4033A6B9, 0xBD707687
	1.37657754143519042600e2,  // 0x4061350C, 0x526AE721
	4.34565877475229228821e2,  // 0x407B290D, 0xD58A1A71
	6.45387271733267880336e2,  // 0x40842B19, 0x21EC2868
	4.29008140027567833386e2,  // 0x407AD021, 0x57700314
	1.08635005541779435134e2,  // 0x405B28A3, 0xEE48AE2C
	6.57024977031928170135,    // 0x401A47EF, 0x8E484A93
	-6.04244152148580987438e-2 // 0xBFAEEFF2, 0xEE749A62
];

// Coefficients for approximation to erfc on [1/0.35, 28]
var RBC = -9.86494292470009928597e-3; // 0xBF843412, 0x39E86F4A
var RB = [
	-7.99283237680523006574e-1, // 0xBFE993BA, 0x70C285DE
	-1.77579549177547519889e1,  // 0xC031C209, 0x555F995A
	-1.60636384855821916062e2,  // 0xC064145D, 0x43C5ED98
	-6.37566443368389627722e2,  // 0xC083EC88, 0x1375F228
	-1.02509513161107724954e3,  // 0xC0900461, 0x6A2E5992
	-4.83519191608651397019e2  // 0xC07E384E, 0x9BDC383F
];
var SBC = 1.0;
var SB = [
	3.03380607434824582924e1, // 0x403E568B, 0x261D5190
	3.25792512996573918826e2, // 0x40745CAE, 0x221B9F0A
	1.53672958608443695994e3, // 0x409802EB, 0x189D5118
	3.19985821950859553908e3, // 0x40A8FFB7, 0x688C246A
	2.55305040643316442583e3, // 0x40A3F219, 0xCEDF3BE6
	4.74528541206955367215e2, // 0x407DA874, 0xE79FE763
	-2.24409524465858183362e1 // 0xC03670E2, 0x42712D62
];


// FUNCTIONS //

// Compile functions to evaluate polynomials based on the above coefficients...
var polyvalPP = evalpoly( PP );
var polyvalQQ = evalpoly( QQ );
var polyvalPA = evalpoly( PA );
var polyvalQA = evalpoly( QA );
var polyvalRA = evalpoly( RA );
var polyvalSA = evalpoly( SA );
var polyvalRB = evalpoly( RB );
var polyvalSB = evalpoly( SB );


// MAIN //

/**
* Evaluates the complementary error function.
*
* ``` tex
* \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int^{x}_{0} e^{-t^2}\ \mathrm{dt}
* ```
*
* Note that
*
* ``` tex
* \begin{align*}
* \operatorname{erfc}(x) &= 1 - \operatorname{erf}(x) \\
* \operatorname{erf}(-x) &= -\operatorname{erf}(x) \\
* \operatorname{erfc}(-x) &= 2 - \operatorname{erfc}(x)
* \end{align*}
* ```
*
* #### Method
*
* 1. For \\(|x| \in [0, 0.84375)\\),
*
*    ``` tex
*    \operatorname{erf}(x) = x + x \cdot \operatorname{R}(x^2)
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    1 - \operatorname{erf}(x) & \textrm{if}\ x \in (-.84375,0.25) \\
*    0.5 + ((0.5-x)-x \mathrm{R}) & \textrm{if}\ x \in [0.25,0.84375)
*    \end{cases}
*    ```
*
*    where \\(R = P/Q\\) and where \\(P\\) is an odd polynomial of degree \\(8\\) and \\(Q\\) is an odd polynomial of degree \\(10\\).
*
*    ``` tex
*    \biggl| \mathrm{R} - \frac{\operatorname{erf}(x)-x}{x} \biggr| \leq 2^{-57.90}
*    ```
*
*    <!-- <note> -->
*    The formula is derived by noting
*
*    ``` tex
*    \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\biggl(x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + \ldots \biggr)
*    ```
*
*    and that
*
*    ``` tex
*    \frac{2}{\sqrt{\pi}} = 1.128379167095512573896158903121545171688
*    ```
*
*    is close to unity. The interval is chosen because the fix point of \\(\operatorname{erf}(x)\\) is near \\(0.6174\\) (i.e., \\(\operatorname{erf(x)} = x\\) when \\(x\\) is near \\(0.6174\\)), and, by some experiment, \\(0.84375\\) is chosen to guarantee the error is less than one ulp for \\(\operatorname{erf}(x)\\).
*    <!-- </note> -->
*
* 2. For \\(|x| \in [0.84375,1.25)\\), let \\(s = |x|-1\\), and \\(c = 0.84506291151\\) rounded to single (\\(24\\) bits)
*
*    ``` tex
*    \operatorname{erf}(x) = \operatorname{sign}(x) \cdot \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr)
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    (1-c) - \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)} & \textrm{if}\ x > 0 \\
*    1 + \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr) & \textrm{if}\ x < 0
*    \end{cases}
*    ```
*
*    where
*
*    ``` tex
*    \biggl|\frac{\mathrm{P1}}{\mathrm{Q1}} - (\operatorname{erf}(|x|)-c)\biggr| \leq 2^{-59.06}
*    ```
*
*    <!-- <note> -->
*    Here, we use the Taylor series expansion at \\(x = 1\\)
*
*    ``` tex
*    \begin{align*}
*    \operatorname{erf}(1+s) &= \operatorname{erf}(1) + s\cdot \operatorname{poly}(s) \\
*    &= 0.845.. + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}
*    \end{align*}
*    ```
*
*    using a rational approximation to approximate
*
*    ``` tex
*    \operatorname{erf}(1+s) - (c = (\mathrm{single})0.84506291151)
*    ```
*
*    <!-- </note> -->
*    Note that, for \\(x \in [0.84375,1.25)\\), \\(|\mathrm{P1}/\mathrm{Q1}| < 0.078\\), where
*
*    - \\(\operatorname{P1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*    - \\(\operatorname{Q1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*
* 3. For \\(x \in [1.25,1/0.35)\\),
*
*    ``` tex
*    \begin{align*}
*    \operatorname{erfc}(x) &= \frac{1}{x}e^{-x^2-0.5625+(\mathrm{R1}/\mathrm{S1})} \\
*    \operatorname{erf}(x) &= 1 - \operatorname{erfc}(x)
*    \end{align*}
*    ```
*
*    where
*
*    - \\(\operatorname{R1}(z)\\) is a degree \\(7\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*    - \\(\operatorname{S1}(z)\\) is a degree \\(8\\) polynomial in \\(z\\)
*
* 4. For \\(x \in [1/0.35,28)\\),
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ x > 0 \\
*    2.0 - \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ -6 < x < 0 \\
*    2.0 - \mathrm{tiny} & \textrm{if}\ x \leq -6
*    \end{cases}
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erf}(x) = \begin{cases}
*    \operatorname{sign}(x) \cdot (1.0 - \operatorname{erfc}(x)) & \textrm{if}\ x < 6 \\
*    \operatorname{sign}(x) \cdot (1.0 - \mathrm{tiny}) & \textrm{otherwise}
*    \end{cases}
*    ```
*
*    where
*
*    - \\(\operatorname{R2}(z)\\) is a degree \\(6\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*    - \\(\operatorname{S2}(z)\\) is a degree \\(7\\) polynomial in \\(z\\)
*
* 5. For \\(x \in [28, \infty)\\),
*
*    ``` tex
*    \begin{align*}
*    \operatorname{erf}(x) &= \operatorname{sign}(x) \cdot (1 - \mathrm{tiny}) & \textrm{(raise inexact)}
*    \end{align*}
*    ```
*
*    and
*
*    ``` tex
*    \operatorname{erfc}(x) = \begin{cases}
*    \mathrm{tiny} \cdot \mathrm{tiny} & \textrm{if}\ x > 0\ \textrm{(raise underflow)} \\
*    2 - \mathrm{tiny} & \textrm{if}\ x < 0
*    \end{cases}
*    ```
*
*
* #### Special Cases
*
* ``` tex
* \begin{align*}
* \operatorname{erf}(0) &= 0 \\
* \operatorname{erf}(-0) &= -0 \\
* \operatorname{erf}(\infty) &= 1 \\
* \operatorname{erf}(-\infty) &= -1 \\
* \operatorname{erfc}(0) &= 1 \\
* \operatorname{erfc}(\infty) &= 0 \\
* \operatorname{erfc}(-\infty) &= 2 \\
* \operatorname{erf}(\mathrm{NaN}) &= \mathrm{NaN} \\
* \operatorname{erfc}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* #### Notes
*
* * To compute \\(\exp(-x^2-0.5625+(\mathrm{R}/\mathrm{S}))\\), let \\(s\\) be a single precision number and \\(s := x\\); then
*
*    ``` tex
*    -x^2 = -s^2 + (s-x)(s+x)
*    ```
*
*    and
*
*    ``` tex
*    e^{-x^2-0.5626+(\mathrm{R}/\mathrm{S})} = e^{-s^2-0.5625} e^{(s-x)(s+x)+(\mathrm{R}/\mathrm{S})}
*    ```
*
* * `#4` and `#5` make use of the asymptotic series
*
*    ``` tex
*    \operatorname{erfc}(x) \approx \frac{e^{-x^2}}{x\sqrt{\pi}} (1 + \operatorname{poly}(1/x^2))
*    ```
*
*    We use a rational approximation to approximate
*
*    ``` tex
*    g(s) = f(1/x^2) = \ln(\operatorname{erfc}(x) \cdot x) - x^2 + 0.5625
*    ```
*
* * The error bound for \\(\mathrm{R1}/\mathrm{S1}\\) is
*
*    ``` tex
*    |\mathrm{R1}/\mathrm{S1} - f(x)| < 2^{-62.57}
*    ```
*
*    and for \\(\mathrm{R2}/\mathrm{S2}\\) is
*
*    ``` tex
*    |\mathrm{R2}/\mathrm{S2} - f(x)| < 2^{-61.52}
*    ```
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfc( 2.0 );
* // returns ~0.0047
* @example
* var y = erfc( -1.0 );
* // returns ~-1.8427
* @example
* var y = erfc( 0.0 );
* // returns 1.0
* @example
* var y = erfc( Number.POSITIVE_INFINITY );
* // returns 0.0
* @example
* var y = erfc( Number.NEGATIVE_INFINITY );
* // returns 2.0
* @example
* var y = erfc( NaN );
* // returns NaN
*/
function erfc( x ) {
	var sign;
	var ax;
	var z;
	var r;
	var s;
	var y;
	var p;
	var q;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: +infinity
	if ( x === PINF ) {
		return 0.0;
	}
	// Special case: -infinity
	if ( x === NINF ) {
		return 2.0;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		sign = true;
		ax = -x;
	} else {
		sign = false;
		ax = x;
	}
	// |x| < 0.84375
	if ( ax < 0.84375 ) {
		if ( ax < SMALL ) {
			return 1.0 - x; // raise inexact
		}
		z = x * x;
		r = PPC + ( z*polyvalPP( z ) );
		s = QQC + ( z*polyvalQQ( z ) );
		y = r / s;

		// x < 1/4
		if ( x < 0.25 ) {
			return 1.0 - ( x + (x*y) );
		}
		r = x * y;
		r += x - 0.5;
		return 0.5 - r;
	}
	// 0.84375 <= |x| < 1.25
	if ( ax < 1.25 ) {
		s = ax - 1.0;
		p = PAC + ( s*polyvalPA( s ) );
		q = QAC + ( s*polyvalQA( s ) );
		if ( sign ) {
			return 1.0 + ERX + (p/q);
		}
		return 1.0 - ERX - (p/q);
	}
	// |x| < 28
	if ( ax < 28.0 ) {
		s = 1.0 / (ax*ax);

		// |x| < 1/0.35 ~ 2.857143
		if ( ax < 2.857142857142857 ) {
			r = RAC + ( s*polyvalRA( s ) );
			s = SAC + ( s*polyvalSA( s ) );
		}
		// |x| >= 1/0.35 ~ 2.857143
		else {
			// x < -6
			if ( x < -6.0 ) {
				return 2.0 - TINY; // raise inexact
			}
			r = RBC + ( s*polyvalRB( s ) );
			s = SBC + ( s*polyvalSB( s ) );
		}
		z = setLowWord( ax, 0 ); // pseudo-single (20-bit) precision x
		r = exp( -(z*z) - 0.5625 ) * exp( ((z-ax)*(z+ax)) + (r/s) );
		if ( sign ) {
			return 2.0 - (r/ax);
		}
		return r/ax;
	}
	if ( sign ) {
		return 2.0 - TINY; // raise inexact; ~2
	}
	return TINY * TINY; // raise inexact; ~0
} // end FUNCTION erfc()


// EXPORTS //

module.exports = erfc;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/exp":205,"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/base/utils/float64-set-low-word":308,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],200:[function(require,module,exports){
'use strict';

/**
* Evaluate the complementary error function.
*
* @module @stdlib/math/base/special/erfc
*
* @example
* var erfc = require( '@stdlib/math/base/special/erfc' );
*
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* y = erfc( -1.0 );
* // returns ~-1.8427
*
* y = erfc( 0.0 );
* // returns 1.0
*
* y = erfc( Number.POSITIVE_INFINITY );
* // returns 0.0
*
* y = erfc( Number.NEGATIVE_INFINITY );
* // returns 2.0
*
* y = erfc( NaN );
* // returns NaN
*/

// MODULES //

var erfc = require( './erfc.js' );


// EXPORTS //

module.exports = erfc;

},{"./erfc.js":199}],201:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/detail/erf_inv.hpp}.
*
* This implementation follows the original, but has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// VARIABLES //

// Coefficients for erfinv on [0, 0.5]:
var Y1 = 8.91314744949340820313e-2;
var P1 = [
	-5.08781949658280665617e-4,
	-8.36874819741736770379e-3,
	3.34806625409744615033e-2,
	-1.26926147662974029034e-2,
	-3.65637971411762664006e-2,
	2.19878681111168899165e-2,
	8.22687874676915743155e-3,
	-5.38772965071242932965e-3,
	0.0,
	0.0
];
var Q1 = [
	1.0,
	-9.70005043303290640362e-1,
	-1.56574558234175846809,
	1.56221558398423026363,
	6.62328840472002992063e-1,
	-7.1228902341542847553e-1,
	-5.27396382340099713954e-2,
	7.95283687341571680018e-2,
	-2.33393759374190016776e-3,
	8.86216390456424707504e-4
];

// Coefficients for erfinv for 0.5 > 1-x >= 0:
var Y2 = 2.249481201171875;
var P2 = [
	-2.02433508355938759655e-1,
	1.05264680699391713268e-1,
	8.37050328343119927838,
	1.76447298408374015486e1,
	-1.88510648058714251895e1,
	-4.46382324441786960818e1,
	1.7445385985570866523e1,
	2.11294655448340526258e1,
	-3.67192254707729348546
];
var Q2 = [
	1.0,
	6.24264124854247537712,
	3.9713437953343869095,
	-2.86608180499800029974e1,
	-2.01432634680485188801e1,
	4.85609213108739935468e1,
	1.08268667355460159008e1,
	-2.26436933413139721736e1,
	1.72114765761200282724
];

// Coefficients for erfinv for sqrt( -log(1-x) ):
var Y3 = 8.07220458984375e-1;
var P3 = [
	-1.31102781679951906451e-1,
	-1.63794047193317060787e-1,
	1.17030156341995252019e-1,
	3.87079738972604337464e-1,
	3.37785538912035898924e-1,
	1.42869534408157156766e-1,
	2.90157910005329060432e-2,
	2.14558995388805277169e-3,
	-6.79465575181126350155e-7,
	2.85225331782217055858e-8,
	-6.81149956853776992068e-10
];
var Q3 = [
	1.0,
	3.46625407242567245975,
	5.38168345707006855425,
	4.77846592945843778382,
	2.59301921623620271374,
	8.48854343457902036425e-1,
	1.52264338295331783612e-1,
	1.105924229346489121e-2,
	0.0,
	0.0,
	0.0
];

var Y4 = 9.3995571136474609375e-1;
var P4 = [
	-3.50353787183177984712e-2,
	-2.22426529213447927281e-3,
	1.85573306514231072324e-2,
	9.50804701325919603619e-3,
	1.87123492819559223345e-3,
	1.57544617424960554631e-4,
	4.60469890584317994083e-6,
	-2.30404776911882601748e-10,
	2.66339227425782031962e-12
];
var Q4 = [
	1.0,
	1.3653349817554063097,
	7.62059164553623404043e-1,
	2.20091105764131249824e-1,
	3.41589143670947727934e-2,
	2.63861676657015992959e-3,
	7.64675292302794483503e-5,
	0.0,
	0.0
];

var Y5 = 9.8362827301025390625e-1;
var P5 = [
	-1.67431005076633737133e-2,
	-1.12951438745580278863e-3,
	1.05628862152492910091e-3,
	2.09386317487588078668e-4,
	1.49624783758342370182e-5,
	4.49696789927706453732e-7,
	4.62596163522878599135e-9,
	-2.81128735628831791805e-14,
	9.9055709973310326855e-17
];
var Q5 = [
	1.0,
	5.91429344886417493481e-1,
	1.38151865749083321638e-1,
	1.60746087093676504695e-2,
	9.64011807005165528527e-4,
	2.75335474764726041141e-5,
	2.82243172016108031869e-7,
	0.0,
	0.0
];


// FUNCTIONS //

// Compile functions for evaluating rational functions...
var rationalFcnR1 = evalrational( P1, Q1 );
var rationalFcnR2 = evalrational( P2, Q2 );
var rationalFcnR3 = evalrational( P3, Q3 );
var rationalFcnR4 = evalrational( P4, Q4 );
var rationalFcnR5 = evalrational( P5, Q5 );


// MAIN //

/**
* Evaluates the inverse complementary error function.
*
* Note that
*
* ``` tex
* \operatorname{erfc^{-1}}(1-z) = \operatorname{erf^{-1}}(z)
* ```
*
* #### Method
*
* 1. For \\(|x| \leq 0.5\\), we evaluate the inverse error function using the rational approximation
*
*    ``` tex
*    \operatorname{erf^{-1}}(x) = x(x+10)(\mathrm{Y} + \operatorname{R}(x))
*    ```
*
*    where \\(Y\\) is a constant and \\(\operatorname{R}(x)\\) is optimized for a low absolute error compared to \\(|Y|\\).
*
*    <!-- <note> -->
*    Max error \\(2.001849\mbox{e-}18\\). Maximum deviation found (error term at infinite precision) \\(8.030\mbox{e-}21\\).
*    <!-- </note> -->
*
* 2. For \\(0.5 > 1-|x| \geq 0\\), we evaluate the inverse error function using the rational approximation
*
*    ``` tex
*    \operatorname{erf^{-1}} = \frac{\sqrt{-2 \cdot \ln(1-x)}}{\mathrm{Y} + \operatorname{R}(1-x)}
*    ```
*
*    where \\(Y\\) is a constant, and \\(\operatorname{R}(q)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*    <!-- <note> -->
*    Max error \\(7.403372\mbox{e-}17\\). Maximum deviation found (error term at infinite precision) \\(4.811\mbox{e-}20\\).
*    <!-- </note> -->
*
* 3. For \\(1-|x| < 0.25\\), we have a series of rational approximations all of the general form
*
*    ``` tex
*    p = \sqrt{-\ln(1-x)}
*    ```
*
*    Accordingly, the result is given by
*
*    ``` tex
*    \operatorname{erf^{-1}}(x) = p(\mathrm{Y} + \operatorname{R}(p-B))
*    ```
*
*    where \\(Y\\) is a constant, \\(B\\) is the lowest value of \\(p\\) for which the approximation is valid, and \\(\operatorname{R}(x-B)\\) is optimized for a low absolute error compared to \\(Y\\).
*
*    <!-- <note> -->
*    Almost all code will only go through the first or maybe second approximation.  After that we are dealing with very small input values.
*      * If \\(p < 3\\), max error \\(1.089051\mbox{e-}20\\).
*      * If \\(p < 6\\), max error \\(8.389174\mbox{e-}21\\).
*      * If \\(p < 18\\), max error \\(1.481312\mbox{e-}19\\).
*      * If \\(p < 44\\), max error \\(5.697761\mbox{e-}20\\).
*      * If \\(p \geq 44\\), max error \\(1.279746\mbox{e-}20\\).
*
*    <!-- </note> -->
*    <!-- <note> -->
*    The Boost library can accommodate \\(80\\) and \\(128\\) bit long doubles. JavaScript only supports a \\(64\\) bit double (IEEE 754). Accordingly, the smallest \\(p\\) (in JavaScript at the time of this writing) is \\(\sqrt{-\ln(\sim5\mbox{e-}324)} = 27.284429111150214\\).
*    <!-- </note> -->
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfcinv( 0.5 );
* // returns ~0.4769
* @example
* var y = erfcinv( 0.8 );
* // returns ~-0.1791
* @example
* var y = erfcinv( 0.0 );
* // returns Number.POSITIVE_INFINITY
* @example
* var y = erfcinv( 2.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var y = erfcinv( NaN );
* // returns NaN
*/
function erfcinv( x ) {
	var sign;
	var qs;
	var q;
	var g;
	var r;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: 0
	if ( x === 0.0 ) {
		return PINF;
	}
	// Special case: 2
	if ( x === 2.0 ) {
		return NINF;
	}
	// Special case: 1
	if ( x === 1.0 ) {
		return 0.0;
	}
	if ( x > 2.0 || x < 0.0 ) {
		return NaN;
	}
	// Argument reduction (reduce to interval [0,1]). If `x` is outside [0,1], we can take advantage of the complementary error function reflection formula: `erfc(-z) = 2 - erfc(z)`, by negating the result once finished.
	if ( x > 1.0 ) {
		sign = -1.0;
		q = 2.0 - x;
	} else {
		sign = 1.0;
		q = x;
	}
	x = 1.0 - q;

	// x = 1-q <= 0.5
	if ( x <= 0.5 ) {
		g = x * ( x + 10.0 );
		r = rationalFcnR1( x );
		return sign * ( (g*Y1) + (g*r) );
	}
	// q >= 0.25
	if ( q >= 0.25 ) {
		g = sqrt( -2.0 * ln(q) );
		q -= 0.25;
		r = rationalFcnR2( q );
		return sign * ( g / (Y2+r) );
	}
	q = sqrt( -ln( q ) );

	// q < 3
	if ( q < 3.0 ) {
		qs = q - 1.125;
		r = rationalFcnR3( qs );
		return sign * ( (Y3*q) + (r*q) );
	}
	// q < 6
	if ( q < 6.0 ) {
		qs = q - 3.0;
		r = rationalFcnR4( qs );
		return sign * ( (Y4*q) + (r*q) );
	}
	// q < 18
	qs = q - 6.0;
	r = rationalFcnR5( qs );
	return sign * ( (Y5*q) + (r*q) );
} // end FUNCTION erfcinv()


// EXPORTS //

module.exports = erfcinv;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/special/sqrt":272,"@stdlib/math/base/tools/evalrational":288,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],202:[function(require,module,exports){
'use strict';

/**
* Evaluate the inverse complementary error function.
*
* @module @stdlib/math/base/special/erfcinv
*
* @example
* var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
*
* var y = erfcinv( 0.5 );
* // returns ~0.4769
*
* y = erfcinv( 0.8 );
* // returns ~-0.1791
*
* y = erfcinv( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* y = erfcinv( 2.0 );
* // returns Number.NEGATIVE_INFINITY
*
* y = erfcinv( NaN );
* // returns NaN
*/

// MODULES //

var erfcinv = require( './erfcinv.js' );


// EXPORTS //

module.exports = erfcinv;

},{"./erfcinv.js":201}],203:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var expmulti = require( './expmulti.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01;
var LN2_LO = 1.90821492927058770002e-10;
var LOG2_E = 1.44269504088896338700e+00;
var OVERFLOW = 7.09782712893383973096e+02;
var UNDERFLOW = -7.45133219101941108420e+02;
var NEARZERO = 1.0 / (1 << 28); // 2^-28;
var NEG_NEARZERO = -NEARZERO;


// MAIN //

/**
* Evaluates the natural exponential function.
*
* #### Method
*
* 1. We reduce \\( x \\) to an \\( r \\) so that \\( |r| \leq 0.5 \cdot \ln(2) \approx 0.34658 \\). Given \\( x \\), we find an \\( r \\) and integer \\( k \\) such that
*
*   ``` tex
*   \begin{align*}
*   x &= k \cdot \ln(2) + r \\
*   |r| &\leq 0.5 \cdot \ln(2)
*   \end{align*}
*   ```
*
*   <!-- <note> -->
*   \\( r \\) can be represented as \\( r = \mathrm{hi} - \mathrm{lo} \\) for better accuracy.
*   <!-- </note> -->
*
* 2. We approximate of \\( e^{r} \\) by a special rational function on the interval \\([0,0.34658]\\):
*
*   ``` tex
*   \begin{align*}
*   R\left(r^2\right) &= r \cdot \frac{ e^{r}+1 }{ e^{r}-1 } \\
*   &= 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*   \end{align*}
*   ```
*
*   We use a special Remes algorithm on \\([0,0.34658]\\) to generate a polynomial of degree \\(5\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-59}\\). In other words,
*
*   ``` tex
*   R(z) \sim 2 + P_1 z + P_2 z^2 + P_3 z^3 + P_4 z^4 + P_5 z^5
*   ```
*
*   where \\( z = r^2 \\) and
*
*   ``` tex
*   \left|  2 + P_1 z + \ldots + P_5 z^5  - R(z) \right| \leq 2^{-59}
*   ```
*
*   <!-- <note> -->
*   The values of \\( P_1 \\) to \\( P_5 \\) are listed in the source code.
*   <!-- </note> -->
*   The computation of \\( e^{r} \\) thus becomes
*
*   ``` tex
*   \begin{align*}
*   e^{r} &= 1 + \frac{2r}{R-r} \\
*           &= 1 + r + \frac{r \cdot R_1(r)}{2 - R_1(r)}\ \text{for better accuracy}
*   \end{align*}
*   ```
*
*   where
*
*   ``` tex
*   R_1(r) = r - P_1\ r^2 + P_2\ r^4 + \ldots + P_5\ r^{10}
*   ```
*
* 3. We scale back to obtain \\( e^{x} \\). From step 1, we have
*
*   ``` tex
*   e^{x} = 2^k e^{r}
*   ```
*
*
* #### Special Cases
*
* ``` tex
* \begin{align*}
* e^\infty &= \infty \\
* e^{-\infty} &= 0 \\
* e^{\mathrm{NaN}} &= \mathrm{NaN} \\
* e^0 &= 1\ \mathrm{is\ exact\ for\ finite\ argument\ only}
* \end{align*}
* ```
*
* #### Notes
*
* - According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
* - For IEEE double,
*   * if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(e^{x}\\) overflows
*   * if \\(x < -7.45133219101941108420\mbox{e+}02\\), then \\(e^{x}\\) underflows
* - The hexadecimal values included in the source code are the intended ones for the used constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = exp( 4.0 );
* // returns ~54.5982
* @example
* var v = exp( -9.0 );
* // returns ~1.234e-4
* @example
* var v = exp( 0.0 );
* // returns 1.0
* @example
* var v = exp( NaN );
* // returns NaN
*/
function exp( x ) {
	var hi;
	var lo;
	var k;

	if ( isnan( x ) || x === PINF ) {
		return x;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	if ( x > OVERFLOW ) {
		return PINF;
	}
	if ( x < UNDERFLOW ) {
		return 0.0;
	}
	if (
		x > NEG_NEARZERO &&
		x < NEARZERO
	) {
		return 1.0 + x;
	}
	// Reduce and compute `r = hi - lo` for extra precision.
	if ( x < 0.0 ) {
		k = trunc( (LOG2_E*x) - 0.5 );
	} else {
		k = trunc( (LOG2_E*x) + 0.5 );
	}
	hi = x - (k*LN2_HI);
	lo = k * LN2_LO;

	return expmulti( hi, lo, k );
} // end FUNCTION exp()


// EXPORTS //

module.exports = exp;

},{"./expmulti.js":204,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/trunc":278,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],204:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var ldexp = require( '@stdlib/math/base/special/ldexp' );


// VARIABLES //

var P = [
	1.66666666666666019037e-01,  /* 0x3FC55555; 0x5555553E */
	-2.77777777770155933842e-03, /* 0xBF66C16C; 0x16BEBD93 */
	6.61375632143793436117e-05, /* 0x3F11566A; 0xAF25DE2C */
	-1.65339022054652515390e-06,/* 0xBEBBBD41; 0xC5D26BF1 */
	4.13813679705723846039e-08 /* 0x3E663769; 0x72BEA4D0 */
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyval_P = evalpoly( P );


// MAIN //

/**
* Computes \\(e^{r} 2^k\\) where \\(r = \mathrm{hi} - \mathrm{lo}\\) and \\(|r| \leq \ln(2)/2\\).
*
* @private
* @param {number} hi - upper bound
* @param {number} lo - lower bound
* @param {integer} k - power of 2
* @returns {number} function value
*/
function expmulti( hi, lo, k ) {
	var r;
	var t;
	var c;
	var y;

	r = hi - lo;
	t = r * r;
	c = r - t*polyval_P( t );
	y = 1.0 - ((lo - (r*c)/(2.0-c)) - hi);

	return ldexp( y, k );
} // end FUNCTION expmulti()


// EXPORTS //

module.exports = expmulti;

},{"@stdlib/math/base/special/ldexp":239,"@stdlib/math/base/tools/evalpoly":285}],205:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural exponential function.
*
* @module @stdlib/math/base/special/exp
*
* @example
* var exp = require( '@stdlib/math/base/special/exp' );
*
* var v = exp( 4.0 );
* // returns ~54.5982
*
* v = exp( -9.0 );
* // returns ~1.234e-4
*
* v = exp( 0.0 );
* // returns 1.0
*
* v = exp( NaN );
* // returns NaN
*/

// MODULES //

var exp = require( './exp.js' );


// EXPORTS //

module.exports = exp;

},{"./exp.js":203}],206:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [netlib]{@link http://www.netlib.org/fdlibm/s_expm1.c}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var LN2_HALF = require( '@stdlib/math/constants/float64-half-ln-two' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3FE62E42 0xFEE00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3DEA39EF 0x35793C76

// 1 / ln(2):
var LN2_INV = 1.44269504088896338700e+00; // 0x3FF71547 0x652B82FE

// ln(2) * 56:
var LN2x56 = 3.88162421113569373274e+01; // 0x4043687A 0x9F1AF2B1

// ln(2) * 1.5:
var LN2_HALFX3 = 1.03972077083991796413e+00; // 0x3FF0A2B2 0x3F3BAB73

// Scaled polynomial coefficients:
var Q = [
	-3.33333333333331316428e-02, // 0xBFA11111 0x111110F4
	1.58730158725481460165e-03,  // 0x3F5A01A0 0x19FE5585
	-7.93650757867487942473e-05, // 0xBF14CE19 0x9EAADBB7
	4.00821782732936239552e-06,  // 0x3ED0CFCA 0x86E65239
	-2.01099218183624371326e-07 // 0xBE8AFDB7 0x6E09C32D
];


// FUNCTIONS //

var polyval = evalpoly.factory( Q );


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* #### Method
*
* 1. Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*    ``` tex
*    x = k \cdot \ln(2) + r
*    ```
*
*    where
*
*    ``` tex
*    |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*    ```
*
*    <!-- <note> -->
*    A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*    <!-- </note> -->
*
* 2. To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\([0,0.34658]\\). Since
*
*    ``` tex
*    r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*    ```
*
*    we define \\(\operatorname{R1}(r^2)\\) by
*
*    ``` tex
*    r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*    ```
*
*    That is,
*
*    ``` tex
*    \begin{align*}
*    \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*    &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*    &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*    \end{align*}
*    ```
*
*    We use a special Remes algorithm on \\([0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*    ``` tex
*    \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*    ```
*
*    where
*
*    ``` tex
*    \begin{align*}
*    \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*    \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*    \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*    \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*    \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*    \end{align*}
*    ```
*
*    where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*    ``` tex
*    \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*    ```
*
*    \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*    ``` tex
*    \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*    ```
*
*    To compensate for the error in the argument reduction, we use
*
*    ``` tex
*    \begin{align*}
*    \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*    &\approx \operatorname{expm1}(r) + c + rc
*    \end{align*}
*    ```
*
*    Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*    ``` tex
     \begin{align*}
*    \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*    &= r - \mathrm{E}
*    \end{align*}
*    ```
*
* 3. To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*    ``` tex
*    \operatorname{expm1}(x) = \begin{cases}
*    2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*    2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*    \end{cases}
*    ```
*
* #### Special Cases
*
* ``` tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* #### Notes
*
* - For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
* - To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
* - To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*   * if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*   * if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*   * if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*   * if \\(k = 1\\),
*     - if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*     - else return \\(1+2(r-\mathrm{E})\\)
*   * if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*   * if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*   * else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)
* - For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
* - The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* #### Accuracy
*
* According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1( 0.2 );
* // returns ~0.221
* @example
* var v = expm1( -9.0 );
* // returns ~-0.999
* @example
* var v = expm1( 0.0 );
* // returns 0.0
* @example
* var v = expm1( NaN );
* // returns NaN
*/
function expm1( x ) {
	var halfX;
	var sign;
	var hi;
	var lo;
	var hx;
	var r1;
	var y;
	var z;
	var c;
	var t;
	var e;
	var k;

	if ( x === PINF || isnan( x ) ) {
		return x;
	}
	if ( x === NINF ) {
		return -1.0;
	}
	if ( x === 0.0 ) {
		return x; // handles +-0 (IEEE 754-2008)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		sign = true;
		y = -x;
	} else {
		sign = false;
		y = x;
	}
	// Filter out huge and non-finite arguments...
	if ( y >= LN2x56 ) { // if |x| >= 56*ln(2)
		if ( sign ) { // if x <= -56*ln(2)
			return -1.0;
		}
		if ( y >= OVERFLOW_THRESHOLD ) { // if |x| >= 709.78...
			return PINF;
		}
	}
	// Extract the more significant bits from |x|:
	hx = highWord( y );

	// Argument reduction...
	if ( y > LN2_HALF ) { // if |x| > 0.5*ln(2)
		if ( y < LN2_HALFX3 ) { // if |x| < 1.5*ln(2)
			if ( sign ) {
				hi = x + LN2_HI;
				lo = -LN2_LO;
				k = -1;
			} else {
				hi = x - LN2_HI;
				lo = LN2_LO;
				k = 1;
			}
		} else {
			if ( sign ) {
				k = (LN2_INV*x) - 0.5;
			} else {
				k = (LN2_INV*x) + 0.5;
			}
			k = k|0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
			t = k;
			hi = x - (t*LN2_HI); // t*ln2_hi is exact here
			lo = t * LN2_LO;
		}
		x = hi - lo;
		c = (hi-x) - lo;
	}
	// if |x| < 2**-54 => high word: 0 01111001001 00000000000000000000 => 0x3c900000 = 1016070144  => exponent = 01111001001 = 969 = 1023-54
	else if ( hx < 1016070144 ) {
		return x;
	}
	else {
		k = 0;
	}
	// x is now in primary range...
	halfX = 0.5 * x;
	z = x * halfX;

	r1 = 1.0 + ( z * polyval( z ) );

	t = 3.0 - (r1*halfX);
	e = z * ( (r1-t) / (6.0 - (x*t)) );
	if ( k === 0 ) {
		return x - ( (x*e) - z );	// c is 0
	}
	e = ( x * (e-c) ) - c;
	e -= z;
	if ( k === -1 ) {
		return ( 0.5*(x-e) )- 0.5;
	}
	if ( k === 1 ) {
		if ( x < -0.25 ) {
			return -2.0 * ( e - (x+0.5) );
		}
		return 1 + ( 2.0 * (x-e) );
	}
	if ( k <= -2 || k > 56 ) { // suffice to return exp(x)-1
		y = 1.0 - (e-x);

		// Add k to y's exponent:
		hi = highWord( y ) + (k<<20);
		y = setHighWord( y, hi );

		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x200000 = 0 00000000010 00000000000000000000
		hi = 1072693248 - (0x200000>>k);
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (BIAS-k)<<20 );
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	// Add k to y's exponent:
	hi = highWord( y ) + (k<<20);
	y = setHighWord( y, hi );
	return y;
} // end FUNCTION expm1()


// EXPORTS //

module.exports = expm1;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-set-high-word":306,"@stdlib/math/constants/float64-exponent-bias":321,"@stdlib/math/constants/float64-half-ln-two":322,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],207:[function(require,module,exports){
'use strict';

/**
* Compute `exp(x) - 1`.
*
* @module @stdlib/math/base/special/expm1
*
* @example
* var expm1 = require( '@stdlib/math/base/special/expm1' );
*
* var v = expm1( 0.2 );
* // returns ~0.221
*
* v = expm1( -9.0 );
* // returns ~-0.999
*
* v = expm1( 0.0 );
* // returns 0.0
*
* v = expm1( NaN );
* // returns NaN
*/

// MODULES //

var expm1 = require( './expm1.js' );


// EXPORTS //

module.exports = expm1;

},{"./expm1.js":206}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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

},{"./floor.js":208}],210:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://netlib.sandia.gov/cephes/cprob/gamma.c}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* COPYRIGHT
*
* Cephes Math Library Release 2.8:  June, 2000
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
*
* LICENSE
*
* The README [file]{@link http://netlib.sandia.gov/cephes/} reads:
*   > Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*   > The two known misprints in the book are repaired here in the source listings for the gamma function and the incomplete beta integral.
*   > Stephen L. Moshier
*   > moshier@na-net.ornl.gov
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var sin = require( '@stdlib/math/base/special/sin' );
var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var stirlingApprox = require( './stirling_approximation.js' );
var smallApprox = require( './small_approximation.js' );


// VARIABLES //

var P = [
	9.99999999999999996796e-01,
	4.94214826801497100753e-01,
	2.07448227648435975150e-01,
	4.76367800457137231464e-02,
	1.04213797561761569935e-02,
	1.19135147006586384913e-03,
	1.60119522476751861407e-04,
	0
];
var Q = [
	1.00000000000000000320e+00,
	7.14304917030273074085e-02,
	-2.34591795718243348568e-01,
	3.58236398605498653373e-02,
	1.18139785222060435552e-02,
	-4.45641913851797240494e-03,
	5.39605580493303397842e-04,
	-2.31581873324120129819e-05
];


// FUNCTIONS //

// Compile a function to evaluate a rational function based on the above coefficients...
var rateval = evalrational( P, Q );


// MAIN //

/**
* Evaluates the gamma function.
*
* #### Method
*
* 1. Arguments \\(|x| \leq 34\\) are reduced by recurrence and the function approximated by a rational function of degree \\(6/7\\) in the interval \\((2,3)\\).
* 2. Large negative arguments are made positive using a reflection formula.
* 3. Large arguments are handled by Stirling's formula.
*
*
* #### Notes
*
* * Relative error:
*
* arithmetic | domain | # trials | peak | rms
* ---------- | ------ | -------- | ---- | ---
* DEC | -34,34 | 10000 | 1.3e-16 | 2.5e-17
* IEEE | -170,-33 | 20000 | 2.3e-15 | 3.3e-16
* IEEE | -33, 33 | 20000 | 9.4e-16 | 2.2e-16
* IEEE | 33, 171.6 | 20000 | 2.3e-15 | 3.2e-16
*
* * Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gamma( 4.0 );
* // returns 6.0
* @example
* var v = gamma( -1.5 );
* // returns ~2.363
* @example
* var v = gamma( -0.5 );
* // returns ~-3.545
* @example
* var v = gamma( 0.5 );
* // returns ~1.772
* @example
* var v = gamma( 0.0 );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = gamma( -0.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var v = gamma( NaN );
* // returns NaN
*/
function gamma( x ) {
	var sign;
	var q;
	var p;
	var z;
	if (
		(isInteger( x ) && x < 0) ||
		x === NINF ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( isNegativeZero( x ) ) {
			return NINF;
		}
		return PINF;
	}
	if (
		x < -170.5674972726612 ||
		x > 171.61447887182298
	) {
		return PINF;
	}
	q = abs( x );
	if ( q > 33.0 ) {
		if ( x >= 0.0 ) {
			return stirlingApprox( x );
		}
		p = floor( q );

		// Check whether `x` is even...
		if ( (p&1) === 0 ) {
			sign = -1.0;
		} else {
			sign = 1.0;
		}
		z = q - p;
		if ( z > 0.5 ) {
			p += 1.0;
			z = q - p;
		}
		z = q * sin( PI * z );
		return sign * PI / ( abs(z)*stirlingApprox(q) );
	}
	// Reduce `x`...
	z = 1.0;
	while ( x >= 3.0 ) {
		x -= 1.0;
		z *= x;
	}
	while ( x < 0.0 ) {
		if ( x > -1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	while ( x < 2.0 ) {
		if ( x < 1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	if ( x === 2.0 ) {
		return z;
	}
	x -= 2.0;
	return z * rateval( x );
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"./small_approximation.js":212,"./stirling_approximation.js":213,"@stdlib/math/base/assert/is-integer":131,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/assert/is-negative-zero":135,"@stdlib/math/base/special/abs":184,"@stdlib/math/base/special/floor":209,"@stdlib/math/base/special/sin":263,"@stdlib/math/base/tools/evalrational":288,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pi":334,"@stdlib/math/constants/float64-pinf":335}],211:[function(require,module,exports){
'use strict';

/**
* Evaluate the gamma function.
*
* @module @stdlib/math/base/special/gamma
*
* @example
* var gamma = require( '@stdlib/math/base/special/gamma' );
*
* var v = gamma( 4.0 );
* // returns 6.0
*
* v = gamma( -1.5 );
* // returns ~2.363
*
* v = gamma( -0.5 );
* // returns ~-3.545
*
* v = gamma( 0.5 );
* // returns ~1.772
*
* v = gamma( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = gamma( -0.0 );
* // returns Number.NEGATIVE_INFINITY
*
* v = gamma( NaN );
* // returns NaN
*/

// MODULES //

var gamma = require( './gamma.js' );


// EXPORTS //

module.exports = gamma;

},{"./gamma.js":210}],212:[function(require,module,exports){
'use strict';

// MODULES //

var EULER = require( '@stdlib/math/constants/float64-eulergamma' );


// MAIN //

/**
* Evaluates the gamma function using a small-value approximation.
*
* @param {number} x - input value
* @param {number} z - scale factor
* @returns {number} function value
*/
function gamma( x, z ) {
	return z / ( (1.0 + EULER*x) * x );
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"@stdlib/math/constants/float64-eulergamma":320}],213:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );


// VARIABLES //

var MAX_STIRLING = 143.01608;
var S = [
	8.33333333333482257126e-02,
	3.47222221605458667310e-03,
	-2.68132617805781232825e-03,
	-2.29549961613378126380e-04,
	7.87311395793093628397e-04
];


// FUNCTIONS //

// Compile a function to evaluate a polynomial based on the above coefficients...
var polyval = evalpoly( S );


// MAIN //

/**
* Evaluates the gamma function using Stirling's formula. The polynomial is valid for \\(33 \leq x \leq 172\\).
*
* @param {number} x - input value
* @returns {number} function value
*/
function gamma( x ) {
	var w;
	var y;
	var v;

	w = 1.0 / x;
	w = 1.0 + w * polyval( w );
	y = exp( x );

	// Check `x` to avoid `pow()` overflow...
	if ( x > MAX_STIRLING ) {
		v = pow( x, 0.5*x - 0.25 );
		y = v * (v/y);
	} else {
		y = pow( x, x-0.5 ) / y;
	}
	return SQRT_TWO_PI * y * w;
} // end FUNCTION gamma()


// EXPORTS //

module.exports = gamma;

},{"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/pow":251,"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/constants/float64-sqrt-two-pi":338}],214:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );


// MAIN //

/**
* Calculates normalised Q when a is an integer.
*
* @private
* @param {integer} a - function parameter
* @param {number} x - function parameter
* @returns {number} upper gamma fraction
*/
function finite_gamma_q( a, x ) {
	var term;
	var sum;
	var e;
	var n;

	e = exp( -x );
	sum = e;
	if ( sum !== 0.0 ) {
		term = sum;
		for ( n = 1; n < a; ++n ){
			term /= n;
			term *= x;
			sum += term;
		}
	}
	return sum;
} // end FUNCTION finite_gamma_q()


// EXPORTS //

module.exports = finite_gamma_q;

},{"@stdlib/math/base/special/exp":205}],215:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var PI = require( '@stdlib/math/constants/float64-pi' );


// MAIN //

/**
* Calculates normalised Q when a is a half-integer.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {number} upper gamma fraction
*/
function finite_half_gamma_q( a, x ) {
	var half;
	var term;
	var sum;
	var e;
	var n;

	e = erfc( sqrt(x) );
	if ( e !== 0 && a > 1.0 ) {
		term = exp( -x ) / sqrt( PI * x );
		term *= x;
		half = 0.5;
		term /= half;
		sum = term;
		for( n = 2; n < a; ++n ) {
			term /= n - half;
			term *= x;
			sum += term;
		}
		e += sum;
	}
	return e;
} // end FUNCTION finite_half_gamma_q()


// EXPORTS //

module.exports = finite_half_gamma_q;

},{"@stdlib/math/base/special/erfc":200,"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/sqrt":272,"@stdlib/math/constants/float64-pi":334}],216:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );


// MAIN //

/**
* Calculates the power term prefix (z^a)(e^-z) used in the non-normalised incomplete gammas.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} power term prefix
*/
function full_igamma_prefix( a, z ) {
	var prefix;
	var alz;

	alz = a * ln( z );
	if ( z >= 1.0 ) {
		if ( ( alz < MAX_LN ) && ( -z > MIN_LN ) ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( a >= 1.0 ) {
			prefix = pow( z / exp(z/a), a );
		}
		else {
			prefix = exp( alz - z );
		}
	}
	else {
		if ( alz > MIN_LN ) {
			prefix = pow( z, a ) * exp( -z );
		}
		else if ( z/a < MAX_LN ) {
			prefix = pow( z / exp(z/a), a );
		} else {
			prefix = exp( alz - z );
		}
	}
	return prefix;
} // end FUNCTION full_igamma_prefix()


// EXPORTS //

module.exports = full_igamma_prefix;

},{"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/special/pow":251,"@stdlib/math/constants/float64-max-ln":329,"@stdlib/math/constants/float64-min-ln":332}],217:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var floor = require( '@stdlib/math/base/special/floor' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var SQRT_EPSILON = require( '@stdlib/math/constants/float64-sqrt-eps' );
var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var finite_gamma_q = require( './finite_gamma_q.js' );
var finite_half_gamma_q = require( './finite_half_gamma_q.js' );
var full_igamma_prefix = require( './full_igamma_prefix.js' );
var igamma_temme_large = require( './igamma_temme_large.js' );
var lower_gamma_series = require( './lower_gamma_series.js' );
var regularised_gamma_prefix = require( './regularised_gamma_prefix.js' );
var tgamma_small_upper_part = require( './tgamma_small_upper_part.js' );
var upper_gamma_fraction = require( './upper_gamma_fraction.js' );


// VARIABLES //

var MAX_FACTORIAL = 170; // TODO: consider extracting as a constant


// MAIN //

/**
* Computes the regularized incomplete gamma function. The upper tail is calculated via the modified Lentz's method for computing continued fractions, the lower tail using a power expansion.
*
* @param {NonNegativeNumber} x - function parameter
* @param {PositiveNumber} s - function parameter
* @param {boolean} [regularized=true] - boolean indicating if the function should evaluate the regularized or non-regularized incomplete gamma functions
* @param {boolean} [upper=false] - boolean indicating if the function should return the upper tail of the incomplete gamma function
* @returns {number} function value
*/
function gammainc( x, a, regularized, upper ) {
	var normalised;
	var invert;
	var initValue;
	var optimised_invert;
	var result;
	var sigma;
	var eval_method;
	var gam;
	var use_temme;
	var fa;
	var is_int;
	var is_half_int;
	var is_small_a;
	var res;
	var g;

	if ( x < 0.0 || a <= 0.0 ) {
		return NaN;
	}
	normalised = ( regularized !== undefined ) ? regularized : true;
	invert = upper ? true : false;
	result = 0.0;

	if ( a >= MAX_FACTORIAL && !normalised ) {
		//
		// When we're computing the non-normalized incomplete gamma
		// and a is large the result is rather hard to compute unless
		// we use logs.  There are really two options - if x is a long
		// way from a in value then we can reliably use methods 2 and 4
		// below in logarithmic form and go straight to the result.
		// Otherwise we let the regularized gamma take the strain
		// (the result is unlikely to unerflow in the central region anyway)
		// and combine with lgamma in the hopes that we get a finite result.
		//
		if ( invert && ( a * 4.0 < x ) ) {
			// This is method 4 below, done in logs:
			result = a * ln(x) - x;
			result += ln( upper_gamma_fraction( a, x ) );
		}
		else if ( !invert && ( a > 4.0 * x ) ) {
			// This is method 2 below, done in logs:
			result = a * ln(x) - x;
			initValue = 0;
			result += ln( lower_gamma_series( a, x, initValue ) / a );
		}
		else {
			result = gammainc( a, x, true, invert );
			if ( result === 0.0 ) {
				if ( invert ) {
					// Try http://functions.wolfram.com/06.06.06.0039.01
					result = 1 + 1 / (12 * a) + 1 / (288 * a * a);
					result = ln( result ) - a + (a - 0.5) * ln(a) + ln( SQRT_TWO_PI );
				} else {
					// This is method 2 below, done in logs, we're really outside the
					// range of this method, but since the result is almost certainly
					// infinite, we should probably be OK:
					result = a * ln( x ) - x;
					initValue = 0.0;
					result += ln( lower_gamma_series( a, x, initValue ) / a);
				}
			}
			else {
				result = ln( result ) + gammaln( a );
			}
		}
		if ( result > MAX_LN ) {
			return PINF;
		}
		return exp( result );
	}

	is_small_a = (a < 30) && (a <= x + 1.0 ) && (x < MAX_LN );
	if ( is_small_a ) {
		fa = floor( a );
		is_int = ( fa === a );
		is_half_int = is_int ? false : ( abs( fa - a ) === 0.5 );
	} else {
		is_int = is_half_int = false;
	}
	if ( is_int && x > 0.6 )
	// Calculate Q via finite sum:
	{
		invert = !invert;
		eval_method = 0;
	}
	else if ( is_half_int && x > 0.2 )
	// Calculate Q via finite sum for half integer a:
	{
		invert = !invert;
		eval_method = 1;
	}
	else if ( x < SQRT_EPSILON && a > 1.0 )
	{
		eval_method = 6;
	}
	else if ( x < 0.5 )
	{
		// Changeover criterion chosen to give a changeover at Q ~ 0.33:
		if ( -0.4 / ln( x ) < a ) {
			eval_method = 2;
		} else {
			eval_method = 3;
		}
	}
	else if ( x < 1.1 )
	{
		// Changover here occurs when P ~ 0.75 or Q ~ 0.25:
		if ( x * 0.75 < a ) {
			eval_method = 2;
		} else {
			eval_method = 3;
		}
	}
	else
	{
		/* Begin by testing whether we're in the "bad" zone
		where the result will be near 0.5 and the usual
		series and continued fractions are slow to converge: */
		use_temme = false;
		if ( normalised && a > 20 ) {
			sigma = abs( (x-a)/a );
			if ( a > 200 ) {
				// This limit is chosen so that we use Temme's expansion
				// only if the result would be larger than about 10^-6.
				// Below that the regular series and continued fractions
				// converge OK, and if we use Temme's method we get increasing
				// errors from the dominant erfc term as it's (inexact) argument
				// increases in magnitude.
				if ( 20 / a > sigma * sigma ) {
					use_temme = true;
				}
			} else {
				if ( sigma < 0.4 ) {
					use_temme = true;
				}
			}
		}
		if ( use_temme ) {
			eval_method = 5;
		}
		// Regular case where the result will not be too close to 0.5.
		else
		{
			// Changeover here occurs at P ~ Q ~ 0.5
			// Note that series computation of P is about x2 faster than continued fraction
			// calculation of Q, so try and use the CF only when really necessary, especially
			// for small x.
			if ( x - ( 1.0 / (3.0 * x) ) < a ) {
				eval_method = 2;
			} else {
				eval_method = 4;
				invert = !invert;
			}
		}
	}

	switch( eval_method ) {
	case 0:
		result = finite_gamma_q( a, x );
		if (normalised === false ) {
			result *= gamma( a );
		}
	break;
	case 1:
		result = finite_half_gamma_q( a, x );
		if ( normalised === false ) {
			result *= gamma( a );
		}
	break;
	case 2:
		// Compute P:
		result = normalised ? regularised_gamma_prefix( a, x ) : full_igamma_prefix( a, x );
		if ( result !== 0.0 ) {
			initValue = 0.0;
			optimised_invert = false;
			if ( invert ) {
				initValue = normalised ? 1.0 : gamma(a);
				if ( normalised || result >= 1.0 || FLOAT64_MAX * result > initValue ) {
					initValue /= result;
					if ( normalised || a < 1.0 || ( FLOAT64_MAX / a > initValue ) ) {
						initValue *= -a;
						optimised_invert = true;
					}
					else {
						initValue = 0.0;
					}
				}
				else {
					initValue = 0.0;
				}
			}
		}
		result *= lower_gamma_series( a, x, initValue ) / a;
		if ( optimised_invert ) {
			invert = false;
			result = -result;
		}
	break;
	case 3:
		// Compute Q:
		invert = !invert;
		res = tgamma_small_upper_part( a, x, invert );
		result = res[ 0 ];
		g = res[ 1 ];
		invert = false;
		if ( normalised ) {
			result /= g;
		}
	break;
	case 4:
		// Compute Q:
		result = normalised ? regularised_gamma_prefix( a, x ) : full_igamma_prefix( a, x );
		if ( result !== 0 ) {
			result *= upper_gamma_fraction( a, x );
		}
	break;
	case 5:
		result = igamma_temme_large( a, x );
		if ( x >= a ) {
			invert = !invert;
		}
	break;
	case 6:
		// x is so small that P is necessarily very small too,
		// use http://functions.wolfram.com/GammaBetaErf/GammaRegularized/06/01/05/01/01/
		result = !normalised ? pow( x, a ) / a : pow(x, a) / gamma( a + 1.0 );
		result *= 1.0 - a * x / ( a + 1.0 );
	break;
	}
	if ( normalised && result > 1.0 ) {
		result = 1.0;
	}
	if ( invert ) {
		gam = normalised ? 1.0 : gamma( a );
		result = gam - result;
	}
	return result;
} // end FUNCTION gammainc()


// EXPORTS //

module.exports = gammainc;

},{"./finite_gamma_q.js":214,"./finite_half_gamma_q.js":215,"./full_igamma_prefix.js":216,"./igamma_temme_large.js":219,"./lower_gamma_series.js":221,"./regularised_gamma_prefix.js":223,"./tgamma_small_upper_part.js":225,"./upper_gamma_fraction.js":226,"@stdlib/math/base/special/abs":184,"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/floor":209,"@stdlib/math/base/special/gamma":211,"@stdlib/math/base/special/gammaln":238,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/special/pow":251,"@stdlib/math/constants/float64-max":330,"@stdlib/math/constants/float64-max-ln":329,"@stdlib/math/constants/float64-pinf":335,"@stdlib/math/constants/float64-sqrt-eps":337,"@stdlib/math/constants/float64-sqrt-two-pi":338}],218:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_48_0/boost/math/special_functions/gamma.hpp}.
*
* This implementation follows the original, but has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );


// MAIN //

/**
* Computes `Γ(x+1) - 1`.
*
* @private
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammap1m1( 1e-3 );
* // returns ~-0.001
* @example
* var v = gammap1m1( -3/2 );
* // returns ~-4.545
* @example
* var v = gammap1m1( 4.0 );
* // returns 23
* @example
* var v = gammap1m1( 1/2 );
* // returns ~-0.114
* @example
* var v = gammap1m1( NaN );
* // returns NaN
*/
function gammap1m1( x ) {
	var result;
	if ( x < 0.0 ) {
		if ( x < -0.5 ) {
			// Best method is simply to subtract 1 from gamma:
			result = gamma( 1.0 + x ) - 1.0;
		} else {
			// Use expm1 on gammaln:
			result = expm1( -log1p(x) + gammaln( x + 2.0 ) );
		}
	} else {
		if ( x < 2.0 ) {
			// Use expm1 on gammaln:
			result = expm1( gammaln( x + 1.0 ) );
		} else {
			// Best method is simply to subtract 1 from gamma:
			result = gamma( 1.0 + x ) - 1.0;
		}
	}
	return result;
} // end FUNCTION gammap1m1()


// EXPORTS //

module.exports = gammap1m1;

},{"@stdlib/math/base/special/expm1":207,"@stdlib/math/base/special/gamma":211,"@stdlib/math/base/special/gammaln":238,"@stdlib/math/base/special/log1p":243}],219:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var PI = require( '@stdlib/math/constants/float64-pi' );


// VARIABLES //

// Polynomical coefficients...
var C0 = [
	-0.33333333333333333,
	0.083333333333333333,
	-0.014814814814814815,
	0.0011574074074074074,
	0.0003527336860670194,
	-0.00017875514403292181,
	0.39192631785224378e-4,
	-0.21854485106799922e-5,
	-0.185406221071516e-5,
	0.8296711340953086e-6,
	-0.17665952736826079e-6,
	0.67078535434014986e-8,
	0.10261809784240308e-7,
	-0.43820360184533532e-8,
	0.91476995822367902e-9
];
var C1 = [
	-0.0018518518518518519,
	-0.0034722222222222222,
	0.0026455026455026455,
	-0.00099022633744855967,
	0.00020576131687242798,
	-0.40187757201646091e-6,
	-0.18098550334489978e-4,
	0.76491609160811101e-5,
	-0.16120900894563446e-5,
	0.46471278028074343e-8,
	0.1378633446915721e-6,
	-0.5752545603517705e-7,
	0.11951628599778147e-7
];
var C2 = [
	0.0041335978835978836,
	-0.0026813271604938272,
	0.00077160493827160494,
	0.20093878600823045e-5,
	-0.00010736653226365161,
	0.52923448829120125e-4,
	-0.12760635188618728e-4,
	0.34235787340961381e-7,
	0.13721957309062933e-5,
	-0.6298992138380055e-6,
	0.14280614206064242e-6
];
var C3 = [
	0.00064943415637860082,
	0.00022947209362139918,
	-0.00046918949439525571,
	0.00026772063206283885,
	-0.75618016718839764e-4,
	-0.23965051138672967e-6,
	0.11082654115347302e-4,
	-0.56749528269915966e-5,
	0.14230900732435884e-5
];
var C4 = [
	-0.0008618882909167117,
	0.00078403922172006663,
	-0.00029907248030319018,
	-0.14638452578843418e-5,
	0.66414982154651222e-4,
	-0.39683650471794347e-4,
	0.11375726970678419e-4
];
var C5 = [
	-0.00033679855336635815,
	-0.69728137583658578e-4,
	0.00027727532449593921,
	-0.00019932570516188848,
	0.67977804779372078e-4,
	0.1419062920643967e-6,
	-0.13594048189768693e-4,
	0.80184702563342015e-5,
	-0.22914811765080952e-5
];
var C6 = [
	0.00053130793646399222,
	-0.00059216643735369388,
	0.00027087820967180448,
	0.79023532326603279e-6,
	-0.81539693675619688e-4,
	0.56116827531062497e-4,
	-0.18329116582843376e-4
];
var C7 = [
	0.00034436760689237767,
	0.51717909082605922e-4,
	-0.00033493161081142236,
	0.0002812695154763237,
	-0.00010976582244684731
];
var C8 = [
	-0.00065262391859530942,
	0.00083949872067208728,
	-0.00043829709854172101
];

// Compile functions for evaluating polynomial functions...
var polyvalC0 = evalpoly.factory( C0 );
var polyvalC1 = evalpoly.factory( C1 );
var polyvalC2 = evalpoly.factory( C2 );
var polyvalC3 = evalpoly.factory( C3 );
var polyvalC4 = evalpoly.factory( C4 );
var polyvalC5 = evalpoly.factory( C5 );
var polyvalC6 = evalpoly.factory( C6 );
var polyvalC7 = evalpoly.factory( C7 );
var polyvalC8 = evalpoly.factory( C8 );


// MAIN //

/**
* Asymptotic expansions of the incomplete gamma functions when a is large and x ~ a. (IEEE double precision or 10^-17).
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {number} value of asymptotic expansion
*/
function igamma_temme_large( a, x ) {
	var workspace;
	var result;
	var sigma = (x - a) / a;
	var phi = -ln( 1 + sigma ) + sigma;
	var y;
	var z;

	y = a * phi;
	z = sqrt( 2 * phi );
	if ( x < a ) {
		z = -z;
	}
	workspace = new Array( 10 );
	workspace[ 0 ] = polyvalC0( z );
	workspace[ 1 ] = polyvalC1( z );
	workspace[ 2 ] = polyvalC2( z );
	workspace[ 3 ] = polyvalC3( z );
	workspace[ 4 ] = polyvalC4( z );
	workspace[ 5 ] = polyvalC5( z );
	workspace[ 6 ] = polyvalC6( z );
	workspace[ 7 ] = polyvalC7( z );
	workspace[ 8 ] = polyvalC8( z );
	workspace[ 9 ] = -0.00059676129019274625;

	result = evalpoly( workspace, 1/a );
	result *= exp( -y ) / sqrt( 2.0 * PI * a );
	if ( x < a ) {
		result = -result;
	}
	result += erfc( sqrt(y) ) / 2.0;
	return result;
} // end FUNCTION igamma_temme_large()


// EXPORTS //

module.exports = igamma_temme_large;

},{"@stdlib/math/base/special/erfc":200,"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/special/sqrt":272,"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/constants/float64-pi":334}],220:[function(require,module,exports){
'use strict';

/**
* Evaluate the incomplete gamma function.
*
* @module @stdlib/math/base/special/gammainc
*
* @example
* var gammainc = require( '@stdlib/math/base/special/gammainc' );
*
* var v = gammainc( 6.0, 2.0 );
* // returns ~0.9826
*
* v = gammainc( 1.0, 2.0, true, true );
* // returns ~0.7358
*
* v = gammainc( 7.0, 5.0 );
* // returns ~0.8270
*
* v = gammainc( 7.0, 5.0, false );
* // returns ~19.8482
*
* v = gammainc( NaN, 2.0 );
* // returns NaN
*
* v = gammainc( 6.0, NaN );
* // returns NaN
*/

// MODULES //

var gammainc = require( './gammainc.js' );


// EXPORTS //

module.exports = gammainc;

},{"./gammainc.js":217}],221:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var lower_incomplete_gamma_series = require( './lower_incomplete_gamma_series' );


// MAIN //

/**
* Sums elements of the series expansion of the lower incomplete gamma function.
*
* #### Method
*
* Multiply result by ((z^a) * (e^-z) / a) to get the full lower incomplete integral. Then divide by tgamma(a) to get the normalised value.
*
* @private
* @param {number} a - function parameter
* @param {number} z - function parameter
* @param {number} initialValue - initial value of the resulting sum
* @returns {number} sum of terms of lower gamma series
*/
function lower_gamma_series( a, z, initialValue ) {
	var result;
	var s;

	initialValue = initialValue || 0.0;
	s = lower_incomplete_gamma_series( a, z );
	result = sumSeries( s, {
		'initialValue': initialValue
	});
	return result;

} // end FUNCTION lower_gamma_series()


// EXPORTS //

module.exports = lower_gamma_series;

},{"./lower_incomplete_gamma_series":222,"@stdlib/math/base/tools/sum-series":291}],222:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Creates a function to evaluate a series expansion of the incomplete gamma function.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function lower_incomplete_gamma_series( a1, z1 ) {
	var result = 1.0;
	var a = a1;
	var z = z1;
	return function next() {
		var r = result;
		a += 1.0;
		result *= z/a;
		return r;
	};
} // end FUNCTION lower_incomplete_gamma_series()


// EXPORTS //

module.exports = lower_incomplete_gamma_series;

},{}],223:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' ).factory;
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var E = require( '@stdlib/math/constants/float64-e' );


// VARIABLES //

var LOG_MAX_VALUE = 709.0;
var LOG_MIN_VALUE = -708.0;
var G = 10.90051099999999983936049829935654997826;
var NUM = [
	709811.662581657956893540610814842699825,
	679979.847415722640161734319823103390728,
	293136.785721159725251629480984140341656,
	74887.5403291467179935942448101441897121,
	12555.29058241386295096255111537516768137,
	1443.42992444170669746078056942194198252,
	115.2419459613734722083208906727972935065,
	6.30923920573262762719523981992008976989,
	0.2266840463022436475495508977579735223818,
	0.004826466289237661857584712046231435101741,
	0.4624429436045378766270459638520555557321e-4
];
var DENOM = [
	0,
	362880,
	1026576,
	1172700,
	723680,
	269325,
	63273,
	9450,
	870,
	45,
	1
];


// FUNCTIONS //

/**
* Calculate the Lanczos approximation scaled by exp(G).
*
* @private
* @param {number} z - input value
* @returns {number} Lanczos approximation
*/
var lanczos_sum_expG_scaled = evalrational( NUM, DENOM );


// MAIN //

/**
* Computes (z^a)(e^-z)/tgamma(a).
*
* @private
* @param {number} a - input value
* @param {number} z - input value
* @returns {number} (z^a)(e^-z)/tgamma(a)
*/
function regularised_gamma_prefix( a, z ) {
	var alz;
	var amz;
	var amza;
	var sq;
	var agh = a + G - 0.5;
	var prefix;
	var d = ( (z - a) - G + 0.5 ) / agh;

	if ( a < 1 ) {
		//
		// We have to treat a < 1 as a special case because our Lanczos
		// approximations are optimised against the factorials with a > 1,
		// and for high precision types especially (128-bit reals for example)
		// very small values of a can give rather eroneous results for gamma
		// unless we do this:
		//
		// TODO: is this still required?  Lanczos approx should be better now?
		//
		if ( z <= LOG_MIN_VALUE ) {
			// Oh dear, have to use logs, should be free of cancellation errors though:
			return exp( a * ln(z) - z - gammaln( a ) );
		}
		else {
			// direct calculation, no danger of overflow as gamma(a) < 1/a
			// for small a.
			return pow( z, a ) * exp( -z ) / gamma( a );
		}
	}
	else if ( abs(d*d*a) <= 100 && a > 150 ) {
		// special case for large a and a ~ z.
		prefix = a * ( log1p( d ) - d ) + z * (0.5 - G) / agh;
		prefix = exp( prefix );
	}
	else {
		//
		// general case.
		// direct computation is most accurate, but use various fallbacks
		// for different parts of the problem domain:
		//
		alz = a * ln(z / agh);
		amz = a - z;
		if (
			min(alz, amz) <= LOG_MIN_VALUE ||
			max(alz, amz) >= LOG_MAX_VALUE
		) {
			amza = amz / a;
			if (
				min(alz, amz)/2 > LOG_MIN_VALUE &&
				max(alz, amz)/2 < LOG_MAX_VALUE
			) {
				// compute square root of the result and then square it:
				sq = pow( z / agh, a / 2 ) * exp( amz / 2 );
				prefix = sq * sq;
			}
			else if (
				min(alz, amz)/4 > LOG_MIN_VALUE  &&
				max(alz, amz)/4 < LOG_MAX_VALUE &&
				z > a
			) {
				// compute the 4th root of the result then square it twice:
				sq = pow( z / agh, a / 4 ) * exp( amz / 4 );
				prefix = sq * sq;
				prefix *= prefix;
			}
			else if (
				amza > LOG_MIN_VALUE &&
				amza < LOG_MAX_VALUE
			) {
				prefix = pow( (z * exp(amza)) / agh, a );
			}
			else {
				prefix = exp( alz + amz );
			}
		}
		else
		{
			prefix = pow( z / agh, a ) * exp( amz );
		}
	}
	prefix *= sqrt( agh / E ) / lanczos_sum_expG_scaled( a );
	return prefix;
} // end FUNCTION regularised_gamma_prefix()


// EXPORTS //

module.exports = regularised_gamma_prefix;

},{"@stdlib/math/base/special/abs":184,"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/gamma":211,"@stdlib/math/base/special/gammaln":238,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/special/log1p":243,"@stdlib/math/base/special/max":245,"@stdlib/math/base/special/min":247,"@stdlib/math/base/special/pow":251,"@stdlib/math/base/special/sqrt":272,"@stdlib/math/base/tools/evalrational":288,"@stdlib/math/constants/float64-e":318}],224:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

/**
* Series representation for upper fraction when z is small.
*
* @private
* @param {number} a - function parameter
* @param {number} x - function parameter
* @returns {Function}  series function
*/
function small_gamma2_series( a, x ) {
	var result;
	var apn;
	var n;
	var r;

	result = -x;
	x = -x;
	apn = a + 1.0;
	n = 1;
	return function next() {
		r = result / apn;
		result *= x;
		result /= ++n;
		apn += 1.0;
		return r;
	};
} // end FUNCTION small_gamma2_series()


// EXPORTS //

module.exports = small_gamma2_series;

},{}],225:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var powm1 = require( '@stdlib/math/base/special/powm1' );
var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
var small_gamma2_series = require( './small_gamma2_series.js' );
var tgamma1pm1 = require( './gammap1m1.js' );


// MAIN //

/**
* Compute the full upper fraction (Q) when a is very small.
*
* @param {number} a - function parameter
* @param {number} x - function parameter
* @param {boolean} invert - boolean indicating if the upper tail of the incomplete gamma function should be evaluated
* @returns {number} full upper fraction (Q)
*/
function tgamma_small_upper_part( a, x, invert ) {
	var initialValue;
	var result;
	var pgam;
	var p;
	var s;

	result = tgamma1pm1( a );
	pgam = ( result + 1.0 ) / a;
	p = powm1( x, a );
	result -= p;
	result /= a;
	s = small_gamma2_series( a, x );
	p += 1.0;
	initialValue = invert ? pgam : 0.0;
	result = -p * sumSeries( s, {
		'initialValue': (initialValue - result) / p
	});
	if ( invert ) {
		result = -result;
	}
	return [ result, pgam ];
} // end FUNCTION tgamma_small_upper_part()


// EXPORTS //

module.exports = tgamma_small_upper_part;

},{"./gammap1m1.js":218,"./small_gamma2_series.js":224,"@stdlib/math/base/special/powm1":259,"@stdlib/math/base/tools/sum-series":291}],226:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
var upper_incomplete_gamma_fract = require( './upper_incomplete_gamma_fract' );


// MAIN //

/**
* Evaluate the lower incomplete gamma integral via a series expansion and divide by gamma(z) to normalise.
*
* @param {number} a - function parameter
* @param {number} z - function parameter
* @returns {number} function value
*/
function upper_gamma_fraction( a, z ) {
	var f = upper_incomplete_gamma_fract( a, z );
	return 1.0 / ( z - a + 1.0 + continuedFraction( f ) );
} // end FUNCTION upper_gamma_fraction()


// EXPORTS //

module.exports = upper_gamma_fraction;

},{"./upper_incomplete_gamma_fract":227,"@stdlib/math/base/tools/continued-fraction":282}],227:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_37_0/boost/math/special_functions/gamma.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* (C) Copyright Paul A. Bristow 2007.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Creates a function to evaluate a series expansion of the upper incomplete gamma fraction.
*
* @private
* @param {number} a1 - function parameter
* @param {number} z1 - function parameter
* @returns {Function} series function
*/
function upper_incomplete_gamma_fract( a1, z1 ) {
	var z = z1 - a1 + 1.0;
	var a = a1;
	var k = 0;
	return function next() {
		++k;
		z += 2.0;
		return [
			k * (a - k),
			z
		];
	};
} // end FUNCTION upper_incomplete_gamma_fract()


// EXPORTS //

module.exports = upper_incomplete_gamma_fract;

},{}],228:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Computes the sum of a Chebyshev polynomial.
*
* @private
* @param {PositiveInteger} n - degree of polynomial
* @param {number} t - input value
* @param {Array} ak - coefficients of the Chebyshev polynomial
* @returns {number} Chebyshev sum
*/
function chepolsum( n, t, ak ) {
	var tt;
	var u0;
	var u1;
	var u2;
	var k;

	u0 = 0.0;
	u1 = 0.0;
	tt = t + t;
	k = n;
	do {
		u2 = u1;
		u1 = u0;
		u0 = tt*u1 - u2 + ak[ k ];
		k = k - 1;
	} while ( k >= 0 );
	return ( u0 - u2 ) / 2.0;
} // end FUNCTION chepolsum()


// EXPORTS //

module.exports = chepolsum;

},{}],229:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var evalrational = require( '@stdlib/math/base/tools/evalrational' );
var ln = require( '@stdlib/math/base/special/ln' );
var lambdaeta = require( './lambdaeta.js' );


// VARIABLES //

var AK = [
	-3.333333333438e-1,
	-2.070740359969e-1,
	-5.041806657154e-2,
	-4.923635739372e-3,
	-4.293658292782e-5
];
var BK = [
	1.000000000000e+0,
	7.045554412463e-1,
	2.118190062224e-1,
	3.048648397436e-2,
	1.605037988091e-3
];


// FUNCTIONS //

var rateval = evalrational.factory( AK, BK );


// MAIN //

/**
* Evaluates the `eps1` function.
*
* @private
* @param {number} eta - eta value
* @returns {number} function value
*/
function eps1( eta ) {
	var la;
	if ( abs( eta ) < 1.0 ) {
		return rateval( eta );
	}
	la = lambdaeta( eta );
	return ln( eta / ( la - 1.0 ) ) / eta;
} // end FUNCTION eps1()


// EXPORTS //

module.exports = eps1;

},{"./lambdaeta.js":235,"@stdlib/math/base/special/abs":184,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/tools/evalrational":288}],230:[function(require,module,exports){
'use strict';

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' );
var ln = require( '@stdlib/math/base/special/ln' );


// VARIABLES //

var AK1 = [
	-1.72847633523e-2,
	-1.59372646475e-2,
	-4.64910887221e-3,
	-6.06834887760e-4,
	-6.14830384279e-6
];
var BK1 = [
	1.00000000000e+0,
	7.64050615669e-1,
	2.97143406325e-1,
	5.79490176079e-2,
	5.74558524851e-3
];

var AK2 = [
	-1.72839517431e-2,
	-1.46362417966e-2,
	-3.57406772616e-3,
	-3.91032032692e-4,
	2.49634036069e-6
];
var BK2 = [
	1.00000000000e+0,
	6.90560400696e-1,
	2.49962384741e-1,
	4.43843438769e-2,
	4.24073217211e-3
];

var AK3 = [
	9.99944669480e-1,
	1.04649839762e+2,
	8.57204033806e+2,
	7.31901559577e+2,
	4.55174411671e+1
];
var BK3 = [
	1.00000000000e+0,
	1.04526456943e+2,
	8.23313447808e+2,
	3.11993802124e+3,
	3.97003311219e+3
];


// FUNCTIONS //

var rateval1 = evalrational.factory( AK1, BK1 );
var rateval2 = evalrational.factory( AK2, BK2 );
var rateval3 = evalrational.factory( AK3, BK3 );


// MAIN //

/**
* Evaluates the `eps2` function.
*
* @private
* @param {number} eta - eta value
* @returns {number} function value
*/
function eps2( eta ) {
	var lnmeta;
	var x;
	if ( eta < -5.0 ) {
		x = eta * eta;
		lnmeta = ln( -eta );
		return ( 12.0 - x - 6.0 * ( lnmeta*lnmeta ) ) / ( 12.0 * x * eta );
	}
	else if ( eta < -2.0 ) {
		return rateval1( eta );
	}
	else if ( eta < 2.0 ) {
		return rateval2( eta );
	}
	else if ( eta < 1000.0 ) {
		x = 1.0 / eta;
		return rateval3( eta ) / ( -12.0 * eta );
	}
	else {
		return -1.0 / ( 12.0 * eta );
	}
} // end FUNCTION eps2()


// EXPORTS //

module.exports = eps2;

},{"@stdlib/math/base/special/ln":241,"@stdlib/math/base/tools/evalrational":288}],231:[function(require,module,exports){
'use strict';

// MODULES //

var evalrational = require( '@stdlib/math/base/tools/evalrational' );
var ln = require( '@stdlib/math/base/special/ln' );


// VARIABLES //

var ak1 = new Array( 5 );
var bk1 = new Array( 5 );
ak1[ 0 ] = 4.95346498136e-2;  bk1[ 0 ] = 1.00000000000e+0;
ak1[ 1 ] = 2.99521337141e-2;  bk1[ 1 ] = 7.59803615283e-1;
ak1[ 2 ] = 6.88296911516e-3;  bk1[ 2 ] = 2.61547111595e-1;
ak1[ 3 ] = 5.12634846317e-4;  bk1[ 3 ] = 4.64854522477e-2;
ak1[ 4 ] = -2.01411722031e-5; bk1[ 4 ] = 4.03751193496e-3;

var ak2 = new Array( 5 );
var bk2 = new Array( 5 );
ak2[ 0 ] = 4.52313583942e-3;  bk2[ 0 ] = 1.00000000000e+0;
ak2[ 1 ] = 1.20744920113e-3;  bk2[ 1 ] = 9.12203410349e-1;
ak2[ 2 ] = -7.89724156582e-5; bk2[ 2 ] = 4.05368773071e-1;
ak2[ 3 ] = -5.04476066942e-5; bk2[ 3 ] = 9.01638932349e-2;
ak2[ 4 ] = -5.35770949796e-6; bk2[ 4 ] = 9.48935714996e-3;

var ak3 = new Array( 5 );
var bk3 = new Array( 5 );
ak3[ 0 ] = 4.39937562904e-3;  bk3[ 0 ] = 1.00000000000e+0;
ak3[ 1 ] = 4.87225670639e-4;  bk3[ 1 ] = 7.94435257415e-1;
ak3[ 2 ] = -1.28470657374e-4; bk3[ 2 ] = 3.33094721709e-1;
ak3[ 3 ] = 5.29110969589e-6;  bk3[ 3 ] = 7.03527806143e-2;
ak3[ 4 ] = 1.57166771750e-7;  bk3[ 4 ] = 8.06110846078e-3;

var ak4 = new Array( 5 );
var bk4 = new Array( 5 );
ak4[ 0 ] = -1.14811912320e-3;  bk4[ 0 ] = 1.00000000000e+0;
ak4[ 1 ] = -1.12850923276e-1;  bk4[ 1 ] = 1.42482206905e+1;
ak4[ 2 ] = 1.51623048511e+0;   bk4[ 2 ] = 6.97360396285e+1;
ak4[ 3 ] = -2.18472031183e-1;  bk4[ 3 ] = 2.18938950816e+2;
ak4[ 4 ] = 7.30002451555e-2;   bk4[ 4 ] = 2.77067027185e+2;

var ak5 = new Array( 5 );
var bk5 = new Array( 5 );
ak5[ 0 ] = -1.45727889667e-4;  bk5[ 0 ] = 1.00000000000e+0;
ak5[ 1 ] = -2.90806748131e-1;  bk5[ 1 ] = 1.39612587808e+2;
ak5[ 2 ] = -1.33085045450e+1;  bk5[ 2 ] = 2.18901116348e+3;
ak5[ 3 ] = 1.99722374056e+2;   bk5[ 3 ] = 7.11524019009e+3;
ak5[ 4 ] = -1.14311378756e+1;  bk5[ 4 ] = 4.55746081453e+4;


// FUNCTIONS //

var rational1 = evalrational.factory( ak1, bk1 );
var rational2 = evalrational.factory( ak2, bk2 );
var rational3 = evalrational.factory( ak3, bk3 );
var rational4 = evalrational.factory( ak4, bk4 );
var rational5 = evalrational.factory( ak5, bk5 );


// MAIN //

/**
* Evaluates the `eps3` function.
*
* @private
* @param {number} eta - eta value
* @returns {number} function value
*/
function eps3( eta ) {
	var eta3;
	var x;
	var y;

	if ( eta < -8.0 ) {
		x = eta * eta;
		y = ln( -eta ) / eta;
		return ( -30.0 + eta * y * ( 6.0 * x * y * y - 12.0 + x ) ) /
			( 12.0 * eta * x * x );
	}
	else if ( eta < -4.0 ) {
		return rational1( eta ) / ( eta * eta );
	}
	else if ( eta < -2.0 ) {
		return rational2( eta );
	}
	else if ( eta < 2.0 ) {
		return rational3( eta );
	}
	else if ( eta < 10.0 ) {
		x = 1.0 / eta;
		return rational4( x ) / ( eta * eta );
	}
	else if ( eta < 100.0 ) {
		x = 1.0 / eta;
		return rational5( x ) / ( eta * eta );
	}
	else {
		eta3 = eta * eta * eta;
		return - ln( eta ) / ( 12.0 * eta3 );
	}
} // end FUNCTION eps3()


// EXPORTS //

module.exports = eps3;

},{"@stdlib/math/base/special/ln":241,"@stdlib/math/base/tools/evalrational":288}],232:[function(require,module,exports){
'use strict';

// MODULES //

var gammainc = require( '@stdlib/math/base/special/gammainc' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var erfcinv = require( '@stdlib/math/base/special/erfcinv' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var FLOAT32_SMALLEST = require( '@stdlib/math/constants/float32-smallest-normal' );
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var MAX_FLOAT32 = require( '@stdlib/math/constants/float32-max' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var lambdaeta = require( './lambdaeta.js' );
var gamstar = require( './gamstar.js' );
var eps1 = require( './eps1.js' );
var eps2 = require( './eps2.js' );
var eps3 = require( './eps3.js' );


// MAIN //

/*
* Translated from the Fortran module by
* ----------------------------------------------------------------------
* Authors:
*  Amparo Gil    (U. Cantabria, Santander, Spain)
*                 e-mail: amparo.gil@unican.es
*  Javier Segura (U. Cantabria, Santander, Spain)
*                 e-mail: javier.segura@unican.es
*  Nico M. Temme (CWI, Amsterdam, The Netherlands)
*                 e-mail: nico.temme@cwi.nl
* ---------------------------------------------------------------------
*/

/**
* Inverts the lower gamma function, i.e. computes xr such that P(a,xr) = p.
*
* #### Method
*
* The present code uses different methods of computation depending on the values of the input values: Taylor, asymptotic expansions and high-order Newton methods.
*
* #### Notes
*
* * The claimed accuracy obtained using this inversion routine is near 1e-12.
*
* #### References
*
* * A. Gil, J. Segura and N.M. Temme, GammaCHI: a package for the inversion and computation of the gamma and chi-square distribution functions (central and noncentral). Computer Physics Commun
* * A. Gil, J. Segura and N.M. Temme. Efficient and accurate algorithms for the computation and inversion of the incomplete gamma function ratios. SIAM J Sci Comput. (2012) 34(6), A2965-A2981
*
* @param {Probability} p - probability value
* @param {number} a - scale parameter
* @param {boolean} [upper=false] - boolean indicating if the function should invert the upper tail of the incomplete gamma function instead, i.e. compute xr such that Q(a,xr)=p.
* @returns {number} function value of the inverse
*/
function gammaincinv( p, a, upper ) {
	if ( isnan( p ) || isnan( a ) ) {
		return NaN;
	}
	if ( a < FLOAT32_SMALLEST ) {
		return NaN;
	}
	if ( p > 1.0 || p < 0.0 ) {
		return NaN;
	}
	if ( upper === true ) {
		// Case: Invert upper gamma function...
		if ( p === 0.0 ) {
			return PINF;
		} else if ( p === 1.0 ) {
			return 0.0;
		}
		return compute( a, 1.0 - p, p );
	}
	// Default: Invert lower gamma function
	if ( p === 0.0 ) {
		return 0.0;
	} else if ( p === 1.0 ) {
		return PINF;
	}
	return compute( a, p, 1.0 - p );
} // end FUNCTION gammaincinv()


/**
* This routine computes xr in the equations P(a,xr)=p and Q(a,xr)=q with a as a given positive parameter; p and q satisfy p+q=1. The equation is inverted with min(p,q).
*
* @private
* @param {number} a - scale value of incomplete gamma function
* @param {Probability} p - probability value
* @param {Probability} q - probability value
* @returns {number} solution of the equations P(a,xr)=p and Q(a,xr)=q with a as a given positive parameter.
*/
function compute( a, p, q ) {
	var warning;
	var ap1inv;
	var invfp;
	var lgama;
	var pcase;
	var porq;
	var ainv;
	var dlnr;
	var logr;
	var ap22;
	var ap14;
	var ap13;
	var ap12;
	var vgam;
	var vmin;
	var xini;
	var ap1;
	var ap2;
	var ap3;
	var eta;
	var p6;
	var p5;
	var x0;
	var ck;
	var a2;
	var x2;
	var L2;
	var L3;
	var L4;
	var b2;
	var b3;
	var p3;
	var a4;
	var fp;
	var px;
	var qx;
	var p4;
	var p2;
	var a3;
	var xr;
	var b;
	var L;
	var i;
	var k;
	var m;
	var n;
	var r;
	var s;
	var t;
	var x;
	var y;

	ck = new Array( 5 );
	if ( p < 0.5) {
		pcase = true;
		porq = p;
		s = -1;
	} else {
		pcase = false;
		porq = q;
		s = 1;
	}
	k = 0;
	if ( abs( a - 1 ) < 1e-4 ) {
		m = 0;
		if ( pcase ) {
			if ( p < 1e-3 ) {
				p2 = p * p;
				p3 = p2 * p;
				p4 = p3 * p;
				p5 = p4 * p;
				p6 = p5 * p;
				x0 = p + p2 * 0.5 + p3 * (1/3) + p4 * 0.25 + p5 * 0.2 + p6 * (1/6);
			} else {
				x0 = - ln( 1 - p );
			}
		} else {
			x0 = - ln( q );
		}
		if ( a === 1 ) {
			k = 2;
			xr = x0;
		} else {
			lgama = gammaln( a );
			k = 1;
		}
	}
	if ( q < 1e-30 && a < 0.5 ) {
		m = 0;
		x0 = - ln( q * gamma(a) ) + ( a - 1 ) * ln( -ln( q * gamma(a) ) );
		k = 1;
		lgama = gammaln( a );
	}
	if ( a > 1 && a < 500 && p < 1e-80 ) {
		m = 0;
		ainv = 1 / a;
		ap1inv = 1 / ( a + 1 );
		x0 = ( gammaln( a + 1 )+ ln( p ) ) * ainv;
		x0 = exp( x0 );
		xini = x0;
		for ( i = 0; i < 10; i++ ) {
			x0 = xini * exp( x0 * ainv ) * pow( 1.0 - x0 * ap1inv, ainv );
		}
		k = 1;
		lgama = gammaln( a );
	}

	logr = (1/a) * ( ln(p) + gammaln( a + 1 ) );

	if ( ( logr < ln( 0.2 * ( 1 + a ) ) ) && ( k === 0 ) ) {
		r = exp( logr );
		m = 0;
		a2 = a * a;
		a3 = a2 * a;
		a4 = a3 * a;
		ap1 = a + 1;
		ap12 = ap1 * ap1;
		ap13 = ap1 * ap12;
		ap14 = ap12 * ap12;
		ap2 = a + 2;
		ap22 = ap2 * ap2;
		ap3 = a + 3;
		ck[ 0 ] = 1;
		ck[ 1 ] = 1 / ap1;
		ck[ 2 ] = 0.5 * ( 3 * a + 5 ) / ( ap12 * ap2 );
		ck[ 3 ] = (1/3) * ( 31 + 8 * a2 + 33 * a ) / ( ap13 * ap2 * ap3 );
		ck[ 4 ] = 0.0416666666666666666666666666667 *( 2888 + 1179 * a3 + 125 * a4 + 3971 * a2 + 5661 * a ) / ( ap14 * ap22 * ap3 * ( a + 4 ) );
		x0 = r * ( 1 + r * ( ck[ 1 ] + r * ( ck[ 2 ] + r * ( ck[ 3 ] + r * ck[ 4 ] ) ) ) );
		lgama = gammaln( a );
		k = 1;
	}

	if ( ( a < 10 ) && ( k === 0 ) ) {
		vgam = sqrt( a ) / ( gamstar(a) * SQRT_TWO_PI );
		vmin = Math.min( 0.02, vgam );
		if ( q < vmin ) {
			m = 0;
			b = 1 - a;
			b2 = b * b;
			b3 = b2 * b;
			eta = sqrt( -2/a * ln( q / vgam ) );
			x0 = a * lambdaeta(eta);
			L = ln( x0 );
			if ( x0 > 5 ) {
				L2 = L * L;
				L3 = L2 * L;
				L4 = L3 * L;
				r = 1 / x0;
				ck[ 0 ] = L - 1;
				ck[ 1 ] = ( 3 * b - 2 * b * L + L2 - 2 * L + 2 ) * 0.5;
				ck[ 2 ] =(24*b*L-11*b2-24*b-6*L2+12*L-12-9*b*L2+6*b2*L+2*L3)*
					0.166666666666666666666666666667;
				ck[ 3 ] =(-12*b3*L+84*b*L2-114*b2*L+72+36*L2+3*L4-
					72*L+162*b-168*b*L-12*L3+25*b3-
					22*b*L3+36*b2*L2+120*b2)*0.0833333333333333333333333333333;
				x0 = x0 - L + b * r * ( ck[ 0 ] + r * ( ck[ 1 ] + r * ( ck[ 2 ] + r * ck[ 3 ] ) ) );
			} else {
				r = 1 / x0;
				L2 = L * L;
				ck[ 0 ] = L - 1;
				if ( ( L - b * r * ck[ 0 ] ) < x0 ) {
					x0 = x0 - L + b * r * ck[ 0 ];
				}
			}
			lgama = gammaln( a );
			k = 1;
		}
	}
	if ( ( abs( porq - 0.5 ) < 1e-5 ) && ( k === 0 ) ) {
		m = 0;
		ainv = 1 / a;
		x0 = a - (1/3) + (0.0197530864197530864197530864198 + 0.00721144424848128551832255535959 * ainv) * ainv;
		lgama = gammaln( a );
		k = 1;
	}
	if ( ( a < 1 ) && ( k === 0 ) ) {
		m = 0;
		if (pcase) {
			x0 = exp( (1/a) * ( ln(porq) + gammaln(a+1) ) );
		} else {
			x0 = exp( (1/a) * ( ln(1-porq) + gammaln(a+1) ) );
		}
		lgama = gammaln( a );
		k = 1;
	}
	if ( k === 0 ) {
		m = 1;
		ainv = 1 / a;
		r = erfcinv( 2 * porq );
		eta = s * r / sqrt( a * 0.5 );
		if ( r < MAX_FLOAT32 ) {
			eta = eta + ( eps1(eta)+(eps2(eta)+eps3(eta)*ainv ) * ainv ) * ainv;
			x0 = a * lambdaeta(eta);
			y = eta;
			fp = - sqrt( a / (2*PI) ) * exp( -0.5*a*y*y ) / ( gamstar(a) );
			invfp = 1 / fp;
		} else {
			warning = 'Warning: Overflow problems in one or more steps of the computation.';
			console.log( warning );
			return NaN;
		}
	}
	x = x0;
	if ( k < 2 ) {
		t = 1;
		n = 1;
		a2 = a * a;
		a3 = a2 * a;
		xini = x0;
		// Implementation of the high order Newton-like method
		do {
			x = x0;
			x2 = x * x;
			if ( m === 0 ) {
				dlnr = ( 1 - a ) * ln( x ) + x + lgama;
				if ( dlnr > ln( MAX_FLOAT32 ) ) {
					warning = 'Warning: overflow problems in one or more steps of the computation.';
					warning += 'The initial approximation to the root is returned.';
					console.log( warning );
					return xini;
				} else {
					r = exp( dlnr );
				}
			} else {
				r = - invfp * x;
			}
			if ( pcase ) {
				// gammainc( x, s[, regularized = true ][, upper = false ] )
				px = gammainc( x, a, true, false );
				ck[ 0 ] = - r * ( px - p );
			} else {
				// gammainc( x, s[, regularized = true ][, upper = true ] )
				qx = gammainc( x, a, true, true );
				ck[ 0 ] = r * ( qx - q );
			}
			r = ck[ 0 ];
			if ( ( p > 1e-120 ) || ( n > 1 ) ) {
				ck[ 1 ] = 0.5 * ( x - a + 1 ) / x;
				ck[ 2 ] = 0.166666666666666666666666666667 *
					(2*x2-4*x*a+4*x+2*a2-3*a+1) / x2;
				x0 = x + r * ( 1 + r * ( ck[ 1 ] + r * ck[ 2 ] ) );
			} else {
				x0 = x + r;
			}
			t = abs( x/x0 - 1 );
			n = n + 1;
			x = x0;
			if ( x < 0 ) {
				x = xini;
				n = 100;
			}
		} while ( ( ( t > 2e-14 ) && ( n < 35 ) ) );
		if ( ( t > 2e-14 ) || ( n > 99 ) ) {
			warning = 'Warning: the number of iterations in the Newton method reached the upper limit N=35.\n';
			warning += 'The last value obtained for the root is given as output.';
			console.log( warning );
		}
		xr = x || 0;
	}
	return xr;
} // end FUNCTION compute()


// EXPORTS //

module.exports = gammaincinv;

},{"./eps1.js":229,"./eps2.js":230,"./eps3.js":231,"./gamstar.js":233,"./lambdaeta.js":235,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/abs":184,"@stdlib/math/base/special/erfcinv":202,"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/gamma":211,"@stdlib/math/base/special/gammainc":220,"@stdlib/math/base/special/gammaln":238,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/special/pow":251,"@stdlib/math/base/special/sqrt":272,"@stdlib/math/constants/float32-max":316,"@stdlib/math/constants/float32-smallest-normal":317,"@stdlib/math/constants/float64-pi":334,"@stdlib/math/constants/float64-pinf":335,"@stdlib/math/constants/float64-sqrt-two-pi":338}],233:[function(require,module,exports){
'use strict';

// MODULES //

var exp = require( '@stdlib/math/base/special/exp' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var ln = require( '@stdlib/math/base/special/ln' );
var FLOAT32_MAX = require( '@stdlib/math/constants/float32-max' );
var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
var stirling = require( './stirling.js' );


// MAIN //

/**
* Computes the regulated gamma function.
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function gamstar( x ) {
	if ( x >= 3.0 ) {
		return exp( stirling(x) );
	}
	else if ( x > 0.0 ) {
		return gamma(x) / ( exp( -x + ( x - 0.5 ) * ln(x) ) * SQRT_TWO_PI );
	}
	// Case: x <= 0.0
	return FLOAT32_MAX;
} // end FUNCTION gamstar()


// EXPORTS //

module.exports = gamstar;

},{"./stirling.js":236,"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/gamma":211,"@stdlib/math/base/special/ln":241,"@stdlib/math/constants/float32-max":316,"@stdlib/math/constants/float64-sqrt-two-pi":338}],234:[function(require,module,exports){
'use strict';

/**
* Computes the inverse of the lower incomplete gamma function
*
* @module @stdlib/math/base/special/gammaincinv
*
* @example
* var gammaincinv = require( '@stdlib/math/base/special/gammaincinv' );
*
* var val = gammaincinv( 0.5, 2.0 );
* // returns ~1.678
*
* val = gammaincinv( 0.1, 10.0 );
* // returns ~6.221
*
* val = gammaincinv( 0.75, 3.0 );
* // returns ~3.92
*
* val = gammaincinv( 0.75, 3.0, true );
* // returns ~1.727
*
* val = gammaincinv( 0.75, NaN );
* // returns NaN
*
* val = gammaincinv( NaN, 3.0 );
* // returns NaN
*/

// MODULES //

var gammaincinv = require( './gammaincinv.js' );


// EXPORTS //

module.exports = gammaincinv;

},{"./gammaincinv.js":232}],235:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );


// VARIABLES //

var AK1 = [
	0,
	1.0,
	1.0,
	1.5,
	2.66666666666666666666666666667,
	5.20833333333333333333333333333,
	10.8
];

var AK2 = [
	1.0,
	1.0,
	0.333333333333333333333333333333,
	0.0277777777777777777777777777778,
	-0.00370370370370370370370370370370,
	0.000231481481481481481481481481481,
	0.0000587889476778365667254556143445
];


// FUNCTIONS //

var polyval1 = evalpoly.factory( AK1 );
var polyval2 = evalpoly.factory( AK2 );


// MAIN //

/**
* lambdaeta is the positive number satisfying eta^2/2=lambda-1-ln(lambda) with sign(lambda-1)=sign(eta);
*
* @private
* @param {number} eta - eta value
* @returns {number} value satisfying equation
*/
function lambdaeta( eta ) {
	var L2;
	var L3;
	var L4;
	var L5;
	var ak;
	var la;
	var L;
	var q;
	var r;
	var s;

	ak = new Array( 6 );
	s = eta * eta * 0.5;
	if ( eta === 0.0 ) {
		la = 0.0;
	}
	else if ( eta < -1.0 ) {
		r = exp( -1.0 - s );
		la = polyval1( r );
	}
	else if ( eta < 1.0 ) {
		r = eta;
		la = polyval2( r );
	}
	else {
		r = 11.0 + s;
		L = ln( r );
		la = r + L;
		r = 1.0 / r;
		L2 = L * L;
		L3 = L2 * L;
		L4 = L3 * L;
		L5 = L4 * L;
		ak[ 0 ] = 1;
		ak[ 1 ] = ( 2 - L ) * 0.5;
		ak[ 2 ] = ( -9 * L + 6 + 2 * L2 ) * 0.166666666666666666666666666667;
		ak[ 4 ] = (60+350*L2-300*L-125*L3+12*L4)*0.0166666666666666666666666666667;
		ak[ 3 ] = -(3*L3+36*L-22*L2-12)*0.0833333333333333333333333333333;
		ak[ 5 ] = -(-120-274*L4+900*L-1700*L2+1125*L3+20*L5)*
				0.00833333333333333333333333333333;
		la = la + L*r*( ak[ 0 ] + r * ( ak[ 1 ] + r * ( ak[ 2 ] + r * ( ak[ 3 ] + r * ( ak[ 4 ] + r * ak[ 5 ] ) ) ) ) );
	}
	r = 1.0;
	if ( ( eta > -3.5 && eta < -0.03 ) || ( eta > 0.03 && eta < 40.0  ) ) {
		r = 1.0;
		q = la;
		do {
			la = q * ( s + ln(q) ) / ( q - 1.0 );
			r = abs( q/la - 1.0 );
			q = la;
		} while ( r > 1e-8 );
	}
	return la;
} // end FUNCTION lambdaeta()


// EXPORTS //

module.exports = lambdaeta;

},{"@stdlib/math/base/special/abs":184,"@stdlib/math/base/special/exp":205,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/tools/evalpoly":285}],236:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var ln = require( '@stdlib/math/base/special/ln' );
var LN_SQRT_TWO_PI = require( '@stdlib/math/constants/float64-ln-sqrt-two-pi' );
var SMALLEST_FLOAT32 = require( '@stdlib/math/constants/float32-smallest-normal' );
var MAX_FLOAT32 = require( '@stdlib/math/constants/float32-max' );
var chepolsum = require( './chepolsum.js' );


// Polyomial coefficients:

var A = [
	1.996379051590076518221,
	-0.17971032528832887213e-2,
	0.131292857963846713e-4,
	-0.2340875228178749e-6,
	0.72291210671127e-8,
	-0.3280997607821e-9,
	0.198750709010e-10,
	-0.15092141830e-11,
	0.1375340084e-12,
	-0.145728923e-13,
	0.17532367e-14,
	-0.2351465e-15,
	0.346551e-16,
	-0.55471e-17,
	0.9548e-18,
	-0.1748e-18,
	0.332e-19,
	-0.58e-20
];

var C = [
	0.25721014990011306473e-1,
	0.82475966166999631057e-1,
	-0.25328157302663562668e-2,
	0.60992926669463371e-3,
	-0.33543297638406e-3,
	0.250505279903e-3,
];
var C6 = 0.30865217988013567769;

var D = [
	0.0833333333333333333333333333333,
	-0.00277777777777777777777777777778,
	0.000793650793650793650793650793651,
	-0.000595238095238095238095238095238
];


// FUNCTIONS //

var polyval1 = evalpoly.factory( C );
var polyval2 = evalpoly.factory( D );


// MAIN //

/**
* Computes the stirling series corresponding with asymptotic series for log(gamma(x)), that is:  1/(12x)-1/(360x**3)...; x>= 3}
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function stirling( x ) {
	var z;
	if ( x < SMALLEST_FLOAT32 ) {
		return MAX_FLOAT32;
	}
	else if ( x < 1.0 ) {
		return gammaln( x + 1 ) - (x+0.5) * ln(x) + x - LN_SQRT_TWO_PI;
	}
	else if ( x < 2.0 ) {
		return gammaln( x ) - (x-0.5) * ln(x) + x - LN_SQRT_TWO_PI;
	}
	else if ( x < 3.0 ) {
		return gammaln( x - 1 ) - (x-0.5) * ln(x) + x - LN_SQRT_TWO_PI + ln(x-1);
	}
	else if ( x < 12.0 ) {
		z = 18.0 / ( x * x ) - 1.0;
		return chepolsum( 17, z, A ) / ( 12.0 * x );
	}
	else {
		z = 1.0 / ( x * x );
		if ( x < 1000.0 ) {
			return polyval1( z ) / ( C6 + z ) / x;
		} else {
			return polyval2( z ) / x;
		}
	}
} // end FUNCTION stirling()


// EXPORTS //

module.exports = stirling;

},{"./chepolsum.js":228,"@stdlib/math/base/special/gammaln":238,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/constants/float32-max":316,"@stdlib/math/constants/float32-smallest-normal":317,"@stdlib/math/constants/float64-ln-sqrt-two-pi":325}],237:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_lgamma_r.c?revision=268523&view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var PI = require( '@stdlib/math/constants/float64-pi' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// VARIABLES //

var A1C = 7.72156649015328655494e-02; // 0x3FB3C467E37DB0C8
var A1 = [
	6.73523010531292681824e-02, // 0x3FB13E001A5562A7
	7.38555086081402883957e-03, // 0x3F7E404FB68FEFE8
	1.19270763183362067845e-03, // 0x3F538A94116F3F5D
	2.20862790713908385557e-04, // 0x3F2CF2ECED10E54D
	2.52144565451257326939e-05  // 0x3EFA7074428CFA52
];
var A2C = 3.22467033424113591611e-01; // 0x3FD4A34CC4A60FAD
var A2 = [
	2.05808084325167332806e-02, // 0x3F951322AC92547B
	2.89051383673415629091e-03, // 0x3F67ADD8CCB7926B
	5.10069792153511336608e-04, // 0x3F40B6C689B99C00
	1.08011567247583939954e-04, // 0x3F1C5088987DFB07
	4.48640949618915160150e-05  // 0x3F07858E90A45837
];
var RC = 1.0;
var R = [
	1.39200533467621045958e+00, // 0x3FF645A762C4AB74
	7.21935547567138069525e-01, // 0x3FE71A1893D3DCDC
	1.71933865632803078993e-01, // 0x3FC601EDCCFBDF27
	1.86459191715652901344e-02, // 0x3F9317EA742ED475
	7.77942496381893596434e-04, // 0x3F497DDACA41A95B
	7.32668430744625636189e-06  // 0x3EDEBAF7A5B38140
];
var SC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var S = [
	2.14982415960608852501e-01,  // 0x3FCB848B36E20878
	3.25778796408930981787e-01,  // 0x3FD4D98F4F139F59
	1.46350472652464452805e-01,  // 0x3FC2BB9CBEE5F2F7
	2.66422703033638609560e-02,  // 0x3F9B481C7E939961
	1.84028451407337715652e-03,  // 0x3F5E26B67368F239
	3.19475326584100867617e-05   // 0x3F00BFECDD17E945
];
var T1C = 4.83836122723810047042e-01; // 0x3FDEF72BC8EE38A2
var T1 = [
	-3.27885410759859649565e-02, // 0xBFA0C9A8DF35B713
	6.10053870246291332635e-03,  // 0x3F78FCE0E370E344
	-1.40346469989232843813e-03, // 0xBF56FE8EBF2D1AF1
	3.15632070903625950361e-04   // 0x3F34AF6D6C0EBBF7
];
var T2C = -1.47587722994593911752e-01; // 0xBFC2E4278DC6C509
var T2 = [
	1.79706750811820387126e-02,  // 0x3F9266E7970AF9EC
	-3.68452016781138256760e-03, // 0xBF6E2EFFB3E914D7
	8.81081882437654011382e-04,  // 0x3F4CDF0CEF61A8E9
	-3.12754168375120860518e-04  // 0xBF347F24ECC38C38
];
var T3C = 6.46249402391333854778e-02; // 0x3FB08B4294D5419B
var T3 = [
	-1.03142241298341437450e-02, // 0xBF851F9FBA91EC6A
	2.25964780900612472250e-03,  // 0x3F6282D32E15C915
	-5.38595305356740546715e-04, // 0xBF41A6109C73E0EC
	3.35529192635519073543e-04   // 0x3F35FD3EE8C2D3F4
];
var UC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var U = [
	6.32827064025093366517e-01,  // 0x3FE4401E8B005DFF
	1.45492250137234768737e+00,  // 0x3FF7475CD119BD6F
	9.77717527963372745603e-01,  // 0x3FEF497644EA8450
	2.28963728064692451092e-01,  // 0x3FCD4EAEF6010924
	1.33810918536787660377e-02   // 0x3F8B678BBF2BAB09
];
var VC = 1.0;
var V = [
	2.45597793713041134822e+00, // 0x4003A5D7C2BD619C
	2.12848976379893395361e+00, // 0x40010725A42B18F5
	7.69285150456672783825e-01, // 0x3FE89DFBE45050AF
	1.04222645593369134254e-01, // 0x3FBAAE55D6537C88
	3.21709242282423911810e-03  // 0x3F6A5ABB57D0CF61
];
var WC = 4.18938533204672725052e-01; // 0x3FDACFE390C97D69
var W = [
	8.33333333333329678849e-02,  // 0x3FB555555555553B
	-2.77777777728775536470e-03, // 0xBF66C16C16B02E5C
	7.93650558643019558500e-04,  // 0x3F4A019F98CF38B6
	-5.95187557450339963135e-04, // 0xBF4380CB8C0FE741
	8.36339918996282139126e-04,  // 0x3F4B67BA4CDAD5D1
	-1.63092934096575273989e-03  // 0xBF5AB89D0B9E43E4
];
var YMIN = 1.461632144968362245;
var TWO52 = 4503599627370496; // 2**52
var TWO58 = 288230376151711744; // 2**58
var TINY = 8.470329472543003e-22;
var TC = 1.46163214496836224576e+00; // 0x3FF762D86356BE3F
var TF = -1.21486290535849611461e-01; // 0xBFBF19B9BCC38A42
var TT = -3.63867699703950536541e-18; // 0xBC50C7CAA48A971F => TT = -(tail of TF)


// FUNCTIONS //

// Compile functions to evaluate polynomials based on the above coefficients...
var polyvalA1 = evalpoly( A1 );
var polyvalA2 = evalpoly( A2 );
var polyvalR = evalpoly( R );
var polyvalS = evalpoly( S );
var polyvalT1 = evalpoly( T1 );
var polyvalT2 = evalpoly( T2 );
var polyvalT3 = evalpoly( T3 );
var polyvalU = evalpoly( U );
var polyvalV = evalpoly( V );
var polyvalW = evalpoly( W );


// MAIN //

/**
* Evaluates the natural logarithm of the gamma function.
*
* #### Method
*
* 1. Argument reduction for \\(0 < x \leq 8\\). Since \\(\Gamma(1+s) = s \Gamma(s)\\), for \\(x \in [0,8]\\), we may reduce \\(x\\) to a number in \\([1.5,2.5]\\) by
*
*   ``` tex
*   \operatorname{lgamma}(1+s) = \ln(s) + \operatorname{lgamma}(s)
*   ```
*
*   For example,
*
*   ``` tex
*   \begin{align}
*   \operatorname{lgamma}(7.3) &= \ln(6.3) + \operatorname{lgamma}(6.3) \\
*   &= \ln(6.3 \cdot 5.3) + \operatorname{lgamma}(5.3) \\
*   &= \ln(6.3 \cdot 5.3 \cdot 4.3 \cdot 3.3 \cdot2.3) + \operatorname{lgamma}(2.3)
*   \end{align}
*   ```
*
* 2. Compute a polynomial approximation of \\(\mathrm{lgamma}\\) around its
minimum (\\(\mathrm{ymin} = 1.461632144968362245\\)) to maintain monotonicity. On the interval \\([\mathrm{ymin} - 0.23, \mathrm{ymin} + 0.27]\\) (i.e., \\([1.23164,1.73163]\\)), we let \\(z = x - \mathrm{ymin}\\) and use
*
*   ``` tex
*   \operatorname{lgamma}(x) = -1.214862905358496078218 + z^2 \cdot \operatorname{poly}(z)
*   ```
*
*   where \\(\operatorname{poly}(z)\\) is a \\(14\\) degree polynomial.
*
* 3. Compute a rational approximation in the primary interval \\([2,3]\\). Let \\( s = x - 2.0 \\). We can thus use the approximation
*
*   ``` tex
*   \operatorname{lgamma}(x) = \frac{s}{2} + s\frac{\operatorname{P}(s)}{\operatorname{Q}(s)}
*   ```
*
*   with accuracy
*
*   ``` tex
*   \biggl|\frac{\mathrm{P}}{\mathrm{Q}} - \biggr(\operatorname{lgamma}(x)-\frac{s}{2}\biggl)\biggl| < 2^{-61.71}
*   ```
*
*   The algorithms are based on the observation
*
*   ``` tex
*   \operatorname{lgamma}(2+s) = s(1 - \gamma) + \frac{\zeta(2) - 1}{2} s^2 - \frac{\zeta(3) - 1}{3} s^3 + \ldots
*   ```
*
*   where \\(\zeta\\) is the zeta function and \\(\gamma = 0.5772156649...\\) is the Euler-Mascheroni constant, which is very close to \\(0.5\\).
*
* 3. For \\(x \geq 8\\),
*
*   ``` tex
*   \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr) \ln(x) - x + \frac{\ln(2\pi)}{2} + \frac{1}{12x} - \frac{1}{360x^3} + \ldots
*   ```
*
*   which can be expressed
*
*   ``` tex
*   \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)-\frac{\ln(2\pi)-1}{2} + \ldots
*   ```
*
*   Let \\(z = \frac{1}{x}\\). We can then use the approximation
*
*   ``` tex
*   f(z) = \operatorname{lgamma}(x) - \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)
*   ```
*
*   by
*
*   ``` tex
*   w = w_0 + w_1 z + w_2 z^3 + w_3 z^5 + \ldots + w_6 z^{11}
*   ```

*   where
*
*   ``` tex
*   |w - f(z)| < 2^{-58.74}
*   ```
*
* 4. For negative \\(x\\), since
*
*   ``` tex
*   -x \Gamma(-x) \Gamma(x) = \frac{\pi}{\sin(\pi x)}
*   ```
*
*   where \\(\Gamma\\) is the gamma function, we have
*
*   ``` tex
*   \Gamma(x) = \frac{\pi}{\sin(\pi x)(-x)\Gamma(-x)}
*   ```
*
*   Since \\(\Gamma(-x)\\) is positive,
*
*   ``` tex
*   \operatorname{sign}(\Gamma(x)) = \operatorname{sign}(\sin(\pi x))
*   ```
*
*   for \\(x < 0\\). Hence, for \\(x < 0\\),
*
*   ``` tex
*   \mathrm{signgam} = \operatorname{sign}(\sin(\pi x))
*   ```
*
*   and
*
*   ``` tex
*   \begin{align}
*   \operatorname{lgamma}(x) &= \ln(|\Gamma(x)|) \\
*   &= \ln\biggl(\frac{\pi}{|x \sin(\pi x)|}\biggr) - \operatorname{lgamma}(-x)
*   \end{align}
*   ```
*
*   <!-- <note> -->
*   Note that one should avoid computing \\(\pi (-x)\\) directly in the computation of \\(\sin(\pi (-x))\\).
*   <!-- </note> -->
*
*
* #### Special Cases
*
* ``` tex
* \begin{align}
* \operatorname{lgamma}(2+s) &\approx s (1-\gamma) & \mathrm{for\ tiny\ s} \\
* \operatorname{lgamma}(x) &\approx -\ln(x) & \mathrm{for\ tiny\ x} \\
* \operatorname{lgamma}(1) &= 0 & \\
* \operatorname{lgamma}(2) &= 0 & \\
* \operatorname{lgamma}(0) &= \infty & \\
* \operatorname{lgamma}(\infty) &= \infty & \\
* \operatorname{lgamma}(-\mathrm{integer}) &= \pm \infty
* \end{align}
* ```
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammaln( 1.0 );
* // returns 0.0
* @example
* var v = gammaln( 2.0 );
* // returns 0.0
* @example
* var v = gammaln( 4.0 );
* // returns ~1.792
* @example
* var v = gammaln( -0.5 );
* // returns ~1.266
* @example
* var v = gammaln( 0.5 );
* // returns ~0.572
* @example
* var v = gammaln( 0.0 );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = gammaln( NaN );
* // returns NaN
*/
function gammaln( x ) {
	var isNegative;
	var nadj;
	var flg;
	var p3;
	var p2;
	var p1;
	var p;
	var q;
	var t;
	var w;
	var y;
	var z;
	var r;

	// Special cases: NaN, +-infinity
	if ( isnan( x ) || isInfinite( x ) ) {
		return x;
	}
	// Special case: 0
	if ( x === 0.0 ) {
		return PINF;
	}
	if ( x < 0.0 ) {
		isNegative = true;
		x = -x;
	} else {
		isNegative = false;
	}
	// If |x| < 2**-70, return -ln(|x|)
	if ( x < TINY ) {
		return -ln( x );
	}
	if ( isNegative ) {
		// If |x| >= 2**52, must be -integer
		if ( x >= TWO52 ) {
			return PINF;
		}
		t = sinpi( x );
		if ( t === 0.0 ) {
			return PINF;
		}
		nadj = ln( PI / abs( t*x ) );
	}
	// If x equals 1 or 2, return 0
	if ( x === 1.0 || x === 2.0 ) {
		return 0.0;
	}
	// If x < 2, use lgamma(x) = lgamma(x+1) - log(x)
	if ( x < 2.0 ) {
		if ( x <= 0.9 ) {
			r = -ln( x );

			// 0.7316 <= x <=  0.9
			if ( x >= ( YMIN - 1.0 + 0.27 ) ) {
				y = 1.0 - x;
				flg = 0;
			}
			// 0.2316 <= x < 0.7316
			else if ( x >= (YMIN - 1.0 - 0.27) ) {
				y = x - (TC - 1.0);
				flg = 1;
			}
			// 0 < x < 0.2316
			else {
				y = x;
				flg = 2;
			}
		} else {
			r = 0.0;

			// 1.7316 <= x < 2
			if ( x >= (YMIN + 0.27) ) {
				y = 2.0 - x;
				flg = 0;
			}
			// 1.2316 <= x < 1.7316
			else if ( x >= (YMIN - 0.27) ) {
				y = x - TC;
				flg = 1;
			}
			// 0.9 < x < 1.2316
			else {
				y = x - 1.0;
				flg = 2;
			}
		}
		switch ( flg ) { // eslint-disable-line default-case
		case 0:
			z = y * y;
			p1 = A1C + (z*polyvalA1( z ));
			p2 = z * (A2C + (z*polyvalA2( z )));
			p = (y*p1) + p2;
			r += ( p - (0.5*y) );
			break;
		case 1:
			z = y * y;
			w = z * y;
			p1 = T1C + (w*polyvalT1( w ));
			p2 = T2C + (w*polyvalT2( w ));
			p3 = T3C + (w*polyvalT3( w ));
			p = (z*p1) - (TT - (w*(p2+(y*p3))));
			r += ( TF + p );
			break;
		case 2:
			p1 = y * (UC + (y*polyvalU( y )));
			p2 = VC + (y*polyvalV( y ));
			r += (-0.5*y) + (p1/p2);
			break;
		}
	}
	// 2 <= x < 8
	else if ( x < 8.0 ) {
		flg = trunc( x );
		y = x - flg;
		p = y * (SC + (y*polyvalS( y )));
		q = RC + (y*polyvalR( y ));
		r = (0.5*y) + (p/q);
		z = 1.0; // gammaln(1+s) = ln(s) + gammaln(s)
		switch ( flg ) { // eslint-disable-line default-case
		case 7:
			z *= y + 6.0;
			/* falls through */
		case 6:
			z *= y + 5.0;
			/* falls through */
		case 5:
			z *= y + 4.0;
			/* falls through */
		case 4:
			z *= y + 3.0;
			/* falls through */
		case 3:
			z *= y + 2.0;
			r += ln( z );
		}
	}
	// 8 <= x < 2**58
	else if ( x < TWO58 ) {
		t = ln( x );
		z = 1.0 / x;
		y = z * z;
		w = WC + (z*polyvalW( y ));
		r = ((x-0.5)*(t-1.0)) + w;
	}
	// 2**58 <= x <= Inf
	else {
		r = x * ( ln(x)-1.0 );
	}
	if ( isNegative ) {
		r = nadj - r;
	}
	return r;
} // end FUNCTION gammaln()


// EXPORTS //

module.exports = gammaln;

},{"@stdlib/math/base/assert/is-infinite":129,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/abs":184,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/special/sinpi":270,"@stdlib/math/base/special/trunc":278,"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/constants/float64-pi":334,"@stdlib/math/constants/float64-pinf":335}],238:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of the gamma function.
*
* @module @stdlib/math/base/special/gammaln
*
* @example
* var gammaln = require( '@stdlib/math/base/special/gammaln' );
*
* var v = gammaln( 1.0 );
* // returns 0.0
*
* v = gammaln( 2.0 );
* // returns 0.0
*
* v = gammaln( 4.0 );
* // returns ~1.792
*
* v = gammaln( -0.5 );
* // returns ~1.266
*
* v = gammaln( 0.5 );
* // returns ~0.572
*
* v = gammaln( 0.0 );
* // returns Number.POSITIVE_INFINITY
*
* v = gammaln( NaN );
* // returns NaN
*/

// MODULES //

var gammaln = require( './gammaln.js' );


// EXPORTS //

module.exports = gammaln;

},{"./gammaln.js":237}],239:[function(require,module,exports){
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

},{"./ldexp.js":240}],240:[function(require,module,exports){
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
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
* @example
* var x = ldexp( Number.POSITIVE_INFINITY, 11 );
* // returns Number.POSITIVE_INFINITY
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

},{"@stdlib/math/base/assert/is-infinite":129,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/copysign":188,"@stdlib/math/base/utils/float64-exponent":293,"@stdlib/math/base/utils/float64-from-words":295,"@stdlib/math/base/utils/float64-normalize":303,"@stdlib/math/base/utils/float64-to-words":311,"@stdlib/math/constants/float64-exponent-bias":321,"@stdlib/math/constants/float64-max-base2-exponent":328,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":327,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":331,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],241:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm.
*
* @module @stdlib/math/base/special/ln
*
* @example
* var ln = require( '@stdlib/math/base/special/ln' );
*
* var v = ln( 4.0 );
* // returns ~1.386
*
* v = ln( 0.0 );
* // returns Number.NEGATIVE_INFINITY
*
* v = ln( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* v = ln( NaN );
* // returns NaN
*
* v = ln( -4.0 );
* // returns NaN
*/

// MODULES //

var ln = require( './ln.js' );


// EXPORTS //

module.exports = ln;

},{"./ln.js":242}],242:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_log.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01; // 3fe62e42 fee00000
var LN2_LO = 1.90821492927058770002e-10; // 3dea39ef 35793c76
var TWO54 = 1.80143985094819840000e+16; // 0x43500000, 0x00000000
var P = [
	3.999999999940941908e-01,  // 3FD99999 9997FA04
	2.222219843214978396e-01,  // 3FCC71C5 1D8E78AF
	1.531383769920937332e-01  // 3FC39A09 D078C69F
];
var Q = [
	6.666666666666735130e-01, // 3FE55555 55555593
	2.857142874366239149e-01, // 3FD24924 94229359
	1.818357216161805012e-01, // 3FC74664 96CB03DE
	1.479819860511658591e-01 // 3FC2F112 DF3E5244
];

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff;

// 0x7ff00000 = 2146435072 => 0 11111111111 00000000000000000000 => biased exponent: 2047 = 1023+1023 => 2^1023
var HIGH_MAX_NORMAL_EXP = 0x7ff00000;

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000;

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000;


// FUNCTIONS //

// Compile functions to evaluate polynomial functions based on the above coefficients...
var polyvalP = evalpoly( P );
var polyvalQ = evalpoly( Q );


// MAIN //

/**
* Evaluates the natural logarithm.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = ln( 4.0 );
* // returns ~1.386
* @example
* var v = ln( 0.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var v = ln( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = ln( NaN );
* // returns NaN
* @example
* var v = ln( -4.0 );
* // returns NaN
*/
function ln( x ) {
	var words;
	var hfsq;
	var hx;
	var k;
	var t2;
	var t1;
	var R;
	var f;
	var i;
	var j;
	var s;
	var w;
	var z;

	if ( x === 0.0 ) {
		return NINF;
	}
	if ( isnan( x ) || x < 0.0 ) {
		return NaN;
	}

	words = toWords( x );
	hx = words[ 0 ];

	k = 0;
	if ( hx < HIGH_MIN_NORMAL_EXP ) {
		// Case: 0 < x < 2**-1022
		k -= 54;
		// Subnormal number, scale up x:
		x *= TWO54;
		hx = getHighWord( x );
	}
	if ( hx >= HIGH_MAX_NORMAL_EXP ) {
		return x + x;
	}
	k += ( hx>>20 ) - BIAS;
	hx &= HIGH_SIGNIFICAND_MASK;
	i = (hx+0x95f64) & 0x100000;
	// Normalize x or x/2...
	x = setHighWord( x, hx|(i^HIGH_BIASED_EXP_0) );
	k += ( i>>20 );
	f = x - 1.0;
	if ( (HIGH_SIGNIFICAND_MASK&(2+hx)) < 3 ) {
		// Case: -2**-20 <= f < 2**-20
		if ( f === 0.0 ) {
			if ( k === 0.0 ) {
				return 0.0;
			}
			return (k * LN2_HI) + (k * LN2_LO);
		}
		R = f * f * ( 0.5 - (0.33333333333333333*f) );
		if ( k === 0.0 ) {
			return f - R;
		}
		return (k * LN2_HI) - ( (R-(k*LN2_LO)) - f );
	}
	s = f / (2.0 + f );
	z = s * s;
	i = hx - 0x6147a;
	w = z * z;
	j = 0x6b851 - hx;
	t1 = w * polyvalP( w );
	t2 = z * polyvalQ( w );
	i |= j;
	R = t2 + t1;
	if ( i > 0 ) {
		hfsq = 0.5 * f * f;
		if ( k === 0.0 ) {
			return f - ( hfsq - (s * (hfsq+R)) );
		}
		return (k * LN2_HI) - ( hfsq - ((s*(hfsq+R))+(k*LN2_LO)) - f );
	}
	if ( k === 0 ) {
		return f - ( s * ( f - R ) );
	}
	return (k * LN2_HI) - ( ( (s*(f-R)) - (k*LN2_LO) ) - f );
} // end FUNCTION ln()


// EXPORTS //

module.exports = ln;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-set-high-word":306,"@stdlib/math/base/utils/float64-to-words":311,"@stdlib/math/constants/float64-exponent-bias":321,"@stdlib/math/constants/float64-ninf":333}],243:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of \\(1+x\\).
*
* @module @stdlib/math/base/special/log1p
*
* @example
* var log1p = require( '@stdlib/math/base/special/log1p' );
*
* var v = log1p( 4.0 );
* // returns ~1.609
*
* v = log1p( -1.0 );
* // returns Number.NEGATIVE_INFINITY
*
* v = log1p( 0.0 );
* // returns 0.0
*
* v = log1p( -0.0 );
* // returns -0.0
*
* v = log1p( -2.0 );
* // returns NaN
*
* v = log1p( NaN );
* // returns NaN
*/

// MODULES //

var log1p = require( './log1p.js' );


// EXPORTS //

module.exports = log1p;

},{"./log1p.js":244}],244:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [netlib]{http://www.netlib.org/fdlibm/s_log1p.c}.
*
* The long comment and implementation follow the original, but have been reformatted and modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// VARIABLES //

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3fe62e42 0xfee00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3dea39ef 0x35793c76

// sqrt(2)-1:
var SQRT2M1 = 4.142135623730950488017e-01;  // 0x3fda8279 0x99fcef34

// sqrt(2)/2-1:
var SQRT2HALFM1 = -2.928932188134524755992e-01; // 0xbfd2bec3 0x33018866

// 2**-29:
var SMALL = 1.862645149230957e-09; // 0x3e200000 0x00000000

// 2**-54:
var TINY = 5.551115123125783e-17;

// Max integer (unsafe) => 2**53:
var TWO53 = 9007199254740992;

// 2/3:
var TWO_THIRDS = 6.666666666666666666e-01;

// Polynomial coefficients:
var Lp = [
	6.666666666666735130e-01, // 0x3FE55555 0x55555593
	3.999999999940941908e-01, // 0x3FD99999 0x9997FA04
	2.857142874366239149e-01, // 0x3FD24924 0x94229359
	2.222219843214978396e-01, // 0x3FCC71C5 0x1D8E78AF
	1.818357216161805012e-01, // 0x3FC74664 0x96CB03DE
	1.531383769920937332e-01, // 0x3FC39A09 0xD078C69F
	1.479819860511658591e-01, // 0x3FC2F112 0xDF3E5244
];


// FUNCTIONS //

var polyval = evalpoly.factory( Lp );


// MAIN //

/**
* Evaluates the natural logarithm of \\(1+x\\).
*
* #### Method
*
* 1. Argument Reduction: find \\(k\\) and \\(f\\) such that
*
*    ``` tex
*    1+x = 2^k (1+f)
*    ```
*
*    where
*
*    ``` tex
*    \frac{\sqrt{2}}{2} < 1+f < \sqrt{2}
*    ```
*
*    <!-- <note> -->
*    If \\(k=0\\), then \\(f=x\\) is exact. However, if \\(k \neq 0\\), then \\(f\\) may not be representable exactly. In that case, a correction term is needed. Let
*
*    ``` tex
*    u = \operatorname{round}(1+x)
*    ```
*
*    and
*
*    ``` tex
*    c = (1+x) - u
*    ```
*
*    then
*
*    ``` tex
*    \ln (1+x) - \ln u \approx \frac{c}{u}
*    ```
*
*    We can thus proceed to compute \\(\ln(u)\\), and add back the correction term \\(c/u\\).
*    <!-- </note> -->
*    <!-- <note> -->
*    When \\(x > 2^{53}\\), one can simply return \\(\ln(x)\\).
*    <!-- </note> -->
*
* 2. Approximation of \\(\operatorname{log1p}(f)\\). Let
*
*    ``` tex
*    s = \frac{f}{2+f}
*    ```
*
*    based on
*
*    ``` tex
*    \begin{align*}
*    \ln 1+f &= \ln (1+s) - \ln (1-s) \\
*            &= 2s + \frac{2}{3} s^3 + \frac{2}{5} s^5 + ... \\
*            &= 2s + sR \\
*    \end{align*}
*    ```
*
*     We use a special Reme algorithm on \\([0,0.1716]\\) to generate a polynomial of degree \\(14\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-58.45}\\). In other words,
*
*     ``` tex
*     R(z) \approx \mathrm{Lp}_1 s^2 + \mathrm{Lp}_2 s^4 + \mathrm{Lp}_3 s^6 + \mathrm{Lp}_4 s^8 + \mathrm{Lp}_5 s^{10} + \mathrm{Lp}_6 s^{12} + \mathrm{Lp}_7 s^{14}
*     ```
*
*     and
*
*     ``` tex
*     | \mathrm{Lp}_1 s^2 + \ldots + \mathrm{Lp}_7 s^14 - R(z) | \leq 2^{-58.45}
*     ```
*
*     <!-- <note> -->
*     The values of \\(Lp1\\) to \\(Lp7\\) may be found in the source.
*     <!-- </note> -->
*
*     Note that
*
*     ``` tex
*     \begin{align*}
*     2s &= f - sf \\
*        &= f - \frac{f^2}{2} + s \frac{f^2}{2} \\
*     \end{align*}
*     ```
*
*     In order to guarantee error in \\(\ln\\) below \\(1\ \mathrm{ulp}\\), we compute the log by
*
*     ``` tex
*     \operatorname{log1p}(f) = f - \biggl(\frac{f^2}{2} - s\biggl(\frac{f^2}{2}+R\biggr)\biggr)
*     ```
*
* 3. Finally,
*
*    ``` tex
*    \begin{align*}
*    \operatorname{log1p}(x) &= k \cdot \mathrm{ln2} + \operatorname{log1p}(f) \\
*    &= k \cdot \mathrm{ln2}_{hi}+\biggl(f-\biggl(\frac{f^2}{2}-\biggl(s\biggl(\frac{f^2}{2}+R\biggr)+k \cdot \mathrm{ln2}_{lo}\biggr)\biggr)\biggr) \\
*    \end{align*}
*    ```
*
*    Here \\(\mathrm{ln2}\\) is split into two floating point numbers:
*
*    ``` tex
*    \mathrm{ln2}_{hi} + \mathrm{ln2}_{lo}
*    ```
*
*    where \\(n \cdot \mathrm{ln2}_{hi}\\) is always exact for \\(|n| < 2000\\).
*
*
* #### Special Cases
*
* - \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* - \\(\operatorname{log1p}(+\infty) = +\infty\\)
* - \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* - \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
*
* #### Notes
*
* * According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
* * The hexadecimal values are the intended ones for the used constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
* * Assuming \\(\ln(x)\\) is accurate, the following algorithm can be used to evaluate \\(\operatorname{log1p}(x)\\) to within a few ULP:
*
*    ``` javascript
*    var u = 1.0 + x;
*    if ( u === 1.0 ) {
*      return x;
*    } else {
*      return ln(u) * (x/(u-1.0));
*    }
*    ```
*
*    See HP-15C Advanced Functions Handbook, p.193.
*
*
* @param {number} x - input value
* @returns {number} the natural logarithm of `1+x`
*
* @example
* var v = log1p( 4.0 );
* // returns ~1.609
* @example
* var v = log1p( -1.0 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var v = log1p( 0.0 );
* // returns 0.0
* @example
* var v = log1p( -0.0 );
* // returns -0.0
* @example
* var v = log1p( -2.0 );
* // returns NaN
* @example
* var v = log1p( NaN );
* // returns NaN
*/
function log1p( x ) {
	var hfsq;
	var hu;
	var y;
	var f;
	var c;
	var s;
	var z;
	var R;
	var u;
	var k;

	if ( x < -1.0 || isnan( x ) ) {
		return NaN;
	}
	if ( x === -1.0 ) {
		return NINF;
	}
	if ( x === PINF ) {
		return x;
	}
	if ( x === 0.0 ) {
		return x; // handle +-0 (IEEE 754-2008 spec)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		y = -x;
	} else {
		y = x;
	}
	// Argument reduction...
	k = 1;

	// Check if argument reduction is needed and if we can just return a small value approximation requiring less computation but with equivalent accuracy...
	if ( y < SQRT2M1 ) { // if |x| < sqrt(2)-1 => ~0.41422
		if ( y < SMALL ) { // if |x| < 2**-29
			if( y < TINY ) { // if |x| < 2**-54
				return x;
			}
			// Use a simple two-term Taylor series...
			return x - x*x*0.5;
		}
		// Check if `f=x` can be represented exactly (no need for correction terms), allowing us to bypass argument reduction...
		if ( x > SQRT2HALFM1 ) { // if x > sqrt(2)/2-1 => ~-0.2929
			// => -0.2929 < x < 0.41422
			k = 0;
			f = x; // exact
			hu = 1;
		}
	}
	// Address case where `f` cannot be represented exactly...
	if ( k !== 0 ) {
		if ( y < TWO53 ) {
			u = 1.0 + x;
			hu = highWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - BIAS;

			// Correction term...
			if ( k > 0 ) { // positive unbiased exponent
				c = 1.0 - (u-x);
			} else { // nonpositive unbiased exponent
				c = x - (u-1.0);
			}
			c /= u;
		} else {
			u = x;
			hu = highWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - BIAS;

			// Correction term is zero:
			c = 0;
		}
		// Apply a bit mask (0 00000000000 11111111111111111111) to remove the exponent:
		hu &= 0x000fffff; // max value => 1048575

		// Check if u significand is less than sqrt(2) significand => 0x6a09e => 01101010000010011110
		if ( hu < 434334 ) {
			// Normalize u by setting the exponent to 1023 (bias) => 0x3ff00000 => 0 01111111111 00000000000000000000
			u = setHighWord( u, hu|0x3ff00000 );
		} else {
			k += 1;

			// Normalize u/2 by setting the exponent to 1022 (bias-1 => 2**-1 = 1/2) => 0x3fe00000 => 0 01111111110 00000000000000000000
			u = setHighWord( u, hu|0x3fe00000 );

			// Subtract hu significand from next largest hu => 0 00000000001 00000000000000000000 => 0x00100000 => 1048576
			hu = (1048576-hu)>>2;
		}
		f = u - 1.0;
	}
	// Approximation of log1p(f)...
	hfsq = 0.5 * f * f;
	if( hu === 0 ) { // if |f| < 2**-20
		if ( f === 0.0 ) {
			c += k * LN2_LO;
			return k * LN2_HI + c;
		}
		R = hfsq * (1.0 - TWO_THIRDS*f); // avoid division
		return k*LN2_HI - ( (R - (k*LN2_LO + c)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;

	R = z * polyval( z );

	if ( k === 0 ) {
		return f - ( hfsq - s*(hfsq+R) );
	}
	return k*LN2_HI - ( (hfsq - (s*(hfsq+R) + (k*LN2_LO + c))) - f );
} // end FUNCTION log1p()


// EXPORTS //

module.exports = log1p;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-set-high-word":306,"@stdlib/math/constants/float64-exponent-bias":321,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],245:[function(require,module,exports){
'use strict';

/**
* Return the maximum value.
*
* @module @stdlib/math/base/special/max
*
* @example
* var max = require( '@stdlib/math/base/special/max' );
*
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* v = max( 3.14, NaN );
* // returns NaN
*
* v = max( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var max = require( './max.js' );


// EXPORTS //

module.exports = max;

},{"./max.js":246}],246:[function(require,module,exports){
'use strict';

// MODULES //

var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Returns the maximum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} maximum value
*
* @example
* var v = max( 3.14, 4.2 );
* // returns 4.2

* @example
* var v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* @example
* var v = max( 3.14, NaN );
* // returns NaN
*
* @example
* var v = max( +0.0, -0.0 );
* // returns +0.0
*/
function max( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === PINF || y === PINF ) {
			return PINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isPositiveZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x > y ) {
			return x;
		}
		return y;
	}
	m = NINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === PINF ) {
			return v;
		}
		if ( v > m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isPositiveZero( v )
		) {
			m = v;
		}
	}
	return m;
} // end FUNCTION max()


// EXPORTS //

module.exports = max;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/assert/is-positive-zero":139,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],247:[function(require,module,exports){
'use strict';

/**
* Return the minimum value.
*
* @module @stdlib/math/base/special/min
*
* @example
* var min = require( '@stdlib/math/base/special/min' );
*
* var v = min( 3.14, 4.2 );
* // returns 3.14
*
* v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* v = min( 3.14, NaN );
* // returns NaN
*
* v = min( +0.0, -0.0 );
* // returns -0.0
*/

// MODULES //

var min = require( './min.js' );


// EXPORTS //

module.exports = min;

},{"./min.js":248}],248:[function(require,module,exports){
'use strict';

// MODULES //

var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Returns the minimum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} minimum value
*
* @example
* var v = min( 3.14, 4.2 );
* // returns 3.14

* @example
* var v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* @example
* var v = min( 3.14, NaN );
* // returns NaN
*
* @example
* var v = min( +0.0, -0.0 );
* // returns -0.0
*/
function min( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === NINF || y === NINF ) {
			return NINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isNegativeZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x < y ) {
			return x;
		}
		return y;
	}
	m = PINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === NINF ) {
			return v;
		}
		if ( v < m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isNegativeZero( v )
		) {
			m = v;
		}
	}
	return m;
} // end FUNCTION min()


// EXPORTS //

module.exports = min;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/assert/is-negative-zero":135,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],249:[function(require,module,exports){
'use strict';

/**
* Decompose a double-precision floating-point number into integral and fractional parts.
*
* @module @stdlib/math/base/special/modf
*
* @example
* var modf = require( '@stdlib/math/base/special/modf' );
*
* var parts = modf( 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*/

// MODULES //

var modf = require( './modf.js' );


// EXPORTS //

module.exports = modf;

},{"./modf.js":250}],250:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var FLOAT64_EXPONENT_BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/math/constants/float64-high-word-exponent-mask' );
var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/math/constants/float64-high-word-significand-mask' );


// VARIABLES //

// 4294967295 => 0xffffffff => 11111111111111111111111111111111
var ALL_ONES = 4294967295;


// MAIN //

/**
* Decomposes a double-precision floating-point number into integral and fractional parts, each having the same type and sign as the input value.
*
* @param {number} x - input value
* @returns {NumberArray} array containing integral and fractional parts
*
* @example
* var parts = modf( 3.14 );
* // returns [ 3.0, 0.14000000000000012 ]
*/
function modf( x ) {
	var parts;
	var words;
	var high;
	var low;
	var exp;
	var i;

	// Special cases...
	if ( x < 1.0 ) {
		if ( x < 0.0 ) {
			parts = modf( -x );
			parts[ 0 ] *= -1.0;
			parts[ 1 ] *= -1.0;
			return parts;
		}
		if ( x === 0.0 ) {
			return [ x, x ]; // [ +-0, +-0 ]
		}
		return [ 0.0, x ];
	}
	if ( isnan( x ) ) {
		return [ NaN, NaN ];
	}
	if ( x === PINF ) {
		return [ PINF, 0.0 ];
	}
	// Decompose |x|...

	// Extract the high and low words:
	words = toWords( x );
	high = words[ 0 ];
	low = words[ 1 ];

	// Extract the unbiased exponent from the high word:
	exp = (high & FLOAT64_HIGH_WORD_EXPONENT_MASK) >> 20;
	exp -= FLOAT64_EXPONENT_BIAS;

	// Handle smaller values (x < 2**20 = 1048576)...
	if ( exp < 20 ) {
		i = FLOAT64_HIGH_WORD_SIGNIFICAND_MASK >> exp;

		// Determine if `x` is integral by checking for significand bits which cannot be exponentiated away...
		if ( ((high&i)|low) === 0 ) {
			return [ x, 0.0 ];
		}
		// Turn off all the bits which cannot be exponentiated away:
		high &= (~i);

		// Generate the integral part:
		i = fromWords( high, 0 );

		// The fractional part is whatever is leftover:
		return [ i, x-i ];
	}
	// Check if `x` can even have a fractional part...
	if ( exp > 51 ) {
		// `x` is integral:
		return [ x, 0.0 ];
	}
	i = ALL_ONES >>> (exp-20);

	// Determine if `x` is integral by checking for less significant significand bits which cannot be exponentiated away...
	if ( (low&i) === 0 ) {
		return [ x, 0.0 ];
	}
	// Turn off all the bits which cannot be exponentiated away:
	low &= (~i);

	// Generate the integral part:
	i = fromWords( high, low );

	// The fractional part is whatever is leftover:
	return [ i, x-i ];
} // end FUNCTION modf()


// EXPORTS //

module.exports = modf;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/utils/float64-from-words":295,"@stdlib/math/base/utils/float64-to-words":311,"@stdlib/math/constants/float64-exponent-bias":321,"@stdlib/math/constants/float64-high-word-exponent-mask":323,"@stdlib/math/constants/float64-high-word-significand-mask":324,"@stdlib/math/constants/float64-pinf":335}],251:[function(require,module,exports){
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

},{"./pow.js":254}],252:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-set-high-word":306,"@stdlib/math/base/utils/float64-set-low-word":308,"@stdlib/math/constants/float64-exponent-bias":321}],253:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/base/utils/float64-set-low-word":308}],254:[function(require,module,exports){
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
* @example
* var v = pow( 4.0, 0.5 );
* // returns 2.0
* @example
* var v = pow( 100.0, 0.0 );
* // returns 1.0
* @example
* var v = pow( Math.PI, 5.0 );
* // returns ~306.0197
* @example
* var v = pow( Math.PI, -0.2 );
* // returns ~0.7954
* @example
* var v = pow( NaN, 3.0 );
* // returns NaN
* @example
* var v = pow( 5.0, NaN );
* // returns NaN
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

},{"./log2ax.js":252,"./logx.js":253,"./pow2.js":255,"./x_is_zero.js":256,"./y_is_huge.js":257,"./y_is_infinite.js":258,"@stdlib/math/base/assert/is-infinite":129,"@stdlib/math/base/assert/is-integer":131,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/assert/is-odd":137,"@stdlib/math/base/special/abs":184,"@stdlib/math/base/special/sqrt":272,"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-get-low-word":301,"@stdlib/math/base/utils/float64-set-low-word":308,"@stdlib/math/base/utils/float64-to-words":311,"@stdlib/math/base/utils/uint32-to-int32":314,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],255:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":239,"@stdlib/math/base/tools/evalpoly":285,"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-set-high-word":306,"@stdlib/math/base/utils/float64-set-low-word":308,"@stdlib/math/base/utils/uint32-to-int32":314,"@stdlib/math/constants/float64-exponent-bias":321,"@stdlib/math/constants/float64-ln-two":326}],256:[function(require,module,exports){
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
* @example
* var v = pow( -0.0, -9 );
* // returns Number.NEGATIVE_INFINITY
* @example
* var v = pow( 0.0, -9 );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = pow( -0.0, 9 );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = pow( 0.0, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
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

},{"@stdlib/math/base/assert/is-odd":137,"@stdlib/math/base/special/copysign":188,"@stdlib/math/constants/float64-ninf":333,"@stdlib/math/constants/float64-pinf":335}],257:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":299}],258:[function(require,module,exports){
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
* @example
* var v = pow( -1.0, Number.NEGATIVE_INFINITY );
* // returns NaN
* @example
* var v = pow( 1.0, Number.POSITIVE_INFINITY );
* // returns 1.0
* @example
* var v = pow( 1.0, Number.NEGATIVE_INFINITY );
* // returns 1.0
* @example
* var v = pow( 0.5, Number.POSITIVE_INFINITY );
* // returns 0.0
* @example
* var v = pow( 0.5, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
* @example
* var v = pow( 1.5, Number.NEGATIVE_INFINITY );
* // returns 0.0
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

},{"@stdlib/math/base/special/abs":184,"@stdlib/math/constants/float64-pinf":335}],259:[function(require,module,exports){
'use strict';

/**
* Evaluate `bˣ - 1`.
*
* @module @stdlib/math/base/special/powm1
*
* @example
* var powm1 = require( '@stdlib/math/base/special/powm1' );
*
* var y = powm1( 2.0, 3.0 );
* // returns 7.0
*
* y = powm1( 4.0, 0.5 );
* // returns 1.0
*
* y = powm1( 0.0, 100.0 );
* // returns -1.0
*
* y = powm1( 100.0, 0.0 );
* // returns 0.0
*
* y = powm1( 0.0, 0.0 );
* // returns 0.0
*
* y = powm1( Math.PI, 5.0 );
* // returns ~305.0197
*
* y = powm1( NaN, 3.0 );
* // returns NaN
*
* y = powm1( 5.0, NaN );
* // returns NaN
*/

// MODULES //

var powm1 = require( './powm1.js' );


// EXPORTS //

module.exports = powm1;

},{"./powm1.js":260}],260:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/special_functions/powm1.hpp}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var ln = require( '@stdlib/math/base/special/ln' );
var pow = require( '@stdlib/math/base/special/pow' );
var trunc = require( '@stdlib/math/base/special/trunc' );


// MAIN //

/**
* Evaluates `bˣ - 1`.
*
* @param {number} b - base
* @param {number} x - exponent
* @returns {number} function value
*
* @example
* var y = powm1( 2.0, 3.0 );
* // returns 7.0
* @example
* var y = powm1( 4.0, 0.5 );
* // returns 1.0
* @example
* var y = powm1( 0.0, 100.0 );
* // returns -1.0
* @example
* var y = powm1( 100.0, 0.0 );
* // returns 0.0
* @example
* var y = powm1( 0.0, 0.0 );
* // returns 0.0
* @example
* var y = powm1( Math.PI, 5.0 );
* // returns ~305.0197
* @example
* var y = powm1( NaN, 3.0 );
* // returns NaN
* @example
* var y = powm1( 5.0, NaN );
* // returns NaN
*/
function powm1( b, x ) {
	var y;
	if (
		isnan( b ) ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		// Any number raised to zero (including 0) is always 1 => b^0 - 1 = 0
		return 0.0;
	}
	if ( b === 0.0 ) {
		// Zero raised to any number (except 0) is always zero => 0^x - 1 = -1
		return -1.0;
	}
	if ( b < 0.0 && x%2.0 === 0 ) {
		// If `x` is even, recognize that `(-b)**x == (b)**x`...
		b = -b;
	}
	if ( b > 0.0 ) {
		if (
			abs( x*(b-1.0) ) < 0.5 ||
			abs( x ) < 0.2
		) {
			// No good/quick approximation for ln(b)*x, so we have to evaluate...
			y = ln( b ) * x;
			if ( y < 0.5 ) {
				return expm1( y );
			}
		}
	} else if ( trunc( x ) !== x ) {
		// Exponentiation would yield a complex result...
		return NaN;
	}
	return pow( b, x ) - 1.0;
} // end FUNCTION powm1()


// EXPORTS //

module.exports = powm1;

},{"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/abs":184,"@stdlib/math/base/special/expm1":207,"@stdlib/math/base/special/ln":241,"@stdlib/math/base/special/pow":251,"@stdlib/math/base/special/trunc":278}],261:[function(require,module,exports){
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

},{"./round.js":262}],262:[function(require,module,exports){
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

},{}],263:[function(require,module,exports){
'use strict';

/**
* Compute the sine of a number.
*
* @module @stdlib/math/base/special/sin
*
* @example
* var sin = require( '@stdlib/math/base/special/sin' );
*
* var v = sin( 0.0 );
* // returns ~0.0
*
* v = sin( Math.PI/2.0 );
* // returns ~1.0
*
* v = sin( -Math.PI/6.0 );
* // returns ~-0.5
*
* v = sin( NaN );
* // returns NaN
*/

// MODULES //

var sin = require( './sin.js' );


// EXPORTS //

module.exports = sin;

},{"./sin.js":269}],264:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_cos.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// VARIABLES //

var C1 = 4.16666666666666019037e-02;  // 0x3FA55555, 0x5555554C
var C2 = -1.38888888888741095749e-03; // 0xBF56C16C, 0x16C15177
var C3 = 2.48015872894767294178e-05;  // 0x3EFA01A0, 0x19CB1590
var C4 = -2.75573143513906633035e-07; // 0xBE927E4F, 0x809C52AD
var C5 = 2.08757232129817482790e-09;  // 0x3E21EE9E, 0xBDB4B1C4
var C6 = -1.13596475577881948265e-11; // 0xBDA8FAE9, 0xBE8838D4


// MAIN //

/**
* Computes the cosine on \\( [-\pi/4, \pi/4] \\), where \\( \pi/4 \approx 0.785398164 \\).
*
* ## Method
*
* * Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive \\(x\\).
* * If \\( x < 2^{-27} \\), return \\(1\\) which is inexact if \\( x \ne 0 \\).
* * \\( cos(x) \\) is approximated by a polynomial of degree \\(14\\) on \\( [0,\pi/4] \\).
*
*   ``` tex
*   \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*   ```
*
*   where the Remez error is
*
*   ``` tex
*   \left| \cos(x) - \left( 1 - \frac{x^2}{2} + C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{15} \right) \right| \le 2^{-58}
*   ```
*
* * Let \\( C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{14} \\), then
*
*   ``` tex
*   \cos(x) \approx 1 - \frac{x \cdot x}{2} + r
*   ```
*
*   Since
*
*   ``` tex
*   \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y
*   ```

*   a correction term is necessary in \\( \cos(x) \\). Hence,
*
*   ``` tex
*   \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*   ```
*
*   For better accuracy, rearrange to
*
*   ``` tex
*   \cos(x+y) \approx w + \left( t + ( r - x \cdot y ) \right)
*   ```
*
*   where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( t \\) is a tiny correction term (\\( 1 - \frac{x \cdot x}{2} = w + t \\) exactly in infinite precision). The exactness of \\(w + t\\) in infinite precision depends on \\(w\\) and \\(t\\) having the same precision as \\(x\\).
*
*
* @private
* @param {number} x - input value (assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine (in radians)
*/
function kernelCos( x, y ) {
	var hz;
	var r;
	var w;
	var z;
	z = x * x;
	w = z * z;
	r = z * (C1 + (z * (C2 + (z*C3))));
	r += w * w * (C4 + (z * (C5 + (z*C6))));
	hz = 0.5 * z;
	w = 1.0 - hz;
	return w + ( ((1.0-w) - hz) + ((z*r) - (x*y)) );
} // end FUNCTION kernelCos()


// EXPORTS //

module.exports = kernelCos;

},{}],265:[function(require,module,exports){
/* eslint-disable no-plusplus */
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );


// VARIABLES //

// Initial value for `jk`:
var INIT_JK = [ 3, 4, 4, 6 ];

/*
* Table of constants for `2/pi` (`396` hex digits, `476` decimal).
*
* Integer array which contains the (24*i)-th to (24*i+23)-th bit of `2/pi` after binary point. The corresponding floating value is
*
* ``` text
* ipio2[i] * 2^(-24(i+1))
* ```
*
* This table must have at least `(e0-3)/24 + jk` terms. For quad precision (e0 <= 16360, jk = 6), this is `686`.
*/
var IPIO2 = [
	0xA2F983, 0x6E4E44, 0x1529FC, 0x2757D1, 0xF534DD, 0xC0DB62,
	0x95993C, 0x439041, 0xFE5163, 0xABDEBB, 0xC561B7, 0x246E3A,
	0x424DD2, 0xE00649, 0x2EEA09, 0xD1921C, 0xFE1DEB, 0x1CB129,
	0xA73EE8, 0x8235F5, 0x2EBB44, 0x84E99C, 0x7026B4, 0x5F7E41,
	0x3991D6, 0x398353, 0x39F49C, 0x845F8B, 0xBDF928, 0x3B1FF8,
	0x97FFDE, 0x05980F, 0xEF2F11, 0x8B5A0A, 0x6D1F6D, 0x367ECF,
	0x27CB09, 0xB74F46, 0x3F669E, 0x5FEA2D, 0x7527BA, 0xC7EBE5,
	0xF17B3D, 0x0739F7, 0x8A5292, 0xEA6BFB, 0x5FB11F, 0x8D5D08,
	0x560330, 0x46FC7B, 0x6BABF0, 0xCFBC20, 0x9AF436, 0x1DA9E3,
	0x91615E, 0xE61B08, 0x659985, 0x5F14A0, 0x68408D, 0xFFD880,
	0x4D7327, 0x310606, 0x1556CA, 0x73A8C9, 0x60E27B, 0xC08C6B
];

// Double precision array, obtained by cutting `pi/2` into `24` bits chunks...
var PIO2 = [
	1.57079625129699707031e+00, // 0x3FF921FB, 0x40000000
	7.54978941586159635335e-08, // 0x3E74442D, 0x00000000
	5.39030252995776476554e-15, // 0x3CF84698, 0x80000000
	3.28200341580791294123e-22, // 0x3B78CC51, 0x60000000
	1.27065575308067607349e-29, // 0x39F01B83, 0x80000000
	1.22933308981111328932e-36, // 0x387A2520, 0x40000000
	2.73370053816464559624e-44, // 0x36E38222, 0x80000000
	2.16741683877804819444e-51  // 0x3569F31D, 0x00000000
];
var TWO24 = 1.67772160000000000000e+07;  // 0x41700000, 0x00000000
var TWON24 = 5.96046447753906250000e-08; // 0x3E700000, 0x00000000

// Arrays for storing temporary values (note that, in C, this is not thread safe):
var F = zero( new Array( 20 ) );
var Q = zero( new Array( 20 ) );
var FQ = zero( new Array( 20 ) );
var IQ = zero( new Array( 20 ) );


// FUNCTIONS //

/**
* Zeros an array.
*
* @private
* @param {Array<number>} arr - array to zero
* @returns {Array<number>} input array
*/
function zero( arr ) {
	var len = arr.length;
	var i;
	for ( i = 0; i < len; i++ ) {
		arr[ i ] = 0.0;
	}
	return arr;
} // end FUNCTION zero()

/**
* Performs the computation for `kernelRemPio2()`.
*
* @private
* @param {PositiveNumber} x - input value
* @param {Array<number>} y - output result in an array of double precision numbers
* @param {integer} jz - number of terms of `ipio2[]` used
* @param {Array<integer>} q - array with integral values, representing the 24-bits chunk of the product of `x` and `2/pi`
* @param {integer} q0 - the corresponding exponent of `q[0]` (the exponent for `q[i]` would be `q0-24*i`)
* @param {integer} jk - `jk+1` is the initial number of terms of `IPIO2[]` needed in the computation
* @param {integer} jv - index for pointing to the suitable `ipio2[]` for the computation
* @param {integer} jx - `nx - 1`
* @param {Array<number>} f - `IPIO2[]` in floating point
* @param {PositiveInteger} prec - precision in bits (can be 24 (single), 53 (double), 64 (extended), 113 (quad))
* @returns {number} last three digits of `N`
*/
function compute( x, y, jz, q, q0, jk, jv, jx, f, prec ) {
	var carry;
	var fw;
	var ih;
	var jp;
	var i;
	var k;
	var n;
	var j;
	var z;

	// `jp+1` is the number of terms in `PIO2[]` needed:
	jp = jk;

	// Distill `q[]` into `IQ[]` in reverse order...
	z = q[ jz ];
	j = jz;
	for ( i = 0; j > 0; i++, j-- ) {
		fw = ( TWON24 * z )|0;
		IQ[ i ] = ( z - (TWO24*fw) )|0;
		z = q[ j-1 ] + fw;
	}
	// Compute `n`...
	z = ldexp( z, q0 );
	z -= 8.0 * floor( z*0.125 ); // trim off integer >= 8
	n = z|0;
	z -= n;
	ih = 0;
	if ( q0 > 0 ) {
		// Need `IQ[jz-1]` to determine `n`...
		i = ( IQ[ jz-1 ] >> (24-q0) );
		n += i;
		IQ[ jz-1 ] -= ( i << (24-q0) );
		ih = ( IQ[ jz-1 ] >> (23-q0) );
	}
	else if ( q0 === 0 ) {
		ih = ( IQ[ jz-1 ] >> 23 );
	}
	else if ( z >= 0.5 ) {
		ih = 2;
	}
	// Case: q > 0.5
	if ( ih > 0 ) {
		n += 1;
		carry = 0;

		// Compute `1-q`:
		for ( i = 0; i < jz; i++ ) {
			j = IQ[ i ];
			if ( carry === 0 ) {
				if ( j !== 0 ) {
					carry = 1;
					IQ[ i ] = 0x1000000 - j;
				}
			} else {
				IQ[ i ] = 0xffffff - j;
			}
		}
		if ( q0 > 0 ) {
			// Rare case: chance is 1 in 12...
			switch ( q0 ) {
			case 1:
				IQ[ jz-1 ] &= 0x7fffff;
				break;
			case 2:
				IQ[ jz-1 ] &= 0x3fffff;
				break;
			default:
				break;
			}
		}
		if ( ih === 2 ) {
			z = 1.0 - z;
			if ( carry !== 0 ) {
				z -= ldexp( 1.0, q0 );
			}
		}
	}
	// Check if re-computation is needed...
	if ( z === 0.0 ) {
		j = 0;
		for ( i = jz-1; i >= jk; i-- ) {
			j |= IQ[ i ];
		}
		if ( j === 0 ) {
			// Need re-computation...
			for ( k = 1; IQ[ jk-k ] === 0; k++ ) {
				// k = number of terms needed
			}
			for ( i = jz+1; i <= jz+k; i++ ) {
				// Add `q[jz+1]` to `q[jz+k]`...
				f[ jx+i ] = IPIO2[ jv+i ];
				fw = 0.0;
				for ( j = 0; j <= jx; j++ ) {
					fw += x[ j ] * f[ jx + (i-j) ];
				}
				q[ i ] = fw;
			}
			jz += k;
			return compute( x, y, jz, q, q0, jk, jv, jx, f, prec );
		}
	}
	// Chop off zero terms...
	if ( z === 0.0 ) {
		jz -= 1;
		q0 -= 24;
		while ( IQ[ jz ] === 0 ) {
			jz -= 1;
			q0 -= 24;
		}
	} else {
		// Break `z` into 24-bit if necessary...
		z = ldexp( z, -q0 );
		if ( z >= TWO24 ) {
			fw = (TWON24*z)|0;
			IQ[ jz ] = ( z - (TWO24*fw) )|0;
			jz += 1;
			q0 += 24;
			IQ[ jz ] = fw;
		} else {
			IQ[ jz ] = z|0;
		}
	}
	// Convert integer "bit" chunk to floating-point value...
	fw = ldexp( 1.0, q0 );
	for ( i = jz; i >= 0; i-- ) {
		q[ i ] = fw * IQ[i];
		fw *= TWON24;
	}
	// Compute `PIO2[0,...,jp]*q[jz,...,0]`...
	for ( i = jz; i >= 0; i-- ) {
		fw = 0.0;
		for ( k = 0; k <= jp && k <= jz-i; k++ ) {
			fw += PIO2[ k ] * q[ i+k ];
		}
		FQ[ jz-i ] = fw;
	}
	// Compress `FQ[]` into `y[]`...
	switch ( prec ) {
	case 0:
		fw = 0.0;
		for ( i = jz; i >= 0; i-- ) {
			fw += FQ[ i ];
		}
		if ( ih === 0 ) {
			y[ 0 ] = fw;
		} else {
			y[ 0 ] = -fw;
		}
		break;
	case 1:
	case 2:
		fw = 0.0;
		for ( i = jz; i >= 0; i-- ) {
			fw += FQ[ i ];
		}
		if ( ih === 0 ) {
			y[ 0 ] = fw;
		} else {
			y[ 0 ] = -fw;
		}
		fw = FQ[ 0 ] - fw;
		for ( i = 1; i <= jz; i++ ) {
			fw += FQ[i];
		}
		if ( ih === 0 ) {
			y[ 1 ] = fw;
		} else {
			y[ 1 ] = -fw;
		}
		break;
	case 3:
		for ( i = jz; i > 0; i-- ) {
			fw = FQ[ i-1 ] + FQ[ i ];
			FQ[ i ] += FQ[ i-1 ] - fw;
			FQ[ i-1 ] = fw;
		}
		for ( i = jz; i > 1; i-- ) {
			fw = FQ[ i-1 ] + FQ[ i ];
			FQ[ i ] += FQ[ i-1 ] - fw;
			FQ[ i-1 ] = fw;
		}
		fw = 0.0;
		for ( i = jz; i >= 2; i-- ) {
			fw += FQ[ i ];
		}
		if ( ih === 0 ) {
			y[ 0 ] = FQ[ 0 ];
			y[ 1 ] = FQ[ 1 ];
			y[ 2 ] = fw;
		} else {
			y[ 0 ] = -FQ[ 0 ];
			y[ 1 ] = -FQ[ 1 ];
			y[ 2 ] = -fw;
		}
		break;
	default:
		break;
	}
	return ( n & 7 );
} // end FUNCTION compute()


// MAIN //

/**
* Return the last three digits of `N` with `y = x - N*pi/2` so that `|y| < pi/2`.
*
* ## Method
*
* The method is to compute the integer (mod 8) and fraction parts of `(2/pi)*x` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals 0 mod 8 ). Thus, the number of operations are independent of the exponent of the input.
*
* @private
* @param {PositiveNumber} x - input value
* @param {Array<number>} y - output result in an array of double precision numbers
* @param {PositiveInteger} e0 - the exponent of `x[0]` (must be <= 16360)
* @param {PositiveInteger} nx - dimension of `x[]`
* @param {PositiveInteger} prec - precision in bits (can be 24 (single), 53 (double), 64 (extended), 113 (quad))
* @returns {number} last three digits of `N`
*/
function kernelRemPio2( x, y, e0, nx, prec ) {
	var fw;
	var jk;
	var jv;
	var jx;
	var jz;
	var q0;
	var i;
	var j;
	var m;

	// Initialize `jk`:
	jk = INIT_JK[ prec ];

	// Determine `jx`, `jv`, `q0` (note that `q0 < 3`):
	jx = nx - 1;
	jv = ( (e0 - 3) / 24 )|0;
	if ( jv < 0 ) {
		jv = 0;
	}
	q0 = e0 - (24 * (jv + 1));

	// Set up `F[0]` to `F[jx+jk]` where `F[jx+jk] = IPIO2[jv+jk]`:
	j = jv - jx;
	m = jx + jk;
	for ( i = 0; i <= m; i++, j++ ) {
		if ( j < 0 ) {
			F[ i ] = 0.0;
		} else {
			F[ i ] = IPIO2[ j ];
		}
	}
	// Compute `Q[0],Q[1],...,Q[jk]`:
	for ( i = 0; i <= jk; i++ ) {
		fw = 0.0;
		for ( j = 0; j <= jx; j++ ) {
			fw += x[ j ] * F[ jx + (i-j) ];
		}
		Q[ i ] = fw;
	}
	jz = jk;
	return compute( x, y, jz, Q, q0, jk, jv, jx, F, prec );
} // end FUNCTION kernelRemPio2()


// EXPORTS //

module.exports = kernelRemPio2;

},{"@stdlib/math/base/special/floor":209,"@stdlib/math/base/special/ldexp":239}],266:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_sin.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// VARIABLES //

var S1 = -1.66666666666666324348e-01; // 0xBFC55555, 0x55555549
var S2 = 8.33333333332248946124e-03;  // 0x3F811111, 0x1110F8A6
var S3 = -1.98412698298579493134e-04; // 0xBF2A01A0, 0x19C161D5
var S4 = 2.75573137070700676789e-06;  // 0x3EC71DE3, 0x57B1FE7D
var S5 = -2.50507602534068634195e-08; // 0xBE5AE5E6, 0x8A2B9CEB
var S6 = 1.58969099521155010221e-10;  // 0x3DE5D93A, 0x5ACFD57C


// MAIN //

/**
* Computes the sine on \\( \approx [-\pi/4, \pi/4] \\) (except on \\(-0\\)), where \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* * Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive \\(x\\).
* * Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\(-0\\). Callers may do the optimization \\( \sin(x) \approx x \\) for tiny \\(x\\).
* * \\( \sin(x) \\) is approximated by a polynomial of degree \\(13\\) on \\( \left[0,\tfrac{pi}{4}\right] \\)
*
*   ``` tex
*   \sin(x) \approx x + S_1 \cdot x^3 + \ldots + S_6 \cdot x^{13}
*   ```
*
*   where
*
*   ``` tex
*   \left| \frac{\sin(x)}{x} \left( 1 + S_1 \cdot x + S_2 \cdot x + S_3 \cdot x + S_4 \cdot x + S_5 \cdot x + S_6 \cdot x \right) \right| \le 2^{-58}
*   ```
*
* * We have
*
*   ``` tex
*   \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y
*   ```
*
*   For better accuracy, let
*
*   ``` tex
*   r = x^3 * \left( S_2 + x^2 \cdot \left( S_3 + x^2 * \left( S_4 + x^2 \cdot ( S_5+x^2 \cdot S_6 ) \right) \right) \right)
*   ```
*
*   then
*
*   ``` tex
*   \sin(x) = x + \left( S_1 \cdot x + ( x \cdot (r-y/2) + y ) \right)
*   ```
*
*
* @private
* @param {number} x - input value (assumed to be bounded by `~pi/4` in magnitude)
* @param {number} y - tail of `x`
* @param {number} iy - indicates whether `y` is `0` (if `iy = 0`, `y` assumed to be `0`)
* @returns {number} sine (in radians)
*/
function kernelSin( x, y, iy ) {
	var r;
	var v;
	var w;
	var z;
	z = x * x;
	w = z * z;
	r = S2 + (z * (S3 + (z*S4))) + (z * w * (S5 + (z*S6)));
	v = z * x;
	if ( iy === 0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
} // end FUNCTION kernelSin()


// EXPORTS //

module.exports = kernelSin;

},{}],267:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*
* Optimized by Bruce D. Evans.
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
var remPio2Kernel = require( './kernel_rem_pio2.js' );
var remPio2Medium = require( './rem_pio2_medium.js' );


// VARIABLES //

var ZERO = 0.00000000000000000000e+00;    // 0x00000000, 0x00000000
var TWO24 = 1.67772160000000000000e+07;   // 0x41700000, 0x00000000

// 33 bits of PI/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = PI/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331
var TWO_PIO2_1T = 2.0 * PIO2_1T;
var THREE_PIO2_1T = 3.0 * PIO2_1T;
var FOUR_PIO2_1T = 4.0 * PIO2_1T;

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff;

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000;

// High word significand mask: 0xfffff = 1048575 => 00000000000011111111111111111111
var SIGNIFICAND_MASK = 0xfffff;

// High word significand for PI and PI/2: 0x921fb = 598523 => 00000000000010010010000111111011
var PI_HIGH_WORD_SIGNIFICAND = 0x921fb;

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb;

// High word for 3*PI/4: 0x4002d97c = 1073928572 => 01000000000000101101100101111100
var THREE_PIO4_HIGH_WORD = 0x4002d97c;

// High word for 5*PI/4: 0x400f6a7a = 1074752122 => 01000000000011110110101001111010
var FIVE_PIO4_HIGH_WORD = 0x400f6a7a;

// High word for 6*PI/4: 0x4012d97c = 1074977148 => 01000000000100101101100101111100
var THREE_PIO2_HIGH_WORD = 0x4012d97c;

// High word for 7*PI/4: 0x4015fdbc = 1075183036 => 01000000000101011111110110111100
var SEVEN_PIO4_HIGH_WORD = 0x4015fdbc;

// High word for 8*PI/4: 0x401921fb = 1075388923 => 01000000000110010010000111111011
var TWO_PI_HIGH_WORD = 0x401921fb;

// High word for 9*PI/4: 0x401c463b = 1075594811 => 01000000000111000100011000111011
var NINE_PIO4_HIGH_WORD = 0x401c463b;

// 2^20*pi/2 = 1647099.3291652855 => 0100000100111001001000011111101101010100010001000010110100011000 => high word => 0x413921fb = 1094263291 => 01000001001110010010000111111011
var MEDIUM = 0x413921fb;

// Arrays for storing temporary values (note that, in C, this would not be thread-safe):
var TX = new Array( 3 );
var TY = new Array( 2 );


// MAIN //

/**
* Computes `x - n*pi/2 = r`.
*
* ## Notes
*
* * Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
*
*
* @private
* @param {number} x - input value
* @param {Array<number>} y - remainder elements
* @returns {integer} factor of `pi/2`
*/
function remPio2( x, y ) {
	var low;
	var e0;
	var hx;
	var ix;
	var nx;
	var i;
	var n;
	var z;

	hx = getHighWord( x );
	ix = hx & ABS_MASK;

	// Case: |x| ~<= pi/4 (no need for reduction)
	if ( ix <= PIO4_HIGH_WORD ) {
		y[ 0 ] = x;
		y[ 1 ] = 0.0;
		return 0;
	}
	// Case: |x| ~<= 5pi/4
	if ( ix <= FIVE_PIO4_HIGH_WORD ) {
		// Case: |x| ~= pi/2 or pi
		if ( (ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND ) {
			// Cancellation => use medium case
			return remPio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3pi/4
		if ( ix <= THREE_PIO4_HIGH_WORD ) {
			if ( x > 0.0 ) {
				z = x - PIO2_1;
				y[ 0 ] = z - PIO2_1T;
				y[ 1 ] = (z - y[0]) - PIO2_1T;
				return 1;
			}
			z = x + PIO2_1;
			y[ 0 ] = z + PIO2_1T;
			y[ 1 ] = (z - y[0]) + PIO2_1T;
			return -1;
		}
		if ( x > 0.0 ) {
			z = x - ( 2.0*PIO2_1 );
			y[ 0 ] = z - TWO_PIO2_1T;
			y[ 1 ] = (z - y[0]) - TWO_PIO2_1T;
			return 2;
		}
		z = x + ( 2.0*PIO2_1 );
		y[ 0 ] = z + TWO_PIO2_1T;
		y[ 1 ] = (z - y[0]) + TWO_PIO2_1T;
		return -2;
	}
	// Case: |x| ~<= 9pi/4
	if ( ix <= NINE_PIO4_HIGH_WORD ) {
		// Case: |x| ~<= 7pi/4
		if ( ix <= SEVEN_PIO4_HIGH_WORD ) {
			// Case: |x| ~= 3pi/2
			if ( ix === THREE_PIO2_HIGH_WORD ) {
				return remPio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - ( 3.0*PIO2_1 );
				y[ 0 ] = z - THREE_PIO2_1T;
				y[ 1 ] = (z - y[0]) - THREE_PIO2_1T;
				return 3;
			}
			z = x + ( 3.0*PIO2_1 );
			y[ 0 ] = z + THREE_PIO2_1T;
			y[ 1 ] = (z - y[0]) + THREE_PIO2_1T;
			return -3;
		}
		// Case: |x| ~= 4pi/2
		if ( ix === TWO_PI_HIGH_WORD ) {
			return remPio2Medium( x, ix, y );
		}
		if ( x > 0.0 ) {
			z = x - ( 4.0*PIO2_1 );
			y[ 0 ] = z - FOUR_PIO2_1T;
			y[ 1 ] = (z - y[0]) - FOUR_PIO2_1T;
			return 4;
		}
		z = x + ( 4.0*PIO2_1 );
		y[ 0 ] = z + FOUR_PIO2_1T;
		y[ 1 ] = (z - y[0]) + FOUR_PIO2_1T;
		return -4;
	}
	// Case: |x| ~< 2^20*pi/2 (medium size)
	if ( ix < MEDIUM ) {
		return remPio2Medium( x, ix, y );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		y[ 0 ] = NaN;
		y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|, ilogb(x)-23)...
	low = getLowWord( x );
	e0 = (ix >> 20) - 1046; // e0 = ilogb(z) - 23 => unbiased exponent minus 23
	z = fromWords( ix - ((e0 << 20)|0), low );
	for ( i = 0; i < 2; i++ ) {
		TX[ i ] = z|0;
		z = (z - TX[i]) * TWO24;
	}
	TX[ 2 ] = z;
	nx = 3;
	while ( TX[ nx-1 ] === ZERO ) {
		// Skip zero term...
		nx -= 1;
	}
	n = remPio2Kernel( TX, TY, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -TY[ 0 ];
		y[ 1 ] = -TY[ 1 ];
		return -n;
	}
	y[ 0 ] = TY[ 0 ];
	y[ 1 ] = TY[ 1 ];
	return n;
} // end FUNCTION remPio2()


// EXPORTS //

module.exports = remPio2;

},{"./kernel_rem_pio2.js":265,"./rem_pio2_medium.js":268,"@stdlib/math/base/utils/float64-from-words":295,"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-get-low-word":301}],268:[function(require,module,exports){
'use strict';

/*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var round = require( '@stdlib/math/base/special/round' );
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );


// VARIABLES //

// 53 bits of 2/PI:
var INVPIO2 = 6.36619772367581382433e-01; // 0x3FE45F30, 0x6DC9C883

// First 33 bits of PI/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = PI/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331

// Another 33 bits of PI/2:
var PIO2_2 = 6.07710050630396597660e-11;  // 0x3DD0B461, 0x1A600000

// PIO2_2T = PI/2 - ( PIO2_1 + PIO2_2 ):
var PIO2_2T = 2.02226624879595063154e-21; // 0x3BA3198A, 0x2E037073

// Another 33 bits of PI/2:
var PIO2_3 = 2.02226624871116645580e-21;  // 0x3BA3198A, 0x2E000000

// PIO2_3T = PI/2 - ( PIO2_1 + PIO2_2 + PIO2_3 ):
var PIO2_3T = 8.47842766036889956997e-32; // 0x397B839A, 0x252049C1

// Exponent mask (2047 => 0x7ff):
var EXPONENT_MASK = 0x7ff;


// MAIN //

/**
* Computes `x - n*pi/2 = r` for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {uint32} ix - high word of `x`
* @param {Array<number>} y - remainder elements
* @returns {integer} factor of `pi/2`
*/
function remPio2( x, ix, y ) {
	var high;
	var n;
	var t;
	var r;
	var w;
	var i;
	var j;

	n = round( x * INVPIO2 );
	r = x - ( n * PIO2_1 );
	w = n * PIO2_1T;

	// First rounding (good to 85 bits)...
	j = ix >> 20;
	y[ 0 ] = r - w;
	high = getHighWord( y[0] );
	i = j - ( (high >> 20) & EXPONENT_MASK );

	// Check if a second iteration is needed (good to 118 bits)...
	if ( i > 16 ) {
		t = r;
		w = n * PIO2_2;
		r = t - w;
		w = (n * PIO2_2T) - ((t-r) - w);
		y[ 0 ] = r - w;
		high = getHighWord( y[0] );
		i = j - ( (high >> 20) & EXPONENT_MASK );

		// Check if a third iteration is needed (151 bits accumulated)...
		if ( i > 49 ) {
			t = r;
			w = n * PIO2_3;
			r = t - w;
			w = (n * PIO2_3T) - ((t-r) - w);
			y[ 0 ] = r - w;
		}
	}
	y[ 1 ] = (r - y[0]) - w;
	return n;
} // end FUNCTION remPio2()


// EXPORTS //

module.exports = remPio2;

},{"@stdlib/math/base/special/round":261,"@stdlib/math/base/utils/float64-get-high-word":299}],269:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_sin.c?view=log}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var kernelCos = require( './kernel_cos.js' );
var kernelSin = require( './kernel_sin.js' );
var remPio2 = require( './rem_pio2.js' );


// VARIABLES //

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff;

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000;

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb;

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000;

// Array for storing remainder elements:
var Y = [ 0.0, 0.0 ];


// MAIN //

/**
* Computes the sine of a number.
*
* #### Method
*
* * Let `S`, `C`, and `T` denote the `sin`, `cos` and `tan`, respectively, on `[-PI/4, +PI/4]`.
* * Reduce the argument `x` to `y1+y2 = x-k*pi/2` in `[-pi/4 , +pi/4]`, and let `n = k mod 4`. We have
*
* | n   |  sin(x)  |  cos(x)  |  tan(x)  |
* | --- |----------|----------|----------|
* |  0  |     S    |     C    |    T     |
* |  1  |     C    |    -S    |   -1/T   |
* |  2  |    -S    |    -C    |    T     |
* |  3  |    -C    |     S    |   -1/T   |
*
*
* @param {number} x - input value
* @returns {number} sine (in radians)
*
* @example
* var v = sin( 0.0 );
* // returns ~0.0
*
* @example
* var v = sin( Math.PI/2.0 );
* // returns ~1.0
*
* @example
* var v = sin( -Math.PI/6.0 );
* // returns ~-0.5
*
* @example
* var v = sin( NaN );
* // returns NaN
*/
function sin( x ) {
	var ix;
	var n;
	var z;

	z = 0.0;
	ix = getHighWord( x );

	// Case: |x| ~< pi/4
	ix &= ABS_MASK;
	if ( ix <= PIO4_HIGH_WORD ) {
		// Case: |x| ~< 2^-26
		if ( ix < SMALL_HIGH_WORD ) {
			return x;
		}
		return kernelSin( x, z, 0 );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction...
	n = remPio2( x, Y );
	switch ( n & 3 ) {
	case 0:
		return kernelSin( Y[0], Y[1], 1 );
	case 1:
		return kernelCos( Y[0], Y[1] );
	case 2:
		return -kernelSin( Y[0], Y[1], 1 );
	default:
		return -kernelCos( Y[0], Y[1] );
	}
} // end FUNCTION sin()


// EXPORTS //

module.exports = sin;

},{"./kernel_cos.js":264,"./kernel_sin.js":266,"./rem_pio2.js":267,"@stdlib/math/base/utils/float64-get-high-word":299}],270:[function(require,module,exports){
'use strict';

/**
* Compute the value of `sin(πx)`.
*
* @module @stdlib/math/base/special/sinpi
*
* @example
* var sinpi = require( '@stdlib/math/base/special/sinpi' );
*
* var y = sinpi( 0.0 );
* // returns 0.0
*
* y = sinpi( 0.5 );
* // returns 1.0
*
* y = sinpi( 0.9 );
* // returns ~0.309
*
* y = sinpi( NaN );
* // returns NaN
*/

// MODULES //

var sinpi = require( './sinpi.js' );


// EXPORTS //

module.exports = sinpi;

},{"./sinpi.js":271}],271:[function(require,module,exports){
'use strict';

/*
* Notes:
*	=> sin(-x) = -sin(x)
*	=> sin(+n) = +0, where `n` is a positive integer
*	=> sin(-n) = -sin(+n) = -0, where `n` is a positive integer
*	=> cos(-x) = cos(x)
*/


// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var cos = require( '@stdlib/math/base/special/cos' );
var sin = require( '@stdlib/math/base/special/sin' );
var abs = require( '@stdlib/math/base/special/abs' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var PI = require( '@stdlib/math/constants/float64-pi' );


// MAIN //

/**
* Computes the value of `sin(πx)`.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = sinpi( 0.0 );
* // returns 0.0
* @example
* var y = sinpi( 0.5 );
* // returns 1.0
* @example
* var y = sinpi( 0.9 );
* // returns ~0.309
* @example
* var y = sinpi( NaN );
* // returns NaN
*/
function sinpi( x ) {
	var ar;
	var r;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInfinite( x ) ) {
		return NaN;
	}
	// Argument reduction (reduce to [0,2))...
	r = x % 2.0; // sign preserving
	ar = abs( r );

	// If `x` is an integer, the mod is an integer...
	if ( ar === 0.0 || ar === 1.0 ) {
		return copysign( 0.0, r );
	}
	if ( ar < 0.25 ) {
		return sin( PI*r );
	}
	// In each of the following, we further reduce to [-π/4,π/4)...
	if ( ar < 0.75 ) {
		ar = 0.5 - ar;
		return copysign( cos( PI*ar ), r );
	}
	if ( ar < 1.25 ) {
		r = copysign( 1.0, r ) - r;
		return sin( PI*r );
	}
	if ( ar < 1.75 ) {
		ar = ar - 1.5;
		return -copysign( cos( PI*ar ), r );
	}
	r = r - copysign( 2.0, r );
	return sin( PI*r );
} // end FUNCTION sinpi()


// EXPORTS //

module.exports = sinpi;

},{"@stdlib/math/base/assert/is-infinite":129,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/abs":184,"@stdlib/math/base/special/copysign":188,"@stdlib/math/base/special/cos":191,"@stdlib/math/base/special/sin":263,"@stdlib/math/constants/float64-pi":334}],272:[function(require,module,exports){
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

},{}],273:[function(require,module,exports){
'use strict';

/**
* Evaluate the tangent of a number.
*
* @module @stdlib/math/base/special/tan
*
* @example
* var v = tan( 0.0 );
* // returns ~0.0
*
* v = tan( -Math.PI/4.0 );
* // returns ~-1.0
*
* v = tan( Math.PI/4.0 );
* // returns ~1.0
*
* v = tan( NaN );
* // returns NaN
*/

// MODULES //

var tan = require( './tan.js' );


// EXPORTS //

module.exports = tan;

},{"./tan.js":276}],274:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*
* Optimized by Bruce D. Evans.
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
var round = require( '@stdlib/math/base/special/round' );
var remPio2Kernel = require( './rem_pio2_kernel.js' );


// VARIABLES //

var ZERO =  0.00000000000000000000e+00; /* 0x00000000, 0x00000000 */
var TWO24 =  1.67772160000000000000e+07; /* 0x41700000, 0x00000000 */

// 53 bits of 2/PI
var INVPIO2 =  6.36619772367581382433e-01; /* 0x3FE45F30, 0x6DC9C883 */

// First 33 bit of PI/2
var PIO2_1  =  1.57079632673412561417e+00; /* 0x3FF921FB, 0x54400000 */

// PIO2_1T = PI/2 - PIO2_1
var PIO2_1T =  6.07710050650619224932e-11; /* 0x3DD0B461, 0x1A626331 */

// Second 33 bit of PI/2
var PIO2_2  =  6.07710050630396597660e-11; /* 0x3DD0B461, 0x1A600000 */

// PIO2_2T = PI/2 - ( PIO2_1 + PIO2_2 )
var PIO2_2T =  2.02226624879595063154e-21; /* 0x3BA3198A, 0x2E037073 */

// Third 33 bit of PI/2
var PIO2_3  =  2.02226624871116645580e-21; /* 0x3BA3198A, 0x2E000000 */

// PIO2_3T = PI/2 - ( PIO2_1 + PIO2_2 + PIO2_3 )
var PIO2_3T =  8.47842766036889956997e-32; /* 0x397B839A, 0x252049C1 */


// MAIN //

/**
* Compute x - n*pi/2 = r. Returns n and stores the remainder `r`
* as two numbers y[0] and y[1] such that y[0]+y[1] = r.
*
* @private
* @param {number} x - input value
* @param {Array} y - remainder elements
* @returns {integer} n - factor of pi/2
*/
function remPio2( x, y ) {
	var low;
	var e0;
	var hx;
	var ix;
	var nx;
	var tx;
	var ty;
	var i;
	var n;
	var z;

	tx = new Array( 3 );
	ty = new Array( 2 );

	hx = getHighWord( x );
	ix = hx & 0x7fffffff;

	// Case: |x| ~<= pi/4 , no need for reduction
	if ( ix <= 0x3fe921fb ) {
		y[ 0 ] = x;
		y[ 1 ] = 0.0;
		return 0;
	}

	// Case: |x| ~<= 5pi/4
	if ( ix <= 0x400f6a7a ) {
		// Case: |x| ~= pi/2 or 2pi/2
		if ( (ix & 0xfffff) === 0x921fb ) {
			// Cancellation => use medium case
			return remPio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3pi/4
		if ( ix <= 0x4002d97c ) {
			if ( x > 0.0 ) {
				z = x - PIO2_1;
				y[ 0 ] = z - PIO2_1T;
				y[ 1 ] = ( z - y[0] ) - PIO2_1T;
				return 1;
			} else {
				z = x + PIO2_1;
				y[ 0 ] = z + PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + PIO2_1T;
				return -1;
			}
		}
		else {
			if ( x > 0.0 ) {
				z = x - 2 * PIO2_1;
				y[ 0 ] = z - 2 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) -2 * PIO2_1T;
				return 2;
			} else {
				z = x + 2 * PIO2_1;
				y[ 0 ] = z + 2 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + 2 * PIO2_1T;
				return -2;
			}
		}
	}
	// Case: |x| ~<= 9pi/4
	if ( ix <= 0x401c463b ) {
		// Case: |x| ~<= 7pi/4
		if ( ix <= 0x4015fdbc ) {
			// Case: |x| ~= 3pi/2
			if ( ix === 0x4012d97c ) {
				return remPio2Medium( x, ix, y );
			}
			if ( x > 0 ) {
				z = x - 3 * PIO2_1;
				y[ 0 ] = z - 3 * PIO2_1T;
				y[ 1 ] = (z-y[0]) - 3 * PIO2_1T;
				return 3;
			} else {
				z = x + 3 * PIO2_1;
				y[ 0 ] = z + 3 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + 3 * PIO2_1T;
				return -3;
			}
		} else {
			if ( ix === 0x401921fb ) {
				// Case: |x| ~= 4pi/2
				return remPio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - 4.0 * PIO2_1;
				y[ 0 ] = z - 4.0 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) - 4.0 * PIO2_1T;
				return 4;
			} else {
				z = x + 4.0 * PIO2_1;
				y[ 0 ] = z + 4.0 * PIO2_1T;
				y[ 1 ] = ( z - y[0] ) + 4.0 * PIO2_1T;
				return -4;
			}
		}
	}
	// Case: |x| ~< 2^20*(pi/2), medium size
	if ( ix < 0x413921fb ) {
		return remPio2Medium( x, ix, y );
	}
	// All other (large) arguments...
	// Case: x is inf or NaN */
	if ( ix >= 0x7ff00000 ) {
		y[ 0 ] = y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|,ilogb(x)-23)...
	low = getLowWord( x );
	// e0 = ilogb(z)-23:
	e0 = ( ix >> 20 ) - 1046;
	z = fromWords( ix - ((e0<<20)|0), low );
	for ( i = 0; i < 2; i++ ) {
		tx[ i ] = z|0;
		z = ( z - tx[i] ) * TWO24;
	}
	tx[ 2 ] = z;
	nx = 3;
	while ( tx[ nx-1 ] === ZERO ) {
		// Skip zero term...
		nx--;
	}
	n = remPio2Kernel( tx, ty, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -ty[ 0 ];
		y[ 1 ] = -ty[ 1 ];
		return -n;
	}
	y[ 0 ] = ty[ 0 ];
	y[ 1 ] = ty[ 1 ];
	return n;
} // end FUNCTION remPio2()


/**
* Compute x - n*pi/2 = r for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {int32} ix - higher word
* @param {Array} y - remainder elements
* @returns {integer} n - factor of pi/2
*/
function remPio2Medium( x, ix, y ) {
	var high;
	var n;
	var t;
	var r;
	var w;
	var i;
	var j;

	n = round( x * INVPIO2 );
	r = x - n * PIO2_1;
	w = n * PIO2_1T;
	// 1st round good to 85 bit...
	j = ix >> 20;
	y[ 0 ] = r - w;
	high = getHighWord( y[0] );
	i = j - ( (high>>20) & 0x7ff );
	if ( i > 16 ) {
		// 2nd iteration needed, good to 118...
		t  = r;
		w  = n * PIO2_2;
		r  = t - w;
		w  = n * PIO2_2T - ( (t-r) - w );
		y[ 0 ] = r - w;
		high = getHighWord( y[0] );
		i = j - ( (high>>20) & 0x7ff );
		if ( i > 49 )  {
			// 3rd iteration need, 151 bits acc
			t  = r;
			w  = n * PIO2_3;
			r  = t - w;
			w  = n * PIO2_3T - ( (t-r) - w );
			y[ 0 ] = r - w;
		}
	}
	y[ 1 ] = ( r - y[0] ) - w;
	return n;
} // end FUNCTION remPio2Medium()


// EXPORTS //

module.exports = remPio2;

},{"./rem_pio2_kernel.js":275,"@stdlib/math/base/special/round":261,"@stdlib/math/base/utils/float64-from-words":295,"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-get-low-word":301}],275:[function(require,module,exports){
arguments[4][193][0].apply(exports,arguments)
},{"@stdlib/math/base/special/floor":209,"@stdlib/math/base/special/ldexp":239,"dup":193}],276:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_tan.c?view=log}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var tanKernel = require( './tan_kernel.js' );
var remPio2 = require( './rem_pio2.js' );


// MAIN //

/**
* Evaluates the tangent of a number.
*
* #### Method
*
* Let S,C and T denote the sin, cos and tan respectively on [-PI/4, +PI/4]. Reduce the argument x to y1+y2 = x-k*pi/2 in [-pi/4 , +pi/4], and let n = k mod 4. We have
*
* | n   |  sin(x)  |  cos(x)  |  tan(x)  |
* | --- |----------|----------|----------|
* |  0  |     S    |     C    |    T     |
* |  1  |     C    |    -S    |   -1/T   |
* |  2  |    -S    |    -C    |    T     |
* |  3  |    -C    |     S    |   -1/T   |
*
* @param {number} x - input value
* @returns {number} tangent (in radians)
*
* @example
* var v = tan( 0.0 );
* // returns ~0.0
* @example
* var v = tan( -Math.PI/4.0 );
* // returns ~-1.0
* @example
* var v = tan( Math.PI/4.0 );
* // returns ~1.0
* @example
* var v = tan( NaN );
* // returns NaN
*/
function tan( x ) {
	var y;
	var z;
	var n;
	var ix;

	z = 0.0;
	y = new Array( 2 );
	ix = getHighWord( x );
	ix &= 0x7fffffff;

	// Case: |x| ~< pi/4
	if ( ix <= 0x3fe921fb ) {
		// Case: x < 2**-27
		if ( ix < 0x3e400000 ) {
			if ( (x|0) === 0  ) {
				// Generate inexact...
				return x;
			}
		}
		return tanKernel( x, z, 1 );
	}
	// Case: tan(Inf or NaN) is NaN
	else if ( ix >= 0x7ff00000 ) {
		return NaN;
	}
	// Argument reduction needed...
	else {
		n = remPio2( x, y );
		return tanKernel( y[0], y[1], 1 - ( (n&1) << 1 ) );
	}
} // end FUNCTION tan()


// EXPORTS //

module.exports = tan;

},{"./rem_pio2.js":274,"./tan_kernel.js":277,"@stdlib/math/base/utils/float64-get-high-word":299}],277:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_tan.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright 2004 Sun Microsystems, Inc.  All Rights Reserved.
*
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );


// VARIABLES //

var PIO4 = 7.85398163397448278999e-01;
var PIO4LO = 3.06161699786838301793e-17;
var T = [
	3.33333333333334091986e-01,	/* 3FD55555, 55555563 */
	1.33333333333201242699e-01,	/* 3FC11111, 1110FE7A */
	5.39682539762260521377e-02,	/* 3FABA1BA, 1BB341FE */
	2.18694882948595424599e-02,	/* 3F9664F4, 8406D637 */
	8.86323982359930005737e-03,	/* 3F8226E3, E96E8493 */
	3.59207910759131235356e-03,	/* 3F6D6D22, C9560328 */
	1.45620945432529025516e-03,	/* 3F57DBC8, FEE08315 */
	5.88041240820264096874e-04,	/* 3F4344D8, F2F26501 */
	2.46463134818469906812e-04,	/* 3F3026F7, 1A8D1068 */
	7.81794442939557092300e-05,	/* 3F147E88, A03792A6 */
	7.14072491382608190305e-05,	/* 3F12B80F, 32F0A7E9 */
	-1.85586374855275456654e-05,	/* BEF375CB, DB605373 */
	2.59073051863633712884e-05	/* 3EFB2A70, 74BF7AD4 */
];


// MAIN //

/**
* Computes the tan function on \\( \approx[-\pi/4, \pi/4] \\) (except on -0), \\( \pi/4 \approx 0.7854 \\)
*
* #### Method
*
* * Since \\( \tan(-x) = -\tan(x) \\), we need only to consider positive x.
* * Callers must return \\( \tan(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves -0. Callers may do the optimization \\( \tan(x) \approx x \\) for tiny x.
* * \\( \tan(x) \\) is approximated by a odd polynomial of degree 27 on \\( [0,0.67434] \\)
*
*   ``` tex
*   \tan(x) \approx x + T_1 x^3 + \ldots + T_{13} x^{27}
*   ```
*   where
*
*   ``` tex
*   \left| \frac{\tan(x)}{x} - \left( 1 + T_1 x^2 + T_2 x^4 + \ldots + T_{13} x^{26} \right) \right|  \le 2^{-59.2}
*   ```
*
* * Note: \\( \tan(x+y) = \tan(x) + \tan'(x) \cdot y \approx \tan(x) + ( 1 + x \cdot x ) \cdot y \\). Therefore, for better accuracy in computing \\( \tan(x+y) \\), let
*
*   ``` tex
*    r = x^3 \cdot \left( T_2+x^2 \cdot (T_3+x^2 \cdot (\ldots+x^2 \cdot (T_{12}+x^2 \cdot T_{13}))) \right)
*   ```
*
*   then
*
*   ``` tex
*   \tan(x+y) = x^3 + \left( T_1 \cdot x^2 + (x \cdot (r+y)+y) \right)
*   ```
*
* * For x in \\( [0.67434,\pi/4] \\),  let \\( y = \pi/4 - x \\), then
*
*   ``` tex
*   \tan(x) = \tan\left(\tfrac{\pi}{4}-y\right) = \frac{1-\tan(y)}{1+\tan(y)} \\
*   = 1 - 2 \cdot \left( \tan(y) - \tfrac{\tan(y)^2}{1+\tan(y)} \right)
*   ```
*
* @param {number} x - input value (assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of x.
* @param {number} k - indicates whether tan (if k = 1) or -1/tan (if k = -1) is returned.
* @param {number} tangent (in radians)
*/
function tanKernel( x, y, k ) {
	var hx;
	var ix;
	var a;
	var r;
	var s;
	var t;
	var v;
	var w;
	var z;

	hx = getHighWord( x );
	// High word of |x|:
	ix = hx & 0x7fffffff;

	// Case: |x| >= 0.6744
	if ( ix >= 0x3FE59428 ) {
		if ( x < 0 ) {
			x = -x;
			y = -y;
		}
		z = PIO4 - x;
		w = PIO4LO - y;
		x = z + w;
		y = 0.0;
	}
	z = x * x;
	w = z * z;
	// Break x^5*(T[1]+x^2*T[2]+...) into x^5(T[1]+x^4*T[3]+...+x^20*T[11]) +
	// x^5(x^2*(T[2]+x^4*T[4]+...+x^22*[T12]))
	r = T[1] + w * (T[3] + w * (T[5] + w * (T[7] + w * (T[9] +
		w * T[11]))));
	v = z * (T[2] + w * (T[4] + w * (T[6] + w * (T[8] + w * (T[10] +
		w * T[12])))));
	s = z * x;
	r = y + z * (s * (r + v) + y);
	r += T[0] * s;
	w = x + r;
	if ( ix >= 0x3FE59428 ) {
		v = k;
		return ( 1.0 - ( (hx >> 30) & 2 ) ) *
			( v - 2.0 * (x - (w * w / (w + v) - r)) );
	}
	if ( k === 1 ) {
		return w;
	}
	else {
		// Compute -1.0 / (x+r) accurately:
		z = w;
		setLowWord( z, 0 );
		v = r - (z - x); // z + v = r + x
		t = a = -1.0 / w; // a = -1.0 / w
		setLowWord( t, 0 );
		s = 1.0 + t * z;
		return t + a * (s + t * v);
	}
} // end FUNCTION tanKernel()


// EXPORTS //

module.exports = tanKernel;

},{"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/base/utils/float64-set-low-word":308}],278:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward zero.
*
* @module @stdlib/math/base/special/trunc
*
* @example
* var trunc = require( '@stdlib/math/base/special/trunc' );
*
* var v = trunc( -4.2 );
* // returns -4.0
*
* v = trunc( 9.99999 );
* // returns 9.0
*
* v = trunc( 0.0 );
* // returns 0.0
*
* v = trunc( -0.0 );
* // returns -0.0
*
* v = trunc( NaN );
* // returns NaN
*
* v = trunc( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* v = trunc( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*/

// MODULES //

var trunc = require( './trunc.js' );


// EXPORTS //

module.exports = trunc;

},{"./trunc.js":279}],279:[function(require,module,exports){
'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ceil = require( '@stdlib/math/base/special/ceil' );


// MAIN //

/**
* Rounds a numeric value toward zero.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = trunc( -4.2 );
* // returns -4.0
*
* @example
* var v = trunc( 9.99999 );
* // returns 9.0
*
* @example
* var v = trunc( 0.0 );
* // returns 0.0
*
* @example
* var v = trunc( -0.0 );
* // returns -0.0
*
* @example
* var v = trunc( NaN );
* // returns NaN
*
* @example
* var v = trunc( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = trunc( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*/
function trunc( x ) {
	if ( x < 0.0 ) {
		return ceil( x );
	}
	return floor( x );
} // end FUNCTION trunc()


// EXPORTS //

module.exports = trunc;

},{"@stdlib/math/base/special/ceil":186,"@stdlib/math/base/special/floor":209}],280:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );
var TINY = require( '@stdlib/math/constants/float32-smallest-normal' );


// VARIABLES //

var MAX_ITER = 1000000;


// FUNCTIONS //

/**
* Evaluates
*           a1
*      ---------------
*      b1 +     a2
*           ----------
*            b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionA( gen, factor, maxIter ) {
	var delta;
	var a0;
	var C;
	var D;
	var f;
	var v;

	v = gen();
	f = v[ 1 ];
	a0 = v[ 0 ];
	if ( f === 0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;

	do {
		v = gen();
		if ( v ) {
			D = v[ 1 ] + ( v[ 0 ] * D );
			if ( D === 0.0 ) {
				D = TINY;
			}
			C = v[ 1 ] + ( v[ 0 ] / C );
			if ( C === 0.0 ) {
				C = TINY;
			}
			D = 1.0 / D;
			delta = C * D;
			f = f * delta;
		}
	} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus

	return a0 / f;
} // end FUNCTION continuedFractionA()

/**
* Evaluates
*      b0 +   a1
*      ---------------
*      b1 +   a2
*           ----------
*           b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionB( gen, factor, maxIter ) {
	var delta;
	var C;
	var D;
	var f;
	var v;

	v = gen();
	f = v[ 1 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;
	do {
		v = gen();
		if ( v ) {
			D = v[ 1 ] + ( v[ 0 ] * D );
			if ( D === 0.0 ) {
				D = TINY;
			}
			C = v[ 1 ] + ( v[ 0 ] / C );
			if ( C === 0.0 ) {
				C = TINY;
			}
			D = 1.0 / D;
			delta = C * D;
			f = f * delta;
		}
	} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	return f;
} // end FUNCTION continuedFractionB()


// MAIN //

/**
* Evaluates the continued fraction approximation for the supplied series generator using the modified Lentz algorithm.
*
* #### References
* * Lentz, W.J. 1976, Applied Optics, vol. 15, pp. 668-671.
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxIter=1000000] - maximum number of iterations
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {boolean} [options.keep=false] - whether to keep the leading b term
* @returns {number} value of continued fraction
*
* @example
* // Continued fraction for (e-1)^(-1):
* var gen = generator()
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function generator() {
*    var i = 0;
*    return function() {
*        i++;
*        return [ i, i ];
*    };
* }
*/
function continuedFraction( generator, options ) {
	var maxIter;
	var opts;
	var eps;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	eps = opts.tolerance || TOLERANCE;
	maxIter = opts.maxIter || MAX_ITER;

	if ( opts.keep ) {
		return continuedFractionB( generator, eps, maxIter );
	}
	return continuedFractionA( generator, eps, maxIter );
} // end FUNCTION continuedFraction()


// EXPORTS //

module.exports = continuedFraction;

},{"@stdlib/math/base/special/abs":184,"@stdlib/math/constants/float32-smallest-normal":317,"@stdlib/math/constants/float64-eps":319}],281:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );
var TINY = require( '@stdlib/math/constants/float32-smallest-normal' );


// VARIABLES //

var MAX_ITER = 1000000;


// FUNCTIONS //

/**
* Evaluates
*           a1
*      ---------------
*      b1 +     a2
*           ----------
*            b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionA( gen, factor, maxIter ) {
	var isgenerator = typeof gen.next === 'function';
	var f;
	var C;
	var D;
	var delta;
	var a0;
	var v = isgenerator ? gen.next().value : gen();
	f = v[ 1 ];
	a0 = v[ 0 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	}
	return a0 / f;
} // end FUNCTION continuedFractionA()

/**
* Evaluates
*      b0 +    a1
*      ---------------
*      b1 +     a2
*           ----------
*           b2 +   a3
*                -----
*                b3 + ...
*
* @private
* @param {Function} gen - function giving terms of continued fraction expansion
* @param {PositiveNumber} factor - further terms are only added as long as factor*result is smaller than the next term
* @param {PositiveInteger} maxIter - maximum number of iterations
* @returns {number} evaluated expansion
*/
function continuedFractionB( gen, factor, maxIter ) {
	var isgenerator = typeof gen.next === 'function';
	var f;
	var C;
	var D;
	var delta;
	var v = isgenerator ? gen.next().value : gen();
	f = v[ 1 ];
	if ( f === 0.0 ) {
		f = TINY;
	}
	C = f;
	D = 0.0;
	if ( isgenerator === true ) {
		do {
			v = gen.next().value;
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	} else {
		do {
			v = gen();
			if ( v ) {
				D = v[ 1 ] + ( v[ 0 ] * D );
				if ( D === 0.0 ) {
					D = TINY;
				}
				C = v[ 1 ] + ( v[ 0 ] / C );
				if ( C === 0.0 ) {
					C = TINY;
				}
				D = 1.0 / D;
				delta = C * D;
				f *= delta;
			}
		} while ( v && ( abs( delta - 1.0 ) > factor ) && --maxIter ); // eslint-disable-line no-plusplus
	}
	return f;
} // end FUNCTION continuedFractionB()


// MAIN //

/**
* Evaluates the continued fraction approximation for the supplied series generator using the modified Lentz algorithm.
*
* #### References
* * Lentz, W.J. 1976, Applied Optics, vol. 15, pp. 668-671.
*
* @param {Function} generator - function returning terms of continued fraction expansion
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxIter=1000] - maximum number of iterations
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {boolean} [options.keep=false] - whether to keep the leading b term
* @returns {number} value of continued fraction
*
* @example
* // Continued fraction for (e-1)^(-1):
* var gen = generator();
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function* generator() {
*    var i = 0;
*    while ( true ) {
*        i++;
*        yield [ i, i ];
*    }
* }
*/
function continuedFraction( generator, options ) {
	var maxIter;
	var opts;
	var eps;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	eps = opts.tolerance || TOLERANCE;
	maxIter = opts.maxIter || MAX_ITER;

	if ( opts.keep ) {
		return continuedFractionB( generator, eps, maxIter );
	}
	return continuedFractionA( generator, eps, maxIter );
} // end FUNCTION continuedFraction()


// EXPORTS //

module.exports = continuedFraction;

},{"@stdlib/math/base/special/abs":184,"@stdlib/math/constants/float32-smallest-normal":317,"@stdlib/math/constants/float64-eps":319}],282:[function(require,module,exports){
'use strict';

/**
* Calculates a continued fraction approximation.
*
* @module @stdlib/math/base/tools/continued-fraction
*
* @example
* var continuedFraction = require( '@stdlib/math/base/tools/continued-fraction' );
*
* // Continued fraction for (e-1)^(-1):
* var gen = generator()
* var out = continuedFraction( gen );
* // returns ~0.582
*
* function generator() {
*    var i = 0;
*    return function() {
*        i++;
*        return [ i, i ];
*    };
* }
*/

// MODULES //

var hasGeneratorsSupport = require( '@stdlib/utils/detect-generator-support' )();


// EXPORTS //

module.exports = hasGeneratorsSupport ? require( './generators.js' ) : require( './basic.js' );

},{"./basic.js":280,"./generators.js":281,"@stdlib/utils/detect-generator-support":376}],283:[function(require,module,exports){
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

},{}],284:[function(require,module,exports){
'use strict';

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
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{}],285:[function(require,module,exports){
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

},{"./evalpoly.js":283,"./factory.js":284,"@stdlib/utils/define-read-only-property":374}],286:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_60_0/boost/math/tools/rational.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );


// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\). Coefficients should be sorted in ascending degree.
*
* #### Notes
*
* * The implementation uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} P - numerator polynomial coefficients sorted in ascending degree
* @param {NumericAray} Q - denominator polynomial coefficients sorted in ascending degree
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*
* @example
* var P = [ -6.0, -5.0 ];
* var Q = [ 3.0, 0.5 ];
*
* var v = evalrational( P, Q, 6.0 ); //  => ( -6*6^0 - 5*6^1 ) / ( 3*6^0 + 0.5*6^1 ) = (-6-30)/(3+3)
* // returns -6.0
*
* @example
* // 2x^3 + 4x^2 - 5x^1 - 6x^0 => degree 4
* var P = [ -6.0, -5.0, 4.0, 2.0 ];
*
* // 0.5x^1 + 3x^0 => degree 2
* var Q = [ 3.0, 0.5, 0.0, 0.0 ]; // zero-padded
*
* var v = evalrational( P, Q, 6.0 ); // => ( -6*6^0 - 5*6^1 + 4*6^2 + 2*6^3 ) / ( 3*6^0 + 0.5*6^1 + 0*6^2 + 0*6^3 ) = (-6-30+144+432)/(3+3)
* // returns 90.0
*/
function evalrational( P, Q, x ) {
	var len;
	var s1;
	var s2;
	var i;

	len = P.length;
	if ( len === 0 ) {
		return NaN;
	}
	if ( len !== Q.length ) {
		return NaN;
	}
	if ( x === 0.0 || len === 1 ) {
		return P[ 0 ] / Q[ 0 ];
	}
	// Use Horner's method...
	if ( abs( x ) <= 1.0 ) {
		s1 = P[ len-1 ];
		s2 = Q[ len-1 ];
		for ( i = len-2; i >= 0; --i ) {
			s1 *= x;
			s2 *= x;
			s1 += P[ i ];
			s2 += Q[ i ];
		}
	} else {
		x = 1.0 / x; // use inverse to avoid overflow
		s1 = P[ 0 ];
		s2 = Q[ 0 ];
		for( i = 1; i < len; ++i ) {
			s1 *= x;
			s2 *= x;
			s1 += P[ i ];
			s2 += Q[ i ];
		}
	}
	return s1 / s2;
} // end FUNCTION evalrational()


// EXPORTS //

module.exports = evalrational;

},{"@stdlib/math/base/special/abs":184}],287:[function(require,module,exports){
/* jshint evil:true */
'use strict';

// MAIN //

/**
* Generates a function for evaluating a rational function.
*
* #### Notes
*
* * The compiled function uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} P - numerator polynomial coefficients sorted in ascending degree
* @param {NumericArray} Q - denominator polynomial coefficients sorted in ascending degree
* @returns {Function} function for evaluating a rational function
*
* @example
* var P = [ 20.0, 8.0, 3.0 ];
* var Q = [ 10.0, 9.0, 1.0 ];
*
* var rational = evalrational.factory( P, Q );
*
* var v = rational( 10.0 ); // => (20*10^0 + 8*10^1 + 3*10^2) / (10*10^0 + 9*10^1 + 1*10^2) = (20+80+300)/(10+90+100)
* // returns 2.0
*
* v = rational( 2.0 ); // => (20*2^0 + 8*2^1 + 3*2^2) / (10*2^0 + 9*2^1 + 1*2^2) = (20+16+12)/(10+18+4)
* // returns 1.5
*/
function factory( P, Q ) {
	var f;
	var r;
	var n;
	var m;
	var i;

	// Code generation. Start with the function definition...
	f = 'return function evalrational(x){';

	// Create the function body...
	n = P.length;

	// Declare variables...
	f += 'var ax,s1,s2;';

	// If no coefficients, the function always returns NaN...
	if ( n === 0 ) {
		f += 'return NaN;';
	}
	// If P and Q have different lengths, the function always returns NaN...
	else if ( n !== Q.length ) {
		f += 'return NaN;';
	}
	// If P and Q have only one coefficient, the function always returns the ratio of the first coefficients...
	else if ( n === 1 ) {
		r = P[ 0 ] / Q[ 0 ];
		f += 'return ' + r + ';';
	}
	// If more than one coefficient, apply Horner's method to both the numerator and denominator...
	else {
		// If `x == 0`, return the ratio of the first coefficients...
		r = P[ 0 ] / Q[ 0 ];
		f += 'if(x===0.0){return ' + r + ';}';

		// Compute the absolute value of `x`...
		f += 'if(x<0.0){ax=-x;}else{ax=x;}';

		// If `abs(x) <= 1`, evaluate the numerator and denominator of the rational function using Horner's method...
		f += 'if(ax<=1.0){';
		f += 's1 = ' + P[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += P[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';
		f += 's2 = ' + Q[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += Q[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		// Close the if statement...
		f += '}else{';

		// If `abs(x) > 1`, evaluate the numerator and denominator via the inverse to avoid overflow...
		f += 'x = 1.0/x;';
		m = n - 1;
		f += 's1 = ' + P[ m ];
		for ( i = m - 1; i >= 0; i-- ) {
			f += '+x*';
			if ( i > 0 ) {
				f += '(';
			}
			f += P[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		m = n - 1;
		f += 's2 = ' + Q[ m ];
		for ( i = m - 1; i >= 0; i-- ) {
			f += '+x*';
			if ( i > 0 ) {
				f += '(';
			}
			f += Q[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';

		// Close the else statement...
		f += '}';

		// Return the ratio of the two sums...
		f += 'return s1/s2;';
	}
	// Close the function:
	f += '}';

	// Add a source directive for debugging:
	f += '//# sourceURL=evalrational.factory.js';

	// Create the function in the global scope:
	return ( new Function( f ) )();

	/*
	* returns
	*	function evalrational( x ) {
	*		var ax, s1, s2;
	*		if ( x === 0.0 ) {
	*			return P[0] / Q[0];
	*		}
	*		if ( x < 0.0 ) {
	*			ax = -x;
	*		} else {
	*			ax = x;
	*		}
	*		if ( ax <= 1.0 ) {
	*			s1 = P[0]+x*(P[1]+x*(P[2]+x*(P[3]+...+x*(P[n-2]+x*P[n-1]))));
	*			s2 = Q[0]+x*(Q[1]+x*(Q[2]+x*(Q[3]+...+x*(Q[n-2]+x*Q[n-1]))));
	*		} else {
	*			x = 1.0/x;
	*			s1 = P[n-1]+x*(P[n-2]+x*(P[n-3]+x*(P[n-4]+...+x*(P[1]+x*P[0]))));
	*			s2 = Q[n-1]+x*(Q[n-2]+x*(Q[n-3]+x*(Q[n-4]+...+x*(Q[1]+x*Q[0]))));
	*		}
	*		return s1 / s2;
	*	}
	*/
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{}],288:[function(require,module,exports){
'use strict';

/**
* Evaluate a rational function.
*
* @module @stdlib/math/base/tools/evalrational
*
* @example
* var evalrational = require( '@stdlib/math/base/tools/evalrational' );
*
* // 2x^3 + 4x^2 - 5x^1 - 6x^0 => degree 4
* var P = [ -6.0, -5.0, 4.0, 2.0 ];
*
* // 0.5x^1 + 3x^0 => degree 2
* var Q = [ 3.0, 0.5, 0.0, 0.0 ]; // zero-padded
*
* var v = evalrational( P, Q, 6.0 ); // => ( -6*6^0 - 5*6^1 + 4*6^2 + 2*6^3 ) / ( 3*6^0 + 0.5*6^1 + 0*6^2 + 0*6^3 ) = (-6-30+144+432)/(3+3)
* // returns 90.0
*
* @example
* var evalrational = require( '@stdlib/math/base/tools/evalrational' );
*
* var P = [ 20.0, 8.0, 3.0 ];
* var Q = [ 10.0, 9.0, 1.0 ];
*
* var rational = evalrational.factory( P, Q );
*
* var v = rational( 10.0 ); // => (20*10^0 + 8*10^1 + 3*10^2) / (10*10^0 + 9*10^1 + 1*10^2) = (20+80+300)/(10+90+100)
* // returns 2.0
*
* v = rational( 2.0 ); // => (20*2^0 + 8*2^1 + 3*2^2) / (10*2^0 + 9*2^1 + 1*2^2) = (20+16+12)/(10+18+4)
* // returns 1.5
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var evalrational = require( './evalrational.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( evalrational, 'factory', factory );


// EXPORTS //

module.exports = evalrational;

},{"./evalrational.js":286,"./factory.js":287,"@stdlib/utils/define-read-only-property":374}],289:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );


// VARIABLES //

var MAX_TERMS = 1000000;


// MAIN //

/**
* Sum the elements of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxTerms=1000000] - maximum number of terms to be added
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {number} [options.initialValue=0] - initial value of the resulting sum
* @returns {number} sum of all series terms
*
* @example
* var gen = geometricSeriesClosure( 0.9 )
* var out = sumSeries( gen );
* // returns 10
*
* function geometricSeriesClosure( x ) {
*     var exponent = -1;
*     return function() {
*         exponent += 1;
*         return Math.pow( x, exponent );
*     };
* }
*/
function sumSeries( generator, options ) {
	var nextTerm;
	var tolerance;
	var counter;
	var result;
	var opts;

	opts = {};

	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || TOLERANCE;
	counter = opts.maxTerms || MAX_TERMS;
	result = opts.initialValue || 0;

	// Repeatedly call function...
	do {
		nextTerm = generator();
		result += nextTerm;
	}
	while ( ( abs(tolerance * result) < abs(nextTerm) ) && --counter ); // eslint-disable-line no-plusplus

	return result;
} // end FUNCTION sum_series()


// EXPORTS //

module.exports = sumSeries;

},{"@stdlib/math/base/special/abs":184,"@stdlib/math/constants/float64-eps":319}],290:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var TOLERANCE = require( '@stdlib/math/constants/float64-eps' );


// VARIABLES //

var MAX_TERMS = 1000000;


// MAIN //

/**
* Sum the elements of the series given by the supplied function.
*
* @param {Function} generator - series function
* @param {Object} [options] - function options
* @param {PositiveInteger} [options.maxTerms=1000000] - maximum number of terms to be added
* @param {PositiveNumber} [options.tolerance=2.22e-16] - further terms are only added as long as the next term is greater than current term times the tolerance
* @param {number} [options.initialValue=0] - initial value of the resulting sum
* @returns {number} sum of all series terms
*
* @example
* var gen = geometricSeriesGenerator( 0.9 );
* var out = sumSeries( gen );
* // returns 10
*
* function* geometricSeriesGenerator( x ) {
*     var exponent = 0;
*     while ( true ) {
*         yield Math.pow( x, exponent );
*         exponent += 1;
*     }
* }
*/
function sumSeries( generator, options ) {
	var isgenerator;
	var tolerance;
	var nextTerm;
	var counter;
	var result;
	var opts;

	opts = {};
	if ( arguments.length > 1 ) {
		opts = options;
	}
	tolerance = opts.tolerance || TOLERANCE;
	counter = opts.maxTerms || MAX_TERMS;
	result = opts.initialValue || 0;

	isgenerator = typeof generator.next === 'function';
	if ( isgenerator === true ) {
		// Case A: Iterate over generator object created by a generator function...
		for ( nextTerm of generator ) {
			result += nextTerm;
			if (
				abs(tolerance * result) >= abs(nextTerm) ||
				--counter === 0 // eslint-disable-line no-plusplus
			) {
				break;
			}
		}
	} else {
		// Case B: Repeatedly call function...
		do {
			nextTerm = generator();
			result += nextTerm;
		}
		while ( ( abs(tolerance * result) < abs(nextTerm) ) && --counter ); // eslint-disable-line no-plusplus
	}
	return result;
} // end FUNCTION sumSeries()


// EXPORTS //

module.exports = sumSeries;

},{"@stdlib/math/base/special/abs":184,"@stdlib/math/constants/float64-eps":319}],291:[function(require,module,exports){
'use strict';

/**
* Sum the elements of the series given by the supplied function.
*
* @module @stdlib/math/base/tools/sum-series
*
* @example
* var sumSeries = require( '@stdlib/math/base/tools/sum-series' );
*
* var gen = geometricSeriesClosure( 0.9 )
* var out = sumSeries( gen );
* // returns 10
*
* function geometricSeriesClosure( x ) {
*     var exponent = -1;
*     return function() {
*         exponent += 1;
*         return Math.pow( x, exponent );
*     };
* }
*/

// MODULES //

var hasGeneratorsSupport = require( '@stdlib/utils/detect-generator-support' )();


// EXPORTS //

module.exports = hasGeneratorsSupport ? require( './generators.js' ) : require( './basic.js' );

},{"./basic.js":289,"./generators.js":290,"@stdlib/utils/detect-generator-support":376}],292:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":299,"@stdlib/math/constants/float64-exponent-bias":321,"@stdlib/math/constants/float64-high-word-exponent-mask":323}],293:[function(require,module,exports){
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

},{"./exponent.js":292}],294:[function(require,module,exports){
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

},{"./indices.js":296}],295:[function(require,module,exports){
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

},{"./from_words.js":294}],296:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":26}],297:[function(require,module,exports){
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

},{"./high.js":298}],298:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":26}],299:[function(require,module,exports){
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

},{"./get_high_word.js":297}],300:[function(require,module,exports){
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

},{"./low.js":302}],301:[function(require,module,exports){
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

},{"./get_low_word.js":300}],302:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":26}],303:[function(require,module,exports){
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

},{"./normalize.js":304}],304:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":129,"@stdlib/math/base/assert/is-nan":133,"@stdlib/math/base/special/abs":184,"@stdlib/math/constants/float64-smallest-normal":336}],305:[function(require,module,exports){
arguments[4][298][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":26,"dup":298}],306:[function(require,module,exports){
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

},{"./set_high_word.js":307}],307:[function(require,module,exports){
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

},{"./high.js":305}],308:[function(require,module,exports){
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

},{"./set_low_word.js":310}],309:[function(require,module,exports){
arguments[4][302][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":26,"dup":302}],310:[function(require,module,exports){
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

},{"./low.js":309}],311:[function(require,module,exports){
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

},{"./to_words.js":313}],312:[function(require,module,exports){
arguments[4][296][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":26,"dup":296}],313:[function(require,module,exports){
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

},{"./indices.js":312}],314:[function(require,module,exports){
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

},{"./uint32_to_int32.js":315}],315:[function(require,module,exports){
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

},{}],316:[function(require,module,exports){
'use strict';

/**
* Maximum single-precision floating-point number.
*
* @module @stdlib/math/constants/float32-max
* @type {number}
*
* @example
* var FLOAT32_MAX = require( '@stdlib/math/constants/float32-max' );
* // returns 3.4028234663852886e+38
*/


// MAIN //

/**
* The maximum single-precision floating-point number is given by
*
* ``` tex
* 2^{127} (2 - 2^{-23})
* ```
*
* @constant
* @type {number}
* @default 3.4028234663852886e+38
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_MAX = 3.4028234663852886e+38;


// EXPORTS //

module.exports = FLOAT32_MAX;

},{}],317:[function(require,module,exports){
'use strict';

/**
* Smallest positive single-precision floating-point normal number.
*
* @module @stdlib/math/constants/float32-smallest-normal
* @type {number}
*
* @example
* var FLOAT32_SMALLEST_NORMAL = require( '@stdlib/math/constants/float32-smallest-normal' );
* // returns 1.1754943508222875e-38
*/


// MAIN //

/**
* The smallest positive single-precision floating-point normal number has the value
*
* ``` tex
* \frac{1}{2^{127-1}}
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 0 00000001 00000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 1.1754943508222875e-38
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT32_SMALLEST_NORMAL = 1.1754943508222875e-38;


// EXPORTS //

module.exports = FLOAT32_SMALLEST_NORMAL;


},{}],318:[function(require,module,exports){
'use strict';

/**
* Euler's number.
*
* @module @stdlib/math/constants/float64-e
* @type {number}
*
* @example
* var E = require( '@stdlib/math/constants/float64-e' );
* // returns 2.718281828459045
*/


// MAIN //

/**
* Euler's number.
*
* @constant
* @type {number}
* @default 2.718281828459045
* @see [OEIS]{@link https://oeis.org/A001113}
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/E_(mathematical_constant)}
*/

var E = 2.718281828459045235360287471352662497757247093699959574966;


// EXPORTS //

module.exports = E;

},{}],319:[function(require,module,exports){
'use strict';

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/math/constants/float64-eps' );
* // returns 2.220446049250313e-16
*/


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number is
*
* ``` tex
* \frac{1}{2^{52}}
* ```
*
* @constant
* @type {number}
* @default 2.220446049250313e-16
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_EPSILON = 2.2204460492503130808472633361816E-16;


// EXPORTS //

module.exports = FLOAT64_EPSILON;

},{}],320:[function(require,module,exports){
'use strict';

/**
* The Euler-Mascheroni constant.
*
* @module @stdlib/math/constants/float64-eulergamma
* @type {number}
*
* @example
* var GAMMA = require( '@stdlib/math/constants/float64-eulergamma' );
* // returns 0.5772156649015329
*/


// MAIN //

/**
* The Euler-Mascheroni constant.
*
* @constant
* @type {number}
* @default 0.5772156649015329
* @see [OEIS]{@link http://oeis.org/A001620}
* @see [Mathworld]{@link http://mathworld.wolfram.com/Euler-MascheroniConstant.html}
*/
var GAMMA = 0.577215664901532860606512090082402431042;


// EXPORTS //

module.exports = GAMMA;

},{}],321:[function(require,module,exports){
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

},{}],322:[function(require,module,exports){
'use strict';

/**
* One half times the natural logarithm of 2.
*
* @module @stdlib/math/constants/float64-half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/math/constants/float64-half_ln2' );
* // returns 3.46573590279972654709e-01
*/


// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ``` tex
* \frac{\ln 2}{2}
* ```
*
* @constant
* @type {number}
* @default 3.46573590279972654709e-01
*/
var HALF_LN2 = 3.46573590279972654709e-01; // 0x3FD62E42 0xFEFA39EF


// EXPORTS //

module.exports = HALF_LN2;

},{}],323:[function(require,module,exports){
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

},{}],324:[function(require,module,exports){
'use strict';

/**
* High word mask for the significand of a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-high-word-significand-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = require( '@stdlib/math/constants/float64-high-word-significand-mask' );
* // returns 1048575
*/


// MAIN //

/**
* The high word mask for the significand of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 1048575 \\), which corresponds to the bit sequence
*
* ``` binarystring
* 0 00000000000 11111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 0x000fffff
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_SIGNIFICAND_MASK = 0x000fffff;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_SIGNIFICAND_MASK;

},{}],325:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the square root of `2π`.
*
* @module @stdlib/math/constants/float64-ln-sqrt-two-pi
* @type {number}
*
* @example
* var LN_SQRT_TWO_PI = require( '@stdlib/math/constants/float64-ln-sqrt-two-pi' );
* // returns 0.9189385332046728
*/


// MAIN //

/**
* Natural logarithm of the square root of `2π`.
*
* ``` tex
* \ln \sqrt{2\pi}
* ```
*
* @constant
* @type {number}
* @default 0.9189385332046728
*/
var LN_SQRT_TWO_PI = 9.18938533204672741780329736405617639861397473637783412817151540482765695927260397694743298635954197622005646625e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN_SQRT_TWO_PI;

},{}],326:[function(require,module,exports){
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

},{}],327:[function(require,module,exports){
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

},{}],328:[function(require,module,exports){
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

},{}],329:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max-ln
* @type {number}
*
* @example
* var FLOAT64_MAX_LN = require( '@stdlib/math/constants/float64-max-ln' );
* // returns 709.782712893384
*/

// MAIN //

/**
* The natural logarithm of the maximum double-precision floating-point number is given by
*
* ``` tex
* \ln \left( 2^{1023} (2 - 2^{-52}) \right)
* ```
*
* @constant
* @type {number}
* @default 709.782712893384
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_LN = 709.782712893384;


// EXPORTS //

module.exports = FLOAT64_MAX_LN;

},{}],330:[function(require,module,exports){
'use strict';

/**
* Maximum double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max
* @type {number}
*
* @example
* var FLOAT64_MAX = require( '@stdlib/math/constants/float64-max' );
* // returns 1.7976931348623157e+308
*/


// MAIN //

/**
* The maximum double-precision floating-point number is given by
*
* ``` tex
* 2^{1023} (2 - 2^{-52})
* ```
*
* @constant
* @type {number}
* @default 1.7976931348623157e+308
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX = 1.7976931348623157e+308;


// EXPORTS //

module.exports = FLOAT64_MAX;

},{}],331:[function(require,module,exports){
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

},{}],332:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-min-ln
* @type {number}
*
* @example
* var FLOAT64_MIN_LN = require( '@stdlib/math/constants/float64-min-ln' );
* // returns -708.3964185322641
*/

// MAIN //

/**
* The natural logarithm of the smallest normalized double-precision floating-point number is given by
*
* ``` tex
* -\ln \left( 2^{1023-1} \right)
* ```
*
* @constant
* @type {number}
* @default -708.3964185322641
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_LN = -708.3964185322641;


// EXPORTS //

module.exports = FLOAT64_MIN_LN;

},{}],333:[function(require,module,exports){
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

},{}],334:[function(require,module,exports){
'use strict';

/**
* The mathematical constant `π`.
*
* @module @stdlib/math/constants/float64-pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/math/constants/float64-pi' );
* // returns 3.141592653589793
*/


// MAIN //

/**
* The mathematical constant `π`.
*
* @constant
* @type {number}
* @default 3.141592653589793
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI;

},{}],335:[function(require,module,exports){
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

},{}],336:[function(require,module,exports){
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

},{}],337:[function(require,module,exports){
'use strict';

/**
* Square root of double-precision floating-point epsilon.
*
* @module @stdlib/math/constants/float64-sqrt-eps
* @type {number}
*
* @example
* var FLOAT64_SQRT_EPSILON = require( '@stdlib/math/constants/float64-sqrt-eps' );
* // returns 0.14901161193847656e-7
*/


// MAIN //

/**
* Square root of double-precision floating-point epsilon.
*
* ``` tex
* \sqrt{\frac{1}{2^{52}}}
* ```
*
* @constant
* @type {number}
* @default 0.14901161193847656e-7
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_SQRT_EPSILON = 0.1490116119384765625e-7;


// EXPORTS //

module.exports = FLOAT64_SQRT_EPSILON;

},{}],338:[function(require,module,exports){
'use strict';

/**
* Square root of the mathematical constant `π` times `2`.
*
* @module @stdlib/math/constants/float64-sqrt-two-pi
* @type {number}
*
* @example
* var SQRT_TWO_PI = require( '@stdlib/math/constants/float64-sqrt-two-pi' );
* // returns 2.5066282746310007
*/


// MAIN //

/**
* Square root of the mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 2.5066282746310007
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var SQRT_TWO_PI = 2.506628274631000502415765284811045253e+00;


// EXPORTS //

module.exports = SQRT_TWO_PI;

},{}],339:[function(require,module,exports){
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

},{}],340:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/math/constants/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/math/constants/uint32-max' );
* // returns 4294967295
*/


// MAIN //

/**
* The maximum unsigned 32-bit integer is given by
*
* ``` tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
* 11111111111111111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var UINT32_MAX = 4294967295;


// EXPORTS //

module.exports = UINT32_MAX;

},{}],341:[function(require,module,exports){
'use strict';

/**
* Regular expression to match a newline character sequence.
*
* @module @stdlib/regexp/eol
* @type {RegExp}
*
* @example
* var RE_EOL = require( '@stdlib/regexp/eol' );
*
* var bool = RE_EOL.test( '\n' );
* // returns true
*
* bool = RE_EOL.test( '\r\n' );
* // returns true
*
* bool = RE_EOL.test( '\\r\\n' );
* // returns false
*/


// MAIN //

/**
* Matches a newline character sequence.
*
* Regular expression: `/\r?\n/`
*
* * `\r?`
*   - match a carriage return character (optional)
* * `\n`
*   - match a line feed character
*
* @constant
* @type {RegExp}
* @default /\r?\n/
*/
var RE_EOL = /\r?\n/;


// EXPORTS //

module.exports = RE_EOL;

},{}],342:[function(require,module,exports){
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

},{}],343:[function(require,module,exports){
'use strict';

/**
* Regular expression to parse a regular expression string.
*
* @module @stdlib/regexp/regexp
* @type {RegExp}
*
* @example
* var RE_REGEXP = require( '@stdlib/regexp/regexp' );
*
* var bool = RE_REGEXP.test( '/^beep$/' );
* // returns true
*
* bool = RE_REGEXP.test( '' );
* // returns false
*
* @example
* var RE_REGEXP = require( '@stdlib/regexp/regexp' );
*
* var parts = RE_REGEXP.exec( '/^.*$/ig' );
* // returns [ '/^.*$/ig', '^.*$', 'ig', 'index': 0, 'input': '/^.*$/ig' ]
*/


// MAIN //

/**
* Matches parts of a regular expression string.
*
* Regular expression: `/^\/((?:\\\/|[^\/])+)\/([imgy]*)$/`
*
* * `/^\/`
*   - match a string that begins with a `/`
* * `()`
*   - capture
* * `(?:)+`
*   - capture, but do not remember, a group of characters which occur one or more times
* * `\\\/`
*   - match the literal `\/`
* * `|`
*   - OR
* * `[^\/]`
*   - anything which is not the literal `\/`
* * `\/`
*   - match the literal `/`
* * `([imgy]*)`
*   - capture any characters matching `imgy` occurring zero or more times
* * `$/`
*   - string end
*
*
* @constant
* @type {RegExp}
* @default /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/
*/
var RE_REGEXP = /^\/((?:\\\/|[^\/])+)\/([imgy]*)$/; // eslint-disable-line no-useless-escape


// EXPORTS //

module.exports = RE_REGEXP;

},{}],344:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'transform-stream' );


// MAIN //

/**
* Implements the `_transform` method as a pass through.
*
* @private
* @param {(Buffer|string)} chunk - streamed chunk
* @param {string} encoding - Buffer encoding
* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
*/
function _transform( chunk, encoding, clbk ) {
	debug( 'Received a new chunk. Chunk: %s. Encoding: %s.', chunk.toString(), encoding );
	clbk( null, chunk );
} // end FUNCTION _transform()


// EXPORTS //

module.exports = _transform;

},{"debug":423}],345:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'transform-stream' );
var Transform = require( 'readable-stream' ).Transform;
var copy = require( '@stdlib/utils/copy' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );
var destroy = require( './destroy.js' );
var _transform = require( './_transform.js' );


// MAIN //

/**
* Transform stream constructor factory.
*
* @param {Options} [options] - stream options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {boolean} [options.objectMode=false] - specifies whether a stream should operate in object mode
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @throws {TypeError} must provide valid options
* @returns {Function} Transform stream constructor
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
*
* var TransformStream = ctor( opts );
*
* var stream = new TransformStream();
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
* // => '1\n2\n3\n'
*/
function ctor( options ) {
	var transform;
	var _opts;
	var err;
	_opts = copy( DEFAULTS );
	if ( arguments.length ) {
		err = validate( _opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( _opts.transform ) {
		transform = _opts.transform;
	} else {
		transform = _transform;
	}
	/**
	* Transform stream constructor.
	*
	* @private
	* @constructor
	* @param {Options} [options] - stream options
	* @param {boolean} [options.objectMode=false] - specifies whether a stream should operate in object mode
	* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
	* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
	* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
	* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
	* @throws {TypeError} must provide valid options
	* @returns {TransformStream} transform stream
	*
	* @example
	* var stdout = require( '@stdlib/streams/base/stdout' );
	*
	* var stream = new TransformStream();
	*
	* stream.pipe( stdout );
	*
	* stream.write( '1' );
	* stream.write( '2' );
	* stream.write( '3' );
	*
	* stream.end();
	* // => '1\n2\n3\n'
	*/
	function TransformStream( options ) {
		var opts;
		var err;
		if ( !( this instanceof TransformStream ) ) {
			if ( arguments.length ) {
				return new TransformStream( options );
			}
			return new TransformStream();
		}
		opts = copy( _opts );
		if ( arguments.length ) {
			err = validate( opts, options );
			if ( err ) {
				throw err;
			}
		}
		debug( 'Creating a transform stream configured with the following options: %s.', JSON.stringify( opts ) );
		Transform.call( this, opts );
		this._destroyed = false;
		return this;
	} // end FUNCTION TransformStream()

	/*
	* Create a prototype which inherits from the parent prototype.
	*/
	TransformStream.prototype = Object.create( Transform.prototype );

	/*
	* Set the constructor.
	*/
	TransformStream.prototype.constructor = TransformStream;

	/**
	* Implements the `_transform` method.
	*
	* @private
	* @memberof TransformStream.prototype
	* @function _transform
	* @param {(Buffer|string)} chunk - streamed chunk
	* @param {string} encoding - Buffer encoding
	* @param {Callback} clbk - callback to invoke after transforming the streamed chunk
	*/
	TransformStream.prototype._transform = _transform;

	if ( _opts.flush ) {
		/**
		* Implements the `_flush` method.
		*
		* @private
		* @memberof TransformStream.prototype
		* @function _flush
		* @param {Callback} callback to invoke after performing flush tasks
		*/
		TransformStream.prototype.flush = _opts.flush;
	}

	/**
	* Gracefully destroys a stream, providing backwards compatibility.
	*
	* @private
	* @memberof TransformStream.prototype
	* @function destroy
	* @param {Object} [error] - optional error message
	* @returns {TransformStream} stream instance
	*/
	TransformStream.prototype.destroy = destroy;

	return TransformStream;
} // end FUNCTION ctor()


// EXPORTS //

module.exports = ctor;

},{"./_transform.js":344,"./defaults.json":346,"./destroy.js":347,"./validate.js":352,"@stdlib/utils/copy":371,"debug":423,"readable-stream":445}],346:[function(require,module,exports){
module.exports={
	"objectMode": false,
	"encoding": null,
	"allowHalfOpen": false,
	"decodeStrings": true
}

},{}],347:[function(require,module,exports){
(function (process){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'transform-stream' );


// MAIN //

/**
* Gracefully destroys a stream, providing backwards compatibility.
*
* @private
* @param {Object} [error] - optional error message
* @returns {Stream} stream instance
*/
function destroy( error ) {
	/* jshint validthis: true */ // TODO: eslint
	var self;
	if ( this._destroyed ) {
		debug( 'Attempted to destroy an already destroyed stream.' );
		return;
	}
	self = this;
	this._destroyed = true;

	// TODO: replace with polyfill
	process.nextTick( close );

	return this;

	/**
	* Closes a stream.
	*
	* @private
	*/
	function close() {
		if ( error ) {
			debug( 'Stream was destroyed due to an error. Error: %s.', JSON.stringify( error ) );
			self.emit( 'error', error );
		}
		debug( 'Closing the stream...' );
		self.emit( 'close' );
	}
} // end FUNCTION destroy()


// EXPORTS //

module.exports = destroy;

}).call(this,require('_process'))
},{"_process":420,"debug":423}],348:[function(require,module,exports){
'use strict';

// MODULES //

var copy = require( '@stdlib/utils/copy' );
var Stream = require( './stream.js' );


// MAIN //

/**
* Creates a reusable transform stream factory.
*
* @param {Options} [options] - stream options
* @param {boolean} [options.objectMode=false] - specifies whether a stream should operate in object mode
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @returns {Function} transform stream factory
*
* @example
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'objectMode': true,
*     'encoding': 'utf8',
*     'highWaterMark': 64,
*     'decodeStrings': false
* };
*
* var factory = streamFactory( opts );
*
* // Create 10 identically configured streams...
* var streams = [];
* var i;
* for ( i = 0; i < 10; i++ ) {
*     streams.push( factory( transform ) );
* }
*/
function streamFactory( options ) {
	var opts;
	if ( arguments.length ) {
		opts = copy( options );
	} else {
		opts = {};
	}
	/**
	* Creates a transform stream.
	*
	* @private
	* @param {Function} transform - callback to invoke upon receiving a new chunk
	* @param {Function} [flush] - callback to invoke after receiving all chunks and prior to the stream closing
	* @throws {TypeError} must provide valid options
	* @throws {TypeError} transform callback must be a function
	* @throws {TypeError} flush callback must be a function
	* @returns {TransformStream} transform stream
	*/
	return function createStream( transform, flush ) {
		opts.transform = transform;
		if ( arguments.length > 1 ) {
			opts.flush = flush;
		} else {
			delete opts.flush; // clear any previous `flush`
		}
		return new Stream( opts );
	};
} // end FUNCTION streamFactory()


// EXPORTS //

module.exports = streamFactory;

},{"./stream.js":351,"@stdlib/utils/copy":371}],349:[function(require,module,exports){
'use strict';

/**
* Transform stream.
*
* @module @stdlib/streams/utils/transform
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
* var stream = transformStream( opts );
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
* // => '1\n2\n3\n'
*
*
* @example
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'objectMode': true,
*     'encoding': 'utf8',
*     'highWaterMark': 64,
*     'decodeStrings': false
* };
*
* var factory = transformStream.factory( opts );
*
* // Create 10 identically configured streams...
* var streams = [];
* var i;
* for ( i = 0; i < 10; i++ ) {
*     streams.push( factory( transform ) );
* }
*
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* function stringify( chunk, enc, clbk ) {
*     clbk( null, JSON.stringify( chunk ) );
* }
*
* function newline( chunk, enc, clbk ) {
*     clbk( null, chunk+'\n' );
* }
*
* var s1 = transformStream.objectMode({
*     'transform': stringify
* });
*
* var s2 = transformStream.objectMode({
*     'transform': newline
* });
*
* s1.pipe( s2 ).pipe( stdout );
*
* s1.write( {'value': 'a'} );
* s1.write( {'value': 'b'} );
* s1.write( {'value': 'c'} );
*
* s1.end();
* // => '{"value":"a"}\n{"value":"b"}\n{"value":"c"}\n'
*
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
* var transformStream = require( '@stdlib/streams/utils/transform' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
*
* var Stream = transformStream.ctor( opts );
*
* var stream = new Stream();
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
* // => '1\n2\n3\n'
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var transform = require( './stream.js' );
var objectMode = require( './object_mode.js' );
var factory = require( './factory.js' );
var ctor = require( './ctor.js' );


// MAIN //

setReadOnly( transform, 'objectMode', objectMode );
setReadOnly( transform, 'factory', factory );
setReadOnly( transform, 'ctor', ctor );


// EXPORTS //

module.exports = transform;

},{"./ctor.js":345,"./factory.js":348,"./object_mode.js":350,"./stream.js":351,"@stdlib/utils/define-read-only-property":374}],350:[function(require,module,exports){
'use strict';

// MODULES //

var Stream = require( './stream.js' );


// MAIN //

/**
* Returns a transform stream with `objectMode` set to `true`.
*
* @param {Options} [options] - stream options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @throws {TypeError} must provide valid options
* @returns {TransformStream} transform stream
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
*
* function stringify( chunk, enc, clbk ) {
*     clbk( null, JSON.stringify( chunk ) );
* }
*
* function newline( chunk, enc, clbk ) {
*     clbk( null, chunk+'\n' );
* }
*
* var s1 = objectMode({
*     'transform': stringify
* });
*
* var s2 = objectMode({
*     'transform': newline
* });
*
* s1.pipe( s2 ).pipe( stdout );
*
* s1.write( {'value': 'a'} );
* s1.write( {'value': 'b'} );
* s1.write( {'value': 'c'} );
*
* s1.end();
* // => '{"value":"a"}\n{"value":"b"}\n{"value":"c"}\n'
*/
function objectMode( options ) {
	var opts;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	opts.objectMode = true;
	return new Stream( opts );
} // end FUNCTION objectMode()


// EXPORTS //

module.exports = objectMode;

},{"./stream.js":351}],351:[function(require,module,exports){
'use strict';

// MODULES //

var debug = require( 'debug' )( 'transform-stream' );
var Transform = require( 'readable-stream' ).Transform;
var copy = require( '@stdlib/utils/copy' );
var DEFAULTS = require( './defaults.json' );
var validate = require( './validate.js' );
var destroy = require( './destroy.js' );
var _transform = require( './_transform.js' );


// MAIN //

/**
* Transform stream constructor.
*
* @constructor
* @param {Options} [options] - stream options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {boolean} [options.objectMode=false] - specifies whether stream should operate in object mode
* @param {(string|null)} [options.encoding=null] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen=false] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings=true] - specifies whether to decode `strings` into `Buffer` objects when writing
* @throws {TypeError} must provide valid options
* @returns {TransformStream} transform stream
*
* @example
* var stdout = require( '@stdlib/streams/base/stdout' );
*
* function transform( chunk, enc, clbk ) {
*     clbk( null, chunk.toString()+'\n' );
* }
*
* var opts = {
*     'transform': transform
* };
* var stream = new TransformStream( opts );
*
* stream.pipe( stdout );
*
* stream.write( '1' );
* stream.write( '2' );
* stream.write( '3' );
*
* stream.end();
* // => '1\n2\n3\n'
*/
function TransformStream( options ) {
	var opts;
	var err;
	if ( !( this instanceof TransformStream ) ) {
		if ( arguments.length ) {
			return new TransformStream( options );
		}
		return new TransformStream();
	}
	opts = copy( DEFAULTS );
	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	debug( 'Creating a transform stream configured with the following options: %s.', JSON.stringify( opts ) );
	Transform.call( this, opts );
	this._destroyed = false;
	if ( opts.transform ) {
		this._transform = opts.transform;
	} else {
		this._transform = _transform;
	}
	if ( opts.flush ) {
		this._flush = opts.flush;
	}
	return this;
} // end FUNCTION TransformStream()

/*
* Create a prototype which inherits from the parent prototype.
*/
TransformStream.prototype = Object.create( Transform.prototype );

/*
* Set the constructor.
*/
TransformStream.prototype.constructor = TransformStream;

/**
* Gracefully destroys a stream, providing backwards compatibility.
*
* @memberof TransformStream.prototype
* @function destroy
* @param {Object} [error] - optional error message
* @returns {TransformStream} stream instance
*/
TransformStream.prototype.destroy = destroy;


// EXPORTS //

module.exports = TransformStream;

},{"./_transform.js":344,"./defaults.json":346,"./destroy.js":347,"./validate.js":352,"@stdlib/utils/copy":371,"debug":423,"readable-stream":445}],352:[function(require,module,exports){
'use strict';

// MODULES //

var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isFunction = require( '@stdlib/assert/is-function' );
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isNonNegative = require( '@stdlib/assert/is-nonnegative-number' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {Function} [options.transform] - callback to invoke upon receiving a new chunk
* @param {Function} [options.flush] - callback to invoke after receiving all chunks and prior to the stream closing
* @param {boolean} [options.objectMode] - specifies whether a stream should operate in object mode
* @param {(string|null)} [options.encoding] - specifies how `Buffer` objects should be decoded to `strings`
* @param {NonNegativeNumber} [options.highWaterMark] - specifies the `Buffer` level for when `write()` starts returning `false`
* @param {boolean} [options.allowHalfOpen] - specifies whether the stream should remain open even if one side ends
* @param {boolean} [options.decodeStrings] - specifies whether to decode `strings` into `Buffer` objects when writing
* @returns {(Error|null)} null or an error object
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options must be an object. Value: `' + options + '`.' );
	}
	if ( hasOwnProp( options, 'transform' ) ) {
		opts.transform = options.transform;
		if ( !isFunction( opts.transform ) ) {
			return new TypeError( 'invalid option. `transform` option must be a function. Option: `' + opts.transform + '`.' );
		}
	}
	if ( hasOwnProp( options, 'flush' ) ) {
		opts.flush = options.flush;
		if ( !isFunction( opts.flush ) ) {
			return new TypeError( 'invalid option. `flush` option must be a function. Option: `' + opts.flush + '`.' );
		}
	}
	if ( hasOwnProp( options, 'objectMode' ) ) {
		opts.objectMode = options.objectMode;
		if ( !isBoolean( opts.objectMode ) ) {
			return new TypeError( 'invalid option. `objectMode` option must be a primitive boolean. Option: `' + opts.objectMode + '`.' );
		}
	}
	if ( hasOwnProp( options, 'encoding' ) ) {
		opts.encoding = options.encoding;
		if ( !isString( opts.encoding ) ) {
			return new TypeError( 'invalid option. `encoding` option must be a primitive string. Option: `' + opts.encoding + '`.' );
		}
	}
	if ( hasOwnProp( options, 'allowHalfOpen' ) ) {
		opts.allowHalfOpen = options.allowHalfOpen;
		if ( !isBoolean( opts.allowHalfOpen ) ) {
			return new TypeError( 'invalid option. `allowHalfOpen` option must be a primitive boolean. Option: `' + opts.allowHalfOpen + '`.' );
		}
	}
	if ( hasOwnProp( options, 'highWaterMark' ) ) {
		opts.highWaterMark = options.highWaterMark;
		if ( !isNonNegative( opts.highWaterMark ) ) {
			return new TypeError( 'invalid option. `highWaterMark` option must be a nonnegative number. Option: `' + opts.highWaterMark + '`.' );
		}
	}
	if ( hasOwnProp( options, 'decodeStrings' ) ) {
		opts.decodeStrings = options.decodeStrings;
		if ( !isBoolean( opts.decodeStrings ) ) {
			return new TypeError( 'invalid option. `decodeStrings` option must be a primitive boolean. Option: `' + opts.decodeStrings + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-boolean":8,"@stdlib/assert/is-function":18,"@stdlib/assert/is-nonnegative-number":42,"@stdlib/assert/is-plain-object":57,"@stdlib/assert/is-string":73}],353:[function(require,module,exports){
'use strict';

/**
* Trim whitespace characters from the beginning of a string.
*
* @module @stdlib/string/left-trim
*
* @example
* var ltrim = require( '@stdlib/string/left-trim' );
*
* var out = ltrim( '   Whitespace   ' );
* // returns 'Whitespace   '
*
* out = ltrim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs\t\t\t'
*/

// MODULES //

var ltrim = require( './left_trim.js' );


// EXPORTS //

module.exports = ltrim;

},{"./left_trim.js":354}],354:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var replace = require( '@stdlib/string/replace' );


// VARIABLES //

// Note that `\s` is equivalent to `[ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`. The following regular expression should suffice to polyfill (most?) all environments.
var RE = /^[\s\uFEFF\u00A0]+/;


// MAIN //

/**
* Trims whitespace characters from the beginning of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = ltrim( '   Whitespace   ' );
* // returns 'Whitespace   '
* @example
* var out = ltrim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs\t\t\t'
* @example
* var out = ltrim( '\n\n\nNew Lines\n\n\n' );
* // returns 'New Lines\n\n\n'
*/
function ltrim( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	return replace( str, RE, '' );
} // end FUNCTION ltrim()


// EXPORTS //

module.exports = ltrim;

},{"@stdlib/assert/is-string":73,"@stdlib/string/replace":355}],355:[function(require,module,exports){
'use strict';

/**
* Replace search occurrences with a replacement string.
*
* @module @stdlib/string/replace
*
* @example
* var replace = require( '@stdlib/string/replace' );
*
* var str = 'beep';
* var out = replace( str, 'e', 'o' );
* // returns 'boop'
*
* str = 'Hello World';
* out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*/

// MODULES //

var replace = require( './replace.js' );


// EXPORTS //

module.exports = replace;

},{"./replace.js":356}],356:[function(require,module,exports){
'use strict';

// MODULES //

var rescape = require( '@stdlib/utils/escape-regexp-string' );
var isFunction = require( '@stdlib/assert/is-function' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isRegexp = require( '@stdlib/assert/is-regexp' );


// MAIN //

/**
* Replace search occurrences with a replacement string.
*
* @param {string} str - input string
* @param {(string|RegExp)} search - search expression
* @param {(string|Function)} newval - replacement value or function
* @throws {TypeError} first argument must be a string primitive
* @throws {TypeError} second argument argument must be a string primitive or regular expression
* @throws {TypeError} third argument must be a string primitive or function
* @returns {string} new string containing replacement(s)
*
* @example
* var str = 'beep';
* var out = replace( str, 'e', 'o' );
* // returns 'boop'
*
* @example
* var str = 'Hello World';
* var out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*
* @example
* var capitalize = require( '@stdlib/utils/string/capitalize' );
*
* var str = 'Oranges and lemons say the bells of St. Clement\'s';
*
* function replacer( match, p1 ) {
*     return capitalize( p1 );
* }
*
* var out = replace( str, /([^\s]*)/gi, replacer);
* // returns 'Oranges And Lemons Say The Bells Of St. Clement\'s'
*/
function replace( str, search, newval ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. First argument must be a string primitive. Value: `' + str + '`.' );
	}
	if ( isString( search ) ) {
		search = rescape( search );
		search = new RegExp( search, 'g' );
	}
	else if ( !isRegexp( search ) ) {
		throw new TypeError( 'invalid input argument. Second argument must be a string primitive or regular expression. Value: `' + search + '`.' );
	}
	if ( !isString( newval ) && !isFunction( newval ) ) {
		throw new TypeError( 'invalid input argument. Third argument must be a string primitive or replacement function. Value: `' + newval + '`.' );
	}
	return str.replace( search, newval );
} // end FUNCTION replace()


// EXPORTS //

module.exports = replace;

},{"@stdlib/assert/is-function":18,"@stdlib/assert/is-regexp":68,"@stdlib/assert/is-string":73,"@stdlib/utils/escape-regexp-string":382}],357:[function(require,module,exports){
'use strict';

/**
* Trim whitespace characters from the end of a string.
*
* @module @stdlib/string/right-trim
*
* @example
* var rtrim = require( '@stdlib/string/right-trim' );
*
* var out = rtrim( '   Whitespace   ' );
* // returns '   Whitespace'
*
* out = rtrim( '\t\t\tTabs\t\t\t' );
* // returns '\t\t\tTabs'
*
* out = rtrim( '\n\n\nNew Lines\n\n\n' );
* // returns '\n\n\nNew Lines'
*/

// MODULES //

var rtrim = require( './right_trim.js' );


// EXPORTS //

module.exports = rtrim;

},{"./right_trim.js":358}],358:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var replace = require( '@stdlib/string/replace' );


// VARIABLES //

// Note that `\s` is equivalent to `[ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]`. The following regular expression should suffice to polyfill (most?) all environments.
var RE = /[\s\uFEFF\u00A0]+$/;


// MAIN //

/**
* Trims whitespace from the end of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = rtrim( '   Whitespace   ' );
* // returns '   Whitespace'
* @example
* var out = rtrim( '\t\t\tTabs\t\t\t' );
* // returns '\t\t\tTabs'
* @example
* var out = rtrim( '\n\n\nNew Lines\n\n\n' );
* // returns '\n\n\nNew Lines'
*/
function rtrim( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	return replace( str, RE, '' );
} // end FUNCTION rtrim()


// EXPORTS //

module.exports = rtrim;

},{"@stdlib/assert/is-string":73,"@stdlib/string/replace":355}],359:[function(require,module,exports){
'use strict';

/**
* Trim whitespace characters from the beginning and end of a string.
*
* @module @stdlib/string/trim
*
* @example
* var trim = require( '@stdlib/string/trim' );
*
* var out = trim( '   Whitespace   ' );
* // returns 'Whitespace'
*
* out = trim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs'
*
* out = trim( '\n\n\nNew Lines\n\n\n' );
* // returns 'New Lines'
*/

// MODULES //

var trim = require( './trim.js' );


// EXPORTS //

module.exports = trim;

},{"./trim.js":360}],360:[function(require,module,exports){
'use strict';

// MODULES //

var ltrim = require( '@stdlib/string/left-trim' );
var rtrim = require( '@stdlib/string/right-trim' );


// MAIN //

/**
* Trim whitespace characters from beginning and end of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = trim( '   Whitespace   ' );
* // returns 'Whitespace'
* @example
* var out = trim( '\t\t\tTabs\t\t\t' );
* // returns 'Tabs'
* @example
* var out = trim( '\n\n\nNew Lines\n\n\n' ) );
* // returns 'New Lines'
*/
function trim( str ) {
	return ltrim( rtrim( str ) );
} // end FUNCTION trim()


// EXPORTS //

module.exports = trim;

},{"@stdlib/string/left-trim":353,"@stdlib/string/right-trim":357}],361:[function(require,module,exports){
'use strict';

// MODULES //

var Global = require( 'system.global' )();
var isObject = require( '@stdlib/assert/is-object' );
var modf = require( '@stdlib/math/base/special/modf' );
var round = require( '@stdlib/math/base/special/round' );
var now = require( './now.js' );


// VARIABLES //

var ts;
var ns;

if ( isObject( Global.performance ) ) {
	ns = Global.performance;
} else {
	ns = {};
}
if ( ns.now ) {
	ts = ns.now.bind( ns );
} else if ( ns.mozNow ) {
	ts = ns.mozNow.bind( ns );
} else if ( ns.msNow ) {
	ts = ns.msNow.bind( ns );
} else if ( ns.oNow ) {
	ts = ns.oNow.bind( ns );
} else if ( ns.webkitNow ) {
	ts = ns.webkitNow.bind( ns );
} else {
	ts = now;
}


// MAIN //

/**
* Returns a high-resolution time.
*
* #### Notes
*
* * Output format: `[seconds, nanoseconds]`.
*
*
* @private
* @returns {NumberArray} high-resolution time
*
* @example
* var t = tic();
* // returns [<number>,<number>]
*/
function tic() {
	var parts;
	var t;

	// Get a millisecond timestamp and convert to seconds:
	t = ts() / 1000;

	// Decompose the timestamp into integer (seconds) and fractional parts:
	parts = modf( t );

	// Convert the fractional part to nanoseconds:
	parts[ 1 ] = round( parts[1] * 1.0e9 );

	// Return the high-resolution time:
	return parts;
} // end FUNCTION tic()


// EXPORTS //

module.exports = tic;

},{"./now.js":363,"@stdlib/assert/is-object":55,"@stdlib/math/base/special/modf":249,"@stdlib/math/base/special/round":261,"system.global":448}],362:[function(require,module,exports){
'use strict';

// MODULES //

var isFunction = require( '@stdlib/assert/is-function' );


// EXPORTS //

module.exports = isFunction( Date.now );

},{"@stdlib/assert/is-function":18}],363:[function(require,module,exports){
'use strict';

// MODULES //

var bool = require( './detect.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var now;
if ( bool ) {
	now = Date.now;
} else {
	now = polyfill;
}


// EXPORTS //

module.exports = now;

},{"./detect.js":362,"./polyfill.js":364}],364:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Returns the time in milliseconds since the epoch.
*
* @private
* @returns {number} time
*
* @example
* var ts = now();
* // returns <number>
*/
function now() {
	var d = new Date();
	return d.getTime();
} // end FUNCTION now()


// EXPORTS //

module.exports = now;

},{}],365:[function(require,module,exports){
'use strict';

/**
* Return a high-resolution time difference.
*
* @module @stdlib/time/toc
*
* @example
* var tic = requrie( '@stdlib/time/tic' );
* var toc = require( '@stdlib/time/toc' );
*
* var start = tic();
* var delta = toc( start );
* // returns [<number>,<number>]
*/

// MODULES //

var toc = require( './toc.js' );


// EXPORTS //

module.exports = toc;

},{"./toc.js":366}],366:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeIntegerArray = require( '@stdlib/assert/is-nonnegative-integer-array' ).primitives;
var tic = require( '@stdlib/time/tic' );


// MAIN //

/**
* Returns a high-resolution time difference.
*
* #### Notes
*
* * Output format: `[seconds, nanoseconds]`.
*
*
* @param {NonNegativeIntegerArray} time - high-resolution time
* @throws {TypeError} must provide a nonnegative integer array
* @throws {RangeError} input array must have length `2`
* @returns {NumberArray} high resolution time difference
*
* @example
* var tic = require( '@stdlib/time/tic' );
*
* var start = tic();
* var delta = toc( start );
* // returns [<number>,<number>]
*/
function toc( time ) {
	var now = tic();
	var sec;
	var ns;
	if ( !isNonNegativeIntegerArray( time ) ) {
		throw new TypeError( 'invalid input argument. Must provide an array of nonnegative integers. Value: `' + time + '`.' );
	}
	if ( time.length !== 2 ) {
		throw new RangeError( 'invalid input argument. Input array must have length `2`.' );
	}
	sec = now[ 0 ] - time[ 0 ];
	ns = now[ 1 ] - time[ 1 ];
	if ( sec > 0 && ns < 0 ) {
		sec -= 1;
		ns += 1e9;
	}
	else if ( sec < 0 && ns > 0 ) {
		sec += 1;
		ns -= 1e9;
	}
	return [ sec, ns ];
} // end FUNCTION toc()


// EXPORTS //

module.exports = toc;

},{"@stdlib/assert/is-nonnegative-integer-array":36,"@stdlib/time/tic":361}],367:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":14,"@stdlib/regexp/function-name":342,"@stdlib/utils/native-class":398}],368:[function(require,module,exports){
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

},{"./constructor_name.js":367}],369:[function(require,module,exports){
'use strict';

// MODULES //

var isArray = require( '@stdlib/assert/is-array' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var deepCopy = require( './deep_copy.js' );


// MAIN //

/**
* Copies or deep clones a value to an arbitrary depth.
*
* @param {*} value - value to copy
* @param {NonNegativeInteger} [level=+infinity] - copy depth
* @returns {*} value copy
*
* @example
* var out = copy( 'beep' );
* // returns 'beep'
*
* @example
* var value = [{'a':1,'b':true,'c':[1,2,3]}];
* var out = copy( value );
* // returns [{'a':1,'b':true,'c':[1,2,3]}]
*
* var bool = ( value[0].c === out[0].c );
* // returns false
*/
function copy( value, level ) {
	var out;
	if ( arguments.length > 1 ) {
		if ( !isNonNegativeInteger( level ) ) {
			throw new TypeError( 'invalid input argument. `level` must be a nonnegative integer. Value: `' + level + '`.' );
		}
		if ( level === 0 ) {
			return value;
		}
	} else {
		level = PINF;
	}
	out = ( isArray(value) ) ? [] : {};
	return deepCopy( value, out, [value], [out], level );
} // end FUNCTION copy()


// EXPORTS //

module.exports = copy;

},{"./deep_copy.js":370,"@stdlib/assert/is-array":5,"@stdlib/assert/is-nonnegative-integer":38,"@stdlib/math/constants/float64-pinf":335}],370:[function(require,module,exports){
(function (Buffer){
'use strict';

// MODULES //

var objectKeys = require( 'object-keys' ).shim();
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isArray = require( '@stdlib/assert/is-array' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var isError = require( '@stdlib/assert/is-error' );
var typeOf = require( '@stdlib/utils/type-of' );
var regexp = require( '@stdlib/utils/regexp-from-string' );
var indexOf = require( '@stdlib/utils/index-of' );
var typedArrays = require( './typed_arrays.js' );


// FUNCTIONS //

/**
* Clones a class instance.
*
* #### Notes
*
* * This should __only__ be used for simple cases. Any instances with privileged access to variables (e.g., within closures) cannot be cloned. This approach should be considered __fragile__.
* * The function is greedy, disregarding the notion of a `level`. Instead, the function deep copies all properties, as we assume the concept of `level` applies only to the class instance reference but not to its internal state. This prevents, in theory, two instances from sharing state.
*
*
* @private
* @param {Object} val - class instance
* @returns {Object} new instance
*/
function cloneInstance( val ) {
	var cache = [];
	var refs = [];
	var names;
	var name;
	var desc;
	var tmp;
	var ref;
	var i;

	ref = Object.create( Object.getPrototypeOf( val ) );
	cache.push( val );
	refs.push( ref );

	names = Object.getOwnPropertyNames( val );
	for ( i = 0; i < names.length; i++ ) {
		name = names[ i ];
		desc = Object.getOwnPropertyDescriptor( val, name );
		if ( hasOwnProp( desc, 'value' ) ) {
			tmp = ( isArray( val[name] ) ) ? [] : {};
			desc.value = deepCopy( val[name], tmp, cache, refs, -1 );
		}
		Object.defineProperty( ref, name, desc );
	}
	if ( !Object.isExtensible( val ) ) {
		Object.preventExtensions( ref );
	}
	if ( Object.isSealed( val ) ) {
		Object.seal( ref );
	}
	if ( Object.isFrozen( val ) ) {
		Object.freeze( ref );
	}
	return ref;
} // end FUNCTION cloneInstance()

/**
* Copies an error object.
*
* @private
* @param {(Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|EvalError)} error - error to copy
* @returns {(Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|EvalError)} error copy
*
* @example
* var err1 = new TypeError( 'beep' );
*
* var err2 = copyError( err1 );
* // returns <TypeError>
*/
function copyError( error ) {
	/* jshint newcap:false */ // TODO: eslint
	var cache = [];
	var refs = [];
	var keys;
	var desc;
	var tmp;
	var key;
	var err;
	var i;

	// Create a new error...
	err = new error.constructor( error.message );

	cache.push( error );
	refs.push( err );

	// If a `stack` property is present, copy it over...
	if ( error.stack ) {
		err.stack = error.stack;
	}
	// Node.js specific (system errors)...
	if ( error.code ) {
		err.code = error.code;
	}
	if ( error.errno ) {
		err.errno = error.errno;
	}
	if ( error.syscall ) {
		err.syscall = error.syscall;
	}
	// Any enumerable properties...
	keys = objectKeys( error );
	for ( i = 0; i < keys.length; i++ ) {
		key = keys[ i ];
		desc = Object.getOwnPropertyDescriptor( error, key );
		if ( hasOwnProp( desc, 'value' ) ) {
			tmp = ( isArray( error[ key ] ) ) ? [] : {};
			desc.value = deepCopy( error[ key ], tmp, cache, refs, -1 );
		}
		Object.defineProperty( err, key, desc );
	}
	return err;
} // end FUNCTION copyError()


// MAIN //

/**
* Recursively performs a deep copy of an input object.
*
* @private
* @param {*} val - value to copy
* @param {(Array|Object)} copy - copy
* @param {Array} cache - an array of visited objects
* @param {Array} refs - an array of object references
* @param {NonNegativeInteger} level - copy depth
* @returns {*} deep copy
*/
function deepCopy( val, copy, cache, refs, level ) {
	var parent;
	var keys;
	var name;
	var desc;
	var ctor;
	var key;
	var ref;
	var x;
	var i;
	var j;

	level -= 1;

	// Primitives and functions...
	if (
		typeof val !== 'object' ||
		val === null
	) {
		return val;
	}
	if ( isBuffer( val ) ) {
		return new Buffer( val );
	}
	if ( isError( val ) ) {
		return copyError( val );
	}
	// Objects...
	name = typeOf( val );

	if ( name === 'date' ) {
		return new Date( +val );
	}
	if ( name === 'regexp' ) {
		return regexp( val.toString() );
	}
	if ( name === 'set' ) {
		return new Set( val );
	}
	if ( name === 'map' ) {
		return new Map( val );
	}
	if (
		name === 'string' ||
		name === 'boolean' ||
		name === 'number'
	) {
		// If provided an `Object`, return an equivalent primitive!
		return val.valueOf();
	}
	ctor = typedArrays[ name ];
	if ( ctor ) {
		return ctor( val );
	}
	// Class instances...
	if (
		name !== 'array' &&
		name !== 'object'
	) {
		// Cloning requires ES5 or higher...
		if ( typeof Object.freeze === 'function' ) {
			return cloneInstance( val );
		}
		return {};
	}
	// Arrays and plain objects...
	keys = objectKeys( val );
	if ( level > 0 ) {
		parent = name;
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			x = val[ key ];

			// Primitive, Buffer, special class instance...
			name = typeOf( x );
			if (
				typeof x !== 'object' ||
				x === null ||
				(
					name !== 'array' &&
					name !== 'object'
				) ||
				isBuffer( x )
			) {
				if ( parent === 'object' ) {
					desc = Object.getOwnPropertyDescriptor( val, key );
					if ( hasOwnProp( desc, 'value' ) ) {
						desc.value = deepCopy( x );
					}
					Object.defineProperty( copy, key, desc );
				} else {
					copy[ key ] = deepCopy( x );
				}
				continue;
			}
			// Circular reference...
			i = indexOf( cache, x );
			if ( i !== -1 ) {
				copy[ key ] = refs[ i ];
				continue;
			}
			// Plain array or object...
			ref = ( isArray(x) ) ? [] : {};
			cache.push( x );
			refs.push( ref );
			if ( parent === 'array' ) {
				copy[ key ] = deepCopy( x, ref, cache, refs, level );
			} else {
				desc = Object.getOwnPropertyDescriptor( val, key );
				if ( hasOwnProp( desc, 'value' ) ) {
					desc.value = deepCopy( x, ref, cache, refs, level );
				}
				Object.defineProperty( copy, key, desc );
			}
		}
	} else if ( name === 'array' ) {
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			copy[ key ] = val[ key ];
		}
	} else {
		for ( j = 0; j < keys.length; j++ ) {
			key = keys[ j ];
			desc = Object.getOwnPropertyDescriptor( val, key );
			Object.defineProperty( copy, key, desc );
		}
	}
	if ( !Object.isExtensible( val ) ) {
		Object.preventExtensions( copy );
	}
	if ( Object.isSealed( val ) ) {
		Object.seal( copy );
	}
	if ( Object.isFrozen( val ) ) {
		Object.freeze( copy );
	}
	return copy;
} // end FUNCTION deepCopy()


// EXPORTS //

module.exports = deepCopy;

}).call(this,require("buffer").Buffer)
},{"./typed_arrays.js":372,"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-array":5,"@stdlib/assert/is-buffer":14,"@stdlib/assert/is-error":16,"@stdlib/utils/index-of":390,"@stdlib/utils/regexp-from-string":410,"@stdlib/utils/type-of":415,"buffer":421,"object-keys":432}],371:[function(require,module,exports){
'use strict';

/**
* Copy or deep clone a value to an arbitrary depth.
*
* @module @stdlib/utils/copy
*
* @example
* var copy = require( '@stdlib/utils/copy' );
*
* var out = copy( 'beep' );
* // returns 'beep'
*
* @example
* var copy = require( '@stdlib/utils/copy' );
*
* var value = [{'a':1,'b':true,'c':[1,2,3]}];
* var out = copy( value );
* // returns [{'a':1,'b':true,'c':[1,2,3]}]
*
* var bool = ( value[0].c === out[0].c );
* // returns false
*/

// MODULES //

var copy = require( './copy.js' );


// EXPORTS //

module.exports = copy;

},{"./copy.js":369}],372:[function(require,module,exports){
/* eslint-disable no-new-func */
'use strict';

// MAIN //

var ctors = [
	'Int8Array',
	'Uint8Array',
	'Uint8ClampedArray',
	'Int16Array',
	'Uint16Array',
	'Int32Array',
	'Uint32Array',
	'Float32Array',
	'Float64Array'
];

/**
* Create functions for copying typed arrays.
*
* @private
* @returns {Object} typed array functions
*/
function createTypedArrayFcns() {
	var typedArrays = {};
	var ctor;
	var i;
	for ( i = 0; i < ctors.length; i++ ) {
		ctor = ctors[ i ];
		typedArrays[ ctor.toLowerCase() ] = new Function( 'arr', 'return new '+ctor+'( arr );' );
	}
	return typedArrays;
} // end FUNCTION createTypedArrayFcns()


// EXPORTS //

module.exports = createTypedArrayFcns();

},{}],373:[function(require,module,exports){
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

},{}],374:[function(require,module,exports){
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

},{"./define_read_only_property.js":373}],375:[function(require,module,exports){
'use strict';

// MODULES //

var evil = require( '@stdlib/utils/eval' );


// MAIN //

/**
* Tests for native `function*()` support.
*
* @returns {boolean} boolean indicating if an environment has native `function*()` support
*
* @example
* var bool = hasGeneratorSupport();
* // returns <boolean>
*/
function hasGeneratorSupport() {
	var bool;
	try {
		evil( '"use strict"; (function* () {})' );
		bool = true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
} // end FUNCTION hasGeneratorSupport()


// EXPORTS //

module.exports = hasGeneratorSupport;

},{"@stdlib/utils/eval":383}],376:[function(require,module,exports){
'use strict';

/**
* Tests for native `function*()` support.
*
* @module @stdlib/utils/detect-generator-support
*
* @example
* var hasGeneratorSupport = require( '@stdlib/utils/detect-generator-support' );
*
* var bool = hasGeneratorSupport();
* // returns <boolean>
*/

// MODULES //

var hasGeneratorSupport = require( './detect_generator_support.js' );


// EXPORTS //

module.exports = hasGeneratorSupport;

},{"./detect_generator_support.js":375}],377:[function(require,module,exports){
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

},{}],378:[function(require,module,exports){
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

},{"./detect_symbol_support.js":377}],379:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":378}],380:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":379}],381:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;


// VARIABLES //

var RE = /[-\/\\^$*+?.()|[\]{}]/g; // eslint-disable-line no-useless-escape


// MAIN //

/**
* Escapes a regular expression string.
*
* @param {string} str - regular expression string
* @throws {TypeError} first argument must be a string primitive
* @returns {string} escaped string
*
* @example
* var str = rescape( '[A-Z]*' );
* // returns '\\[A\\-Z\\]\\*'
*/
function rescape( str ) {
	var len;
	var s;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a regular expression string. Value: `' + str + '`.' );
	}
	// Check if the string starts with a forward slash...
	if ( str[ 0 ] === '/' ) {
		// Find the last forward slash...
		len = str.length;
		for ( i = len-1; i >= 0; i-- ) {
			if ( str[ i ] === '/' ) {
				break;
			}
		}
	}
	// If we searched the string to no avail or if the first letter is not `/`, assume that the string is not of the form `/[...]/[gimy]`:
	if ( i === void 0 || i <= 0 ) {
		return str.replace( RE, '\\$&' );
	}
	// We need to de-construct the string...
	s = str.substring( 1, i );

	// Only escape the characters between the `/`:
	s = s.replace( RE, '\\$&' );

	// Reassemble:
	str = str[ 0 ] + s + str.substring( i );

	return str;
} // end FUNCTION rescape()


// EXPORTS //

module.exports = rescape;

},{"@stdlib/assert/is-string":73}],382:[function(require,module,exports){
'use strict';

/**
* Escape a regular expression string or pattern.
*
* @module @stdlib/utils/escape-regexp-string
*
* @example
* var rescape = require( '@stdlib/utils/escape-regexp-string' );
*
* var str = rescape( '[A-Z]*' );
* // returns '\\[A\\-Z\\]\\*'
*/

// MODULES //

var rescape = require( './escape_regexp_string.js' );


// EXPORTS //

module.exports = rescape;

},{"./escape_regexp_string.js":381}],383:[function(require,module,exports){
/* eslint-disable no-eval */
'use strict';

/**
* Alias for `eval` global.
*
* @module @stdlib/utils/eval
*
* @example
* var evil = require( '@stdlib/utils/@stdlib/utils/eval' );
*
* var v = evil( '5*4*3*2*1' );
* // returns 120
*/

// MODULES //

var evil = eval;


// EXPORTS //

module.exports = evil;

},{}],384:[function(require,module,exports){
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

},{"./native.js":387,"./polyfill.js":388,"@stdlib/assert/is-function":18}],385:[function(require,module,exports){
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

},{"./detect.js":384}],386:[function(require,module,exports){
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

},{"./get_prototype_of.js":385}],387:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.getPrototypeOf;

},{}],388:[function(require,module,exports){
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

},{"./proto.js":389,"@stdlib/utils/native-class":398}],389:[function(require,module,exports){
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

},{}],390:[function(require,module,exports){
'use strict';

/**
* Return the first index at which a given element can be found.
*
* @module @stdlib/utils/index-of
*
* @example
* var indexOf = require( '@stdlib/utils/index-of' );
*
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 3 );
* // returns 1
*
* arr = [ 4, 3, 2, 1 ];
* idx = indexOf( arr, 5 );
* // returns -1
*
* // Using a `fromIndex`:
* arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* idx = indexOf( arr, 2, 3 );
* // returns 5
*
* // `fromIndex` which exceeds `array` length:
* arr = [ 1, 2, 3, 4, 2, 5 ];
* idx = indexOf( arr, 2, 10 );
* // returns -1
*
* // Negative `fromIndex`:
* arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
* idx = indexOf( arr, 2, -4 );
* // returns 5
*
* idx = indexOf( arr, 2, -1 );
* // returns 7
*
* // Negative `fromIndex` exceeding input `array` length:
* arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* idx = indexOf( arr, 2, -10 );
* // returns 1
*
* // Array-like objects:
* var str = 'bebop';
* idx = indexOf( str, 'o' );
* // returns 3
*/

// MODULES //

var indexOf = require( './index_of.js' );


// EXPORTS //

module.exports = indexOf;

},{"./index_of.js":391}],391:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/assert/is-nan' );
var isArrayLike = require( '@stdlib/assert/is-array-like' );
var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Returns the first index at which a given element can be found.
*
* @param {ArrayLike} arr - array-like object
* @param {*} searchElement - element to find
* @param {integer} [fromIndex] - starting index (if negative, the start index is determined relative to last element)
* @throws {TypeError} must provide an array-like object
* @throws {TypeError} `fromIndex` must be an integer
* @returns {integer} index or -1
*
* @example
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 3 );
* // returns 1
*
* @example
* var arr = [ 4, 3, 2, 1 ];
* var idx = indexOf( arr, 5 );
* // returns -1
*
* @example
* // Using a `fromIndex`:
* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* var idx = indexOf( arr, 2, 3 );
* // returns 5
*
* @example
* // `fromIndex` which exceeds `array` length:
* var arr = [ 1, 2, 3, 4, 2, 5 ];
* var idx = indexOf( arr, 2, 10 );
* // returns -1
*
* @example
* // Negative `fromIndex`:
* var arr = [ 1, 2, 3, 4, 5, 2, 6, 2 ];
* var idx = indexOf( arr, 2, -4 );
* // returns 5
*
* idx = indexOf( arr, 2, -1 );
* // returns 7
*
* @example
* // Negative `fromIndex` exceeding input `array` length:
* var arr = [ 1, 2, 3, 4, 5, 2, 6 ];
* var idx = indexOf( arr, 2, -10 );
* // returns 1
*
* @example
* // Array-like objects:
* var str = 'bebop';
* var idx = indexOf( str, 'o' );
* // returns 3
*/
function indexOf( arr, searchElement, fromIndex ) {
	var len;
	var i;
	if ( !isArrayLike( arr ) ) {
		throw new TypeError( 'invalid input argument. First argument must be an array-like object. Value: `' + arr + '`.' );
	}
	len = arr.length;
	if ( len === 0 ) {
		return -1;
	}
	if ( arguments.length === 3 ) {
		if ( !isInteger( fromIndex ) ) {
			throw new TypeError( 'invalid input argument. `fromIndex` must be an integer. Value: `' + fromIndex + '`.' );
		}
		if ( fromIndex >= 0 ) {
			if ( fromIndex >= len ) {
				return -1;
			}
			i = fromIndex;
		} else {
			i = len + fromIndex;
			if ( i < 0 ) {
				i = 0;
			}
		}
	} else {
		i = 0;
	}
	// Check for `NaN`...
	if ( isnan( searchElement ) ) {
		for ( ; i < len; i++ ) {
			if ( isnan( arr[i] ) ) {
				return i;
			}
		}
	} else {
		for ( ; i < len; i++ ) {
			if ( arr[ i ] === searchElement ) {
				return i;
			}
		}
	}
	return -1;
} // end FUNCTION indexOf()


// EXPORTS //

module.exports = indexOf;

},{"@stdlib/assert/is-array-like":3,"@stdlib/assert/is-integer":21,"@stdlib/assert/is-nan":29}],392:[function(require,module,exports){
'use strict';

// MODULES //

var objectCreate = require( './native.js' );
var createObject = require( './polyfill.js' );


// EXPORTS //

if ( typeof objectCreate === 'function' ) {
	module.exports = objectCreate;
} else {
	module.exports = createObject;
}

},{"./native.js":395,"./polyfill.js":396}],393:[function(require,module,exports){
'use strict';

/**
* Implement prototypical inheritance by replacing the prototype of one constructor with the prototype of another constructor.
*
* @module @stdlib/utils/inherit
*
* @example
* var inherit = require( '@stdlib/utils/inherit' );
*
* function Foo() {
*     return this;
* }
* Foo.prototype.beep = function beep() {
*     return 'boop';
* };
*
* function Bar() {
*     Foo.call( this );
*     return this;
* }
* inherit( Bar, Foo );
*
* var bar = new Bar();
* var v = bar.beep();
* // returns 'boop'
*/

// MODULES //

var inherit = require( './inherit.js' );


// EXPORTS //

module.exports = inherit;

},{"./inherit.js":394}],394:[function(require,module,exports){
'use strict';

// MODULES //

var validate = require( './validate.js' );
var createObject = require( './detect.js' );


// MAIN //

/**
* Implements prototypical inheritance by replacing the prototype of one constructor with the prototype of another constructor.
*
* #### Notes
*
* * This implementation is not designed to work with ES2015/ES6 classes. For ES2015/ES6 classes, use `class` with `extends`.
* * For reference, see [node#3455](https://github.com/nodejs/node/pull/3455), [node#4179](https://github.com/nodejs/node/issues/4179), [node#3452](https://github.com/nodejs/node/issues/3452), and [node commit](https://github.com/nodejs/node/commit/29da8cf8d7ab8f66b9091ab22664067d4468461e#diff-3deb3f32958bb937ae05c6f3e4abbdf5).
*
*
* @param {(Object|Function)} ctor - constructor which will inherit
* @param {(Object|Function)} superCtor - super (parent) constructor
* @throws {TypeError} first argument must be either an object or a function which can inherit
* @throws {TypeError} second argument must be either an object or a function from which a constructor can inherit
* @throws {TypeError} second argument must have an inheritable prototype
* @returns {(Object|Function)} child constructor
*
* @example
* function Foo() {
*     return this;
* }
* Foo.prototype.beep = function beep() {
*     return 'boop';
* };
*
* function Bar() {
*     Foo.call( this );
*     return this;
* }
* inherit( Bar, Foo );
*
* var bar = new Bar();
* var v = bar.beep();
* // returns 'boop'
*/
function inherit( ctor, superCtor ) {
	var err = validate( ctor );
	if ( err ) {
		throw err;
	}
	err = validate( superCtor );
	if ( err ) {
		throw err;
	}
	if ( typeof superCtor.prototype === 'undefined' ) {
		throw new TypeError( 'invalid input argument. Second argument must have a prototype from which another object can inherit. Value: `'+superCtor.prototype+'`.' );
	}
	// Create a prototype which inherits from the parent prototype:
	ctor.prototype = createObject( superCtor.prototype );

	// Set the constructor to refer to the child constructor:
	ctor.prototype.constructor = ctor;

	return ctor;
} // end FUNCTION inherit()


// EXPORTS //

module.exports = inherit;

},{"./detect.js":392,"./validate.js":397}],395:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.create;

},{}],396:[function(require,module,exports){
'use strict';

// FUNCTIONS //

/**
* Dummy constructor.
*
* @private
*/
function Ctor() {
	// Empty...
}


// MAIN //

/**
* An `Object.create` shim for older JavaScript engines.
*
* @private
* @param {Object} proto - prototype
* @returns {Object} created object
*
* @example
* var obj = createObject( Object.prototype );
* // returns {}
*/
function createObject( proto ) {
	Ctor.prototype = proto;
	return new Ctor();
} // end FUNCTION createObject()


// EXPORTS //

module.exports = createObject;

},{}],397:[function(require,module,exports){
'use strict';

/**
* Tests that a value is a valid constructor.
*
* @private
* @param {*} value - value to test
* @returns {(Error|null)} error object or null
*
* @example
* var ctor = function ctor() {};
*
* var err = validate( ctor );
* // returns null
*
* err = validate( null );
* // returns <TypeError>
*/
function validate( value ) {
	var type = typeof value;
	if (
		value === null ||
		(type !== 'object' && type !== 'function')
	) {
		return new TypeError( 'invalid input argument. A provided constructor must be either an object (except null) or a function. Value: `'+value+'`.' );
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;

},{}],398:[function(require,module,exports){
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

},{"./native_class.js":399,"./polyfill.js":400,"@stdlib/utils/detect-tostringtag-support":380}],399:[function(require,module,exports){
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

},{"./tostring.js":401}],400:[function(require,module,exports){
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

},{"./tostring.js":401,"./tostringtag.js":402,"@stdlib/assert/has-own-property":2}],401:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],402:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],403:[function(require,module,exports){
'use strict';

/**
* No operation.
*
* @module @stdlib/utils/noop
*
* @example
* var noop = require( '@stdlib/utils/noop' );
*
* noop();
* // ...does nothing.
*/

// MODULES //

var noop = require( './noop.js' );


// EXPORTS //

module.exports = noop;

},{"./noop.js":404}],404:[function(require,module,exports){
'use strict';

/**
* No operation.
*
* @example
* noop();
* // ...does nothing.
*/
function noop() {
	// Empty function...
}


// EXPORTS //

module.exports = noop;

},{}],405:[function(require,module,exports){
'use strict';

/**
* Return a partial object copy excluding specified keys.
*
* @module @stdlib/utils/omit
*
* @example
* var omit = require( '@stdlib/utils/omit' );
*
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = omit( obj1, 'b' );
* // returns { 'a': 1 }
*/

// MODULES //

var omit = require( './omit.js' );


// EXPORTS //

module.exports = omit;

},{"./omit.js":406}],406:[function(require,module,exports){
'use strict';

// MODULES //

var getKeys = require( 'object-keys' ).shim();
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var indexOf = require( '@stdlib/utils/index-of' );


// MAIN //

/**
* Returns a partial object copy excluding specified keys.
*
* @param {Object} obj - source object
* @param {(string|StringArray)} keys - keys to exclude
* @throws {TypeError} first argument must be an object
* @throws {TypeError} second argument must be either a string or an array of strings
* @returns {Object} new object
*
* @example
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = omit( obj1, 'b' );
* // returns { 'a': 1 }
*/
function omit( obj, keys ) {
	var ownKeys;
	var out;
	var key;
	var i;
	if ( typeof obj !== 'object' || obj === null ) {
		throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+obj+'`.' );
	}
	ownKeys = getKeys( obj );
	out = {};
	if ( isString( keys ) ) {
		for ( i = 0; i < ownKeys.length; i++ ) {
			key = ownKeys[ i ];
			if ( key !== keys ) {
				out[ key ] = obj[ key ];
			}
		}
		return out;
	}
	if ( isStringArray( keys ) ) {
		for ( i = 0; i < ownKeys.length; i++ ) {
			key = ownKeys[ i ];
			if ( indexOf( keys, key ) === -1 ) {
				out[ key ] = obj[ key ];
			}
		}
		return out;
	}
	throw new TypeError( 'invalid input argument. Second argument must be either a string primitive or an array of string primitives. Value: `'+keys+'`.' );
} // end FUNCTION omit()


// EXPORTS //

module.exports = omit;

},{"@stdlib/assert/is-string":73,"@stdlib/assert/is-string-array":71,"@stdlib/utils/index-of":390,"object-keys":432}],407:[function(require,module,exports){
'use strict';

/**
* Return a partial object copy containing only specified keys.
*
* @module @stdlib/utils/pick
*
* @example
* var pick = require( '@stdlib/utils/pick' );
*
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = pick( obj1, 'b' );
* // returns { 'b': 2 }
*/

// MODULES //

var pick = require( './pick.js' );


// EXPORTS //

module.exports = pick;

},{"./pick.js":408}],408:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var hasOwnProp = require( '@stdlib/assert/has-own-property' );


// MAIN //

/**
* Returns a partial object copy containing only specified keys. If a key does not exist as an own property in a source object, the key is ignored.
*
* @param {Object} obj - source object
* @param {(string|StringArray)} keys - keys to copy
* @throws {TypeError} first argument must be an object
* @throws {TypeError} second argument must be either a string or an array of strings
* @returns {Object} new object
*
* @example
* var obj1 = {
*     'a': 1,
*     'b': 2
* };
*
* var obj2 = pick( obj1, 'b' );
* // returns { 'b': 2 }
*/
function pick( obj, keys ) {
	var out;
	var key;
	var i;
	if ( typeof obj !== 'object' || obj === null ) {
		throw new TypeError( 'invalid input argument. First argument must be an object. Value: `'+obj+'`.' );
	}
	out = {};
	if ( isString( keys ) ) {
		if ( hasOwnProp( obj, keys ) ) {
			out[ keys ] = obj[ keys ];
		}
		return out;
	}
	if ( isStringArray( keys ) ) {
		for ( i = 0; i < keys.length; i++ ) {
			key = keys[ i ];
			if ( hasOwnProp( obj, key ) ) {
				out[ key ] = obj[ key ];
			}
		}
		return out;
	}
	throw new TypeError( 'invalid input argument. Second argument must be either a string primitive or an array of string primitives. Value: `'+keys+'`.' );
} // end FUNCTION pick()


// EXPORTS //

module.exports = pick;

},{"@stdlib/assert/has-own-property":2,"@stdlib/assert/is-string":73,"@stdlib/assert/is-string-array":71}],409:[function(require,module,exports){
'use strict';

// MODULES //

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var RE = require( '@stdlib/regexp/regexp' );


// MAIN //

/**
* Parses a regular expression string and returns a new regular expression.
*
* @param {string} str - regular expression string
* @returns {(RegExp|null)} regular expression or null
*
* @example
* var re = reFromString( '/beep/' )
* // returns /beep/
*/
function reFromString( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid input argument. Must provide a regular expression string. Value: `' + str + '`.' );
	}
	// Capture the regular expression pattern and any flags:
	str = RE.exec( str );

	// Create a new regular expression:
	return ( str ) ? new RegExp( str[1], str[2] ) : null;
} // end FUNCTION reFromString()


// EXPORTS //

module.exports = reFromString;

},{"@stdlib/assert/is-string":73,"@stdlib/regexp/regexp":343}],410:[function(require,module,exports){
'use strict';

/**
* Create a regular expression from a regular expression string.
*
* @module @stdlib/utils/regexp-from-string
*
* @example
* var reFromString = require( '@stdlib/utils/regexp-from-string' );
*
* var re = reFromString( '/beep/' );
* // returns /beep/
*/

// MODULES //

var reFromString = require( './from_string.js' );


// EXPORTS //

module.exports = reFromString;

},{"./from_string.js":409}],411:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":412,"./fixtures/re.js":413,"./fixtures/typedarray.js":414}],412:[function(require,module,exports){
'use strict';

// MODULES //

var root = require( 'system.global' )(); // eslint-disable-line no-redeclare


// MAIN //

var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"system.global":448}],413:[function(require,module,exports){
'use strict';

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],414:[function(require,module,exports){
'use strict';

var typedarray = Int8Array;


// EXPORTS //

module.exports = typedarray;

},{}],415:[function(require,module,exports){
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

},{"./check.js":411,"./polyfill.js":416,"./typeof.js":417}],416:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":368}],417:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":368}],418:[function(require,module,exports){
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

},{}],419:[function(require,module,exports){

},{}],420:[function(require,module,exports){
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

},{}],421:[function(require,module,exports){
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

  if (value instanceof ArrayBuffer) {
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
  if (isArrayBufferView(string) || string instanceof ArrayBuffer) {
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

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":418,"ieee754":428}],422:[function(require,module,exports){
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
},{"../../is-buffer/index.js":430}],423:[function(require,module,exports){
(function (process){
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}).call(this,require('_process'))
},{"./debug":424,"_process":420}],424:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":431}],425:[function(require,module,exports){
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

},{"foreach":427,"object-keys":432}],426:[function(require,module,exports){
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

},{}],427:[function(require,module,exports){

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


},{}],428:[function(require,module,exports){
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

},{}],429:[function(require,module,exports){
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

},{}],430:[function(require,module,exports){
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

},{}],431:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],432:[function(require,module,exports){
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

},{"./isArguments":433}],433:[function(require,module,exports){
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

},{}],434:[function(require,module,exports){
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
},{"_process":420}],435:[function(require,module,exports){
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
},{"./_stream_readable":437,"./_stream_writable":439,"core-util-is":422,"inherits":429,"process-nextick-args":434}],436:[function(require,module,exports){
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
},{"./_stream_transform":438,"core-util-is":422,"inherits":429}],437:[function(require,module,exports){
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
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Object.prototype.toString.call(obj) === '[object Uint8Array]' || Buffer.isBuffer(obj);
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
      if (typeof chunk !== 'string' && Object.getPrototypeOf(chunk) !== Buffer.prototype && !state.objectMode) {
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
}).call(this,require('_process'))
},{"./_stream_duplex":435,"./internal/streams/BufferList":440,"./internal/streams/destroy":441,"./internal/streams/stream":442,"_process":420,"core-util-is":422,"events":426,"inherits":429,"isarray":443,"process-nextick-args":434,"safe-buffer":446,"string_decoder/":444,"util":419}],438:[function(require,module,exports){
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
},{"./_stream_duplex":435,"core-util-is":422,"inherits":429}],439:[function(require,module,exports){
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
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Object.prototype.toString.call(obj) === '[object Uint8Array]' || Buffer.isBuffer(obj);
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

}).call(this,require('_process'))
},{"./_stream_duplex":435,"./internal/streams/destroy":441,"./internal/streams/stream":442,"_process":420,"core-util-is":422,"inherits":429,"process-nextick-args":434,"safe-buffer":446,"util-deprecate":451}],440:[function(require,module,exports){
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
},{"safe-buffer":446}],441:[function(require,module,exports){
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
},{"process-nextick-args":434}],442:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":426}],443:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],444:[function(require,module,exports){
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
},{"safe-buffer":446}],445:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":435,"./lib/_stream_passthrough.js":436,"./lib/_stream_readable.js":437,"./lib/_stream_transform.js":438,"./lib/_stream_writable.js":439}],446:[function(require,module,exports){
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

},{"buffer":421}],447:[function(require,module,exports){
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
},{}],448:[function(require,module,exports){
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

},{"./implementation":447,"./polyfill":449,"./shim":450,"define-properties":425}],449:[function(require,module,exports){
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
},{"./implementation":447}],450:[function(require,module,exports){
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
},{"./polyfill":449,"define-properties":425}],451:[function(require,module,exports){
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
},{}]},{},[145]);