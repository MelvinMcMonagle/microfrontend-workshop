import 'zone.js';
import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor'
import {hashPrefix, loadApp} from './helper';

async function init() {
    const globalEventDistributor = new GlobalEventDistributor();
    const loadingPromises = [];
    
    loadingPromises.push(loadApp('navBar', null, '/navBar/singleSpaEntry.js', null, null));
    loadingPromises.push(loadApp('reactApp', null, '/reactApp/singleSpaEntry.js', '/reactApp/store.js', globalEventDistributor));
    loadingPromises.push(loadApp('angularApp', null, '/angularApp/singleSpaEntry.js', '/angularApp/store.js', globalEventDistributor));

    await Promise.all(loadingPromises);

    singleSpa.start();
}

init();

