<template>
    <a-select v-model:value="value" mode="tags" style="width: 100%" :token-separators="[',']"
        placeholder="Automatic tokenization" :options="tagsData" @change="handleChange"></a-select>
</template>

<script setup>
import { ref, watch, defineProps, onMounted } from 'vue';

const tagsData = ref([]);

const props = defineProps(
    {
        options: Array
    }
);

const value = ref([]);

const handleChange = value => {
    console.log(`selected ${value}`);
};

watch(value, () => {
    console.log('value', value.value);
});

const prepareData = () => {
    props.options.forEach(function (item) {
        let data = item.split('_');
        value.value.push(data[1]);
    });
}

onMounted(() => {
    prepareData();
});

</script>