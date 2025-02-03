import { useState } from 'react';
import { Dialog, Button, TextField, Box, Typography, Alert } from '@mui/material';

export default function StartPopup({ open, onSubmit }: {
    open: boolean;
    onSubmit: (orderId: string) => void;
}) {
    const [orderId, setOrderId] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!['1', '2', '3'].includes(orderId)) {
            setError('Демо ID: 1, 2 или 3');
            return;
        }
        onSubmit(orderId);
        setError('');
    };

    return (
        <Dialog open={open} fullWidth maxWidth="xs">
            <Box p={4} display="flex" flexDirection="column" gap={3}>
                <Typography variant="h6">Введите ID заявки</Typography>

                <TextField
                    label="Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    fullWidth
                    variant="outlined"
                />

                {error && <Alert severity="error">{error}</Alert>}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                >
                    Поиск
                </Button>
            </Box>
        </Dialog>
    );
}
