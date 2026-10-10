<?php
if ( ! defined( 'ABSPATH' ) ) exit;
?>
<section class="about reveal" id="about">
  <div class="wrap">
    <div class="about-portrait" aria-hidden="true"></div>
    <div>
      <div class="section-tag" data-en="<?php echo esc_attr( $attributes['tagEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['tagEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['tagVi'] ); ?>"><?php echo esc_html( $attributes['tagZh'] ); ?></div>
      <h2 data-en="<?php echo esc_attr( $attributes['headingEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['headingEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['headingVi'] ); ?>"><?php echo esc_html( $attributes['headingZh'] ); ?></h2>
      <p data-en="<?php echo esc_attr( $attributes['bodyEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['bodyEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['bodyVi'] ); ?>"><?php echo esc_html( $attributes['bodyZh'] ); ?></p>
      <p class="pull-quote" data-en="<?php echo esc_attr( $attributes['quoteEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['quoteEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['quoteVi'] ); ?>"><?php echo esc_html( $attributes['quoteZh'] ); ?></p>
      <div class="credentials">
        <div><strong><?php echo esc_html( $attributes['cred1Value'] ); ?></strong><span data-en="<?php echo esc_attr( $attributes['cred1LabelEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['cred1LabelEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['cred1LabelVi'] ); ?>"><?php echo esc_html( $attributes['cred1LabelZh'] ); ?></span></div>
        <div><strong><?php echo esc_html( $attributes['cred2Value'] ); ?></strong><span data-en="<?php echo esc_attr( $attributes['cred2LabelEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['cred2LabelEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['cred2LabelVi'] ); ?>"><?php echo esc_html( $attributes['cred2LabelZh'] ); ?></span></div>
        <div><strong data-en="<?php echo esc_attr( $attributes['cred3ValueEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['cred3ValueEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['cred3ValueVi'] ); ?>"><?php echo esc_html( $attributes['cred3ValueZh'] ); ?></strong><span data-en="<?php echo esc_attr( $attributes['cred3LabelEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['cred3LabelEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['cred3LabelVi'] ); ?>"><?php echo esc_html( $attributes['cred3LabelZh'] ); ?></span></div>
      </div>
    </div>
  </div>
</section>
