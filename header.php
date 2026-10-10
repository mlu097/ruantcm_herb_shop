<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="only light">
<meta name="theme-color" content="#FBF8F2">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a href="#main" class="skip-link" id="skip-link">跳至主要内容</a>

<header>
  <nav class="wrap">
    <div class="brand">
      <img class="brand-seal" src="<?php echo esc_url( get_template_directory_uri() . '/images/logo.png' ); ?>" alt="" aria-hidden="true">
      <div class="brand-name"><span id="brand-title">阮氏中医</span><span class="brand-sub" id="brand-sub">阮斌医师</span></div>
    </div>
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">☰</button>
    <div class="nav-links" id="navLinks">
      <?php
      if ( has_nav_menu( 'primary' ) ) {
          wp_nav_menu( array(
              'theme_location' => 'primary',
              'container'      => false,
              'items_wrap'     => '<ul>%3$s</ul>',
              'fallback_cb'    => false,
          ) );
      } else {
          ?>
          <ul>
            <li><a href="#about" id="nav-about">关于</a></li>
            <li><a href="#services" id="nav-services">专业</a></li>
            <li><a href="#approach" id="nav-approach">理念</a></li>
            <li><a href="#book" id="nav-contact">联络</a></li>
            <li><a href="#blog" id="nav-blog">学习园地</a></li>
            <li><a href="<?php echo esc_url( home_url( '/shop/' ) ); ?>" id="nav-shop">商城</a></li>
          </ul>
          <?php
      }
      ?>
      <a href="https://book.ruantcm.com" target="_blank" rel="noopener" class="btn-book-nav" id="nav-book-btn">预约看诊</a>
      <select class="lang-select" id="langSelect" aria-label="选择语言 / Select language">
        <option value="zh">中文</option>
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
  </nav>
</header>

<main id="main">
