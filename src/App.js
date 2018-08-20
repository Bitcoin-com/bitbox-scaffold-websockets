import React, { Component } from 'react'
import styled from 'styled-components'
import * as BITBOXCli from 'bitbox-cli/lib/bitbox-cli'

import Donation from './components/Donation'
import Footer from './components/Footer'
import { donations as initDonations } from './donations'

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

    const donationAddresses = Object.keys(initDonations).reduce((prev, curr, idx) => {
      return [...prev, curr]
    }, [])

    this.state = {
      donations: initDonations,
      donationAddresses
    }

    this.handleNewTx = this.handleNewTx.bind(this)
  }

  componentDidMount() {
    const { donationAddresses } = this.state

    // create listenner with callback for incomming transactions
    socket.listen('transactions', this.handleNewTx)

    this.handleUpdateAddressBalance(donationAddresses)
  }

  handleNewTx(msg) {
    const { donations, donationAddresses } = this.state
    const json = JSON.parse(msg)
    const outputs = json.outputs

    const addresses = getOutputAddresses(outputs)

    Object.keys(donations).forEach(p => {
      addresses.forEach(a => {
        const key = Object.keys(a)[0]

        if (BITBOX.Address.toLegacyAddress(p) === key) {
          donations[p].lastTip = a[key].value
          donations[p].notification = true
          this.setState({
            donations
          })

          setTimeout(() => {
            donations[p].notification = false
            this.setState({
              donations
            })
          }, 5000)

          this.handleUpdateAddressBalance(donationAddresses)
        }
      })
    })
  }

  handleUpdateAddressBalance(addr) {
    const { donations } = this.state

    // pass array or string and update balances
    BITBOX.Address.details(addr)
      .then((result) => {
        result.forEach(r => {
          Object.keys(donations).forEach(p => {
            if (p === r.legacyAddress) donations[p].balance = (r.unconfirmedBalance + r.balance).toFixed(8)
          })
        })
        this.setState({
          donations
        })
      }, (err) => {
        console.log(err)
      });
  }

  render() {
    const { donations, donationAddresses } = this.state

    return (
      <Wrapper>
        <Title>Donate BCH Please <span style={{ color: "red" }}>❤</span></Title>
        <Container>
          {donationAddresses.map((address, i) => {
            const donation = donations[address]

            // converts legacy address to cashaddr and passes to donation component for display
            const cashaddr = BITBOX.Address.toCashAddress(address)

            return (
              <Donation key={i} donation={donation} address={cashaddr} />
            )
          })}
        </Container>
        <Footer />
      </Wrapper>
    );
  }
}

export default App
