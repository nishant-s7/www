#!/usr/bin/env node

/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
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

'use strict';

// MODULES //

var join = require( 'path' ).join;
var mkdir = require( 'fs' ).mkdirSync;
var exists = require( '@stdlib/fs/exists' ).sync;
var writeFile = require( '@stdlib/fs/write-file' ).sync;
var pkgTree = require( '@stdlib/_tools/pkgs/tree' ).sync;
var documentationPath = require( './../utils/api_docs_path.js' );


// VARIABLES //

var OUTPUT = 'package/tree.json';


// MAIN //

/**
* Generates a package tree of `@stdlib/stdlib` packages.
*
* @private
*/
function main() {
	var opts;
	var tree;
	var dir;

	dir = documentationPath();
	if ( !exists( join( dir, 'package' ) ) ) {
		mkdir( join( dir, 'package' ) );
	}
	// Resolve a package tree:
	opts = {
		'ignore': [
			'**/_tools/**'
		]
	};
	tree = pkgTree( opts );
	tree = tree[ '@stdlib' ];

	// Save as JSON file:
	opts = {
		'encoding': 'utf8'
	};
	writeFile( join( dir, OUTPUT ), JSON.stringify( tree ), opts );
}

main();
