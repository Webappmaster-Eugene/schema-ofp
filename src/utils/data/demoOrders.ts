import { OrderData, OrderStatus } from '../types/order.ts';


export const demoOrders: Record<string, OrderData> = {
    '1': {
        currentStatus: OrderStatus.Completed,
        history: [
            {
                status: OrderStatus.Created,
                timestamp: '2024-01-01T10:00:00',
                description: 'Заявка создана клиентом',
                additionalInfo: 'DTO на входе: {"fio": "Иван Иванов", "passport": "1234567890"}'
            },
            {
                status: OrderStatus.PassportChecking,
                timestamp: '2024-01-01T10:15:00',
                description: 'Начата проверка паспортных данных',
                additionalInfo: ''
            },
            {
                status: OrderStatus.PassportAccepted,
                timestamp: '2024-01-01T10:30:00',
                description: 'Паспортные данные подтверждены',
                additionalInfo: 'Клиент: Иван Иванов'

            },
            {
                status: OrderStatus.AntiFraudChecking,
                timestamp: '2024-01-01T11:00:00',
                description: 'Проверка на мошенничество',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.AntiFraudAccepted,
                timestamp: '2024-01-01T11:30:00',
                description: 'Антифрод проверка пройдена',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.RiskLevelPending,
                timestamp: '2024-01-01T12:00:00',
                description: 'Ожидание проверки уровня риска',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.RiskLevelLow,
                timestamp: '2024-01-01T12:00:00',
                description: 'Низкий уровень риска',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.CourierPending,
                timestamp: '2024-01-01T13:00:00',
                description: 'Курьер назначен',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.CourierAccepted,
                timestamp: '2024-01-01T14:00:00',
                description: 'Курьер назначил встречу',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.DocumentsPending,
                timestamp: '2024-01-01T15:00:00',
                description: 'Документы ожидают подписания',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.DocumentSigned,
                timestamp: '2024-01-01T15:00:00',
                description: 'Документы подписаны',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.RegistrationPending,
                timestamp: '2024-01-01T16:00:00',
                description: 'Ожидание РФТ',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.RegistrationSent,
                timestamp: '2024-01-01T16:00:00',
                description: 'В РФТ отправлена',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.RegistrationSuccess,
                timestamp: '2024-01-01T16:00:00',
                description: 'Регистрация в РФТ успешно завершена',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.Completed,
                timestamp: '2024-01-01T16:00:00',
                description: 'Заявка успешно закрыта',
                additionalInfo: 'Клиент: Иван Иванов'
            }
        ]
    },
    '2': {
        currentStatus: OrderStatus.AntiFraudRejected,
        history: [
            {
                status: OrderStatus.Created,
                timestamp: '2024-01-02T09:00:00',
                description: 'Заявка создана клиентом',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.PassportChecking,
                timestamp: '2024-01-02T09:15:00',
                description: 'Начата проверка паспортных данных',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.PassportAccepted,
                timestamp: '2024-01-02T09:30:00',
                description: 'Паспортные данные подтверждены',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.AntiFraudChecking,
                timestamp: '2024-01-02T10:00:00',
                description: 'Проверка на мошенничество',
                additionalInfo: 'Обнаружены подозрительные операции'
            }
        ],
        // @ts-expect-error errorReasons
        errorReasons: {
            [OrderStatus.AntiFraudRejected]: 'Выявлены признаки мошеннической деятельности'
        }
    },
    '3': {
        currentStatus: OrderStatus.DocumentsPending,
        history: [
            {
                status: OrderStatus.Created,
                timestamp: '2024-01-03T14:00:00',
                description: 'Заявка создана клиентом',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.PassportChecking,
                timestamp: '2024-01-03T14:20:00',
                description: 'Проверка паспортных данных',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.PassportAccepted,
                timestamp: '2024-01-03T14:45:00',
                description: 'Паспортные данные подтверждены',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.AntiFraudChecking,
                timestamp: '2024-01-03T15:00:00',
                description: 'Антифрод проверка',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.AntiFraudAccepted,
                timestamp: '2024-01-03T15:30:00',
                description: 'Антифрод проверка пройдена',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.RiskLevelPending,
                timestamp: '2024-01-01T12:00:00',
                description: 'Ожидание проверки уровня риска',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.RiskLevelMedium,
                timestamp: '2024-01-03T16:00:00',
                description: 'Средний уровень риска',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.SbPending,
                timestamp: '2024-01-03T16:30:00',
                description: 'Ожидание проверки СБ',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.SbAdded,
                timestamp: '2024-01-03T16:30:00',
                description: 'СБ одобрил заявку',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.CourierPending,
                timestamp: '2024-01-01T13:00:00',
                description: 'Курьер назначен',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.CourierAccepted,
                timestamp: '2024-01-01T14:00:00',
                description: 'Курьер назначил встречу',
                additionalInfo: 'Клиент: Иван Иванов'
            },
            {
                status: OrderStatus.DocumentsPending,
                timestamp: '2024-01-01T15:00:00',
                description: 'Документы ожидают подписания',
                additionalInfo: 'Клиент: Иван Иванов'
            },
        ]
    }
};
