<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$items = isset( $attributes['items'] ) ? $attributes['items'] : array();
$generic_icon = '<svg viewBox="0 0 64 64" class="herb-icon" aria-hidden="true"><path d="M32 10c-14 0-22 10-22 22 0 6 3 10 8 12 4-10 8-18 14-24 6 6 10 14 14 24 5-2 8-6 8-12 0-12-8-22-22-22z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M32 20v34" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
?>
<section class="herb-row reveal" id="herbs">
  <div class="wrap">
    <div class="services-head" style="text-align:center;margin-left:auto;margin-right:auto;">
      <div class="section-tag" data-en="<?php echo esc_attr( $attributes['tagEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['tagEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['tagVi'] ); ?>"><?php echo esc_html( $attributes['tagZh'] ); ?></div>
      <h2 data-en="<?php echo esc_attr( $attributes['headingEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['headingEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['headingVi'] ); ?>"><?php echo esc_html( $attributes['headingZh'] ); ?></h2>
    </div>
    <div class="herb-grid">
      <?php foreach ( $items as $item ) : ?>
      <div class="herb-item">
        <?php if ( ! empty( $item['image'] ) ) : ?>
          <img class="herb-photo" src="<?php echo esc_url( $item['image'] ); ?>" alt="<?php echo esc_attr( $item['nameZh'] . ' ' . $item['nameEn'] ); ?>" loading="lazy">
        <?php else : ?>
          <div class="herb-photo herb-photo-placeholder"><?php echo $generic_icon; ?></div>
        <?php endif; ?>
        <div class="herb-name" data-en="<?php echo esc_attr( $item['nameEn'] ); ?>" data-es="<?php echo esc_attr( $item['nameEs'] ); ?>" data-vi="<?php echo esc_attr( $item['nameVi'] ); ?>"><?php echo esc_html( $item['nameZh'] ); ?></div>
        <div class="herb-sub" data-en="<?php echo esc_attr( $item['subEn'] ); ?>" data-es="<?php echo esc_attr( $item['subEs'] ); ?>" data-vi="<?php echo esc_attr( $item['subVi'] ); ?>"><?php echo esc_html( $item['subZh'] ); ?></div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
