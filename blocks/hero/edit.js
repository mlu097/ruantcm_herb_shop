( function ( wp, dr ) {
	var el = dr.el;
	var Fragment = dr.Fragment;
	var registerBlockType = wp.blocks.registerBlockType;
	var useBlockProps = wp.blockEditor.useBlockProps;
	var InspectorControls = wp.blockEditor.InspectorControls;
	var TextControl = wp.components.TextControl;
	var PanelBody = dr.PanelBody;
	var bilingual = dr.bilingualField;
	var placeholder = dr.placeholderBlock;
	var livePreview = dr.livePreview;

	registerBlockType( 'dr-ruan/hero', {
		edit: function ( props ) {
			var attributes = props.attributes;
			var setAttributes = props.setAttributes;
			var blockProps = useBlockProps();

			return el(
				Fragment,
				{},
				el(
					InspectorControls,
					{},
					el(
						PanelBody,
						{ title: 'Hero Content', initialOpen: true },
						el( TextControl, {
							label: 'Title (kept the same in all languages)',
							value: attributes.titleZh,
							onChange: function ( v ) { setAttributes( { titleZh: v } ); },
						} ),
						el( TextControl, {
							label: 'Brush accent text (decorative, not translated)',
							value: attributes.accentZh,
							onChange: function ( v ) { setAttributes( { accentZh: v } ); },
						} ),
						bilingual( {
							label: 'Eyebrow (specialties line)',
							zhValue: attributes.eyebrowZh,
							enValue: attributes.eyebrowEn,
							esValue: attributes.eyebrowEs,
							viValue: attributes.eyebrowVi,
							onZhChange: function ( v ) { setAttributes( { eyebrowZh: v } ); },
							onEnChange: function ( v ) { setAttributes( { eyebrowEn: v } ); },
							onEsChange: function ( v ) { setAttributes( { eyebrowEs: v } ); },
							onViChange: function ( v ) { setAttributes( { eyebrowVi: v } ); },
						} ),
						bilingual( {
							label: 'Lead paragraph',
							multiline: true,
							zhValue: attributes.leadZh,
							enValue: attributes.leadEn,
							esValue: attributes.leadEs,
							viValue: attributes.leadVi,
							onZhChange: function ( v ) { setAttributes( { leadZh: v } ); },
							onEnChange: function ( v ) { setAttributes( { leadEn: v } ); },
							onEsChange: function ( v ) { setAttributes( { leadEs: v } ); },
							onViChange: function ( v ) { setAttributes( { leadVi: v } ); },
						} ),
						bilingual( {
							label: 'Button 1 text',
							zhValue: attributes.cta1TextZh,
							enValue: attributes.cta1TextEn,
							esValue: attributes.cta1TextEs,
							viValue: attributes.cta1TextVi,
							onZhChange: function ( v ) { setAttributes( { cta1TextZh: v } ); },
							onEnChange: function ( v ) { setAttributes( { cta1TextEn: v } ); },
							onEsChange: function ( v ) { setAttributes( { cta1TextEs: v } ); },
							onViChange: function ( v ) { setAttributes( { cta1TextVi: v } ); },
						} ),
						el( TextControl, {
							label: 'Button 1 link URL',
							value: attributes.cta1Url,
							onChange: function ( v ) { setAttributes( { cta1Url: v } ); },
						} ),
						bilingual( {
							label: 'Button 2 text',
							zhValue: attributes.cta2TextZh,
							enValue: attributes.cta2TextEn,
							esValue: attributes.cta2TextEs,
							viValue: attributes.cta2TextVi,
							onZhChange: function ( v ) { setAttributes( { cta2TextZh: v } ); },
							onEnChange: function ( v ) { setAttributes( { cta2TextEn: v } ); },
							onEsChange: function ( v ) { setAttributes( { cta2TextEs: v } ); },
							onViChange: function ( v ) { setAttributes( { cta2TextVi: v } ); },
						} ),
						el( TextControl, {
							label: 'Button 2 link URL',
							value: attributes.cta2Url,
							onChange: function ( v ) { setAttributes( { cta2Url: v } ); },
						} )
					)
				),
				el( 'div', blockProps, livePreview( 'dr-ruan/hero', attributes ) )
			);
		},
		save: function () {
			return null; // server-rendered via render.php
		},
	} );
} )( window.wp, window.drRuanBlocks );
