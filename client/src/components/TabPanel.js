import React from "react";

export default class TabPanel extends React.Component {
    constructor(props) {
        super(props)

        this.isToRender = this.isToRender.bind(this);
    }

    isToRender() {
        return (typeof this.props.index != 'undefined' && this.props.index === this.props.value)
    }

    render() {
        return (
            <div>
                <br />
                {this.isToRender() && this.props.children}
            </div>

        )
    }
}