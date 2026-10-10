<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$items = isset( $attributes['items'] ) ? $attributes['items'] : array();
?>
<section class="services reveal" id="services">
  <div class="wrap">
    <div class="services-head">
      <div class="section-tag" data-en="<?php echo esc_attr( $attributes['tagEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['tagEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['tagVi'] ); ?>"><?php echo esc_html( $attributes['tagZh'] ); ?></div>
      <h2 data-en="<?php echo esc_attr( $attributes['headingEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['headingEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['headingVi'] ); ?>"><?php echo esc_html( $attributes['headingZh'] ); ?></h2>
      <p data-en="<?php echo esc_attr( $attributes['subEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['subEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['subVi'] ); ?>"><?php echo esc_html( $attributes['subZh'] ); ?></p>
    </div>
    <div class="drawer-grid">
      <?php foreach ( $items as $item ) : ?>
      <div class="drawer">
        <div class="drawer-label">
          <h3 data-en="<?php echo esc_attr( $item['titleEn'] ); ?>" data-es="<?php echo esc_attr( $item['titleEs'] ); ?>" data-vi="<?php echo esc_attr( $item['titleVi'] ); ?>"><?php echo esc_html( $item['titleZh'] ); ?></h3>
          <div class="drawer-pull"></div>
        </div>
        <div class="drawer-body">
          <p data-en="<?php echo esc_attr( $item['bodyEn'] ); ?>" data-es="<?php echo esc_attr( $item['bodyEs'] ); ?>" data-vi="<?php echo esc_attr( $item['bodyVi'] ); ?>"><?php echo esc_html( $item['bodyZh'] ); ?></p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
