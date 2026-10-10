/**
 * Shared helpers for Dr. Ruan custom blocks.
 * Plain JS, no build step - uses the wp.* globals WordPress already
 * loads in the block editor.
 */
( function ( wp ) {
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var TextControl = wp.components.TextControl;
	var TextareaControl = wp.components.TextareaControl;
	var Button = wp.components.Button;
	var PanelBody = wp.components.PanelBody;
	var MediaUpload = wp.blockEditor ? wp.blockEditor.MediaUpload : wp.editor.MediaUpload;

	window.drRuanBlocks = window.drRuanBlocks || {};

	/**
	 * A multilingual text field: a Chinese input plus, stacked below it,
	 * matching English/Spanish/Vietnamese inputs.
	 */
	function bilingualField( args ) {
		var multiline = args.multiline;
		var Control = multiline ? TextareaControl : TextControl;
		return el(
			'div',
			{ style: { marginBottom: '14px', border: '1px solid #e0dccf', borderRadius: '4px', padding: '10px' } },
			el( Control, {
				label: args.label + '（中文）',
				value: args.zhValue,
				onChange: args.onZhChange,
			} ),
			el( Control, {
				label: args.label + ' (English)',
				value: args.enValue,
				onChange: args.onEnChange,
			} ),
			el( Control, {
				label: args.label + ' (Español)',
				value: args.esValue,
				onChange: args.onEsChange,
			} ),
			el( Control, {
				label: args.label + ' (Tiếng Việt)',
				value: args.viValue,
				onChange: args.onViChange,
			} )
		);
	}

	/**
	 * A generic repeater control. `items` is an array of plain objects.
	 * `fields` describes each column: { key, label, type: 'text'|'textarea'|'image' }
	 */
	function repeaterField( props ) {
		var items = props.items || [];
		var fields = props.fields;
		var onChange = props.onChange;
		var addLabel = props.addLabel || 'Add item';

		function updateItem( index, key, value ) {
			var next = items.slice();
			next[ index ] = Object.assign( {}, next[ index ], {} );
			next[ index ][ key ] = value;
			onChange( next );
		}

		function removeItem( index ) {
			var next = items.slice();
			next.splice( index, 1 );
			onChange( next );
		}

		function addItem() {
			var blank = {};
			fields.forEach( function ( f ) {
				blank[ f.key ] = f.type === 'image' ? 0 : '';
			} );
			onChange( items.concat( [ blank ] ) );
		}

		function moveItem( index, dir ) {
			var next = items.slice();
			var swapWith = index + dir;
			if ( swapWith < 0 || swapWith >= next.length ) return;
			var tmp = next[ index ];
			next[ index ] = next[ swapWith ];
			next[ swapWith ] = tmp;
			onChange( next );
		}

		return el(
			'div',
			{},
			items.map( function ( item, index ) {
				return el(
					'div',
					{
						key: index,
						style: {
							border: '1px solid #ccc',
							borderRadius: '4px',
							padding: '10px',
							marginBottom: '10px',
							background: '#fafafa',
						},
					},
					el(
						'div',
						{ style: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' } },
						el( 'strong', {}, '#' + ( index + 1 ) ),
						el(
							'div',
							{},
							el( Button, { isSmall: true, onClick: function () { moveItem( index, -1 ); } }, '↑' ),
							el( Button, { isSmall: true, onClick: function () { moveItem( index, 1 ); } }, '↓' ),
							el( Button, { isSmall: true, isDestructive: true, onClick: function () { removeItem( index ); } }, 'Remove' )
						)
					),
					fields.map( function ( f ) {
						if ( f.type === 'image' ) {
							return el(
								'div',
								{ key: f.key, style: { marginBottom: '8px' } },
								el(
									MediaUpload,
									{
										onSelect: function ( media ) {
											updateItem( index, f.key, media.url );
										},
										allowedTypes: [ 'image' ],
										render: function ( obj ) {
											return el(
												Fragment,
												{},
												item[ f.key ]
													? el( 'img', { src: item[ f.key ], style: { maxWidth: '100px', display: 'block', marginBottom: '4px' } } )
													: null,
												el( Button, { isSecondary: true, onClick: obj.open }, item[ f.key ] ? 'Replace ' + f.label : 'Upload ' + f.label )
											);
										},
									}
								)
							);
						}
						var Control = f.type === 'textarea' ? TextareaControl : TextControl;
						return el( Control, {
							key: f.key,
							label: f.label,
							value: item[ f.key ] || '',
							onChange: function ( v ) {
								updateItem( index, f.key, v );
							},
						} );
					} )
				);
			} ),
			el( Button, { isPrimary: true, onClick: addItem }, addLabel )
		);
	}

	/**
	 * The on-canvas placeholder shown for every block: a dashed card with
	 * a title and a hint pointing to the Settings sidebar, where the
	 * actual editable fields live (via InspectorControls).
	 */
	function placeholderBlock( title ) {
		return el(
			'div',
			{
				style: {
					border: '1.5px dashed #D97757',
					borderRadius: '10px',
					background: '#FDF3EF',
					padding: '48px 24px',
					textAlign: 'center',
				},
			},
			el(
				'div',
				{ style: { color: '#C2410C', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px', fontFamily: 'Georgia, serif' } },
				'\u2726 ' + title
			),
			el(
				'div',
				{ style: { color: '#8a8a8a', fontSize: '13px' } },
				'Edit content in the Settings panel on the right \u2192'
			)
		);
	}

	/**
	 * A live "preview as you go" canvas: renders the block's actual
	 * front-end output (via render.php, over the REST API) right inside
	 * the editor, re-rendering automatically whenever attributes change.
	 * Falls back to a simple placeholder if ServerSideRender isn't
	 * available in this WordPress version.
	 */
	function livePreview( blockName, attributes ) {
		var ServerSideRender = wp.serverSideRender || ( wp.editor && wp.editor.ServerSideRender );
		if ( ! ServerSideRender ) {
			return placeholderBlock( blockName.replace( 'dr-ruan/', '' ) );
		}
		return el( ServerSideRender, {
			block: blockName,
			attributes: attributes,
			httpMethod: 'POST',
			LoadingResponsePlaceholder: function () {
				return placeholderBlock( 'Loading preview…' );
			},
			ErrorResponsePlaceholder: function () {
				return placeholderBlock( 'Preview unavailable - edit in the Settings panel and check the live page.' );
			},
		} );
	}

	window.drRuanBlocks.el = el;
	window.drRuanBlocks.Fragment = Fragment;
	window.drRuanBlocks.PanelBody = PanelBody;
	window.drRuanBlocks.bilingualField = bilingualField;
	window.drRuanBlocks.repeaterField = repeaterField;
	window.drRuanBlocks.placeholderBlock = placeholderBlock;
	window.drRuanBlocks.livePreview = livePreview;
} )( window.wp );
