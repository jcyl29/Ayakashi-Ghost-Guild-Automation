$('.button.touch-button.mini').each(function (i, el) {
    setTimeout(function () {
        el.click();
    }, i * 5000);
});