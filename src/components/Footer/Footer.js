
import React from 'react'
import styled from 'styled-components'

import bitboxLogo from '../../assets/bitbox-logo.png'
import bitcoincomLogo from '../../assets/bitcoincom-logo-white.png'
import bcfLogo from '../../assets/bcf-logo.png'
import coinspiceLogo from '../../assets/coinspice_trans.png'

const Wrapper = styled.div`
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
    padding: 0 20px;
    color: #000;
`

const Image = styled.img`
    margin: auto 20px;
    max-height: 60px;
`

const PoweredBy = styled.div`
    font-weight: 700;
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex: 1;
    align-items: center;
    justify-content: left;
`

const PoweredByTitle = styled.h2`
    margin: 0;
`

const Sponsors = styled.div`
    width: auto;
    padding: 10px;
`

const SponsorLogos = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const SponsorsImage = styled.img`
width: auto;
max-width: 300px;
max-height: 60px;
margin: 0px 10px;
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
                    <SponsorLogos>
                        <SponsorsImage src={bitcoincomLogo} alt="BITBOX" />
                        <SponsorsImage src={coinspiceLogo} alt="BITBOX" />
                        <SponsorsImage src={bcfLogo} alt="BITBOX" />
                    </SponsorLogos>
                </Sponsors>
            </Wrapper>)
    }
}

export default Footer