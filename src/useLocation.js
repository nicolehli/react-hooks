import { useState, useEffect } from 'react';

export default () => {
    // Use userState hook, no longer need class or setState
    const [lat, setLat] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    // Similar to componentDidMount 
    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(
        position => setLat(position.coords.latitude),
        err => setErrorMessage(err.message)
        );
    }, []);

    return [lat, errorMessage];
};