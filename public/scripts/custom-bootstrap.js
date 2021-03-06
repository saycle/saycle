﻿function dropdownToggle(e) {
    $(e).parent().toggleClass("open");
    $(".dropdown-toggle-custom").each(function() {
        if (!$(this).is(e)) {
            $(this).parent().removeClass("open");
        }
    });
}

$(document).on('click', function (e) {
    if (!$(".dropdown-menu-custom").is(e.target)
            && $(".dropdown-menu-custom").has(e.target).length === 0
            && $(".open").has(e.target).length === 0
    ) {
        $(".dropdown-toggle-custom").parent().removeClass("open");
    }
    if ($(e.target).data("closeaction") || (!$("#navigation").is(e.target)
            && $("#navigation").has(e.target).length === 0
            && $(".in").has(e.target).length === 0
)) {
        hideNavigation();
    }
});

$('.btn-toggle').click(function () {
    $(this).find('.btn').toggleClass('active');
});

function htmlKeypress(e, func) {
    if (e.keyCode == 2 && e.ctrlKey) {
        $("#easteregg-ctrlb").modal();
    }
}

function hideNavigation() {
    $("#navigation").removeClass("in");
}

function openNavigation() {
    $("#navigation").addClass("in");
}

function openLogin() {
    openNavigation();
    $("#login").parent().addClass("open");
}