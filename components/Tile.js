import styled from "styled-components"

const StyledPlayingElement = styled.div`
    --x:2;
    --y:3;
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
    animation: show 200ms ease-in-out;
    transition: 100ms ease-in-out;

    @keyframes show {
        0%{
            opacity: 0.5;
            transform: scale(0);
        }

    }
`

export default function Tile(){
    return <StyledPlayingElement>2</StyledPlayingElement>
}