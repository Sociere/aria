import React from 'react';
import Config from '../../../Config';
import Jobs from '../../../Jobs';

class Player extends React.Component {

    render() {
        return (
            <section className="player">
                <div className="avatar">
                    <img src={Config.base_url + "avatar/" + this.props.player.sCharacterName} alt={this.props.player.sCharacterName} />
                </div>
                <h2>{this.props.player.nOverallRank + ". "}{this.props.player.sCharacterName}</h2>
                <h3><span className="level">Level {this.props.player.nLeven}</span> ({this.props.player.nExp64} exp)</h3>
                <h3>{Jobs[this.props.player.nJob].name}</h3>
                <h3>{this.props.player.nPop} Fame</h3>
                <h3 className="guild">"No guild."</h3>
            </section>
        );
    }
}

export default Player;
