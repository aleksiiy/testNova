import {createApp} from 'vue';
import App from './App.vue'
import router from './router'

import store from './store'

router.beforeEach((toRoute, fromRoute, next) => {
    // window.document.title = toRoute.meta.title || 'Test';
    const linkIcon =  window.document.getElementById('iconLink');
    if (linkIcon) {
        linkIcon.setAttribute("href", `/${toRoute.meta.ico || 'list.ico'}`)
    }
    next();
});

createApp(App).use(store).use(router).mount('#app')
// createApp(App).use(store, key).use(router).mount('#app')
