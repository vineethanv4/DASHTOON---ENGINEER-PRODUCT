import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Grid } from '@mui/material';
import './ComicDisplay.css'; // Import your CSS file for additional styling

function ComicDisplay() {
    const { comicName } = useParams();
    const [comicData, setComicData] = useState(null);

    useEffect(() => {
        const fetchComicData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/fetch-comic/${comicName}`);
                setComicData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchComicData();
    }, [comicName]);

    if (!comicData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography variant="h1">{comicName}</Typography>
            <Grid container spacing={2}>
                {comicData.images.map((base64String, index) => (
                    <Grid item key={index}>
                        <img
                            className="comic-image"
                            src={`data:image/png;base64,${base64String}`}
                            alt={`Comic Image ${index + 1}`}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default ComicDisplay;

