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

// MODULES //

import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import fetchFragment from './../../utils/fetch_fragment.js';
import pkgPath from './../../utils/pkg_doc_path.js';
import pkgKind from './../../utils/pkg_kind.js';
import pkgBasename from './../../utils/pkg_basename.js';
import log from './../../utils/log.js';
import config from './../../config.js';
import notFoundHTML from './../not-found/html.js';
import ReadmeContent from './content.jsx';
import EditLink from './edit_link.jsx';


// MAIN //

/**
* Component for rendering a README.
*
* @private
*/
class Readme extends React.Component {
	/**
	* Returns a component for rendering a README.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.url - resource URL
	* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
	* @param {string} props.version - documentation version
	* @param {string} [props.content] - initial content
	* @param {string} [props.prev] - previous package name
	* @param {string} [props.next] - next package name
	* @param {Callback} props.onClick - callback to invoke upon clicking on README content
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			// README content to render:
			'content': props.content || ''
		};
	}

	/**
	* Fetches a package README fragment.
	*
	* @private
	* @param {string} path - fragment path (i.e., URL)
	* @returns {string} HTML string
	*/
	_fetchFragment( path ) {
		var self;

		self = this;

		// Fetch a package README fragment:
		fetchFragment( path, clbk );

		/**
		* Callback invoked upon fetching a fragment.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {string} fragment - README fragment
		* @returns {void}
		*/
		function clbk( error, fragment ) {
			if ( error ) {
				// Guard against race conditions (e.g., a fragment fails to resolve *after* a user subsequently navigated to a different package whose associated fragment already resolved)...
				if ( path === self.props.url ) {
					self.setState({
						'content': notFoundHTML()
					});
				}
				return log( error );
			}
			// Guard against race conditions (e.g., a fragment is resolved *after* a user subsequently navigated to a different package whose associated fragment already resolved)...
			if ( path === self.props.url ) {
				self.setState({
					'content': fragment
				});
			}
		}
	}

	/**
	* Renders an edit link.
	*
	* @private
	* @returns {(ReactElement|null)} React element
	*/
	_renderEditLink() {
		if ( this.state.content ) {
			return (
				<div className="edit-link-wrapper">
					<EditLink pkg={ this.props.pkg } />
				</div>
			);
		}
		return null;
	}

	/**
	* Renders a pagination link to the previous package.
	*
	* @private
	* @param {string} pkg - package
	* @returns {ReactElement} React element
	*/
	_renderPaginationPrev( pkg ) {
		var basename;
		var name;
		var kind;

		name = '@stdlib/' + pkg;

		// Isolate the basename of the package path:
		basename = pkgBasename( pkg ); // e.g., `sin`

		// Determine if we can resolve a package "kind":
		kind = pkgKind( pkg );

		return (
			<Link
				className="pagination-link pagination-link-prev"
				to={ pkgPath( name, this.props.version ) }
				title="Previous package"
				rel="prev"
			>
				<div class="pagination-link-type">Previous</div>
				<div class="pagination-link-label"><span aria-hidden="true">« </span>{ basename }</div>
				<div class="pagination-link-sublabel">{  ( kind ) ? ' ('+kind+')' : null }</div>
			</Link>
		);
	}

	/**
	* Renders a pagination link to the next package.
	*
	* @private
	* @param {string} pkg - package
	* @returns {ReactElement} React element
	*/
	_renderPaginationNext( pkg ) {
		var basename;
		var name;
		var kind;

		name = '@stdlib/' + pkg;

		// Isolate the basename of the package path:
		basename = pkgBasename( pkg ); // e.g., `sin`

		// Determine if we can resolve a package "kind":
		kind = pkgKind( pkg );

		return (
			<Link
				className="pagination-link pagination-link-next"
				to={ pkgPath( name, this.props.version ) }
				title="Next package"
				rel="next"
			>
				<div class="pagination-link-type">Next</div>
				<div class="pagination-link-label">{ basename }<span aria-hidden="true"> »</span></div>
				<div class="pagination-link-sublabel">{  ( kind ) ? ' ('+kind+')' : null }</div>
			</Link>
		);
	}

	/**
	* Renders a pagination link placeholder.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderPaginationPlaceholder() {
		return (
			<div className="pagination-link-placeholder"/>
		);
	}

	/**
	* Renders pagination links.
	*
	* @private
	* @returns {(ReactElement|null)} React element
	*/
	_renderPagination() {
		var prev = this.props.prev;
		var next = this.props.next;
		if ( !prev && !next ) {
			return null;
		}
		return (
			<div className="pagination">
				{ ( prev ) ? this._renderPaginationPrev( prev ) : this._renderPaginationPlaceholder() }
				{ ( next ) ? this._renderPaginationNext( next ) : this._renderPaginationPlaceholder() }
			</div>
		);
	}

	_renderBreadcrumbs() {
		var parts = this.props.pkg.split( '/' );
		var links = [];
		var base = '';
		var i;
		for ( i = 0; i < parts.length; i++ ) {
			links.push(
				<Link
					key={parts[i]}
					to={pkgPath( base + parts[ i ], this.props.version )}
				>
					{parts[ i ]}
				</Link>
			);
			base += parts[ i ] + '/';
		}
		return (
			<Breadcrumbs aria-label="breadcrumb" separator="›" >
				<a href={config.mount + this.props.version} >
					<span className="logo-icon stdlib-logo-icon" role="img" aria-hidden="true"></span>
					stdlib
				</a>
				{links}
			</Breadcrumbs>
		);
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		this._fetchFragment( this.props.url );
	}

	/**
	* Callback invoked immediately after updating a component.
	*
	* @private
	* @param {Object} prevProps - previous properties
	* @param {Object} prevState - previous state
	*/
	componentDidUpdate( prevProps ) {
		if ( this.props.url !== prevProps.url ) {
			this._fetchFragment( this.props.url );
		}
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		// NOTE: we make rendering the addendum conditional on the content in order to avoid a flash while resolving the README HTML...
		return (
			<div
				id="readme"
				className="readme"
			>
				{ this._renderBreadcrumbs() }
				<ReadmeContent
					html={ this.state.content }
					onClick={ this.props.onClick }
				/>
				{ ( this.state.content ) ?
					<section className="readme-addendum">
						<nav className="readme-bottom-nav" aria-label="pagination">
							{ this._renderEditLink() }
							{ this._renderPagination() }
						</nav>
					</section>
					:
					null
				}
			</div>
		);
	}
}


// EXPORTS //

export default Readme;
