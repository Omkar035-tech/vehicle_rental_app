import React from 'react';
import { Container, Typography, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ChevronDown } from 'lucide-react';

const Support = () => {
    const faqs = [
        {
            question: "How do I book a vehicle?",
            answer: "You can book a vehicle by filling out our simple booking form. Just select the type of vehicle, model, and your desired booking dates."
        },
        {
            question: "What documents do I need to rent a vehicle?",
            answer: "You will need a valid driver's license, proof of identity (such as a passport or ID card), and a credit card for the security deposit."
        },
        {
            question: "Can I cancel my booking?",
            answer: "Yes, you can cancel your booking up to 24 hours before the scheduled pickup time for a full refund. Cancellations within 24 hours may incur a cancellation fee."
        },
        {
            question: "Is insurance included in the rental price?",
            answer: "Basic insurance is included in all our rentals. Additional coverage options are available for purchase during the booking process."
        },
        {
            question: "What happens if I return the vehicle late?",
            answer: "Late returns are charged at an hourly rate. If you know you'll be returning the vehicle late, please contact us to extend your booking."
        }
    ];

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>Support</Typography>
                <Typography paragraph>
                    Find answers to frequently asked questions below. If you can't find what you're
                    looking for, please contact our support team.
                </Typography>

                {faqs.map((faq, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ChevronDown size={18} />}
                            aria-controls={`panel${index}a-content`}
                            id={`panel${index}a-header`}
                        >
                            <Typography fontWeight="bold">{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>
        </Container>
    );
};

export default Support;