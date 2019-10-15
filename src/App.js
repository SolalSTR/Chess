import React from 'react';
import Plateau from './elements/Plateau';
import './App.css';

export default function App() {
  return (
    <Plateau size={8} firstColor="#a8a3cd" secondaryColor="#bccae2" pionsPattern={[["tour","horse","fool","roi","reine","fool","horse","tour"],["pion","pion","pion","pion","pion","pion","pion","pion"]]}/>
  );
}
