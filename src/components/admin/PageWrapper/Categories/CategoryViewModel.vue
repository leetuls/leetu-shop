<template>
    <a-select show-search placeholder="Select a category" style="width: 100%;" :options="options"
        :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange"></a-select>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps(
    {
        'options': Array
    }
);

const handleChange = value => {
    // console.log(`selected ${value}`);
};
const handleBlur = () => {
    // console.log('blur');
};
const handleFocus = () => {
    // console.log('focus');
};
const filterOption = (input, option) => {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>