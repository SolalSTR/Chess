import React, { Component } from 'react';
import '../../build/pion.min.css';

export default class Pion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
            isDead: false,
            team: this.props.team,
            type: this.props.type,
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
                <i className={"fas fa-chess-"+this.state.type}></i>
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
        let finalCoords = [];
        let pos = this.state.pos;
        let pionsArray = this.plateau.state.pions;
        if (this.state.type == "pawn") {
            finalCoords = this.pawnMoves(pos,pionsArray);
        }
        if (this.state.type == "rook") {
            finalCoords = this.rookMoves(pos,pionsArray);
        }

        this.props.change(finalCoords,this);
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

    // PION MOVES ////////////////

    pawnMoves = (pionPos,pionsArray) => {
        let coords = [];
        let teamMod = (this.state.team == "black") ? -1 : 1;

        if (pionsArray[pionPos.x][pionPos.y+teamMod*1] == "empty") {
            coords.push([pionPos.x,pionPos.y+teamMod*1]);
            if (this.state.isFirstTour && pionsArray[pionPos.x][pionPos.y+teamMod*2] == "empty")
                coords.push([pionPos.x,pionPos.y+teamMod*2]);
        }
        if (this.inRange(pionPos.y+teamMod*1)) {
            if (this.inRange(pionPos.x+1)) {
                let currPion = pionsArray[pionPos.x+1][pionPos.y+teamMod*1];
                if (currPion != "empty") {
                    if (currPion.state.team != this.state.team)
                        coords.push([pionPos.x+1,pionPos.y+teamMod*1]);
                }
            }

            if (this.inRange(pionPos.x-1)) {
                let currPion = pionsArray[pionPos.x-1][pionPos.y+teamMod*1];
                if (currPion != "empty") {
                    if (currPion.state.team != this.state.team)
                        coords.push([pionPos.x-1,pionPos.y+teamMod*1]);
                }
            }
        }
        return coords;
    }

    rookMoves = (pionPos,pionsArray) => {
        let coords = [];






        return coords.concat(
            this.goInLine(8,[1,0],pionPos,pionsArray),
            this.goInLine(8,[-1,0],pionPos,pionsArray),
            this.goInLine(8,[0,1],pionPos,pionsArray),
            this.goInLine(8,[0,-1],pionPos,pionsArray),
        );
    }

    // pions repetitive Move ////

    goInLine = (size,direction,pionPos,pionsArray) => {
        let lineCoords = [];
        for (let i = 1; i < size; i++) {
            let linePos = [pionPos.x+(direction[0]*i),pionPos.y+(direction[1]*i)];
            console.log(lineCoords);
            if (!this.inRange(linePos[0]) || !this.inRange(linePos[1])) return lineCoords;
            console.log(pionsArray[linePos[0]][linePos[1]]);
            if (pionsArray[linePos[0]][linePos[1]] != "empty") {
                console.log(pionsArray[linePos[0]][linePos[1]]);

                if (pionsArray[linePos[0]][linePos[1]].state.team != this.state.team) {
                    console.log("enemy");
                    lineCoords.push(linePos);
                }
                return lineCoords;
            }

            lineCoords.push(linePos);
        }
        return lineCoords;
    }

}
