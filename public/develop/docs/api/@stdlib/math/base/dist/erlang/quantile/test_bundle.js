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

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],2:[function(require,module,exports){
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

},{"./is_little_endian.js":3}],3:[function(require,module,exports){
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

},{"./ctors.js":1}],4:[function(require,module,exports){
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

},{"./is_even.js":5}],5:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":8}],6:[function(require,module,exports){
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

},{"./is_infinite.js":7}],7:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],8:[function(require,module,exports){
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

},{"./is_integer.js":9}],9:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":60}],10:[function(require,module,exports){
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

},{"./is_nan.js":11}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./is_negative_zero.js":13}],13:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-ninf":176}],14:[function(require,module,exports){
'use strict';

/**
* Test if a finite double-precision floating-point number is a nonnegative integer.
*
* @module @stdlib/math/base/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 1.0 );
* // returns true
*
* bool = isNonNegativeInteger( 0.0 );
* // returns true
*
* bool = isNonNegativeInteger( -10.0 );
* // returns false
*/

// MODULES //

var isNonNegativeInteger = require( './is_nonnegative_integer.js' );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./is_nonnegative_integer.js":15}],15:[function(require,module,exports){
'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is a nonnegative integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 1.0 );
* // returns true
* @example
* var bool = isNonNegativeInteger( 0.0 );
* // returns true
* @example
* var bool = isNonNegativeInteger( -10.0 );
* // returns false
*/
function isNonNegativeInteger( x ) {
	return (floor(x) === x && x >= 0);
} // end FUNCTION isNonNegativeInteger()


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/math/base/special/floor":60}],16:[function(require,module,exports){
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

},{"./is_odd.js":17}],17:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":4}],18:[function(require,module,exports){
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

},{"./is_positive_zero.js":19}],19:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-pinf":178}],20:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the quantile function of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the quantile function
*
* @example
* var quantile = factory( 5.0 );
*
* var y = quantile( 0.3 );
* // returns 5.0
*
* y = quantile( 0.1 );
* // returns 5.0
*
* y = quantile( 1.1 );
* // returns NaN
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return nan;
	}
	return quantile;

	/**
	* Evaluates the quantile function of a degenerate distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.5 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return mu;
	} // end FUNCTION quantile()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":22,"@stdlib/math/base/assert/is-nan":10}],21:[function(require,module,exports){
'use strict';

/**
* Degenerate distribution quantile function.
*
* @module @stdlib/math/base/dist/degenerate/quantile
*
* @example
* var quantile = require( '@stdlib/math/base/dist/degenerate/quantile' );
*
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
*
* @example
* var factory = require( '@stdlib/math/base/dist/degenerate/quantile' ).factory;
*
* var quantile = factory( 10.0 );
*
* var y = quantile( 0.5 );
* // returns 10.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = quantile;

},{"./factory.js":20,"./quantile.js":23,"@stdlib/utils/define-read-only-property":183}],22:[function(require,module,exports){
'use strict';

/**
* Evaluates the quantile function for an invalid degenerate distribution.
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

},{}],23:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the quantile function for a degenerate distribution centered at `mu`.
*
* @param {Probability} p - input value
* @param {number} mu - constant value of the distribution
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.5, 2.0 );
* // returns 2.0
* @example
* var y = quantile( 0.9, 4.0 );
* // returns 4.0
* @example
* var y = quantile( 1.1, 0.0 );
* // returns NaN
* @example
* var y = quantile( -0.2, 0.0 );
* // returns NaN
* @example
* var y = quantile( NaN, 0.0 );
* // returns NaN
* @example
* var y = quantile( 0.0, NaN );
* // returns NaN
*/
function quantile( p, mu ) {
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	return mu;
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":10}],24:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var factoryGamma = require( '@stdlib/math/base/dist/gamma/quantile' ).factory;
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for an Erlang distribution with shape parameter `k` and rate parameter `lambda`.
*
* @param {NonNegativeInteger} k - shape parameter
* @param {PositiveNumber} lambda - rate parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 2, 0.5 );
* var y = quantile( 0.5 );
* // returns ~3.357
*
* y = quantile( 0.8 );
* // returns ~5.989
*/
function factory( k, lambda ) {
	if ( !isNonNegativeInteger( k ) ) {
		return nan;
	}
	return factoryGamma( k, lambda );
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":26,"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/dist/gamma/quantile":35}],25:[function(require,module,exports){
'use strict';

/**
* Erlang distribution quantile function.
*
* @module @stdlib/math/base/dist/erlang/quantile
*
* @example
* var quantile = require( '@stdlib/math/base/dist/erlang/quantile' );
*
* var y = quantile( 0.8, 1, 1.0 );
* // returns ~1.609
*
* var myQuantile = quantile.factory( 10, 2.0 );
* y = myQuantile( 0.4 );
* // returns ~4.452
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = require( './quantile.js' );

},{"./factory.js":24,"./quantile.js":27,"@stdlib/utils/define-read-only-property":183}],26:[function(require,module,exports){
'use strict';

/**
* Evaluates the quantile function for an invalid Erlang distribution.
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

},{}],27:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var quantileGamma = require( '@stdlib/math/base/dist/gamma/quantile' );


// MAIN //

/**
* Evaluates the quantile function for an Erlang distribution with shape parameter `k` and rate parameter `lambda` at a probability `p`.
*
* @param {Probability} p - input value
* @param {NonNegativeInteger} k - shape parameter
* @param {PositiveNumber} lambda - rate parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 2, 1.0 );
* // returns ~2.994
* @example
* var y = quantile( 0.5, 4, 2.0 );
* // returns ~1.836
* @example
* var y = quantile( 1.1, 1, 1.0 );
* // returns NaN
* @example
* var y = quantile( -0.2, 1, 1.0 );
* // returns NaN
* @example
* var y = quantile( NaN, 1, 1.0 );
* // returns NaN
* @example
* var y = quantile( 0.0, NaN, 1.0 );
* // returns NaN
* @example
* var y = quantile( 0.0, 1, NaN );
* // returns NaN
* @example
* // Non-integer shape parameter:
* var y = quantile( 0.5, 0.5, 1.0 );
* // returns NaN
* @example
* // Non-positive shape parameter:
* var y = quantile( 0.5, -1, 1.0 );
* // returns NaN
* @example
* // Non-positive rate parameter:
* var y = quantile( 0.5, 1, -1.0 );
* // returns NaN
*/
function quantile( p, k, lambda ) {
	if ( !isNonNegativeInteger( k ) ) {
		return NaN;
	}
	return quantileGamma( p, k, lambda );
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nonnegative-integer":14,"@stdlib/math/base/dist/gamma/quantile":35}],28:[function(require,module,exports){
module.exports={"expected":[1.6853969804596183,1.2437294879218725,1.2025033366963225,0.6456305036844652,0.5606757906267583,0.26571820949395886,0.9530938048305695,1.2080164480843252,1.146403763457822,1.743650282992492,1.3972337923667155,1.8690363577544598,2.1503922475615593,0.530289120278886,0.8081785953779925,0.6760091579735158,1.5528523840519843,0.9567075313529229,1.0071823272146458,1.3944301186962396,1.6635654743093746,0.5429697141132976,0.8817129906862342,0.7541854044692817,0.38444370868160305,0.671457972521031,2.803404503930316,1.0211998261381396,0.5877531739094968,1.3216576918332683,2.0385406984692063,0.6221867763404142,1.6018484798872983,0.5645526401649482,1.5225065093113608,1.125606846608029,1.3730537975055557,0.688823177576938,1.1934869501153966,0.270634136947201,1.2918091806700382,0.5758452448020753,0.845051210524251,0.6072944774967721,1.706936609778325,0.7433947786933784,1.4791512477544435,0.8329866423861074,1.4109889835909202,1.3968872864976005,1.2783852268105158,1.6051934351967125,0.9051063797478958,0.43598598548306255,0.8503606480856336,0.8751623394937323,2.1233897497645002,1.3026205347122004,0.8644270956745306,1.100340241487163,1.5787736105264287,1.563124184973054,0.9473401539819412,1.3723083413302195,2.16036067009329,0.4880792065352248,0.7245838920133404,0.7799230674678868,0.49005129830197114,0.4499197084858237,0.9863002664918816,1.4609012979553893,1.379501477567854,2.120125563852261,0.6480469671183052,0.8675359077984731,1.2877541086457989,0.40588825524315525,0.9920816197488513,1.9937559745451503,1.6053865354751686,2.1976939605777934,0.6227624505122675,3.5962708285675555,0.7788782048089168,0.41704292321036696,1.0246656376387535,1.6461925452388562,1.6518562183234424,1.0746379999594162,0.7555431776261715,0.5574721158686452,0.755946275506916,1.3025668096733864,0.8913952057688027,0.6832116541267208,0.9945744122481005,0.5312779897894399,0.39176320164197126,1.8285267623942605,0.7818260128775707,0.7792015430970276,2.9503594382944582,1.5186138499204629,1.1884702598653643,2.1986427487612534,0.7221712894747223,1.9337355676204568,1.3972037414825436,1.6861956566406475,1.096948258712248,1.7171875404909178,1.7090418685943636,0.653350587391456,1.0754473161021354,0.4802232914763665,0.9387537931030882,1.1287804112272555,0.3863398384683986,0.40671352212782447,1.3389300368309014,3.2966749001707316,2.121687657483657,0.6390030737789673,0.5120486616980985,0.6189783639587878,0.630928584463795,0.570563132402969,0.7331000869987502,0.6011453191565317,1.2269197355309795,0.8983306219274457,0.5733195357804284,0.8969187568877579,1.4406705939492712,0.9002654060882161,1.5365292060833295,0.8827212626336618,1.771052288283316,0.5913131959998686,1.6043588519164185,1.4639017453080825,0.7413875849225413,0.49242903559112794,0.9936949851661462,1.859994189214407,2.141646046731463,0.7348871583653762,1.2967421573633087,0.9630578619849229,0.40072458064403566,0.8703701902191164,3.5853964195159875,0.6662451507882423,0.8956832660712165,1.2210731990959365,0.5159614158483808,0.865502722736905,1.4151384813597307,2.137984148434586,1.2936597225194555,1.0097656231230434,0.5268905212832565,1.8855189298751958,0.4774881830617588,1.1958747666080969,0.8745893775730413,0.67109499081544,1.0245309374272555,1.437083180214581,0.9000686871863735,1.0699027520264008,0.7072837396827378,0.7507842340082009,1.1501697528362382,0.8097462375913875,0.41179250957942976,1.1201418650529786,0.9069033764558265,0.9238367875276327,1.3441476408312316,0.7426200601994201,1.0691311181792698,2.6242610524148513,0.943573016592828,2.090862481994277,1.3559217450862344,0.7227413074905946,1.7993286880555208,2.1655689628027703,0.9064039766261269,2.3526739908342647,0.4786646173400432,1.3359164744077179,1.4591112433478963,0.33572800052982,1.5965803031322157,0.565791168029964,3.1313258061100013,1.112714011523302,0.48068496470972666,1.7805184243990853,0.6654721234603592,0.9756177293324128,0.6889599143913686,0.6487431037343868,0.6971271503372568,0.6842046401838819,1.1841641923683575,0.750770864945344,1.7625851824065064,1.3781494288951048,0.43522450964896303,1.8060800467337106,0.7721196900285634,1.5264573912275883,1.3828106146013122,1.0369053695362473,0.32628612218895997,0.8980391522979069,2.1912413931963246,0.8643130572179961,0.9248335311429767,0.7460294689775404,0.704779494634665,0.5912634239057226,1.2533500995653069,0.9648087366010939,1.1667666203936422,1.0903226749422896,0.7352470948759322,2.693347616310834,1.824340912991962,1.9309721103308521,1.7035591939471944,1.2494830371362524,1.127426072503647,2.2251551973402743,0.9856207639013663,0.908899200663624,1.4259004423242876,0.53708978634251,1.2475064047951436,1.3753594565164904,1.0070694225611732,1.618458289129815,1.1351312576503445,0.4748051359329287,1.0242060895783487,0.7588957472559621,0.9184066488418752,0.8840163018216544,1.03541866087348,1.5316978250804332,0.943504398576587,1.2139100913802745,1.4182691898086792,1.4107507885681894,1.0582242684329457,1.7119388904339035,0.7450954645105435,1.6222253610336868,0.4667788469939118,0.5332648278471098,1.690129578606764,0.7016645136531439,1.2979284588828677,0.863520866419285,2.1242777878275567,0.9410472168948185,1.185176773628809,1.2510483903207201,0.8082106559175657,1.109838757533063,1.856829288995644,0.9102502656698968,2.228650198988403,0.968907646016282,1.7616959677817752,0.5917773559662514,0.6460052176787203,1.5979736724437779,0.666296147430955,1.4269085881426133,0.781394316177392,2.2332266494300543,1.4325335650298392,1.0457936861680617,2.679881281006244,0.673890167138743,0.5042952205951717,2.1194584422230305,1.0552376229142928,0.6023796154268646,1.0985790361079977,0.6971620764266749,0.9281990570628273,0.6734952701924385,0.5322056769492451,1.2658906253663218,1.3690206089955155,3.9118971274268297,1.2867721129324707,0.8107849010973535,0.7804265752624019,0.5201000228544304,0.8973215929526666,2.426518196568601,0.5382261888433907,0.8645182453484906,1.1925568047429709,0.9461674756863376,0.5665720919098941,0.8096708822651265,0.6449313701413234,0.9651677819775603,1.1762942699490173,1.7104792793441361,0.6804524502399409,0.4288309324947883,1.17116577546633,1.3279835515035796,1.0625708862805323,1.173618635623158,0.3278073603436269,0.509742778584608,1.2488346677025988,0.8895591849387451,1.1087662408395518,1.0718067876785822,1.1098204401626675,0.3973948414226814,0.5819689058064955,1.4868205104399908,0.23828612596042575,0.8459634182679023,0.5446489159285651,0.7458671750437266,1.7566010631263982,0.6533518919528027,0.649944826152688,0.66239714904248,1.166601065335134,0.9457548083945815,1.9072589266434323,1.642241753139671,1.448601870864581,0.6279203518931471,0.7237177612626033,1.7313996909562697,0.815777446457499,1.368990045914196,0.3910595223712369,1.3793579246739918,0.4439094337900543,1.3632838014289967,1.1470499920939743,1.1557706767513614,0.7007472654283017,0.429220581388983,0.741222848949315,2.0282775108142714,2.6247514737524864,0.6610380970924524,1.7769594427586992,0.9022530234555531,1.4253676228874648,1.0012208175046933,0.873289571308748,0.3902391828911249,1.9882633523566509,1.1825745572221007,0.338429139513845,1.1502348556732223,0.9085586759166232,2.8239053444358566,1.803027670543571,0.6760439744274398,2.211662191701172,0.7453591215478059,0.6386468612621489,1.5549923171639053,0.8415906216681923,0.6239676525452662,1.3650268035475555,0.8967402228061968,0.5208250520266473,0.36073868536277126,0.636589765550372,1.2053754797366893,0.5427573610297055,1.4942568157680902,1.8419009583035368,0.7636921612944265,1.7602907557144214,0.6783472883415902,0.8208425280754148,1.3377801259996056,1.627352087769497,0.7700119851437819,3.3149508965482872,1.2155038290836229,1.2630345146342177,1.1350356172136016,1.6984725527812161,1.7166363120710435,1.477116143288844,0.1878165427176288,1.188038004386411,0.43623153155794203,1.8342027642922547,0.738241174127022,0.7756355843148212,0.7542931820828477,2.4290844320028446,1.3596041386089837,0.5793993401461017,1.0235121137063588,1.3933809882583672,1.0745708583807432,0.8000190619799703,1.5563282135096015,0.9300869055574161,0.766959428831621,1.5187650428099124,0.9039017673653403,0.25638305067153305,0.7009903581886263,0.6645306524691698,2.404474936105841,0.706751635476955,0.4428271133378081,0.7692565478965224,2.2146503951903136,1.2096473198778357,1.2325531575762343,1.815389069651118,0.6419676078332722,0.482052825395841,0.7811522113957143,1.191788030035532,1.395783908029221,2.0195503230400593,1.2978948034873308,0.7650995797457215,0.9330793049675185,0.6510528918524884,0.766755272626685,2.2114918511918016,0.8047722381137081,0.7987514828669943,0.46018030332708915,2.0402290224156534,0.9869402500734329,1.0518141455162662,0.43576712502288006,1.4457480554357036,1.7433673137769186,1.0051386684611527,1.3420142090850788,1.042187791160347,0.6483522049564958,1.046086085604142,1.3542294269648434,1.6336781511004972,0.3782345848961971,1.258545365130378,0.5811009948102774,0.8496091759187832,0.899781283506219,2.249756238989398,3.6516051581290263,0.49584857826133405,1.7994608139530144,0.4872813778556965,1.2358287990901453,0.39191272680209743,1.5397539829942355,0.8694624425187766,1.3934103392973052,0.3642855571017739,1.2984004954404196,1.2883290066573128,0.35199258989036253,1.5635773097322245,1.636479603829746,0.7109227940939746,0.6695527147225031,0.9684728279871438,1.1194088339145447,2.4860245034528474,1.5723010587572537,1.2841296614976914,0.5334488486572416,0.9141476865499311,0.4517893420922846,0.9425900204494563,1.8225514098199074,0.8743779746701388,1.2998396190127448,0.9324198996138263,1.0369318427274419,0.8348881229276128,3.3184439926011384,1.1196335250347782,1.6521210762414469,0.4127889829873046,0.4344778882088918,0.665702010491611,0.7813618406857474,1.8844637208692117,1.9412648211065842,0.6670822083695793,0.6721633507283784,1.0472056457356396,1.161919341006696,1.1771133349016396,1.175977878620248,1.9865747493338584,0.5433179545102612,2.466596472657117,0.5541444832779842,1.0933243311383334,1.4703793928070619,0.9872668040141112,0.5397003573519387,1.0383490340288446,1.196964125906491,1.79617721217252,0.9645898300878387,0.7739444860877255,0.44607880815699125,1.2157557144103575,0.7394311538080932,1.3693219726224957,0.5501446276268059,0.6619800709666007,1.1218441625968312,0.8727845940231638,2.732784495444232,0.8137705072019594,2.7401103412033683,1.9561476735521464,1.6091590004607266,2.5233431372995327,0.5304640725477835,2.270470287117602,0.44484444438970855,0.7464923492865482,1.391256925946409,0.6990234206802797,0.6950689868959055,0.29096575629094223,1.9933026464273842,0.4847508516129989,0.7245012080916716,1.783035320513314,1.2243147816054463,1.1666936946629556,1.5659739219611157,0.8171389738986192,1.4197147329940887,1.0761976931610533,1.1025740342711783,0.53168709455922,0.6478806009675928,0.9695477968907782,1.3316981559569228,0.8473930992597719,0.7270476994325783,1.184133466697877,0.7768377788584264,2.122085780531967,0.834894916978023,1.4641366577572823,1.0121886314535409,0.830760118387771,0.49158428356823325,0.5276048065451079,1.258386900428418,0.8944114514767324,0.7592449685314161,1.62624453342802,1.713713905107291,0.9529348634262704,1.0711695485823065,1.3665790129903221,0.7505727661738854,0.856128098931895,1.023757086059355,0.8802012617138089,0.6932686908109972,1.9986995629496405,1.2909788187250726,0.7387640357813877,0.48364429294181926,0.4676650173416206,0.5289125823733051,1.3340305184265344,0.5555086169668844,0.8325270691343962,2.1298438814808462,1.392453226136969,0.5614210261226603,0.6653721719132266,0.8514452989610507,0.5238044902067855,1.1796208086442943,0.4371094128135854,1.0065021070320959,0.6487166916006442,0.5419737887683467,1.0912926790046933,1.1847941137219677,1.5197480843010478,0.8667439688305825,0.7984250034490192,0.8601914871537316,0.9004500825359142,0.9947797020437646,0.7792258931239323,0.619553103718512,0.8056593627577374,2.350274112139515,1.41874383232232,0.5798053473206891,1.4178612744383061,0.6362824875403987,1.5466861813753994,1.7962194827167957,0.8978466655119176,0.4932218461136737,2.119618564829663,1.3349131735805124,0.5750522621930088,0.8807144785831538,1.6320785107812366,1.0619526803047767,0.6671429880408407,1.0174642549090558,0.38643613279296035,0.5402717198877462,1.4689171206669598,0.5556721829734041,0.6611176003993183,0.7629592436414273,1.3042355586482335,0.45410291909541384,0.5637962205616334,0.9287653288876498,1.3126196229177898,1.293084330873647,1.0013891256268916,1.3111746861484457,0.5936013895792914,0.6044402722477337,0.6990688430194835,0.44926814049166824,0.3895055085274431,2.053987230784142,0.9649786800306732,0.7695745856721364,0.6088058731396918,0.3310953630755085,0.604089413316702,1.0618030856931933,0.4445695886734318,0.7086649937252782,0.5013457768758026,2.1923294052395894,0.4132350915588664,0.7961217885064525,1.7144474430938346,1.2506903863256325,0.48906744100645566,1.3070049161653143,0.715293510895117,0.8492894797616349,2.5764827708871643,1.3559764716735212,1.6574819297717658,1.4483438327480422,0.32983238987953023,1.5077275677946966,0.6953037930158649,0.9489751470407111,0.34853397370772154,0.7195994492192067,0.613142445022109,0.6573497666821487,1.4560315579294296,1.1513723379865892,0.9953539505909419,0.9155464376707229,1.1415898879210296,0.8121177002251824,0.38426253725777676,0.6398454374356108,0.983330717576259,1.4561437164138824,0.9919632151744016,1.543332988766866,1.8316566075404144,0.3670677077705129,1.2292728740858196,0.5382646663304722,3.06254229770374,0.40326013505608554,0.8597266861184434,1.8771365639231579,0.6467348897378495,0.5687609067011941,0.2917426036796113,1.5370204223497093,0.9986667181546773,0.9362753114101914,1.5595286057799058,0.33916559221893117,0.4513701200332474,2.883033682985299,0.4581140110710469,0.8944485911925376,0.800380143730908,0.998539744610942,1.0487409432765424,1.1166915549092573,1.264813516586093,0.6693264574495529,1.584352205922449,1.110937169228696,0.9703682102087996,0.5903022493587926,0.6968891343660885,0.9407478625261011,1.1491862894355858,0.587257512461446,1.146571797843318,1.1671064125975337,1.1436625402081635,1.0327053310652041,1.2680356766596208,1.1118422518676898,1.6855679699576822,1.368166028377632,1.4792475070312832,1.0974420359965922,1.4281211932897753,0.5027820100209291,0.6901267375042299,1.4193618492752422,0.8119776946550546,0.8280040176379257,1.147909205686521,1.3068061675661258,0.7390804129867117,1.3918876315470077,1.6842452234077516,0.9151823745310863,0.4658338681854006,0.3501188244816502,0.7360447029208804,0.9001137998286798,0.7875557895534191,0.5198312527405597,1.1146876380952986,1.9114052190436226,1.0582830823881895,1.411485364385543,1.1341684414809725,0.6867255102766722,1.037629231786319,1.1410848349803036,0.8785424105867983,0.9851390437011398,0.7284190892750582,0.8950196990080828,1.2670416807231133,1.3088762183794922,1.0751172990708195,2.845046072622738,0.8198061093871635,1.2798832605395298,1.1218278477221484,0.7719012766127424,0.6545972115811592,1.0609807634644723,0.9257603318734418,0.8000187248292424,2.338559971837314,1.2884824238405799,1.874720918527622,0.4610143308508634,0.7632251177516642,0.6669989383090619,1.1591583279565911,0.5350665985204812,0.8671149456637576,0.659310906489524,0.7879783192200771,2.416404841411189,1.1445186487903394,0.6706808535963668,0.5934802980318867,1.9901684670642459,0.9917699924993675,2.186981245717505,2.4197322557969447,0.9134522421161811,1.0521214408646635,1.3826668710041794,0.9065911138044994,0.8080494557845721,0.923101516962503,0.7443727407216107,1.247745810905407,1.1062691933692521,0.7671029904496327,1.1761290740419468,1.4990893925212374,1.8249938174543594,0.5517650449786732,1.7038402160537907,1.3009259843611025,0.47597058168688267,2.5561764652392336,0.8752046949845659,1.1711187961500769,1.108039517511113,0.6442748588108108,0.7816050861159602,1.1263705853752197,1.3533845402713143,1.670497980204135,0.5351721444895228,1.533737436990895,1.7088416041534464,1.6140556105470067,0.8912192273571752,1.7534388157953245,1.463524286051659,3.242708941288612,1.1988889317691251,0.5641186224770288,1.0034769805467831,1.0993476739484527,1.3535698137561278,0.3012453424359552,0.693772222600179,1.2963179816665744,0.5248790214317092,1.7957896572696967,0.8948368530911136,0.7733860508097015,0.41768822943108,0.9055907923080049,2.0074868176250975,0.34022986931976373,1.1854805564540165,0.5521365810630999,1.6127633109881374,1.2391789445632904,0.3617563767298575,0.6175943176063537,1.2897105044918986,0.5388546335426248,0.4453448069713683,0.3670886762988302,0.4778386454614862,2.306462003004974,1.2175633227587515,2.2611332356527707,0.7544798539975608,1.264060601619589,1.1083674294984158,0.7798443079774592,1.6269782073459333,1.0716493148624386,0.8507617673998101,0.6520511387625367,0.8537853789306731,1.3195027079341568,1.2888160229866692,0.6445781189413462,0.8147713790938734,1.3507046762603998,1.4175541006794272,1.1025210066652373,1.7264589967733073,0.7535031517342841,1.0218701418063885,1.4754700786962196,2.3166551588581754,1.0469272410026635,1.2197427528317355,1.5913792564096123,0.7491983109666651,0.6157882213861039,1.0403742989888525,0.5237123239724945,1.0865950110193636,1.0561356607663588,1.5209976855855314,0.7267839482557102,2.4670940173140794,1.0617258734702284,1.361331305950016,0.8066082857985247,1.1452824126222243,0.6486369832388229,1.4984952478829032,1.379859461693461,0.7996829301807641,0.9479601971024483,1.2274560904673082,1.0147290865889425,0.392238046445398,0.6083338172746783,1.393670228472297,0.9336923539251585,0.7719984837957855,2.1848980618577682,0.5497475457886782,0.4965442193577961,1.693377532304334,1.9331646408759873,0.874310102267197,0.30090463337101336,0.34481881623437194,2.748564821798534,1.4861646824413854,0.9165209152100554,0.9033557230362863,1.5635854650753995,1.009170915971089,1.3933214888084915,0.4267044177569173,2.285121437997282,0.8282439556388563,0.4788700036516472,0.3100019169022135,1.082689304527143,0.8544724871195291,0.8954217430179,0.7758214399454635,2.997671132813165,1.1222361105319254,1.9157234075366734,2.1858363870629525,0.5185192121358257,0.8432244734114431,0.21620337557203906,1.0998593020387,0.568139726246494,0.8161975025071851,0.5818453063747712,2.078473038891886,1.0366443263670282,1.147433570457815,1.2325976867858581,0.6796384354592189,1.4882233763007133,1.0167331282588359,2.8584908118347316,0.48369685989468697,0.6057928989567835,0.583593421243171,2.2309662213868293,1.3358619534166254,0.19277136640487924,2.720022474602537,2.0414739977177976,0.313796371573932,3.177090032256952,0.5238334711598805,0.9752956961237873,1.121477139954018,0.4390028925660323,2.0689983132373126,0.8871764454683401,0.7200337441203328,0.7623862548979913,0.397164189411893,1.3816781909150986,0.8478278745232031,0.6158390006893403,0.8004754109752809,0.43097715596767316,0.8003678447402456,0.5639441685297368,1.4524676525225886,0.878282023965669,0.5439576989627972,0.8394567673054713,0.6343956639836936,0.9867284839681401,1.2938312889726584,1.4011890099157658,0.4298852792736244,0.6546577966523132,1.6867536338474183],"k":[25.0,24.0,22.0,17.0,11.0,11.0,18.0,25.0,14.0,19.0,26.0,27.0,24.0,16.0,22.0,14.0,18.0,14.0,23.0,29.0,27.0,10.0,16.0,24.0,11.0,24.0,26.0,17.0,16.0,20.0,27.0,23.0,28.0,11.0,19.0,21.0,24.0,23.0,27.0,14.0,26.0,19.0,27.0,19.0,26.0,15.0,19.0,18.0,14.0,22.0,15.0,22.0,19.0,15.0,12.0,18.0,19.0,21.0,28.0,26.0,21.0,24.0,15.0,15.0,27.0,11.0,15.0,15.0,15.0,14.0,24.0,21.0,23.0,30.0,19.0,24.0,20.0,17.0,23.0,28.0,23.0,16.0,19.0,28.0,19.0,18.0,14.0,27.0,29.0,26.0,10.0,21.0,27.0,30.0,29.0,13.0,28.0,13.0,10.0,26.0,21.0,13.0,25.0,26.0,16.0,21.0,16.0,24.0,20.0,22.0,21.0,24.0,24.0,19.0,15.0,10.0,20.0,27.0,12.0,10.0,30.0,28.0,30.0,15.0,17.0,21.0,21.0,11.0,16.0,21.0,15.0,13.0,19.0,17.0,30.0,24.0,29.0,18.0,24.0,21.0,18.0,29.0,13.0,14.0,13.0,15.0,21.0,16.0,23.0,11.0,12.0,29.0,26.0,18.0,18.0,21.0,11.0,14.0,19.0,17.0,14.0,24.0,12.0,22.0,14.0,28.0,25.0,11.0,28.0,27.0,26.0,11.0,22.0,12.0,18.0,17.0,17.0,21.0,14.0,25.0,21.0,11.0,23.0,27.0,19.0,30.0,28.0,17.0,24.0,24.0,15.0,20.0,11.0,20.0,17.0,13.0,30.0,19.0,24.0,26.0,10.0,15.0,20.0,15.0,14.0,11.0,13.0,18.0,30.0,13.0,24.0,29.0,11.0,30.0,16.0,25.0,26.0,26.0,12.0,27.0,29.0,28.0,13.0,20.0,15.0,10.0,19.0,16.0,28.0,29.0,18.0,27.0,25.0,26.0,29.0,15.0,28.0,28.0,24.0,19.0,29.0,18.0,19.0,27.0,22.0,27.0,29.0,10.0,27.0,21.0,28.0,13.0,29.0,29.0,16.0,23.0,27.0,13.0,17.0,27.0,15.0,18.0,12.0,11.0,30.0,11.0,21.0,24.0,19.0,25.0,12.0,26.0,25.0,28.0,18.0,11.0,25.0,27.0,25.0,20.0,14.0,30.0,12.0,16.0,10.0,22.0,22.0,22.0,29.0,25.0,18.0,27.0,14.0,11.0,12.0,14.0,11.0,19.0,15.0,16.0,27.0,29.0,26.0,22.0,16.0,11.0,22.0,28.0,13.0,19.0,27.0,19.0,24.0,16.0,15.0,23.0,21.0,27.0,24.0,15.0,23.0,16.0,19.0,15.0,16.0,12.0,23.0,17.0,19.0,13.0,29.0,13.0,17.0,25.0,10.0,16.0,14.0,15.0,18.0,17.0,20.0,14.0,26.0,18.0,21.0,29.0,20.0,10.0,17.0,19.0,26.0,24.0,14.0,18.0,11.0,21.0,26.0,21.0,14.0,13.0,13.0,24.0,23.0,21.0,27.0,24.0,21.0,22.0,28.0,13.0,30.0,22.0,19.0,27.0,10.0,28.0,30.0,18.0,26.0,17.0,18.0,20.0,20.0,15.0,29.0,22.0,11.0,12.0,17.0,18.0,23.0,25.0,25.0,26.0,21.0,20.0,25.0,16.0,18.0,25.0,27.0,24.0,26.0,25.0,27.0,16.0,20.0,10.0,21.0,13.0,26.0,16.0,17.0,18.0,23.0,24.0,15.0,15.0,22.0,19.0,18.0,14.0,20.0,23.0,26.0,23.0,11.0,12.0,12.0,30.0,16.0,13.0,12.0,27.0,20.0,20.0,23.0,11.0,14.0,12.0,24.0,20.0,30.0,24.0,10.0,29.0,13.0,16.0,29.0,12.0,18.0,16.0,17.0,22.0,18.0,12.0,25.0,29.0,22.0,18.0,24.0,13.0,28.0,20.0,25.0,11.0,19.0,12.0,16.0,12.0,15.0,29.0,12.0,21.0,13.0,25.0,11.0,24.0,26.0,28.0,11.0,16.0,29.0,10.0,20.0,30.0,19.0,23.0,19.0,21.0,20.0,25.0,28.0,21.0,22.0,14.0,19.0,24.0,20.0,28.0,17.0,29.0,21.0,29.0,18.0,18.0,15.0,11.0,15.0,28.0,14.0,23.0,19.0,18.0,24.0,28.0,26.0,15.0,28.0,12.0,25.0,11.0,22.0,25.0,20.0,23.0,25.0,15.0,25.0,24.0,19.0,11.0,24.0,14.0,16.0,15.0,22.0,12.0,11.0,27.0,19.0,30.0,24.0,28.0,27.0,15.0,25.0,14.0,18.0,22.0,11.0,22.0,15.0,29.0,17.0,21.0,24.0,26.0,24.0,25.0,14.0,23.0,20.0,25.0,11.0,23.0,11.0,16.0,20.0,10.0,23.0,24.0,30.0,12.0,29.0,18.0,24.0,14.0,20.0,30.0,20.0,21.0,26.0,24.0,21.0,16.0,26.0,13.0,20.0,16.0,21.0,17.0,21.0,27.0,14.0,21.0,13.0,11.0,19.0,17.0,24.0,28.0,30.0,13.0,22.0,11.0,12.0,22.0,15.0,25.0,20.0,13.0,20.0,18.0,20.0,11.0,17.0,11.0,15.0,14.0,27.0,14.0,12.0,19.0,30.0,11.0,17.0,19.0,29.0,30.0,22.0,12.0,21.0,30.0,13.0,16.0,27.0,28.0,16.0,17.0,15.0,17.0,25.0,12.0,22.0,16.0,27.0,10.0,11.0,14.0,29.0,19.0,29.0,16.0,27.0,19.0,14.0,10.0,18.0,28.0,14.0,19.0,14.0,14.0,11.0,18.0,13.0,23.0,15.0,24.0,15.0,11.0,27.0,11.0,14.0,30.0,14.0,13.0,28.0,21.0,29.0,21.0,13.0,27.0,13.0,28.0,15.0,17.0,11.0,17.0,27.0,20.0,23.0,30.0,12.0,16.0,10.0,10.0,18.0,30.0,26.0,29.0,30.0,10.0,24.0,10.0,29.0,10.0,26.0,24.0,10.0,13.0,11.0,23.0,16.0,26.0,15.0,10.0,13.0,30.0,12.0,24.0,23.0,23.0,27.0,26.0,14.0,21.0,22.0,27.0,27.0,12.0,11.0,19.0,26.0,22.0,25.0,12.0,18.0,25.0,28.0,15.0,18.0,16.0,23.0,18.0,27.0,14.0,29.0,29.0,11.0,28.0,28.0,27.0,11.0,29.0,22.0,16.0,23.0,13.0,18.0,22.0,16.0,12.0,17.0,23.0,27.0,29.0,22.0,23.0,18.0,23.0,21.0,13.0,26.0,20.0,25.0,29.0,22.0,26.0,17.0,24.0,21.0,24.0,14.0,27.0,27.0,26.0,28.0,18.0,29.0,15.0,11.0,17.0,20.0,10.0,23.0,17.0,21.0,28.0,24.0,17.0,23.0,30.0,23.0,30.0,26.0,18.0,26.0,17.0,16.0,21.0,27.0,21.0,21.0,30.0,19.0,18.0,12.0,18.0,12.0,19.0,13.0,11.0,25.0,21.0,30.0,21.0,15.0,22.0,28.0,13.0,23.0,16.0,20.0,29.0,22.0,21.0,23.0,26.0,25.0,30.0,13.0,19.0,29.0,20.0,14.0,13.0,22.0,20.0,19.0,25.0,13.0,13.0,18.0,26.0,17.0,29.0,14.0,14.0,21.0,12.0,19.0,29.0,14.0,12.0,12.0,10.0,30.0,23.0,23.0,22.0,15.0,27.0,30.0,25.0,17.0,13.0,15.0,15.0,19.0,28.0,20.0,13.0,20.0,19.0,29.0,22.0,18.0,21.0,28.0,25.0,26.0,28.0,25.0,12.0,15.0,26.0,13.0,22.0,26.0,25.0,19.0,28.0,20.0,27.0,12.0,28.0,14.0,16.0,18.0,17.0,22.0,27.0,19.0,10.0,18.0,29.0,28.0,21.0,25.0,19.0,16.0,19.0,25.0,16.0,10.0,12.0,27.0,19.0,13.0,22.0,24.0,21.0,21.0,17.0,24.0,18.0,19.0,10.0,24.0,23.0,19.0,10.0,29.0,25.0,29.0,26.0,15.0,17.0,10.0,28.0,22.0,28.0,22.0,25.0,26.0,29.0,25.0,26.0,26.0,24.0,25.0,16.0,17.0,12.0,29.0,30.0,10.0,22.0,26.0,10.0,29.0,14.0,28.0,26.0,11.0,25.0,20.0,13.0,15.0,12.0,27.0,26.0,22.0,16.0,11.0,21.0,15.0,28.0,28.0,18.0,11.0,18.0,28.0,20.0,22.0,10.0,13.0,21.0],"lambda":[13.846146560317107,11.185262025841652,17.536894177252897,27.431826729156477,14.619905523615504,24.84047220655706,27.151892621414724,15.907474768649807,11.18638508916117,10.156732989148853,16.14517650002231,11.115710318376713,14.093867526201716,23.788861680764985,20.85111774180602,17.046855693932955,15.82519860827686,14.76949358902214,20.13234749211022,19.83688241802237,12.744248014985558,27.613736800201988,16.34383643236903,27.826873429958656,23.40533209894293,29.2303896657883,10.169396050133969,18.745836968183703,28.291328391317965,13.242023566044763,12.332613074696077,28.796012202852733,21.079683816467636,18.40720467603525,16.592908687043693,22.323203698663157,15.908339647990442,27.989602590274547,22.271955221637583,27.016956646313382,15.510704470995806,25.65447041239389,29.873964010049995,26.135418589058506,15.41162313250194,13.23517660314411,19.928034662923736,16.654071474835085,17.158573048707396,16.699745137497985,13.95548354390884,14.891015198354442,20.9300245311387,24.58574136322483,16.423764961595975,13.55367012554109,13.913699209993498,14.726060610938983,27.735034114575008,25.54898824217501,12.373802628360382,10.608442011611515,13.399916840939214,11.266016324987529,13.737997073735194,22.76899023916513,23.232427841256552,24.4288519372872,23.47913309478163,26.746523970023823,26.782519265281014,14.40610281106113,19.904685557927436,11.20856840627129,23.739251550802003,27.871323986687337,18.894211894470423,27.452670724168424,22.04599941730128,14.016338006664926,17.442353892966835,10.325464529651697,25.435935458764117,10.56621224931622,26.66804845573744,25.589784657439303,13.410458418863008,15.144527736348184,19.94482671471893,28.04388887752655,17.948682652864584,28.828507746942332,26.501051012512654,25.38384634191441,27.822297786256502,14.086180365712849,19.469341149282066,24.561295745405353,15.428053953154137,14.746514600520694,28.741353059019573,21.64445225494267,10.649802672054047,16.589151791937734,14.87402830544735,10.48758877935018,23.648767788490876,15.052610202313947,20.523829070909926,13.908506431672855,19.96098097257653,17.47110926299774,15.335928162040787,20.49781528306097,13.937684547907413,14.517409859474801,19.80606114420235,24.765988045346248,19.72654679680734,22.36600791327326,19.609893275206783,10.21484076338361,15.221163871678108,23.138759809408697,21.430336436769146,26.829115572166778,24.37715773421899,23.824341184603945,29.183163725168054,22.930658916352385,11.436834300190064,15.931261854406031,20.459444667932793,18.038250004047526,17.84761562173045,25.29816236659348,20.073666257246465,22.489611303994227,13.566612321174665,27.384773489729398,10.723626532072181,26.207045092737392,13.219713701470805,22.774040737910376,12.1934665190257,10.282394292662719,10.327983857141888,16.653803015838836,18.656697768057278,10.688354755801699,22.484231355239416,29.531667737551413,11.601725623339023,28.45863777242931,24.68529017912541,20.50377569734698,15.116163723595557,14.590046901420743,17.989913920915548,10.356892227356042,10.365082440946644,27.691618419455644,25.087380417161466,16.179991601748583,26.020841627023724,28.632106534411186,28.938610845563744,12.534017516554652,22.954058603602917,22.745033271969476,22.389119610218522,18.667825892589164,27.112714492339567,21.753055469041964,16.349253469553698,15.08193226184634,27.950482956376682,17.81418540981779,19.553408747210163,26.187621351360782,20.500235666993415,12.584093237307808,20.496098103332105,11.519191969581527,19.832539613804848,16.171263333798606,19.94133637324837,28.471422486800314,13.850239251577005,10.421879762130155,22.13777643551879,10.275601913162223,26.360047966535376,23.597344517021597,16.260411770377615,28.876511011222263,17.44608388260737,23.073998867074724,10.597397686277784,24.167100601379694,19.299959690746753,11.41339110073735,27.08009786427345,15.421314225085506,19.02256514840516,16.505533674375783,22.296661601626585,22.775221486481705,28.025899842679,18.98936640593028,14.548292998382518,18.70549410239795,26.687709268256924,17.75300572370478,25.46274445738281,16.40359675577332,28.258881548129303,24.359553780887527,28.92176421591015,26.616908509897538,15.06825698112543,18.59499228894262,22.36289539514981,29.152638343967876,14.01816604765556,18.959191406729005,13.200365230405357,20.943328345568016,24.36446304642424,28.754299069938764,19.71625010063852,10.852019096644918,14.528278165175958,13.619980372028548,17.450340993371263,12.14478067014503,26.459187276331924,14.73630301252108,27.00969196416547,22.217245061223668,23.218719469335106,21.146065556356405,16.816211736096673,16.912767101882334,22.93298789578288,19.35971527509303,27.839014303301738,19.744003607857195,24.60422935294614,26.098646499175278,25.048502259557402,12.840558628807006,21.895902803081924,14.021351193542774,20.174019084002268,23.59595163088691,22.339084934490494,11.807281507635828,19.14066756324057,14.228603818361162,25.981567286537572,12.495384466302056,18.016011867820797,18.831939248514004,16.75887541007521,18.867383549887666,16.689591035483442,22.19526931679983,12.756867350129326,25.029136076742525,14.583691396938283,18.303263461855295,29.191431283875822,23.618766683231467,11.4893978706611,20.48456122582724,12.100326249197897,23.857910903457366,12.088417900351413,22.751403551995498,22.252844870284928,19.894642350225812,23.47304935307568,15.465704713864707,12.499056082628105,13.081383429994244,15.123775182553171,26.18769415298276,12.016097906768003,26.35251781090236,20.100074488409042,11.078268231923474,12.212148614379942,19.233366361017097,16.887080666266833,29.991251180943415,12.046177338023067,28.928877901291937,25.042104545157102,18.59881730104263,21.89240372497077,10.915940146855565,20.766394734233316,26.74397444137496,23.66817309718098,12.577586013220126,28.710431491440104,11.841224610088194,17.16440903112921,29.03080412167789,19.73647814841801,24.508939138436027,24.086339565129983,27.3054939735983,15.104581455544906,19.81301878110792,21.34981622417317,13.797571424973128,25.27078300249105,22.27746740053381,21.874043652504078,15.212879469901143,15.080167732876873,19.19118267477364,29.28807558587545,26.04391260617583,23.176929540129724,23.066219405790633,18.146177874225987,14.240246235663744,24.056597833018998,18.087415265456794,24.783889885110447,19.52335403067222,29.702667782636123,22.196060935508925,29.413651464949915,24.273520727704494,10.558153730799443,24.146985413753352,26.049600673553115,23.09393959596708,16.37525413397594,20.5631461132073,12.31116277282931,14.978237839742835,18.37104829624865,16.94715402500682,22.172108809961944,11.076936277216504,25.908222833244597,20.63555149254151,25.324036375027674,11.418032099750901,27.19575267380543,14.346721338583425,28.604824706312726,15.213469131278966,11.487400936474055,19.297837663596738,17.725663196669274,16.47563990827385,14.442948069975404,21.902215706081762,14.160374493141873,22.16667070316624,24.239841888682005,21.09237194997862,26.035451691301038,16.448703784577173,26.10391654586739,16.044366590689233,27.25310148686997,27.68023661827577,15.147251386453133,10.887454050341287,16.988124245165523,26.904442102062518,13.087748161598833,29.86168294173249,29.369053342434604,16.199171642626627,19.374828561475496,25.21200528923455,22.511740025033706,28.468089356672035,21.43861014484048,27.99707957303729,20.152378663803432,16.74954248597642,28.05979232128793,20.116203297524706,13.445918104135789,24.76370057446458,12.35667633958322,22.512106362554782,29.827982547546963,11.755267042712024,14.915850824164005,26.96007719169558,10.075508818499985,23.247079255927012,13.135711847927748,20.711797249987413,15.782022077424497,11.268272048222512,14.39511576374365,29.46510418153537,18.584695049149744,28.709996586569254,18.274639512783082,23.91327475641541,17.80653687584607,19.449130639075463,10.877411969004399,20.309602694712442,24.283067736847308,16.852937698076197,20.378801906252654,14.020997014304285,27.942168031942597,10.922448367483693,28.569789685438472,22.507428918231046,20.445004354551358,29.937709994703063,22.763399663968578,11.20686023919184,20.889674503718226,15.147474852309726,26.28559534367886,18.216070229502222,16.72678136920986,14.364470321449012,23.73056574355934,11.081217293796794,11.245285365371975,16.677860860815073,21.361417176793204,16.75527938265608,20.214984334199233,15.358357578374232,15.17629529546606,13.649377288197403,11.856506428707863,24.687747529262086,17.324076487023344,27.71956622802702,12.151349297630873,11.457889129931615,20.258929753578784,29.397037089627396,10.025118466542512,18.246674582737562,13.818259190867096,21.429386742957494,13.798906206101865,23.964613723765922,18.657100268724975,19.08017467497624,24.441246334174597,22.082875017454118,25.70898394765869,15.55042400984529,19.750989937418517,26.813267178789108,12.043819009133419,23.343247455414872,15.616093318733704,10.862877498907029,10.863193802822648,10.620636934458933,25.81537150719322,11.747737778261879,27.917203893109786,24.88086307452722,24.349901920700514,17.608244458937612,29.50973227064827,17.780084927994807,24.756452530800953,16.73352192639625,28.844012915693064,22.95389863124345,16.025495729254953,12.953402244000646,27.44631014053059,29.47655254841768,14.808312444817462,15.48425395155881,12.046001416878527,15.8119287169625,25.027272116751217,27.81981332461358,18.207149149621998,28.991315774862617,15.302806526049665,12.724199229456627,21.837642825152003,22.303474793152223,26.701435169457092,29.738268130290134,22.691065482143046,10.710320975826342,13.709418299438191,18.403114617120828,22.694656635238672,27.783068317119014,22.179130988635386,22.413152839492586,13.130387772439578,13.69849073027153,28.316164240184772,22.12345805201778,25.556923344050194,25.870910016372708,21.994432470443527,13.756610366897352,11.612491564770488,15.792571316318202,11.919962046231799,23.010779066931516,20.806217308938702,20.41589225350164,17.562629349972404,28.55289907212481,26.747935876150862,14.843602300211366,12.596286403837054,27.314799978529997,18.95381760366471,22.096893088451,20.483748012482845,20.210546189489065,16.518062938001453,29.94497733227851,21.192638083343578,12.09644171494018,14.654712267014581,11.3835002922632,16.44108412971908,14.706120983362258,14.969863209475962,17.575406617200766,12.443281351630748,21.901349041481023,10.220062060787853,29.48230039298437,18.524638501330053,21.625033748921254,16.637714049090064,27.666593986637725,25.79512769092635,15.807681815937226,27.387845214382164,26.291613233909054,13.878637818156063,18.94359032212546,19.824201951041253,21.69856806792823,19.12952712091583,27.96736701991916,21.179404613421852,15.578724950449478,27.26917962827432,27.312797024088276,10.81957281719237,13.689253871317435,21.070404879467752,11.932041379013047,17.294988301384244,27.823709742681167,13.699389310524982,11.718399181060043,14.205029616871219,15.395628341533701,28.374975236782646,27.317866933028547,27.7665031851086,23.411349806520892,19.95183751459394,27.473832006568905,19.22374713983502,16.88784662844247,21.99940280307221,13.956319400980508,19.455432906108193,15.171665538628636,26.733899632957268,12.968043317077047,16.369393556917345,23.09122518999431,13.230908213347474,15.63661255881673,19.051535591318405,28.615140094952864,15.972487809500183,15.222375392875755,18.154737274257336,28.365993255557946,29.825430328087897,12.347927228431956,21.354750489776762,15.624940670012242,23.985578374002063,19.260405561096384,20.20922520684152,18.15366388424814,25.063854305322376,26.89892288663883,29.953650603610843,17.82608660404939,18.08527886534623,12.794356682261352,19.497352181053557,17.310494165810614,27.302972998253658,13.590528285638804,16.8666113729993,11.781169765739804,24.024167709178013,23.471223209867624,10.645547391650517,10.414879157068505,24.493574287454535,14.530714350339572,10.084904085726398,24.93453045459555,21.071861887964502,19.327880651133142,20.79650439736795,29.669356222627602,11.46272549766227,25.65789968207513,17.867965518026267,13.58901308234274,14.316729003080585,27.999314289404836,28.514006575367155,14.266498216123932,27.27752601530691,20.750664793520425,17.06404050173594,27.174144201488517,22.701757324201914,11.245668348512314,23.641039138902634,21.363104365357092,14.195457441621064,20.89230751424102,14.17881891778559,13.89354761103695,25.975866347992863,10.1165157614378,28.89140875855077,26.706492741283935,14.865049168369122,21.05069568509895,27.9612077646094,11.724935557294657,12.688033660157704,14.935956867816031,22.584888198915767,26.327047561972442,24.389965743705822,19.42307146134283,25.317282365202107,29.38061894225017,28.44177046721182,13.581195218390754,21.782535369541407,18.330206241243733,16.929672883473003,11.369647835042889,25.778969590426225,22.99317348116604,21.156764906515498,13.73450284755294,14.018439126646548,13.524399669448602,14.073811758386242,12.334680784564277,26.093884233475634,17.588254194652464,25.84785577781681,29.194652563472346,26.79522854688285,20.623776320901936,25.289768410968794,25.861703693551796,16.392846671644605,18.44191393030213,25.624940105666575,28.856741764516993,13.283905660573065,19.746637931078336,14.93423902899389,12.483234259667789,26.681851342419513,14.83373855154639,26.046210992616494,19.86245562835798,22.08364519211557,21.788377848317133,17.289850145287776,21.92037668352283,12.143178433106279,22.376268241449374,27.268714179707256,14.372620897548739,18.862773911984696,19.278686756318177,23.465153741004457,11.74065253336456,19.249802596578363,19.60823993802993,10.638632054338748,24.80094881359777,29.961580996641253,11.920033343178197,26.728300442509468,21.710221244735052,20.422499941828157,25.27309942060016,26.884032350330212,20.18570580060331,10.156580457615977,28.845593875254053,14.097725900717805,25.972308999636567,23.829938614947928,18.085029005151377,15.697079498270025,26.136441502463,25.610642041295275,21.50120835345958,20.65541338494937,14.508340708583557,21.38097305099403,28.406004762049932,24.187898385362544,13.114273322073302,12.916304091326554,13.547656231993809,15.583391171983546,12.334528665616112,19.967893993016634,24.53038183300627,27.642026053006965,18.290604124815783,14.842710298812904,24.32860621997682,24.655570867781165,21.034031985005445,20.854341036106394,16.364782420504756,11.711687263550843,12.89818509292683,26.72289975237808,28.43934275151458,26.5189926773228,25.3310346323357,17.38555901777405,11.744029044488213,12.67677242248126,13.508318482797304,23.36044774034447,18.019343528500087,21.75824019590841,28.64370067150526,18.023803734813146,22.90589327080966,21.930414572890612,18.550631721352524,29.530673977175383,24.408289554934125,22.305101505190407,24.09801012756549,17.494130000792403,11.718171554578651,18.67070738051854,20.012306457312267,16.462484454523047,29.449624947760512,23.399884405423286,27.711025357325546,23.654303405263413,24.39437564092944,10.5002076242843,15.342141174224505,12.43888016056031,27.347397284989917,17.026208014923583,27.453960193246942,16.75422680077396,24.678738011451074,27.82513726492259,27.666034235978486,25.65830387527663,15.587105502531662,22.943680117233164,23.022440056812854,27.24638620977491,13.752825806597443,27.398335032115057,13.886885388812367,12.522104083055874,21.789790677380317,28.231113972280426,17.681878625524522,16.898739033684734,21.120842774127603,23.836961323182372,23.134039321499053,11.682105128764206,25.867455775578353,23.603208986413037,14.368659455532185,11.368682305562722,15.692093683594841,17.759691822954707,14.662159760648915,11.538415201538736,17.87000151341296,11.94651754827638,20.782670677152936,17.249875367956385,14.066324113338965,19.664531833451825,27.576605391642342,28.93621635604031,12.533275801416073,20.704676767975542,21.630086281213504,12.417816346805473,14.50641745570648,17.097872563493347,20.498532521808116,18.234780210794543,15.657191444630394,11.812432761504574,29.56425223278852,27.53575947641452,21.65855903051269,20.649812627625327,11.0777413258635,27.55445466578847,22.58118375697154,11.931202981597874,27.954501936533074,12.552573507690221,24.582417993904606,14.425977323696175,25.80936456147981,15.410118889046029,14.03621189207621,28.095517149129556,19.61018978226365,29.344090910395963,12.530676905722547,15.247156276032271,26.00220892405953,25.2112267435812,27.00654005480102,25.33340627369475,22.075409742962417,28.984582216643716,24.02723574563099,11.618357916856986,16.1102045601691,10.088495917968036,29.397608767922915,14.46820549426369,23.189205448516937,29.125925993950595,15.885300538425323,15.209064366709786,19.97390298684051,29.801535128556505,15.348090675512776,18.921313242137188,26.66195292615602,21.2237631412961,21.24446091888671,11.531457976012089,13.54007824815235,26.611057087590666,12.818665746924417,20.72669560405266,15.178789040209786,16.464691891317337,11.817406876274749,24.139796117016314,29.33996960566504,19.29300459537854,15.754799663736417,24.83408980450551,19.803030889613346,25.481209745708426,17.43452417276272,26.19426280108181,22.27848507351306,23.41620362281896,13.547886355395132,15.997121635883156,16.378715332634822,19.96947349712748,20.729391720837768,17.708165000521717,10.887928824613851,10.757894750560556,18.02039199092323,19.316090117853975,23.775381603374797,27.999120729410116,28.523913920460814,19.036763637858108,25.900159817556645,24.654153571329754,26.68154366040135,10.958922302125362,28.919838332147126,21.85791271966403,13.170018538262397,11.911299466376608,14.188749201314423,24.729120605732156,23.732291177028873,10.873184340851608,14.86721002831267,11.109072910588953,21.69500047565665,16.550723551341857,16.50457964606575,17.897793618650777,28.055995860258605,10.147886675054082,19.99450535282098,24.15811141745605,29.980383691425573,27.046780195499394,26.036516864803005,19.45009976227114,15.555080617395344,15.810494258810852,19.686437543323457,15.9642603758466,11.8367194426374,23.45275649746572,26.386765669070197,18.37571926155716,24.195345021664842,26.500444060142073,26.899883084771723,27.95488109376929,11.927269332742618,27.980599156593424,21.990490866216827,24.10176568340207,28.463082393245557,14.76803689064312,21.194679295730946,13.026563035733215,17.39522909796939,22.461747917997368,17.633466213743944,12.706135794430411,29.25931155737162,27.815206015351436,10.798942750082517,15.1087412137516,24.277461076537303,10.035591238929854,19.283027550382215,21.829842180635083,19.625507509110022,17.29209484560009,13.19283858312399,21.689999975187916,19.64983897157048,16.45238996189277,19.64796369588128,20.622496336934834,25.418560478832433,29.43861486973664,18.335368992888185,21.159392219895246,21.892259813867717,26.654897493868003,11.260376841703899,27.317086813157246,29.49135983008455,21.459257754712585,29.13814069764647,24.712626508973017,18.913516977332563,24.065596934253712,20.48126044127106,22.779115772991663,14.771685005628733],"p":[0.39230140354186926,0.008691967036166481,0.4499592611442491,0.5989902863899477,0.20414083957729168,0.07260040516186983,0.9568711249116402,0.1165954920422212,0.40762627951819175,0.4106135092741101,0.2607455918732644,0.10763932403813947,0.895456705170735,0.2033895069343843,0.13036166018056838,0.26934859867311256,0.9291661636649484,0.5492737054468824,0.3009720128397444,0.4245128475015649,0.12666307801558974,0.9299329095323126,0.3717688720074832,0.2829607555921363,0.29377841963031415,0.18827622826818735,0.7060814779217806,0.7189045188485368,0.5941589639338929,0.3055875224037137,0.3813888094275324,0.14028007621916339,0.8610070771911202,0.4658600980065779,0.9159545291631492,0.8210252644593492,0.34989915678876016,0.2262022488513118,0.49333304349340446,0.017858569769772847,0.11383651533625017,0.16486860548792404,0.389434530257446,0.2471041759740864,0.5498469160159383,0.0753413107119596,0.9837735119767521,0.16384420010651235,0.9903502712570451,0.6362115746562871,0.7812922317563569,0.6791123156346461,0.5253961992355782,0.12630849392046617,0.7370919257164201,0.05781634798081625,0.9842381895630647,0.36869264498582055,0.23065722881400408,0.6803202919078517,0.3997124394122229,0.050905805912694335,0.2940624858248566,0.5806965012024414,0.7133315738947628,0.5535379727737479,0.7056876708740256,0.8529341281265717,0.18523208609753183,0.3220363734893228,0.7071252250845004,0.5330007949358253,0.827444018012045,0.12166762816130738,0.20866777390432434,0.5416494286896367,0.8363606465765496,0.0613302097138364,0.43273207212515885,0.5210091764180116,0.8517744149921915,0.9412072866963523,0.24455018707185605,0.9611115669923882,0.6809452008798398,0.025080603612597452,0.5078919841933676,0.36533102106556203,0.7773296239531247,0.7985669274290113,0.8681338805766676,0.1358425098583591,0.07903707402239779,0.7263645884319865,0.22415144355997718,0.17419622495992027,0.038051710222579915,0.5422584129234702,0.0869963444629911,0.59950928091218,0.6503065306087614,0.85806240020626,0.8950116385161724,0.4623842268840157,0.687321249381061,0.6941151674081538,0.6356234655883695,0.8516751797211108,0.9629951479968102,0.6457472587181212,0.6046536310547055,0.8853939908134725,0.6934032971709714,0.08659591206576067,0.5332442446554546,0.16663572724913456,0.4023612612873666,0.5970638793829677,0.08653188751900975,0.42531161307451204,0.25699255705634694,0.8575975381408345,0.6805463546876855,0.5122513733291547,0.05495366350122799,0.16828456543466164,0.09988366291073802,0.7957745536406409,0.9036386391778193,0.04203056365402613,0.4329631352427996,0.6715016011915729,0.030968528107916615,0.4517762360357467,0.22307053830713297,0.42621295263389847,0.6543201887568431,0.6916109635345304,0.5293547013942947,0.14288235142227168,0.4556636149082869,0.949611237621252,0.18996106829933113,0.23895556201608503,0.43736600542453474,0.8565738693746721,0.6226542427130466,0.17336981170119525,0.6231822490202688,0.45362866090835974,0.197961356525592,0.2828285836386306,0.9961179148652202,0.6182157763696916,0.836658150141061,0.8164014915530111,0.16470969932154578,0.3861012882942114,0.9215206623308609,0.8885854006591429,0.4718140041308221,0.7982295244560074,0.6686101215423914,0.9545700343765686,0.36397443209189073,0.8776965309606051,0.5510396007427547,0.22694807759202118,0.20236003406491476,0.8619092767981549,0.11907926117307643,0.989028751571478,0.28844265827115456,0.8886294919361943,0.6045849032621411,0.11323890267530246,0.07684362436373693,0.43685791642339233,0.843297126081044,0.46166411702980215,0.915447201395408,0.33563954596626466,0.4362547989181027,0.7459831814370339,0.5042245908342575,0.7669295667387079,0.4520338301203468,0.814060865097276,0.6000847992937575,0.4092000877108066,0.8976583411876806,0.8286780691525981,0.7140421670513644,0.9884943909787824,0.9374617129224874,0.1804209098248548,0.3668277639194908,0.0720425119767163,0.9594244241530656,0.5940763609730644,0.4490633570208036,0.9070097755947646,0.35095150364858796,0.5389803103731381,0.4385837445384073,0.504810214931906,0.7749628211307393,0.302285858611014,0.7333185719183606,0.6663281204038696,0.653824863460803,0.28798145415994325,0.6111750156180717,0.6660290325156413,0.8251880247432859,0.5297315629741604,0.9890395627334341,0.4676302948197333,0.24130033487317037,0.28923554474430313,0.7809793459633165,0.004352222471065259,0.9714852639304674,0.6751848848969091,0.07734478600080341,0.6818252349583538,0.3042746954274127,0.8538695071364353,0.5570037019028362,0.686844219846882,0.2099943652980949,0.6848650157480647,0.6411283256194584,0.5493188932212336,0.5776305312622434,0.5521321886315662,0.655948602059222,0.8213459035744923,0.7204768420361454,0.6347249137673221,0.7854428847712893,0.04152558337086365,0.6966982030412272,0.24486034754993624,0.6181277481074154,0.8041148646229259,0.7022054343285724,0.46181607895278387,0.38594888022355933,0.42369226995652776,0.1728902780927719,0.3502834605117955,0.11306587882433927,0.06985113259543696,0.7874275596495011,0.8770836722573492,0.8204676238077757,0.8468253198057498,0.7949765725125533,0.322325025891699,0.8678154514875029,0.7230833073809864,0.14372115283055198,0.422266112964627,0.40107511684968733,0.7682396521145265,0.5853423307193291,0.1604241985228516,0.9572038350614251,0.4098231917971722,0.924939558018999,0.28494199902581996,0.41299430973399653,0.38905482148015236,0.7937380308637134,0.9780328569044598,0.6736127561384926,0.23526060369841595,0.23783017927047667,0.05665806880066748,0.5747577174400926,0.6485211394155963,0.8541278122084517,0.9250767289935624,0.5125623897828031,0.9286105191594598,0.49980571525549133,0.8720257934980598,0.7374074664853185,0.06064942062343204,0.01610306961301,0.25965410447562776,0.4145033684070203,0.6079039528336732,0.9572704029388313,0.9548948555185217,0.5615617485155555,0.5739318230816253,0.3586821132124347,0.9583598145312227,0.7309586901887677,0.9889058585092583,0.5814149428305995,0.5013753769039881,0.7489015811139426,0.0691853005239047,0.796929180661353,0.5793516117439652,0.14225103185720034,0.9109999493902574,0.2635629139353095,0.8348858120458507,0.006998793006980142,0.9262211673282494,0.07068498272409474,0.2152532190740748,0.8203420025262851,0.26795556582846225,0.06976699389819041,0.062250604177221724,0.7242189428195123,0.853680590557147,0.2596249175736767,0.9617791256158472,0.03622618740884875,0.6742063878692628,0.8877284579880149,0.8106842597571897,0.6286327904840388,0.7535886946760255,0.3531351501302262,0.03228913085883445,0.2817748145713379,0.7972458774078022,0.17747332821333206,0.7703643956273509,0.7271230034879683,0.7987065060442273,0.5816029771158757,0.4118719535548532,0.2580713461787565,0.6646323098465303,0.07665843288064567,0.6593326112003937,0.723571199212762,0.21181323012641706,0.9213218454848477,0.6193487751669606,0.4386361026894823,0.5467101853643443,0.16991323563498772,0.8127751900209639,0.12858138085298298,0.3174675825969464,0.6603200334479629,0.40176445628108604,0.9029185201306706,0.23684015651179058,0.03567759465557585,0.07839222151290404,0.552055789617,0.962657143167537,0.9963218387966128,0.06302455321277001,0.3830710238961319,0.2125035490125322,0.9947267991933562,0.4525554504130396,0.15845562175923877,0.014628241311168466,0.9996123677455677,0.2724429672013571,0.0031486655558885523,0.8274334115290936,0.8788537976701483,0.7140605022436304,0.5694748996686632,0.5489059107658634,0.733046452223393,0.8929468816926343,0.6003524352659679,0.8741216475129547,0.20971654917213467,0.607088523338118,0.6467536620820902,0.7839744996607991,0.5597443250433549,0.31460994314276913,0.1524452891842527,0.717157816178728,0.03767606423540659,0.8452468170375826,0.5079163616325753,0.07020287873925168,0.5927591788074862,0.140433193376857,0.4852191231147178,0.505851980362634,0.9209795769464288,0.2022251757981155,0.8866560286523009,0.8131219117877218,0.01952582295449412,0.4061906162182327,0.5106466115217043,0.8067445179979693,0.6371968888765547,0.05556182325239756,0.619483765342951,0.48376388057039144,0.9216885966057757,0.685367668828534,0.22798184755256257,0.22385023243208746,0.7732880363981207,0.7795683570349536,0.4369390106102611,0.7386506363808751,0.9065227007046619,0.185259057388665,0.8486762863104773,0.799055237937113,0.920230747877149,0.10705766387674487,0.8406935663558122,0.8078716024246826,0.03621777618248667,0.10180352219286415,0.7298653711439773,0.8765234292527218,0.7564944174546606,0.06705445078808148,0.6332207145154221,0.8262638345861879,0.9634155900233021,0.0633842047709181,0.31189357921269756,0.5046630524067255,0.15816595472115846,0.6557470342777527,0.5345995967056159,0.651033599210487,0.570833616291234,0.08913824964139083,0.42199928888601135,0.12901445533937905,0.34217298967423937,0.8986043564707209,0.3658717064637902,0.21894310661988592,0.35772839786852684,0.2848519678514738,0.806880878306349,0.20144984684421963,0.21297961219631634,0.23098257895795582,0.15398560507605263,0.9843548027145277,0.25541602963260557,0.9520225618240155,0.6414657163014568,0.6720588887933576,0.4409299232821384,0.6205828180258641,0.918898906196745,0.4346830751964059,0.1918371230593805,0.7015501310662609,0.2605354536302562,0.27785534042754256,0.9838305709038939,0.9559336196720025,0.6262859341109868,0.5410881255552615,0.6014619466690796,0.8722990271439599,0.35999251400971066,0.750846858566635,0.4992247513291064,0.2840288604128587,0.29619792062331984,0.9147780837875394,0.9269462855221919,0.2933003717751348,0.8687806024192983,0.04131414195793859,0.5764679698260291,0.25936983132626135,0.13720611106890446,0.21822440926260178,0.9776448933476012,0.5155274050001732,0.7906999471975682,0.07647668729202528,0.11944493556267077,0.4377246450811567,0.14229511341241707,0.46063600547395556,0.44798976427011206,0.597921063232401,0.9606299100639477,0.6538461780633427,0.3480284065148578,0.8838935686607687,0.28141278109626944,0.9939888176756237,0.054640609158213005,0.6601830782110389,0.5100663751451793,0.0126120878039373,0.9926264886712937,0.7828903933685007,0.5203917000053428,0.2402709505294669,0.7294816068048329,0.6710452066922552,0.5174837637566037,0.6487938316009798,0.17645774092927358,0.158275583227226,0.8157317379073514,0.7263507262981013,0.5904236020506248,0.8435703131303642,0.2917825397740177,0.04191911957622363,0.726277240631205,0.7762881130119106,0.3359183118711899,0.7026301949941256,0.1579583916916938,0.399070121687761,0.5987089065082716,0.6314379162639794,0.9394725603883931,0.6752026872089694,0.029402953960000255,0.7020599510598549,0.7298859890502853,0.7931091564746444,0.08600231564406102,0.9607122570706719,0.8588300438716387,0.5461893355798273,0.8072649917545673,0.1945548999800395,0.3817178593949053,0.4396005081906662,0.16080142041061363,0.9471827206792045,0.6128419487669925,0.29274313676462116,0.01032273626934832,0.6966241310967962,0.18498968046323983,0.3570125302813074,0.5865509746563511,0.30655526955304424,0.45552192532342994,0.9537143896990994,0.6944718206774165,0.9983918553705391,0.7490375117215116,0.04479584438278117,0.8550632960697222,0.12844548380515364,0.4780370230742992,0.731066896155186,0.3362734293981373,0.3698777011839336,0.3170937738148163,0.3316405811165659,0.4560942998628845,0.2789002392328235,0.0512622970628267,0.30231912119764615,0.4922148008474636,0.4740140802749895,0.10617118041883522,0.4848074184496063,0.3354154196355559,0.516792189311079,0.8494428194715373,0.8446248358169584,0.5259011903628783,0.42674619995009944,0.5712861150162496,0.3543503368611163,0.7551449509770871,0.26132168507617615,0.06063315233587829,0.4348733309530075,0.8789972613736357,0.08446451261203802,0.5434365881799375,0.043476194345967833,0.041570330520950716,0.1892393571194706,0.8804881926595822,0.40999748484497056,0.5930969942226201,0.3955790030793085,0.5049928926138108,0.10828269085561226,0.0875051405088918,0.9352329398166788,0.3714036723304548,0.4782023164234681,0.14274871610888007,0.6808592532984006,0.4786427693868216,0.1774731616382874,0.5061777619850525,0.26472589428827487,0.9745961964543921,0.8817185618635339,0.874683110580504,0.6195050967205089,0.5534307848818119,0.2892474286411981,0.04203238410084564,0.5916900703152388,0.1579525203094212,0.8902345077556411,0.8120374326978494,0.22841297494641344,0.27049117490188057,0.24657454043152405,0.758838453023631,0.810561732936752,0.24928353293761107,0.7897614335070102,0.7754041546901151,0.788855269503328,0.23519913564393025,0.1532800275556243,0.2519070957149787,0.6494681096780317,0.7866933500969975,0.29023402766551754,0.11469509738598904,0.0640388497074964,0.5318161123990042,0.8217833908248584,0.053361625240328836,0.014954280428721711,0.7790397514361209,0.5041557111361961,0.18444640134998203,0.9159408384972001,0.01538002611145628,0.43452862981736806,0.3040937371092267,0.2602545747978353,0.016745541434325606,0.26958056444515766,0.16573724511818377,0.4726307239090337,0.02968062196252097,0.2375825655482655,0.34442986200294046,0.02605862999448605,0.5088156802865007,0.06047229307352375,0.8680070143150116,0.7480609293442768,0.3395365853295167,0.344796256857951,0.4570098482909035,0.8774640666022187,0.041508699646706226,0.8603776282627282,0.6715495809471481,0.8384406330828937,0.3839073469075085,0.528070515469097,0.6494115016924984,0.385732896102837,0.9290174579957868,0.29679763567230166,0.14271634772641772,0.25857761344017427,0.09749982613762431,0.4884484759981613,0.90730028150306,0.502854715106015,0.053507371377754964,0.320679184229794,0.9041391685825497,0.5322795179939908,0.28677709248605643,0.6348007960180793,0.716889837243686,0.2675895336382894,0.8259317228823937,0.5368816969655459,0.06710744661923429,0.2818062357914446,0.9626015395747869,0.05014289922584014,0.5133256164665623,0.6417786918550454,0.9626255566087094,0.2831040392299935,0.30338543819773456,0.7396033686146564,0.9275651882309137,0.4156823100861551,0.32534478919514087,0.7428341513543344,0.7745788853056153,0.30747547014755283,0.08793653288350778,0.1474761995423448,0.7994415235732732,0.05369735546304977,0.6853232162484639,0.335581297858931,0.5931557224019302,0.794350969466098,0.5660741183074032,0.17539368916624132,0.0696602685448664,0.6988173638090232,0.6142941885678546,0.2595302543199942,0.41004968227219996,0.3796048158531209,0.5565695737196457,0.660095279325138,0.23576620821902083,0.3820735339345307,0.5328242829566432,0.8941788197897156,0.7612037708647887,0.010446209413708107,0.420284883601461,0.9129130038169846,0.9259478069680549,0.8125251783347225,0.7095746615834924,0.4909017156321802,0.8188116228757332,0.7535115259766307,0.5320140630750521,0.14143965750649645,0.6370124470571654,0.3540995905865094,0.02045011901878624,0.30054341402230933,0.6581931670922088,0.05623697101907843,0.547729400027763,0.5625165906317009,0.9002701283113912,0.11759477144886699,0.333239945777422,0.14176007740936925,0.004679182981983887,0.20439961801174977,0.6651646073778879,0.5946938757470925,0.300550485847654,0.022560549586021716,0.25549385157179305,0.7371009753796012,0.3494836944140256,0.2647242720557492,0.732258115069107,0.2544729716869798,0.5955264090417054,0.7566176408419323,0.37606933631332584,0.9179900520755104,0.1920181831159946,0.6825240886319006,0.7555151687406712,0.6985727474586974,0.2596400143972366,0.9172085859915633,0.36556729604103344,0.6517207325712535,0.30753616190068733,0.422665479567222,0.6664754649572535,0.6959425022911581,0.16200105793116548,0.09190597120610633,0.26893083529493955,0.6850531878079775,0.14234565478720906,0.2854867546876443,0.7478737261858075,0.6520155006229926,0.4776785356188835,0.8472918347216452,0.6181710817698862,0.6459194054159003,0.4602824965177863,0.9565496667393181,0.6967503461467104,0.3787296694032085,0.06368413123826766,0.332318804800976,0.8135392136345239,0.5509989175096335,0.806600817943671,0.6956225788368826,0.7760622439312248,0.9528305000912167,0.464678216116557,0.1991583503682104,0.16779736656363697,0.21004991722054234,0.06649280381962508,0.4225147587563467,0.447683927215192,0.42629163962662764,0.9168362695576073,0.9864663454068106,0.28062760147749777,0.9073888074126764,0.7332683404025062,0.2372559497491631,0.8644352916420486,0.2845240954902408,0.024458700597352667,0.10988954921737526,0.29159096853241984,0.4902383151215357,0.812414471784987,0.8630689551675943,0.9848554273203101,0.1265394978575387,0.44355411132496125,0.2234432397387689,0.8799252690813102,0.29102921730214826,0.9589909322951746,0.28613134145704344,0.9908811751671911,0.8412354483194424,0.7742116240581174,0.7501938728211044,0.11432580195345432,0.1244746229911331,0.0439457490269215,0.7838779653422383,0.06837425459876267,0.1073364112354196,0.8002085672188248,0.28807650284914943,0.32858333920644545,0.28751572703547,0.16962563985756307,0.6846217156207928,0.01867417830957141,0.13889245450923693,0.7416125723691291,0.9393363554892447,0.3436721641197127,0.23810889651585287,0.2230001608904415,0.8596188636613942,0.4981511633297049,0.28419281054958656,0.37783232717389503,0.7093497065222594,0.29271365078512535,0.25039340019469036,0.5120448706161358,0.5435361440905506,0.810221538846019,0.42488123470016315,0.08163140523871704,0.5923850890183475,0.46365483956133535,0.8646245822659548,0.8712009148449151,0.33552397737754824,0.9069038555079021,0.8817299788740944,0.0641851804913629,0.8798572608232205,0.1592983966176551,0.5480796158241863,0.5495965697595249,0.539415373594605,0.3054308732551376,0.10615918117635048,0.2513324553270697,0.7010104037025362,0.4687466658181101,0.9215412470315911,0.8706159170929144,0.5157520707141032,0.56399661844785,0.14106935154467815,0.5742551829320544,0.27015089411116544,0.6498242130425615,0.9522081005306804,0.3467267272762744,0.8479137832326291,0.2624230073447036,0.18444003221265026,0.8782520324397332,0.2159764186220281,0.2655766638662804,0.5642228956978392,0.23809478209209378,0.2806021478672489,0.22267967567410496,0.6819402277512794,0.9746251347729595,0.6795559599618781,0.04827191242547402,0.9004602215656132,0.1737005649048784,0.4938851575842149,0.44146478652949694,0.24928905032273896,0.08499169263909434,0.7861409484614248,0.3675255509290405,0.18637914766853947,0.2168927967767218,0.12561173029928985,0.7258679969534003,0.7734900344059097,0.22597004867810888,0.3227034483800282,0.6705916485727093,0.171464071587216,0.8112362743866119,0.09975730956007678,0.4605238795976647,0.39372459742284494,0.027538804246785675,0.45126389648896725,0.8588299057871907,0.464585516242346,0.3832730588620208,0.7634951206783662,0.9983588184990477,0.2952061094433127,0.637004569561715,0.5161673113557907,0.2427078027015026,0.892658303913848,0.007779611363622152,0.4193473465797293,0.05479623440964776,0.12051248389357627,0.10100549807902892,0.5098768198038073,0.7366454175917376,0.25150584803124754,0.8299445932816287,0.0853480457235154,0.221473637894412,0.32647933197503076,0.9860235677356692,0.012702633523848927,0.21108534218567798,0.3367294811007666,0.4760286689424016,0.9424263998733631,0.04693049180276576,0.9323697619001585,0.8317656599435537,0.23727288526363322,0.719111810245707,0.14301747307955437,0.0931027491388785,0.22352615995182212,0.14571502433502825,0.695702023996253,0.46151113714248315,0.6560041134684387,0.2791656743207258,0.09826151375741965,0.6354167214731108,0.1944484174699448,0.20982560981282905,0.3988635993938072,0.3082380601388761,0.23220550419167751,0.5376078314728607,0.005451841085723608,0.2317538685439502,0.3445883470171187,0.9698446590685197,0.5760607542948948,0.25741761963224974,0.8430279025451806,0.9869543091778938,0.38686409138972655,0.7250776443199478,0.8101201649957177]}
},{}],29:[function(require,module,exports){
module.exports={"expected":[0.16384650272375909,0.03857586268469612,0.2176223431300206,0.6086201578704951,0.51536815068085,0.4710895178901288,0.243753492995541,0.3468830595782349,0.7344276162530541,0.1479382257674601,0.19809927439137404,0.39431141405316716,0.07491691489537776,0.27472397409359645,0.4914162116859333,0.10974014357855084,0.034106030630685756,0.20842326075944773,0.24239014718189728,0.3534560004473939,0.18950920312568584,0.22519610983790544,0.3418402229281635,0.3252759838088899,0.5154030048358695,0.024064624569582783,0.4826464025879695,0.2637941537897282,0.28754527284148135,0.14965273019599554,0.21065545113616874,0.2570865226075168,0.6791374395931783,0.6275362622791261,0.04923577742499425,0.48678295153274387,0.71856788004721,0.9232646850336359,0.2954441351015565,0.9410098367993994,0.8398186725826116,0.6649945630184118,0.16866114151191097,0.1296174772752834,0.8351131503919502,1.299107693707437,0.40242791054870647,0.1899873043583939,0.537661848698691,0.3050214685948507,0.29807318091788604,0.3070125578261412,0.3704300855274609,0.25553728219749894,0.07936899669483778,0.3082262150269143,0.6205676956895058,0.4403319765344685,0.5338787985053105,0.553391942723703,0.5092566859739228,0.0573130180440161,0.19461931993822348,0.0357758854861384,0.15396468751055514,0.5365902618555299,0.22489438641066758,0.15489815708095356,0.2616226310618515,0.46986553847673906,0.1394129943902903,0.2712641104415977,0.4240414866367969,0.15805624031600302,0.3801058971235695,0.27501810972976465,0.3661885738202225,0.13030980212125554,0.543535968417222,0.20202829209466674,0.45640990019372096,0.5163792630988969,0.622645883467528,0.34205088318899185,0.6130200389089491,0.059746243775477506,0.24022048056142103,0.5796426709872331,0.170557149325925,0.16619360539819705,0.048715131221059756,0.45735270945850975,0.09282656573896719,0.17249857659484535,0.5046579200425121,0.32497098551323417,0.668994321906336,0.9555898037827325,0.17551630117303352,0.41052913306174404,0.7625769583533885,0.1726801492261331,0.08777209093396497,0.16056219085824136,0.4089816240245757,0.12913266623682063,0.06641996470792962,0.5633380429881469,0.79823792768046,0.6497301522509075,0.24362225041800026,0.009385536556276478,0.24481853762219158,0.4390893593576385,0.6693884467495707,0.8337183423023139,0.11028130368739095,0.2314376125949437,0.1238939040456412,0.08469049917844082,0.030084653753099985,0.4081104325327487,1.082200153549581,0.17450477412569051,0.5662939241169561,0.5866919924579128,0.38066512477517167,0.3918739412115472,0.6835544670324586,0.9548912701278773,0.2990655024831168,0.5016402465156334,0.22050509952538716,0.14041149023502258,0.6266017873980932,0.14979168959912886,0.05893110732527052,0.05714502763950028,0.23841385460249567,0.4615608020179395,0.4637901132586055,0.25103953606054435,0.13982153307183323,0.28667114886738887,0.13481810745964615,0.3898268478259381,0.44444642886869296,0.09050967507739051,0.07993246821964524,0.03956470097274233,0.6782325141732886,0.17410890319855685,0.19623222948716068,0.4290436957214008,0.507772241748555,0.2345256548757071,0.3352683824441466,0.270432002311865,0.9965594250801835,0.32831100069238023,0.33473518164893884,0.6590586830276487,0.6210204504952038,0.06802329244766353,0.5233470070699829,0.08261297024171982,0.39584314273859134,0.051783498843617146,0.5444219314977086,0.31302632363569255,0.2320481089792385,0.24285810785841383,0.28616900277993573,0.8075612954019803,0.46588871968228207,0.1335114491859985,0.2998062213934172,0.4586137365604786,0.5361716908059924,0.22430681407644634,1.1133939254089043,0.39893264621879165,0.4248377914201817,0.7456669709734467,0.16792345842906603,0.22226586579180208,0.35648078481568046,0.5788614539531021,0.6609555977174658,0.8731362501404353,0.6886070620717863,0.30075653997411117,0.958595971638198,0.06257551913620159,0.35119783053154563,0.24758731697220224,0.13157371673594243,0.47191754092954924,0.2973487206875889,0.757051339398224,0.07086162406662722,0.15832920904956355,0.06068523816126787,0.010607147758274257,0.18847713128664348,0.1738826636599748,0.09552795960878854,0.4887373558631254,0.004252084933369402,0.1962037147764199,0.45599114042127065,0.3289300472790423,0.531989745924137,0.37895655068209666,0.33233913373816115,0.6511620816768886,0.12496991600227457,0.02581843889555058,0.014832555400579131,0.5734235670759966,0.1930447362235641,0.1601946500594945,0.11319571119384587,0.4302900073757763,0.028840314159197664,0.25078364059326735,0.52643604917346,0.5144277210750424,0.05320336722998909,0.3383819801851238,0.3648504237288132,0.5811677046084587,0.14785384854429448,0.6151858818816082,0.42841072770732225,0.6854367224746805,0.2713867504258415,0.339400658381161,0.7539339316893959,0.4069933972462574,0.4378134672654236,0.09265971829167223,0.5300310865617441,0.7066627702009022,0.5926784221126423,0.6654618398109581,0.016197392804702875,0.23348583232398998,0.6983345214800383,0.09673713045636753,0.03775653693647538,0.25595060804726316,0.32163410157027394,0.40611487229304755,0.4403334823244521,0.34552880369350314,0.4855402250594072,0.14123277585786817,0.2342571114612859,0.2688313044810113,0.12835284668379535,0.5705311225132523,0.1725014327215877,0.9895942881092396,0.00477879038247082,0.5488353474150159,0.05702188348242413,0.3244512671676122,0.03384793694399165,1.3082155802585373,0.07185270569644843,0.9040049478683192,0.021092084089631345,0.18669061519902228,0.1372045288794892,0.7312859290769602,0.4260135457223993,0.20806046779091608,0.059933765156019066,0.4209784220988655,0.3083014092186144,0.35060032181974987,0.3497590561610344,0.6261087481929501,0.6511499272594207,0.3978164594562682,1.2441948036493788,0.4377026676606023,0.0515038852825342,0.7086705396286256,0.6598510089797655,0.046857952236591456,0.11133472273190487,0.16661811994592696,0.7279642480437374,0.4869073072084357,0.6735305660215598,0.10813009335210792,0.3363437312058065,0.30758191186837563,0.15631543693691632,0.08195774132130847,0.11228738254825768,0.30213482028314664,0.14572612188759998,0.4976296929016466,0.3807201899981914,0.43472034710937774,0.09413045605821484,0.21631110264834863,0.3501303805673106,0.26245626236592656,0.022168486012735272,0.7354908280335545,1.0008567727593,0.35613788031420945,0.1145952807677178,0.7581174730535912,0.12053353618752785,0.15603277609181843,0.34155630823617955,0.2596313676015075,0.37803156944953187,1.0453502276379474,0.41374620127584527,0.045483288209176395,0.6692221601609727,0.09292049619736088,0.25922882223063864,1.0765478391991274,0.8222032780004463,0.7501163514987614,0.35275502243614887,0.5585923722786162,1.0542737406998088,0.053905248970917474,0.4225727476475525,0.7860402798016147,0.287057246251615,0.6456852756820696,0.7141455763872899,0.7365758346367255,0.522798051760177,0.18201653767933093,0.2348958839721356,0.4680169997726434,0.20566581876075854,0.46402505952354617,0.3092249541867486,0.012626682100700592,0.21742180626613114,0.3135356441365327,0.47601495693693224,0.5157365679046767,0.17276697819365383,0.26728212877720703,0.1760805745449421,0.03267438726059899,0.5248410327428321,0.4338486097957836,0.06726311771698947,0.6511406912805342,0.9580966060787918,0.3950299240456611,0.5231475737148368,0.35781118119907906,0.18146615552316175,0.6063367448303549,0.6119307966661076,0.7205599398959935,0.21058231228223515,0.3874316638176693,0.5221147904533201,0.5289586973902886,0.3533596167234088,0.07868967798770106,0.1024581822612328,0.17278912318496953,0.02618223350353459,0.43135285602783413,0.1270363249324566,0.3201046140781724,0.5544030261986008,0.3058921083684519,0.19616728633488328,0.24328672439831678,0.12074434398428106,0.25398844027092615,0.6992095965168057,0.17007296751049655,0.14946177492733762,0.22167449642611084,0.3536683138314469,0.264326933323876,1.0067317577340367,0.28952483977718163,0.04078760128820141,0.2897173904232786,0.15305688994996322,0.12932881318659267,0.08528611883929023,0.19496032074495534,0.301964331119112,0.5897020659148621,0.11851306082582175,0.5478862707081584,0.12606756642130373,0.39420299840285755,0.6891084231521826,1.5932306955585818,0.863339350745343,0.015615982127440744,0.22443404856469915,0.29207465135300825,0.0868011649191977,0.0108097172603591,0.4121807030306214,0.248664728047601,0.15425003176820815,1.0748585571137619,0.07361232939619106,0.6948798321576998,0.355605188057599,0.2685079974974033,0.037614716444560714,1.1781943683584224,0.7848949275964262,0.5550145439740244,0.24749648027942617,0.6617301054045601,0.21360166610056855,0.12641439345565084,0.20355007759619292,0.562208624273853,0.8218424044370446,0.683468936385859,0.006357736012805393,0.4097844282112684,0.5918567018268942,0.22691467358502634,0.4348608108805211,0.6610420857467041,0.2094082805783292,0.24826259551206925,0.04292018555114897,0.18695433242284465,0.49647541729343875,0.4047650928397014,0.37989651122737045,0.2750083823498099,0.008894032981781855,0.9069048062964297,0.3700335078538429,0.5097636762132857,1.088926200419159,0.06108571444626803,0.5831803244687055,0.054920338230330566,0.2692681854857295,0.4568174072472633,0.22872842270615779,0.7177356482098742,0.6120131688030426,0.28697564474371434,0.027299688246978152,0.21342019222250483,0.19101515057113705,0.42755249548496843,0.6790843657065386,0.4849245070166787,0.43317074851083326,0.21249485566527265,0.3789287937020359,0.19134179196966455,0.15279228856554483,0.1871594322740282,0.4972658464604,0.24833228792499235,0.5777883210169102,0.2916590678602724,0.8011551836470354,0.0712929669764913,0.029927125069851047,0.5789478687628451,0.36567453323548127,0.5233093355876203,0.29316768749163663,0.29687456153642144,0.051536088508332224,0.27454014350748424,0.032278680570995574,0.6268756242904806,0.6931628371631186,0.04075222813519743,0.657293837226585,0.09082163565794778,0.6287702878522311,0.09286369770508045,0.45293363928578834,0.2099775466964756,0.6602059613438243,0.47197841537669843,0.5911614616450787,0.7433199769876875,0.7271915760559131,0.2522884699885597,0.4865072097147938,1.1142679817676213,0.38946898323363077,0.6093463191529745,0.5433718076792403,0.6264128950563954,0.48171281509177644,0.17824897143516225,0.33201053596818075,0.454098171049722,0.7009876151400443,0.25130685098995587,0.14148613337239127,0.361415272829432,0.02710388648321263,0.1654388948854975,0.7518089257460414,0.31622098063924775,0.43806857670076615,0.04750278601121168,0.44054818506513754,0.012320561963742323,0.045192393636991623,0.16385448177793208,0.21730477851727178,0.29069900011473926,0.4012495241935656,0.0013172421214332464,0.13247611439001275,0.24285940652398555,0.07564467967777586,0.5268536362359034,0.6650305095682599,0.05985992765742935,0.8373863936283547,0.05286660262933139,0.25654348204794536,0.45463392600230135,0.5709872505077457,0.44856714039289886,0.48438055056393053,0.049704749076012716,0.7555334555159304,0.7342397210519769,0.07691569253514904,0.21290029827308746,0.1581716554809333,0.5592685912124099,0.28408153185463964,1.1398700658808698,0.10683346056389545,1.4323193478939031,0.13879462564256734,0.5520297951130444,0.49225970349733095,0.4231161453802972,0.09952698189256229,0.06828323532949486,0.027636130832325984,0.2760516716287636,0.52414352306461,0.7399045066087595,0.34069510211838305,0.23711273412193243,0.360032112323873,0.32749895329897766,0.7286654568270903,0.5950358786070398,0.5571700767967807,0.8461641352332961,0.4513188187917725,0.9430310939940798,0.3687332361573987,0.21994643354127721,0.2343244843559852,0.5703823275874947,0.3793022927856347,0.38183530492325946,0.160373266769736,0.36862293285495473,0.5179252854777001,0.15513184761741944,0.3235728353938038,0.8728939921506804,0.21550310982526738,1.3852288746728845,1.177107343487712,0.74246439312118,0.6860948123735778,0.3391303187293327,0.4875656264584004,0.032692094299552305,0.6710554938236477,0.37610573280161846,0.416533675357468,0.18755078895610036,0.09234797034955254,0.8179472564326115,0.8476284857607477,0.24551307490427005,0.21909078284519826,0.6789148226463623,1.0215724885910076,0.058641682385177536,0.6999447626234211,0.3563441066981691,0.5658324496176279,0.5142389252213612,0.07808877347612803,0.1910029622578702,0.1897167779210854,0.0597139514223705,0.31670350140324416,0.1350699360160205,0.24995349253569318,0.47467685780193164,0.2731382583356803,0.5323491491460155,0.20921457308991642,0.20643001870488348,0.437433582773092,0.6648138943455939,0.7575172235497342,0.17279595347544263,0.9349458735321295,0.2907722964479313,0.16023505642895527,0.45087112732401424,0.33573764763589903,0.706261027055584,0.36640835158008855,0.3343176117358288,0.41866374187338934,0.44417897500963505,0.60075596994805,0.03585311319062673,0.16530099066890566,0.15020896472246162,0.12466979043582783,1.0109089958674002,0.09714143648365522,0.03612751347660997,0.018884812117847347,0.4178271583276028,0.3467075979844491,0.7313589570578507,0.9296525757248953,0.926965283677319,0.15529135161784666,0.28424321524086216,0.6103320208770785,0.29446035674875964,0.6239344576171241,0.23651977441068853,0.6472494396383935,0.2287611676215883,0.32078431234919846,0.9254562846367475,0.12033684676429658,0.8483102823233354,0.34619296972409225,0.464125417162315,0.5458927400460328,0.5872052098993175,0.6493343839304028,0.07550691447832975,0.2383930929050382,0.038550773276348295,0.2541152171504018,0.45275792240730894,0.42986477138744383,0.4642014822431446,0.7602248984318687,0.28118719062512026,0.1598961600327367,0.13615810548122328,0.43371394623745696,0.4229061851424003,0.3552207414128951,0.14672340981454682,0.5746804081352662,0.38414258168044596,0.4572142662243878,0.42974414865710636,0.36034835144485644,0.47468644289795375,0.16543161365894163,0.40391213621459654,0.9652706665250874,0.5949972940585053,0.3382625494502782,0.5727999881062381,0.7998544342833339,0.16126249341727658,0.0828319691088622,0.5047010851087816,0.3524272373420688,0.2739167831088048,0.4503972526478912,0.5398946667375801,0.08867433887688207,1.1344540340291978,0.16337585291036633,0.6697993451105202,0.7091813959080671,0.303111981863534,0.0879464756125301,0.009652756834648411,0.1271287229577479,0.21086117436064725,0.8938826890991391,0.14081562361135652,0.39498802161986224,0.3199479261281681,0.3578773798853887,0.4894789231765605,0.3709499576608911,0.010341316367923747,0.4834669704628566,0.28974359394856236,0.26749705156401754,0.33779626182965167,0.061845704015185715,0.16783065748800252,0.540704247157412,0.1525781253657014,0.030969005243892345,0.4466455985800174,0.5751154891446039,0.3689754416968352,0.05651572226551019,0.23552368759411502,0.003016573700363748,0.9177447628968683,0.35428891072429647,0.3106769100266328,0.2165606959018936,0.20486400746560224,0.07894912596619329,0.5449254267822401,0.006975803498030752,1.3077232231172287,0.04003147311953058,0.20303362974630806,0.2675890464404655,0.003055313580799059,0.5854361113753471,0.04109057742247833,0.316964238788625,0.12529736079500692,0.13297807795621236,0.20697690848150868,0.1330996492941089,0.31983139761575796,0.16447183163996557,0.5063787704702197,1.117546715709399,0.24271612380605864,0.19397400310796195,0.31863156974750534,0.22382041469372402,0.19970648581072775,0.28336485334097444,0.1828519711137145,0.20467011019741665,0.7136705126185967,0.07895660019970038,0.1922525432875208,0.29554601751840553,0.35410288344175717,0.3007792418953773,0.27183300220918033,0.39422847162106106,0.40727269833861784,1.046050109754357,0.009354725100678543,0.1474961988977961,0.4643776003619423,0.3939412790281003,0.5005494729848319,0.6273417684824729,0.4307350974613414,0.23989039203754106,0.397107233255558,0.22770286834319192,0.10570150644268514,0.5686425549201313,0.03255566545060422,0.4135152702022525,0.20537012793943815,0.21096835178754997,0.8404851399176503,0.25474306626347426,0.10435360332699482,0.6480118841783452,0.26361893501766387,0.056835165798476764,0.9151863798547697,0.765807244065687,0.6842033205648081,0.11291517406896326,0.6349953313768891,0.3579731786783271,0.5232678930771419,0.42357466385720144,0.00906668602607943,0.6322270044822828,0.05117739736016033,0.16792907212806424,0.39709723964903254,0.07136807009393963,1.0154609089729105,0.273129903579473,0.322706575089323,0.37408902199075617,0.10064653624223471,0.681782722270787,0.18637415853914635,0.25662760914897925,0.27309563803948517,1.2914689353136817,0.41578541826238957,0.5167029784187662,0.37971640940492224,0.011697954816356049,0.5576374149205435,0.224404165539844,0.9439492635306734,0.046090201401521765,0.36446726496166837,0.8116374706757433,0.5105165558898842,0.7471543054277249,0.1544475073038065,0.38785730876035823,0.5671282065090214,0.6368030807601682,0.4172477305406147,0.4137075033234754,0.5730522037033919,0.05236957675301275,0.5540409931066611,0.2523436635121794,0.5411914142762347,0.5023374721696796,0.1848653712905213,0.17051203545971264,0.4124882890187433,0.38790652020707506,0.4518871501078477,0.14021538026419927,0.8833062029571169,0.2883430742477806,0.2679363532743735,0.422638802951051,0.46664055195636545,0.3572441201588528,0.677899034151433,0.8183332954761424,0.23889915781345394,0.4047236498157924,0.145612046794911,0.38984888136487234,0.1623786623816139,0.5846724735898099,0.41021425690042557,0.33819296233226437,0.21736187117514066,0.050528852249887804,0.4669972929510372,0.08032250487879213,0.4211979773635044,0.4022028634258387,0.07749498727121605,0.39868671461186467,0.49545790786059174,0.6193029866135227,0.5337727217904696,0.6160344299257641,0.0886917771769583,0.4517250642807076,0.06815130741604951,0.40560313807900816,0.28744006720093573,0.44145919874768313,0.5975705206474163,0.21880268198281647,0.2652616972383075,0.4395657960796054,0.10601961222334645,0.1945161252226586,0.31592590599357595,0.25397466412874753,0.7670210510809451,0.12093809824365159,0.15655520557559469,0.284981641815175,0.02553738820526847,0.08445386793956285,0.5589931304487163,0.26973262800392567,0.07275956288907151,0.2174967485423032,0.058953504860566504,0.6504173461263596,0.22431675470737017,0.4323199612298141,0.9140368936521128,0.0005595889780770127,0.3248419944482786,0.46150228808492316,0.8677411713419853,0.6799831453342396,0.20419374229926257,0.31703902723128086,0.24726694951431508,0.49085444789163624,0.08298407043606083,0.2848367997146204,0.20230525775558741,0.3179159184779101,0.12578213614039285,1.053877961518712,0.06725765053020365,0.06640262417943403,0.19869412499179387,0.2344850596064611,0.5803397095353392,0.15176925200310945,0.11013838245151386,0.6883620639853069,0.4235076440152923,0.525231334751769,0.2996910984572255,0.5840920797125357,0.771137548021384,0.32058414738627394,0.02125296279480279,0.3433736451922824,0.020649289245353895,0.02297566549966838,0.014583558485492816,0.1685088755900471,0.44835795013163343,0.16697009903547771,0.3222669644075928,0.31143980476045485,0.487864562275062,0.19853267523477955,0.7206947210459834,0.19415985847294331,0.7669691398838389,0.39712183591387146,0.02753960726573227,0.41827444286541693,0.5162995445412614,0.597112179182311,0.723238154525016,0.24919367895530178,0.7045154730706772,0.28147622898948355,0.655117783272621,0.7419938708490943,0.040091259826235126,0.31471720053006963,0.212086995157706,0.26161071572125943,0.26270946747004986,0.03275176751798735,0.48963537378159944,0.40423073157719536,0.5310520415773297,0.015214099522737655,1.2119359322558998,0.5034714176200857,0.6815741803731639,0.1371499729014834,0.035514083958417014,0.8439030741187752,0.19880473162314874,0.3430556659062614,0.3015414279195905,0.6488540086087026,0.6321619313425132,1.2437228393159774,0.09304179489080315,0.42549363189455486,0.5140067382467396,0.06734156625164306,0.20317905112415488,0.4190631467693936,0.7498339149608743,0.80466783061995,0.3230341663610547],"k":[1.0,1.0,4.0,9.0,6.0,8.0,2.0,7.0,6.0,2.0,9.0,7.0,2.0,4.0,7.0,1.0,1.0,4.0,2.0,3.0,4.0,3.0,6.0,3.0,10.0,1.0,6.0,4.0,4.0,2.0,4.0,4.0,8.0,10.0,2.0,10.0,6.0,10.0,7.0,10.0,10.0,8.0,5.0,2.0,8.0,8.0,3.0,5.0,5.0,2.0,3.0,2.0,6.0,4.0,2.0,9.0,8.0,6.0,6.0,4.0,7.0,2.0,4.0,1.0,2.0,10.0,4.0,2.0,4.0,5.0,2.0,4.0,8.0,6.0,6.0,7.0,7.0,5.0,7.0,7.0,7.0,6.0,7.0,10.0,6.0,3.0,3.0,9.0,7.0,2.0,2.0,5.0,1.0,3.0,8.0,7.0,9.0,6.0,5.0,8.0,10.0,4.0,1.0,3.0,8.0,3.0,1.0,7.0,10.0,5.0,3.0,1.0,6.0,10.0,8.0,7.0,2.0,5.0,4.0,4.0,1.0,8.0,6.0,5.0,10.0,10.0,6.0,6.0,8.0,9.0,5.0,4.0,3.0,3.0,7.0,4.0,1.0,2.0,2.0,9.0,5.0,3.0,3.0,8.0,1.0,7.0,9.0,4.0,5.0,1.0,9.0,5.0,5.0,6.0,9.0,9.0,6.0,5.0,10.0,4.0,9.0,7.0,10.0,1.0,10.0,1.0,6.0,1.0,8.0,4.0,6.0,7.0,5.0,9.0,9.0,2.0,5.0,10.0,10.0,4.0,9.0,3.0,8.0,10.0,1.0,3.0,4.0,8.0,10.0,9.0,8.0,7.0,7.0,1.0,5.0,7.0,3.0,7.0,6.0,7.0,5.0,2.0,1.0,1.0,2.0,2.0,5.0,7.0,1.0,2.0,6.0,6.0,8.0,6.0,3.0,7.0,3.0,1.0,2.0,6.0,2.0,2.0,3.0,6.0,2.0,5.0,3.0,10.0,2.0,2.0,4.0,9.0,2.0,4.0,8.0,9.0,9.0,4.0,10.0,6.0,10.0,2.0,3.0,8.0,9.0,8.0,1.0,2.0,10.0,3.0,1.0,4.0,2.0,9.0,8.0,4.0,10.0,2.0,4.0,1.0,3.0,7.0,8.0,10.0,1.0,10.0,3.0,7.0,2.0,10.0,4.0,8.0,2.0,2.0,3.0,10.0,8.0,3.0,3.0,9.0,3.0,5.0,8.0,6.0,8.0,4.0,10.0,7.0,1.0,6.0,9.0,1.0,2.0,2.0,9.0,9.0,10.0,3.0,4.0,5.0,3.0,1.0,3.0,4.0,6.0,8.0,7.0,5.0,2.0,3.0,5.0,7.0,2.0,8.0,8.0,4.0,3.0,10.0,4.0,2.0,8.0,5.0,6.0,10.0,8.0,1.0,7.0,2.0,4.0,8.0,10.0,8.0,6.0,9.0,9.0,2.0,4.0,10.0,6.0,10.0,10.0,9.0,7.0,3.0,4.0,7.0,2.0,8.0,6.0,1.0,4.0,4.0,7.0,9.0,3.0,10.0,2.0,2.0,7.0,4.0,3.0,6.0,10.0,5.0,10.0,8.0,3.0,7.0,8.0,7.0,2.0,5.0,7.0,5.0,8.0,3.0,2.0,3.0,2.0,5.0,2.0,6.0,10.0,5.0,3.0,3.0,1.0,5.0,7.0,4.0,3.0,9.0,5.0,8.0,8.0,3.0,1.0,6.0,1.0,2.0,1.0,3.0,9.0,8.0,5.0,9.0,3.0,8.0,6.0,10.0,9.0,3.0,4.0,2.0,1.0,1.0,3.0,3.0,4.0,9.0,1.0,7.0,5.0,4.0,3.0,10.0,8.0,10.0,3.0,6.0,4.0,3.0,2.0,6.0,10.0,9.0,1.0,8.0,8.0,6.0,8.0,4.0,3.0,5.0,1.0,4.0,6.0,10.0,5.0,4.0,1.0,10.0,4.0,7.0,6.0,3.0,8.0,2.0,1.0,7.0,2.0,9.0,7.0,6.0,1.0,4.0,6.0,9.0,7.0,9.0,7.0,6.0,8.0,3.0,2.0,3.0,9.0,6.0,9.0,9.0,7.0,2.0,1.0,5.0,6.0,5.0,8.0,7.0,3.0,8.0,1.0,6.0,10.0,1.0,7.0,1.0,9.0,4.0,5.0,5.0,10.0,6.0,9.0,7.0,10.0,3.0,8.0,7.0,8.0,8.0,4.0,10.0,3.0,5.0,8.0,6.0,4.0,6.0,3.0,8.0,2.0,5.0,9.0,3.0,7.0,2.0,8.0,1.0,1.0,5.0,3.0,5.0,6.0,1.0,3.0,3.0,4.0,10.0,10.0,3.0,9.0,1.0,4.0,6.0,9.0,9.0,6.0,2.0,10.0,10.0,1.0,3.0,4.0,7.0,6.0,9.0,1.0,10.0,3.0,10.0,10.0,4.0,1.0,1.0,1.0,5.0,6.0,9.0,2.0,5.0,10.0,5.0,8.0,4.0,7.0,7.0,7.0,7.0,7.0,4.0,2.0,9.0,7.0,7.0,4.0,8.0,9.0,4.0,4.0,7.0,4.0,7.0,10.0,8.0,7.0,8.0,9.0,2.0,9.0,9.0,10.0,5.0,1.0,9.0,10.0,3.0,4.0,6.0,9.0,3.0,7.0,4.0,7.0,9.0,2.0,2.0,6.0,3.0,5.0,3.0,3.0,7.0,8.0,8.0,7.0,7.0,6.0,6.0,10.0,7.0,10.0,9.0,7.0,8.0,7.0,8.0,7.0,5.0,7.0,8.0,8.0,2.0,2.0,2.0,2.0,8.0,2.0,1.0,1.0,6.0,7.0,9.0,9.0,8.0,6.0,4.0,10.0,7.0,10.0,5.0,4.0,6.0,7.0,10.0,6.0,8.0,4.0,4.0,8.0,7.0,5.0,3.0,4.0,3.0,5.0,3.0,9.0,5.0,10.0,2.0,3.0,3.0,6.0,7.0,5.0,2.0,9.0,5.0,8.0,5.0,6.0,4.0,5.0,5.0,9.0,6.0,3.0,9.0,7.0,4.0,4.0,9.0,8.0,3.0,5.0,8.0,2.0,10.0,6.0,9.0,9.0,4.0,5.0,1.0,2.0,2.0,8.0,4.0,8.0,5.0,8.0,7.0,6.0,1.0,7.0,7.0,3.0,5.0,2.0,4.0,9.0,2.0,1.0,8.0,8.0,9.0,1.0,5.0,1.0,9.0,4.0,4.0,5.0,5.0,2.0,6.0,1.0,8.0,1.0,5.0,5.0,1.0,9.0,2.0,5.0,3.0,1.0,9.0,5.0,9.0,2.0,10.0,9.0,3.0,1.0,8.0,2.0,6.0,3.0,6.0,3.0,7.0,3.0,1.0,4.0,3.0,8.0,6.0,9.0,3.0,8.0,1.0,2.0,7.0,8.0,9.0,6.0,4.0,4.0,8.0,3.0,2.0,10.0,1.0,6.0,7.0,3.0,8.0,6.0,3.0,9.0,5.0,2.0,10.0,6.0,6.0,1.0,7.0,4.0,10.0,7.0,1.0,5.0,4.0,5.0,5.0,3.0,10.0,6.0,5.0,6.0,4.0,9.0,5.0,6.0,6.0,10.0,8.0,7.0,6.0,1.0,9.0,6.0,10.0,1.0,6.0,6.0,9.0,7.0,4.0,6.0,4.0,5.0,8.0,7.0,10.0,2.0,8.0,9.0,7.0,6.0,5.0,2.0,6.0,5.0,8.0,6.0,10.0,5.0,3.0,6.0,6.0,5.0,8.0,10.0,2.0,8.0,3.0,8.0,4.0,6.0,9.0,5.0,5.0,2.0,9.0,3.0,5.0,7.0,2.0,4.0,9.0,9.0,7.0,6.0,5.0,8.0,2.0,9.0,10.0,6.0,8.0,3.0,4.0,5.0,2.0,3.0,8.0,6.0,7.0,4.0,3.0,4.0,2.0,3.0,10.0,6.0,2.0,2.0,2.0,5.0,3.0,9.0,8.0,1.0,8.0,6.0,7.0,6.0,3.0,6.0,3.0,5.0,2.0,5.0,3.0,6.0,3.0,10.0,3.0,1.0,4.0,1.0,6.0,4.0,2.0,8.0,7.0,10.0,7.0,9.0,10.0,6.0,3.0,4.0,2.0,1.0,1.0,3.0,7.0,2.0,7.0,6.0,9.0,3.0,10.0,4.0,10.0,6.0,2.0,5.0,8.0,7.0,8.0,4.0,7.0,5.0,8.0,7.0,1.0,7.0,1.0,6.0,5.0,1.0,7.0,7.0,10.0,2.0,7.0,7.0,9.0,2.0,2.0,10.0,2.0,3.0,7.0,10.0,7.0,10.0,2.0,8.0,6.0,1.0,3.0,5.0,10.0,9.0,7.0],"lambda":[12.504132050924351,18.675339574722365,13.963032361542073,12.930894294305874,13.951307675688868,14.499729380068928,13.576013998724349,11.305303117665492,11.695815055613341,14.54435475438931,17.28413947801133,19.992256296053753,18.003657824049323,11.755227987776093,16.820971453839043,19.075275510921777,13.964832632445505,19.480584535124226,16.228730879419725,16.259181009307664,16.749358446691637,19.72548503686479,19.84053985299213,12.671963006416716,14.143572312407397,16.950581569807582,11.823598804580318,19.465427188135564,17.950650307300087,11.301642822932394,19.33936438688034,12.898397823114907,11.585019459653704,17.256712794476,14.064881925003526,15.9330028680534,11.635307229727289,10.926550930739973,14.51059555952382,11.52139971243048,16.883916942495766,14.235552511478504,12.857225189106531,15.930026265452973,11.577549614467358,13.316979908619512,12.533837154278123,15.724831595853443,10.219248716113158,17.48429829850881,11.722816445944206,16.491237328542834,15.382312657928646,19.586208067228874,19.65672481241699,17.874868579268835,10.786025044057153,17.538436503969564,10.480839884782604,11.502727858195582,15.600726238965748,11.904191148043237,13.576307856286633,14.900664786850639,19.84109556401483,16.252878277804918,14.050864999908574,18.894369347360076,11.998352176164689,19.88463288233472,17.329309168870516,17.87457368842699,12.389294038364742,17.464533268495884,10.707825517057286,10.691093946701473,14.556912845336786,13.363641105505469,14.053953595779667,19.57735476976405,15.04655142245345,13.4782416604366,11.42616145151619,19.526490053447105,10.86016385661103,18.60032864775769,10.62009205393469,11.644311426658865,16.847823937422795,14.37774207927844,13.466340246016335,18.77103860338947,15.878299462645074,14.445162792007878,18.453938504653976,15.070594253904666,10.503502745481999,10.518717261553775,19.076365989558305,17.862247290315366,13.907977475871725,19.600133758093357,17.112010250734073,18.81224012761095,18.237427904734062,15.091267618145949,11.90823970151305,11.05505456014344,11.950002073655021,16.1778663032921,14.033264203000005,13.336205992900734,18.686261170271862,17.544816314702693,13.183772497423494,15.798967222406919,11.466644086162411,11.073161242990071,18.70387017010501,19.311509929716685,15.16487644649095,19.308223894344707,10.342568102921447,15.72567023092626,17.670798959352844,15.24364267425476,14.216120960598712,11.793126676333136,18.815357933570535,10.20441009000052,15.968595581825888,16.00700995667504,14.425483030867753,19.5419713343056,17.73990603070289,18.79261980779863,19.528541935654644,15.959599960191678,18.206983138010315,19.750823500210345,12.722001744487457,19.842797634969223,16.07154224993507,16.52101707423035,13.945230424422167,15.674296136171776,15.166894951064474,15.520369017538648,15.249894631258478,15.179738746261446,14.257227731973227,17.84849340645395,19.333228846374674,13.475776893635123,18.592911935444448,18.989350020678984,17.449858891019222,10.7934995712292,18.77020751591767,10.066844193495374,17.565707178753847,13.779432808808629,16.81482778604054,19.004992271706957,15.41187234239554,10.97680480258482,19.50009895589018,13.97870621611785,12.92618497225636,13.203141729855748,16.63578004517885,15.164585382620155,16.702358710370966,12.979545462096112,17.453875118381795,10.153446667217114,19.64374040924643,15.418939536554397,10.10929801113958,14.935227121124928,13.193471510790067,11.569533859976806,17.067328951863704,10.32914565312186,19.30953077878613,17.671205396917166,18.202222758866345,15.860512583475606,12.104205668838857,12.01769695465552,10.250415695500092,15.740115442164782,10.375559899424518,10.731855804020425,17.380808159020713,18.985187087914817,19.375100708509194,13.74956170997336,18.710120292606682,10.063743964724495,12.386613338561428,17.910797408584965,18.673123618031028,16.23068350731566,13.256176220194654,10.289327291844517,16.776001941953602,14.916060050900333,11.075148678212873,12.723609688041265,16.79174895639626,11.26734935855982,10.804886864605727,19.098380698879115,16.197975966039163,14.164025810533978,16.574589620626778,15.753282437225709,14.906179756984619,13.291520771888052,11.043835741853965,13.33717710769731,17.86922320146317,18.440552560201898,13.757466254630161,19.824148231594187,18.275144471832604,15.55468761925864,16.001487484232538,18.714980196148236,15.352266065296504,14.18451482552182,19.781775099687295,15.877989006899917,16.30553308599046,10.547341159791877,12.708778926810494,12.923381460551525,10.174290544891614,15.226498866783675,19.664665172112706,15.642737090550378,13.809744122949876,15.853836397553263,15.808818052094844,14.181039178397539,13.899802102793908,15.712473797236509,18.60855438953982,14.611332000762653,16.953742066459583,10.224211712742724,10.14672327804729,13.475050435737469,18.61768186412354,17.1585391979783,19.679719280801315,13.893052346140038,12.67137905814332,12.136126937864065,15.499006200057293,13.678334048262364,18.87109976493536,14.719543065306834,14.425240864660893,13.647875536625826,15.722783035505653,13.996253751086545,18.646423753473833,13.163379296682042,13.959545148696012,15.903586584561788,14.297074523364453,10.181867707398435,12.04385584742635,12.979283839608032,12.700777766277941,18.88173119346722,16.476176659975867,15.91459649965864,19.636345993560646,18.948195418613082,16.69904930535999,11.419684134992778,12.085743260088488,12.87314024708024,10.446898526289672,15.312433991939633,14.960600499899176,11.453231742197836,12.984902892290343,12.926896121225454,14.181327513894919,14.450190580721925,13.517888464803502,12.142960591919959,16.28164746746891,11.549752941761504,18.956738309136593,15.41178337875483,12.022588500344655,14.018958105300555,10.793071777755713,10.804010832178587,16.424183428301383,15.195459132164075,14.91033786482236,11.625125701724269,19.811006624269297,16.923772218502034,18.62065127493185,12.188884956931211,15.382598250125703,11.761400321627516,11.1468620868046,12.797754512305943,14.6021225894859,16.607988567429636,15.028633441620375,18.57979134506639,17.615819758219203,14.973954999114238,13.012367704695276,12.704851901497157,15.282821588636963,13.065521700309215,17.127941255539433,14.599783151822194,13.010590505944533,11.548002278392175,11.648153586568071,10.994867172341191,18.437806833230383,14.295689361870465,10.410426698123674,15.190802967823204,17.672548040373783,11.940630653360332,17.65329830115191,13.399538442817889,10.405924087517198,16.226698842755713,16.92141887174772,10.471648467470542,17.405660249346262,12.183058315199576,15.963747218005489,15.0597827647529,17.01664086380668,17.006747991247487,17.882988921155523,13.571289011414292,17.152382141528904,13.99133650865971,15.391102127365563,19.768947705146132,13.34456190394854,19.92767613929309,14.982536494368578,16.78970073400331,14.591784568440891,15.424980064903638,11.232611266240847,11.570548711713826,16.169722177687923,17.217518660766906,12.84577510100222,19.295997255771766,11.594823215267446,15.18074233650161,18.511225247824694,18.079946342367286,15.191541561736479,11.10704105306678,19.17391031341518,15.975777036146129,17.331262774399832,18.02181318638501,17.893343747664442,14.730965440166294,18.10862214545309,19.853168689075495,10.75917232643989,19.802203825611116,17.88191311904625,17.960467267389607,17.150598519760194,12.01138308162844,17.615103970588905,19.496911739159838,13.972593362597618,14.98125420938013,19.052198095132983,14.224437012744353,12.306084210665695,17.71419529744965,14.737232169103308,16.708702642939365,13.958139631438911,18.4715514165897,16.39031141073133,15.43245212362834,16.812461622790863,17.601869694221648,14.866874346432446,17.193742271112917,19.651916083647915,15.966966427065877,13.162907006528165,10.006572564974508,10.26389906480343,16.37076482715863,10.550167656296793,18.676427169539654,13.855768185848696,10.848073882514726,14.881156781515859,16.15578746874776,14.616041797878854,12.325601721475621,17.657185607139812,16.269151381971948,18.613198524406275,16.809623131664857,15.119831520203002,15.263758670720598,10.23308086140366,17.342181743827076,15.668341056661166,15.209755724413043,13.329556678977461,16.321730739915743,13.227739428801664,11.544276263613781,11.899956533702472,10.450068084331274,15.692495569917185,11.835991401784387,17.539436207620188,19.693258963791617,17.237263466128706,16.197725229254893,19.373631572741765,11.232255022025084,14.59855439945249,18.306327685213745,11.675742854248945,18.48835491887473,17.486926064650863,16.222994580748917,13.277284787026304,11.488322637812118,11.542776480300851,14.53704645301482,15.439273495696987,11.796407300806688,19.93480586334981,12.05092593321098,12.821111178907312,17.800944511079905,16.186272092272358,13.053318509127653,16.41996419627581,19.388046632052315,10.91378697051282,11.442232455417303,16.606388747962995,19.091962882136563,12.03369603221029,17.588007231898562,10.78116076943119,11.372340841307514,19.69583532933903,19.314366698890076,16.889992115071635,17.339011069139957,17.02144494288327,19.016236685714524,19.287915907263482,17.691695963425847,14.155953673022594,14.670673657570104,18.709509835299713,10.838524128088897,15.395762025653445,16.02777011704632,15.792865008218545,19.10953200221747,18.06792551322717,14.104309972225035,11.034707599062742,11.332549918353754,14.186934092176589,10.826670386014712,13.778093564336961,11.613667062490684,14.148065375254738,18.216999868967072,12.233115521578418,19.550963730650793,11.73625320000874,19.8024660848883,14.42433071338465,17.88119539251647,11.984895186464533,15.055257224310495,16.90334218383116,11.211479553124617,15.490423674785564,11.408787860291564,10.340362259370492,11.65375701704443,13.518647184876047,13.137639868819615,10.149696763727277,11.571579082941597,10.174854313350878,15.43194286192879,11.414556619820875,16.637064116342955,14.997991496684058,18.460510923633834,15.085618578378172,14.901900684356477,13.778457436195215,13.938048613842586,10.874021086559756,17.542173177252828,12.38275870626281,12.380137161036522,15.98329427219998,11.209642077044624,12.024787127017918,16.42024295473753,16.091319599840716,18.653240466537614,15.902152442719952,18.562202614678256,17.777599871658378,19.792332915117633,17.060426908201585,16.626613206807107,17.915173541976486,15.106171696806276,18.18741014242938,18.648044749196316,11.839517246751296,12.494760247513428,16.445168726551064,13.806424806793272,11.98652732964986,19.06031683519939,19.6274798538454,15.413183802346238,13.796377695035071,10.529732613399483,15.512073265845371,11.293156415476046,16.309506696799644,19.834151358553775,11.338392421459798,19.630135766161136,19.889464274302423,14.59425849352662,15.689569309200461,15.682000128710902,17.10309351853418,10.683770168144592,15.702775614408012,14.683769757240896,16.796515496028995,14.783771533171384,18.092733679355064,11.081175726016552,19.66294194060397,10.854262292655859,10.863728362505237,15.71524945386855,17.463707519159787,18.353787272566276,10.13721403975091,11.186432039459442,12.401214920573294,14.262902186529875,14.732343695768666,17.695356929879388,11.461639908989083,15.659286756348262,16.21490489382698,12.546775820540185,17.319337791547934,13.377939426185394,10.412711893741553,10.24974918621944,14.864070485547021,19.882976892126827,17.830622794071942,14.814121333817592,12.749402530970945,18.51696036193879,18.851434148529265,16.52648200917286,15.953239788333853,16.43106575360564,10.098556411070948,10.758717070161378,14.426902864228811,12.826563267024639,10.621027812128816,19.930912740068823,13.611561630299121,17.332274067734247,14.764055741854206,11.574964173728759,18.689016837903715,16.614912394067005,17.753617128805487,11.75646838245742,15.000744170117944,19.137480807762408,11.63329594169235,12.719909880808448,17.744094018845225,16.71290642886622,18.252278746204833,19.13119649825392,12.25561553156259,16.122686473327803,17.793026534292686,18.600077331673987,15.181243118774248,18.37883750785455,18.5810271881365,14.785242375203374,16.719671296596722,16.36800312621093,11.636322671736508,11.788187486930447,15.881585452995232,19.434558245989194,14.690966006241794,17.247226022346844,11.751045570477787,13.474904734525676,16.683293544619602,10.954159550196058,18.76232719443506,12.324224600219742,11.447050152486725,19.27904602955711,19.94638538413762,10.619899309488039,14.612854195273997,12.610866008596473,13.261575103143166,15.02447579668151,16.085029112345154,17.159633026149706,18.02636774199327,16.279796436255168,13.97698132820908,12.538551876462503,12.56789268072408,17.448279469322564,17.792826810272203,12.328283309293123,14.352671228807928,11.249096992489868,15.584721245740816,11.542756936896314,11.20758299019723,15.341792794915044,14.606152673338723,12.978879053070667,13.399617791294054,10.418664169290729,19.495355384073946,13.55628571222325,16.438689219002544,11.144564953682465,15.063202547431455,16.45041172433195,18.1658419002844,10.922234948547157,17.71491965989918,12.943327707700838,19.95500781412827,16.236530230571383,16.874118263278195,15.64062451382319,12.732086261904156,13.451500412827492,19.926092073339714,10.580105507056125,10.788014587561413,10.770559456161205,10.924058208138627,11.809941873165569,10.445212774630336,17.64682078799541,16.037640502244276,13.7334192530515,14.373635406009882,11.440354832223248,17.838316961586397,18.74493244076816,17.039351457391525,12.41633087894639,18.76889446496298,13.328423796507527,15.089025078373371,17.320537816729356,17.001858955420925,17.85311575377084,11.525303705445054,13.71771617876968,11.566080081177727,18.25333210884016,16.21021396978938,19.429533775500182,13.581457010997473,13.991658077565734,17.658181898135293,18.045025381091826,18.124910222772105,17.4129507851566,15.752116875490863,14.315706032898659,15.732123322315912,19.01223952317962,16.839319852458804,19.998577259966826,19.374788670603085,19.202110858439127,13.414243613814165,15.35089267576608,18.975832617625446,11.587395336116447,11.718976668727578,16.9140060949386,11.083523569902173,14.153413620362443,16.618918533387834,18.101822429078855,19.712642645638,12.083790448535742,19.65019781176226,12.970151145522287,16.91407598337118,15.539216046408955,16.18459328662872,12.960239279354964,11.041831471871966,18.372892952221733,16.423735789254323,17.177607242770392,18.773303004995107,18.754996126370486,14.690519498855469,17.53328575494778,19.104860324947133,16.445138923002915,11.633051375601877,15.287418870699415,13.491309800987452,12.839131621053637,13.420682404169678,16.475581632080228,15.944720930743589,15.977191749673796,16.414813000881722,15.603983061263646,13.233580138087175,14.539909004404707,11.37946978302624,15.199379675837214,11.664911240853373,14.481373197530479,19.44006299851751,10.44830307300529,16.257570894128037,13.629250186648182,14.39814714738279,11.598490472369946,19.687783386853756,14.205191153561561,10.657309364434827,11.163674530855534,19.29932071400549,19.191507845899554,16.34166391849845,15.143808376429606,17.475623617669328,18.900601373292396,14.058354935390888,17.330193664759506,14.10189833677834,11.940464091737892,10.281977051755167,17.99050063196188,13.513020703065566,18.661691386966464,15.56517736158331,11.792618069502227,13.41347840155376,10.817149940027322,19.692482729520755,13.237706079522344,17.17542545337443,19.61836523136933,17.59567149314786,15.818284626778858,10.999483764836986,19.56601099352807,10.569205814886153,16.439026886398423,10.67537005660391,10.446163340004324,11.11689725443581,17.692446473253824,13.617760060088672,19.068865241618894,18.87087820387959,18.083060622149063,12.906066682626673,18.270789569989706,12.236367654589891,16.606765339094864,13.181543845413792,10.077350362919933,17.79606270478025,10.626431860660679,17.257631481562804,13.353381732634704,12.559076869624084,11.543265953787964,10.1464440644692,15.062732781062518,11.038785159630692,15.3856976502254,12.869294941882535,13.159835042248954,11.719709864210984,12.58350671925873,17.456970038260174,13.04954800799225,17.35623373752081,14.460624610404896,17.652456733850663,13.077722751318126,16.61711914953859,17.93383491248948,14.0882744566901,16.917490372678234,12.985431969462166,18.63001741398838,18.724692471544387,12.857886699478112,15.654673911559037,13.65991153570347,17.473175738727864,18.32632849939911,17.74748320724141,14.57825930619901,15.834740715654863,13.473612662248467,19.103931655622855,14.221639128115779,17.457220560851983,18.67943830214683,16.73303887000458,18.451611501399096,18.454584621066324,11.628167100860951,15.923037160407457,17.28458934967707,11.987483160808276,18.948363605747254,17.1025186905203,19.8678471105544,10.327343425528994,16.56242690421371,15.34720942155855,13.257118643660492,12.071368185395933,15.03422619089088,15.783812395377328,18.40141691705903,17.21291766034598,18.76654755879272,14.026883379205355,14.357574129755195,13.999178223971505,18.603167302988467,12.587465690186882,17.033857714462172,14.183258763547695,18.786705297048133,12.94202451972841,12.136392630875488,19.49396952916321,19.0319268025712,13.856460899389702,17.896771322429977,18.402386316877227,16.38716948427156,17.00254363545606,13.651921748086535,11.541463694349572,13.071262147936052,11.411593161770996,15.525669060963672,17.926206088697263,12.613949630861807,17.555408428102673,16.81319162070872,12.510498573925144,11.383021734309501,11.17194697639996,18.110038940936228,18.717002713106986,17.273728286903875,19.137164855830562,15.778628531041544,16.916040676283714,11.333435257184384,10.632977193167708,15.145797251627968,12.547355474986297,15.39179353466384,19.46785279611204,16.290871259606575,15.621912418071851,12.6912188684271,13.67610150838032,16.678892679907882,12.329287532845221,11.36475871602045,14.500390210428645,12.979551871508638,16.751363484945703,17.065115839083475,19.034334536912322,17.918846296720183,16.180029597622717,15.285992192416407,18.644880746954748,19.043285360825948,16.15425047182375,17.16805718464079,10.300273076935461,14.48601085120314,12.841648259669473,15.50417871255725,11.47729324772568,10.827198484857231,14.073717906119974,15.040409635274507,16.994344412445763,15.203583388356014,10.533153044030064,18.57961340341312,14.23724588503248,14.902820687608276,12.388518757217488,13.917846997331111,13.290652763345927,12.883998760998509,11.135699583925264,11.107788245709909,17.8488013494351,15.879957304437646,19.591167328981708,17.263419477551565,14.925671468336981,12.222574627891483,18.55883173882985,17.524269753847115,12.717903389298327,12.53662695648229,11.991732544299285,14.246120461907372,14.649905169658147,17.97171057559789,11.363710867942654,10.216664276373763,16.21527903466294,17.84475642843588,16.848544983018858,15.81417945922455,11.64657990063882,15.034506585000859,18.35549060363177,13.17877246435362,18.248213438334666,17.140409060139625,11.840761071619996,15.790303105867684,12.793150951669293,15.151524961755129],"p":[0.8711051477897853,0.51345084042216,0.3614306044769495,0.3893132568686968,0.722904090811362,0.37607302663231446,0.8425186700537135,0.1026679713193468,0.8570295499276452,0.6334919610617791,0.008652912868373441,0.6721496267460318,0.3903578265256298,0.4040284438775854,0.7180353739715135,0.8767232527490383,0.3789135585256931,0.5782029321210529,0.9034407434170855,0.925737880394665,0.3917228782410713,0.8198042039857021,0.6706279937875055,0.7792174350441874,0.2000459231391465,0.334960859200669,0.5061248821090287,0.7533976242208442,0.7569330236625444,0.5040545268038483,0.5808406824695631,0.42319471551606225,0.528441437062164,0.6406707540455212,0.1532005510137202,0.25358959600775477,0.83962338733448,0.5530426269807067,0.1426736832115474,0.6420712729887701,0.8988270908533447,0.7278538951863025,0.06913503407873933,0.6112521320059208,0.7484310117098507,0.9954941806429978,0.8790024708776447,0.18264383075857915,0.641624376152685,0.9694166229987384,0.678089309162347,0.961642662153128,0.5046915271360422,0.7356761459507033,0.4620957561537633,0.10645160363764394,0.3557149328892617,0.7820259699888739,0.4873748739805037,0.8785549217468698,0.6798340821407238,0.1496642009698106,0.2732111443894134,0.4132077717439069,0.8088926160239767,0.37590355474391113,0.38855642053387407,0.789633251675806,0.38388631690405495,0.9555658339083584,0.6950113877166617,0.7130945174488406,0.16116256810630292,0.06170857660854545,0.22592074655616923,0.030585680163515816,0.28757373806156017,0.03232173271693051,0.6405584083790452,0.10605640294454921,0.5303493583986805,0.6941389734898931,0.5671995422756233,0.1385039519773954,0.6534327882288469,0.10186981707258225,0.46924243129486265,0.23888682167114528,0.02752985743169245,0.6892634034038814,0.1406686574150937,0.9293134442920541,0.7709758926945083,0.45407403501455446,0.7114583373579724,0.22298838401240406,0.2744073427827296,0.9348404480285954,0.24624041986167944,0.450772405019209,0.6152385699758585,0.4382631538438422,0.7773060607139639,0.5813947226147773,0.46931427449466767,0.30946172360533786,0.5465838223084174,0.4302247221593176,0.4832316000545753,0.9790627491411494,0.6638754964671518,0.1176508581515825,0.3098879364070479,0.24736408132586862,0.655221276511009,0.9766003950075453,0.360569628150301,0.1173611887480639,0.20417843692971038,0.08378214998522138,0.366331959504113,0.5301511142710518,0.9665799099567136,0.14373978526639442,0.542929006221142,0.4051246990917896,0.45586855292164463,0.317939204450294,0.9419421125859837,0.6376428476809177,0.5193010222170991,0.9584639341713916,0.6160942179663982,0.5170717273842558,0.9260230153705578,0.3113967254276597,0.683628651136023,0.2319157141861743,0.930430020388533,0.5595564140865579,0.7013820472166374,0.8737663991357985,0.3898996362505016,0.10729825470192589,0.8474205101639904,0.41140183386849416,0.23780307422196456,0.05426166415637512,0.008250227001543431,0.451507583000305,0.6287925058640096,0.20312624690319403,0.3309520790104996,0.518650619368437,0.6008720822099636,0.03814134035908068,0.5299995977183465,0.17129981017047813,0.9895586624394577,0.42077840604259875,0.1406087518636321,0.8005384911238869,0.5960533839258482,0.7254939964083558,0.2915674953361864,0.5961963154703993,0.7816453339449114,0.5151260492468346,0.4068435743969512,0.592059624344291,0.19343447768971478,0.08030564540578489,0.5200393606583462,0.7187443758163166,0.4258105895126849,0.3927442980583913,0.6998548902785362,0.17681110257673782,0.04974905635524318,0.4306971642593336,0.9560613041970976,0.8389987771326088,0.4386080233372165,0.24716932754182186,0.960934798247616,0.7511111902286174,0.8873733777328343,0.6968752152388122,0.2834182376262202,0.7198888246502313,0.410003406478193,0.2000382954943989,0.8664147076511886,0.4890846960607045,0.7286361464989386,0.19546185195350052,0.4687576752040743,0.4716896449732526,0.48192083712850065,0.6378881354850927,0.00210600923844928,0.7749479897437719,0.6779933089434862,0.1581565919135548,0.7123916854744743,0.5339227548875756,0.023824638931334574,0.5925516466646745,0.04600082549164952,0.7119669490662055,0.7752762680290448,0.17079412558205842,0.2221263544192582,0.7285858206500542,0.9041313717842454,0.8127905073813431,0.34262114313532055,0.33417283891308824,0.021121076099985814,0.7716022349109275,0.6285337075389443,0.6296929412345345,0.32947280145870783,0.8027167428357254,0.06068789239327188,0.5545044409834587,0.9962251963138946,0.28359445141272377,0.2097667205459477,0.9869693757295102,0.8095161733008895,0.4414120599911955,0.789336506193218,0.9877576827613457,0.3991204639386223,0.30128775835847366,0.009041265298351586,0.6381422657899951,0.24345434670728738,0.5854351193844223,0.3612834727730492,0.425116256822782,0.9767434809862476,0.8694595166352008,0.5919471969600929,0.724742435467753,0.2015960084544557,0.8808976663654562,0.8338573298806857,0.16976396713556308,0.47276799416627346,0.2676785479747059,0.836906928087799,0.10331712300343954,0.5743174286111559,0.8423257771168426,0.4853516973043155,0.5836535380504919,0.3456799717751031,0.9617101655104725,0.3204386869804545,0.6620946642891565,0.018417366585094852,0.9148218236422025,0.06661284054841499,0.22249898532345358,0.06228885706898368,0.1742512471747435,0.1322589986842848,0.9767087071503411,0.01917456637711701,0.9743502399463713,0.03728255286326232,0.5664951070540212,0.23028610974656516,0.47707750773232616,0.17962761520992432,0.7512381347879744,0.07801282139346721,0.23267940486373462,0.9403938890057597,0.7919078099889911,0.23438726380507524,0.7180331036996022,0.5286980795677754,0.7515697495189315,0.8340544454150927,0.5050575098995409,0.5372318248481227,0.8192101504346694,0.48623989358179154,0.45432290594566904,0.4682177790236144,0.6932237719212242,0.6489421268127722,0.14386009173848802,0.6558085593418304,0.1312808019083347,0.8793263636873572,0.5128367858384903,0.2906988660774543,0.683034436021565,0.12310934675865948,0.41175578779214006,0.03527858210246393,0.48438195549016827,0.3419170029561893,0.56887447899306,0.5561700945183508,0.7078730935559201,0.7785178283201437,0.044561326094399334,0.046472165536846965,0.6336048677629276,0.8666249888344262,0.6673560435196635,0.2357547687618171,0.8054288093167292,0.11055577562029173,0.7852588311275248,0.25833565457775043,0.3492367005019006,0.36984466398385085,0.8519586503735606,0.3015867613419201,0.4480307214742094,0.9384955045188832,0.39309990515899473,0.435669692792648,0.9277400061110581,0.48818236116570657,0.5810113414332301,0.6315447298768646,0.40542350283576933,0.7658267457688093,0.19800417497968814,0.939595598206141,0.46328841017727496,0.3958828684697153,0.3668303499870895,0.21579011339776666,0.8418148044300682,0.7788757087270011,0.29790328924662424,0.5836292870963087,0.34593295869183827,0.8393452161117285,0.3995155098835381,0.42990425079923766,0.19324786404760252,0.5443789154614311,0.6147153649888222,0.7063357788469677,0.29945234370805673,0.4962975635322431,0.04332900780941551,0.6804501288041511,0.13900619646791768,0.6696648274188999,0.9318981782955946,0.07692818269153467,0.9345542862009708,0.6331039344969376,0.48126351680263824,0.341727881671231,0.27841406236937916,0.41218419553041685,0.9459318432690358,0.41547256834729973,0.9188284323031628,0.9006674299813171,0.8274407014528176,0.6782162185299372,0.6978866417717882,0.36784396458228397,0.13313137615299886,0.5299029046292982,0.6018540261536689,0.0808028064530224,0.7595696771962133,0.6692502175260788,0.6095469128981326,0.08153018460449313,0.7225449884147117,0.6806016180885688,0.8112079180514711,0.8739198883351382,0.193335670049668,0.9616350916413885,0.4231711997741574,0.34722714253239295,0.007185545234235313,0.80175447170757,0.03810524735119225,0.926161373098457,0.8857774357395829,0.4517897237256139,0.35612920619461486,0.8819195894759102,0.6891352377783586,0.7528762478044329,0.5787597867216716,0.07322019389881418,0.8120672369694786,0.033717217363741225,0.5982889959970852,0.4503945077414664,0.2974232311251601,0.8885341419848116,0.955466866173093,0.5259276145853253,0.002301623183547541,0.21457794639310301,0.9724035937960138,0.6996169601922833,0.11065017015826939,0.9437385635988456,0.7644314526756284,0.1914729808983251,0.9110654462848613,0.7274100324229762,0.9330846314300769,0.7893269086371248,0.6599796728002849,0.020138798091536847,0.9844824355140485,0.551482115923807,0.4943878332505143,0.7434481469026077,0.9353245476521601,0.3185835012543923,0.34045185762548336,0.7499768214330622,0.6295464489865461,0.5142474282995522,0.2896406206141102,0.0949533088803518,0.1182017347669635,0.8121451228768781,0.29173038785914773,0.47474767470491197,0.993876424744542,0.7701300239482336,0.15054493544181935,0.46557969607137917,0.44654372312247603,0.5211419191029636,0.2217004804156737,0.7919055677640594,0.6511598662260205,0.11138269019130642,0.5932555730268294,0.6176479146317972,0.6094948184199809,0.9992271167394098,0.03669466062796767,0.892816743751512,0.14265506270301986,0.9683278439794438,0.7024547836974,0.8840060376311356,0.5918575798213814,0.8729326278853731,0.48200036725740003,0.2576563344253322,0.23010131868917516,0.10224994560002987,0.4301672123068896,0.707166646531231,0.4808594214916282,0.1913382586386203,0.03667855411135501,0.4699818934713218,0.7138292323945314,0.7288581748057674,0.6294411828785065,0.4719647893684116,0.33544853572665634,0.7805788762116019,0.07903678457434538,0.9343591043679516,0.281126814959771,0.42874628918387914,0.7500620082075284,0.4931947068039779,0.9205058482881394,0.09767520886477188,0.3413547270148183,0.06808297077202319,0.04388617759897917,0.2996575167373541,0.7123887901690205,0.5211190869123261,0.3567429973463043,0.7982955920664079,0.6517282588678979,0.5305522397530797,0.09195150350285841,0.6488023221242032,0.3917186722671404,0.2526830174956405,0.9037799973396441,0.4806195582226265,0.9781983783999424,0.3751400014465325,0.7308234294768119,0.5777908487139611,0.9652860707541786,0.2605814121549159,0.39411995726761706,0.8113886456397399,0.20118697559096343,0.9573469214889367,0.0887088917418517,0.0220405227827265,0.42862510883404403,0.924882976983816,0.1961274579156873,0.2205254712957414,0.25779666510510135,0.06330425972685494,0.19390542954797385,0.7969330942160893,0.8489302185545355,0.3994648662462652,0.14274220920600045,0.11242801578379935,0.19436897899433792,0.42856612444960684,0.05526482811468658,0.6741760699677635,0.22990394215868304,0.35335395713757767,0.02139719683252661,0.3589252440294446,0.8297809837610208,0.0340222252145701,0.5142059608190548,0.7417700966055052,0.11722650197161189,0.9461372266165724,0.5847990061534234,0.6736444224283034,0.6820869729351864,0.7088018754335055,0.458249976602467,0.5108462137040575,0.12887996598643103,0.7927601593462306,0.5591165473137147,0.6022581294843321,0.7702650047609676,0.3761689820005012,0.7563975406195611,0.20238677287986806,0.8451377263546442,0.8093294992246391,0.9602993170473533,0.39430546354974694,0.653933651835503,0.05811101681380504,0.9655832702171661,0.8618670084048352,0.6308466679248383,0.3518278732045461,0.4351694663760559,0.8821351070172909,0.3941902180345058,0.9698456526131969,0.2711060135300012,0.08721751779628018,0.5312996783240385,0.950923232892293,0.8944374431299251,0.9195426438135965,0.8095112211590381,0.2237756548562364,0.9914481850786361,0.46391928159756857,0.5736957949131214,0.6861638898484568,0.19443383448197937,0.19591388297416956,0.3055137383867226,0.21351267584654776,0.3305959897402515,0.14625259019904835,0.2274135674869069,0.7679126825602001,0.9193916712709125,0.5125823639346241,0.999278288578602,0.7793299960631874,0.4914224906924458,0.8818667917123544,0.3630418927419605,0.5033472726728878,0.08548209934749873,0.48452152822934647,0.26627080045216767,0.26522182965505947,0.20173335538007975,0.770820402661692,0.918716299773711,0.35480872170548206,0.4919147386698184,0.38874401211473253,0.8654025174322098,0.7544369140212106,0.11381450984068309,0.8371296921567903,0.8638447596039525,0.7279252068893585,0.14787618307501105,0.4284961206686628,0.8253101346472937,0.1254644689213218,0.03438843787557366,0.5147470777843028,0.47777265347767695,0.5558353858712597,0.39977605700622654,0.11784764214984578,0.6639150062117023,0.09264584934436271,0.10545374712297795,0.4471214999569122,0.9556662584133533,0.8635232548957679,0.04547647823988199,0.8994560789879835,0.09288002223883529,0.03237877013410251,0.35168964053231244,0.33186938795243126,0.8894402354014166,0.13991051328390025,0.35963785046723196,0.49680213310868715,0.6313374485556593,0.6552967263777736,0.12798555260859712,0.578195645220011,0.6004650385741233,0.6151896645089476,0.8615017365671391,0.5438534668882429,0.35933180355609573,0.1944060048036138,0.8137780679172597,0.537633322876971,0.3749605129420863,0.924133881069974,0.8960441495183897,0.01880437515348854,0.617537500135769,0.5190026414395048,0.24558182399080608,0.6857109400493575,0.34198221026983955,0.9794613994879631,0.07122979908835814,0.11399068311137373,0.9597478038314857,0.022212424528866848,0.8182542298720734,0.7305661919620301,0.7646362642717042,0.6153840385024116,0.5167097384793595,0.8508499686868591,0.11162149015192058,0.45947952587064944,0.014413910657132822,0.25675658577434657,0.8494122450998938,0.46039077485519675,0.7522331001680491,0.7983469761940007,0.8199523723276136,0.4325230341142099,0.38795312874403964,0.7974056062872252,0.18450204496548195,0.7522160574878742,0.5659921100042398,0.8069192563043348,0.7454329757686511,0.5066140521416698,0.8000500128700996,0.3121689224125126,0.8800058909437205,0.23675478102413106,0.42442228448994324,0.7117541638801343,0.6175120219763095,0.7137536374264333,0.24079091401631314,0.727999445409419,0.31826103149258156,0.04598518080295144,0.2619930943206972,0.14031904299339715,0.6060889876452245,0.9023162152430557,0.7904199497802493,0.4458338753857236,0.8945989407779316,0.09075822817801815,0.5347400438247345,0.7403673842956933,0.7683381771698432,0.018353421252901292,0.15830013664777365,0.43045948717836713,0.7842151536846795,0.8087546731742998,0.25756339574378795,0.3130908317320107,0.7428706691680249,0.11921315330773141,0.5274983377117644,0.6382289983668161,0.17023215018537585,0.7707510718426254,0.24446864613257313,0.791560250115696,0.5302367859616415,0.2542964464465518,0.39543979366875015,0.5581108200684692,0.8083906083790622,0.4511982050746355,0.6242409076662518,0.5065638960119734,0.12008631661418234,0.6578249688927742,0.1414537339794797,0.03473360313607676,0.971559538876394,0.5520937568073623,0.6400532791019435,0.29337121105099584,0.314405233056414,0.4608366042134968,0.6431600153652066,0.12809597014205676,0.9944352777813881,0.4919093376172523,0.21141636414946374,0.435512285912826,0.038823856650254784,0.20420131101241656,0.17511461499732217,0.5948355195752899,0.3644724415308396,0.9176220726975322,0.018049754693515885,0.048710406181742716,0.11500618734713819,0.8211095332586493,0.32474720106453425,0.900263958677906,0.7163400583119564,0.926975725759656,0.056734547805782354,0.8014219627055412,0.11595699427819373,0.8284557641168357,0.07620786253430345,0.6524064785890706,0.9268083972149916,0.08873876898663213,0.9389055642740081,0.43357142284964345,0.904059663927544,0.027070439923398082,0.20502774553227643,0.36063995997519394,0.796971821546625,0.9945879539816891,0.11970472570989443,0.6264348095996422,0.2961651497163029,0.5124694222256845,0.2854118380120969,0.6573770152618974,0.7070704693640955,0.6791152822880973,0.4930219840293073,0.7181109744994212,0.4753026912703511,0.5342121894417224,0.4595329766400773,0.5238930610208359,0.06994115140079371,0.5711978568700808,0.7829853387474144,0.050466296767086805,0.29017508358258937,0.511872545255176,0.5452831658229738,0.2219057420817332,0.636546243619392,0.9425345235619282,0.7475711199137856,0.8917790290984366,0.7336520747649373,0.8615506212017734,0.5748354860266338,0.6154006346586776,0.13360938902785535,0.822786350333184,0.019070274233728313,0.03461805584531641,0.7794304423852274,0.04209940599121009,0.6154433782935207,0.08762774825044595,0.6741767226791198,0.40057309118218987,0.12860141768686462,0.8939467984454508,0.25029840926423796,0.11857749773712944,0.38222728870019607,0.9523156147011584,0.3871117563784461,0.5217563054981977,0.18837965152359737,0.18793714763818992,0.14518582815142111,0.19530101499405328,0.8064788559156608,0.4394575942550867,0.2480243974676224,0.8293748578195654,0.3642377347673169,0.7159316597646319,0.2163347367233004,0.3825391206770392,0.9394120534618133,0.8652277851708505,0.16080350384955455,0.5828280149932812,0.2210884903594612,0.23078997034981907,0.5486821412082326,0.03818583672175069,0.5617791267399692,0.8385571067805266,0.24021080928714444,0.692042068085752,0.6965074004835907,0.5659980996090412,0.6038018825896401,0.0509337357715014,0.69699068632851,0.47053588065211827,0.7077330062062295,0.7457258986863491,0.8542589833052672,0.7579041700960429,0.7690162434662349,0.8314022907491794,0.8312396741775248,0.5090204734346042,0.3424905460376342,0.37235801051659867,0.36019290026112327,0.9242604355110602,0.3475450494990129,0.7459342079979405,0.11252895036790211,0.1928525459112953,0.4174817752497266,0.07359911994876156,0.8992753448806514,0.5320602167348891,0.45535926992146325,0.5891182960337806,0.4361803694489059,0.6087394806322084,0.5615930642263687,0.7515310796975805,0.011784661769144389,0.4206404224206095,0.3568250052330735,0.2685147045674523,0.048476426964422226,0.5846925564378509,0.6246396578131059,0.5907880219995589,0.7256888230898006,0.6476038180395651,0.5389231067105167,0.5206854289893565,0.24714892320391324,0.11555829534412898,0.819924084247774,0.2124555527672254,0.572212055499117,0.5564709547769688,0.07746689243271376,0.20486420946427297,0.4337042231182049,0.31185088788083815,0.2617792349984087,0.7147955618318225,0.18067962945811677,0.8621688475342357,0.6759351268930831,0.3725822122646376,0.8878397209105588,0.00977571703477742,0.18580301866369542,0.5173096176923297,0.8619442205740175,0.76897378331044,0.7142209189374076,0.5436650954618112,0.7990074992207756,0.9569486748280043,0.3764946751145266,0.5270692433528041,0.40205454825406894,0.126991502479062,0.29764877836524484,0.848441535652279,0.08689170133209156,0.7254759787628997,0.4056848893395979,0.9743472644651179,0.7434898246359258,0.15677179824515686,0.5480772170286567,0.6127203131329348,0.2110244568488313,0.2370248035982725,0.09951622624674639,0.642381480528029,0.8444703439150929,0.5705782949134093,0.006937444471268206,0.8045439050034608,0.04047598015862097,0.3484352773655697,0.2424902465315264,0.511782038418918,0.6482943581685796,0.5128900626423896,0.1911059678991487,0.21477591062818235,0.34683147442368933,0.39828317520064416,0.25926582125565,0.2930967586587454,0.7146811770448838,0.6660703738662512,0.06663528780510419,0.44991813922809465,0.7408282655069085,0.7439535198751883,0.8419052647531475,0.37228312569848443,0.8570985699940188,0.32070941765793326,0.6066671294011268,0.7176391047145778,0.3593841019341817,0.3324880673124355,0.9655391860468583,0.4060069184803181,0.47457638185843876,0.3866638483528082,0.39122442400744895,0.6221255385099476,0.45287956617403236,0.016471286826503784,0.993252461708338,0.39971948096398036,0.6335746148215464,0.596487778682883,0.13464975670307644,0.4898282323725751,0.6023522101480965,0.9154253176251992,0.29536625806452244,0.6520912612125536,0.8696770155185742,0.9116529014557264,0.4077658757601428,0.5202388633488946,0.6694991990421875,0.707374976900379,0.6759173037966419,0.5528185138485497,0.7433595938132522,0.6993191071770195,0.2225527860033507]}
},{}],30:[function(require,module,exports){
module.exports={"expected":[2.2366391264959935,42.19470912059119,9.659545686390858,2.8100051205121988,2.152829992686086,5.350430548353075,38.42891821056151,2.863843613293904,2.5222061758988765,1.8658132870080528,1.919669948257481,4.3974676078786334,1.2335835183325428,6.7915500741689465,2.6595431648471153,1.489729113771683,1.9283403195899087,77.09849747447613,4.944016401613495,7.5531657668766625,10.104435354149025,3.780056154886165,1.700129614007826,2.068055035594709,2.170140026676223,65.13114887221266,3.4838679824942096,30.133967149396696,11.426130349230144,3.1272213957381756,2.8543877687797012,3.1196494339282363,1.8569609985972537,2.4080463730333186,31.92863275693392,7.036020182744157,2.5605292878543096,2.2103271988442086,4.043179973895631,3.1372326619777087,1.42750617610816,2.55362463419506,1.2603015958335377,1.902781613113983,1.67078513982498,4.102623423711531,21.111520682330106,3.300810187985802,3.821984915809027,8.917759350761088,3.9924139419827047,6.0755636109759825,45.201227421538604,1.6822028034104706,1.9365688403007792,9.044091496639606,1.8610855013743446,4.817717443455867,1.8747502753979026,1.907654615780103,1.7033636171630662,19.491269363718406,1.2686465274558913,12.705494433114717,3.50893290733572,1.7400140484903244,2.8143335212058496,4.563036587677122,1.2266892450081712,3.5549179835226217,7.220740431139482,6.210330476065214,2.054348592559115,3.7247931606155786,2.980380683418832,3.9256817732371867,2.237117917886331,3.597674681592481,2.4561970240571647,6.6266096262672605,5.80750022482338,6.815013000753686,1.763723676000776,1.5467177210516379,3.417641176227469,5.474847126076994,4.152692325184216,1.6431886788255885,1.4755616661549023,3.3202271739123,1.7133516342126773,3.753099909403343,2.643914374035239,1.8984212242701641,1.870518953808778,2.5780953727370335,97.86222638821843,3.70865549614378,1.6161191460563935,3.797938407797935,2.268255161934772,5.163076324619867,2.885584543076239,2.4326575576109235,6.4320928285457075,2.352150265982473,5.756240029349066,2.932007994923312,5.21922350143838,1.442124081430259,2.892417811015315,2.9538543714095145,1.6949596733353414,8.184147850191946,0.9673791211375198,3.1214666540678206,4.825226839912384,1.373811773494767,3.023182844546015,0.6767886414119738,3.1974065850850066,2.0064174589561103,1.719693955355986,2.6552805326161133,4.324442771683488,1.6138910214524915,3.4097715288757415,2.2977620266304215,12.082361337779679,2.3901116114242735,6.569155036345083,15.024038257734142,7.702265917729164,2.5553070345828943,3.225154338838047,91.1111939408454,6.839947657462265,6.301264303196524,2.198628062844282,2.8434653618934975,4.331081683710775,4.298610918828141,1.7048212942931813,9.239297057848063,2.4332619797680106,1.1627007046345672,6.033071438562613,1.3895780207189086,0.5551839387835222,2.2935404625026092,3.1651040939873307,2.480234823971692,1.9778113059368203,1.4604323909674075,9.501505262742665,3.9328041028641643,53.863844644005034,2.592302065486936,1.6926291351080744,6.434912547254994,3.960221034065312,15.963505762791423,15.061070498218653,1.5932075671641732,4.362577916835375,2.929735834221662,1.6566918553091121,6.160371693506816,7.175202065357404,1.4773528585462057,11.307325106657178,2.094207435107718,4.266249897970753,9.679721113191258,2.599134619258668,2.8437072081597767,4.433599035724681,2.0564134008136383,4.505176024952529,11.89305472935551,1.6476204591524932,4.2053842222832705,8.603730492564623,0.9125566881991083,1.7892404221258018,5.128764692121392,1.969278059512793,1.4826002524937019,0.924696828893295,1.7976972258660024,3.2368435079013547,3.104781752807876,5.061258928146757,2.9874589416158277,4.3234717024001705,53.6809211977277,1.7774559738136584,17.064254778082773,7.739206200562494,2.5845587723035126,6.694893623114133,12.547599886709122,2.177027266832435,6.357349911012702,3.368895457755356,4.036561118412964,2.8093373596271616,1.4706101129924214,1.259018512053052,11.576038028647389,1.6801511566172336,14.29051704505399,281.25597753884983,3.9861203875811673,1.8099429634311635,3.27186344586256,1.4546911589990643,0.7976820158095742,2.239136339784278,2.6627903019532764,3.6871649225978014,2.3418870072523554,2.53982675226913,0.8104017168758398,64.58751690963463,20.83265373261485,3.9244644915552773,4.714939688480928,6.996710970077197,2.67022292121629,4.553480559327289,2.233350425285878,0.6689071199274064,3.6916832557138592,1.709378724759893,1.7435356824854293,3.9677947782711964,3.9945258216188533,3.4353489557628594,2.503749572254588,1.209854330710777,5.500970950427499,3.329245132477832,1.3113835185011964,2.9639716813069232,3.538043150522037,1.9505642856055503,1.3237008087467557,3.4679176019523794,2.4691424203972114,2.670257349318956,3.8042070876521503,3.08449768044204,16.652163075288367,2.074706399267984,3.845120186338468,15.490065970489804,3.29908941272065,1.2636754281071534,3.517419774313966,6.55861304842347,13.287925394910067,1.5478285558991434,1.4123922554173751,3.8014437089038786,11.263630663467719,1.8994973022520396,1.5257845516321922,4.382729039512669,2.6686940370792533,1.58987317895149,5.646616418428967,2.502183068572416,2.0284585262019457,2.481143027193812,3.1013860567404152,2.172550372189817,16.77988864588344,3.4842244116778565,3.108453560582139,2.7343204987895886,2.738307445745908,2.5465600766334977,6.952209771198026,2.28877021463145,4.13647940347791,1.2180814770508004,1.6196686791724058,2.1750576831271893,6.290836982210039,1.7063163194614581,1.6384884063427467,1.0393218228807863,1.8866504058312317,3.6611589815095997,6.178847719946943,2.3710913290666262,2.1644726254079236,2.8555626655083297,6.076805038881483,15.715727608115268,13.090242643025187,1.796141573439599,3.208907722879665,5.496230827218016,11.15640550124929,1.6024696410813677,91.2908220724838,2.4205090189723673,1.2663026216765763,3.613463702252454,2.314668927617979,0.9752739810908655,2.9643589083102073,1.9670207039282348,1.9148541511733064,3.4218503362645425,2.184967366983045,123.85159215562582,1.9617039351035273,6.400123178428177,2.477027740006932,1.4979417888081379,2.460173102869296,2.433718925359479,3.6423299529783777,1.6269770076278374,1.2680182290704891,5.694578028806315,1.2319260580674936,6.161151359067291,0.8720721588024299,1.7644062553710484,4.416378555509444,3.2713377447772976,1.7067481712319434,6.351045721368155,1.2383491222885745,2.2299555530350905,5.073156960194458,17.572178752980896,13.928539403491957,6.859071601329279,2.031135004426552,5.161980680288877,3.487971160822278,139.8577673080123,3.976141650729487,12.453251575428885,2.8110438953141603,31.570068120266495,1.9397949393232452,2.3024227345466923,6.867132028584985,8.068281136906704,1.9133343098333582,1.2073840480402431,1.219935379854472,11.683388316418604,2.9930892145411954,3.006202020144167,3.7993190199428404,2.215941077667051,1.664931363762565,10.203965474011758,3.1207357945782204,11.67048018950679,2.7152974015319176,1.0000458710715332,5.936249989709522,3.9532931079012994,6.754945542252029,2.0757320992641057,2.148444332050023,1.6283679904568693,16.06254311483521,1.4031123962490266,10.85546141812279,7.68134447316072,3.8044943231147816,1.983700730991443,111.11974414234923,1.7330507691824895,9.843918257138249,0.9524413786194368,2.125350893758278,23.29823622251106,4.849511710373989,3.067131065506418,5.172520175268188,6.295166191450194,4.165804640541006,2.9595065483510967,8.687051967924479,2.0594062981575147,2.1774931886235134,0.7674871229055671,2.5019086284203236,7.504914251600942,3.6997182973876797,0.805551292889111,1.5941322882804008,4.7069685457329875,2.394555537474312,9.389149542505178,1.9692491589412118,1.2798886192192889,5.355889552250612,4.370024629973315,9.005585299884359,1.3464501318252808,7.758700924929577,1.6740763860019656,2.002638716882369,6.868167716394191,1.6710415861514838,1.3774841432835023,1.327997533190244,4.417734270390992,7.566606733700218,1.8159909839190445,5.553460478109667,5.22249593607637,3.7277433433702187,3.143013995751761,5.541500360087407,1.9513455330543308,4.274988355611167,13.055541056008801,2.6802628342711206,6.455195348908252,4.317721446321141,2.0214591926393677,4.84236922451157,1.9545386421297601,2.5915203620640903,2.1858625614866907,10.003236973574955,3.8537667401867037,0.8531060665586697,3.2151859973258485,3.082594128853088,1.2368101283196875,15.619348422301387,477.1893907184348,3.789005316097068,3.0436473705889977,3.614875768038458,1.8161807115324875,4.491447504819293,2.820242536281836,0.5327328225623587,3.3391463587246415,2.7037877004576183,1.4711117926260706,1.2687521976307494,1.4148446228225298,2.147519837994159,1.9318651218008085,2.372101861261347,13.426974033021898,1.0896238315995874,1.8130267894051335,2.590704788215194,2.1753681794434776,1.9576633253618696,1.9880444693308996,1.8876899153249334,3.8606422516220213,9.220673231113436,2.1979484266009126,2.160549481633847,4.404559917812613,1.6943759528025177,2.373291927060322,1.814577196661929,1.9406036811824983,1.4361821285998109,6.3779249464657894,6.471863418559627,3.7943555429217466,1.761501302228178,3.07306428646566,1.6245627834659908,2.759976064874434,9.905719701467119,6.596772751069854,37.50603073269491,7.974952787759293,3.6829187556451615,3.247525434507267,3.524070562694042,4.441800149668819,3.192740250993974,2.650358624611745,4.776229331749673,2.050020346851325,2.2844630331154927,2.5917859017583544,4.145291343320961,10.061145742651247,2.0977482696568743,2.3769529754619025,1.5470536535985864,2.6851217981880557,2.8670190851050137,20.451383914941218,0.9910512962438558,3.0189312821145777,3.1782119441444485,4.690703215989387,2.2159160682326013,4.089701174042772,3.702620896969051,1.2667263155263175,1.900799221107761,1.5821916121895403,2.905168397253709,1.97242803536382,17.09364033830084,2.0786318992730384,121.32955165888004,2.2610475736607594,2.0339675196398295,1.6873332027253545,1.5624572690898464,4.889852953507249,2.960322696060745,1.413939017434875,6.288666898589736,4.838307767292296,2.0829945667100476,5.7020123172754795,2.9785429386462945,7.034811143313733,5.705527631280464,2.407276557460817,627.6682102409721,1.624866533064312,6.549386386769178,2.650154811629285,0.9841744266419417,28.861162933160074,2.666747141914762,15.730604970025919,1.5565741716701287,2.0412285518684126,3.867106893561072,4.556423242544879,2.5361029719695143,2.4109562777541584,3.245556962055924,3.5678631455376535,5.030343771408599,3.3802952376498863,5.123472684286546,2.601403716680762,2.139215801743886,1.0627737016736025,2.0610703540734043,5.193418798320234,1.533747928978261,10.856306286494338,1.4137667736829367,9.753307869494977,1.8721063069625756,3.280648223847617,1.6728751216644597,6.086077973229781,2.0439370060544815,4.887277907025472,29.83462148096271,1.4697319427531594,1.3215930530058677,0.8498912785449942,3.0855879365820607,10.399454529673717,3.080138480128208,2.18803890633486,1.8208069506441085,4.2530769492697145,0.9888592553890906,12.228902590040816,2.396166928240877,0.8652109012287685,1.3391955653750605,2.0337941373847523,2.081813428071983,2.37863132175819,2.8468872123715383,20.835849437464198,187.84636009896118,1.7539659335759958,3.53240989699469,2.0655657544185635,67.6585816446628,6.100285973916214,5.256876187181028,7.205633815699132,9.706216611654177,1.0145174726498993,2.550333925597217,2.316369596523598,14.125231296259686,3.17779227049107,9.979651737222348,1.3963399256061566,1.350348818439217,2.5312920534134165,2.3255806355811877,2.479034325635835,2.0490975124983586,3.225227921096399,2.6875399159979754,1.2758547242038696,2.5026934342259284,6.235772365327498,3.531036107320612,2.1404035724041655,3.838550337418893,1.5518930188944684,0.9343421106797296,2.8476301797386996,20.995852417428885,12.045653864208726,9.011733066314314,2.117346436857856,6.875981519061812,2.035127860793153,8.588414394468318,6.271206472126476,2.5477370591178814,0.9780168956655135,1.624538832165954,0.9039969467779558,5.487143392138657,35.24959919621781,4.200954358892285,10.447833872328575,4.593697236325742,35.98797303528754,1.9548168842173435,2.6842225719728643,2.072749532080076,1.2487401026173204,4.819276838926059,4.577067178777147,2.0233634041088244,2.535750154922505,0.9400050645318573,14.969294238775134,392.8610742291647,3.3433464089913363,3.888325621250042,7.933411637897257,6.008659469609875,1.7993840559033067,4.128781791835687,1.948729635926487,52.821515294609476,1.2551135476466027,14.743608908949438,2.03260665074858,3.2680480129455565,22.18327651564114,1.3046102673505278,3.9727709807086717,2.2527651765375025,4.383643215441926,1.6162388765654063,6.475795603772775,4.151629092315529,1.5580239577705834,2.028300793519408,12.119053309889333,3.6537045929041496,2.2858825294187173,26.250728045320834,129.74834827959768,9.279980849419621,2.395739444466173,1.518773937724563,2.877848452710099,4.922178297018305,2.9354258915553437,2.834399483377658,6.307495222755502,4.587957497585765,1.7964831198045905,1.2428894047261745,8.477156798612562,22.4562424666111,10.385763271582382,4.177753974703426,2.969596386930582,3.856110522847993,1.4569916592222958,2.0158515429315806,6.312110798086713,2.956113420829042,5.0283411370009246,1.091488823337255,5.404091156512315,13.69762215127407,2.6791576384607034,2.249479084913821,2.3776082680217923,12.524018347628937,3.3819141359696467,6.913234650536681,2.5701821014364388,0.7040984729394405,2.731852168125706,5.904391470287966,7.2817193148225865,2.3853657226010534,3.1877401225316713,1.4915616393690052,1.526942243802803,1.9145673572116415,3.1395673883450432,2.301834391887838,1.0665886487763758,4.9537826503518305,2.8183594328239026,2.8073220420328595,1.686325771816999,1.1857669575651657,2.30040745055069,3.2842753793102624,6.020627029569178,5.22829237247244,1.8796802361940685,3.710410339304992,0.9123052791530039,7.389582067095496,3.307138388776902,1.512810047430045,1.6962667819728807,17.696104689357046,2.8421747331239238,20.503044808124415,46.02657600823398,0.9033604368911758,1.8135296934374403,4.566287873474582,4.271530797454313,11.829631575628706,1.7380063504618593,1.2049071863548146,9.121605454671649,2.936221079069299,2.7131695334483674,1.6098087125854346,4.574473762517657,5.983775585869624,18.458085818282946,1.3771498785073994,1.2662015206140933,2.5292722743890685,7.445848507017398,1.3441571028508197,2.277921617645249,2.1042338774718634,2.0803112962978143,3.3884541092388165,2.103816516467107,62.40156778457866,5.444436722624684,5.133967485292911,2.5903963167866224,1.801996367540769,2.242559441631112,5.458520016157058,1.633756712462823,5.908787380952364,1.8122193362170902,4.766783605970867,2.4041239003494344,0.39942561767080953,1.463730594264413,12.699197988341076,2.7293889222710126,17.1098593190511,4.588536189367886,4.9032337065955085,17.412660205257513,15.10115399189916,1.3311552797752237,120.6526888589262,2.942074345112598,22.496587468505133,6.318941635489121,7.012745194374029,1.7416022500313961,2.5085660696969816,1.4895553318459378,0.7839665107750055,6.276260337267749,0.9548322056948437,0.7242873025096233,3.0579663135953177,1.3881570122413631,1.430472052184306,3.6675819427072516,2.6373231020584655,0.9320326745585695,6.277499753477726,1.8019132323337996,4.893061218331031,5.475418202692181,2.252482840972212,6.697242480009807,1.8031134943430935,2.131663719851539,5.762556520462075,2.5718065822558933,8.524215972149461,9.057487980256614,2.9170278112654335,7.324914761942653,1.1686193170191337,1.3313668467514943,2.439244028820529,7.1099567219832425,3.856597273482584,1.1683840392823452,0.7095843220540626,2.5081555292269315,0.7822448586270586,2.3717887498011994,2.892058285745133,228.7717227274271,1.7195628442495314,7.795360246803692,4.329141581275841,6.115346071570019,1.1057818983981789,1.869397445205174,100.00437494713825,1.9074271714362294,3.3032608644923163,2.896652284458008,1.6755259335159207,22.887558829161623,3.5936959573185336,6.168417640426331,3.458809621720162,1.3143721396907677,9.56157609530341,20.711085224145183,3.8603245004829096,3.5230882322252404,1.2335455533526996,1.655533305201739,33.509306541195215,6.617729769837057,198.39772746273377,0.9492037778582376,0.8935784329637301,2.5452303272738788,2.4839422508956908,11.18719465402269,1.6472933122714046,3.411096605743969,4.536593617606096,2.5584351709318205,5.947535063525515,3.43289937065579,3.836762276234076,1.8436337478530707,10.11446793462369,5.097466451631801,1.2775363075247892,1.9284674722082293,1.8051577695168468,29.851834873531836,5.584022734865613,2.7491653917220478,2.6247486352660734,3.4534249315478593,2.644374447942698,1.197061562678938,1.8394225442781356,0.8779264170391884,1.8570645059657847,2.3791833317697857,2.4587059848593595,1.1724901973389426,2.3279151117988968,7.267376261795802,4.215826716907172,1.9726178024711176,2.3956125331709157,3.5292276640205564,2.438703367329467,1.5590641529796234,4.357775181082354,4.647510177313207,2.3285620869974584,2.6424464149088007,13.23252507130726,2.389818383059658,1.7153886302140975,1.6290499686125297,7.287331227082437,6.994833151850889,1.12011715013293,3.1012766209141898,2.1928122472581495,2.1062964570198774,2.7039331219671014,1.626498857161159,4.194549059982171,2.1188491607334226,2.004190653421905,14.629245209594282,1.0235895271830768,1.9429249418982764,2.454369143035738,5.673705203483841,1.5377740271732165,12.743008759633902,3.5978705077306232,1.4062782494536505,2.4010614500993497,1.9148035663287015,5.750227755984772,10.770052003647427,2.318925019664163,6.299792000135872,8.141414403599764,12.914415081347677,6.449652573362924,12.560336268255707,2.3176943007494355,7.800946247283927,5.784453514475869,43.339247609304074,3.080559735051683,7.486139909922758,8.659682142053311,2.1239994706921173,6.288704737500694,1.7323417916108652,1.5624636811194885,3.1698449696189894,1.412426761492559,52.98113383233418,2.1747762830041726,1.2825486084284454,5.603720873484225,4.650223241516643,2.3816978004953118,15.151350600080525,1.6014508226485795,5.364051273282423,1.8813548606541692,8.766132915903134,1.797499867028037,3.9796519827021206,2.943812257746042,2.2724252426723694,1.0409500183755531,2.0973426000903306,7.280509238888986,1.578067401928337,2.327300574460325,7.1296215611405875,4.208829270377982,2.7147841527905747,2.0354142797483536,3.989727053738119,1.5840902809579696,10.387718557640222,59.26319339302561,1.7869561907481144,1.9048686445523602,1.8989020079449772,2.2824252373585967,2.295659791079777,26.661560580007322,1.4204264513866292,2.532318429665459,1.4287561172705243,2.058563053531379,5.672772519344713,1.5683224893163272,2.0370869161763774,1.0654183396966763,2.7384404973757546,1.6881442209148492,3.3487481796978478,4.465943330931439,2.900365333828822,2.0552799554041274,1.4722458956308055,3.3678624781339077,7.837088415009148,1.654738492683888],"k":[16.0,15.0,17.0,15.0,20.0,18.0,15.0,20.0,19.0,14.0,18.0,15.0,14.0,11.0,17.0,12.0,15.0,14.0,14.0,18.0,17.0,12.0,17.0,17.0,18.0,19.0,18.0,19.0,20.0,18.0,13.0,12.0,18.0,15.0,15.0,12.0,20.0,15.0,13.0,17.0,12.0,13.0,11.0,17.0,16.0,19.0,16.0,19.0,14.0,16.0,13.0,13.0,13.0,14.0,19.0,18.0,15.0,14.0,14.0,14.0,15.0,11.0,15.0,19.0,18.0,16.0,16.0,15.0,16.0,19.0,18.0,17.0,19.0,11.0,16.0,17.0,19.0,20.0,13.0,19.0,19.0,19.0,10.0,14.0,12.0,19.0,16.0,12.0,10.0,17.0,12.0,14.0,16.0,17.0,16.0,19.0,16.0,15.0,12.0,10.0,20.0,13.0,15.0,10.0,18.0,16.0,20.0,15.0,17.0,12.0,16.0,13.0,17.0,12.0,11.0,17.0,17.0,13.0,15.0,11.0,10.0,14.0,18.0,13.0,19.0,14.0,11.0,18.0,19.0,12.0,17.0,12.0,18.0,18.0,16.0,19.0,14.0,10.0,15.0,14.0,11.0,14.0,12.0,13.0,16.0,10.0,11.0,18.0,12.0,12.0,14.0,14.0,15.0,13.0,20.0,17.0,17.0,14.0,16.0,11.0,13.0,15.0,16.0,14.0,12.0,13.0,15.0,14.0,12.0,16.0,12.0,11.0,20.0,14.0,11.0,11.0,14.0,14.0,14.0,17.0,15.0,18.0,18.0,12.0,17.0,14.0,20.0,16.0,13.0,15.0,10.0,15.0,17.0,11.0,15.0,18.0,19.0,11.0,20.0,12.0,14.0,18.0,19.0,19.0,20.0,11.0,19.0,13.0,12.0,11.0,12.0,20.0,17.0,16.0,20.0,11.0,11.0,15.0,10.0,14.0,14.0,10.0,16.0,10.0,15.0,12.0,16.0,18.0,18.0,12.0,19.0,14.0,13.0,18.0,10.0,15.0,13.0,12.0,12.0,15.0,16.0,19.0,16.0,18.0,17.0,12.0,11.0,11.0,13.0,18.0,19.0,17.0,18.0,14.0,18.0,16.0,19.0,18.0,10.0,20.0,15.0,12.0,16.0,17.0,18.0,16.0,19.0,19.0,19.0,20.0,15.0,12.0,18.0,11.0,13.0,19.0,13.0,15.0,11.0,19.0,15.0,13.0,17.0,18.0,17.0,19.0,14.0,11.0,17.0,19.0,17.0,14.0,13.0,18.0,11.0,17.0,13.0,16.0,18.0,12.0,19.0,17.0,16.0,17.0,17.0,10.0,10.0,18.0,13.0,14.0,18.0,17.0,14.0,12.0,11.0,17.0,19.0,17.0,11.0,12.0,13.0,19.0,12.0,14.0,16.0,20.0,14.0,14.0,13.0,13.0,16.0,12.0,12.0,12.0,12.0,14.0,18.0,17.0,17.0,14.0,14.0,19.0,11.0,13.0,20.0,13.0,19.0,11.0,11.0,18.0,14.0,13.0,15.0,16.0,15.0,16.0,11.0,13.0,20.0,12.0,19.0,16.0,17.0,14.0,13.0,20.0,15.0,17.0,12.0,17.0,12.0,15.0,19.0,20.0,14.0,17.0,10.0,13.0,15.0,12.0,12.0,14.0,17.0,14.0,11.0,19.0,18.0,17.0,11.0,12.0,17.0,17.0,11.0,11.0,18.0,11.0,11.0,19.0,15.0,11.0,12.0,15.0,14.0,17.0,12.0,16.0,10.0,19.0,16.0,13.0,14.0,19.0,18.0,11.0,19.0,12.0,10.0,11.0,12.0,12.0,12.0,19.0,18.0,20.0,13.0,17.0,14.0,18.0,11.0,15.0,19.0,14.0,12.0,16.0,18.0,12.0,17.0,12.0,19.0,13.0,17.0,20.0,14.0,15.0,16.0,12.0,16.0,17.0,10.0,13.0,14.0,12.0,15.0,14.0,17.0,17.0,10.0,15.0,18.0,17.0,11.0,16.0,12.0,18.0,18.0,17.0,19.0,15.0,13.0,16.0,15.0,17.0,18.0,18.0,17.0,19.0,12.0,13.0,20.0,19.0,19.0,10.0,20.0,15.0,18.0,12.0,14.0,15.0,15.0,18.0,13.0,16.0,11.0,14.0,13.0,15.0,18.0,15.0,14.0,17.0,17.0,18.0,17.0,15.0,11.0,11.0,13.0,15.0,15.0,15.0,16.0,16.0,20.0,16.0,10.0,14.0,12.0,15.0,15.0,14.0,16.0,12.0,14.0,11.0,13.0,16.0,15.0,15.0,12.0,18.0,18.0,15.0,18.0,17.0,19.0,19.0,12.0,19.0,15.0,18.0,15.0,10.0,13.0,15.0,18.0,12.0,20.0,18.0,14.0,14.0,18.0,13.0,10.0,11.0,18.0,13.0,12.0,15.0,10.0,18.0,14.0,14.0,16.0,14.0,20.0,16.0,12.0,14.0,17.0,19.0,19.0,14.0,14.0,12.0,13.0,11.0,18.0,19.0,14.0,19.0,18.0,13.0,18.0,15.0,12.0,15.0,14.0,12.0,13.0,20.0,12.0,18.0,14.0,16.0,16.0,14.0,15.0,13.0,14.0,14.0,17.0,12.0,15.0,20.0,15.0,16.0,11.0,15.0,15.0,11.0,16.0,16.0,15.0,17.0,14.0,12.0,18.0,16.0,16.0,16.0,14.0,10.0,15.0,12.0,11.0,20.0,16.0,15.0,13.0,12.0,13.0,11.0,12.0,16.0,13.0,20.0,20.0,19.0,14.0,15.0,17.0,12.0,14.0,11.0,10.0,14.0,20.0,15.0,16.0,12.0,12.0,12.0,11.0,17.0,15.0,10.0,16.0,18.0,18.0,19.0,13.0,17.0,17.0,15.0,17.0,11.0,14.0,11.0,13.0,12.0,17.0,16.0,19.0,18.0,20.0,15.0,10.0,17.0,19.0,18.0,10.0,13.0,15.0,16.0,18.0,10.0,17.0,14.0,11.0,14.0,12.0,16.0,14.0,14.0,17.0,19.0,13.0,14.0,17.0,17.0,16.0,12.0,17.0,15.0,13.0,19.0,14.0,11.0,20.0,12.0,17.0,11.0,16.0,14.0,20.0,19.0,15.0,14.0,13.0,15.0,10.0,16.0,15.0,20.0,15.0,11.0,16.0,12.0,15.0,11.0,14.0,19.0,15.0,17.0,10.0,18.0,18.0,16.0,10.0,16.0,16.0,12.0,11.0,10.0,16.0,13.0,14.0,13.0,17.0,12.0,10.0,12.0,12.0,15.0,16.0,15.0,15.0,11.0,12.0,12.0,12.0,15.0,17.0,17.0,12.0,16.0,13.0,16.0,18.0,20.0,13.0,15.0,16.0,13.0,19.0,13.0,14.0,19.0,18.0,11.0,16.0,17.0,16.0,16.0,18.0,18.0,17.0,19.0,14.0,20.0,18.0,18.0,20.0,16.0,14.0,18.0,14.0,14.0,18.0,11.0,11.0,19.0,15.0,13.0,18.0,18.0,12.0,17.0,17.0,15.0,19.0,13.0,18.0,13.0,11.0,15.0,13.0,12.0,16.0,18.0,18.0,17.0,11.0,13.0,18.0,10.0,19.0,12.0,15.0,13.0,12.0,11.0,19.0,14.0,16.0,17.0,19.0,10.0,15.0,20.0,20.0,18.0,19.0,17.0,20.0,15.0,16.0,19.0,14.0,17.0,16.0,19.0,15.0,10.0,13.0,20.0,16.0,14.0,12.0,12.0,12.0,19.0,14.0,17.0,11.0,14.0,17.0,20.0,14.0,17.0,16.0,14.0,17.0,12.0,19.0,13.0,15.0,17.0,10.0,14.0,19.0,13.0,13.0,19.0,11.0,17.0,15.0,19.0,12.0,19.0,16.0,14.0,19.0,14.0,20.0,14.0,12.0,17.0,19.0,19.0,15.0,18.0,11.0,12.0,11.0,17.0,15.0,15.0,18.0,17.0,19.0,20.0,12.0,12.0,13.0,11.0,11.0,13.0,15.0,18.0,13.0,17.0,19.0,10.0,15.0,20.0,17.0,17.0,17.0,15.0,16.0,15.0,13.0,20.0,14.0,14.0,15.0,19.0,13.0,19.0,17.0,13.0,18.0,18.0,11.0,14.0,11.0,15.0,13.0,16.0,11.0,15.0,16.0,18.0,12.0,10.0,16.0,15.0,18.0,20.0,16.0,11.0,11.0,14.0,19.0,19.0,14.0,15.0,17.0,13.0,18.0,11.0,13.0,16.0,15.0,16.0,16.0,11.0,14.0,20.0,11.0,11.0,17.0,19.0,13.0,15.0,20.0,14.0,16.0,11.0,14.0,14.0,16.0,17.0,14.0,17.0,11.0,16.0,13.0,20.0],"lambda":[4.78347733162229,0.29928408141859597,1.7213559614264118,5.546930813857827,9.136005354825908,3.4524832404221617,0.3860998374114577,6.972171693595017,8.346079088687118,1.8171051647259784,8.134489958798865,4.519281123313464,9.78067858552133,1.3616862989479972,7.131466468860026,7.03081843806463,6.809681023612589,0.13397524811387118,2.900340532547405,1.6235100251443413,1.735956901668616,6.68688437510421,8.967122544217272,6.880088420133347,6.512376743843571,0.2963246101430417,5.461708685735919,0.4811332627331799,1.552157908045546,7.44976147815946,5.887482290291888,2.9831168532101837,9.56251994051734,5.077505666185582,0.5441210194633483,1.620910794083008,7.313747209489165,8.568767699584077,3.1560477573017054,5.120334491221166,9.836625247636162,7.187914729415827,7.636859270578224,9.328549988209396,8.567715020007306,3.9167915005844334,0.658514832852739,8.392770146330866,3.8955580052630023,2.1168397619036927,3.063158602606999,2.355368613687927,0.2377022432114928,5.583368759492579,8.808451572394208,1.8455929993583386,5.474389134639406,1.8744322085600684,7.974357840357977,8.2663671086034,6.0293798689134075,0.697867071971503,9.418418000875636,1.1637366027662854,5.871056446389995,8.01989695600308,5.2937223174007215,3.8272432583886173,9.394504733444666,3.874675322879,3.9864058939918046,3.010526182992259,8.75669069915384,2.9303212832290626,6.556486067974507,1.9104415511626782,8.679221242013561,6.073545420446827,3.9855676605773382,3.0864043461687007,3.0628372353756483,1.9360381892844902,6.0023470098578935,8.021559849000884,3.610416262779048,3.65841648192315,4.092764027069132,2.774124544979666,4.326628900565417,4.985997062810165,4.538329229285014,3.9270349327823872,6.7441042631853865,9.043367985144105,8.83061490111077,6.600068504473193,0.13823556133391035,5.78741662150774,5.745700197997103,1.3272350246130737,9.2336801529051,1.9953716265833665,5.3320236803616865,3.221705004413671,2.718492296345736,7.826619882116395,4.329713796410022,6.088368623898955,3.2791127197165437,9.734107987187175,6.301542286271742,4.9735967539018855,6.967101666049931,0.7226180774882729,7.062814563898314,6.243540048847118,3.342308341581841,9.160653946512573,5.165093891872317,9.977910928705807,2.005610397028519,5.368086713521462,9.21838518023047,7.768699719759606,4.90167326782974,6.3053870854507865,3.926397743314003,7.15858818889364,1.1241532904606077,3.293061097809795,3.583805996164968,0.5290612487113999,2.2893145374950463,6.949757115363367,2.8711557691978373,0.21547150967681006,2.186964398844442,1.547208178435786,7.030197774471527,5.944046730479309,1.5123602360712307,4.335100742470059,7.580202007062322,0.9404455666297529,7.74433122774024,7.630817753700749,1.4073170561699766,7.8536849147836385,9.012200697488598,6.995491364888813,5.003381110570741,8.027598370501455,9.316442291267817,6.197895982960939,2.816191431249102,4.104135644064575,0.392367415345829,4.149277937799612,8.88458182300053,1.7924618467465425,3.321927884734537,1.5556631190251857,0.7505668493047213,6.52847330629889,3.2367711458499104,3.5709555628844747,5.9713203388994724,1.6385598567347759,1.568377658948772,8.330293671462442,1.228358485544918,8.809527419544384,5.745531404812501,1.6963778362652615,3.2336064516748353,5.899924979485059,4.206330153237136,6.857809412913896,3.537495053685067,1.5194998552251904,6.90432209554835,3.667484712664284,2.7498080907734868,9.88941684090937,6.49450440382934,2.600189213272137,8.097694892457127,7.9414387978655725,9.058505499321347,8.180350270622485,3.363368217242817,4.3020449639199665,2.973732750246616,5.568595195956445,3.520392429764838,0.31301759248489436,7.441964962827701,0.42033489941039504,2.2377584351624114,4.751822486598782,2.907746648019449,1.386067319908395,9.465002556524594,3.2437449814922137,6.0334242168063845,3.143124817957066,8.337067520523382,7.1884308667477175,7.639256923436079,0.6436123412501926,8.144219515015196,1.443763074026816,0.03938266116940037,3.5970077910083753,9.991079943021408,3.9690186267293903,8.995047639448677,8.998808330474704,5.174075252789507,3.44365778139059,3.540792030720721,5.510377627365733,5.614016494589338,8.85307138560374,0.20756953575406856,1.018001495459706,3.688642403378799,3.506566426762554,2.061804552881261,3.846671673607762,4.536279836570691,7.73711255929713,8.355862630146571,6.354622530204392,4.639581155717131,9.491519230049718,5.072961916199978,4.463425098394362,3.8537734158732206,6.7197327167126435,8.842838091083792,3.7691325019599153,6.4157281263880535,9.149906872267234,6.0469089128186,3.6269321443963887,5.805190938028075,6.643537809949029,5.2309327267154515,7.839495750764476,4.902598277523045,6.218405097161304,8.240483619802134,0.6361854079155727,5.995402207335562,4.754295003393927,0.783542498525005,5.206804950997825,7.530910587717628,5.60573166329559,2.2061630218706263,0.9954158121194179,8.715276011822027,9.417005076795697,4.163739507887964,0.9961365205507478,5.883298480839354,8.412559359890015,4.434818253044477,7.523891095295749,8.253254420702937,1.985951279970557,9.152866570616432,5.1627322588989095,5.807118861339411,7.24238531719041,8.681122757611208,0.7540186043419794,3.4654108059618727,5.671520012108031,5.737383656346358,4.890148191665233,6.460534205880107,2.7956968469407717,6.363425299809249,4.022131417704447,8.266090188845167,4.018523329673796,9.26521257097193,4.694079385381171,9.523558973380908,7.710617699281448,9.804849547569853,8.719199421137045,4.134704248295722,3.4143911239799407,4.544559173509855,5.952326223425175,8.682790877802178,2.1985739922308523,1.706729606510633,1.2524639346426936,8.99776024118813,7.428797930299627,4.6516947350940345,0.3992817724094655,6.439723537517645,0.24408175531202891,4.489400134993136,6.738436737709488,5.370805577886337,8.293684997927159,8.425266931627489,3.4358876126604287,5.574935068218865,9.416605309264511,4.662708983976353,9.977176026810714,0.0790983829650238,3.785953254108325,1.932615697523492,7.386338753202035,9.557235668940855,4.9196708089657415,4.298917722566737,7.001202784407779,8.773957157205325,5.249945108877405,2.1281966962680476,7.862537277579797,4.039923385356959,8.578867238122655,5.623581161362166,2.312744599910719,3.202006554488397,7.762799246942771,2.4600164175233297,9.883196848670456,5.292853815722641,3.88411966449846,1.4395810011588317,1.616971681504371,1.1928968808118179,7.008494750085741,4.238466531441021,3.0338027357996578,0.16432687069841467,3.3452468894627496,0.723373229812434,3.8545381546422175,0.3939097338394215,7.1371397991014485,6.787500207076098,3.35285603726982,2.3134506117107656,9.397816621441715,8.558781824538693,7.620461129103142,1.0676337963961702,3.4585602599863674,9.54908286821603,4.418044793067475,8.286255440917138,8.379376855074076,1.6235669057438251,6.894429564038709,1.3804681153051779,5.587815018309619,4.763868238267486,2.7197560673451626,2.7685395207733032,3.4440262238031805,7.865968164377839,9.652567995923889,6.990849933336389,1.0643098013085428,7.39455967537249,0.9391446268765269,1.6626653862829932,3.811235194437934,5.366084467160627,0.05221919257328844,6.94872617899404,1.105579347179002,6.556041922789186,8.789980702911496,0.7529824821022646,4.160387076882399,2.0121299389808667,2.8340820234725483,3.405715238779019,2.2150581139843206,2.03204777766562,1.555596844759275,8.147597764370024,9.358308524728848,9.717000484973946,7.544940452720066,1.4523574939457484,2.9860939190676072,9.154532556740316,9.437412709485201,2.483868822062363,4.937705183251186,1.7583822399863691,9.653803215330885,6.660918950683645,3.1483436824699473,3.837476505171815,1.6870449355990869,8.781049867927184,2.835260924039358,9.584261513186117,5.911071201028342,2.821842054428143,8.541299089888277,8.565367917037808,9.919666704651661,4.450194909891454,1.278952711286212,7.203960195594052,2.098645850064733,2.9790747172226673,5.786655084779171,5.532050905496389,3.956226572911563,8.95701653450324,5.054562868423593,0.9818379636176311,5.667500509458801,2.818763240114446,2.9909875513678186,4.763242090900861,4.766860981211076,7.143296885735147,7.18044319084137,7.745356866776176,1.2997095358222954,4.381902250551644,8.885322889754807,5.684080379542422,6.336440673150621,7.914683928502235,0.8938756972717177,0.03859360447738602,1.4721653273998592,6.765605488769038,4.620930589577581,4.071438830907981,4.509981992472579,4.55514875477699,9.61696151356808,6.4940262991795255,5.443158729346411,8.651623624179798,9.623422673816373,4.385624303173891,7.846077713869633,6.7542651968860685,8.316745628548093,0.7403188160613361,8.663702767173994,8.409773000128544,5.740330183595066,6.130396685333659,7.445286436461482,9.666671615986502,6.069892189742578,3.335541722951829,2.177450164284518,8.664805086440184,9.273764400513137,5.370289428131625,8.347287880126107,4.6556772207109365,7.544604411288431,8.093180798547191,8.050770743528354,3.02736856018331,2.5497716361173084,6.529522879162215,9.208322924509408,7.573751279377612,5.5937161998652,8.737277244568325,1.2274285403602625,2.261673697584521,0.33859994477009936,2.1833695742846038,5.57011961073822,3.8055816493544725,4.538168526690045,3.192537279419787,5.851146993826159,3.9064061261787475,4.716736798686723,6.503671264140937,5.513654519699087,4.949509611044567,5.820885843769723,1.501142128443358,8.136334311083154,4.658711193891898,8.686638718721703,4.232657343250736,3.6574290445671798,0.6195582357919971,9.695123296377847,7.02761247205534,3.7724432846448996,2.636172885353605,8.691200674290586,5.040757499176783,4.5708228760680285,8.98565914426583,8.649226854615106,9.98946070392538,4.612199566674393,5.924276480083512,0.561481218813813,7.991981034539791,0.23526613920366035,7.503473148261746,8.503415751120837,6.044883274936987,8.42236064111171,2.223303260283851,4.543646680846686,8.24029381065402,2.6607212191161755,2.671495276476743,5.676995841530461,2.4466388863801813,9.706803866042318,2.2098294875986912,4.750650246408239,7.285301715870962,0.03199735310939866,9.243532515406535,3.87298460575747,9.240033654038527,7.313057438806593,0.4014438913999041,5.336044590676723,1.5574134003644469,7.535767848482518,8.292999823016228,4.99270503568038,2.3327009517222064,6.900025062206514,6.68280644206007,4.250358874567517,3.4649076605456886,2.2031725043523553,8.31244194021995,2.356662104337024,4.604846348077674,5.226339389258035,9.446152639336889,6.617192917395089,2.4758108332295192,9.840219586484091,1.5400840608517186,9.125369484369227,1.723960901268724,7.4327687833665905,3.032132357054995,8.4029977164111,2.916122397103449,7.348902903820031,3.8484481157511152,0.5452398382786039,6.903749675494026,9.35788336017971,5.6219374996418985,5.684306883605437,1.7214610663225027,4.686343824889567,5.918696832890453,8.745823229859507,5.896797891665937,8.522542791237317,1.474007447905712,8.2069889147827,7.502192335385325,9.872114548482365,7.6916736509595385,7.28745111816006,4.715780162522433,7.499328655205746,0.5510329390556579,0.1292792987010194,9.198420236365061,5.5795179336051675,9.273435325560584,0.194242724345699,2.5015718165989664,3.373101319804066,2.0190358204999925,1.1526081201556648,9.2116883940057,2.6578813231346454,7.331149165702504,1.5187618153540172,3.9560695616965957,1.8279756201041741,4.6352395526614725,9.026913325958903,7.310154908116662,2.9262368189045818,6.345915586026476,6.217069719181218,4.361233544294678,7.668445206069999,9.242154766574311,4.815714566563221,2.678616137180745,3.7641502123596537,8.178896361993955,3.4855688302428423,6.511985946062266,5.728758400310037,6.816146304118471,0.47380363831374783,0.7589617546887983,2.426136121987592,8.052702319750399,2.0014234410764575,6.9047885865827645,2.1884476579098244,2.2009556943855157,4.096184280238826,9.23807929816494,9.7546070472629,9.29825984935774,5.870070391191695,0.8210116812863766,6.699171774615382,1.5358257451329904,3.7023224780705943,0.5810311616533159,4.636494164811502,6.658639537908783,4.809494164192401,9.631050117436226,2.914890375538317,4.925469729887508,8.893035510356551,5.7531765807353,7.616586360226629,0.7786708569206802,0.02917271084418749,5.006436408948063,2.775428862888931,1.901764361650029,1.4651851267527993,9.538910766849236,5.014285021498894,9.89988658358017,0.3463518011805866,7.020943216222846,0.9312452894724288,7.487596162847254,4.257570885921873,0.8552945011945079,6.21854844961248,4.724876351284049,3.3461672780439744,2.4804436454045975,6.16408230238072,2.57486925996399,3.754384858205455,8.418837912817683,9.558973144401953,1.9204318663815023,5.330137079667474,2.4954210336187854,0.7994615645711312,0.13609988098545633,2.4826232019138628,2.1334011594198388,9.531488212156003,5.968503203291098,4.537135320829931,6.2284853460841845,2.7880605569584183,3.302985793813642,2.7408474294508833,5.953815482874328,9.887406578866585,1.146207445121683,0.6526388832458485,1.6603784450592274,2.1575821466698963,8.07822315556905,5.762250824774499,9.990764212293232,7.843392096019899,2.0559006569309934,6.831394417589274,3.7616268266307618,8.436495419420178,3.032545405440945,1.031132624133242,4.410164039198349,9.706396069983985,7.043913369023778,0.9059383136273702,7.583958901604618,1.1986868632159053,9.100425684855287,8.55604789906799,5.008160886551288,2.549082079024063,2.663254452865227,9.095562907553985,6.2900267647678625,8.103868450587328,8.228553079551926,7.174650447082533,2.9078535609256773,6.593742917754881,9.44258255898041,3.7371778670543554,5.224291088869968,2.6909840104708738,8.807942535811868,9.426752299496524,7.173480449172107,2.5487784682749925,3.0634693156257087,3.7064350033019955,8.309438145445503,7.071758214670647,8.52558482625315,2.0650955091230427,4.139450048273616,8.168833376349529,6.825157689042872,0.8501520943118246,8.232737347305292,0.4515341875333778,0.3496720445998758,6.67943088319785,7.007023344301551,3.1321836997710717,5.551950602561089,1.0943355242422714,9.877751434049749,8.892141006514727,1.0649375740603295,4.304621004448497,5.94078555381828,6.594739608572294,4.339813142770104,2.6018127173552297,0.5332016139165296,8.283465828874224,5.823283299265971,6.214393385323018,1.383799400830359,8.456145676215314,9.408770281220706,8.878387209651905,8.087130528618102,4.0285446387725425,5.04186166194903,0.2791289651607598,2.774481074849393,5.5916678577793615,5.209115214763846,7.764185060385341,5.71817629259675,2.449307665636795,8.626638018331105,1.344600397893736,6.493843810734436,4.640422523532459,7.809194003173294,9.501044020962237,8.596439485921671,1.1389585330881946,7.126695223847726,1.0084839468849727,4.281843937015286,4.4227482628811465,1.4650568476857373,0.9817275173147322,9.41793134245616,0.13984157932962038,6.101717718317201,0.93563679203023,3.997349582077312,1.9601039345027593,7.136503900559532,5.935842582610189,6.265620973818891,8.999987626475285,2.7057460494136465,9.79980170772613,9.536677889663176,6.09037215947843,7.894812013602444,6.991472770150673,5.416257713747614,8.157109012083556,9.06841398084731,2.2540525959640645,9.413501571228585,2.31392830159576,2.7210726350508074,4.333852664460958,2.9899970134535336,8.560300268349906,4.677504328347841,2.1345883801531707,5.029814184804058,1.041177605213759,1.6928542693548398,7.829640727359395,2.117423840410664,9.963556595191525,9.165571467490778,3.6913733591325792,3.2789507807228424,4.024411477951702,9.584981557585186,8.914227046158679,4.323089886625137,9.148107205907685,4.907931643848531,3.1750050545203234,0.09767148517082491,8.134148653429413,1.7742713615594763,4.114421124734533,2.4242665750554293,7.630895602436087,6.597390120219133,0.12796045961138036,7.878265229671387,6.5003141399744475,7.5560149910676255,9.047722454858963,0.8752225235657352,6.5255717570608045,2.8409323730970715,7.392323287062423,8.44750184681403,1.6340345698324366,1.0412763485465626,5.230807272610559,3.873466670645316,9.548289515715133,9.566673139621638,0.731716330340022,2.7995710788509,0.06868130382106985,8.445445365100909,8.809191917728956,4.421431128045013,6.929494644014385,1.2970515737270283,9.457823588804079,3.3305352779064146,3.0581743471703815,5.535893989611722,3.664235648854004,3.2859819956155834,4.855232346992682,6.620911326466727,1.311866227179368,2.3801240778509314,7.300540448521837,9.443918530570876,7.760425270072164,0.6010997929379447,3.682471969138985,5.434291165933676,6.293000284250088,5.379503761433433,6.905362650812556,9.925570883835944,7.2495361772796745,6.692747796008138,8.516277575317282,5.440884614153374,7.331347862492937,9.986744051157235,8.887401366088344,2.073835792255152,3.2213885612224336,7.326002957567104,5.738397759916651,4.706347221222478,6.83480860819385,7.539644177230103,3.585706002770883,4.011732469229294,5.506376715496726,7.7504164586120305,1.3333852721742878,4.9134670835353145,6.998055099639973,6.03223855094579,2.3316407638563463,1.9850627765054485,8.997690701564887,7.757599985458938,6.3813715460117715,9.883111740207793,5.08408257761676,6.612684321318412,3.4823929156207423,6.458924643596527,4.172017857830217,0.4748857725312772,9.904988541435188,4.218359246787633,8.654467942483171,3.604392932035916,7.807662653348002,1.9575136549096772,2.4990991073530333,7.41561852878029,7.696697595085293,9.900790952664485,3.1733016501922284,1.1754976177845022,7.105410218176116,2.4011030463683136,2.4444421832993823,1.0518066784212876,3.031060785357156,0.6048290900885944,4.7957463862863765,1.129412139249717,4.060870552594322,0.3487430645448675,5.245491789242798,2.3087455423294,0.7082840631461629,8.298530540196449,3.008395139061333,4.959114319398726,6.854456668096127,2.8224855296598417,9.070659675831642,0.30700957955341446,7.005913074510531,4.584238746419742,2.756825805916261,3.1378538505610076,7.368863369906773,0.43587808355288304,6.923204621426748,2.7843158512996746,8.010343762145904,1.9093409341295642,9.175485382446604,2.8289208414665135,2.098145208297184,6.843855936869547,9.753634856267652,8.482272973073117,2.7885893840962606,7.309276184238569,5.136036866099265,3.3760896684585595,3.2636940500617584,5.187306421950357,6.3378957870189545,4.215564791637744,9.408151052390952,1.4379798020428969,0.180791890829064,6.035074801343052,4.398581166327533,7.031936552258498,8.707712464887083,5.366264136843548,0.43298489978072396,8.413427771993012,7.226059211075668,8.458263210370358,9.244093024886945,4.112980202014995,9.554878398489524,7.174840738539157,6.99769824323758,6.9219084170317675,6.813216570745273,6.1225881645606,2.5730314503863294,4.214557663959992,8.502957684654984,5.063377608653883,7.562594277071499,2.5432308403782566,9.899559670531339],"p":[0.07741646544890002,0.2875224447694018,0.49604863064525406,0.5931014099531291,0.5000535022652894,0.5748975489102981,0.5176041482566582,0.5268274032168674,0.7020816753936847,1.317556140056908e-5,0.30524085843920945,0.8901375074236173,0.32537475335474864,0.32378625037563613,0.7053672426895399,0.35821080213803724,0.33834570808585074,0.16070968397195595,0.5710411236359552,0.0735886674772348,0.5833841231385648,0.9987966782922792,0.3596077965930675,0.2641640276538886,0.182397036479373,0.5576145879795185,0.6240414475545031,0.14694268735220595,0.3257880304680212,0.8888557832932289,0.8548805701912456,0.22767621343682176,0.5084873672416141,0.24888022433814827,0.7480031643932623,0.4689353000713825,0.41453818132735853,0.8471335746406805,0.5103354515694725,0.4403555431865638,0.7434740885633635,0.9206438641820558,0.37012425555093076,0.6025697160551506,0.36209541925927047,0.26341277622596904,0.32100514705699146,0.96621674592685,0.6260692613143484,0.7771332841060874,0.4502514394380195,0.6713750155382112,0.2836890656469384,0.09535370820668043,0.3503404576510034,0.40632157662984003,0.09363519043021751,0.07539687494037439,0.6319791838012112,0.7063155495268578,0.09829417223159753,0.7964427273557093,0.22334828550033237,0.16573472298371672,0.7465254654533993,0.3261695108584626,0.4214939153070054,0.7547193828246899,0.12323228494003224,0.1052404830063185,0.987324413591961,0.6839584486097701,0.43675307570900546,0.5299067137872513,0.8183905645762664,0.0019583210232718695,0.5679971909648331,0.6828797863261524,0.18890915406638498,0.6558507405006992,0.4178672097596652,0.07782989477673752,0.6129843160772013,0.36207031098417963,0.576588054525434,0.6210447033200315,0.6281828473350395,0.002664094709385445,0.11290232325163285,0.48889502020832887,0.09641977457904094,0.6113624316282853,0.6998686755569432,0.548365304258889,0.5836817203162696,0.34646140011691795,0.2848616722815336,0.9405314291427191,0.22556000934208598,0.03333033929116214,0.6111288074680512,0.2379211899485969,0.5733235397114878,0.2634053870363309,0.4826260502826061,0.7444029159655721,0.8631919933619248,0.7820143026537534,0.5432404991479334,0.7431352068582433,0.7308205245795383,0.706025405781582,0.09124870692960663,0.018223243058294036,0.0870533811047911,0.7442532125550145,0.4466753573113844,0.490632397371215,0.5958385832870583,0.08191416045139066,0.11525531230881092,0.19792614041089096,0.32697709984984646,0.970759104050354,0.7128304602832307,0.14871922566953466,0.7801513226675256,0.3830587815725277,0.09559085299304493,0.10282257257003757,0.9329458219696669,0.1082518140111648,0.4966823747026299,0.5086329161668364,0.027538260145238747,0.5869637501945066,0.6328248865127981,0.5103478763471496,0.580335391234551,0.792578194531091,0.0696741704811743,0.8869715578554513,0.6389636097482687,0.1027845446477278,0.7748916560155295,0.3957792031738332,0.23558407832459438,0.030181227476737238,0.005481413204274199,0.8751962627966867,0.7119556218363501,0.9314024230483677,0.8185135682063627,0.12801406982225094,0.9251976204697998,0.4480007161829209,0.8439384825249603,0.1966491754771671,0.4358338638841419,0.6021393135602124,0.5538916918466541,0.9865749982672816,0.1097404021571311,0.16651127522956122,0.7500075031995603,0.25411925864178087,0.0779871771631373,0.1424954630266344,0.4509577347854874,0.1786286664839054,0.7305238642395271,0.9757270514573444,0.8449429555667929,0.7583486311155154,0.2261949863091668,0.9455221569413668,0.8875747008857002,0.5463744719236572,0.7203344364720827,0.6312443183959477,0.17466001315830826,0.2879477581479104,0.9018008750957875,0.19939003069987593,0.08197450116190508,0.46381607497830624,0.18403849132758432,0.1396901582961807,0.08363732505581001,0.503939148478902,0.647067513366592,0.3617447465279031,0.3407664569890225,0.9418498163301836,0.5567385785891084,0.4170232665932416,0.07927493679804187,0.11123183405983128,0.290052616932589,0.5701759445336378,0.9180114423860706,0.4736470910948143,0.6680354782770954,0.6692991021772405,0.5584422981071495,0.7205120882748695,0.8461602759682243,0.2654421713280284,0.26070709836425476,0.1335469689057427,0.7123627158543053,0.5848489335049214,0.058783457592782584,0.3644447603119241,0.3564854439311238,0.747121340127078,0.7555466746115294,0.007098765209781588,0.7195198399519911,0.08272537641313504,0.4330551181929483,0.8277992594304253,0.35644038528281463,0.18763551945630952,0.3669168374728544,0.9884106971837658,0.37839477732073723,0.39113329952171205,0.20449963672103677,0.3344809334328884,0.6719856877608372,0.8169405174910833,0.0050662181444913745,0.8948230255645553,0.2748277704611741,0.6816781330289909,0.9631949686613719,0.9407846130501878,0.6706400231941467,0.7049205942381838,0.07739903626167877,0.6780636505775477,0.9024126417294505,0.06292940009101655,0.6181023006168875,0.6295942797651999,0.5781023923705837,0.2698893309876429,0.9133769308673816,0.6518421601233537,0.07351762113654448,0.9357760310307901,0.9484053986798695,0.18256448703484618,0.08134252094495475,0.7348925998767442,0.04104146805785702,0.4530830501877068,0.4803345305209312,0.5045038183316675,0.47918333481240416,0.669462724554974,0.28123919611443604,0.18684365989082585,0.32470649869572443,0.10481786997836462,0.020374374477811097,0.06351692752284,0.569785921298223,0.5367432891329513,0.3373408111008471,0.446251291492346,0.8731962562602815,0.4758467036604632,0.6805112661755401,0.7955724014564538,0.9357243233964074,0.2899068497441504,0.6605082511017761,0.40313629068587886,0.6028900462953606,0.5791381677801324,0.47880361746798084,0.6583955467428368,0.29474102978391925,0.3124679277463849,0.14060111529621633,0.06732386451566064,0.7886132198817837,0.9841394669450236,0.4588461562235624,0.3867609519712223,0.22682379359315363,0.3831874932364674,0.8880821742187355,0.8420518912113975,0.2870126202856518,0.22619236595917136,0.9346924576570519,0.6823562933797533,0.9524181743709266,0.47317128105881645,0.549169697291003,0.940106720519172,0.9701658086050304,0.016063612294980878,0.5813477332570522,0.8452102151637009,0.29680146142100283,0.052722207105089014,0.6560057039674865,0.7229539936155331,0.04105060522283388,0.3244712649603958,0.5360477498838121,0.6277227382062087,0.2539337982875134,0.8747012354330623,0.39151318930045576,0.07503741534785813,0.46615559654775685,0.4654530416851146,0.765725896295897,0.32940891331763344,0.06670032644003276,0.8859960729200418,0.5643940442175086,0.008615946436814959,0.43766268986471935,0.1796602301379231,0.9766007241183858,0.07815704060727535,0.29441970041326493,0.3278000726985111,0.3583086066943002,0.45432464396824224,0.30597958276666715,0.11477468552325587,0.09093752204446481,0.9254422606091548,0.9944509313765986,0.7990771596113428,0.20259828200446317,0.6642923220849544,0.6849942573164483,0.26653121603708296,0.8243138022139254,0.7732799969164224,0.295002140540624,0.02845381874792241,0.3651805476679204,0.6260789319390241,0.597069459529133,0.9485122557081931,0.8323122388613546,0.7118648195579707,0.4586379370993918,0.14685165988837134,0.03003635551919026,0.3438546288561961,0.9775354905205884,0.6088744876883432,0.6562690196313161,0.5303592943438382,0.8417440193139964,0.6572182342952566,0.6426998764484597,0.3525400864818222,0.003766208329193832,0.4484360470369353,0.4141496271242635,0.9723499890879403,0.28537670865880327,0.5938397720398032,0.25540684974277617,0.5414324630504199,0.5880711825092457,0.2272615778253282,0.3017626971067331,0.7798557875322452,0.37840120507230735,0.0027138033207034784,0.10361455695921107,0.20801339225211857,0.05354601179621232,0.5013004837529655,0.4881268887572441,0.7900790106786444,0.05011331983896983,0.7916328551233449,0.8586925160501004,0.013821204384769192,0.04319597826983146,0.7898010549610122,0.41472902652996924,0.9911887809568365,0.13415475278185873,0.5192498891258719,0.13876755413269004,0.545793874720365,0.07210852581158056,0.5388962373792088,0.2863564873004276,0.09199558960330378,0.8963357818658195,0.7859041971428493,0.350305883236252,0.33256210227148153,0.6074164179172137,0.7480572071560141,0.29994984441901185,0.7673710788145194,0.34484429566422303,0.6355329155817948,0.5648367955785518,0.7623034745779655,0.739575314590128,0.7629007962661423,0.974727434094159,0.2671799222407354,0.6551365332235404,0.029334227302298288,0.30005378903322133,0.6615410422717196,0.8833907675648063,0.8798540081144386,0.8288619460312581,0.809733244491075,0.7324001669339457,0.5537186918530086,0.4560624983809973,0.417529111646451,0.2618733996983982,0.9497114855800666,0.17009106619187908,0.958369385914928,0.5255358115210516,0.646967233728609,0.3347859058106586,0.045667290100083635,0.6489087899230477,0.48781272395395736,0.1206404242539767,0.42550990483662776,0.7449196746828193,0.012145421481948748,0.8718541759245773,0.5035442299914996,0.21164544306048927,0.9652808822038299,0.4100984544649129,0.006546859109348713,0.9456548995797169,0.6092445594055915,0.14554354196947816,0.11307623969540015,0.09875655013689211,0.7069831100212125,0.11221152077287844,0.7608992604368694,0.4094843104555219,0.031913871023327545,0.8310948415424904,0.24034779609144685,0.12894898470448535,0.2957556649164985,0.5502389067442284,0.18130877750994046,0.5233479025104544,0.8474538348216927,0.8525371690782357,0.7812689893073272,0.9016358163797278,0.18318015061987936,0.05775226321131699,0.10094657501817617,0.8577261978454338,0.3741195539392763,0.4674653327545635,0.30050827069900676,0.9006412826359469,0.9611794695358227,0.7791587397589301,0.04436399377951683,0.9163541893905123,0.5564122017735553,0.6290687485601718,0.29458512953193305,0.7509191655075744,0.7404978506019582,0.46498904200224844,0.5325431740624178,0.8359833106434058,0.8889182562815887,0.24306219620753255,0.9618624493263941,0.1287543994051248,0.28432608611019505,0.408060610495278,0.9465036003590952,0.3458213284805973,0.4425223390621704,0.05866693136180867,0.3702981093627895,0.5829157281055326,0.47752078801969877,0.5002914062725476,0.06464648619828184,0.9343018623002546,0.22703739551303048,0.18322557852507138,0.8015923524213309,0.5834043494699501,0.6216308478819896,0.6995066570700925,0.7598417313886818,0.8630506934127837,0.3661652797012618,0.20026921189084734,0.10800487845173068,0.5926550307049656,0.9998374226158968,0.7968596292961969,0.9572752879341346,0.2277420060858817,0.25068122719521213,0.13678092781383633,0.371551920817776,0.4979982659894673,0.41022853008822757,0.10548745560705175,0.21238965232349982,0.16930834308991005,0.9934095430799073,0.22108322378964806,0.9573001212986276,0.9327104406798845,0.6256137305514664,0.5363431632003113,0.947363346664714,0.9841899601044195,0.19006394368732993,0.37681649965539554,0.453913053380814,0.9271912214273865,0.5072006261542685,0.2578377742734983,0.6477257270755916,0.18555144080136476,0.8300845764543916,0.3511459921325284,0.6210542803326322,0.7878303253334451,0.5499477093450276,0.98283882429186,0.43253094260314895,0.5360062300692454,0.15939027186608712,0.5469552424115713,0.14804988029765398,0.41133953080645136,0.645562863878788,0.60273262153693,0.4160886142694866,0.24874031005320463,0.3222513031491978,0.2972527622655401,0.5415988212879226,0.6023478101445245,0.18199261517885934,0.5129768759659932,0.7466744037245674,0.14646197058206534,0.5797057774683831,0.0013660694250388072,0.9619837482807543,0.5221796472977382,0.14293632477792073,0.42149588446034003,0.2514101937149269,0.9413097289708365,0.08660751362195107,0.5337367509130426,0.8815071736004056,0.033583148023856424,0.3475753651311606,0.6954961853132471,0.8263333811818536,0.3352782474586422,0.6441196081507541,0.4779859724646811,0.9213008542164922,0.7362352128375658,0.8279133025545535,0.7951167836102395,0.44258344685178197,0.5607623492914602,0.898023344888355,0.5923729750339679,0.23635507976949066,0.01541927200584392,0.043967868457845505,0.7176976210978612,0.652287973666311,0.28195362879319186,0.7320179502305173,0.06530912369315489,0.24538494372111774,0.8230966740431305,0.08527168345389291,0.506433983619816,0.21381366130300483,0.43655526274162204,0.8158704534153878,0.29667259470373586,0.5443660160076669,0.4074285770958983,0.26272379298883264,0.6729785923218226,0.27089843029236893,0.14337899039536817,0.046488768043869255,0.8701811352624746,0.2973151659158293,0.3109995082807242,0.6838578563610571,0.6330964674624757,0.4043286354887312,0.6466527093363315,0.9618325810935164,0.6218500027376488,0.4713396043733924,0.20040023392457007,0.5179792922182158,0.08532406207019272,0.9914878503375939,0.9665992170854056,0.9716865359075832,0.7292210370362773,0.7197543746160633,0.8323716493945779,0.20319521053568645,0.8508338581501738,0.4130664853973445,0.7599308174369925,0.5405955512053877,0.732466779863481,0.7915191776917407,0.38985040090678535,0.060892112094847795,0.4985700730806113,0.4755724376899928,0.9445218167117866,0.04864378443719941,0.5432805459523156,0.38675971930706443,0.6432768757680822,0.7534717141802671,0.6464635087001052,0.46532801284163017,0.11098358132091146,0.2211724229436669,0.35708330727406623,0.4204433113359882,0.7058943139030185,0.19546469458322657,0.8926123361284823,0.14105539652060317,0.2975304345144183,0.2989815034485519,0.5006335355716192,0.4917963258880722,0.07457287438948557,0.6544601243669017,0.7791102894728563,0.8731357744872001,0.06506605044366243,0.8363769854866179,0.4058482435159281,0.8787960732977715,0.03603743266985715,0.6867465220182922,0.7330550092386703,0.9323182685334555,0.5576386962803042,0.27135158106032664,0.8282802883959273,0.3803289456082406,0.5033533351847239,0.349300954667483,0.2714883090690763,0.39670063092789243,0.8147530200393198,0.07455049001732705,0.9434982061366497,0.7811849750414379,0.694027858268246,0.7098450865907344,0.16286306357162994,0.7912311160532368,0.7796108897991432,0.2176597338667059,0.4724894071826995,0.4427104400643871,0.40294673790537305,0.7568235242294497,0.7820159928351651,0.5807064738851337,0.8913110310166645,0.13373096106552396,0.928969731952271,0.04363274572139386,0.29953453814841025,0.6416204093598383,0.4751625164555515,0.7476816258243824,0.8970951035361092,0.3277258928333333,0.48832017607904143,0.40164273848773346,0.4296359789021653,0.45010736258227624,0.08722732968596003,0.3951241026496757,0.5058278444107269,0.1424784976389175,0.41686217681588267,0.44196423851244315,0.6776252133324272,0.22255238786237075,0.8786491605959594,0.5646090648770925,0.5962334673331384,0.9776138989461538,0.2562332197967909,0.2735566143076591,0.1514314979378888,0.1826264485740543,0.7187315956387594,0.43645647622080586,0.9557891139119652,0.22269767217078673,0.9257599658743358,0.0862797708644909,0.2111150368879413,0.6706479907902321,0.9876686206951313,0.5309006690513849,0.5483150996226627,0.38665826825918326,0.505810037695207,0.6092520636874779,0.8787697044263942,0.11952408176849127,0.8357200981796955,0.5913216406704944,0.07548371415310551,0.5877702141136041,0.07205369004195972,0.8583890858587715,0.33822043884287223,0.17391604527995042,0.8583617368164216,0.6828122663083456,0.9088684486181828,0.2965515786222295,0.26918106634414585,0.6654624017666353,0.2601416112385504,0.9634413464388865,0.5900029999353531,0.42861291261734413,0.2209815193087974,0.5768929623573738,0.12262879235242163,0.0611845606854573,0.29425482554931826,0.7750320524704246,0.6019268586003326,0.001909468928400937,0.20073854026662885,0.28547194923840036,0.8131843637592466,0.651300481960877,0.6754936734624726,0.8140905881918161,0.9694523202557568,0.16840458845637918,0.3761658467384206,0.2533646857655114,0.526826273757603,0.7761374908826433,0.8768522081199865,0.30573256357164524,0.3644418020015787,0.24192760236138877,0.09187575344557852,0.01362057778067749,0.4342407558779935,0.33710405286577494,0.09207115899399332,0.4959675632698912,0.14300700292839807,0.20854840028689825,0.6925812147989796,0.8042825002692,0.14727744376956053,0.2571856633702123,0.5286290641203235,0.17040782237028784,0.17346962349526973,0.1864327762185971,0.7048468410706286,0.7668679927210835,0.41331538021664005,0.2558367137225772,0.5298099789034385,0.18505622636631203,0.465980780032047,0.8705508400905002,0.29570895554805543,0.08308847200600211,0.6736602237093647,0.12452951418958125,0.8894616089193623,0.9453493882589168,0.020759452532752354,0.02846599807027972,0.1347789062822533,0.03134548670600257,0.4967445088833682,0.31583435858927444,0.7886904925479794,0.5341930125312395,0.31403687506919575,0.6081530957328285,0.1684053143805706,0.33900353793520566,0.25891828095073244,0.037399032857081904,0.12630399579163565,0.8019203426159585,0.7602620256038499,0.3512900350722652,0.5325571803555607,0.9745619196746005,0.6744966104985388,0.9245282278236584,0.22834928632922225,0.39678195877341094,0.9095321210997722,0.6346734002047045,0.3921593408675883,0.7376981720161908,0.7959442452429986,0.8452885365116667,0.7528942453696994,0.4954648162473094,0.11311509267345654,0.10288578944374094,0.4509736830296309,0.36447432999633,0.5885233505581227,0.3924248851535317,0.5824075827473447,0.5221072110063041,0.25837158424852635,0.6785528827575409,0.24531251901513218,0.6784334889508528,0.17091701196351283,0.456483355328547,0.10864951939628265,0.22978832560824247,0.4576165201075362,0.6424063317295978,0.7882284284815797,0.8132328953805708,0.9281706421550775,0.7655451855530413,0.4916633244752773,0.9174999550046932,0.41048702587400476,0.08399757065371039,0.03769891700446082,0.4157163481170969,0.3192517515469211,0.4401537925154919,0.5047937284576298,0.674583591011344,0.4392182997345555,0.49054109736834506,0.14398513510825017,0.5085104030084333,0.23269743031375012,0.7764126242543261,0.5100919088108156,0.39695528384736267,0.4978575552238904,0.0630042684843315,0.9124324390584755,0.4977429588108948,0.6251864500966744,0.5389039815037573,0.3953043666777072,0.5314371729319938,0.4173958399003508,0.08760904895921007,0.914662664788179,0.24348962009050323,0.6844511451486124,0.06663332123872467,0.3915748110018771,0.7878241124690457,0.6099144292471252,0.22154332286133438,0.09481673133722834,0.2217628684986237,0.020824248763944953,0.7881330604306156,0.968243405779468,0.10163998941776153,0.9061972243743861,0.41146326675133316,0.107689239637077,0.3921443535130744,0.7047166601833537,0.6464940627171625,0.1410535812952982,0.6754505523606893,0.4448611242217564,0.8912521490799661,0.5993798201514016,0.4893152590831611,0.023682005768130843,0.22947375179202223,0.03564690799321357,0.8493646810760511,0.7417481946711697,0.27098110752631377,0.5593209540961892,0.010434854801896654,0.49603172583436694,0.6146088997621253,0.24674917537416663,0.19257737590842305,0.28772709281422815,0.30578763338629567,0.8238698744425714,0.4561004726274598,0.037842087605940655,0.5795148145618598,0.39016640078088294,0.48881819891596434,0.037437061082891354,0.6688742615019039,0.42527422077175103,0.5415302326387004,0.4107230689897148,0.22374070088662257,0.1070220922634213,0.050347946811803546,0.9059990862048366,0.14694818694701972,0.41812937769481495,0.6436956543122581,0.2704236273348919,0.22374837155651006,0.9452555254219961,0.6151158649679727,0.17872592474414128,0.739653373243381,0.8556141817633185,0.4220121186576651,0.5279134147901665,0.07815057339156817,0.08155176304914247,0.22339680512776128,0.4656985610419131,0.5185783614742399,0.6853144395624953,0.603231146253095,0.09863395414535292,0.46568804725415136,0.43373164853203683,0.8517618993693217,0.782579123101226,0.6353591418870481,0.3926172236263108,0.13396894990163877,0.8998953991435907,0.2671290244014688,0.8678625421180564,0.07599232353979346,0.3422902161922292,0.5773612748362031,0.13388955728102192,0.9819395385535739,0.9597644714601874,0.215321290531151]}
},{}],31:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var largeRate = require( './fixtures/julia/large_rate.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var quantile = factory( 0.0, 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1, 1.0 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 1.0 );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `k` and `lambda`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});


tape( 'if provided a negative `lambda`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1, -1.0 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `k`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( -1, 0.5 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, 1.0 );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, PINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NaN );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the quantile for `p` given large `k` and `lambda`', function test( t ) {
	var expected;
	var quantile;
	var lambda;
	var delta;
	var tol;
	var p;
	var k;
	var y;
	var i;

	expected = bothLarge.expected;
	p = bothLarge.p;
	k = bothLarge.k;
	lambda = bothLarge.lambda;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( k[i], lambda[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', k:'+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `p` given large shape parameter `k`', function test( t ) {
	var expected;
	var quantile;
	var lambda;
	var delta;
	var tol;
	var p;
	var k;
	var y;
	var i;

	expected = largeShape.expected;
	p = largeShape.p;
	k = largeShape.k;
	lambda = largeShape.lambda;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( k[i], lambda[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', k:'+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `p` given large rate parameter `lambda`', function test( t ) {
	var expected;
	var quantile;
	var lambda;
	var delta;
	var tol;
	var p;
	var k;
	var y;
	var i;

	expected = largeRate.expected;
	p = largeRate.p;
	k = largeRate.k;
	lambda = largeRate.lambda;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( k[i], lambda[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', k:'+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/erlang/quantile/test/test.factory.js")
},{"./../lib/factory.js":24,"./fixtures/julia/both_large.json":28,"./fixtures/julia/large_rate.json":29,"./fixtures/julia/large_shape.json":30,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":39,"@stdlib/math/constants/float64-eps":163,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178,"tape":241}],32:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var quantile = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `quantile` functions', function test( t ) {
	t.equal( typeof quantile.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/erlang/quantile/test/test.js")
},{"./../lib":25,"tape":241}],33:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var quantile = require( './../lib' );


// FIXTURES //

var largeRate = require( './fixtures/julia/large_rate.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 1, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.0, 1, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p` and a valid `k` and `lambda`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 1, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 1, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a `k` which is not a nonnegative integer, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 2.0, -1, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, -1, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, 0.5, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, 4.5, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );


	y = quantile( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `lambda`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the quantile for `x` given large parameters `k` and `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var p;
	var y;
	var i;
	var k;

	expected = bothLarge.expected;
	p = bothLarge.p;
	k = bothLarge.k;
	lambda = bothLarge.lambda;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', k:'+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given large shape parameter `k`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var p;
	var y;
	var i;
	var k;

	expected = largeShape.expected;
	p = largeShape.p;
	k = largeShape.k;
	lambda = largeShape.lambda;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', k:'+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given large rate parameter `lambda`', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var p;
	var y;
	var i;
	var k;

	expected = largeRate.expected;
	p = largeRate.p;
	k = largeRate.k;
	lambda = largeRate.lambda;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], k[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', k:'+k[i]+', lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. k: '+k[i]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dist/erlang/quantile/test/test.quantile.js")
},{"./../lib":25,"./fixtures/julia/both_large.json":28,"./fixtures/julia/large_rate.json":29,"./fixtures/julia/large_shape.json":30,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":39,"@stdlib/math/constants/float64-eps":163,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178,"tape":241}],34:[function(require,module,exports){
'use strict';

// MODULES //

var gammaincinv = require( '@stdlib/math/base/special/gammaincinv' );
var degenerate = require( '@stdlib/math/base/dist/degenerate/quantile' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var nan = require( './nan.js' );


// MAIN //

/**
* Returns a function for evaluating the quantile function for a gamma distribution with shape parameter `alpha` and rate parameter `beta`.
*
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 2.5, 0.5 );
* var y = quantile( 0.5 );
* // returns ~4.351
*
* y = quantile( 0.8 );
* // returns ~7.289
*/
function factory( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha < 0.0 ||
		beta <= 0.0
	) {
		return nan;
	}
	if ( alpha === 0.0 ) {
		return degenerate( 0.0 );
	}
	return quantile;

	/**
	* Evaluates the quantile function for a gamma distribution.
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
		return ( 1.0 / beta ) * gammaincinv( p, alpha );
	} // end FUNCTION quantile()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./nan.js":36,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/dist/degenerate/quantile":21,"@stdlib/math/base/special/gammaincinv":85}],35:[function(require,module,exports){
'use strict';

/**
* Gamma distribution quantile function.
*
* @module @stdlib/math/base/dist/gamma/quantile
*
* @example
* var quantile = require( '@stdlib/math/base/dist/gamma/quantile' );
*
* var y = quantile( 0.8, 1.0, 1.0 );
* // returns ~1.609
*
* var myquantile = quantile.factory( 2.0, 2.0 );
* y = myquantile( 0.8 );
* // returns ~1.497
*
* y = myquantile( 0.4 );
* // returns ~0.688
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = require( './quantile.js' );

},{"./factory.js":34,"./quantile.js":37,"@stdlib/utils/define-read-only-property":183}],36:[function(require,module,exports){
'use strict';

/**
* Evaluates the quantile function for an invalid gamma distribution.
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

},{}],37:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var gammaincinv = require( '@stdlib/math/base/special/gammaincinv' );


// MAIN //

/**
* Evaluates the quantile function for a gamma distribution with shape parameter `alpha` and rate parameter `beta` at a probability `p`.
*
* @param {Probability} p - input value
* @param {NonNegativeNumber} alpha - shape parameter
* @param {PositiveNumber} beta - rate parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 2.0, 1.0 );
* // returns ~2.994
* @example
* var y = quantile( 0.5, 4.0, 2.0 );
* // returns ~1.836
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
* // returns NaN
* @example
* // Non-positive rate parameter:
* var y = quantile( 0.5, 1.0, -1.0 );
* // returns NaN
*/
function quantile( p, alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha < 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
		return NaN;
	}
	if ( alpha === 0.0 ) {
		return 0.0;
	}
	return ( 1.0 / beta ) * gammaincinv( p, alpha );
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/gammaincinv":85}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{"./abs.js":38}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{"./ceil.js":40}],42:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-from-words":139,"@stdlib/math/base/utils/float64-get-high-word":143,"@stdlib/math/base/utils/float64-to-words":155}],43:[function(require,module,exports){
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

},{"./copysign.js":42}],44:[function(require,module,exports){
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

},{"./cos_kernel.js":45,"./rem_pio2.js":47,"./sin_kernel.js":49,"@stdlib/math/base/utils/float64-get-high-word":143}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"./cos.js":44}],47:[function(require,module,exports){
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

},{"./rem_pio2_kernel.js":48,"@stdlib/math/base/special/round":110,"@stdlib/math/base/utils/float64-from-words":139,"@stdlib/math/base/utils/float64-get-high-word":143,"@stdlib/math/base/utils/float64-get-low-word":145}],48:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":60,"@stdlib/math/base/special/ldexp":90}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/exp":56,"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/base/utils/float64-set-low-word":152,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],51:[function(require,module,exports){
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

},{"./erfc.js":50}],52:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/special/sqrt":121,"@stdlib/math/base/tools/evalrational":132,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],53:[function(require,module,exports){
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

},{"./erfcinv.js":52}],54:[function(require,module,exports){
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

},{"./expmulti.js":55,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/trunc":122,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":90,"@stdlib/math/base/tools/evalpoly":129}],56:[function(require,module,exports){
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

},{"./exp.js":54}],57:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/base/utils/float64-get-high-word":143,"@stdlib/math/base/utils/float64-set-high-word":150,"@stdlib/math/constants/float64-exponent-bias":165,"@stdlib/math/constants/float64-half-ln-two":166,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],58:[function(require,module,exports){
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

},{"./expm1.js":57}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"./floor.js":59}],61:[function(require,module,exports){
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

},{"./small_approximation.js":63,"./stirling_approximation.js":64,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/base/special/abs":39,"@stdlib/math/base/special/floor":60,"@stdlib/math/base/special/sin":112,"@stdlib/math/base/tools/evalrational":132,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pi":177,"@stdlib/math/constants/float64-pinf":178}],62:[function(require,module,exports){
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

},{"./gamma.js":61}],63:[function(require,module,exports){
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

},{"@stdlib/math/constants/float64-eulergamma":164}],64:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":56,"@stdlib/math/base/special/pow":100,"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/constants/float64-sqrt-two-pi":181}],65:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":56}],66:[function(require,module,exports){
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

},{"@stdlib/math/base/special/erfc":51,"@stdlib/math/base/special/exp":56,"@stdlib/math/base/special/sqrt":121,"@stdlib/math/constants/float64-pi":177}],67:[function(require,module,exports){
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

},{"@stdlib/math/base/special/exp":56,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/special/pow":100,"@stdlib/math/constants/float64-max-ln":172,"@stdlib/math/constants/float64-min-ln":175}],68:[function(require,module,exports){
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

},{"./finite_gamma_q.js":65,"./finite_half_gamma_q.js":66,"./full_igamma_prefix.js":67,"./igamma_temme_large.js":70,"./lower_gamma_series.js":72,"./regularised_gamma_prefix.js":74,"./tgamma_small_upper_part.js":76,"./upper_gamma_fraction.js":77,"@stdlib/math/base/special/abs":39,"@stdlib/math/base/special/exp":56,"@stdlib/math/base/special/floor":60,"@stdlib/math/base/special/gamma":62,"@stdlib/math/base/special/gammaln":89,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/special/pow":100,"@stdlib/math/constants/float64-max":173,"@stdlib/math/constants/float64-max-ln":172,"@stdlib/math/constants/float64-pinf":178,"@stdlib/math/constants/float64-sqrt-eps":180,"@stdlib/math/constants/float64-sqrt-two-pi":181}],69:[function(require,module,exports){
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

},{"@stdlib/math/base/special/expm1":58,"@stdlib/math/base/special/gamma":62,"@stdlib/math/base/special/gammaln":89,"@stdlib/math/base/special/log1p":94}],70:[function(require,module,exports){
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

},{"@stdlib/math/base/special/erfc":51,"@stdlib/math/base/special/exp":56,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/special/sqrt":121,"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/constants/float64-pi":177}],71:[function(require,module,exports){
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

},{"./gammainc.js":68}],72:[function(require,module,exports){
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

},{"./lower_incomplete_gamma_series":73,"@stdlib/math/base/tools/sum-series":135}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":39,"@stdlib/math/base/special/exp":56,"@stdlib/math/base/special/gamma":62,"@stdlib/math/base/special/gammaln":89,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/special/log1p":94,"@stdlib/math/base/special/max":96,"@stdlib/math/base/special/min":98,"@stdlib/math/base/special/pow":100,"@stdlib/math/base/special/sqrt":121,"@stdlib/math/base/tools/evalrational":132,"@stdlib/math/constants/float64-e":162}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"./gammap1m1.js":69,"./small_gamma2_series.js":75,"@stdlib/math/base/special/powm1":108,"@stdlib/math/base/tools/sum-series":135}],77:[function(require,module,exports){
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

},{"./upper_incomplete_gamma_fract":78,"@stdlib/math/base/tools/continued-fraction":126}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{"./lambdaeta.js":86,"@stdlib/math/base/special/abs":39,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/tools/evalrational":132}],81:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ln":92,"@stdlib/math/base/tools/evalrational":132}],82:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ln":92,"@stdlib/math/base/tools/evalrational":132}],83:[function(require,module,exports){
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

},{"./eps1.js":80,"./eps2.js":81,"./eps3.js":82,"./gamstar.js":84,"./lambdaeta.js":86,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":39,"@stdlib/math/base/special/erfcinv":53,"@stdlib/math/base/special/exp":56,"@stdlib/math/base/special/gamma":62,"@stdlib/math/base/special/gammainc":71,"@stdlib/math/base/special/gammaln":89,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/special/pow":100,"@stdlib/math/base/special/sqrt":121,"@stdlib/math/constants/float32-max":160,"@stdlib/math/constants/float32-smallest-normal":161,"@stdlib/math/constants/float64-pi":177,"@stdlib/math/constants/float64-pinf":178,"@stdlib/math/constants/float64-sqrt-two-pi":181}],84:[function(require,module,exports){
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

},{"./stirling.js":87,"@stdlib/math/base/special/exp":56,"@stdlib/math/base/special/gamma":62,"@stdlib/math/base/special/ln":92,"@stdlib/math/constants/float32-max":160,"@stdlib/math/constants/float64-sqrt-two-pi":181}],85:[function(require,module,exports){
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

},{"./gammaincinv.js":83}],86:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":39,"@stdlib/math/base/special/exp":56,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/tools/evalpoly":129}],87:[function(require,module,exports){
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

},{"./chepolsum.js":79,"@stdlib/math/base/special/gammaln":89,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/constants/float32-max":160,"@stdlib/math/constants/float32-smallest-normal":161,"@stdlib/math/constants/float64-ln-sqrt-two-pi":168}],88:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":39,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/special/sinpi":119,"@stdlib/math/base/special/trunc":122,"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/constants/float64-pi":177,"@stdlib/math/constants/float64-pinf":178}],89:[function(require,module,exports){
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

},{"./gammaln.js":88}],90:[function(require,module,exports){
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

},{"./ldexp.js":91}],91:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/copysign":43,"@stdlib/math/base/utils/float64-exponent":137,"@stdlib/math/base/utils/float64-from-words":139,"@stdlib/math/base/utils/float64-normalize":147,"@stdlib/math/base/utils/float64-to-words":155,"@stdlib/math/constants/float64-exponent-bias":165,"@stdlib/math/constants/float64-max-base2-exponent":171,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":170,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":174,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],92:[function(require,module,exports){
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

},{"./ln.js":93}],93:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/base/utils/float64-get-high-word":143,"@stdlib/math/base/utils/float64-set-high-word":150,"@stdlib/math/base/utils/float64-to-words":155,"@stdlib/math/constants/float64-exponent-bias":165,"@stdlib/math/constants/float64-ninf":176}],94:[function(require,module,exports){
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

},{"./log1p.js":95}],95:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/base/utils/float64-get-high-word":143,"@stdlib/math/base/utils/float64-set-high-word":150,"@stdlib/math/constants/float64-exponent-bias":165,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],96:[function(require,module,exports){
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

},{"./max.js":97}],97:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-positive-zero":18,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],98:[function(require,module,exports){
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

},{"./min.js":99}],99:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-negative-zero":12,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],100:[function(require,module,exports){
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

},{"./pow.js":103}],101:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/base/utils/float64-get-high-word":143,"@stdlib/math/base/utils/float64-set-high-word":150,"@stdlib/math/base/utils/float64-set-low-word":152,"@stdlib/math/constants/float64-exponent-bias":165}],102:[function(require,module,exports){
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

},{"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/base/utils/float64-set-low-word":152}],103:[function(require,module,exports){
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

},{"./log2ax.js":101,"./logx.js":102,"./pow2.js":104,"./x_is_zero.js":105,"./y_is_huge.js":106,"./y_is_infinite.js":107,"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-integer":8,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/abs":39,"@stdlib/math/base/special/sqrt":121,"@stdlib/math/base/utils/float64-get-high-word":143,"@stdlib/math/base/utils/float64-get-low-word":145,"@stdlib/math/base/utils/float64-set-low-word":152,"@stdlib/math/base/utils/float64-to-words":155,"@stdlib/math/base/utils/uint32-to-int32":158,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],104:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ldexp":90,"@stdlib/math/base/tools/evalpoly":129,"@stdlib/math/base/utils/float64-get-high-word":143,"@stdlib/math/base/utils/float64-set-high-word":150,"@stdlib/math/base/utils/float64-set-low-word":152,"@stdlib/math/base/utils/uint32-to-int32":158,"@stdlib/math/constants/float64-exponent-bias":165,"@stdlib/math/constants/float64-ln-two":169}],105:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-odd":16,"@stdlib/math/base/special/copysign":43,"@stdlib/math/constants/float64-ninf":176,"@stdlib/math/constants/float64-pinf":178}],106:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":143}],107:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":39,"@stdlib/math/constants/float64-pinf":178}],108:[function(require,module,exports){
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

},{"./powm1.js":109}],109:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":39,"@stdlib/math/base/special/expm1":58,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/special/pow":100,"@stdlib/math/base/special/trunc":122}],110:[function(require,module,exports){
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

},{"./round.js":111}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{"./sin.js":118}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":60,"@stdlib/math/base/special/ldexp":90}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{"./kernel_rem_pio2.js":114,"./rem_pio2_medium.js":117,"@stdlib/math/base/utils/float64-from-words":139,"@stdlib/math/base/utils/float64-get-high-word":143,"@stdlib/math/base/utils/float64-get-low-word":145}],117:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":110,"@stdlib/math/base/utils/float64-get-high-word":143}],118:[function(require,module,exports){
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

},{"./kernel_cos.js":113,"./kernel_sin.js":115,"./rem_pio2.js":116,"@stdlib/math/base/utils/float64-get-high-word":143}],119:[function(require,module,exports){
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

},{"./sinpi.js":120}],120:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":39,"@stdlib/math/base/special/copysign":43,"@stdlib/math/base/special/cos":46,"@stdlib/math/base/special/sin":112,"@stdlib/math/constants/float64-pi":177}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{"./trunc.js":123}],123:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":41,"@stdlib/math/base/special/floor":60}],124:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":39,"@stdlib/math/constants/float32-smallest-normal":161,"@stdlib/math/constants/float64-eps":163}],125:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":39,"@stdlib/math/constants/float32-smallest-normal":161,"@stdlib/math/constants/float64-eps":163}],126:[function(require,module,exports){
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

},{"./basic.js":124,"./generators.js":125,"@stdlib/utils/detect-generator-support":185}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
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

},{"./evalpoly.js":127,"./factory.js":128,"@stdlib/utils/define-read-only-property":183}],130:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":39}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){
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

},{"./evalrational.js":130,"./factory.js":131,"@stdlib/utils/define-read-only-property":183}],133:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":39,"@stdlib/math/constants/float64-eps":163}],134:[function(require,module,exports){
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

},{"@stdlib/math/base/special/abs":39,"@stdlib/math/constants/float64-eps":163}],135:[function(require,module,exports){
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

},{"./basic.js":133,"./generators.js":134,"@stdlib/utils/detect-generator-support":185}],136:[function(require,module,exports){
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

},{"@stdlib/math/base/utils/float64-get-high-word":143,"@stdlib/math/constants/float64-exponent-bias":165,"@stdlib/math/constants/float64-high-word-exponent-mask":167}],137:[function(require,module,exports){
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

},{"./exponent.js":136}],138:[function(require,module,exports){
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

},{"./indices.js":140}],139:[function(require,module,exports){
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

},{"./from_words.js":138}],140:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],141:[function(require,module,exports){
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

},{"./high.js":142}],142:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],143:[function(require,module,exports){
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

},{"./get_high_word.js":141}],144:[function(require,module,exports){
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

},{"./low.js":146}],145:[function(require,module,exports){
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

},{"./get_low_word.js":144}],146:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":2}],147:[function(require,module,exports){
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

},{"./normalize.js":148}],148:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-infinite":6,"@stdlib/math/base/assert/is-nan":10,"@stdlib/math/base/special/abs":39,"@stdlib/math/constants/float64-smallest-normal":179}],149:[function(require,module,exports){
arguments[4][142][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":142}],150:[function(require,module,exports){
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

},{"./set_high_word.js":151}],151:[function(require,module,exports){
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

},{"./high.js":149}],152:[function(require,module,exports){
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

},{"./set_low_word.js":154}],153:[function(require,module,exports){
arguments[4][146][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":146}],154:[function(require,module,exports){
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

},{"./low.js":153}],155:[function(require,module,exports){
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

},{"./to_words.js":157}],156:[function(require,module,exports){
arguments[4][140][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":2,"dup":140}],157:[function(require,module,exports){
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

},{"./indices.js":156}],158:[function(require,module,exports){
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

},{"./uint32_to_int32.js":159}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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


},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
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

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
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

},{}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
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

},{"./define_read_only_property.js":182}],184:[function(require,module,exports){
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

},{"@stdlib/utils/eval":186}],185:[function(require,module,exports){
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

},{"./detect_generator_support.js":184}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){

},{}],189:[function(require,module,exports){
arguments[4][188][0].apply(exports,arguments)
},{"dup":188}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{"base64-js":187,"ieee754":210}],192:[function(require,module,exports){
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
},{"../../is-buffer/index.js":212}],193:[function(require,module,exports){
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

},{"./lib/is_arguments.js":194,"./lib/keys.js":195}],194:[function(require,module,exports){
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

},{}],195:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],196:[function(require,module,exports){
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

},{"foreach":206,"object-keys":215}],197:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],198:[function(require,module,exports){
'use strict';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return Boolean(value);
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
	}
};

module.exports = ES5;

},{"./helpers/isFinite":199,"./helpers/isNaN":200,"./helpers/mod":201,"./helpers/sign":202,"es-to-primitive/es5":203,"is-callable":213}],199:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],200:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],201:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],202:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],203:[function(require,module,exports){
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

},{"./helpers/isPrimitive":204,"is-callable":213}],204:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){

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


},{}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":207}],209:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":208}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
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

},{}],215:[function(require,module,exports){
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

},{"./isArguments":216}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
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
},{"_process":190}],218:[function(require,module,exports){
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
},{"_process":190}],219:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":220}],220:[function(require,module,exports){
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
},{"./_stream_readable":222,"./_stream_writable":224,"core-util-is":192,"inherits":211,"process-nextick-args":218}],221:[function(require,module,exports){
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
},{"./_stream_transform":223,"core-util-is":192,"inherits":211}],222:[function(require,module,exports){
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
},{"./_stream_duplex":220,"./internal/streams/BufferList":225,"./internal/streams/destroy":226,"./internal/streams/stream":227,"_process":190,"core-util-is":192,"events":205,"inherits":211,"isarray":228,"process-nextick-args":218,"safe-buffer":235,"string_decoder/":229,"util":188}],223:[function(require,module,exports){
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
},{"./_stream_duplex":220,"core-util-is":192,"inherits":211}],224:[function(require,module,exports){
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
},{"./_stream_duplex":220,"./internal/streams/destroy":226,"./internal/streams/stream":227,"_process":190,"core-util-is":192,"inherits":211,"process-nextick-args":218,"safe-buffer":235,"util-deprecate":247}],225:[function(require,module,exports){
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
},{"safe-buffer":235}],226:[function(require,module,exports){
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
},{"process-nextick-args":218}],227:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":205}],228:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],229:[function(require,module,exports){
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
},{"safe-buffer":235}],230:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":231}],231:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":220,"./lib/_stream_passthrough.js":221,"./lib/_stream_readable.js":222,"./lib/_stream_transform.js":223,"./lib/_stream_writable.js":224}],232:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":231}],233:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":224}],234:[function(require,module,exports){
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
},{"_process":190,"through":246}],235:[function(require,module,exports){
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

},{"buffer":191}],236:[function(require,module,exports){
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

},{"events":205,"inherits":211,"readable-stream/duplex.js":219,"readable-stream/passthrough.js":230,"readable-stream/readable.js":231,"readable-stream/transform.js":232,"readable-stream/writable.js":233}],237:[function(require,module,exports){
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

},{"es-abstract/es5":198,"function-bind":208}],238:[function(require,module,exports){
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

},{"./implementation":237,"./polyfill":239,"./shim":240,"define-properties":196,"function-bind":208}],239:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":237}],240:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":239,"define-properties":196}],241:[function(require,module,exports){
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
},{"./lib/default_stream":242,"./lib/results":244,"./lib/test":245,"_process":190,"defined":197,"through":246}],242:[function(require,module,exports){
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
},{"_process":190,"fs":189,"through":246}],243:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":190}],244:[function(require,module,exports){
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
},{"_process":190,"events":205,"function-bind":208,"has":209,"inherits":211,"object-inspect":214,"resumer":234,"through":246}],245:[function(require,module,exports){
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
},{"./next_tick":243,"deep-equal":193,"defined":197,"events":205,"has":209,"inherits":211,"path":217,"string.prototype.trim":238}],246:[function(require,module,exports){
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
},{"_process":190,"stream":236}],247:[function(require,module,exports){
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
},{}]},{},[31,32,33]);