import React, { Component } from 'react';
import '../build/case.min.css';

export default class Case extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plateau: this.props.plateau,
            color: this.props.color,
            pion: false
        };
    }

    render() {
        return (
            <div className="case" x={this.props.x} y={this.props.y} style={{background: this.state.color}}></div>
        );
    }

}
