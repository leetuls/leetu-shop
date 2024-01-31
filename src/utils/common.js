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
    },
    removeColorAllMenu: () => {
        $('#ul-menu').children('li').find('a:gt(0)').css('color', '#fff');
    },
    removeTag: () => {
        $('link:not(.icon)').remove();
        $('script').remove();
    },
    isDescendantOf: (parentValue, targetValue, data) => {
        const stack = [...data];

        while (stack.length > 0) {
            const currentItem = stack.pop();

            // Nếu current item có giá trị bằng với targetValue và là con của parentValue
            if (currentItem.value === targetValue && currentItem.children) {
                const descendants = Common.getAllDescendants(currentItem.children);
                return descendants.some(descendant => descendant.value === parentValue);
            }

            // Nếu current item có children, thêm children vào stack
            if (currentItem.children && currentItem.children.length > 0) {
                stack.push(...currentItem.children);
            }
        }

        // Nếu không tìm thấy
        return false;
    },
    getAllDescendants: (children) => {
        const descendants = [];

        for (const child of children) {
            descendants.push(child);
            if (child.children) {
                descendants.push(...Common.getAllDescendants(child.children));
            }
        }

        return descendants;
    }
}