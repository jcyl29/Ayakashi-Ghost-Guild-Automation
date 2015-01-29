//old way, still works
var zeroreached = false;
var floorComplete = false;
function autoStory(options) {
	var options = options || {};

	var delay = options.delay || 1000,
		timeToReset = options.timeToReset || 120000,
        minHP = options.minHP || 0;

	var myTimeout;

		myTimeout = setInterval(function() {
			var remainingHP = parseInt(document.querySelector('.note').textContent.trim().match(/(\d+)\//)[1]);
//			document.title = "hp=" + remainingHP + document.title;
            console.log("hp=" + remainingHP);

            if (floorComplete) {
                clearInterval(myTimeout);
                console.warn("reached 100%");
                //need to replace event id with the relevant tower event id
                window.location = "http://zc2.ayakashi.zynga.com/app.php?_c=extra_quest_event_adventure&evid=80";
                return;
            }

			console.log("what is a[data-rel='back']" + document.querySelector("a[data-rel='back']"));

			if (remainingHP > minHP || zeroreached) {
				zeroreached = false;
				document.title = "investigating" + document.title;
                console.log( "investigating");
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
autoStory({delay: 2000, timeToReset: 3 * 60000, minHP: 8});


$.ajaxSetup({
    beforeSend: function (jqXHR, settings) {
        console.log("complete", jqXHR, jqXHR.abort);

    },
    error: function(jqXHR, settings) {
        console.log("error", jqXHR, settings);
    },

    complete: function (jqXHR) {
        console.log("complete", jqXHR);
        var gameData = JSON.parse(jqXHR.responseText);
        if (gameData.stage && gameData.stage.progress) {
            floorComplete = gameData.stage.progress == 100;
        }
    }
});