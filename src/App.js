import React from 'react';
import Plateau from './elements/Plateau';
import './App.css';

export default function App() {
    let colors = {
        firstColor: {
            first: "#e4e3ee",
            secondary: "#f7f6ff"
        },
        secondaryColor: {
            first: "#bdbbc7",
            secondary: "#a7a5b0"
        }
    };
    return (
    <Plateau size={8} colors={colors} pionsPattern={[["rook","knight","bishop","king","queen","bishop","knight","rook"],["pawn","pawn","pawn","pawn","pawn","pawn","pawn","pawn"]]}/>
    );
}
