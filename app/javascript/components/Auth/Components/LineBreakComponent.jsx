import React from "react"

export default class LineBreakComponent extends React.Component {
    render() {
        let lines = this.props.text.split("\n");
        return (
            lines.map((line) => <p key={Math.random()}>{ line }</p>)
        );
        /* 
            Technically it doesn't make sense to use random keys, as there can't be an update then
            But as this component can be used everywhere, it's safer to use random keys
        */
    }
}