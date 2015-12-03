function dropdownToggle(e) {
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
});
