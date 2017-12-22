import React, {Component} from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {Panel} from 'react-bootstrap';
import {alpha} from '../api';

class MarketGraph extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: [],
        });
    }

    getData(data) {
        let arr = [];
        let newData = [];
        for (let i in data) {
            if (i !== undefined) {
                arr.push({name:i, dow: parseFloat(data[i]["1. open"])});
            }
        }
        for (let i=arr.length-1; i>=0; i--) {
           newData.push(arr[i]);
        }
        return newData;
    }

    componentWillMount() {
        alpha.data.daily("DJIA", 'compact').then(data =>
            this.setState({data: this.getData(data["Time Series (Daily)"])})
        );
    }

    render() {
        return (
            <Panel header={<h1>Dow Jones Industrial Average (4 Months)</h1>} bsStyle="primary" className="MarketGraph-Panel">
                {this.state.data.length === 0 ?
                    <div className="Loading">Loading...</div>
                    : <LineChart width={900} height={300} data={this.state.data}
                                 margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend />
                        <Line dataKey="dow" stroke="#8884d8"/>
                    </LineChart>
                }
            </Panel>
        );
    }
}

export default MarketGraph;