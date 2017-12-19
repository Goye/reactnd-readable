import React, { Component } from 'react';
import style from './App.css';

class App extends Component {
    render() {
        return (
            <div className={style.app}>
                <div className={style.appHeader}>
                    <img className={style.appLogo} alt="logo" />
                    <h2>Welcome to React</h2>
                </div>
                <p className={style.appIntro}>Hello world!</p>
            </div>
        );
    }
}

export default App;
