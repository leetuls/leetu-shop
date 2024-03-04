<template>
    <div class="clearfix">
        <a-upload v-model:file-list="fileList" list-type="picture-card" @preview="handlePreview"
            :beforeUpload="(file) => beforeUpload(file)">
            <div v-if="fileList.length < 1">
                <plus-outlined />
                <div style="margin-top: 8px">Upload</div>
            </div>
        </a-upload>
        <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
    </div>
</template>

<script setup>
import { ref, defineExpose, defineProps } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';

const fileObj = ref();

const props = defineProps(
    {
        name: String,
        image: String
    }
);

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const fileList = ref([
    {
        uid: '-1',
        name: props.name,
        status: 'done',
        url: props.image,
    }
]);
const handleCancel = () => {
    previewVisible.value = false;
    previewTitle.value = '';
};
const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
    previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

const beforeUpload = file => {
    fileObj.value = file;
    functions.handle_local_before_file_upload(file);
}

defineExpose({ fileList, fileObj, getBase64 });
</script>

<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}
</style>