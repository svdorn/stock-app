import React, {Component} from 'react';
import Home from './components/home';
import Stock from './components/stock';
import logo from './logo.svg';
import './App.css';
import {Router, Route, browserHistory} from 'react-router';
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';

class App extends Component {

    handleClick() {
        console.log(this.input.value);
        browserHistory.push('/stock=' + this.input.value.toUpperCase());
        this.input.value = '';
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Stock Analysis</h1>
                    <Navbar className="SearchBar">
                        <Navbar.Collapse>
                            <Navbar.Form>
                                <FormGroup>
                                    <FormControl type="text" inputRef={(ref) => {this.input = ref}} placeholder="Search" />
                                </FormGroup>
                                {' '}
                                <Button type="submit" onClick={this.handleClick.bind(this)}>Submit</Button>
                            </Navbar.Form>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
                <Router history={browserHistory}>
                    <Route path="/" component={Home}/>
                    <Route path='/stock=:name' component={Stock}/>
                </Router>
                <footer className="App-footer">
                    <h5>MattyIce Stock Trading</h5>
                </footer>
            </div>
        );
    }
}

export default App;
