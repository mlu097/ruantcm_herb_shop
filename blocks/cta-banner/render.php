<?php
if ( ! defined( 'ABSPATH' ) ) exit;
?>
<section class="cta-banner reveal">
  <div class="wrap">
    <h2 data-en="<?php echo esc_attr( $attributes['headingEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['headingEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['headingVi'] ); ?>"><?php echo esc_html( $attributes['headingZh'] ); ?></h2>
    <p data-en="<?php echo esc_attr( $attributes['bodyEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['bodyEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['bodyVi'] ); ?>"><?php echo esc_html( $attributes['bodyZh'] ); ?></p>
    <a href="<?php echo esc_url( $attributes['buttonUrl'] ); ?>" target="_blank" rel="noopener" class="btn-on-red" data-en="<?php echo esc_attr( $attributes['buttonTextEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['buttonTextEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['buttonTextVi'] ); ?>"><?php echo esc_html( $attributes['buttonTextZh'] ); ?></a>
  </div>
</section>
