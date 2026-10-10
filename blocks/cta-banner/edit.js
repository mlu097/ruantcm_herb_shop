( function ( wp, dr ) {
	var el = dr.el;
	var Fragment = dr.Fragment;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = dr.PanelBody;
	var placeholder = dr.placeholderBlock;
	var livePreview = dr.livePreview;
	var registerBlockType = wp.blocks.registerBlockType;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var TextControl = wp.components.TextControl;
	var bilingual = dr.bilingualField;

	registerBlockType( 'dr-ruan/cta-banner', {
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
						{ title: 'CTA Banner', initialOpen: true },
				bilingual( { label: 'Heading', zhValue: a.headingZh, enValue: a.headingEn, esValue: a.headingEs, viValue: a.headingVi, onZhChange: set( 'headingZh' ), onEnChange: set( 'headingEn' ), onEsChange: set( 'headingEs' ), onViChange: set( 'headingVi' ) } ),
				bilingual( { label: 'Body', multiline: true, zhValue: a.bodyZh, enValue: a.bodyEn, esValue: a.bodyEs, viValue: a.bodyVi, onZhChange: set( 'bodyZh' ), onEnChange: set( 'bodyEn' ), onEsChange: set( 'bodyEs' ), onViChange: set( 'bodyVi' ) } ),
				bilingual( { label: 'Button text', zhValue: a.buttonTextZh, enValue: a.buttonTextEn, esValue: a.buttonTextEs, viValue: a.buttonTextVi, onZhChange: set( 'buttonTextZh' ), onEnChange: set( 'buttonTextEn' ), onEsChange: set( 'buttonTextEs' ), onViChange: set( 'buttonTextVi' ) } ),
				el( TextControl, { label: 'Button URL', value: a.buttonUrl, onChange: set( 'buttonUrl' ) } )
					)
				),
				el( 'div', blockProps, livePreview( 'dr-ruan/cta-banner', a ) )
			);
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp, window.drRuanBlocks );
