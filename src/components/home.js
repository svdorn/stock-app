import React, {Component} from 'react';
import MarketData from './marketData';
import MarketGraph from './marketGraph';

class Home extends Component {
    render(){
        return(
          <div>
              <MarketData/>
              <MarketGraph/>
          </div>
        );
    }
}

export default Home;