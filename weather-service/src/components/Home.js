import * as React from 'react';
import Weather from './Weather';
export default function Home(props) {
    return (
        <>
            <Weather dark={props.theme}/>
        </>
    );
}