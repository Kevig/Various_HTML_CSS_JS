<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>UserName isUnique Validation</title>
<meta name="keywords" content="" />
<meta name="description" content="" />

</head>
<body>
<?PHP
	
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: POST');
	header('Access-Control-Max-Age: 1000');
	
	ob_start(); // Set a start point for screen clearing
	
	// Server / Database connection info
	$serverName = "127.0.0.1:3306";
	$userName = "root";
	$password = "GroundK!8356!";
	$dBase = "appusers";

	$connection = mysql_connect($serverName, $userName, $password);
	
	if (!$connection) // Connection fail, kill connection (add some response)
	{ 
		die();
	} 
	else // Connected
	{ 
		$checkValue = $_POST['UserName'];
		
		if ($checkValue == null || $checkValue == " ")
		{
			serverResponse(1);
		} else {
			serverResponse(queryDatabase($checkValue, $dBase, $connection));
		}
	}
	
	function queryDatabase($value, $dB, $conn)
	{
		
		// Select database
		mysql_select_db($dB);
		
		// get data from username_list table
		$getData = "SELECT * FROM username_list";
		$result = mysql_query($getData, $conn);
		$length = mysql_num_rows($result);
		
		while($r[]=mysql_fetch_array($result));
		
		if ($result)
		{
				
			for ($i = 0; $i < $length; $i++)
			{
				if ($r[$i][0] == $value)
				{
					return 0;
				}
			}
			return 1;
			
		} else {
			return 1;
		}
	}
	
	function serverResponse($response)
	{
		//code to handle a server response
		ob_end_clean();
		echo $response;
		exit();
		mysql_query($connection, $result);
		mysql_close($connection);
	}
	
?>
</body>
</html>

