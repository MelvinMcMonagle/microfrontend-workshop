import 'zone.js';
import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import {hashPrefix, loadApp} from './helper';

async function init() {
    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];

    // The URLs /app1 - /app4 are redirected to different ports by the webpack proxy (webpack.config.js)
    loadingPromises.push(loadApp('navBar', null, '/navBar/singleSpaEntry.js', null, null));
    loadingPromises.push(loadApp('reactApp', null, '/reactApp/singleSpaEntry.js', '/reactApp/store.js', globalEventDistributor));
    loadingPromises.push(loadApp('angularApp', null, '/angularApp/singleSpaEntry.js', '/angularApp/store.js', globalEventDistributor));

    // wait until all stores are loaded and all apps are registered with singleSpa
    await Promise.all(loadingPromises);

    singleSpa.start();
}

init();

