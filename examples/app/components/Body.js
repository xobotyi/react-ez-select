import React from "react";
import Select from "react-ez-select";

export default class Head extends React.Component {
    render() {
        return (
            <div id="AppBody">
                <div className="packageDescription" />

                <h2>Examples</h2>
                <Select
                    options={[
                        {value: 1, label: "Option 1"},
                        {value: 2, label: "Option 2"},
                        {value: 3, label: "Option 3"},
                        {value: 4, label: "Option 4"},
                        {value: 5, label: "Option 5"},
                        {value: 6, label: "Option 6"},
                    ]}
                />
            </div>
        );
    }
}
