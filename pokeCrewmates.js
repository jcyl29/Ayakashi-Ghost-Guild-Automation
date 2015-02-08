$('.button.touch-button').not(".locked").each(function (i, el) {
    setTimeout(function () {
        el.click();
    }, i * 2000);

});
