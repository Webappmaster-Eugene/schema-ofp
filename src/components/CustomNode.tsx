// @ts-nocheck
import { Handle, Position, NodeProps } from '@xyflow/react';
import {OrderHistoryItem, OrderStatus} from '../utils/types/order';
import { CheckCircle, Error, Schedule, ArrowForward } from '@mui/icons-material';
import { Chip, styled, Box, Typography } from '@mui/material';
import {statusTitles} from "../utils/types/statusTransitions.ts";

const NodeContainer = styled('div')<{
    isCurrent?: boolean;
    isPast?: boolean;
    hasError?: boolean;
}>(({ theme, isCurrent, isPast, hasError }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    minWidth: 240,
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    border: `2px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',

    ...(isCurrent && {
        borderColor: theme.palette.success.main,
        boxShadow: `0 0 15px ${theme.palette.success.light}`,
        transform: 'scale(1.05)',
    }),

    ...(isPast && {
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary?.light,
    }),

    ...(hasError && {
        borderColor: theme.palette.error.main,
        backgroundColor: theme.palette.error?.light,
        animation: 'pulseError 1.5s infinite',
    }),

    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[6],
    }
}));

const StatusIconContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: -20,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '50%',
    padding: theme.spacing(1),
    boxShadow: theme.shadows[2],
}));

const TransitionInfo = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: -40,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    minWidth: 200,
    textAlign: 'center',
}));

// @ts-expect-error data
export default function CustomNode({ data }: NodeProps<{
    status: OrderStatus;
    isCurrent: boolean;
    isPast: boolean;
    hasError: boolean;
    historyItem?: OrderHistoryItem;
    transitionInfo?: string;
    onClick: () => void;
}>) {
    const getStatusIcon = () => {
        if (data && typeof data ==='object' && "hasError" in data && data?.hasError) return <Error color="error" fontSize="large" />;
        if (data && typeof data ==='object' && "isCurrent" in data && data?.isCurrent) return <CheckCircle color="success" fontSize="large" />;
        if (data && typeof data ==='object' && "isPast" in data && data?.isPast) return <CheckCircle color="primary" fontSize="large" />;
        return <Schedule color="disabled" fontSize="large" />;
    };

    return (
        <>
            <NodeContainer
                isCurrent={data?.isCurrent}
                isPast={data?.isPast}
                hasError={data?.hasError}
                onClick={data?.onClick}
            >
                <StatusIconContainer>
                    {getStatusIcon()}
                </StatusIconContainer>

                <Chip
                    label={statusTitles?.[data?.status]}
                    color={
                        data?.hasError ? 'error' :
                            data?.isCurrent ? 'success' :
                                data?.isPast ? 'primary' : 'default'
                    }
                    size="medium"
                    sx={{ mb: 1 }}
                />

                {data?.historyItem && (
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(data?.historyItem.timestamp).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" mt={1}>
                            {data?.historyItem.description}
                        </Typography>
                    </Box>
                )}

                <Handle type="target" position={Position.Left} />
                <Handle type="source" position={Position.Right} />
            </NodeContainer>

            {data?.transitionInfo && (
                <TransitionInfo>
                    <Box display="flex" alignItems="center" gap={1}>
                        <ArrowForward color="action" />
                        <Typography variant="caption">
                            {data?.transitionInfo}
                        </Typography>
                    </Box>
                </TransitionInfo>
            )}
        </>
    );
}
