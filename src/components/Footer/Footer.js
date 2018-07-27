
import React from 'react'
import styled from 'styled-components'
import bitboxLogo from '../../assets/bitbox-logo.png'

const Wrapper = styled.div`
    background: #fff;
    width: 100%;
    text-align: center;
    min-width: 100%;
    margin-top: 20px;
    display: flex;
    flex:1;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
`

const Image = styled.img`
    margin: auto;
`

class Footer extends React.Component {
    render() {
        return (
            <Wrapper>
                <Image src={bitboxLogo} alt="BITBOX" height="60" />
                <p>Powered by BITBOX - developer.bitcoin.com</p>
            </Wrapper>)
    }
}

export default Footer