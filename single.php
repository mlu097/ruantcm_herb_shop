<?php
/**
 * Template for displaying a single blog post.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

get_header();
?>

<article class="single-post reveal">
  <div class="wrap single-post-wrap">
    <a href="<?php echo esc_url( home_url( '/' ) ); ?>#blog" class="btn-ghost single-post-back">← 返回学习园地</a>

    <?php while ( have_posts() ) : the_post(); ?>
      <div class="single-post-meta">
        <span class="blog-card-tag"><?php echo esc_html( dr_ruan_first_category_name() ); ?></span>
        <span class="blog-card-date"><?php echo esc_html( get_the_date() ); ?></span>
      </div>
      <h1 class="single-post-title"><?php the_title(); ?></h1>

      <?php if ( has_post_thumbnail() ) : ?>
        <div class="single-post-image">
          <?php the_post_thumbnail( 'large' ); ?>
        </div>
      <?php endif; ?>

      <div class="single-post-content">
        <?php the_content(); ?>
      </div>
    <?php endwhile; ?>
  </div>
</article>

<?php get_footer(); ?>
