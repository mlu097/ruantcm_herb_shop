<?php
/**
 * Template for displaying search results.
 */

if ( ! defined( 'ABSPATH' ) ) exit;

get_header();
?>

<section class="blog search-results-page reveal" id="blog">
  <div class="wrap">
    <div class="services-head">
      <div class="section-tag">搜索结果</div>
      <h2>
        <?php
        printf(
            /* translators: %s: search query */
            esc_html__( '"%s" 的搜索结果', 'dr-ruan-tcm' ),
            '<em>' . esc_html( get_search_query() ) . '</em>'
        );
        ?>
      </h2>
    </div>

    <form role="search" method="get" class="blog-search" action="<?php echo esc_url( home_url( '/' ) ); ?>">
      <input type="text" class="blog-search-input" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="搜索文章…" aria-label="搜索学习园地文章">
      <input type="hidden" name="post_type" value="post">
      <button type="submit" class="blog-search-btn" aria-label="搜索">
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="9" cy="9" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M18 18l-4.3-4.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
    </form>

    <?php if ( have_posts() ) : ?>
    <div class="blog-grid">
      <?php while ( have_posts() ) : the_post(); ?>
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
          <a href="<?php the_permalink(); ?>">阅读更多 →</a>
        </div>
      </article>
      <?php endwhile; ?>
    </div>
    <div class="search-pagination">
      <?php
      echo paginate_links( array(
          'prev_text' => '← 上一页',
          'next_text' => '下一页 →',
      ) );
      ?>
    </div>
    <?php else : ?>
    <p class="blog-no-results">
      <?php
      printf(
          /* translators: %s: search query */
          esc_html__( '找不到与「%s」相关的文章，请换个关键字再试一次。', 'dr-ruan-tcm' ),
          esc_html( get_search_query() )
      );
      ?>
    </p>
    <?php endif; ?>
  </div>
</section>

<?php get_footer(); ?>
