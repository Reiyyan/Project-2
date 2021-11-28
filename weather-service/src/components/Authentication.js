import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Card sx={{ maxWidth: 345, mx: 'auto' }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="/static/images/weather.jpg"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Weather Service!
                </Typography>
            </CardContent>
            <form>
                <TextField id="username" label="Username" variant="standard" autoComplete="username" sx={{ mx: '5%', width: '-webkit-fill-available' }} value={username} onChange={handleUsername} />
                <TextField id="password" label="Password" type="password" autoComplete="current-password" variant="standard" sx={{ mx: '5%', mt: '5%', width: '-webkit-fill-available' }} value={password} onChange={handlePassword} />
            </form>
            <CardActions sx={{ justifyContent: 'right' }}>
                <Button size="medium" sx={{ mx: '5%', mt: '2%' }} variant="outlined" >Login</Button>
            </CardActions>
        </Card>
    );
}