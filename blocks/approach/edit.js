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

	registerBlockType( 'dr-ruan/approach', {
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
						{ title: 'Philosophy Section', initialOpen: true },
				bilingual( { label: 'Section tag', zhValue: a.tagZh, enValue: a.tagEn, esValue: a.tagEs, viValue: a.tagVi, onZhChange: set( 'tagZh' ), onEnChange: set( 'tagEn' ), onEsChange: set( 'tagEs' ), onViChange: set( 'tagVi' ) } ),
				bilingual( { label: 'Heading', zhValue: a.headingZh, enValue: a.headingEn, esValue: a.headingEs, viValue: a.headingVi, onZhChange: set( 'headingZh' ), onEnChange: set( 'headingEn' ), onEsChange: set( 'headingEs' ), onViChange: set( 'headingVi' ) } ),
				bilingual( { label: 'Sub-line', multiline: true, zhValue: a.subZh, enValue: a.subEn, esValue: a.subEs, viValue: a.subVi, onZhChange: set( 'subZh' ), onEnChange: set( 'subEn' ), onEsChange: set( 'subEs' ), onViChange: set( 'subVi' ) } ),
				el( 'p', { style: { fontWeight: 'bold', marginTop: '14px' } }, 'Tenets (glyph + title + body)' ),
				repeater( {
					items: a.items,
					onChange: function ( next ) { setAttributes( { items: next } ); },
					addLabel: 'Add tenet',
					fields: [
						{ key: 'glyph', label: 'Glyph (single character, decorative)' },
						{ key: 'titleZh', label: 'Title (中文)' },
						{ key: 'titleEn', label: 'Title (English)' },
						{ key: 'titleEs', label: 'Title (Español)' },
						{ key: 'titleVi', label: 'Title (Tiếng Việt)' },
						{ key: 'bodyZh', label: 'Description (中文)', type: 'textarea' },
						{ key: 'bodyEn', label: 'Description (English)', type: 'textarea' },
						{ key: 'bodyEs', label: 'Description (Español)', type: 'textarea' },
						{ key: 'bodyVi', label: 'Description (Tiếng Việt)', type: 'textarea' },
					],
				} )
					)
				),
				el( 'div', blockProps, livePreview( 'dr-ruan/approach', a ) )
			);
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp, window.drRuanBlocks );
