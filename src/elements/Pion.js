import React, { Component } from 'react';
import '../build/pion.min.css';

export default class Pion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plateau: this.props.plateau,
            color: this.props.color,
            pion: false,
            x: 0,
            y: 0
        };
        let pionSize = 100 / this.state.plateau.size;
        this.style = {background: this.state.color, width: pionSize + "%", height: pionSize + "%"}
    }



    render() {
        return (
            <div className="pion" style={this.style}></div>
        );
    }

}
