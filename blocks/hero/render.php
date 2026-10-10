<?php
/**
 * Renders the dr-ruan/hero block on the front end.
 * $attributes is provided by WordPress.
 */
if ( ! defined( 'ABSPATH' ) ) exit;
?>
<section class="hero">
  <div class="wrap">
    <div>
      <div class="eyebrow" data-en="<?php echo esc_attr( $attributes['eyebrowEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['eyebrowEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['eyebrowVi'] ); ?>"><?php echo esc_html( $attributes['eyebrowZh'] ); ?></div>
      <h1><span><?php echo esc_html( $attributes['titleZh'] ); ?></span><em><?php echo esc_html( $attributes['accentZh'] ); ?></em></h1>
      <p class="lead" data-en="<?php echo esc_attr( $attributes['leadEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['leadEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['leadVi'] ); ?>"><?php echo esc_html( $attributes['leadZh'] ); ?></p>
      <div class="hero-ctas">
        <a href="<?php echo esc_url( $attributes['cta1Url'] ); ?>" class="btn-primary" data-en="<?php echo esc_attr( $attributes['cta1TextEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['cta1TextEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['cta1TextVi'] ); ?>"><?php echo esc_html( $attributes['cta1TextZh'] ); ?></a>
        <a href="<?php echo esc_url( $attributes['cta2Url'] ); ?>" class="btn-ghost" data-en="<?php echo esc_attr( $attributes['cta2TextEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['cta2TextEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['cta2TextVi'] ); ?>"><?php echo esc_html( $attributes['cta2TextZh'] ); ?></a>
      </div>
    </div>
    <div class="seal-wrap" aria-hidden="true">
      <div class="seal-rings"></div>
      <img class="seal-stamp" src="<?php echo esc_url( get_template_directory_uri() . '/images/logo.png' ); ?>" alt="">
    </div>
  </div>
</section>
