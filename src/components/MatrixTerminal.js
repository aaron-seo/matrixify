import React, { useState, useEffect }from 'react';

let MatrixTerminal = (text) => {
    const [displayText, setDisplayText] = useState('');

    // pass this as a prop later, and make this component more general/reusable
    const charIndex = React.useRef(0);
    const lineIndex = React.useRef(0);

    // Inspired by @pilchard's answer:
    // https://stackoverflow.com/a/65735282
    useEffect( () => {
        let tick = () => {
            setDisplayText(prev => prev + text[lineIndex.current][charIndex.current]); // 0 should be lineIndex
            charIndex.current++;
        }

        if (charIndex.current < text[lineIndex.current].length) {
            let randomDelta = Math.floor(Math.random() * 200) - 150;
            let tickIntervalID = setInterval(tick, 200 + randomDelta);
            return () => clearInterval(tickIntervalID);
        }

        if (charIndex.current == text[lineIndex.current].length) {
            charIndex.current = 0;
            lineIndex.current++;

            if (lineIndex.current == text.length) {
                return;
            }

            setTimeout( () => {
                setDisplayText('');
            }, 3000);
        }




    }, [displayText]);

    return (
        <div className='MatrixTerminal'>
            <span class='text'>{ displayText }</span> 
        </div>
    );
}

export default MatrixTerminal;
