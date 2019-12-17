import {Inject, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { angularApp} from './angularApp.component';
import {enableProdMode} from '@angular/core';
import {APP_BASE_HREF} from "@angular/common";
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState, ListActions } from './store';
import { Globals } from "./globals.service";



enableProdMode();

@NgModule({
	imports: [
		BrowserModule,
		NgReduxModule
	],
	providers: [{provide: APP_BASE_HREF, useValue: '/'}, ListActions, Globals],
	declarations: [
		angularApp
	],
	bootstrap: [angularApp]
})
export class MainModule {
    constructor(private ngRedux: NgRedux<IAppState>,
                private globals:Globals,
                @Inject('localStoreRef') private localStoreRef: any,
                @Inject('globalEventDispatcherRef') private globalEventDispatcherRef: any) {

        this.ngRedux.provideStore(localStoreRef);
        this.globals.globalEventDistributor = globalEventDispatcherRef;
    }
}
