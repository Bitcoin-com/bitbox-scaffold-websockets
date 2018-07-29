
import React from 'react'
import styled from 'styled-components'

import bitboxLogo from '../../assets/bitbox-logo.png'
import bitcoincomLogo from '../../assets/bitcoincom-logo.png'
import bcfLogo from '../../assets/bcf-logo.png'
import coinspiceLogo from '../../assets/coinspice_inverted.png'

const Wrapper = styled.div`
    background: #fff;
    width: 100%;
    text-align: center;
    min-width: 100%;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    flex:1;
    flex-direction: row;
    align-items: top;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0;
    color: #000;
`

const Image = styled.img`
    margin: auto 20px;
    max-height: 60px;
`

const PoweredBy = styled.div`
    font-weight: 700;
    padding: 10px;
    background: #eee;
    width: 30%;
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
`

const PoweredByTitle = styled.h2`
    margin: 0;
`

const Sponsors = styled.div`
    width: 60%;
`

const SponsorLogos = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const SponsorsTitle = styled.h2`
    width: 100%;
`

class Footer extends React.Component {
    render() {
        return (
            <Wrapper>
                <PoweredBy>
                    <Image src={bitboxLogo} alt="BITBOX" height="50" />
                    <PoweredByTitle>Powered by BITBOX<br />developer.bitcoin.com</PoweredByTitle>
                </PoweredBy>
                <Sponsors>
                    <SponsorsTitle>Sponsors</SponsorsTitle>
                    <SponsorLogos>
                        <Image src={bitcoincomLogo} alt="BITBOX" />
                        <Image src={coinspiceLogo} alt="BITBOX" />
                        <Image src={bcfLogo} alt="BITBOX" />
                    </SponsorLogos>
                </Sponsors>
            </Wrapper>)
    }
}

export default Footer