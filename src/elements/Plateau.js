import React, { Component } from 'react';
import '../build/plateau.min.css';
import Case from './Case';
import Pion from './Pion';

export default class Plateau extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: {
                first: this.props.firstColor,
                secondary: this.props.secondaryColor
            },
            cases: this.renderPlateauCases(),
            pions: {
                first: this.renderPions(),
                secondary: this.renderPions()
            },
            size: this.props.size

        };
    }

    renderPlateauCases() {
        let cases = [];
        for (var i = 0; i < this.props.size; i++) {
            for (var j = 0; j < this.props.size; j++) {
                cases.push([i,j]);
            }
        }
        return cases;
    }

    renderPions() {
        let pions = [];
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < this.props.size; j++) {
                pions.push([i,j]);
            }
        }
        return pions;
    }

    render() {
        return (
          <div id="plateau" style={{gridTemplate: "repeat("+this.props.size+",1fr) / repeat("+this.props.size+",1fr)"}}>
            {
                this.state.cases.map((element,i) => {
                    return <Case key={i} x={element[1]} y={element[0]} plateau={this.state} color={((element[1]+element[0])%2 == 0) ? this.state.colors.first : this.state.colors.secondary}/>
                })
            }
            {
                this.state.pions.first.map((element,i) => {
                    return <Pion key={i} x={element[1]} y={element[0]} plateau={this.state} color={this.state.colors.first}/>
                })
            }
            {
                this.state.pions.first.map((element,i) => {
                    return <Pion key={i} x={element[1]} y={this.props.size - element[0]} plateau={this.state} color={this.state.colors.secondary}/>
                })
            }
          </div>
        );
    }

}
