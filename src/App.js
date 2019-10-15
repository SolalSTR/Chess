import React from 'react';
import Plateau from './elements/Plateau';
import './App.css';

export default function App() {
  return (
    <Plateau size={8} firstColor="#a8a3cd" secondaryColor="#bccae2" pionsPattern={[["rook","knight","bishop","king","queen","bishop","knight","rook"],["pawn","pawn","pawn","pawn","pawn","pawn","pawn","pawn"]]}/>
  );
}
