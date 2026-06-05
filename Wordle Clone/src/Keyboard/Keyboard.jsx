import './Keyboard.css';

export default function Keyboard({onKeyPress, letterStatus}) {
    const KEYBOARD_LAYOUT = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
    ];

    return (<div className="keyboard-container">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
            <div className="keyboard-row" key={rowIndex}>
                {row.map((key, keyIndex) => (
                <button onClick={() => onKeyPress(key)} className={`key ${letterStatus[key]}`} key={`${rowIndex}-${keyIndex}`}>
                    {key === 'BACKSPACE' ? '⌫' : key}
                </button>
            ))}
            </div>
        ))}

        
    </div>)
    
}