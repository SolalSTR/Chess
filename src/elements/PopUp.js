import React from 'react';
import '../build/popup.min.css';

export default class PopUp extends React.Component {

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
            case "win":
                return (
                    <div>
                        <h2>The {this.props.winnerTeam} team win !</h2>
                    </div>
                );
            case "pat":
                return (
                    <div>
                        <h2>{this.props.winnerTeam} team is on Pat !</h2>
                    </div>
                );
            case "mat":
                return (
                    <div>
                        <h2>{this.props.winnerTeam} team is on Mat !</h2>
                    </div>
                );
            default:
                break;
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
