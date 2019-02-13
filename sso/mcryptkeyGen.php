<?php
	function encrypt_data($text){
		$key = "SADFo92jzVnzSj39IUYGvi6eL8v6RvJH8Cytuiouh547vCytdyUFl76R";

		$iv_size = mcrypt_get_iv_size(MCRYPT_BLOWFISH, MCRYPT_MODE_ECB);
		$iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);

		$enc = mcrypt_encrypt(MCRYPT_BLOWFISH, $key, $text, MCRYPT_MODE_ECB, $iv);

		$iv = rawurlencode(base64_encode($iv));
		$enc = rawurlencode(base64_encode($enc));
		$mcryptParams	=	array();
		$mcryptParams['iv']	=	$iv;
		$mcryptParams['enc']	=	$enc;
		return $mcryptParams;
	}

	function decrypt_data($text,$iv){
		$key = "SADFo92jzVnzSj39IUYGvi6eL8v6RvJH8Cytuiouh547vCytdyUFl76R";

		$iv = base64_decode(rawurldecode($iv));
		$enc = base64_decode(rawurldecode($text));

		$decrypted_text = mcrypt_decrypt(MCRYPT_BLOWFISH, $key, $enc, MCRYPT_MODE_ECB, $iv);
		return $decrypted_text;
	}
?>
