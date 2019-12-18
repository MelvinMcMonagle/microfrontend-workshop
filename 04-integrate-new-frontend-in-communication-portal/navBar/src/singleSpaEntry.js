import Vue from 'vue'
import singleSpaVue from 'single-spa-vue';
import App from './App.vue'

Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
    Vue,
    appOptions: {
        el: '#navBar',
        render: h => h(App)
}
});

export const bootstrap = [
    vueLifecycles.bootstrap,
];

export function mount(props) {
    createDomElement();
    return vueLifecycles.mount(props);
}

export const unmount = [
    vueLifecycles.unmount,
];

function createDomElement() {
    
    let el = document.getElementById('navBar');

    if (!el) {
        el = document.createElement('div');
        el.id = 'navBar';
        document.body.appendChild(el);
    }
    return el;
}
