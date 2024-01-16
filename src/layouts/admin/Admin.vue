<template>
    <div id="wrapper">
        <TheHeader />
        <TheSidebar />
        <div id="page-wrapper">
            <router-view></router-view>
        </div>
    </div>
    <!-- /#wrapper -->
</template>

<script setup>
import { onMounted } from "vue";
import TheHeader from '@/components/admin/Common/TheHeader.vue';
import TheSidebar from '@/components/admin/Common/TheSidebar.vue';
import { Common } from '@/utils/common.js';

const addDynamicCssToHead = () => {
    let dynamicCssPath = [
        '/src/assets/admin/css/bootstrap.min.css',
        '/src/assets/admin/css/startmin.css'
    ];

    let fontAwesome = '/src/assets/admin/css/font-awesome.min.css';

    let scriptTag = [
        '/src/assets/admin/js/jquery.min.js',
        '/src/assets/admin/js/bootstrap.min.js'
    ];
    for (let path of dynamicCssPath) {
        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', path);

        // Append the <link> element to the head of the document
        document.head.appendChild(linkElement);
    }
    let linkElement1 = document.createElement('link');
    linkElement1.setAttribute('rel', 'stylesheet');
    linkElement1.setAttribute('type', 'text/css');
    linkElement1.setAttribute('href', fontAwesome);

    // Append the <link> element to the head of the document
    document.head.appendChild(linkElement1);

    for (let path of scriptTag) {
        let linkElement = document.createElement('script');
        linkElement.setAttribute('src', path);

        // Append the <link> element to the head of the document
        document.body.appendChild(linkElement);
    }
}
onMounted(() => {
    Common.removeTag();
    addDynamicCssToHead();
    document.title = "Shop Admin";
});
</script>

<style scoped>
#page-wrapper {
    min-height: 700px;
}
</style>