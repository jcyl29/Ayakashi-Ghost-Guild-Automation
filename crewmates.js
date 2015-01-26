$('.button.touch-button.mini').not(".locked").each(function (i, el) {
    setTimeout(function () {
        el.click();
    }, i * 2000);

});

$('button').filter(function (a, b) {
    return b.textContent.trim() == "Crewmate Request";
}).each(function (i, el) {
    setTimeout(function () {
        el.click();
    }, i * 1000);
});