import React from 'react';
import { connect } from 'react-redux';

class ElementInput extends React.Component {

    payload = "";

    handleChange(event) {
        if(event && event.target){
            this.payload = event.target.value;
        }
    }

    addItem = (event) => {
        event.preventDefault();
        this.props.globalEventDistributor.dispatch({ type: 'ADD_ITEM', payload: this.payload });
    };

    render() {
        return (
            <div>
                <br />
                <div>
                    <form onSubmit={this.addItem}>
                        <label>
                            Create a new task:
                            <br/>
                            <br/>
                            <input type="text" onChange={this.handleChange.bind(this)} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.count
    };
}

export default connect(mapStateToProps)(ElementInput);