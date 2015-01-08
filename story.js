//$('.defense-kiai+dd').each(function(a,b) { console.log(a,b.innerHTML)})
////defense stats
////check b less than def value
//
//$('.defense-kiai+dd').each(function(a,b) { console.log(a,b.innerHTML)})
//
//
//$('a.btn-battle-xl')[0].click()
////battle button in battle mode
//
//app.php?_c=adventure&action=stage&island_id=3&area_id=8&stage_id=11
//stage 2-1
//
//app.php?_c=adventure&action=stage&island_id=3&area_id=8&stage_id=12
//stage 2-2 (has sealstone)
//
//document.querySelector("a[data-rel='back']")
//the next button after acquiring a demon
//also the button back to investigation when encountering another agent
//
//
//document.querySelector("button#do-adventure").click()
//the investigate button in story
//
//document.querySelector('#tit-empty-energy')
//if this exist means out of health
//
var HP;
$.ajaxSetup({
    beforeSend: function (jqXHR) {
        console.log("beforeSend", jqXHR, jqXHR.responseText);

    },
    complete: function (jqXHR) {
        console.log("complete", jqXHR);
        var gameData = JSON.parse(jqXHR.responseText);
        HP = gameData.user.energy;
        console.log("gameData.user.energy", gameData.user.energy);

        if (gameData.events[0]) {
            console.log("event", gameData.events[0].type);
        }
        if (gameData.user.energy > 1) {
            console.log(gameData);
            console.log(document.querySelector("button#do-adventure").className);
           document.querySelector("button#do-adventure").click();
        } else {
            jqXHR.abort();
        }

    }
});
window.addEventListener("hashchange", function(e){
   // receiving demons, finding other players opens a dialog that changes the hash of the url
   // remove it to go back
    if (window.location.hash = "") {
        return;
    }
   setTimeout(function() {window.location.hash = ""}, 1000);
    // window.location.hash = "";
});

observerConfig = {
    attributes: true,
    childList: true,
    characterData: true
};
firstImgObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        var newVal = $(mutation.target).prop(mutation.attributeName);
        if (mutation.attributeName === "class") {
            console.log("MutationObserver class changed to", newVal);
            if (newVal.indexOf("loading") === -1) {
                if (HP > 0) {
                    setTimeout( function() { document.querySelector("button#do-adventure").click();}, 3000);
                } else {
                    console.log("wait 2 mins");
                    setTimeout( function() { document.querySelector("button#do-adventure").click();}, 120000);

                }

            }
        }
    });
});

firstImgObserver.observe(document.querySelector("button#do-adventure"), observerConfig);
firstImgObserver.observe(document.querySelector("#magical-circle"), observerConfig);


document.querySelector("button#do-adventure").click();
//
//example response text from server:
//
// "{"stage":{"progress":100,"name":"Sendagaya: Investigation","area_id":8,"comment1_face_id":"posed","comment2_face_id":"posed","comment3_face_id":"posed","count":5,"energy":2,"exp":2,"min_coin":20,"max_coin":26,"discover_ratio":45,"treasures_raw_count":4,"end_battle_id":0,"before_drama_id":0,"after_drama_id":23,"ver":"1.0.0"},"user":{"level":122,"exp":275446,"energy":8,"energy_max":37,"coin":18732,"time_to_energy_max":1420609879,"time_to_offense_guts_max":1420618528,"exp_percentage":85,"energy_percentage":21,"exp_for_current_level":270376,"exp_for_next_level":276288,"gold_apple":0,"silver_apple":69},"loginTime":1420608139,"coinObtained":25,"extra_template":{"css":"\/css\/events-guild-raid-77-adventure.less,\/css\/events-guild-raid-77.less","banner":"events\/guildRaid\/partial\/adventure_stage_banner.tpl","bannerParam":{"evid":77,"hasActiveEnemy":true,"remainingTime":1926,"isGuildMember":true,"abilities":{"150":100},"isSpecialMonster":false,"effectiveCards":{"150":[{"id":1572,"name":"Hierophant [Reversed]","words":"\"Graaawwwrrrr!\""}]}},"section":"events\/guildRaid\/partial\/adventure_stage_section.tpl","sectionParam":{"evid":77,"nextReward":{"completeCount":43,"type":"item","reward":{"type":"item","name":"Beef Bowl (Normal)","unit":"","count":1,"value":16,"imagePath":"images\/items\/16\/m.png"}}}},"events":[{"type":"GET_PARTS","values":{"settings":{"monster":{"id":"68","name":"Hare of Inaba","partsName":"Hare of Inaba's Sealstone","type":"water","attribute":2,"rarity":3,"description":"<em>\"There's no need to be angry at little old me!\"<\/em><br \/>The white hare that appears in the <strong>Izumo myth<\/strong> of ancient Japan, she is also a <strong>goddess<\/strong> who has had a temple built in her honor. She loves joking around, though her tricks can land her in hot water.","attack":1410,"defense":1140,"guts":13,"skill":{"name":"Divine Hymn"},"isNew":false,"isSealed":true,"isGachaPoint":false,"isReadyToRelease":false,"inventoryMax":190,"inventoryCount":190,"albumCount":444,"wasSold":false,"price":1400,"coinChange":"(17332&rarr;18732)","evolveStep":0,"evolve_step":0,"evolveLevel":0,"evolve_level":0,"evolutionFinished":false,"evolution_finished":false,"wasDeposited":false},"treasure_index":0,"partsName":"Hare of Inaba's Blue Sealstone","parts":{"A":{"enabled":true,"captioned":false,"id":"681","count":0,"isProperty":false,"isNew":false},"B":{"enabled":true,"captioned":false,"id":"682","count":0,"isProperty":false,"isNew":false},"C":{"enabled":true,"captioned":false,"id":"683","count":0,"isProperty":false,"isNew":false},"D":{"enabled":true,"captioned":false,"id":"684","count":0,"isProperty":false,"isNew":false},"E":{"enabled":true,"captioned":false,"id":"685","count":0,"isProperty":false,"isNew":false},"F":{"enabled":true,"captioned":false,"id":"686","count":0,"isProperty":false,"isNew":false}},"completedCount":5,"hasAcceptableReward":false,"completed":true,"rewardMonster":{"id":207,"name":"Hare of Inaba Magatama","rarity":4,"attribute":2},"treasure":{"parts_code_string":"E","stage_id":12,"box_id":1,"ratio":50,"type":2,"content_id":685}}}}]}"
//

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
