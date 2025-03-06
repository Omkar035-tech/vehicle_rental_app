import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const About = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>About Us</Typography>
                <Typography paragraph>
                    We are a premium vehicle rental service dedicated to providing high-quality vehicles
                    for your transportation needs. Whether you need a two-wheeler for quick city commutes
                    or a four-wheeler for longer journeys, we've got you covered with our extensive fleet.
                </Typography>
                <Typography paragraph>
                    Our mission is to make vehicle rentals simple, affordable, and hassle-free. We pride ourselves
                    on maintaining our vehicles to the highest standards of safety and comfort.
                </Typography>
            </Paper>
        </Container>
    );
};

export default About;