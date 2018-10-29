import PropTypes from "prop-types";
import React from "react";
import {DropdownContent} from "react-ez-dropdown";

export default class Select extends React.Component {
    static propTypes = {
        variants: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.any.isRequired,
                label: PropTypes.any.isRequired,
            })
        ),
        placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),

        onChange: PropTypes.func,
        onOpen: PropTypes.func,
    };

    render() {
        return (
            <div className="EzSelect">
                <div className="EzSelect-placeholder">
                    <div className="EzSelect-arrow" />
                </div>
                <DropdownContent className="EzSelect-dropdown" />
            </div>
        );
    }
}
