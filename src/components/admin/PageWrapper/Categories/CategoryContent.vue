<template>
    <a-button class="editable-add-btn" @click="showModal" style="margin-bottom: 8px">Thêm</a-button>
    <a-modal :width="800" v-model:open="open" title="Thêm danh mục" :confirm-loading="confirmLoading" @ok="handleOk">
        <CategoryForm ref="categoryRef" />
    </a-modal>
    <a-table :columns="columns" :data-source="dataSource" bordered :pagination="{ pageSize: 7 }">
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
            <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
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
                        <a @click="cancel(record.key)">
                            <a>Cancel</a>
                        </a>
                    </span>
                    <span v-else>
                        <a @click="edit(record.key)">Edit</a>
                        <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
                            <a>Delete</a>
                        </a-popconfirm>
                    </span>
                </div>
            </template>
        </template>
    </a-table>
</template>

<script setup>
import { cloneDeep } from 'lodash-es';
import { reactive, ref, onMounted, computed } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import CategoryForm from './CategoryForm.vue';

const columns = [
    {
        title: 'Tên Danh mục',
        dataIndex: 'name',
        width: '25%',
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
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        customFilterDropdown: true,
        onFilter: (value, record) => record.age.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: visible => {
            if (visible) {
                setTimeout(() => {
                    searchInput.value.focus();
                }, 100);
            }
        },
        sorter: (a, b) => a.age - b.age > 0,
        sortDirections: ['descend', 'ascend'],
    },
    {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
    },
    {
        title: 'operation',
        dataIndex: 'operation',
    },
];
const data = [];
for (let i = 0; i < 5; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
const dataSource = ref(data);
const editableData = reactive({});
const edit = key => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const save = key => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];
};
const cancel = key => {
    delete editableData[key];
};

const onDelete = key => {
    dataSource.value = dataSource.value.filter(item => item.key !== key);
};

// Search
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

// Check if the pressed button is the ESC key.
const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
        for (let key in editableData) {
            editableData[key] = null;
        }
    }
}

// Add new data
const count = computed(() => dataSource.value.length + 1);
const handleAdd = () => {
    const newData = {
        key: `${count.value}`,
        name: `Edward King ${count.value}`,
        age: 32,
        address: `London, Park Lane no. ${count.value}`,
    };
    dataSource.value.push(newData);
};

// show modal
const modalText = ref('Content of the modal');
const open = ref(false);
const confirmLoading = ref(false);
const showModal = () => {
    open.value = true;
};

const categoryRef = ref(null);

const handleOk = () => {
    categoryRef.value.onSubmit();
    modalText.value = 'The modal will be closed after two seconds';
    confirmLoading.value = true;
    setTimeout(() => {
        open.value = false;
        confirmLoading.value = false;
        handleAdd();
    }, 1200);
}

onMounted(() => {
    document.addEventListener('keydown', handleKeyDown);
});
</script>
  
<style scoped>
.editable-row-operations a {
    margin-right: 8px;
}
</style>