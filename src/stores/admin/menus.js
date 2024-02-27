import Api from '@/apis/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const menuData = defineStore(
    'menus',
    {
        state: () => ({ data: ref(null) }),
        actions: {
            async getMenus(token) {
                Api.defaults.headers.Authorization = 'Bearer ' + token;
                await Api.get('menu')
                    .then(response => {
                        this.data = {
                            'error': false,
                            'status': 200,
                            'menus': response.data.menus,
                            'menu_model': response.data.menu_model,
                            'menu_combine': response.data.menu_combine
                        };
                    })
                    .catch(error => {
                        console.log(error);
                        this.data = {
                            'error': true,
                            'message': error.response.data.message
                        };
                    })
            },
            async deleteMenu(token, payload) {
                Api.defaults.headers.Authorization = 'Bearer ' + token;
                await Api.post('menu/destroy', payload)
                    .then(response => {
                        this.data = {
                            'error': false,
                            'menus_options': response.data.menus_options,
                            'message': response.data.message
                        };
                    })
                    .catch(error => {
                        console.log(error);
                        this.data = {
                            'error': true,
                            'message': error.response.data.message
                        };
                    })
            }
        }
    }
);