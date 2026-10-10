<?php
/**
 * Main template file for Ruan's Traditional Chinese Herbalist theme.
 *
 * The homepage content (Hero, About, Testimonials, Specialties, Philosophy,
 * Featured Herbs, CTA Banner, Contact) is no longer hardcoded here - it's
 * built from the eight custom blocks in /blocks/, edited on a WordPress
 * Page through the block editor.
 *
 * To set this up: create a Page, open the block inserter's "Patterns" tab,
 * search for "Dr. Ruan: Full Homepage", and insert it. That adds all eight
 * blocks pre-filled with the current content, ready to edit. Then set that
 * Page as your static front page under Settings > Reading.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

get_header();

if ( have_posts() ) :
    while ( have_posts() ) :
        the_post();
        the_content();
    endwhile;
else :
    ?>
    <section style="padding:80px 32px; text-align:center;">
        <p>
            <?php esc_html_e( 'No content yet. Create a Page, insert the "Dr. Ruan: Full Homepage" pattern from the block inserter, then set it as your static front page under Settings > Reading.', 'dr-ruan-tcm' ); ?>
        </p>
    </section>
    <?php
endif;

get_footer();
