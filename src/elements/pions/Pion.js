import React, { Component } from 'react';
import '../../build/pion.min.css';

export default class Pion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
            isDead: false,
            team: this.props.team,
            pos: {
                x: this.props.x,
                y: this.props.y
            },
            isFirstTour: true
        };
        this.plateau = this.props.plateau;
        this.pionSize = 100 / this.plateau.state.size;
        this.props.getThis(this);
    }



    render() {
        let isDead = (this.state.isDead) ? "dead " : "";
        return (
            <div className={"pion " + isDead} onClick={this.showCase} style={{top: this.state.pos.y*this.pionSize+"%", left: this.state.pos.x*this.pionSize+"%", background: this.state.color, width: this.pionSize + "%", height: this.pionSize + "%"}}>
                <i className="fas fa-chess-pawn"></i>
            </div>
        );

    }

    move = (x,y) => {
        let pos = this.state.pos;
        this.props.changePions(this,[pos.x,pos.y],[x,y]);
        this.setState({
            pos: {
                x: x,
                y: y
            },
            isFirstTour: false
        })
    }

    showCase = (e) => {
        e.stopPropagation();
        if (this.state.team == "black") {
            let finalCoords = [];
            let pos = this.state.pos;
            let pionsArray = this.plateau.state.pions;


            if (pionsArray[pos.x][pos.y-1] == "empty") {
                finalCoords.push([pos.x,pos.y-1]);
                if (this.state.isFirstTour && pionsArray[pos.x][pos.y-2] == "empty")
                    finalCoords.push([pos.x,pos.y-2]);
            }
            if (this.inRange(pos.y-1)) {
                if (this.inRange(pos.x+1)) {
                    let currPion = pionsArray[pos.x+1][pos.y-1];
                    if (currPion != "empty") {
                        if (currPion.state.team != this.state.team)
                            finalCoords.push([pos.x+1,pos.y-1]);
                    }
                }

                if (this.inRange(pos.x-1)) {
                    let currPion = pionsArray[pos.x-1][pos.y-1];
                    if (currPion != "empty") {
                        if (currPion.state.team != this.state.team)
                            finalCoords.push([pos.x-1,pos.y-1]);
                    }
                }
            }



            this.props.change(finalCoords,this);
        }
    }

    die = () => {
        this.setState({isDead: true})
    }


    inRange(num) {
        if (num < this.plateau.state.size && num >= 0) {
            return true;
        } else {
            return false
        }
    }

}
