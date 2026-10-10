<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$items = isset( $attributes['items'] ) ? $attributes['items'] : array();
$bg = ! empty( $attributes['backgroundImage'] ) ? esc_url( $attributes['backgroundImage'] ) : '';
?>
<section class="testimonials reveal" id="testimonials"<?php if ( $bg ) : ?> style="--testi-bg:url('<?php echo $bg; ?>');"<?php endif; ?>>
  <div class="wrap">
    <div class="services-head">
      <div class="section-tag" data-en="<?php echo esc_attr( $attributes['tagEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['tagEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['tagVi'] ); ?>"><?php echo esc_html( $attributes['tagZh'] ); ?></div>
      <h2 data-en="<?php echo esc_attr( $attributes['headingEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['headingEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['headingVi'] ); ?>"><?php echo esc_html( $attributes['headingZh'] ); ?></h2>
      <p data-en="<?php echo esc_attr( $attributes['subEn'] ); ?>" data-es="<?php echo esc_attr( $attributes['subEs'] ); ?>" data-vi="<?php echo esc_attr( $attributes['subVi'] ); ?>"><?php echo esc_html( $attributes['subZh'] ); ?></p>
    </div>
    <div class="testi-carousel">
      <button class="testi-arrow testi-prev" aria-label="上一则见证" data-aria-zh="上一则见证" data-aria-en="Previous testimonial" data-aria-es="Testimonio anterior" data-aria-vi="Đánh giá trước">&#8249;</button>
      <div class="testi-viewport">
        <div class="testi-track">
          <?php foreach ( $items as $item ) : ?>
          <div class="testi-card">
            <div class="testi-issue" data-en="<?php echo esc_attr( $item['issueEn'] ); ?>" data-es="<?php echo esc_attr( $item['issueEs'] ); ?>" data-vi="<?php echo esc_attr( $item['issueVi'] ); ?>"><?php echo esc_html( $item['issueZh'] ); ?></div>
            <p class="testi-quote" data-en="<?php echo esc_attr( $item['quoteEn'] ); ?>" data-es="<?php echo esc_attr( $item['quoteEs'] ); ?>" data-vi="<?php echo esc_attr( $item['quoteVi'] ); ?>"><?php echo esc_html( $item['quoteZh'] ); ?></p>
            <div class="testi-name"><?php echo esc_html( $item['name'] ); ?></div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
      <button class="testi-arrow testi-next" aria-label="下一则见证" data-aria-zh="下一则见证" data-aria-en="Next testimonial" data-aria-es="Siguiente testimonio" data-aria-vi="Đánh giá tiếp theo">&#8250;</button>
    </div>
  </div>
</section>
