/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// MODULES //

import config from './../config.js';
import PACKAGE_DATA_CACHE from './caches/package_data.js';


// MAIN //

/**
* Retrieves data necessary for downloading documentation for a specified documentation version.
*
* @private
* @param {string} version - documentation version
* @param {Callback} clbk - callback invoked upon retrieving download data
*/
function fetchDownloadData( version, clbk ) {
	var total;
	var count;
	var o;

	total = 1;
	count = 0;

	o = PACKAGE_DATA_CACHE[ version ];
	if ( o && o.packages ) {
		done();
	} else {
		fetch( config.mount+version+'/package/list' )
			.then( toJSON )
			.then( onPackages )
			.catch( done );
	}

	/**
	* Callback invoked upon receiving a JSON resource.
	*
	* @private
	* @param {Object} res - response
	* @returns {Promise} promise to resolve the response as JSON
	*/
	function toJSON( res ) {
		return res.json();
	}

	/**
	* Callback invoked upon resolving a list of packages.
	*
	* @private
	* @param {StringArray} list - list of packages
	*/
	function onPackages( list ) {
		if ( PACKAGE_DATA_CACHE[ version ] === void 0 ) {
			PACKAGE_DATA_CACHE[ version ] = {};
		}
		PACKAGE_DATA_CACHE[ version ].packages = list;
		done();
	}

	/**
	* Callback invoked upon resolving a package resource.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {void}
	*/
	function done( error ) {
		if ( error ) {
			return clbk( error );
		}
		count += 1;
		if ( count === total ) {
			return clbk( null, PACKAGE_DATA_CACHE[ version ] );
		}
	}
}


// EXPORTS //

export default fetchDownloadData;
