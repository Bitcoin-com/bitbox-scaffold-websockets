import React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
    ${props => props.show ?
        css`
        opacity: 1;
        z-index: 20;
    ` :
        css`
        opacity: 0;
        z-index:0;
    `}

    display: flex;
    position: absolute;
    left:50%;
    top: 50%;
    width: 80%;
    height: 80%;
    margin-left: -40%;
    margin-top: -36%;
    background: #faba15;
    padding: 10px;
    border: 1px solid #000;
    box-sizing: border-box;
    text-align: center;
    flex: 1;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    justify-content: space-evenly;

    transition: all 0.3s ease-out;
`

const Image = styled.div`
    height: auto;
    background: url(${props => props.src}) no-repeat center center;
    width: 160px;
    height: 160px;
    background-size: cover;
    margin: 0 auto;
    border: 1px solid #000;
`

const Name = styled.div`
    font-size: 18px;
    padding: 10px;
    font-weight: 700;
`

const Tip = styled.div`
    font-size: 24px;
    font-weight: 700;
`

class Notification extends React.Component {
    render() {
        const { performer, show } = this.props

        return (
            <Wrapper show={show}>
                <Image src={performer.image} />
                <Name>{performer.name} just received a tip</Name>
                <Tip>{performer.lastTip || 0.005} BCH</Tip>
            </Wrapper>
        )
    }
}

export default Notification