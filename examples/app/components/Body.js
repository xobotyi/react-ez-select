import React from "react";
import Select from "react-ez-select";

export default class Head extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: [
                {value: 0, label: "Select an option"},
                {value: 1, label: "Option 1"},
                {value: 2, label: "Option 2"},
                {value: 3, label: "Option 3"},
                {value: 4, label: "Option 4"},
                {value: 5, label: "Option 5"},
                {value: 6, label: "Option 6"},
            ],
        };

        setTimeout(() => {
            this.setState({
                options: [
                    {value: 0, label: "Select an option", disabled: true},
                    {value: 1, label: "Option 1"},
                    {value: 2, label: "Option 2", selected: true},
                    {value: 3, label: "Option 3"},
                    {value: 4, label: "Option 4"},
                    {value: 5, label: "Option 5"},
                    {value: 6, label: "Option 6"},
                ],
            });
        }, 3000);
    }

    render() {
        return (
            <div id="AppBody">
                <div className="packageDescription" />

                <h2>Examples</h2>
                <Select options={this.state.options} />
            </div>
        );
    }
}
