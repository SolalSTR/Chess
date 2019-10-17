import React from 'react';
import '../build/popup.min.css';

export default class PopUp extends React.Component {
    constructor(props) {
        super(props);

    }

    renderPopup() {
        switch (this.props.type) {
            case "endPlateau":
                return (
                    <div>
                        <h2>Choose your new pawn type ?</h2>
                        <div>
                            <button onClick={() => {this.props.changeType("queen")}}>
                                <i className="fas fa-chess-queen"></i>
                            </button>
                            <button onClick={() => {this.props.changeType("rook")}}>
                                <i className="fas fa-chess-rook"></i>
                            </button>
                            <button onClick={() => {this.props.changeType("bishop")}}>
                                <i className="fas fa-chess-bishop"></i>
                            </button>
                            <button onClick={() => {this.props.changeType("knight")}}>
                                <i className="fas fa-chess-knight"></i>
                            </button>
                        </div>
                    </div>
                );
                break;
            case "win":
                return (
                    <div>
                        <h2>The {this.props.winnerTeam} wins !</h2>
                        
                    </div>
                );
                break;
            default:

        }
    }

    render() {
        return (
            <div id="popupContainer">
                {
                    this.renderPopup()
                }

            </div>
        );
    }
}
