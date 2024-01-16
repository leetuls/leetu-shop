<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please Sign In</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form">
                            <fieldset>
                                <div class="form-group">
                                    <input class="form-control" placeholder="E-mail" name="email" type="email" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" placeholder="Password" name="password" type="password"
                                        value="">
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="Remember Me">Remember Me
                                    </label>
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <a href="/admin" class="btn btn-lg btn-success btn-block" @click="login">Login
                                </a>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Common } from '@/utils/common.js';

const addDynamicCssToHead = () => {
    let dynamicCssPath = [
        '/src/assets/admin/css/bootstrap.min.css',
        '/src/assets/admin/css/startmin.css'
    ];

    let fontAwesome = '/src/assets/admin/css/font-awesome.min.css';

    let scriptTag = [
        '/src/assets/admin/js/jquery.min.js',
        '/src/assets/admin/js/bootstrap.min.js'
    ];
    for (let path of dynamicCssPath) {
        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', path);

        // Append the <link> element to the head of the document
        document.head.appendChild(linkElement);
    }
    let linkElement1 = document.createElement('link');
    linkElement1.setAttribute('rel', 'stylesheet');
    linkElement1.setAttribute('type', 'text/css');
    linkElement1.setAttribute('href', fontAwesome);

    // Append the <link> element to the head of the document
    document.head.appendChild(linkElement1);

    for (let path of scriptTag) {
        let linkElement = document.createElement('script');
        linkElement.setAttribute('src', path);

        // Append the <link> element to the head of the document
        document.body.appendChild(linkElement);
    }
}

const login = () => {
    window.sessionStorage.setItem('login_id', 'test_1');
}
onMounted(() => {
    Common.removeTag();
    addDynamicCssToHead();
});
</script>