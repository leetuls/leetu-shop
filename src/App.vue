<template>
  <component v-bind:is="currentComponent"></component>
</template>

<script setup>
import { onMounted, shallowRef } from "vue";
import { useRoute, useRouter } from 'vue-router';
import Home from './layouts/frontend/Home.vue';
import PageNotFound from './layouts/frontend/PageNotFound.vue';
import Admin from './layouts/admin/Admin.vue';
const currentComponent = shallowRef();
const route = useRoute();
const router = useRouter();
onMounted(async () => {
  await router.isReady()
  if (['/404-page-not-found', '/404-page-not-found/'].includes(route.path)) {
    currentComponent.value = PageNotFound;
  } else if (['/admin', '/admin/'].includes(route.path)) {
    currentComponent.value = Admin;
  } else {
    currentComponent.value = Home;
  }
});
</script>
