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
        if (this.state.type === "king") {
            this.props.changeKingPos(this.state.team,this.state.pos);
        }

        /*if (this.state.type === "king" && !this.props.echec.inEchec) {
            let pionsArray = this.plateau.state.pions;
            let test = this.checkLine(this.state.pos,pionsArray);
            if (!test) {
                this.props.inEchec(this.state.pos);
            }

        }*/
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
        if (this.state.type === "pawn" && (y === 0 || y === this.plateau.state.size -1)) {
            this.props.askPopUp("endPlateau","",this.changeType.bind(this));
        }
        if (this.state.type === "king") {
            this.props.changeKingPos(this.state.team,newState.pos);
        }
        this.props.testPat();
        this.props.testMat();
        this.setState(newState);
    }

    changeType = (newType) => {
        this.setState({type: newType});
    }

    die = () => {
        if (this.state.type === "king") {
            let winnerTeam = (this.state.team === "white") ? "black" : "white";
            this.props.askPopUp("win",winnerTeam,this.changeType.bind(this));
        }
        this.setState({isDead: true})
    }


    inRange(num) {
        return (num < this.plateau.state.size && num >= 0) ? true : false;
    }

    showCase = (e) => {
        if (!this.state.isDead && this.plateau.state.teamTurn === this.state.team) {
            e.stopPropagation();
            let allPossibleCases = this.getAllPossibleCases();
            this.props.change(allPossibleCases,this);
        }
    }

    getAllPossibleCases = () => {
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
        if (this.state.type !== "king") {
            let newfinalCoords = [];
            for (let i in finalCoords) {
                let coord = finalCoords[i];

                let newPionsArray = [];

                for (let pionsArrayRow of pionsArray) {
                    newPionsArray.push(Array.from(pionsArrayRow));
                }

                newPionsArray[coord[0]][coord[1]] = newPionsArray[pos.x][pos.y];
                newPionsArray[pos.x][pos.y] = "empty";

                let kingPos = this.props.kingPos[this.state.team];
                if (this.checkLine(kingPos,newPionsArray)) {

                    newfinalCoords.push(coord);
                }
            }
            return newfinalCoords;
        } else {
            return finalCoords;
        }
    }

    // PION MOVES ////////////////

    pawnMoves = (pionPos,pionsArray) => {
        let coords = [];
        let teamMod = (this.state.team === "black") ? 1 : -1;

        if (pionsArray[pionPos.x][pionPos.y+teamMod*1] === "empty") {
            coords.push([pionPos.x,pionPos.y+teamMod*1]);
            if (this.state.isFirstTour && pionsArray[pionPos.x][pionPos.y+teamMod*2] === "empty")
                coords.push([pionPos.x,pionPos.y+teamMod*2]);
        }
        if (this.inRange(pionPos.y+teamMod*1)) {
            if (this.inRange(pionPos.x+1)) {
                let currPion = pionsArray[pionPos.x+1][pionPos.y+teamMod*1];
                if (currPion !== "empty") {
                    if (currPion.state.team !== this.state.team)
                        coords.push([pionPos.x+1,pionPos.y+teamMod*1]);
                }
            }

            if (this.inRange(pionPos.x-1)) {
                let currPion = pionsArray[pionPos.x-1][pionPos.y+teamMod*1];
                if (currPion !== "empty") {
                    if (currPion.state.team !== this.state.team)
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
            this.kingLine([1,1],pionPos,pionsArray),
            this.kingLine([-1,1],pionPos,pionsArray),
            this.kingLine([-1,-1],pionPos,pionsArray),
            this.kingLine([1,-1],pionPos,pionsArray),
            this.kingLine([1,0],pionPos,pionsArray),
            this.kingLine([-1,0],pionPos,pionsArray),
            this.kingLine([0,1],pionPos,pionsArray),
            this.kingLine([0,-1],pionPos,pionsArray)
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
            if (pionsArray[linePos[0]][linePos[1]] !== "empty") {
                if (pionsArray[linePos[0]][linePos[1]].state.team !== this.state.team) {
                    lineCoords.push(linePos);
                }
                return lineCoords;
            }
            lineCoords.push(linePos);
        }
        return lineCoords;
    }

    kingLine = (direction,pionPos,pionsArray) => {
        let lineCoords = [];
        let linePos = [pionPos.x+(direction[0]),pionPos.y+(direction[1])];
        if (!this.inRange(linePos[0]) || !this.inRange(linePos[1])) return lineCoords;
        if (pionsArray[linePos[0]][linePos[1]] !== "empty") {
            if (pionsArray[linePos[0]][linePos[1]].state.team !== this.state.team) {
                let test = this.checkLine({x: linePos[0], y: linePos[1]},pionsArray);
                if (test) {
                    lineCoords.push(linePos);
                }

            }
            return lineCoords;
        }
        let test = this.checkLine({x: linePos[0], y: linePos[1]},pionsArray);
        if (test) {
            lineCoords.push(linePos);
        }
        return lineCoords;
    }

    checkLine = (pos,pionsArray) => {
        let directions = [];

        // check Pawn

        directions = (this.state.team === "white") ? [[-1,-1],[1,-1]] : [[-1,1],[1,1]];
        for (let direction of directions) {
            for (let i = 1; i < 2; i++) {
                let linePos = [pos.x+(direction[0]*i),pos.y+(direction[1]*i)];
                if (!this.inRange(linePos[0]) || !this.inRange(linePos[1])) break;
                let pion = pionsArray[linePos[0]][linePos[1]];
                if (pion !== "empty") {
                    if (pion.state.team !== this.state.team) {
                        if (pion.state.type === "pawn") {
                            return false;
                        }
                    }
                    if (pion.state.type !== "king") break;
                }
            }
        }

        // check king,queen and bishop

        directions = [[1,1],[-1,1],[1,-1],[-1,-1]];
        for (let direction of directions) {
            for (let i = 1; i < 8; i++) {
                let linePos = [pos.x+(direction[0]*i),pos.y+(direction[1]*i)];
                if (!this.inRange(linePos[0]) || !this.inRange(linePos[1])) break;
                let pion = pionsArray[linePos[0]][linePos[1]];
                if (pion !== "empty") {
                    if (pion.state.team !== this.state.team) {
                        if (pion.state.type === "king" && i <= 1) return false;
                        switch (pion.state.type) {
                            case "queen":
                            case "bishop":
                                return false;
                            default:
                                break;
                        }
                        break;
                    }
                    if (pion.state.type !== "king") break;
                }
            }
        }

        // check king,queen and rook

        directions = [[1,0],[-1,0],[0,-1],[0,1]];
        for (let direction of directions) {
            for (let i = 1; i < 8; i++) {
                let linePos = [pos.x+(direction[0]*i),pos.y+(direction[1]*i)];
                if (!this.inRange(linePos[0]) || !this.inRange(linePos[1])) break;
                let pion = pionsArray[linePos[0]][linePos[1]];
                if (pion !== "empty") {
                    if (pion.state.team !== this.state.team) {
                        if (pion.state.type === "king" && i <= 1) return false;
                        switch (pion.state.type) {
                            case "queen":
                            case "rook":
                                return false;
                            default:
                                break;
                        }
                        break;
                    }
                    if (pion.state.type !== "king") break;
                }
            }
        }

        // check knight

        directions = [[2,1],[-2,-1],[-2,1],[2,-1],[1,2],[-1,-2],[-1,2],[1,2]];
        for (let direction of directions) {
            let linePos = [pos.x+(direction[0]),pos.y+(direction[1])];
            if (!this.inRange(linePos[0]) || !this.inRange(linePos[1])) continue;
            let pion = pionsArray[linePos[0]][linePos[1]];
            if (pion !== "empty") {
                if (pion.state.team !== this.state.team) {
                    if (pion.state.type === "knight") return false;
                }
            }
        }

        return true;
    }
}
