import React, { Component } from 'react';
import '../build/plateau.min.css';
import Case from './Case';
import Pion from './pions/Pion';


export default class Plateau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: {
                first: this.props.firstColor,
                secondary: this.props.secondaryColor
            },
            size: this.props.size,
            cases: this.createArrayCases(),
            choosing: {
                isChoosing: false,
                pion: null
            },
            pions: this.createArrayPions()
        };
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
        let newCasesArray = this.state.pions;
        let movingPion = newCasesArray[start[0]].splice(start[1],1,"empty");
        if (newCasesArray[end[0]][end[1]] != "empty") {
            newCasesArray[end[0]][end[1]].die();
        }
        newCasesArray[end[0]][end[1]] = movingPion[0];
        this.setState({pions: newCasesArray});
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
                        <Case key={i+j} x={j} y={i} glowing={this.state.cases[j][i]} plateau={this} color={((j+i)%2 == 0) ? this.state.colors.first : this.state.colors.secondary}/>,
                        this.renderPions(i,j)
                    ]
                )
            }
            plateauArray.push(plateauArrayRow);
        }
        return plateauArray;
    }

    renderPions(i,j) {
        if (i >= this.state.size - this.props.pionsPattern.length || i < this.props.pionsPattern.length) {
            let color = (this.state.size / 2 > i) ? this.state.colors.first : this.state.colors.secondary;
            let type = "pion";
            let team = "";
            if (i < this.props.pionsPattern.length) {
                type = this.props.pionsPattern[i][j];
                team = "white"
            }
            if (i >= this.state.size - this.props.pionsPattern.length) {
                type = this.props.pionsPattern[this.state.size-i-1][this.state.size-j-1];
                team = "black"
            }

            return <Pion changePions={this.changePions.bind(this)} getThis={this.getThis.bind(this)} change={this.changeArray.bind(this)} key={i+j+"p"} x={j} y={i} plateau={this} color={color} type={type} team={team} />

        }
        return null;
    }

    render() {
        return (
          <div onClick={this.test} id="plateau" style={{gridTemplate: "repeat("+this.props.size+",1fr) / repeat("+this.props.size+",1fr)"}}>
            {
                this.renderPlateau()
            }
          </div>
        );
    }

    test = () => {
        if (this.state.choosing.isChoosing) {
            let emptyArray = this.createArrayCases();
            this.setState({cases: emptyArray, choosing: {isChoosing: false, pion: null}});
        }
    }
}
