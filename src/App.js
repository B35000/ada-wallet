import React, { Component, useRef, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api'; 

class App extends Component {
  
  state={
    existential_deposit:''
  }


  render(){
    return(
      <div>
        <p> Hello world</p>
        <p>existential deposit: {this.state.existential_deposit}</p>
      </div>
    )
  }

  componentDidMount(){
    console.log('mounted')

    this.get_existential_deposit()
  }

  get_existential_deposit = async () => {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });
    await api.isReady;
    var existential_deposit = api.consts.balances.existentialDeposit.toNumber() / 1000000000000
    console.log('existential deposit amount: ', existential_deposit)
    this.setState({existential_deposit: existential_deposit})
  }


}

export default App;
