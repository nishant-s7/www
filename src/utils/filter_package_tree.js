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

import reFromString from '@stdlib/utils/regexp-from-string';


// VARIABLES //

var RE_FORWARD_SLASH = /\//g;


// MAIN //

/**
* Applies a filter to a provide package tree.
*
* ## Notes
*
* -   The filter may be a regular expression string. If unable to generate a regular expression from a provided `filter` string, the function returns `null`.
*
* @private
* @param {ObjectArray} tree - package tree to filter
* @param {string} filter - filter to apply
* @param {ArrayLikeObject} [out] - output array for storing the list of matched packages
* @returns {(ObjectArray|null)} filtered tree
*/
function filterTree( tree, filter, out ) {
	var matches;
	var node;
	var pkg;
	var tmp;
	var o;
	var i;

	try {
		filter = reFromString( '/'+filter.replace( RE_FORWARD_SLASH, '\\/' )+'/' );
	} catch ( err ) {
		return null;
	}
	matches = [];
	for ( i = 0; i < tree.length; i++ ) {
		node = tree[ i ];

		// Check if the current package satisfies the filter...
		if ( filter.test( node.name ) ) {
			// We found a match! We don't need to recurse any further...
			matches.push( node );
			if ( out ) {
				out.push( node.name );
			}
			continue;
		}
		// Check if the current package is a namespace (i.e., has children), and, if so, we need to continue descending down the tree to see if any child nodes satisfy the filter...
		if ( node.children ) {
			tmp = filterTree( node.children, filter, out );

			// If we were able to resolve packages satisfying the filter, we need to copy the current (pruned) node in order to avoid mutation (we're modifying the `children` property)...
			if ( tmp ) {
				o = {
					'key': node.key,
					'name': node.name,
					'children': tmp
				}
				matches.push( o );
				if ( out ) {
					out.push( node.name );
				}
				continue;
			}
		}
	}
	if ( matches.length === 0 ) {
		return null;
	}
	return matches;
}


// EXPORTS //

export default filterTree;
