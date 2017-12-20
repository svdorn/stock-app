import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import {alpha} from '../api';

class MarketData extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            djia: {},
            snp: {},
            vix: {},
        });
    }

    componentWillMount() {
        let date = new Date();
        let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"  + date.getDate();

        alpha.data.monthly("DJIA", 1).then(data =>
            this.setState({djia: data["Monthly Time Series"][today]})
        );
        alpha.data.monthly("SNP", 1).then(data =>
            this.setState({snp: data["Monthly Time Series"][today]})
        );
        alpha.data.monthly("VIX", 1).then(data =>
            this.setState({vix: data["Monthly Time Series"][today]})
        );
    }

    render() {
        return (
            <Panel header={<h3>Market Data</h3>} bsStyle="primary">
                <h5>
                    Dow Jones Industrial Average: {this.state.djia["1. open"] === undefined ?
                    <div className="Loading">Loading...</div>
                    : <div className="MarketData">{parseFloat(this.state.djia["1. open"]).toFixed(2)}</div>}
                </h5>
                <h5>
                    S&P 500: {this.state.snp["1. open"] === undefined ?
                    <div className="Loading">Loading...</div>
                    : <div className="MarketData">{parseFloat(this.state.snp["1. open"]).toFixed(2)}</div>}
                </h5>
                <h5>
                    VIX: {this.state.vix["1. open"] === undefined ?
                    <div className="Loading">Loading...</div>
                    : <div className="MarketData">{parseFloat(this.state.vix["1. open"]).toFixed(2)}</div>}
                </h5>
            </Panel>
        );
    }


}

export default MarketData;