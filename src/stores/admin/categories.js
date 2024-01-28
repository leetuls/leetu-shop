import Api from '@/apis/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const categoryData = defineStore('categories',
    {
        state: () => ({ data: ref(null) }),
        actions: {
            async getAllCategories(token) {
                Api.defaults.headers.Authorization = 'Bearer ' + token;
                await Api.get('category')
                    .then(response => {
                        this.data = {
                            'error': false,
                            'status': 200,
                            'categories': response.data.categories,
                            'category_model': response.data.category_model,
                            'category_combine': response.data.category_combine
                        };
                    })
                    .catch(error => {
                        console.log(error);
                        this.data = {
                            'error': true
                        };
                    })
            },
            async getViewModel(token) {
                Api.defaults.headers.Authorization = 'Bearer ' + token;
                await Api.get('category/view/model')
                    .then(response => {
                        this.data = {
                            'error': false,
                            'status': 200,
                            'category_model': response.data.category_model,
                            'category_combine': response.data.category_combine
                        };
                    })
                    .catch(error => {
                        console.log(error);
                        this.data = {
                            'error': true
                        };
                    })
            }
        }
    });