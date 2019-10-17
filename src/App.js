import React from 'react';
import Plateau from './elements/Plateau';
import PopUp from './elements/PopUp';
import './App.css';
import './build/pla.min.css';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.colors = {
            firstColor: {
                first: "#d7d6e2",
                secondary: "#f7f6ff"
            },
            secondaryColor: {
                first: "#bdbbc7",
                secondary: "#9795a1"
            }
        };
        this.pionsPattern = [
            ["rook","knight","bishop","queen","king","bishop","knight","rook"],
            ["pawn","pawn","pawn","pawn","pawn","pawn","pawn","pawn"]
        ];
        this.state = {
            lastAngle: 0,
            lastRotation: 0,
            rotation: 0,
            clicked: false,
            askNewType: false,
            func: null
        }
    }

    changeType(newType) {
        this.setState({askNewType: false});
        this.state.func(newType);
    }

    createPopUp() {
        if (this.state.askNewType) {
            return <PopUp changeType={this.changeType.bind(this)} text="Choose your new pawn type ?"/>
        }
    }

    askPopUp(func) {
        this.setState({func: func, askNewType: true});
    }

    render() {

        return (
        <div id="container">
            <Plateau askPopUp={this.askPopUp.bind(this)} typeToChange={this.state.newType} rotation={this.state.rotation} size={8} colors={this.colors} pionsPattern={this.pionsPattern}/>
            <div style={{zIndex: (this.state.clicked) ? 1 : 0}} id="pla" onDoubleClick={this.rotateTooTurn} onMouseMove={this.rotation} onMouseUp={this.stopRotation} onMouseOut={this.stopRotation} onMouseDown={this.startRotation}/>
            {
                this.createPopUp()
            }
        </div>
        );
    }

    startRotation = (e) => {
        e.stopPropagation();
        let x = this.getAngle(e.clientX - window.innerWidth/2, e.clientY - window.innerHeight/2);

        this.setState({lastAngle: x, clicked: true});
    }

    stopRotation = (e) => {
        e.stopPropagation();
        let currRotation = this.state.rotation;
        this.setState({lastRotation: currRotation, clicked: false});
    }

    rotation = (e) => {
        e.stopPropagation();
        if (this.state.clicked) {
            let cursorAngle = this.getAngle(e.clientX - window.innerWidth/2, e.clientY - window.innerHeight/2) - this.state.lastAngle;
            let currRotation = this.state.lastRotation;
            this.setState({rotation: currRotation + cursorAngle});
        }
    }

    rotateTooTurn = (e) => {
        e.stopPropagation();
        let currRotation = this.state.lastRotation;
        this.setState({rotation: currRotation + 180});
    }


    /// get Angle

    getAngle = (x,y) => {
        let angle = Math.atan2(y, x);
        let degrees = 180*angle/Math.PI;
        return (360+degrees)%360;
    }
}
