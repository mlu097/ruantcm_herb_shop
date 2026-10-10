<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$items = isset( $attributes['items'] ) ? $attributes['items'] : array();
?>
<section class="book reveal" id="book">
  <div class="wrap">
    <div>
      <div class="section-tag" data-en="<?php echo esc_attr( $attributes['tagEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['tagEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['tagVi'] ); ?>"><?php echo esc_html( $attributes['tagZh'] ); ?></div>
      <h2 data-en="<?php echo esc_attr( $attributes['headingEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['headingEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['headingVi'] ); ?>"><?php echo esc_html( $attributes['headingZh'] ); ?></h2>
      <p data-en="<?php echo esc_attr( $attributes['subEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['subEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['subVi'] ); ?>"><?php echo esc_html( $attributes['subZh'] ); ?></p>
      <ul class="contact-list">
        <?php foreach ( $items as $item ) : ?>
        <li>
          <div class="dot"></div>
          <div>
            <strong data-en="<?php echo esc_attr( $item['labelEn'] ); ?>" data-es="<?php echo esc_attr( $item['labelEs'] ); ?>" data-vi="<?php echo esc_attr( $item['labelVi'] ); ?>"><?php echo esc_html( $item['labelZh'] ); ?></strong>
            <span><?php if ( ! empty( $item['url'] ) ) : ?><a href="<?php echo esc_url( $item['url'] ); ?>" target="_blank" rel="noopener"><?php echo esc_html( $item['value'] ); ?></a><?php else : ?><?php echo esc_html( $item['value'] ); ?><?php endif; ?></span>
          </div>
        </li>
        <?php endforeach; ?>
      </ul>
    </div>
    <div class="book-card">
      <h3 data-en="<?php echo esc_attr( $attributes['cardHeadingEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['cardHeadingEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['cardHeadingVi'] ); ?>"><?php echo esc_html( $attributes['cardHeadingZh'] ); ?></h3>
      <p data-en="<?php echo esc_attr( $attributes['cardBodyEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['cardBodyEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['cardBodyVi'] ); ?>"><?php echo esc_html( $attributes['cardBodyZh'] ); ?></p>
      <a href="<?php echo esc_url( $attributes['cardButtonUrl'] ); ?>" target="_blank" rel="noopener" class="btn-primary" data-en="<?php echo esc_attr( $attributes['cardButtonTextEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['cardButtonTextEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['cardButtonTextVi'] ); ?>"><?php echo esc_html( $attributes['cardButtonTextZh'] ); ?></a>
      <p class="note" data-en="<?php echo esc_attr( $attributes['cardNoteEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['cardNoteEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['cardNoteVi'] ); ?>"><?php echo esc_html( $attributes['cardNoteZh'] ); ?></p>
    </div>
  </div>
</section>
