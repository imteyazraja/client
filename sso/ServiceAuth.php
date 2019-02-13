<?php
	session_start();
	
	require_once("mcryptkeyGen.php");
	$data_dec	=	decrypt_data($_GET['respText'],$_GET['iv']);
	$brokenCypher = json_decode(json_encode((array)simplexml_load_string($data_dec)),1);
	if ($brokenCypher['EMPINFO']['AUTHFLAG'] == '1') {
		$_SESSION['empcode']	=	$brokenCypher['EMPINFO']['EMPCODE'];
		$_SESSION['empname']	=	$brokenCypher['EMPINFO']['EMPNAME'];
		
		$_SESSION['authToken'] = '1';
		$_SESSION['serviceParam'] = 88;
		header('Location:../../genio-budget');
	}
?>
