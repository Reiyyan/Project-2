import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as WeatherAPI from '../WeatherAPI';
// import * as placesAPI from '../placesAPI';
import { Grid, TextField, Typography } from '@mui/material';
// import Autocomplete from '@mui/material/Autocomplete';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';
import NightsStaySharpIcon from '@mui/icons-material/NightsStaySharp';
export default function Weather() {
    const [weather, setWeather] = React.useState(null);
    const [place, setPlace] = React.useState('');

    React.useEffect(() => {
        if (place !== '' && place !== null) {
            WeatherAPI.getWeather(place).then(e => {
                console.log("Getting Weather Fresh");
                setWeather(e?.data);
            });
        }

    }, [place]); // Only re-run the effect if state changes

    const cities = [
        'Toronto',
        'Manhattan',
        'Rio de Janeiro',
        'Montevideo',
        'Paris', 'Berlin',
        'Rome',
        'Cairo',
        'Seoul',
        'Shanghai',
        'Tokyo'
    ];

    const filter = createFilterOptions();
    const sunrise = new Date((weather?.sys?.sunrise) * 1000)
    const sunset = new Date((weather?.sys?.sunset) * 1000)
    const now = new Date((weather?.dt) * 1000)

    let duration = 0;
    let delta = 0;
    let sun = true;

    const mod = (n, m) => {
        return ((n % m) + m) % m;
    }

    if (place !== '') {
        if (sunrise <= now && now < sunset) {
            sun = true;
            duration = Math.abs(sunset - sunrise) / (3.6 * 10 ** 6)
            delta = Math.abs(now - sunrise) / (3.6 * 10 ** 6);
        }
        else {
            sun = false;
            duration = mod((sunrise - sunset) / (3.6 * 10 ** 6), 24)
            delta = mod((now - sunset) / (3.6 * 10 ** 6), 24);
        }
    }

    const sunMoonPosition = {
        zIndex: 2,
        position: 'absolute',
        fontSize: '4rem',
        color: 'rgba(243, 225, 107, 1)',
        top: `${50 - (Math.sin(delta / duration * Math.PI) * 40)}%`,
        right: `${delta / duration * 96}%`,
        display: (place ? 'inherit' : 'none')
    }

    return (
        <>
            <Container sx={{
                minHeight: '75vh', 
                padding: '2rem', 

            }}>
                {sun ? <WbSunnySharpIcon sx={sunMoonPosition} /> : <NightsStaySharpIcon sx={sunMoonPosition} />}
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Autocomplete
                        value={place}
                        onChange={(event, newValue) => {
                            setPlace(newValue);
                        }}

                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);
                            const { inputValue } = params;
                            // Suggest the creation of a new value
                            const isExisting = options.some((option) => inputValue === option);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push(inputValue);
                            }
                            return filtered;
                        }}

                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        id="city-picker"
                        options={cities}
                        getOptionLabel={(option) => {
                            return option;
                        }}

                        renderOption={(props, option) => <li {...props}>{option}</li>}

                        sx={{ width: '100%' }}
                        freeSolo
                        renderInput={(params) => (
                            <TextField {...params} label="Cities" />
                        )}
                    />
                </Box>

                {weather ?
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={6} md={8}>
                            <Typography variant='h2' align='right'>
                                {weather?.name}, {weather?.sys?.country}
                            </Typography>
                            <Typography variant='subtitle2' align='right'>
                                Longitude: {weather?.coord?.lon}, Latitude: {weather?.coord?.lat}
                            </Typography>
                            <Typography variant='subtitle2' align='right'>
                                {new Date(weather?.dt * 1000).toString()}
                            </Typography>
                        </Grid>

                        <Grid item xs={6} md={8} sx={{ position: 'relative', mt: '2rem' }}>
                            <Typography variant='h1' align='center' >
                                {weather?.weather && weather?.weather[0] ? weather?.weather[0]?.main : "Missing Data"}
                            </Typography>
                            {/* <img src={`http://openweathermap.org/img/wn/${weather?.weather && weather?.weather[0] ? weather?.weather[0]?.icon : "0"}@2x.png`} alt='Weather Icon' style={{ position: 'absolute', top: 0, right: 0, }} /> */}
                        </Grid>

                        <Grid item xs={6} md={8}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <img src={`http://openweathermap.org/img/wn/${weather?.weather && weather?.weather[0] ? weather?.weather[0]?.icon : "0"}@2x.png`} alt='Weather Icon' />

                                <Typography variant='h2' align='center'>
                                    {weather?.main?.temp} °C
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={6} md={8}>
                            <Typography variant='body1' align='center' >
                                Expect {weather?.weather && weather?.weather[0] ? weather?.weather[0]?.description + '!' : "Missing Data"}
                            </Typography>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={6}
                        >
                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='right'>
                                    Feels Like:
                                </Typography>
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='left'>
                                    {weather?.main?.feels_like} °C
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={6}
                        >
                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='right'>
                                    Minimum:
                                </Typography>
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='left'>
                                    {weather?.main?.temp_min} °C
                                </Typography>
                            </Grid>
                        </Grid>


                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={6}
                        >
                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='right'>
                                    Maximum:
                                </Typography>
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='left'>
                                    {weather?.main?.temp_max} °C
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={6}
                        >
                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='right'>
                                    Pressure:
                                </Typography>
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='left'>
                                    {weather?.main?.pressure} hPa
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={6}
                        >
                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='right'>
                                    Humidity:
                                </Typography>
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='left'>
                                    {weather?.main?.humidity} %
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={6}
                        >
                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='right'>
                                    Sunrise:
                                </Typography>
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='left'>
                                    {sunrise.getHours() + ':' + sunrise.getMinutes() + ':' + sunrise.getSeconds()}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={6}
                        >
                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='right'>
                                    Sunset:
                                </Typography>
                            </Grid>

                            <Grid item xs={6} md={2}>
                                <Typography variant='body1' align='left'>
                                    {sunset.getHours() + ':' + sunset.getMinutes() + ':' + sunset.getSeconds()}
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* Wind Section */}
                        {weather?.wind ?

                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={2}
                                sx={{ mt: '0.1rem' }}
                            >

                                <Grid
                                    item xs={4}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item >
                                        <Typography variant='body1' align='center'>
                                            Wind Speed
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1' align='center'>
                                            {weather?.wind?.speed} m/s
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item xs={4}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item >
                                        <Typography variant='body1' align='center'>
                                            Wind Direction
                                        </Typography>
                                    </Grid>
                                    <Grid item
                                        textAlign="center"
                                    >
                                        <Typography variant='body1'>
                                            {weather?.wind?.deg ?? 0} °
                                        </Typography>
                                        <ArrowUpwardIcon sx={{ textAlign: 'center', transform: `rotate(${weather?.wind?.deg ?? 0}deg)` }} />
                                    </Grid>
                                </Grid>

                                <Grid
                                    item xs={4}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item >
                                        <Typography variant='body1' align='center'>
                                            Wind Gust
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1' align='center'>
                                            {weather?.wind?.gust ?? 0} m/s
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Grid>

                            : ""}

                        {/* Clouds Section */}
                        {weather?.clouds ?
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={2}
                                sx={{ mt: '0.1rem' }}
                            >

                                <Grid
                                    item xs={4}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item >
                                        <Typography variant='body1' align='center'>
                                            Cloudiness
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1' align='center'>
                                            {weather?.clouds?.all} %
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Grid> : ""}

                        {/* Rain Section */}
                        {weather?.rain ?
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={2}
                                sx={{ mt: '0.1rem' }}
                            >

                                <Grid
                                    item xs={4}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item >
                                        <Typography variant='body1' align='center'>
                                            Rain 1 Hour
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1' align='center'>
                                            {weather?.rain['1h']} mm
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item xs={4}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item >
                                        <Typography variant='body1' align='center'>
                                            Rain 3 Hours
                                        </Typography>
                                    </Grid>
                                    <Grid item
                                        textAlign="center"
                                    >
                                        <Typography variant='body1'>
                                            {weather?.rain['3h'] ?? 0} mm
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Grid> : ""}

                        {/* Snow Section */}
                        {weather?.snow ?
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                spacing={2}
                                sx={{ mt: '0.1rem' }}
                            >

                                <Grid
                                    item xs={4}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item >
                                        <Typography variant='body1' align='center'>
                                            Snow 1 Hour
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body1' align='center'>
                                            {weather?.snow['1h']} mm
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Grid
                                    item xs={4}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Grid item >
                                        <Typography variant='body1' align='center'>
                                            Snow 3 Hours
                                        </Typography>
                                    </Grid>
                                    <Grid item
                                        textAlign="center"
                                    >
                                        <Typography variant='body1'>
                                            {weather?.snow['3h'] ?? 0} mm
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </Grid> : ""}

                    </Grid>
                    : ""}
            </Container>
        </>
    );
}