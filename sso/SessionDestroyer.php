<?php

	session_start();
	session_destroy();
	$json	=	json_encode("1");
	$callback = $_GET['jsoncallback'];
	echo $callback.'('. $json . ')';
?>
