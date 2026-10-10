( function ( wp, dr ) {
	var el = dr.el;
	var Fragment = dr.Fragment;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var PanelBody = dr.PanelBody;
	var placeholder = dr.placeholderBlock;
	var livePreview = dr.livePreview;
	var registerBlockType = wp.blocks.registerBlockType;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var MediaUpload = wp.blockEditor.MediaUpload;
	var Button = wp.components.Button;
	var bilingual = dr.bilingualField;
	var repeater = dr.repeaterField;

	registerBlockType( 'dr-ruan/testimonials', {
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
						{ title: 'Testimonials Section', initialOpen: true },
						bilingual( { label: 'Section tag', zhValue: a.tagZh, enValue: a.tagEn, esValue: a.tagEs, viValue: a.tagVi, onZhChange: set( 'tagZh' ), onEnChange: set( 'tagEn' ), onEsChange: set( 'tagEs' ), onViChange: set( 'tagVi' ) } ),
						bilingual( { label: 'Heading', zhValue: a.headingZh, enValue: a.headingEn, esValue: a.headingEs, viValue: a.headingVi, onZhChange: set( 'headingZh' ), onEnChange: set( 'headingEn' ), onEsChange: set( 'headingEs' ), onViChange: set( 'headingVi' ) } ),
						bilingual( { label: 'Sub-line', multiline: true, zhValue: a.subZh, enValue: a.subEn, esValue: a.subEs, viValue: a.subVi, onZhChange: set( 'subZh' ), onEnChange: set( 'subEn' ), onEsChange: set( 'subEs' ), onViChange: set( 'subVi' ) } ),
						el(
							MediaUpload,
							{
								onSelect: function ( media ) { setAttributes( { backgroundImage: media.url } ); },
								allowedTypes: [ 'image' ],
								render: function ( obj ) {
									return el(
										Fragment,
										{},
										a.backgroundImage ? el( 'img', { src: a.backgroundImage, style: { maxWidth: '160px', display: 'block', margin: '8px 0' } } ) : null,
										el( Button, { isSecondary: true, onClick: obj.open }, a.backgroundImage ? 'Replace background photo' : 'Upload background photo (optional)' )
									);
								},
							}
						),
						el( 'p', { style: { fontWeight: 'bold', marginTop: '14px' } }, 'Testimonials (shows 3 at a time, arrows rotate through all)' ),
						repeater( {
							items: a.items,
							onChange: function ( next ) { setAttributes( { items: next } ); },
							addLabel: 'Add testimonial',
							fields: [
								{ key: 'issueZh', label: 'Issue tag (中文)' },
								{ key: 'issueEn', label: 'Issue tag (English)' },
								{ key: 'issueEs', label: 'Issue tag (Español)' },
								{ key: 'issueVi', label: 'Issue tag (Tiếng Việt)' },
								{ key: 'quoteZh', label: 'Quote (中文)', type: 'textarea' },
								{ key: 'quoteEn', label: 'Quote (English)', type: 'textarea' },
								{ key: 'quoteEs', label: 'Quote (Español)', type: 'textarea' },
								{ key: 'quoteVi', label: 'Quote (Tiếng Việt)', type: 'textarea' },
								{ key: 'name', label: 'Patient name/label' },
							],
						} )
					)
				),
				el( 'div', blockProps, livePreview( 'dr-ruan/testimonials', a ) )
			);
		},
		save: function () {
			return null;
		},
	} );
} )( window.wp, window.drRuanBlocks );
