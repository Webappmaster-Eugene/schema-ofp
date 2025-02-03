export enum OrderStatus {
    Created = "created",
    Canceled = "canceled",
    Completed = "completed",
    PassportChecking = "passport_checking",
    PassportAccepted = "passport_accepted",
    PassportRejected = "passport_rejected",
    AntiFraudChecking = "anti_fraud_checking",
    AntiFraudAccepted = "anti_fraud_accepted",
    AntiFraudRejected = "anti_fraud_rejected",
    RiskLevelPending = "risk_level_pending",
    RiskLevelLow = "risk_level_low",
    RiskLevelMedium = "risk_level_medium",
    RiskLevelHigh = "risk_level_high",
    RiskLevelAdditionalInfo = "risk_level_additional_info",
    SbPending = "sb_pending",
    SbRejected = "sb_rejected",
    SbAdded = "sb_added",
    CourierPending = "courier_pending",
    CourierAccepted = "courier_accepted",
    CourierRejected = "courier_rejected",
    DocumentsPending = "documents_pending",
    DocumentSigned = "document_signed",
    RegistrationPending = "registration_pending",
    RegistrationSent = "registration_sent",
    RegistrationSuccess = "registration_success",
    RegistrationError = "registration_error",
    RegistrationCancelPending = "registration_cancel_pending",
    RegistrationCancelSent = "registration_cancel_sent"
}

export type OrderHistoryItem = {
    status: OrderStatus;
    timestamp: string;
    description: string;
    additionalInfo?: string;
};

export type OrderData = {
    currentStatus: OrderStatus;
    history: OrderHistoryItem[];
    errorReasons?: Record<OrderStatus, string>;
};
