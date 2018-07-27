import React, { Component } from 'react'

import styled from 'styled-components'

import Performer from './Components/Performer'
import Footer from './Components/Footer'

import { performers as initPerformers } from '../performers'

const BITBOXCli = require('bitbox-cli/lib/bitbox-cli').default
const BITBOX = new BITBOXCli()
const socket = new BITBOX.Socket()

const Wrapper = styled.div`
  padding:0;
  margin: 0;
  display: flex;
  flex:1;
  height: 100vh;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content:center;
  align-items: space-between;
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: normal;
`

const Title = styled.h1`
  text-align: center;
  margin: 5px auto;
  font-size: 50px;
  color: #fff;
`


const getOutputAddresses = (outputs) => {
  const addresses = outputs.reduce((prev, curr, idx) => {
    const addressArray = curr.scriptPubKey.addresses;
    const value = BITBOX.BitcoinCash.toBitcoinCash(curr.satoshi);

    const ret = addressArray.reduce((prev, curr, idx) => {
      return { ...prev, [curr]: { value } }
    }, {})
    return [...prev, { ...ret }]
  }, [])

  return addresses;
}

class App extends Component {
  constructor(props) {
    super(props)

    const performerAddresses = Object.keys(initPerformers).reduce((prev, curr, idx) => {
      return [...prev, curr]
    }, [])

    this.state = {
      performers: initPerformers,
      performerAddresses
    }
  }

  componentDidMount() {
    socket.listen('transactions', this.handleNewTx.bind(this))
    this.handleUpdateAddressBalance(this.state.performerAddresses);
  }

  handleNewTx(msg) {
    const { performers, performerAddresses } = this.state
    const json = JSON.parse(msg)
    const outputs = json.outputs

    const addresses = getOutputAddresses(outputs);

    Object.keys(performers).forEach(p => {
      addresses.forEach(a => {
        const key = Object.keys(a)[0];

        if (p === key) {
          performers[p].lastTip = a[key].value;
          performers[p].notification = true;
          this.setState({
            performers
          })

          setTimeout(() => {
            performers[p].notification = false;
            this.setState({
              performers
            })
          }, 5000);

          this.handleUpdateAddressBalance(performerAddresses)
        }
      })
    })
  }

  handleUpdateAddressBalance(addr) {
    const { performers } = this.state

    BITBOX.Address.details(addr).then((result) => {
      result.forEach(r => {
        Object.keys(performers).forEach(p => {
          if (p === r.legacyAddress) performers[p].balance = (r.unconfirmedBalance + r.balance).toFixed(8)
        })
      })
      this.setState({
        performers
      })
    }, (err) => {
      console.log(err);
    });
  }

  render() {
    const { performers, performerAddresses } = this.state

    return (
      <Wrapper>
        <Title>心付け BCH Encouragement Board <span style={{ color: "red" }}>❤</span></Title>
        <Container>
          {performerAddresses.map((p, i) => {
            const performer = performers[p]
            return (
              <Performer key={i} performer={performer} address={p} />
            )
          })}
          <Footer />
        </Container>
      </Wrapper>
    );
  }
}

export default App;
