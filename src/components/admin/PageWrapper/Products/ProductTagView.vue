<template>
    <div>
        <a-tag v-for="item in tagsData" :key="item.tag_id"><a href="#">{{ item.tag_name }}</a></a-tag>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';

const props = defineProps(
    {
        options: Array
    }
);

const tagsData = ref([]);

const prepareData = () => {
    props.options.forEach(function (item) {
        let data = item.split('_');
        tagsData.value.push(
            {
                'tag_id': data[0],
                'tag_name': data[1]
            }
        );
    });
}

onMounted(() => {
    prepareData();
});
</script>