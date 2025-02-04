import {useCallback, useMemo, useState} from 'react';
import {ReactFlow, Controls, Background, useNodesState, useEdgesState} from '@xyflow/react';
import {OrderStatus, OrderData, OrderHistoryItem} from '../utils/types/order';
import CustomNode from './CustomNode';
import {statusTransitions, statusTitles} from '../utils/types/statusTransitions.ts';
import {Dialog, DialogTitle, DialogContent, Typography, Box} from '@mui/material';
import "@xyflow/react/dist/style.css";
import StatusDetailsPopup from "./StatusDetailsPopup.tsx";

const nodeTypes = {custom: CustomNode};

export default function StatusDiagram({orderData}: { orderData: OrderData }) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [selectedHistory, setSelectedHistory] = useState<OrderHistoryItem | null>(null);
    const [currentStatusDetails, setCurrentStatusDetails] = useState<{
        open: boolean;
        status: OrderStatus;
        historyItem?: OrderHistoryItem;
    }>({
        open: false,
        status: OrderStatus.Created
    });

    const handleNodeClick = useCallback((status: OrderStatus, historyItem?: OrderHistoryItem) => {
        if (status === orderData.currentStatus) {
            setCurrentStatusDetails({
                open: true,
                status,
                historyItem
            });
        } else if (historyItem) {
            setSelectedHistory(historyItem);
        }
    }, [orderData]);

    const getLayoutedElements = (orderData: OrderData) => {
        const nodes: unknown[] = [];
        const edges: unknown[] = [];
        const visited = new Set<OrderStatus>();
        const queue: { status: OrderStatus; level: number }[] = [];
        const positions: Record<OrderStatus, { x: number; y: number }> = {} as Record<OrderStatus, { x: number; y: number }>;
        const levelNodes: Record<number, OrderStatus[]> = {};

        // Расстояние между узлами
        const NODE_DISTANCE_X = 600;
        const NODE_DISTANCE_Y = 300;

        // Определение уровня (последовательности)
        queue.push({status: OrderStatus.Created, level: 0}, {status: OrderStatus.RegistrationCancelSent, level: 15}, {status: OrderStatus.Canceled, level: 16}, {status: OrderStatus.Canceled, level: 16} );
        visited.add(OrderStatus.Created);

        while (queue.length > 0) {
            const {status, level} = queue.shift()!;

            if (!levelNodes[level]) levelNodes[level] = [];
            levelNodes[level].push(status);

            const transitions = statusTransitions[status] || [];
            for (const nextStatus of transitions) {
                if (!visited.has(nextStatus)) {
                    visited.add(nextStatus);
                    queue.push({status: nextStatus, level: level + 1});
                }
            }
        }

        // Расположение узлов
        Object.entries(levelNodes).forEach(([levelStr, statuses]) => {
            const level = parseInt(levelStr);
            statuses.forEach((status, index) => {
                const x = level * NODE_DISTANCE_X;
                const y = status === OrderStatus.Canceled ? index * NODE_DISTANCE_Y * (-2) : index * NODE_DISTANCE_Y;
                positions[status] = {x, y};
            });
        });

        // Создание узлов и соединений
        Object.values(OrderStatus).forEach(status => {
            const historyItem = orderData.history.find(h => h.status === status);
            const transitionInfo = orderData.history
                .find(h => statusTransitions[h.status]?.includes(status))?.additionalInfo;

            nodes.push({
                id: status,
                type: 'custom',
                position: positions[status],
                data: {
                    status,
                    isCurrent: status === orderData.currentStatus,
                    isPast: orderData.history.some(h => h.status === status),
                    hasError: orderData.errorReasons?.[status] !== undefined,
                    historyItem,
                    transitionInfo,
                    onClick: () => handleNodeClick(status, historyItem)
                }
            });

            const transitions = statusTransitions[status] || [];
            transitions.forEach(target => {
                edges.push({
                    id: `${status}-${target}`,
                    source: status,
                    target: target,
                    animated: orderData.history.some(h => h.status === status) &&
                        orderData.history.some(h => h.status === target),
                    style: {
                        stroke: '#888',
                        strokeWidth: 2,
                    },
                    label: orderData.history
                        .find(h => h.status === status && statusTransitions[h.status]?.includes(target))
                        ?.additionalInfo || '',
                    labelStyle: {
                        fill: '#888',
                        fontSize: 12,
                    },
                    labelBgStyle: {
                        fill: '#fff',
                    },
                    labelBgPadding: [4, 4],
                    labelBgBorderRadius: 4,
                });
            });
        });

        return {nodes, edges};
    };

    useMemo(() => {
        const {nodes, edges} = getLayoutedElements(orderData);
        // @ts-expect-error error
        setNodes(nodes);
        // @ts-expect-error error
        setEdges(edges);
    }, [orderData]);

    return (
        <>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                // @ts-expect-error error
                nodeTypes={nodeTypes}
                fitView
            >
                <Background/>
                <Controls/>
            </ReactFlow>

            <Dialog open={!!selectedHistory} onClose={() => setSelectedHistory(null)}>
                {selectedHistory && (
                    <>
                        <DialogTitle>{statusTitles[selectedHistory.status]}</DialogTitle>
                        <DialogContent>
                            <Box mb={2}>
                                <Typography variant="subtitle2">Дата и время:</Typography>
                                <Typography>
                                    {new Date(selectedHistory.timestamp).toLocaleString()}
                                </Typography>
                            </Box>
                            <Box mb={2}>
                                <Typography variant="subtitle2">Описание:</Typography>
                                <Typography>{selectedHistory.description}</Typography>
                            </Box>
                            {selectedHistory.additionalInfo && (
                                <Box mb={2}>
                                    <Typography variant="subtitle2">Дополнительная информация:</Typography>
                                    <Typography color="error">
                                        {selectedHistory.additionalInfo}
                                    </Typography>
                                </Box>
                            )}
                        </DialogContent>
                    </>
                )}
            </Dialog>
            <StatusDetailsPopup
                open={currentStatusDetails.open}
                onClose={() => setCurrentStatusDetails(prev => ({...prev, open: false}))}
                currentStatus={currentStatusDetails.status}
                historyItem={currentStatusDetails.historyItem}
                possibleTransitions={statusTransitions[currentStatusDetails.status] || []}
            />
        </>
    );
}
