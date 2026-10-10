( function ( wp, dr ) {
	var el = dr.el;
	var Fragment = dr.Fragment;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = dr.PanelBody;
	var placeholder = dr.placeholderBlock;
	var livePreview = dr.livePreview;
	var registerBlockType = wp.blocks.registerBlockType;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var bilingual = dr.bilingualField;
	var repeater = dr.repeaterField;

	registerBlockType( 'dr-ruan/herbs', {
		edit: function ( props ) {
			var a = props.attributes;
			var setAttributes = props.setAttributes;
			var blockProps = useBlockProps();

			function set( key ) {
				return function ( v ) {
					var patch = {};
					patch[ key ] = v;
					setAttributes( patch );
				};
			}

			return el(
				Fragment,
				{},
				el(
					InspectorControls,
					{},
					el(
						PanelBody,
						{ title: 'Featured Herbs Section', initialOpen: true },
				bilingual( { label: 'Section tag', zhValue: a.tagZh, enValue: a.tagEn, esValue: a.tagEs, viValue: a.tagVi, onZhChange: set( 'tagZh' ), onEnChange: set( 'tagEn' ), onEsChange: set( 'tagEs' ), onViChange: set( 'tagVi' ) } ),
				bilingual( { label: 'Heading', zhValue: a.headingZh, enValue: a.headingEn, esValue: a.headingEs, viValue: a.headingVi, onZhChange: set( 'headingZh' ), onEnChange: set( 'headingEn' ), onEsChange: set( 'headingEs' ), onViChange: set( 'headingVi' ) } ),
				el( 'p', { style: { fontWeight: 'bold', marginTop: '14px' } }, 'Herbs (upload a photo for each, or leave blank for a plain tile)' ),
				repeater( {
					items: a.items,
					onChange: function ( next ) { setAttributes( { items: next } ); },
					addLabel: 'Add herb',
					fields: [
						{ key: 'image', label: 'Photo', type: 'image' },
						{ key: 'nameZh', label: 'Name (中文)' },
						{ key: 'nameEn', label: 'Name (English)' },
						{ key: 'nameEs', label: 'Name (Español)' },
						{ key: 'nameVi', label: 'Name (Tiếng Việt)' },
						{ key: 'subZh', label: 'Function (中文)' },
						{ key: 'subEn', label: 'Function (English)' },
						{ key: 'subEs', label: 'Function (Español)' },
						{ key: 'subVi', label: 'Function (Tiếng Việt)' },
					],
				} )
					)
				),
				el( 'div', blockProps, livePreview( 'dr-ruan/herbs', a ) )
			);
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp, window.drRuanBlocks );
