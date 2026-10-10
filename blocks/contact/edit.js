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
	var repeater = dr.repeaterField;

	registerBlockType( 'dr-ruan/contact', {
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
						{ title: 'Contact Section', initialOpen: true },
				bilingual( { label: 'Section tag', zhValue: a.tagZh, enValue: a.tagEn, esValue: a.tagEs, viValue: a.tagVi, onZhChange: set( 'tagZh' ), onEnChange: set( 'tagEn' ), onEsChange: set( 'tagEs' ), onViChange: set( 'tagVi' ) } ),
				bilingual( { label: 'Heading', zhValue: a.headingZh, enValue: a.headingEn, esValue: a.headingEs, viValue: a.headingVi, onZhChange: set( 'headingZh' ), onEnChange: set( 'headingEn' ), onEsChange: set( 'headingEs' ), onViChange: set( 'headingVi' ) } ),
				bilingual( { label: 'Sub-line', multiline: true, zhValue: a.subZh, enValue: a.subEn, esValue: a.subEs, viValue: a.subVi, onZhChange: set( 'subZh' ), onEnChange: set( 'subEn' ), onEsChange: set( 'subEs' ), onViChange: set( 'subVi' ) } ),
				el( 'p', { style: { fontWeight: 'bold', marginTop: '14px' } }, 'Contact info rows' ),
				repeater( {
					items: a.items,
					onChange: function ( next ) { setAttributes( { items: next } ); },
					addLabel: 'Add row',
					fields: [
						{ key: 'labelZh', label: 'Label (中文)' },
						{ key: 'labelEn', label: 'Label (English)' },
						{ key: 'labelEs', label: 'Label (Español)' },
						{ key: 'labelVi', label: 'Label (Tiếng Việt)' },
						{ key: 'value', label: 'Value (shown as-is in all languages)' },
						{ key: 'url', label: 'Link URL (optional - leave blank for plain text, e.g. for a WeChat ID; fill in to make it a clickable link, e.g. for Facebook)' },
					],
				} ),
				el( 'p', { style: { fontWeight: 'bold', marginTop: '14px' } }, 'Booking card' ),
				bilingual( { label: 'Card heading', zhValue: a.cardHeadingZh, enValue: a.cardHeadingEn, esValue: a.cardHeadingEs, viValue: a.cardHeadingVi, onZhChange: set( 'cardHeadingZh' ), onEnChange: set( 'cardHeadingEn' ), onEsChange: set( 'cardHeadingEs' ), onViChange: set( 'cardHeadingVi' ) } ),
				bilingual( { label: 'Card body', multiline: true, zhValue: a.cardBodyZh, enValue: a.cardBodyEn, esValue: a.cardBodyEs, viValue: a.cardBodyVi, onZhChange: set( 'cardBodyZh' ), onEnChange: set( 'cardBodyEn' ), onEsChange: set( 'cardBodyEs' ), onViChange: set( 'cardBodyVi' ) } ),
				bilingual( { label: 'Card button text', zhValue: a.cardButtonTextZh, enValue: a.cardButtonTextEn, esValue: a.cardButtonTextEs, viValue: a.cardButtonTextVi, onZhChange: set( 'cardButtonTextZh' ), onEnChange: set( 'cardButtonTextEn' ), onEsChange: set( 'cardButtonTextEs' ), onViChange: set( 'cardButtonTextVi' ) } ),
				el( TextControl, { label: 'Card button URL', value: a.cardButtonUrl, onChange: set( 'cardButtonUrl' ) } ),
				bilingual( { label: 'Card note', zhValue: a.cardNoteZh, enValue: a.cardNoteEn, esValue: a.cardNoteEs, viValue: a.cardNoteVi, onZhChange: set( 'cardNoteZh' ), onEnChange: set( 'cardNoteEn' ), onEsChange: set( 'cardNoteEs' ), onViChange: set( 'cardNoteVi' ) } )
					)
				),
				el( 'div', blockProps, livePreview( 'dr-ruan/contact', a ) )
			);
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp, window.drRuanBlocks );
