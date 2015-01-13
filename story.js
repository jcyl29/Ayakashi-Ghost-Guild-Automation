$(document.body).css("visibility", "hidden");
//old way, still works
var zeroreached = false;
function autoStory(options) {
	var options = options || {};

	var delay = options.delay || 1000,
		timeToReset = options.timeToReset || 120000,
        minHP = options.minHP || 0;

	var myTimeout;

		myTimeout = setInterval(function() {
			var remainingHP = parseInt(document.querySelector('.note').textContent.trim().match(/(\d+)\//)[1]);
			document.title = "hp=" + remainingHP + document.title;

			console.log(document.querySelector("a[data-rel='back']"));

			if (remainingHP > minHP || zeroreached) {
				zeroreached = false;
				document.title = "investigating" + document.title;
				document.querySelector("button#do-adventure").click();

			} else {
				clearInterval(myTimeout);
				zeroreached = true;
				document.title = "wait," + document.title;

				setTimeout(function(){autoStory({delay:delay})}, timeToReset);
			}

            if (window.location.hash != "") {
                console.log("reset hash");
                window.location.hash = "";
            }
		}, delay);

}
autoStory({delay: 3000, timeToReset: 3 * 60000});


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