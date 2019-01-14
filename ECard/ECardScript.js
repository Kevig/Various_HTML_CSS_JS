	var currentPage = 0;

	$( document ).ready(function() {
		$("#page1").hide();
		$("#page2").hide();
	});

	$( "#nextPage" ).click(function() {
		currentPage++;
		if(currentPage > 2)
		{
			currentPage = 0;
		}
		
		var e;
		var e1;
		
		switch(currentPage)
		{
			case 0:
				e = "#page2";
				e1 = "#home";
			break;
			
			case 1:
				e = "#home";
				e1 = "#page1";
			break;
			
			case 2:
				e = "#page1";
				e1 = "#page2";
		}
		
		$( e ).hide( "slide", {
			direction: "right",
			duration: 1000,
		});
				
		$( e1 ).show( "slide", {
			direction: "left",
			duration: 1000,
		});
	});

	$( "#previousPage" ).click(function() {
		currentPage--;
		if(currentPage < 0)
		{
			currentPage = 2;
		}
		
		var e;
		var e1;
		
		switch(currentPage)
		{
			case 0:
				e = "#page1";
				e1 = "#home";
			break;
			
			case 1:
				e = "#page2";
				e1 = "#page1";
			break;
			
			case 2:
				e = "#home";
				e1 = "#page2";
		}
		
		$( e ).hide( "slide", {
			direction: "left",
			duration: 1000,
		});
				
		$( e1 ).show( "slide", {
			direction: "right",
			duration: 1000,
		});
	});