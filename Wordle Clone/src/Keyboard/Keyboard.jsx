

export default function Keyboard({currentGuess, onEnter}) {
    return (<div>
        <button onClick={() => onEnter(currentGuess)}>guess</button>
    </div>)
    
}