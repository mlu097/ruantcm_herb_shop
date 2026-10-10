<?php
/**
 * Ruan's Traditional Chinese Herbalist theme functions
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Theme setup
 */
function dr_ruan_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
    add_theme_support( 'automatic-feed-links' );

    // Load the theme's fonts and stylesheet inside the block editor too,
    // so live block previews (and the editor canvas generally) actually
    // match how the page looks on the live site, instead of falling back
    // to unstyled/default sizing for anything the theme CSS controls.
    add_theme_support( 'editor-styles' );
    add_editor_style( array(
        'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;600;700&family=Noto+Sans+TC:wght@300;400;500&family=Ma+Shan+Zheng&display=swap',
        'style.css',
    ) );

    register_nav_menus( array(
        'primary' => __( 'Primary Menu', 'dr-ruan-tcm' ),
        'footer'  => __( 'Footer Menu', 'dr-ruan-tcm' ),
    ) );
}
add_action( 'after_setup_theme', 'dr_ruan_setup' );

/**
 * Enqueue styles and scripts
 */
function dr_ruan_scripts() {
    // Google Fonts used throughout the design
    wp_enqueue_style(
        'dr-ruan-google-fonts',
        'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;600;700&family=Noto+Sans+TC:wght@300;400;500&family=Ma+Shan+Zheng&display=swap',
        array(),
        null
    );

    // Main theme stylesheet
    wp_enqueue_style( 'dr-ruan-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );

    // Main theme script (mobile menu, reveal animation, testimonial carousel,
    // language toggle, and the accessibility widget)
    wp_enqueue_script( 'dr-ruan-main', get_template_directory_uri() . '/js/main.js', array(), wp_get_theme()->get( 'Version' ), true );
}
add_action( 'wp_enqueue_scripts', 'dr_ruan_scripts' );

/**
 * Register widget areas (optional, used only if you add widgets in future)
 */
function dr_ruan_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Footer', 'dr-ruan-tcm' ),
        'id'            => 'footer-1',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'dr_ruan_widgets_init' );

/**
 * Content width for embeds/images
 */
if ( ! isset( $content_width ) ) {
    $content_width = 1160;
}

/**
 * Register a "Dr. Ruan" block category so all our custom blocks are
 * grouped together in the block inserter instead of under "Widgets".
 */
function dr_ruan_block_categories( $categories ) {
    return array_merge(
        array(
            array(
                'slug'  => 'dr-ruan',
                'title' => __( "Dr. Ruan's Site Sections", 'dr-ruan-tcm' ),
                'icon'  => 'admin-customizer',
            ),
        ),
        $categories
    );
}
add_filter( 'block_categories_all', 'dr_ruan_block_categories' );

/**
 * Register every custom block found under /blocks/*.
 * Each block folder has: block.json, edit.js (editor UI, no build step),
 * and render.php (server-side render for the front end).
 */
function dr_ruan_register_blocks() {
    // Shared editor helper library (repeater fields, bilingual fields).
    wp_register_script(
        'dr-ruan-blocks-common',
        get_template_directory_uri() . '/blocks/common.js',
        array( 'wp-element', 'wp-components', 'wp-block-editor', 'wp-server-side-render' ),
        wp_get_theme()->get( 'Version' ),
        true
    );

    $blocks_dir = get_template_directory() . '/blocks';
    $block_folders = array( 'hero', 'about', 'services', 'testimonials', 'approach', 'herbs', 'blog', 'cta-banner', 'contact' );

    foreach ( $block_folders as $folder ) {
        $path = $blocks_dir . '/' . $folder;
        if ( ! file_exists( $path . '/block.json' ) ) {
            continue;
        }
        register_block_type( $path );
    }
}
add_action( 'init', 'dr_ruan_register_blocks' );

/**
 * Ensure each block's own editor script loads after the shared common.js
 * helper (register_block_type() auto-registers a script handle per block
 * named "{textdomain}-{block-name}-editor-script"; we hook its enqueue to
 * add the dependency).
 */
function dr_ruan_add_common_dependency() {
    global $wp_scripts;
    if ( ! $wp_scripts ) {
        return;
    }
    foreach ( $wp_scripts->registered as $handle => $script ) {
        if ( strpos( $handle, 'dr-ruan-' ) === 0 && strpos( $handle, '-editor-script' ) !== false ) {
            if ( ! in_array( 'dr-ruan-blocks-common', $script->deps, true ) ) {
                $script->deps[] = 'dr-ruan-blocks-common';
            }
        }
    }
}
add_action( 'enqueue_block_editor_assets', 'dr_ruan_add_common_dependency', 20 );

/**
 * Register a ready-made "Homepage" pattern containing all eight sections
 * pre-filled with the current site content, in order, so you can build the
 * homepage with one click from the block inserter's Patterns tab instead of
 * adding all eight blocks manually.
 */
function dr_ruan_register_patterns() {
    if ( ! function_exists( 'register_block_pattern' ) ) {
        return;
    }
    register_block_pattern_category( 'dr-ruan', array( 'label' => __( "Dr. Ruan's Site", 'dr-ruan-tcm' ) ) );

    register_block_pattern(
        'dr-ruan/homepage',
        array(
            'title'       => __( 'Dr. Ruan: Full Homepage', 'dr-ruan-tcm' ),
            'description' => __( 'Inserts all nine homepage sections (Hero, About, Testimonials, Specialties, Philosophy, Featured Herbs, Blog, CTA Banner, Contact) pre-filled with the current content.', 'dr-ruan-tcm' ),
            'categories'  => array( 'dr-ruan' ),
            'content'     =>
                '<!-- wp:dr-ruan/hero /-->' .
                '<!-- wp:dr-ruan/about /-->' .
                '<!-- wp:dr-ruan/testimonials /-->' .
                '<!-- wp:dr-ruan/services /-->' .
                '<!-- wp:dr-ruan/approach /-->' .
                '<!-- wp:dr-ruan/herbs /-->' .
                '<!-- wp:dr-ruan/blog /-->' .
                '<!-- wp:dr-ruan/cta-banner /-->' .
                '<!-- wp:dr-ruan/contact /-->',
        )
    );
}
add_action( 'init', 'dr_ruan_register_patterns' );

/**
 * Helper: return the current post's first category name, or a fallback
 * label if it's uncategorized. Used by both the blog block and single.php.
 */
function dr_ruan_first_category_name() {
    $cats = get_the_category();
    if ( ! empty( $cats ) ) {
        return $cats[0]->name;
    }
    return __( '文章', 'dr-ruan-tcm' );
}
