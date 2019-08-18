import React, {Component} from 'react';
import Phaser, {Game} from 'phaser'
import './core.scss'
import Index from './scene/index'
import Click from './scene/click'

class Core extends Component {
    constructor(props) {
        super(props);
        this.config = {
            type: Phaser.AUTO,
            width: 1920,
            height: 1080,
            transparent: true,
            parent: 'canvas',
            scene: [Index, Click]
        }
    }

    componentDidMount() {
        window.game = new Game(this.config)
    }

    render() {
        return (
            <div className={'core'}>
                <div className={'view'} id="canvas"/>
            </div>
        );
    }
}

export default Core;