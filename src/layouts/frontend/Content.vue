<template>
    <TheSlider />
    <section>
        <div class="container">
            <div class="row">
                <TheSidebar />
                <div class="col-sm-9 padding-right">
                    <FeaturesItems />
                    <CategoryTab />
                    <RecommendedItems />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import TheSlider from '@/components/frontend/TheSlider.vue';
import TheSidebar from '@/components/frontend/TheSidebar.vue';
import FeaturesItems from '@/components/frontend/FeaturesItems.vue';
import CategoryTab from '@/components/frontend/CategoryTab.vue';
import RecommendedItems from '@/components/frontend/RecommendedItems.vue';
</script>