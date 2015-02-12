//http://zc2.ayakashi.zynga.com/app.php?_c=battle
//$(document.body).css("visibility", "hidden");

var foundEnemy = false;
var testDefense = 42;
var refreshComplete = false;
var mytimeout;
var beginBattle = false;



$.ajaxSetup({
    beforeSend: function (jqXHR, settings) {
        console.log("beforeSend", jqXHR, settings);

    },
    error: function(jqXHR, settings) {
        console.log("error, refresh opponent list", jqXHR, settings);
        if (mytimeout) {
            clearTimeout(mytimeout);
            mytimeout = setTimeout(function(){document.querySelector('#update-battle-list').click();}, 4000);
        }

    },

    complete: function (jqXHR) {
//        console.log("complete", jqXHR);
        var gameData = JSON.parse(jqXHR.responseText);
//        console.log(gameData.opponents);
        for (var i = 0; i < gameData.opponents.length; i++) {
            if (gameData.opponents[i].detail.defense < testDefense) {
                foundEnemy = true;

                console.info("found enemy, defense=" + gameData.opponents[i].detail.defense);
                $('dd').filter(function(index) { return $(this).text() == gameData.opponents[i].detail.defense; }).first()[0].click();
//                setTimeout(function(){
//                    $('dd').filter(function(index) { return $(this).text() == gameData.opponents[i].detail.defense; }).first()[0].click();
//                }, 1000);
                break;

            }
        }

    }
});

refreshButtonObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        refreshComplete = true;
        if (!foundEnemy) {
//            console.warn("battle list changed time to search again");
            mytimeout = setTimeout(function(){document.querySelector('#update-battle-list').click();}, 1500);
        }

    });
});

refreshButtonObserver.observe(document.querySelector("#opponents-list"),  {
    attributes: true,
    childList: true,
    characterData: true
});

battlePageObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.attributeName === "class") {
            if (!beginBattle) {
                beginBattle = true;

                document.title = "battle" + new Date().toTimeString() + document.title;

                foundEnemy = true;
                if (document.querySelector('.btn-battle-xl')) {
                    console.log("battle button exists, enemy found ", new Date().toTimeString());
                    document.querySelector('.btn-battle-xl').click();
                } else {
                    console.log("sealstone already stolen");
                    foundEnemy = false;
                    goBack();
                    document.querySelector('#update-battle-list').click();
                }
            }
        }

    });
});

battlePageObserver.observe(document.body, {
    attributes: true,
    childList: true,
    characterData: true
});


$('.defense-kiai+dd').each(function (i, el) {
    if (parseInt(el.innerHTML) < testDefense) {
        console.log("def:", el.innerHTML);
        foundEnemy = true;
        el.click();
    }
});
if (!foundEnemy) {
    document.querySelector('#update-battle-list').click();
}

//sealstone battle link with target stone link
//http://zc2.ayakashi.zynga.com/app.php?_c=parts_pvp_event&action=battle_list&evid=78&target_item_id=2

//$('a[href*=zid]').each(function (i, el) {
//    var zid = el.href.match(/zid=(\d+)/)[1];
//    var stone = 6;
//    console.log("http://zc2.ayakashi.zynga.com/app.php?_c=parts_pvp_event&action=battle_confirm&target_user_id=" + zid + "&evid=78&ref=undefined&target_item_id=" + stone);
//})


