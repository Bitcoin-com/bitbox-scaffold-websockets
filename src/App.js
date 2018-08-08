import React, { Component } from 'react'
import styled from 'styled-components'
import * as BITBOXCli from 'bitbox-cli/lib/bitbox-cli'

import Performer from './components/Performer'
import Footer from './components/Footer'
import { performers as initPerformers } from './performers'

// initialise BITBOX
const BITBOX = new BITBOXCli.default()

// initialise socket connection
const socket = new BITBOX.Socket()

const Wrapper = styled.div`
  padding:0;
  margin: 0;
  display: flex;
  flex:1;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content:center;
  align-items: space-between;
  min-height: 100vh;
`

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: normal;
  padding: 28px 0;
`

const Title = styled.h1`
  text-align: center;
  margin: 10px auto;
  font-size: 50px;
  color: #fff;
  text-shadow: 2px 2px 4px #000;
`

// converts legacy addresses to cashaddr and returns an array
const getOutputAddresses = (outputs) => {
  const addresses = outputs.reduce((prev, curr, idx) => {
    const addressArray = curr.scriptPubKey.addresses;

    // converts legacy address to cashaddr
    const value = BITBOX.BitcoinCash.toBitcoinCash(curr.satoshi);

    const ret = addressArray.reduce((prev, curr, idx) => {
      return { ...prev, [curr]: { value } }
    }, {})
    return [...prev, { ...ret }]
  }, [])

  return addresses
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

    this.handleNewTx = this.handleNewTx.bind(this)
  }

  componentDidMount() {
    const { performerAddresses } = this.state

    // create listenner with callback for incomming transactions
    socket.listen('transactions', this.handleNewTx)

    this.handleUpdateAddressBalance(performerAddresses)
  }

  handleNewTx(msg) {
    const { performers, performerAddresses } = this.state
    const json = JSON.parse(msg)
    const outputs = json.outputs

    const addresses = getOutputAddresses(outputs)

    Object.keys(performers).forEach(p => {
      addresses.forEach(a => {
        const key = Object.keys(a)[0]

        if (p === key) {
          performers[p].lastTip = a[key].value
          performers[p].notification = true
          this.setState({
            performers
          })

          setTimeout(() => {
            performers[p].notification = false
            this.setState({
              performers
            })
          }, 5000)

          this.handleUpdateAddressBalance(performerAddresses)
        }
      })
    })
  }

  handleUpdateAddressBalance(addr) {
    const { performers } = this.state

    // pass array or string and update balances
    BITBOX.Address.details(addr)
      .then((result) => {
        result.forEach(r => {
          Object.keys(performers).forEach(p => {
            if (p === r.legacyAddress) performers[p].balance = (r.unconfirmedBalance + r.balance).toFixed(8)
          })
        })
        this.setState({
          performers
        })
      }, (err) => {
        console.log(err)
      });
  }

  render() {
    const { performers, performerAddresses } = this.state

    return (
      <Wrapper>
        <Title>Nagesen Tip BCH Please <span style={{ color: "red" }}>❤</span> Board</Title>
        <Container>
          {performerAddresses.map((address, i) => {
            const performer = performers[address]

            // converts legacy address to cashaddr and passes to performer component for display
            const cashaddr = BITBOX.Address.toCashAddress(address)

            return (
              <Performer key={i} performer={performer} address={cashaddr} />
            )
          })}
        </Container>
        <Footer />
      </Wrapper>
    );
  }
}

export default App