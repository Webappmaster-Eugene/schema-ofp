import { OrderStatus } from "./order.ts";

export const statusTransitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.Created]: [OrderStatus.Canceled, OrderStatus.PassportChecking],
    [OrderStatus.PassportChecking]: [OrderStatus.PassportAccepted, OrderStatus.PassportRejected],
    [OrderStatus.PassportAccepted]: [OrderStatus.AntiFraudChecking],
    [OrderStatus.PassportRejected]: [OrderStatus.Canceled],
    [OrderStatus.AntiFraudChecking]: [OrderStatus.AntiFraudAccepted, OrderStatus.AntiFraudRejected],
    [OrderStatus.AntiFraudAccepted]: [OrderStatus.RiskLevelPending],
    [OrderStatus.AntiFraudRejected]: [OrderStatus.Canceled],
    [OrderStatus.RiskLevelPending]: [OrderStatus.RiskLevelLow, OrderStatus.RiskLevelMedium, OrderStatus.RiskLevelHigh, OrderStatus.RiskLevelAdditionalInfo],
    [OrderStatus.RiskLevelLow]: [OrderStatus.CourierPending],
    [OrderStatus.RiskLevelMedium]: [OrderStatus.SbPending],
    [OrderStatus.RiskLevelHigh]: [OrderStatus.SbPending],
    [OrderStatus.RiskLevelAdditionalInfo]: [OrderStatus.SbPending],
    [OrderStatus.SbPending]: [OrderStatus.SbRejected, OrderStatus.SbAdded],
    [OrderStatus.SbRejected]: [OrderStatus.Canceled],
    [OrderStatus.SbAdded]: [OrderStatus.CourierPending],
    [OrderStatus.CourierPending]: [OrderStatus.CourierAccepted, OrderStatus.CourierRejected],
    [OrderStatus.CourierAccepted]: [OrderStatus.DocumentsPending],
    [OrderStatus.CourierRejected]: [OrderStatus.Canceled],
    [OrderStatus.DocumentsPending]: [OrderStatus.DocumentSigned],
    [OrderStatus.DocumentSigned]: [OrderStatus.RegistrationPending],
    [OrderStatus.RegistrationPending]: [OrderStatus.RegistrationSent],
    [OrderStatus.RegistrationSent]: [OrderStatus.RegistrationSuccess, OrderStatus.RegistrationError],
    [OrderStatus.RegistrationSuccess]: [OrderStatus.Completed],
    [OrderStatus.RegistrationError]: [OrderStatus.RegistrationCancelPending],
    [OrderStatus.RegistrationCancelPending]: [OrderStatus.RegistrationCancelSent],
    [OrderStatus.RegistrationCancelSent]: [OrderStatus.Canceled],
    [OrderStatus.Canceled]: [],
    [OrderStatus.Completed]: [],
};

export const statusTitles: Record<OrderStatus, string> = {
    [OrderStatus.Created]: "Заявка создана",
    [OrderStatus.Canceled]: "Заявка отменена",
    [OrderStatus.Completed]: "Заявка успешно обработана",
    [OrderStatus.PassportChecking]: "Проверка паспортных данных",
    [OrderStatus.PassportAccepted]: "Паспортные данные приняты",
    [OrderStatus.PassportRejected]: "Паспортные данные отклонены",
    [OrderStatus.AntiFraudChecking]: "Антифрод проверка",
    [OrderStatus.AntiFraudAccepted]: "Антифрод пройден",
    [OrderStatus.AntiFraudRejected]: "Антифрод отклонил заявку",
    [OrderStatus.RiskLevelPending]: "Определение уровня риска",
    [OrderStatus.RiskLevelLow]: "Низкий риск",
    [OrderStatus.RiskLevelMedium]: "Средний риск",
    [OrderStatus.RiskLevelHigh]: "Высокий риск",
    [OrderStatus.RiskLevelAdditionalInfo]: "Требуется доп. информация",
    [OrderStatus.SbPending]: "Ожидание СБ",
    [OrderStatus.SbRejected]: "Отклонено СБ",
    [OrderStatus.SbAdded]: "добавлено СБ",
    [OrderStatus.CourierPending]: "Ожидание курьера",
    [OrderStatus.CourierAccepted]: "Курьер принял",
    [OrderStatus.CourierRejected]: "Курьер отклонил",
    [OrderStatus.DocumentsPending]: "Ожидание документов",
    [OrderStatus.DocumentSigned]: "Документы подписаны",
    [OrderStatus.RegistrationPending]: "Ожидание регистрации",
    [OrderStatus.RegistrationSent]: "Регистрация отправлена",
    [OrderStatus.RegistrationSuccess]: "Регистрация успешна",
    [OrderStatus.RegistrationError]: "Ошибка регистрации",
    [OrderStatus.RegistrationCancelPending]: "Ожидание отмены регистрации",
    [OrderStatus.RegistrationCancelSent]: "Отмена регистрации отправлена"
};

export const statusDescriptions: Record<OrderStatus, string> = {
    [OrderStatus.Created]: "Заявка успешно создана и ожидает первичной обработки.",
    [OrderStatus.Canceled]: "Заявка была отменена. Процесс остановлен.",
    [OrderStatus.Completed]: "Заявка успешно завершена. Все этапы пройдены.",
    [OrderStatus.PassportChecking]: "Идет проверка паспортных данных клиента.",
    [OrderStatus.PassportAccepted]: "Паспортные данные прошли проверку и подтверждены.",
    [OrderStatus.PassportRejected]: "Паспортные данные не прошли проверку. Требуется исправление.",
    [OrderStatus.AntiFraudChecking]: "Проверка на мошенническую активность. Анализ транзакций и поведения.",
    [OrderStatus.AntiFraudAccepted]: "Антифрод-проверка успешно пройдена. Риски не обнаружены.",
    [OrderStatus.AntiFraudRejected]: "Обнаружены признаки мошенничества. Заявка заблокирована.",
    [OrderStatus.RiskLevelPending]: "Определение уровня риска клиента. Анализ кредитной истории.",
    [OrderStatus.RiskLevelLow]: "Низкий уровень риска. Одобрено.",
    [OrderStatus.RiskLevelMedium]: "Средний уровень риска. Заявка требует ручного рассмотрения.",
    [OrderStatus.RiskLevelHigh]: "Высокий уровень риска. Заявка требует ручного рассмотрения.",
    [OrderStatus.RiskLevelAdditionalInfo]: "Требуется дополнительная информация для оценки рисков.",
    [OrderStatus.SbPending]: "Ожидание проверки службой безопасности. Ведется верификация данных.",
    [OrderStatus.SbRejected]: "Служба безопасности отклонила заявку. Причина: подозрительная активность.",
    [OrderStatus.SbAdded]: "Служба безопасности одобрила заявку. Данные верифицированы.",
    [OrderStatus.CourierPending]: "Ожидание подтверждения курьерской доставки. Выбор даты и времени.",
    [OrderStatus.CourierAccepted]: "Курьер назначен. Ожидайте доставки документов.",
    [OrderStatus.CourierRejected]: "Отказ курьерской доставки. Требуется выбрать другой способ.",
    [OrderStatus.DocumentsPending]: "Ожидание подписания документов клиентом.",
    [OrderStatus.DocumentSigned]: "Документы успешно подписаны. Юридически оформлено.",
    [OrderStatus.RegistrationPending]: "Подготовка к регистрации в реестре. Проверка данных.",
    [OrderStatus.RegistrationSent]: "Данные отправлены на регистрацию. Ожидание подтверждения.",
    [OrderStatus.RegistrationSuccess]: "Регистрация успешно завершена. Данные внесены в реестр.",
    [OrderStatus.RegistrationError]: "Ошибка при регистрации. Требуется повторная отправка.",
    [OrderStatus.RegistrationCancelPending]: "Инициирована отмена регистрации. Ожидание подтверждения.",
    [OrderStatus.RegistrationCancelSent]: "Запрос на отмену регистрации отправлен. Ожидание ответа."
};

export const transitionRequirements: Record<OrderStatus, string> = {
    [OrderStatus.Created]: "Для начала обработки требуется регистрация.",
    [OrderStatus.PassportChecking]: "Необходимо предоставить паспортные данные.",
    [OrderStatus.AntiFraudChecking]: "Требуется подтверждение личности в сервисе Антифрод.",
    [OrderStatus.RiskLevelPending]: "Ожидание оценки риска.",
    [OrderStatus.SbPending]: "Ожидание проверки СБ.",
    [OrderStatus.CourierPending]: "Нужно выбрать удобное время для визита курьера.",
    [OrderStatus.DocumentsPending]: "Требуется электронная подпись документов.",
    [OrderStatus.RegistrationPending]: "Необходима регистрация РФТ.",
    [OrderStatus.RegistrationCancelPending]: "Ожидание отмены в РФТ.",
    [OrderStatus.Canceled]: "Дальнейшие действия невозможны.",
    [OrderStatus.Completed]: "Процесс завершен успешно. Дополнительные действия не требуются.",
    [OrderStatus.PassportAccepted]: "Переход к следующему этапу автоматический.",
    [OrderStatus.PassportRejected]: "Паспортные данные отклонены.",
    [OrderStatus.AntiFraudAccepted]: "Переход к оценке рисков автоматический.",
    [OrderStatus.AntiFraudRejected]: "Антифрод заблокировал заявку.",
    [OrderStatus.RiskLevelLow]: "Автоматический переход далее.",
    [OrderStatus.RiskLevelMedium]: "Требуется дополнительная верификация проверкой СБ",
    [OrderStatus.RiskLevelHigh]: "Требуется дополнительная верификация проверкой СБ",
    [OrderStatus.RiskLevelAdditionalInfo]: "Загрузите недостающие документы.",
    [OrderStatus.SbRejected]: "Проверка СБ отклонила",
    [OrderStatus.SbAdded]: "Автоматический переход к организации доставки.",
    [OrderStatus.CourierAccepted]: "Ожидайте подтверждения от курьерской службы.",
    [OrderStatus.CourierRejected]: "Курьер отклонил",
    [OrderStatus.DocumentSigned]: "Автоматическая отправка на регистрацию.",
    [OrderStatus.RegistrationSent]: "Отправлено на регистрацию.",
    [OrderStatus.RegistrationSuccess]: "Процесс регистрации в РФТ завершен успешно.",
    [OrderStatus.RegistrationError]: "Исправьте ошибки и отправьте повторно.",
    [OrderStatus.RegistrationCancelSent]: "Ожидайте подтверждения отмены."
};
