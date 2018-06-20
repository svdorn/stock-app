import React, {Component} from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';
import { alpha } from '../api';

class MarketData extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            djia: {},
            snp: {},
            vix: {},
            gild: {},
            swks: {},
            att: {},
            sector: {},
        });
    }

    componentWillMount() {
        let date = new Date();
        let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()-7);

        alpha.data.monthly("DJIA", 1).then(data =>
            this.setState({djia: data["Monthly Time Series"][today]})
        );
        alpha.data.monthly("SNP", 1).then(data =>
            this.setState({snp: data["Monthly Time Series"][today]})
        );
        alpha.data.monthly("VIX", 1).then(data =>
            this.setState({vix: data["Monthly Time Series"][today]})
        );
        alpha.data.monthly("GILD", 1).then(data =>
            this.setState({gild: data["Monthly Time Series"][today]})
        );
        alpha.data.monthly("SWKS", 1).then(data =>
            this.setState({swks: data["Monthly Time Series"][today]})
        );
        alpha.data.monthly("T", 1).then(data =>
            this.setState({att: data["Monthly Time Series"][today]})
        );
        alpha.performance.sector()
            .then(data =>
                this.setState({sector: data})
            )
    }

    render() {
        return (
            <PanelGroup>
                <Panel header={<h1>Market Data</h1>} bsStyle="primary" className="MarketData-Panel">
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
                <Panel header={<h1>Suggested Stocks</h1>} bsStyle="primary" className="MarketData-Panel">
                    <h5>
                        GILD: {this.state.gild["1. open"] === undefined ?
                        <div className="Loading">Loading...</div>
                        : <div className="MarketData">{parseFloat(this.state.gild["1. open"]).toFixed(2)}</div>}
                    </h5>
                    <h5>
                        SWKS: {this.state.swks["1. open"] === undefined ?
                        <div className="Loading">Loading...</div>
                        : <div className="MarketData">{parseFloat(this.state.swks["1. open"]).toFixed(2)}</div>}
                    </h5>
                    <h5>
                        AT&T: {this.state.att["1. open"] === undefined ?
                        <div className="Loading">Loading...</div>
                        : <div className="MarketData">{parseFloat(this.state.att["1. open"]).toFixed(2)}</div>}
                    </h5>
                </Panel>
            </PanelGroup>
        );
    }


}

export default MarketData;