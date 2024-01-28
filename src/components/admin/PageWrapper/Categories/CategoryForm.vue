<template>
    <div>
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="Tên danh mục" v-bind="validateInfos.name">
                <a-input v-model:value="modelRef.name" />
            </a-form-item>
            <a-form-item label="Danh mục cha" v-bind="validateInfos.region">
                <CategoryViewModel :options="options"/>
            </a-form-item>
            <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
        </a-form>
    </div>
</template>

<script setup>
import { reactive, toRaw, defineExpose, defineProps } from 'vue';
import { Form } from 'ant-design-vue';
import CategoryViewModel from './CategoryViewModel.vue';

const useForm = Form.useForm;

const props = defineProps(
    {
        'options': Array
    }
);

const labelCol = {
    span: 4,
};
const wrapperCol = {
    span: 14,
};
const modelRef = reactive({
    name: '',
    region: undefined
});
const rulesRef = reactive({
    name: [
        {
            required: true,
            message: 'Please input name',
        },
    ],
    region: [
        {
            required: true,
            message: 'Please select region',
        },
    ]
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef, {
    onValidate: (...args) => console.log(...args),
});
const onSubmit = () => {
    validate()
        .then(() => {
            console.log(toRaw(modelRef));
        })
        .catch(err => {
            console.log('error', err);
        });
};

defineExpose({
    onSubmit
});
</script>