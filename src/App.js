import React, { Component, useRef, useEffect } from 'react';
import { Bip32PrivateKey } from "@emurgo/cardano-serialization-lib-browser";
import { mnemonicToEntropy, generateMnemonic } from 'bip39';
import { Buffer } from 'buffer';

window.Buffer = window.Buffer || Buffer;

class App extends Component {
  
  state={
    address:''
  }


  render(){
    return(
      <div>
        <p> Hello world</p>
        <p>Address: {this.state.address}</p>
      </div>
    )
  }

  componentDidMount(){
    console.log('mounted')

    const mnemonic = generateMnemonic()
    const entropy = mnemonicToEntropy(mnemonic);
    const rootKey = Bip32PrivateKey.from_bip39_entropy(
      Buffer.from(entropy, "hex"), 
      new Uint8Array(3) // No password
    );
    const accountKey = rootKey.derive(1852).derive(1815).derive(0);
    const publicKey = accountKey.to_public();
    const address = publicKey.to_bech32()
    console.log(address)
    this.setState({address: address})
  }
}

export default App;
