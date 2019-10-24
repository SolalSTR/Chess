import React, { Component } from 'react';
import '../build/plateau.min.css';
import Case from './Case';
import Pion from './Pion';


export default class Plateau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pionsPattern: this.props.pionsPattern,
            colors: this.props.colors,
            size: this.props.size,
            cases: this.createArrayCases(),
            teamTurn: "white",
            choosing: {
                isChoosing: false,
                pion: null
            },
            echec: false,
            pions: this.createArrayPions(),
            kingPos: {
                white: null,
                black: null
            }
        };
    }

    changeTurn() {
        if (this.state.teamTurn === "white") {
            this.setState({teamTurn: "black"});
        } else {
            this.setState({teamTurn: "white"});
        }
    }

    changeArray(coords,pion) {
        let newCasesArray = this.createArrayCases();
        for (let coord of coords) {
            if ((coord[0] >= 0 && coord[0] < this.state.size) && coord[1] >= 0 && coord[1] < this.state.size) {
                newCasesArray[coord[0]][coord[1]] = true;
            }
        }
        this.setState({cases: newCasesArray, choosing: {isChoosing: true, pion: pion}});
    }

    changePions(pion,start,end) {
        let newCasesArray = [...this.state.pions];
        let movingPion = newCasesArray[start[0]].splice(start[1],1,"empty");
        if (newCasesArray[end[0]][end[1]] !== "empty") {
            newCasesArray[end[0]][end[1]].die();
        }
        newCasesArray[end[0]][end[1]] = movingPion[0];
        let kingPos = false;
        if (pion.state.type == "king") {
            kingPos = {x: end[0], y: end[1]};
            this.testPat(newCasesArray);
            this.testMat(newCasesArray,kingPos);
        } else {
            this.testPat(newCasesArray);
            this.testMat(newCasesArray,kingPos);
        }

        this.setState({pions: newCasesArray});
        return newCasesArray;
    }

    inEchec(pos) {
        this.setState({echec: {inEchec: true, pos: pos}});
    }

    changeKingPos(team,pos) {
        let newKingPos = this.state.kingPos;
        (team === "white") ? newKingPos.white = pos : newKingPos.black = pos;
        this.setState({kingPos: newKingPos});
    }

    createArrayCases() {
        let plateauArray = [];
        for (var i = 0; i < this.props.size; i++) {
            let plateauArrayRow = [];
            for (var j = 0; j < this.props.size; j++) {
                plateauArrayRow.push(false);
            }
            plateauArray.push(plateauArrayRow);
        }
        return plateauArray;
    }
    createArrayPions() {
        let plateauArray = [];
        for (var i = 0; i < this.props.size; i++) {
            let plateauArrayRow = [];
            for (var j = 0; j < this.props.size; j++) {
                plateauArrayRow.push("empty");
            }
            plateauArray.push(plateauArrayRow);
        }
        return plateauArray;
    }

    getThis(pion) {
        let newPions = this.state.pions;
        let pionPos = pion.state.pos;
        newPions[pionPos.x][pionPos.y] = pion;
        this.setState({pions: newPions});
    }

    renderPlateau() {
        let plateauArray = [];
        for (var i = 0; i < this.props.size; i++) {
            let plateauArrayRow = [];
            for (var j = 0; j < this.props.size; j++) {
                plateauArrayRow.push(
                    [
                        <Case changeTurn={this.changeTurn.bind(this)} key={i+j} x={j} y={i} glowing={this.state.cases[j][i]} plateau={this} color={((j+i)%2 === 0) ? this.state.colors.firstColor.first : this.state.colors.secondaryColor.first}/>,
                        this.renderPions(i,j)
                    ]
                )
            }
            plateauArray.push(plateauArrayRow);
        }
        return plateauArray;
    }

    renderPions(i,j) {
        if (i >= this.state.size - this.state.pionsPattern.length || i < this.state.pionsPattern.length) {
            let color = (this.state.size / 2 <= i) ? this.state.colors.firstColor.first : this.state.colors.secondaryColor.first;
            let borderColor = (this.state.size / 2 <= i) ? this.state.colors.firstColor.secondary : this.state.colors.secondaryColor.secondary;
            let type = "pion";
            let team = "";
            if (i < this.state.pionsPattern.length) {
                type = this.state.pionsPattern[i][j];
                team = "black"
            }

            if (i >= this.state.size - this.state.pionsPattern.length) {
                type = this.state.pionsPattern[this.state.size-i-1][j];
                team = "white"
            }
            return <Pion
                askPopUp={this.props.askPopUp}
                typeToChange={this.props.typeToChange}
                rotation={this.props.rotation}
                changePions={this.changePions.bind(this)}
                getThis={this.getThis.bind(this)}
                change={this.changeArray.bind(this)}
                key={i+j+"p"} x={j} y={i}
                plateau={this}
                colors={{color: color, borderColor: borderColor}}
                type={type}
                team={team}
                inEchec={this.inEchec.bind(this)}
                echec={this.state.echec}
                changeKingPos={this.changeKingPos.bind(this)}
                testPat={this.testPat.bind(this)}
                testMat={this.testMat.bind(this)}
                kingPos={this.state.kingPos}
            />
        }
        return null;
    }



    testPat(pionsArray) {
        if (this.teamOnPat("white",pionsArray)) {
            this.props.askPopUp("pat","white",() => {console.log("e")})
        }
        if (this.teamOnPat("black",pionsArray)) {
            this.props.askPopUp("pat","black",() => {console.log("e")})
        }
    }

    testMat(pionsArray,kingPos) {
        if (this.teamOnMat("white",pionsArray,kingPos)) {
            this.props.askPopUp("mat","white",() => {console.log("e")})
        }
        if (this.teamOnMat("black",pionsArray,kingPos)) {
            this.props.askPopUp("mat","black",() => {console.log("e")})
        }
    }

    render() {
        let style = {
            gridTemplate: "repeat("+this.props.size+",1fr) / repeat("+this.props.size+",1fr)",
            border: "15px outset " + this.state.colors.firstColor.secondary,
            transform: "rotate(" + this.props.rotation + "deg)"
        };



        return (
          <div onClick={this.chooseCase} id="plateau" style={style}>
            {
                this.renderPlateau()
            }
          </div>
        );
    }

    teamOnPat = (team,pionsArray) => {

        for (let pionRow of pionsArray) {
            for (let pion of pionRow) {
                if (pion !== "empty") {
                    if (pion.state.team === team) {
                        if (pion.getAllPossibleCases(pionsArray).length > 0) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    teamOnMat = (team,pionsArray,pos) => {
        let kingPos = this.state.kingPos[team];
        if (pos !== false) {
            kingPos = pos;
        }


        let king = pionsArray[kingPos.x][kingPos.y];
        console.log(king);
        if (king.checkLine(kingPos,pionsArray)) return false;
        if (king.getAllPossibleCases(pionsArray) > 0) return false;

        for (let pionRow of this.state.pions) {
            for (let pion of pionRow) {
                if (pion !== "empty") {
                    if (pion.state.team === team) {
                        if (pion.getAllPossibleCases(pionsArray).length > 0) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    chooseCase = (e) => {
        if (this.state.choosing.isChoosing) {
            let emptyArray = this.createArrayCases();
            this.setState({cases: emptyArray, choosing: {isChoosing: false, pion: null}});
        }
    }
}
