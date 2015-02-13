$('.button.touch-button').not(".locked").each(function (i, el) {
    setTimeout(function () {
        el.scrollIntoView();
        el.click();
    }, i * 2000);

});
