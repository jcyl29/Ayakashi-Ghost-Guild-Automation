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
		}, delay);

}
wait2min({delay:3000});
