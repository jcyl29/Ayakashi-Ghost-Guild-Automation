//http://zc2.ayakashi.zynga.com/app.php?_c=battle
var foundEnemy = false;
var testDefense = 20;
var refreshComplete = false;

$.ajaxSetup({
    beforeSend: function (jqXHR) {
        console.log("beforeSend", jqXHR);

    },
    complete: function (jqXHR) {
        console.log("complete", jqXHR);
        var gameData = JSON.parse(jqXHR.responseText);
        console.log(gameData.opponents[0]);
        for (var i = 0; i < gameData.opponents.length; i++) {
            if (gameData.opponents[i].detail.defense < testDefense) {
                foundEnemy = true;

                console.info("found enemy, defense is" + gameData.opponents[i].detail.defense);
                setTimeout(function(){
                    $('dd').filter(function(index) { return $(this).text() == gameData.opponents[i].detail.defense; }).first()[0].click();
                }, 1000);
                break;

            }
        }

        if (document.querySelector('.btn-battle-xl')) {
            console.log("battle button exists, enemy found", foundEnemy);
            foundEnemy = true;
            setTimeout(function () {
                document.querySelector('.btn-battle-xl').click();

            }, 500);

        }


    }
});

observerConfig = {
    attributes: true,
    childList: true,
    characterData: true
};

firstImgObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        refreshComplete = true;
        if (!foundEnemy) {
            console.warn("battle list changed time to search again");
            setTimeout(function(){document.querySelector('#update-battle-list').click();}, 4000);


        }

    });
});

firstImgObserver.observe(document.querySelector("#opponents-list"), observerConfig);



$('.defense-kiai+dd').each(function (i, el) {
    if (parseInt(el.innerHTML) < testDefense) {
        console.log("def:", el.innerHTML);
        foundEnemy = true;
        el.click();
        return;
    }
});
if (!foundEnemy) {
    document.querySelector('#update-battle-list').click();
}

