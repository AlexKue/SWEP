import React from "react"

export default class LineBreakComponent extends React.Component {
    render() {
        let lines = this.props.text.split("\n");
        return (
            lines.map((line) => <p>{ line }</p>)
        );
    }
}