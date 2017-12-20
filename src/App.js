import React, {Component} from 'react';
import SearchBar from './components/searchBar';
import MarketData from './components/marketData';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to the MattyIce Stock Guide</h1>
                </header>
                <SearchBar/>
                <MarketData/>
            </div>
        );
    }
}

export default App;
