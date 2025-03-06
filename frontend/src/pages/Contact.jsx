import React from 'react';
import { Container, Typography, Paper, TextField, Button, Grid, Box } from '@mui/material';

const Contact = () => {
    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>Contact Us</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography paragraph>
                            We'd love to hear from you! Please fill out the form and our team will
                            get back to you as soon as possible.
                        </Typography>
                        <Typography>
                            <strong>Email:</strong> support@vehiclebooking.com
                        </Typography>
                        <Typography>
                            <strong>Phone:</strong> +1 (555) 123-4567
                        </Typography>
                        <Typography>
                            <strong>Address:</strong> 123 Booking Street, Vehicle City, VC 12345
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Your Name"
                                name="name"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="message"
                                label="Message"
                                id="message"
                                multiline
                                rows={4}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send Message
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Contact;
