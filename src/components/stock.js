import React, {Component} from 'react';
import {Button, Panel} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import yahooFinance from 'yahoo-finance';

class Stock extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            summaryDetail: undefined,
            keyStats: undefined,
            graph: undefined,
            name: '',
            error: '',
        });
    }

    handleClick() {
        browserHistory.push('/');
    }

    componentWillMount() {
        const name = this.props.params.name;
        this.setState({name: name});
        let date = new Date();
        let today = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());

        yahooFinance.quote({
            symbol: name,
            modules: ['summaryDetail', 'defaultKeyStatistics']
        })
            .then(data =>
                this.setState({summaryDetail: data.summaryDetail, keyStats: data.defaultKeyStatistics, error: ''})
            )
            .catch(err =>
                this.setState({error: "Not a valid ticker symbol, try another stock"})
            );
        yahooFinance.historical({
            symbol: name,
            from: '201-01-01',
            to: today,
            period: 'm',
            // period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
        })
            .then(data =>
            this.setState({graph: data})
        )
    }

    getRecommendation(price, futurePrice) {
        if (futurePrice > price) {
            return "Buy";
        } else if ((price / futurePrice) >= 1.12) {
            return "Sell";
        }
        return "Hold";
    }

    render() {
        const name = this.props.params.name;
        if (this.state.name !== name && this.state.name !== '') {
            this.setState({summaryDetail: undefined, keyStats: undefined, name: name});
            yahooFinance.quote({
                symbol: name,
                modules: ['summaryDetail', 'defaultKeyStatistics']
            })
                .then(data =>
                    this.setState({summaryDetail: data.summaryDetail, keyStats: data.defaultKeyStatistics, error: ''})
                )
                .catch(err =>
                    this.setState({error: "Not a valid ticker symbol, try another stock"})
                )
        }
        let summary = this.state.summaryDetail;
        const data = this.state.keyStats;
        console.log(summary);
        console.log(data);
        let price;
        if (data !== undefined) {
            price = (data.forwardPE * data.forwardEps).toFixed(2);
        }
        if (summary !== undefined) {
            if (summary.ask === 0) {
                summary.ask = summary.dayHigh;
            }
        }
        return (
            <div>
                <div>
                    <Button type="submit" onClick={this.handleClick.bind(this)} className="HomeButton">Homepage</Button>
                </div>
                {this.state.error === '' ?
                    <div>
                        <Panel header={<h1>{name} Statistics</h1>} bsStyle="primary" className="StockData-Panel">
                            {summary !== undefined && data !== undefined ?
                                <h5>
                                    Price:
                                    <div className="MarketData">{summary.ask}</div>
                                    <br/>
                                    Beta:
                                    <div className="MarketData">{summary.beta}</div>
                                    <br/>
                                    Forward EPS:
                                    <div className="MarketData">{data.forwardEps}</div>
                                    <br/>
                                    Forward PE:
                                    <div className="MarketData">{data.forwardPE}</div>
                                </h5>
                                : <div className="Loading">Loading...</div>}
                        </Panel>
                        <Panel header={<h1>{name} High/Low Stats</h1>} bsStyle="primary" className="StockData-Panel">
                            {summary !== undefined && data !== undefined ?
                                <h5>
                                    Day High:
                                    <div className="MarketData">{summary.dayHigh}</div>
                                    <br/>
                                    Day Low:
                                    <div className="MarketData">{summary.dayLow}</div>
                                    <br/>
                                    52-Week High:
                                    <div className="MarketData">{summary.fiftyTwoWeekHigh}</div>
                                    <br/>
                                    52-Week Low:
                                    <div className="MarketData">{summary.fiftyTwoWeekLow}</div>
                                </h5>
                                : <div className="Loading">Loading...</div>}
                        </Panel>
                        <Panel header={<h1>{name} Dividend Stats</h1>} bsStyle="primary" className="StockData-Panel">
                            {summary !== undefined && data !== undefined ?
                                <h5>
                                    Dividend:
                                    <div className="MarketData">{summary.dividendRate}</div>
                                    <br/>
                                    DividendYield:
                                    <div className="MarketData">{summary.dividendYield}</div>
                                </h5>
                                : <div className="Loading">Loading...</div>}
                        </Panel>
                        <Panel header={<h1>{name} Suggestion</h1>} bsStyle="primary"
                               className="StockData-PanelSuggestion">
                            {summary !== undefined && data !== undefined ?
                                <h5>
                                    Predicted Price:
                                    <div className="MarketData">{price}</div>
                                    <br/>
                                    Recommendation:
                                    <div className="MarketData">{this.getRecommendation(summary.ask, price)}</div>
                                </h5>
                                : <div className="Loading">Loading...</div>}
                        </Panel>
                    </div>
                    : <div className="messageHeader errorHeader">{this.state.error}</div>}
            </div>
        );
    }
}

export default Stock;