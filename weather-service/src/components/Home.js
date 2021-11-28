import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Home() {
    const matches = useMediaQuery('(prefers-color-scheme: dark)');
    
    return (
        <>
            Hi Rei 
            {` ${matches}`}
        </>
    );
}