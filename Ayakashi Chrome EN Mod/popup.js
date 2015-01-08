// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
} else {
    alert('The File APIs are not fully supported in this browser.');
}

var uuid="";
var udid="";
var ZJSESSIONID="";

function update_tab(){
    var url1 =  'http://zc2.ayakashi.zynga.com/app.php?_c=entry&action=mypage';
    chrome.tabs.update({url : url1});
}

function handleFileSelect(evt) {
    var file = evt.target.files[0]; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    var reader = new FileReader();
    reader.onload = function(e) {
        var binData = atob(e.target.result);
        var key = CryptoJS.enc.Hex.parse('0bf116e3b67f80a8b00b6489b416343cb8647ef1adc17516245967325cd41d2b');
        var iv  = CryptoJS.enc.Utf8.parse('zynga.properties');
        var decrypted = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Latin1.parse(binData) }, key, { keySize: 256/8, iv: iv , mode:CryptoJS.mode.CBC , padding: CryptoJS.pad.Pkcs7});
        console.log(CryptoJS.enc.Latin1.stringify(decrypted));
        var text = decrypted.toString(CryptoJS.enc.Utf8);
        var textList = text.split(",");
        uuid=textList[0];
        udid=textList[1];
        document.getElementById('list').innerHTML = '<ul><li><strong>uuid: </strong>' + uuid + '</li><li><strong>udid: </strong>'+udid+'</li></ul>';

        var http = new XMLHttpRequest();
        var url = "http://zc2.ayakashi.zynga.com/zj_game.json?authentication=none&manager=shared";
        var post_UA = "Mozilla/5.0 ZMTransaction/1.0";
        var post_josn = { 
            "headers": {
                "device_model":"GT-I9100",
                "device_family":"Android",
                "batch_format_version":"1",
                "bundle_version":"1.7.0",
                "device_name":"Android",
                "userKey": uuid,
                "device_type":"4",
                "locale":"en_US",
                "bundle_identifier":"com.zynga.zjayakashi",
                "udid":udid,
                "batch_sequence": 0 ,
                "os_version":"2.3.4"}, 
            "transactions":{
                "0":{
                    "authHash":"3de557906c1b3ea4bdc6cb906ad1fb21",
                    "functionName":"MobileUserController.initUser",
                    "sequence":"0",
                    "params":{
                        "sessionId":null
                    }
                }
            },
            "signedParams":{
                "zySig":"0",
                "zySnid":"0",
                "zySNuid":"0",
                "zyUid":"0"
            }
        }
        var post_data = JSON.stringify(post_josn);
        http.open("POST", url, true);
        http.setRequestHeader("X-User-Key",uuid);
        http.setRequestHeader("X-UDID",udid);
        http.setRequestHeader("X-Has-Persistent-Storage","true");
        http.setRequestHeader("content-type","application/json");
        http.setRequestHeader("User-Agent",post_UA);
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                var response = JSON.parse(http.responseText);
                ZJSESSIONID = response.responses[0].ZJSESSIONID;
                //var url = 'http://zc2.ayakashi.zynga.com/app.php?_c=entry&action=initialize';
                var url = 'http://zc2.ayakashi.zynga.com/app.php?_c=ZJLogin&action=GetCookie&next=Entry.start&ZJSESSIONID=' + ZJSESSIONID;
                var text = document.getElementById('list').innerHTML;
                document.getElementById('list').innerHTML = text + '<ul><li>'+ url +'</li></ul>';
                chrome.tabs.create({url: url});
                
            } else {
                if (http.readyState == 4) {
                    alert(http.responseText);
                }
            }
            
        };
        
        http.send(post_data);
    };
    reader.readAsText(file);
}

document.getElementById('file').addEventListener('change', handleFileSelect, false);

var id_url_pair = [ 
{"id": "mypage", 
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=entry&action=mypage"},
{"id": "quest",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=adventure"},
{"id": "merge",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=merge"},
{"id": "gacha",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=gacha"},
{"id": "battle",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=battle"},
{"id": "parts",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=parts"},
{"id": "monster",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=monster&action=list"},
{"id": "album",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=album"},
{"id": "shop",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=item&action=list&tab=tab-shop-list"},
{"id": "setting",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=settings"},
{"id": "info",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=information"},
{"id": "friend",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=friend"},
{"id": "exchg",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=gacha&action=exchangeList"},
{"id": "box",
    "url": "http://zc2.ayakashi.zynga.com/app.php?_c=webMessageCenter"}
];

function update_tab(){

    var url='';
    for (var i=0, pair; pair = id_url_pair[i];i++) {
        if (pair.id==this.id) {
            url=pair.url;
        }
    }
    chrome.tabs.update({url : url});
}

document.addEventListener('DOMContentLoaded', function () {
    for (var i=0, pair; pair = id_url_pair[i];i++) {
        console.log(pair.id + ':' + pair.url);
        var obj = document.getElementById(pair.id);
        obj.addEventListener('click',update_tab);
    }
});
