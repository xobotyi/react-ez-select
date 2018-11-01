import React from "react";
import Select from "react-ez-select";

export default class Head extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [
                {value: 0, label: "Select an option", disabled: true, selected: true},
                {value: 1, label: "Option 1"},
                {value: 2, label: "Option 2"},
                {value: 3, label: "Option 3"},
                {value: 4, label: "Option 4"},
                {value: 5, label: "Option 5"},
                {value: 6, label: "Option 6"},
                {value: 7, label: "Option 7"},
                {value: 8, label: "Option 8"},
                {value: 9, label: "Option 9"},
                {value: 10, label: "Option 10"},
                {value: 11, label: "Option 11"},
                {value: 12, label: "Option 12"},
            ],
            value: 12,
        };

        setTimeout(() => {
            this.setState({value: 0});
        }, 1000);
    }

    render() {
        return (
            <div id="AppBody">
                <div className="packageDescription" />

                <h2>Examples</h2>
                <Select options={this.state.options} style={{margin: "2rem 0 0 2rem"}} value={this.state.value} />
            </div>
        );
    }
}
