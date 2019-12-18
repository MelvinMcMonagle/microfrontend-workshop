import * as singleSpa from 'single-spa'; 

export function hashPrefix(prefix) {
    return function (location) {
        return location.hash.startsWith(`#${prefix}`);
    }
}

export async function loadApp(name, hash, appURL, storeURL, globalEventDistributor) {
    let storeModule = {}, customProps = {globalEventDistributor: globalEventDistributor};

    try {
        storeModule = storeURL ? await SystemJS.import(storeURL) : {storeInstance: null};
    } catch (e) {
        console.log(`Could not load store of app ${name}.`, e);
    }

    if (storeModule.storeInstance && globalEventDistributor) {
       
        customProps.store = storeModule.storeInstance;

        
        globalEventDistributor.registerStore(storeModule.storeInstance);
    }

    
    singleSpa.registerApplication(name, () => SystemJS.import(appURL), hash ? hashPrefix(hash): () => true, customProps);
}
