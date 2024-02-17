<template>
    <TheHeader />
    <router-view></router-view>
    <TheFooter />
</template>

<script>
import { defineComponent, onBeforeMount } from "vue";
import TheHeader from "@/components/frontend/Common/TheHeader.vue";
import TheFooter from "@/components/frontend/Common/TheFooter.vue";

export default defineComponent({
    components: { TheHeader, TheFooter },
    setup() {
        // dynamic data
        const dynamicCssPath = [
            '/src/assets/frontend/css/bootstrap.min.css',
            '/src/assets/frontend/css/font-awesome.min.css',
            '/src/assets/frontend/css/prettyPhoto.css',
            '/src/assets/frontend/css/price-range.css',
            '/src/assets/frontend/css/animate.css',
            '/src/assets/frontend/css/main.css',
            '/src/assets/frontend/css/responsive.css',
        ];

        const shortcutIcon = '/src/assets/frontend/images/ico/favicon.ico';

        const appleTouchIcon144 = '/src/assets/frontend/images/ico/apple-touch-icon-144-precomposed.png';

        const appleTouchIcon114 = '/src/assets/frontend/images/ico/apple-touch-icon-114-precomposed.png';

        const appleTouchIcon72 = '/src/assets/frontend/images/ico/apple-touch-icon-72-precomposed.png';

        const appleTouchIcon = '/src/assets/frontend/images/ico/apple-touch-icon-57-precomposed.png';

        const scriptTag = [
            '/src/assets/frontend/js/jquery.js',
            '/src/assets/frontend/js/price-range.js',
            '/src/assets/frontend/js/jquery.scrollUp.min.js',
            '/src/assets/frontend/js/bootstrap.min.js',
            '/src/assets/frontend/js/jquery.prettyPhoto.js',
            '/src/assets/frontend/js/main.js'
        ];

        // add dynamic css to head
        const addDynamicCssToHead = () => {
            for (let path of dynamicCssPath) {
                let linkElement = document.createElement('link');
                linkElement.setAttribute('rel', 'stylesheet');
                linkElement.setAttribute('href', path);

                // Append the <link> element to the head of the document
                document.head.appendChild(linkElement);
            }

            let linkElement = document.createElement('link');
            linkElement.setAttribute('rel', 'shortcut icon');
            linkElement.setAttribute('href', shortcutIcon);
            document.head.appendChild(linkElement);

            let linkElement1 = document.createElement('link');
            linkElement1.setAttribute('rel', 'apple-touch-icon-precomposed');
            linkElement1.setAttribute('sizes', '144x144');
            linkElement1.setAttribute('href', appleTouchIcon144);
            document.head.appendChild(linkElement1);

            let linkElement2 = document.createElement('link');
            linkElement2.setAttribute('rel', 'apple-touch-icon-precomposed');
            linkElement2.setAttribute('sizes', '114x114');
            linkElement2.setAttribute('href', appleTouchIcon114);
            document.head.appendChild(linkElement2);

            let linkElement3 = document.createElement('link');
            linkElement3.setAttribute('rel', 'apple-touch-icon-precomposed');
            linkElement3.setAttribute('sizes', '72x72');
            linkElement3.setAttribute('href', appleTouchIcon72);
            document.head.appendChild(linkElement3);

            let linkElement4 = document.createElement('link');
            linkElement4.setAttribute('rel', 'apple-touch-icon-precomposed');
            linkElement4.setAttribute('href', appleTouchIcon);
            document.head.appendChild(linkElement4);

            for (let path of scriptTag) {
                let linkElement = document.createElement('script');
                linkElement.setAttribute('src', path);

                // Append the <link> element to the head of the document
                document.body.appendChild(linkElement);
            }
        };

        onBeforeMount(() => {
            addDynamicCssToHead();
        });

        return {};
    },
})
</script>