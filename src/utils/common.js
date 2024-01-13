const COLOR_CLICK = "color:#fdb45e; background: none;";
export const Common = {
    changeColorById: (elementId) => {
        document.getElementById(elementId).setAttribute('style', COLOR_CLICK);
    },
    changeColorClick(text) {
        $('#ul-menu').children('li').find('ul').find('a').each(function () {
            if ($(this)[0].text === text) {
                $(this).css('color', '#fdb45e');
            }
        });
    },
    removeMenuColor: () => {
        $('#ul-menu').children('li').each(function () {
            $(this).children('a:first').css('color', '#696763');
        });
        $('.shop-menu').find('ul').children('li').find('a').css('color', '#696763');
    }
}