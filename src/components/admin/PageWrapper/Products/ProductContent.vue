<template>
    <a-button style="margin-bottom: 8px">Thêm</a-button>
    <a-table :columns="columns" :data-source="dataSource" bordered :loading="isLoading">
        <!-- Search -->
        <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
            <div style="padding: 8px">
                <a-input ref="searchInput" :placeholder="`Search ${column.dataIndex}`" :value="selectedKeys[0]"
                    style="width: 188px; margin-bottom: 8px; display: block"
                    @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                    @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
                <a-button type="primary" size="small" style="width: 90px; margin-right: 8px"
                    @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
                    <template #icon>
                        <SearchOutlined />
                    </template>
                    Search
                </a-button>
                <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
                    Reset
                </a-button>
            </div>
        </template>

        <template #customFilterIcon="{ filtered }">
            <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
        </template>
        <!-- End Search -->

        <template #bodyCell="{ column, text, record }">
            <template v-if="['product_id', 'name', 'price', 'content', 'category_name'].includes(column.dataIndex)">
                <div>
                    <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
                        @keyup.enter="save(record.key)" style="margin: -5px 0" />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>

            <template v-else-if="column.dataIndex === 'operation'">
                <div class="editable-row-operations">
                    <span v-if="editableData[record.key]">
                        <a-popconfirm @confirm="save(record.key)" title="Sure to edit?"><a>Save</a></a-popconfirm>
                        <span>&nbsp;</span>
                        <a @click="cancel(record.key)">
                            <a>Cancel</a>
                        </a>
                    </span>
                    <span v-else>
                        <span>&nbsp;</span>
                        <a @click="edit(record.key)">Edit</a>
                        <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
                            <a>Delete</a>
                        </a-popconfirm>
                    </span>
                </div>
            </template>

            <template v-if="column.dataIndex === 'feature_image'">
                <div>
                    <ImagePreview :image="record.feature_image" :name="record.name" ref="imageChildrent" />
                </div>
            </template>
        </template>
    </a-table>
</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import { reactive, ref, onMounted } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import ImagePreview from './ImagePreview.vue';
import { productData } from '@/stores/admin/products';
import UserData from '@/utils/session-data.js';

const imageChildrent = ref(null);
const store = productData();

// fetch Data to Grid
const isLoading = ref(false);
const fetchData = async () => {
    await store.getProducts(UserData.token);
    if (!store.data.error) {
        dataSource.value = store.data.products;
    }
}
// End fetch Data to Grid

const columns = [
    {
        title: 'Mã sản phẩm',
        dataIndex: 'product_id',
        width: '10%',
        customFilterDropdown: true,
        onFilter: (value, record) => record.product_id.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => {
                    searchInput.value.focus();
                }, 100);
            }
        },
        sorter: (a, b) => a.product_id.localeCompare(b.product_id),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Tên sản phẩm',
        dataIndex: 'name',
        width: '15%',
        customFilterDropdown: true,
        onFilter: (value, record) => record.name.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => {
                    searchInput.value.focus();
                }, 100);
            }
        },
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Giá sản phẩm',
        dataIndex: 'price',
        width: '10%',
        sorter: (a, b) => parseInt(a.price) - parseInt(b.price),
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'Mô tả sản phẩm',
        dataIndex: 'content',
        width: '30%',
    },
    {
        title: 'Danh mục',
        dataIndex: 'category_name',
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'feature_image',
        width: '10%'
    },
    {
        title: 'Thao tác',
        dataIndex: 'operation',
    },
];

// Inline Edit
const dataSource = ref([]);
const editableData = reactive({});

const edit = key => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = async key => {
    let fileObject = imageChildrent.value.fileObj;

    if (fileObject) {
        let base64 = await imageChildrent.value.getBase64(fileObject);

        await store.createMenu(UserData.token, { 'file': base64 });
    }

    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];
};
// End Inline edit

const cancel = key => {
    delete editableData[key];
};

const onDelete = key => {
    dataSource.value = dataSource.value.filter(item => item.key !== key);
};

// search
const state = reactive({
    searchText: '',
    searchedColumn: '',
});
const searchInput = ref();
const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    state.searchText = selectedKeys[0];
    state.searchedColumn = dataIndex;
};
const handleReset = clearFilters => {
    clearFilters({
        confirm: true,
    });
    state.searchText = '';
};
// end search

const handleKeyDown = (event) => {
    // Kiểm tra xem nút được nhấn có phải là ESC không
    if (event.key === 'Escape') {
        for (let key in editableData) {
            editableData[key] = null;
        }
    }
}

onMounted(async () => {
    isLoading.value = true;
    await fetchData();
    isLoading.value = false;
    document.addEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.editable-row-operations a {
    margin-right: 8px;
}
</style>