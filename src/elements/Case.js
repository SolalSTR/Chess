import React, { Component } from 'react';
import '../build/case.min.css';

export default class Case extends Component {
    constructor(props) {
        super(props);
        this.state = {

            color: this.props.color,
            pion: false,
            pos: {
                x: this.props.x,
                y: this.props.y
            },
            style: {
                background: this.props.color
            },
            glowing: this.props.glowing
        };
        this.plateau = this.props.plateau;
    }

    render() {
        let active = (this.props.glowing) ? "active" : "";
        active += (this.plateau.state.pions[this.state.pos.x][this.state.pos.y] !== "empty") ? "-kill" : "";
        return (
            <div className={"case " + active } onClick={this.moveInside} x={this.state.pos.x} y={this.state.pos.y} style={this.state.style}></div>
        );
    }

    moveInside = () => {
        if (this.plateau.state.choosing.isChoosing && this.props.glowing) {
            let pos = this.state.pos;
            this.props.changeTurn();
            this.plateau.state.choosing.pion.move(pos.x,pos.y);
        }
    }

}
