import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Weather from './Weather';
export default function Home(props) {
    const matches = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <>
            <Weather dark={props.theme}/>
        </>
    );
}