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
                    <h1 className="App-title">MattyIce Stock Trading</h1>
                    <SearchBar/>
                </header>
                <MarketData/>
                <footer className="App-footer">
                    <h5>MattyIce Stock Trading</h5>
                </footer>
            </div>
        );
    }
}

export default App;
