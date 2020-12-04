<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use common\widgets\Alert;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>


<nav class="navbar navbar-default">
  <div class="">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#"><img width="93" src="images/logo.svg" alt="logo" /></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">How it works</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Contact Us</a></li>
		<li><a href="#"><img width="20" src="images/user_icn.svg" alt="logo" /></a></li>
		<li class="cart"><a href="#">
			<div class="cart-count">2</div>
			<img width="20" src="images/cart_icon.svg" alt="logo" /></a></li>
	  </ul>
    </div>
  </div>
</nav>


        <?= Alert::widget() ?>
        <?= $content ?>

<!-- Footer -->
<footer class="container-fluid">
	<div class="row">
		<div class="col-sm-4 left-block">
			<div class="content">It's Glow Time.</div>
			<p>2020 KALOSE LLC. Legal.</p>
		</div>
		<div class="col-sm-4"></div>
		<div class="col-sm-4">
			<div class="col-sm-6">
				<div class="menu-title">About Us </div>
				<ul class="nav">
					<li>Co-living</li>
					<li>FAQs</li>
					<li>Careers</li>
					<li>The Journal</li>
					<li>Serviced Living</li>
					<li>Venue hire</li>
					<li>Co-working</li>
				</ul>
			</div>
			
			<div class="col-sm-6">
				<div class="menu-title">Get in touch</div>
				<ul class="nav">
					<li>KALOSE Inc,</li>
					<li>Century Park East Suite 803,</li>
					<li>Los Angeles,</li>
					<li>+44 (0) 207 543 5478</li>
				</ul>
			</div>
			<div class="col-sm-6"></div>
		</div>
	</div>
    <div class="back-to-top-wrapper">
		<a id="back2Top" href="#top" class="back-to-top-link" aria-label="Scroll to Top"><i class="glyphicon glyphicon-menu-up"></i></a>
	  </div>
</footer>


<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
