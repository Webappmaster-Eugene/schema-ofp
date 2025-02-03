import { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';

export default function SearchBar({
                                      onSearch,
                                      initialValue = ''
                                  }: {
    onSearch: (orderId: string) => void;
    initialValue?: string;
}) {
    const [orderId, setOrderId] = useState(initialValue);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (!orderId.trim()) {
            setError('Введите ID заявки');
            return;
        }
        if (!['1', '2', '3'].includes(orderId)) {
            setError('Демо ID: 1, 2 или 3');
            return;
        }
        setError('');
        onSearch(orderId);
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                backgroundColor: 'background.paper',
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                width: '400px'
            }}
        >
            <Box display="flex" gap={2} alignItems="center">
                <TextField
                    label="Введите ID заявки"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ flexShrink: 0 }}
                >
                    Поиск
                </Button>
            </Box>
            {error && (
                <Alert severity="error" sx={{ mt: 1 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
}
