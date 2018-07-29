import React from 'react'
import styled from 'styled-components'
import QRCode from 'qrcode-react'
import Notification from '../Notification'

const Wrapper = styled.div`
    position: relative;
    margin: 15px;
    display: grid;
    grid-template-areas: 'pic qr' 'addr addr' 'name name' 'bal bal';
    grid-gap: 5px;
    justify-content: center;
    background: #eee;
    border-radius: 5px;
    padding: 5px;
    box-shadow: 1px 1px 2px #000;
`

const Image = styled.div`
    grid-area: pic;
    background: url(${props => props.image}) no-repeat center center;
    background-size: cover;
    height: 170px;
    width: 170px;
    margin: auto 10px;
    margin-right: 0px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`

const QRContainer = styled.div`
    grid-area: qr;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Address = styled.a`
    text-decoration: none;
    color: #000;
    grid-area: addr;
    z-index: 10;
    text-size: 14px;
    text-align: center;
`

const Name = styled.h2`
    grid-area: name;
    color: #000;
    text-align: center;
    margin: 7px auto;
`

const Balance = styled.div`
    grid-area: bal;
    font-size: 36px;
    font-weight: 700;
    color: #000;
    text-align: center;
`

class Performer extends React.Component {
    render() {
        const { performer, address } = this.props

        return (
            <Wrapper>
                <Image image={performer.image} />
                <Notification performer={performer} show={true || performer.notification} />
                <QRContainer>
                    <QRCode value={address} size={170} />
                </QRContainer>
                <Address href={address}>{address.substring(12)}</Address>
                <Name>{performer.name}</Name>
                <Balance>
                    {performer.balance} BCH
                </Balance>
            </Wrapper>
        )
    }
}

export default Performer