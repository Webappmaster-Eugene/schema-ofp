import { useState } from 'react';
import { Box } from '@mui/material';
import StatusDiagram from './components/StatusDiagram';
import StartPopup from './components/StartPopup';
import SearchBar from './components/SearchBar';
import {OrderData} from "./utils/types/order.ts";
import {demoOrders} from "./utils/data/demoOrders.ts";

export default function App() {
    const [currentOrder, setCurrentOrder] = useState<OrderData | null>(null);
    const [showPopup, setShowPopup] = useState(true);

    const handleLoadOrder = (orderId: string) => {
        if (demoOrders[orderId]) {
            setCurrentOrder(demoOrders[orderId]);
            setShowPopup(false);
        }
    };

    return (
        <Box height="100vh" width="100vw" position="relative">
            {currentOrder && (
                <>
                    <SearchBar
                        onSearch={handleLoadOrder}
                        initialValue={Object.keys(demoOrders).find(
                            key => demoOrders[key] === currentOrder
                        ) || ''}
                    />
                    <StatusDiagram orderData={currentOrder} />
                </>
            )}
            <StartPopup
                open={showPopup}
                onSubmit={handleLoadOrder}
            />
        </Box>
    );
}
