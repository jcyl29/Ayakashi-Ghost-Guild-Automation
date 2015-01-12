//old way, still works
var zeroreached = false;
function wait2min(options) {
	var options = options || {};

	var delay = options.delay || 1000,
		timeToReset = options.timeToReset || 120000;

	var myTimeout;

		myTimeout = setInterval(function() {
			var remainingHP = parseInt(document.querySelector('.note').textContent.trim().match(/(\d+)\//)[1]);
			document.title = "hp=" + remainingHP + document.title;

			console.log(document.querySelector("a[data-rel='back']"));

			if (remainingHP > 0 || zeroreached) {
				zeroreached = false;
				document.title = "investigating" + document.title;
				document.querySelector("button#do-adventure").click();

			} else {
				clearInterval(myTimeout);
				zeroreached = true;
				document.title = "waiting two minutes" + document.title;

				setTimeout(function(){wait2min({delay:delay})}, timeToReset);
			}

            if (window.location.hash != "") {
                console.log("reset hash");
                window.location.hash = "";
            }
		}, delay);

}
wait2min({delay:3000});


$.ajaxSetup({
    beforeSend: function (jqXHR, settings) {
        console.log("beforeSend", jqXHR, settings);

    },
    error: function(jqXHR, settings) {
        console.log("error", jqXHR, settings);
    },

    complete: function (jqXHR) {
        console.log("complete", jqXHR);
    }
});