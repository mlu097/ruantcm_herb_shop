<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$count = ! empty( $attributes['postCount'] ) ? (int) $attributes['postCount'] : 3;

$query = new WP_Query( array(
    'post_type'           => 'post',
    'posts_per_page'      => $count,
    'post_status'         => 'publish',
    'ignore_sticky_posts' => true,
) );

$posts_page_id  = get_option( 'page_for_posts' );
$archive_url    = $posts_page_id ? get_permalink( $posts_page_id ) : get_post_type_archive_link( 'post' );
if ( ! $archive_url ) {
    $archive_url = home_url( '/blog/' );
}
?>
<section class="blog reveal" id="blog">
  <div class="wrap">
    <div class="services-head">
      <div class="section-tag" data-en="<?php echo esc_attr( $attributes['tagEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['tagEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['tagVi'] ); ?>"><?php echo esc_html( $attributes['tagZh'] ); ?></div>
      <h2 data-en="<?php echo esc_attr( $attributes['headingEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['headingEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['headingVi'] ); ?>"><?php echo esc_html( $attributes['headingZh'] ); ?></h2>
      <p data-en="<?php echo esc_attr( $attributes['subEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['subEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['subVi'] ); ?>"><?php echo esc_html( $attributes['subZh'] ); ?></p>
    </div>

    <form role="search" method="get" class="blog-search" action="<?php echo esc_url( home_url( '/' ) ); ?>">
      <input type="text" id="blogSearchInput" class="blog-search-input" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="搜索文章…" aria-label="搜索学习园地文章">
      <input type="hidden" name="post_type" value="post">
      <button type="submit" class="blog-search-btn" aria-label="搜索">
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M18 18l-4.3-4.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
    </form>

    <?php if ( $query->have_posts() ) : ?>
    <div class="blog-grid">
      <?php while ( $query->have_posts() ) : $query->the_post(); ?>
      <article class="blog-card">
        <?php if ( has_post_thumbnail() ) : ?>
          <div class="blog-card-image" style="background-image:url('<?php echo esc_url( get_the_post_thumbnail_url( get_the_ID(), 'medium_large' ) ); ?>');background-size:cover;background-position:center;"></div>
        <?php else : ?>
          <div class="blog-card-image" aria-hidden="true"></div>
        <?php endif; ?>
        <div class="blog-card-body">
          <div class="blog-card-meta">
            <span class="blog-card-tag"><?php echo esc_html( dr_ruan_first_category_name() ); ?></span>
            <span class="blog-card-date"><?php echo esc_html( get_the_date() ); ?></span>
          </div>
          <h3><?php the_title(); ?></h3>
          <p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 24 ) ); ?></p>
          <a href="<?php the_permalink(); ?>" data-en="<?php echo esc_attr( $attributes['readMoreEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['readMoreEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['readMoreVi'] ); ?>"><?php echo esc_html( $attributes['readMoreZh'] ); ?></a>
        </div>
      </article>
      <?php endwhile; wp_reset_postdata(); ?>
    </div>
    <div style="text-align:center;margin-top:36px;">
      <a href="<?php echo esc_url( $archive_url ); ?>" class="btn-ghost" data-en="<?php echo esc_attr( $attributes['viewAllEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['viewAllEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['viewAllVi'] ); ?>"><?php echo esc_html( $attributes['viewAllZh'] ); ?></a>
    </div>
    <?php else : ?>
    <p style="text-align:center;color:var(--ink-soft);">
      <?php esc_html_e( '还没有发布任何文章。前往「文章」\u2192「新增文章」开始撰写吧。', 'dr-ruan-tcm' ); ?>
    </p>
    <?php endif; ?>
  </div>
</section>

