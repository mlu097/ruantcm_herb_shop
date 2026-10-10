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

	registerBlockType( 'dr-ruan/about', {
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
						{ title: 'About Section', initialOpen: true },
				bilingual( { label: 'Section tag', zhValue: a.tagZh, enValue: a.tagEn, esValue: a.tagEs, viValue: a.tagVi, onZhChange: set( 'tagZh' ), onEnChange: set( 'tagEn' ), onEsChange: set( 'tagEs' ), onViChange: set( 'tagVi' ) } ),
				bilingual( { label: 'Heading', zhValue: a.headingZh, enValue: a.headingEn, esValue: a.headingEs, viValue: a.headingVi, onZhChange: set( 'headingZh' ), onEnChange: set( 'headingEn' ), onEsChange: set( 'headingEs' ), onViChange: set( 'headingVi' ) } ),
				bilingual( { label: 'Bio', multiline: true, zhValue: a.bodyZh, enValue: a.bodyEn, esValue: a.bodyEs, viValue: a.bodyVi, onZhChange: set( 'bodyZh' ), onEnChange: set( 'bodyEn' ), onEsChange: set( 'bodyEs' ), onViChange: set( 'bodyVi' ) } ),
				bilingual( { label: 'Pull quote', zhValue: a.quoteZh, enValue: a.quoteEn, esValue: a.quoteEs, viValue: a.quoteVi, onZhChange: set( 'quoteZh' ), onEnChange: set( 'quoteEn' ), onEsChange: set( 'quoteEs' ), onViChange: set( 'quoteVi' ) } ),
				el( 'p', { style: { fontWeight: 'bold', marginTop: '14px' } }, 'Credentials row' ),
				el( TextControl, { label: 'Credential 1 value (e.g. 30+)', value: a.cred1Value, onChange: set( 'cred1Value' ) } ),
				bilingual( { label: 'Credential 1 label', zhValue: a.cred1LabelZh, enValue: a.cred1LabelEn, esValue: a.cred1LabelEs, viValue: a.cred1LabelVi, onZhChange: set( 'cred1LabelZh' ), onEnChange: set( 'cred1LabelEn' ), onEsChange: set( 'cred1LabelEs' ), onViChange: set( 'cred1LabelVi' ) } ),
				el( TextControl, { label: 'Credential 2 value (e.g. 5)', value: a.cred2Value, onChange: set( 'cred2Value' ) } ),
				bilingual( { label: 'Credential 2 label', zhValue: a.cred2LabelZh, enValue: a.cred2LabelEn, esValue: a.cred2LabelEs, viValue: a.cred2LabelVi, onZhChange: set( 'cred2LabelZh' ), onEnChange: set( 'cred2LabelEn' ), onEsChange: set( 'cred2LabelEs' ), onViChange: set( 'cred2LabelVi' ) } ),
				bilingual( { label: 'Credential 3 value', zhValue: a.cred3ValueZh, enValue: a.cred3ValueEn, esValue: a.cred3ValueEs, viValue: a.cred3ValueVi, onZhChange: set( 'cred3ValueZh' ), onEnChange: set( 'cred3ValueEn' ), onEsChange: set( 'cred3ValueEs' ), onViChange: set( 'cred3ValueVi' ) } ),
				bilingual( { label: 'Credential 3 label', zhValue: a.cred3LabelZh, enValue: a.cred3LabelEn, esValue: a.cred3LabelEs, viValue: a.cred3LabelVi, onZhChange: set( 'cred3LabelZh' ), onEnChange: set( 'cred3LabelEn' ), onEsChange: set( 'cred3LabelEs' ), onViChange: set( 'cred3LabelVi' ) } )
					)
				),
				el( 'div', blockProps, livePreview( 'dr-ruan/about', a ) )
			);
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp, window.drRuanBlocks );
