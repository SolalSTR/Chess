import React, { Component } from 'react';
import '../build/pion.min.css';

export default class Pion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: this.props.colors,
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
        let colors = this.props.colors;
        let style = {
            color: colors.borderColor,
            borderColor: colors.borderColor,
            background: colors.color,

            top: this.state.pos.y*this.pionSize+"%",
            left: this.state.pos.x*this.pionSize+"%",

            width: this.pionSize + "%",
            height: this.pionSize + "%",
            transform: "rotate(" + -this.props.rotation + "deg)"
        }
        return (
            <div className={"pion " + isDead} onClick={this.showCase} style={style}>
                <i className={"fas fa-chess-"+this.state.type}></i>
            </div>
        );

    }

    move = (x,y) => {
        let pos = this.state.pos;
        this.props.changePions(this,[pos.x,pos.y],[x,y]);
        let newState = {
            pos: {
                x: x,
                y: y
            },
            isFirstTour: false
        }
        if (this.state.type == "pawn" && (y == 0 || y == this.plateau.state.size -1)) {
            this.props.askPopUp("endPlateau","",this.changeType.bind(this));
        }
        this.setState(newState);
    }

    showCase = (e) => {
        if (!this.state.isDead && this.plateau.state.teamTurn == this.state.team) {
            e.stopPropagation();
            let finalCoords = [];
            let pos = this.state.pos;
            let pionsArray = this.plateau.state.pions;
            switch (this.state.type) {
                case "pawn":
                    finalCoords = this.pawnMoves(pos,pionsArray);
                    break;
                case "rook":
                    finalCoords = this.rookMoves(pos,pionsArray);
                    break;
                case "knight":
                    finalCoords = this.knightMoves(pos,pionsArray);
                    break;
                case "bishop":
                    finalCoords = this.bishopMoves(pos,pionsArray);
                    break;
                case "queen":
                    finalCoords = this.queenMoves(pos,pionsArray);
                    break;
                case "king":
                    finalCoords = this.kingMoves(pos,pionsArray);
                    break;
                default: console.log("rien");
            }
            this.props.change(finalCoords,this);
        }
    }

    changeType = (newType) => {
        this.setState({type: newType});
    }

    die = () => {
        if (this.state.type == "king") {
            let winnerTeam = (this.state.team == "white") ? "black" : "white";
            this.props.askPopUp("win",winnerTeam,this.changeType.bind(this));
        }
        this.setState({isDead: true})
    }


    inRange(num) {
        return (num < this.plateau.state.size && num >= 0) ? true : false;
    }

    // PION MOVES ////////////////

    pawnMoves = (pionPos,pionsArray) => {
        let coords = [];
        let teamMod = (this.state.team == "black") ? 1 : -1;

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
            this.goInLine(8,[0,-1],pionPos,pionsArray)
        );
    }

    bishopMoves = (pionPos,pionsArray) => {
        let coords = [];
        return coords.concat(
            this.goInLine(8,[1,1],pionPos,pionsArray),
            this.goInLine(8,[-1,1],pionPos,pionsArray),
            this.goInLine(8,[-1,-1],pionPos,pionsArray),
            this.goInLine(8,[1,-1],pionPos,pionsArray)
        );
    }

    queenMoves = (pionPos,pionsArray) => {
        let coords = [];
        return coords.concat(
            this.goInLine(8,[1,1],pionPos,pionsArray),
            this.goInLine(8,[-1,1],pionPos,pionsArray),
            this.goInLine(8,[-1,-1],pionPos,pionsArray),
            this.goInLine(8,[1,-1],pionPos,pionsArray),
            this.goInLine(8,[1,0],pionPos,pionsArray),
            this.goInLine(8,[-1,0],pionPos,pionsArray),
            this.goInLine(8,[0,1],pionPos,pionsArray),
            this.goInLine(8,[0,-1],pionPos,pionsArray)
        );
    }
    kingMoves = (pionPos,pionsArray) => {
        let coords = [];
        return coords.concat(
            this.goInLine(2,[1,1],pionPos,pionsArray),
            this.goInLine(2,[-1,1],pionPos,pionsArray),
            this.goInLine(2,[-1,-1],pionPos,pionsArray),
            this.goInLine(2,[1,-1],pionPos,pionsArray),
            this.goInLine(2,[1,0],pionPos,pionsArray),
            this.goInLine(2,[-1,0],pionPos,pionsArray),
            this.goInLine(2,[0,1],pionPos,pionsArray),
            this.goInLine(2,[0,-1],pionPos,pionsArray)
        );
    }
    knightMoves = (pionPos,pionsArray) => {
        let coords = [];
        return coords.concat(
            this.goInLine(2,[2,1],pionPos,pionsArray),
            this.goInLine(2,[-2,-1],pionPos,pionsArray),
            this.goInLine(2,[-2,1],pionPos,pionsArray),
            this.goInLine(2,[2,-1],pionPos,pionsArray),
            this.goInLine(2,[1,2],pionPos,pionsArray),
            this.goInLine(2,[-1,-2],pionPos,pionsArray),
            this.goInLine(2,[-1,2],pionPos,pionsArray),
            this.goInLine(2,[1,-2],pionPos,pionsArray)
        );
    }



    // pions repetitive Move ////

    goInLine = (size,direction,pionPos,pionsArray) => {
        let lineCoords = [];
        for (let i = 1; i < size; i++) {
            let linePos = [pionPos.x+(direction[0]*i),pionPos.y+(direction[1]*i)];
            if (!this.inRange(linePos[0]) || !this.inRange(linePos[1])) return lineCoords;
            if (pionsArray[linePos[0]][linePos[1]] != "empty") {
                if (pionsArray[linePos[0]][linePos[1]].state.team != this.state.team) {
                    lineCoords.push(linePos);
                }
                return lineCoords;
            }
            lineCoords.push(linePos);
        }
        return lineCoords;
    }
}
