<template>
    <div>
        <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-item label="Category name" v-bind="validateInfos.name">
                <a-input v-model:value="modelRef.name" />
            </a-form-item>
            <a-form-item label="Parent category" v-bind="validateInfos.region">
                <a-select v-model:value="modelRef.region" placeholder="please select your zone">
                    <a-select-option value="shanghai">Zone one</a-select-option>
                    <a-select-option value="beijing">Zone two</a-select-option>
                </a-select>
            </a-form-item>
            <a-button style="margin-left: 10px" @click="resetFields">Reset</a-button>
        </a-form>
    </div>
</template>

<script setup>
import { reactive, toRaw, defineExpose } from 'vue';
import { Form } from 'ant-design-vue';
const useForm = Form.useForm;
const labelCol = {
    span: 4,
};
const wrapperCol = {
    span: 14,
};
const modelRef = reactive({
    name: '',
    region: undefined,
    type: [],
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
    ],
    type: [
        {
            required: true,
            message: 'Please select type',
            type: 'array',
        },
    ],
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