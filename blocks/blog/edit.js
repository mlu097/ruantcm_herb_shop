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
	var RangeControl = wp.components.RangeControl;
	var bilingual = dr.bilingualField;

	registerBlockType( 'dr-ruan/blog', {
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
						{ title: 'Blog Section', initialOpen: true },
				el(
					'p',
					{ style: { fontSize: '13px', color: '#666' } },
					'This block shows your actual WordPress posts automatically. Write and edit the articles themselves from Posts \u2192 Add New \u2014 there\u2019s nothing to repeat here.'
				),
				bilingual( { label: 'Section tag', zhValue: a.tagZh, enValue: a.tagEn, esValue: a.tagEs, viValue: a.tagVi, onZhChange: set( 'tagZh' ), onEnChange: set( 'tagEn' ), onEsChange: set( 'tagEs' ), onViChange: set( 'tagVi' ) } ),
				bilingual( { label: 'Heading', zhValue: a.headingZh, enValue: a.headingEn, esValue: a.headingEs, viValue: a.headingVi, onZhChange: set( 'headingZh' ), onEnChange: set( 'headingEn' ), onEsChange: set( 'headingEs' ), onViChange: set( 'headingVi' ) } ),
				bilingual( { label: 'Sub-line', multiline: true, zhValue: a.subZh, enValue: a.subEn, esValue: a.subEs, viValue: a.subVi, onZhChange: set( 'subZh' ), onEnChange: set( 'subEn' ), onEsChange: set( 'subEs' ), onViChange: set( 'subVi' ) } ),
				el( RangeControl, {
					label: 'Number of posts to show',
					value: a.postCount,
					onChange: set( 'postCount' ),
					min: 1,
					max: 6,
				} ),
				bilingual( { label: '"Read more" link text', zhValue: a.readMoreZh, enValue: a.readMoreEn, esValue: a.readMoreEs, viValue: a.readMoreVi, onZhChange: set( 'readMoreZh' ), onEnChange: set( 'readMoreEn' ), onEsChange: set( 'readMoreEs' ), onViChange: set( 'readMoreVi' ) } ),
				bilingual( { label: '"View all articles" link text', zhValue: a.viewAllZh, enValue: a.viewAllEn, esValue: a.viewAllEs, viValue: a.viewAllVi, onZhChange: set( 'viewAllZh' ), onEnChange: set( 'viewAllEn' ), onEsChange: set( 'viewAllEs' ), onViChange: set( 'viewAllVi' ) } )
					)
				),
				el( 'div', blockProps, livePreview( 'dr-ruan/blog', a ) )
			);
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp, window.drRuanBlocks );
