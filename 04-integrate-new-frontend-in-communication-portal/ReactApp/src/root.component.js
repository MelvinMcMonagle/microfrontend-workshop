import React from 'react';
import {Provider} from 'react-redux';
import ElementInput from './element-input';


export default class Root extends React.Component {

    state = {
        store: this.props.store,
        globalEventDistributor: this.props.globalEventDistributor,
        elementList: []
    };

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {

        let ret = <div>

        </div>;

        if (this.state.store && this.state.globalEventDistributor) {
            this.state.store.subscribe(value => {
                this.setState({...this.state, elementList: this.state.store.getState().elementList.filter(item => !item.completed)});
            });

            ret =
                <Provider store={this.state.store}>
                    <div className="card">
                        <div className="header">
                            <h2>Create a task (React)</h2>
                        </div>
                        <div className="container">
                            <br/>
                            Number of tasks:  <strong>{this.state.elementList.length}</strong>

                            <ElementInput globalEventDistributor={this.state.globalEventDistributor}/>
                        </div>
                    </div>

                </Provider>;
        }

        return ret;
    }

    getFinsihedTasksCount(){
        return this.state.elementList.filter(item => item.completed).length;
    }
}
