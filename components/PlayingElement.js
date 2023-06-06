import styled from "styled-components"

const StyledPlayingElement = styled.div`
    --x:2;
    --y:3;
    background-color: darkviolet;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20vmin;
    height: 20vmin;
    border-radius: 1vmin;
    top: calc(var(--y)*(20vmin + 2vmin) + 2vmin);
    left: calc(var(--x)*(20vmin + 2vmin) + 2vmin);
    font-weight: bolder;
    background-color: hsl(160, 50%, 20%);
`

export default function PlayingElement(){
    return <StyledPlayingElement>2</StyledPlayingElement>
}