function crewmateRequest() {
	var crewmatesPerPage = 10;

	$('button').filter(function (a, b) {
	    return b.textContent.trim() == "Crewmate Request";
	}).each(function (i, el) {
	    setTimeout(function () {
	        el.click();
	        if (i + 1 === crewmatesPerPage) {
	        	$('button#update-user-list').click();
	        	setTimeout(crewmateRequest, 3000);
	        }
	    }, i * 1000);
	});	
}
crewmateRequest();
