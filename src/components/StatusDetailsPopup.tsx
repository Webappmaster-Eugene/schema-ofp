import {Dialog, DialogTitle, DialogContent, Typography, Box, List, ListItem, ListItemText, Chip} from '@mui/material';
import {OrderStatus, OrderHistoryItem} from '../utils/types/order';
import {statusDescriptions, statusTitles, transitionRequirements} from '../utils/types/statusTransitions.ts';

interface StatusDetailsPopupProps {
    open: boolean;
    onClose: () => void;
    currentStatus: OrderStatus;
    historyItem?: OrderHistoryItem;
    possibleTransitions: OrderStatus[];
}

export default function StatusDetailsPopup({
                                               open,
                                               onClose,
                                               currentStatus,
                                               historyItem,
                                               possibleTransitions
                                           }: StatusDetailsPopupProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center" gap={2}>
                    <Chip
                        label={statusTitles[currentStatus]}
                        color="primary"
                        size="medium"
                    />
                    <Typography variant="h6">
                        Детали текущего статуса
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                <Box mb={4}>
                    <Typography variant="subtitle1" gutterBottom>
                        Описание статуса:
                    </Typography>
                    <Typography paragraph>
                        {statusDescriptions[currentStatus]}
                    </Typography>
                </Box>

                {historyItem && (
                    <Box mb={4}>
                        <Typography variant="subtitle1" gutterBottom>
                            Информация о переходе:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Дата и время"
                                    secondary={new Date(historyItem.timestamp).toLocaleString()}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Описание"
                                    secondary={historyItem.description}
                                />
                            </ListItem>
                            {historyItem.additionalInfo && (
                                <ListItem>
                                    <ListItemText
                                        primary="Дополнительная информация"
                                        secondary={historyItem.additionalInfo}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </Box>
                )}

                <Box>
                    <Typography variant="subtitle1" gutterBottom>
                        Возможные переходы:
                    </Typography>
                    <List>
                        {possibleTransitions.map(status => (
                            <ListItem key={status}>
                                <ListItemText
                                    primary={statusTitles[status]}
                                    secondary={transitionRequirements[status]}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
