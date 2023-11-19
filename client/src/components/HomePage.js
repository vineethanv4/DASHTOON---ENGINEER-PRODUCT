import React from 'react';
import { Typography, Paper } from '@mui/material';

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        marginTop: '50px',
    },
    heading: {
        marginBottom: '20px',
    },
    paragraph: {
        lineHeight: '1.6',
    },
};

const HomePage = () => {
    return (
        <Paper elevation={3} sx={styles.container}>
            <Typography variant="h2" sx={styles.heading}>
                Welcome to Comic Create
            </Typography>
            <Typography variant="body1" sx={styles.paragraph}>
                Click on "Home" to return to the home page.
                <br />
                Click on "Create Comic" to start creating your own comics.
                <br />
                Click on "Comic Blog" to read comics shared by other users.
            </Typography>
        </Paper>
    );
};

export default HomePage;
