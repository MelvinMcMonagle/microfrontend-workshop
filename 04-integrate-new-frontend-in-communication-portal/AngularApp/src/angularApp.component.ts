import {Component, forwardRef, Inject, NgZone} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState, ListActions} from './store';
import {Globals} from './globals.service';

@Component({
    selector: 'angularApp',
    template: `
        <div class="card">
            <div class="header">
                <h2>Tasklist (Angular)</h2>
            </div>
            <div class="container">
                Open Tasks: <strong>{{list.length - getFinsihedTasksCount()}}</strong> & FINISHED: <strong>{{getFinsihedTasksCount()}}</strong>
                <ng-container *ngFor="let item of list; let i = index">
                    <div *ngIf="!item.completed">
                    <span style="width: 100px">
                    {{item.value}}
                    </span>
                        <span>
                        <button (click)="finishOne(i)">Finished!</button>
                    </span>
                    </div>
                </ng-container>
                <br>
             

            </div>
        </div>
    `,
})
export class angularApp {
    list: any[];
    subscription;

    constructor(
        @Inject(forwardRef(() => NgRedux)) private ngRedux: NgRedux<IAppState>,
        @Inject(forwardRef(() => ListActions)) private actions: ListActions,
        @Inject(forwardRef(() => Globals)) private globals: Globals,
        private zone: NgZone) {
        this.subscription = ngRedux.select<any[]>('elementList')
            .subscribe(value => this.zone.run(() => this.updateList(value)));
    }


    finishOne(elementId) {
        this.globals.globalEventDistributor.dispatch(this.actions.finishItem(elementId));
    }



    updateList(value: any[]) {
        console.log(value);
        this.list = value;
    }

    getFinsihedTasksCount(){
        return this.list.filter(item => item.completed).length;
    }
}
