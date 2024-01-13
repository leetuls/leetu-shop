<template>
    <div class="category-tab"><!--category-tab-->
        <div class="col-sm-12">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
                <li><a href="#blazers" data-toggle="tab">Blazers</a></li>
                <li><a href="#sunglass" data-toggle="tab">Sunglass</a></li>
                <li><a href="#kids" data-toggle="tab">Kids</a></li>
                <li><a href="#poloshirt" data-toggle="tab">Polo shirt</a></li>
            </ul>
        </div>
        <div class="tab-content">
            <TshirtTabContent />
            <BlazersTabContent />
            <SunglassTabContent />
            <KidsTabContent />
            <PoloshirtTabContent />
        </div>
    </div><!--/category-tab-->
</template>

<script setup>
import TshirtTabContent from './TabContent/TshirtTabContent.vue';
import BlazersTabContent from './TabContent/BlazersTabContent.vue';
import SunglassTabContent from './TabContent/SunglassTabContent.vue';
import KidsTabContent from './TabContent/KidsTabContent.vue';
import PoloshirtTabContent from './TabContent/PoloshirtTabContent.vue';
</script>