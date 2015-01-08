//http://zc2.ayakashi.zynga.com/app.php?_c=battle
$.ajaxSetup({
    beforeSend: function (jqXHR) {
        console.log("beforeSend", jqXHR);

    },
    complete: function (jqXHR) {
        console.log("complete", jqXHR);
        var gameData = JSON.parse(jqXHR.responseText);
        console.log(gameData.opponents[0]);
        for (var i = 0; i < gameData.opponents.length; i++) {
            if (gameData.opponents[i].detail.defense < 40) {
                console.log("defense is" + gameData.opponents[i].detail.defense);
                $('dd:contains(' + gameData.opponents[i].detail.defense + ')')[0].click();


                break;
            }
        }

        if (document.querySelector('.btn-battle-xl')) {
            setTimeout(function(){document.querySelector('.btn-battle-xl').click();}, 2000);

        }


        console.log(gameData.opponents[0].detail.defense);


    }
});

//"{"layout":false,"device":"Android","currentUserZid":38637316861,"currentUserKey":"ae7adb8c528941f4830080f0742424b5","isTutorialFinished":true,"tutorialStep":40,"badgesCount":"{\"gacha\":9}","cash":230,"snDirty":"false","menu":{"myCode":"185002097092","player":{"boxGacha":[],"freeOff":{"xams_sales2014":{"com.zynga.zjayakashi.0.luckybag.300":0}}},"debug":false,"zid":38637316861,"informationUpdatedAt":1420621200,"connectUrl":"\/container\/connectAfterLogin","level":8,"cash":230,"count_monsters":54,"max_monsters":120,"inventory_nearly_limit":false,"inventory_limit":false,"count_album":20},"isNative":true,"deviceName":"android","deviceVersion":"android2","isSoundEnabled":true,"isInvitecodeEnabled":true,"userTimeZone":"Asia\/Taipei","opponents":[{"detail":{"userId":38621926941,"userName":"Elizzy","picSquareUrl":"http:\/\/ayakashi.assets.zgncdn.com\/2.37.72\/images\/1x1.png","neighborsCount":12,"monsterId":1028,"borderId":"","rarity":4,"userAttr":"fire","level":24,"coin":83448,"defense":77,"attack":77,"targetPartsId":null,"isNpc":false},"ratio":4},{"detail":{"userId":38626094124,"userName":"Hellsing","picSquareUrl":"https:\/\/graph.facebook.com\/100000964592895\/picture","neighborsCount":12,"monsterId":1569,"borderId":"","rarity":4,"userAttr":"wood","level":24,"coin":30801,"defense":75,"attack":75,"targetPartsId":null,"isNpc":false},"ratio":4},{"detail":{"userId":38686634067,"userName":"Izkander","picSquareUrl":"http:\/\/ayakashi.assets.zgncdn.com\/2.37.72\/images\/1x1.png","neighborsCount":0,"monsterId":64,"borderId":"","rarity":2,"userAttr":"fire","level":7,"coin":12139,"defense":22,"attack":22,"targetPartsId":null,"isNpc":false},"ratio":4},{"detail":{"userId":38611346857,"userName":"Warfaror","picSquareUrl":"https:\/\/graph.facebook.com\/100004909740041\/picture","neighborsCount":12,"monsterId":894,"borderId":"","rarity":5,"userAttr":"water","level":24,"coin":17612,"defense":71,"attack":72,"targetPartsId":null,"isNpc":false},"ratio":5},{"detail":{"userId":38352105613,"userName":"Yoko ","picSquareUrl":"https:\/\/graph.facebook.com\/100007697027106\/picture","neighborsCount":12,"monsterId":1561,"borderId":"","rarity":5,"userAttr":"fire","level":24,"coin":37128,"defense":79,"attack":40,"targetPartsId":null,"isNpc":false},"ratio":5}],"monster_parts":{"masterdata":{"id":681,"monsterId":68,"partsCode":1},"monster_part_id":681,"master_id":681,"monster":{},"name":"Hare of Inaba's Red Sealstone","parts_code_string":"A","monster_id":68,"parts_code":1,"monster_id_string":"68","monster_name":"Hare of Inaba","attribute":"water","completedRatio":3,"completed":false,"hasAcceptableReward":false,"reward":{"monster":{"id":207,"monster_id":207,"master_id":207,"name":"Hare of Inaba Magatama","attribute":2,"rarity":4}},"gem_settings":{"monster":{"id":"68","type":"water","attribute":2,"name":"Hare of Inaba"},"parts":{"A":{"enabled":true},"B":{"enabled":false,"isProperty":false},"C":{"enabled":false,"isProperty":false},"D":{"enabled":false,"isProperty":false},"E":{"enabled":false,"isProperty":false},"F":{"enabled":false,"isProperty":false}}}},"battle_user_status":{"offense_guts":29,"offense_guts_max":29,"total_attack":2900},"miniPvp":null,"events":[]}"
var foundEnemy = false;
$('.defense-kiai+dd').each(function(i, el) {
    if (parseInt(el.innerHTML) < 30) {
        console.log("def:",el.innerHTML);
        foundEnemy = true
        el.click();
        return;
    }
});
if (!foundEnemy) {
    document.querySelector()
}