import { z } from 'zod';

declare const SecretKeySchema: z.ZodEffects<z.ZodString, string, string>;
type SecretKey = z.infer<typeof SecretKeySchema>;
declare const PublicKeySchema: z.ZodEffects<z.ZodString, string, string>;
type PublicKey = z.infer<typeof PublicKeySchema>;
declare const SecretOrPublicKeySchema: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodString, string, string>]>;
type SecretOrPublicKey = z.infer<typeof SecretOrPublicKeySchema>;
declare const AllowedPaymentMethodsSchema: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"dob_ubp">, z.ZodLiteral<"brankas_bdo">, z.ZodLiteral<"brankas_landbank">, z.ZodLiteral<"brankas_metrobank">, z.ZodLiteral<"qrph">, z.ZodLiteral<"billease">]>, "many">;
type AllowedPaymentMethods = z.infer<typeof AllowedPaymentMethodsSchema>;
declare const MetadataSchema: z.ZodRecord<z.ZodString, z.ZodAny>;
type Metadata = z.infer<typeof MetadataSchema>;
declare const TaxSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodLiteral<"PHP">;
    inclusive: z.ZodBoolean;
    name: z.ZodString;
    type: z.ZodString;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    inclusive: boolean;
    type: string;
    value: string;
    amount: number;
    currency: "PHP";
    name: string;
}, {
    inclusive: boolean;
    type: string;
    value: string;
    amount: number;
    currency: "PHP";
    name: string;
}>;
type Tax = z.infer<typeof TaxSchema>;

type QueryValue = string | number | boolean | undefined;
interface RequestOptions {
    headers?: Record<string, string>;
    query?: Record<string, QueryValue>;
    body?: unknown;
    signal?: AbortSignal;
}
interface ResponseEnvelope<T> {
    data: T;
}
interface HttpClient {
    get<T>(path: string, options?: Omit<RequestOptions, "body">): Promise<ResponseEnvelope<T>>;
    post<T>(path: string, options?: RequestOptions): Promise<ResponseEnvelope<T>>;
    put<T>(path: string, options?: RequestOptions): Promise<ResponseEnvelope<T>>;
    patch<T>(path: string, options?: RequestOptions): Promise<ResponseEnvelope<T>>;
    delete<T>(path: string, options?: Omit<RequestOptions, "body">): Promise<ResponseEnvelope<T>>;
}
declare class HttpError extends Error {
    readonly status: number;
    readonly code?: string;
    readonly details?: unknown;
    constructor(message: string, status: number, code?: string, details?: unknown);
}

declare const Paymongo: (key: SecretOrPublicKey, opts?: {
    client?: HttpClient;
    baseUrl?: string;
    headers?: Record<string, string>;
}) => {
    paymentMethod: {
        create: (data: {
            data: {
                attributes: {
                    type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
                    details?: {
                        card_number: string;
                        exp_month: number;
                        exp_year: number;
                        cvc: string;
                    } | undefined;
                    billing?: any;
                    metadata?: Record<string, any> | undefined;
                };
            };
        }) => Promise<{
            data: {
                attributes: {
                    type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
                    livemode: boolean;
                    details?: {
                        exp_month: number;
                        exp_year: number;
                        last4: string;
                    } | undefined;
                    billing?: any;
                    metadata?: Record<string, any> | undefined;
                };
            };
        }>;
        retrieve: (data: {
            id: string;
        }) => Promise<{
            data: {
                attributes: {
                    type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
                    livemode: boolean;
                    details?: {
                        exp_month: number;
                        exp_year: number;
                        last4: string;
                    } | undefined;
                    billing?: any;
                    metadata?: Record<string, any> | undefined;
                };
            };
        }>;
    };
    paymentIntent: {
        create: (data: {
            data: {
                attributes: {
                    amount: number;
                    currency: "PHP";
                    capture_type: "automatic";
                    payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
                    metadata?: any;
                    description?: string | undefined;
                    statement_descriptor?: string | undefined;
                    payment_method_options?: {
                        card: {
                            request_three_d_secure: "any";
                        };
                    } | undefined;
                };
            };
        }) => Promise<{
            type: "payment_intent";
            attributes: {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            };
            id: string;
        }>;
        retrieve: (data: {
            id: string;
            client_key: string;
        }) => Promise<{
            type: "payment_intent";
            attributes: {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            };
            id: string;
        }>;
        attach: (data: {
            data: {
                attributes: {
                    payment_method: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
                    client_key: string;
                    return_url?: string | undefined;
                };
            };
            id: string;
        }) => Promise<{
            type: "payment_intent";
            attributes: {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            };
            id: string;
        }>;
    };
    source: {
        create: (data: {
            data: {
                attributes: {
                    type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
                    amount: number;
                    currency: "PHP";
                    redirect: {
                        success: string;
                        failed: string;
                    };
                    billing?: any;
                    metadata?: Record<string, string | number | boolean> | undefined;
                };
            };
        }) => Promise<{
            type: "source";
            attributes: {
                type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
                status: "pending" | "chargeable" | "cancelled" | "expired" | "paid";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                redirect: {
                    success: string;
                    failed: string;
                };
                created_at: number;
                updated_at: number;
                billing?: any;
            };
            id: string;
        }>;
        retrieve: (data: {
            id: string;
        }) => Promise<{
            type: "source";
            attributes: {
                type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
                status: "pending" | "chargeable" | "cancelled" | "expired" | "paid";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                redirect: {
                    success: string;
                    failed: string;
                };
                created_at: number;
                updated_at: number;
                billing?: any;
            };
            id: string;
        }>;
    };
    payment: {
        create: (data: {
            data: {
                attributes: {
                    amount: number;
                    currency: "PHP";
                    source: {
                        type: "source";
                        id: string;
                    };
                    description?: string | undefined;
                    statement_descriptor?: string | undefined;
                };
            };
        }) => Promise<{
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }>;
        retrieve: (data: {
            id: string;
        }) => Promise<{
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }>;
        list: (data: {
            before?: string | undefined;
            after?: string | undefined;
            limit?: string | undefined;
        }) => Promise<{
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }[]>;
    };
    checkout: {
        create: (data: {
            data: {
                attributes: {
                    description: string | null;
                    line_items: {
                        amount: number;
                        currency: "PHP";
                        name: string;
                        description: string;
                        quantity: number;
                        images?: string[] | undefined;
                    }[];
                    payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
                    send_email_receipt: boolean;
                    show_description: boolean;
                    show_line_items: boolean;
                    billing?: {
                        name: string;
                        email: string;
                        phone: string;
                        address?: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        } | undefined;
                    } | undefined;
                    statement_descriptor?: string | undefined;
                    images?: string[] | undefined;
                    cancel_url?: string | undefined;
                    reference_number?: string | undefined;
                    success_url?: string | undefined;
                };
            };
        }) => Promise<{
            type: "checkout_session";
            attributes: {
                status: "active" | "inactive";
                billing: {
                    name: string;
                    email: string;
                    phone: string;
                    address?: {
                        country: string;
                        line1: string;
                        line2: string;
                        city: string;
                        state: string;
                        postal_code: string;
                    } | undefined;
                };
                metadata: Record<string, any> | null;
                created_at: number;
                updated_at: number;
                description: string | null;
                payment_intent: {
                    type: "payment_intent";
                    attributes: {
                        status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        created_at: number;
                        updated_at: number;
                        statement_descriptor: string;
                        capture_type: "automatic";
                        client_key: string;
                        payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                        payments: {
                            type: "payment";
                            attributes: {
                                status: "pending" | "paid" | "fail";
                                amount: number;
                                currency: "PHP";
                                livemode: boolean;
                                source: {
                                    type: "source";
                                    id: string;
                                    last4?: string | undefined;
                                    brand?: string | undefined;
                                    country?: string | undefined;
                                };
                                created_at: number;
                                updated_at: number;
                                balance_transaction_id: string;
                                disputed: boolean;
                                fee: number;
                                foreign_fee: number;
                                net_amount: number;
                                payout: number | null;
                                statement_descriptor: string | null;
                                refunds: any[];
                                taxes: {
                                    inclusive: boolean;
                                    type: string;
                                    value: string;
                                    amount: number;
                                    currency: "PHP";
                                    name: string;
                                }[];
                                available_at: number;
                                paid_at: number;
                                billing?: any;
                                access_url?: string | undefined;
                                description?: string | undefined;
                                external_reference_number?: string | undefined;
                                tax_amount?: number | undefined;
                            };
                            id: string;
                        }[];
                        next_action: {
                            type: "redirect";
                            redirect: {
                                url: string;
                                return_url: string;
                            };
                        } | null;
                        setup_future_usage: boolean | null;
                        metadata?: any;
                        description?: string | undefined;
                        last_payment_error?: {
                            payment: string;
                            failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                            failed_message: string;
                            payment_method: string;
                        } | undefined;
                        payment_method_options?: {
                            card: {
                                request_three_d_secure: "any";
                            };
                        } | undefined;
                    };
                    id: string;
                };
                client_key: string;
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                cancel_url: string;
                line_items: {
                    amount: number;
                    currency: "PHP";
                    name: string;
                    description: string;
                    quantity: number;
                    images?: string[] | undefined;
                }[];
                payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
                reference_number: string;
                send_email_receipt: boolean;
                show_description: boolean;
                show_line_items: boolean;
                success_url: string;
                billing_information_fields_editable: "enabled";
                checkout_url: string;
                live_mode: boolean;
                merchant: string;
            };
            id: string;
        }>;
        retrieve: (data: {
            checkout_session_id: string;
        }) => Promise<{
            type: "checkout_session";
            attributes: {
                status: "active" | "inactive";
                billing: {
                    name: string;
                    email: string;
                    phone: string;
                    address?: {
                        country: string;
                        line1: string;
                        line2: string;
                        city: string;
                        state: string;
                        postal_code: string;
                    } | undefined;
                };
                metadata: Record<string, any> | null;
                created_at: number;
                updated_at: number;
                description: string | null;
                payment_intent: {
                    type: "payment_intent";
                    attributes: {
                        status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        created_at: number;
                        updated_at: number;
                        statement_descriptor: string;
                        capture_type: "automatic";
                        client_key: string;
                        payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                        payments: {
                            type: "payment";
                            attributes: {
                                status: "pending" | "paid" | "fail";
                                amount: number;
                                currency: "PHP";
                                livemode: boolean;
                                source: {
                                    type: "source";
                                    id: string;
                                    last4?: string | undefined;
                                    brand?: string | undefined;
                                    country?: string | undefined;
                                };
                                created_at: number;
                                updated_at: number;
                                balance_transaction_id: string;
                                disputed: boolean;
                                fee: number;
                                foreign_fee: number;
                                net_amount: number;
                                payout: number | null;
                                statement_descriptor: string | null;
                                refunds: any[];
                                taxes: {
                                    inclusive: boolean;
                                    type: string;
                                    value: string;
                                    amount: number;
                                    currency: "PHP";
                                    name: string;
                                }[];
                                available_at: number;
                                paid_at: number;
                                billing?: any;
                                access_url?: string | undefined;
                                description?: string | undefined;
                                external_reference_number?: string | undefined;
                                tax_amount?: number | undefined;
                            };
                            id: string;
                        }[];
                        next_action: {
                            type: "redirect";
                            redirect: {
                                url: string;
                                return_url: string;
                            };
                        } | null;
                        setup_future_usage: boolean | null;
                        metadata?: any;
                        description?: string | undefined;
                        last_payment_error?: {
                            payment: string;
                            failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                            failed_message: string;
                            payment_method: string;
                        } | undefined;
                        payment_method_options?: {
                            card: {
                                request_three_d_secure: "any";
                            };
                        } | undefined;
                    };
                    id: string;
                };
                client_key: string;
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                cancel_url: string;
                line_items: {
                    amount: number;
                    currency: "PHP";
                    name: string;
                    description: string;
                    quantity: number;
                    images?: string[] | undefined;
                }[];
                payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
                reference_number: string;
                send_email_receipt: boolean;
                show_description: boolean;
                show_line_items: boolean;
                success_url: string;
                billing_information_fields_editable: "enabled";
                checkout_url: string;
                live_mode: boolean;
                merchant: string;
            };
            id: string;
        }>;
        expire: (data: {
            checkout_session_id: string;
        }) => Promise<{
            type: "checkout_session";
            attributes: {
                status: "active" | "inactive";
                billing: {
                    name: string;
                    email: string;
                    phone: string;
                    address?: {
                        country: string;
                        line1: string;
                        line2: string;
                        city: string;
                        state: string;
                        postal_code: string;
                    } | undefined;
                };
                metadata: Record<string, any> | null;
                created_at: number;
                updated_at: number;
                description: string | null;
                payment_intent: {
                    type: "payment_intent";
                    attributes: {
                        status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        created_at: number;
                        updated_at: number;
                        statement_descriptor: string;
                        capture_type: "automatic";
                        client_key: string;
                        payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                        payments: {
                            type: "payment";
                            attributes: {
                                status: "pending" | "paid" | "fail";
                                amount: number;
                                currency: "PHP";
                                livemode: boolean;
                                source: {
                                    type: "source";
                                    id: string;
                                    last4?: string | undefined;
                                    brand?: string | undefined;
                                    country?: string | undefined;
                                };
                                created_at: number;
                                updated_at: number;
                                balance_transaction_id: string;
                                disputed: boolean;
                                fee: number;
                                foreign_fee: number;
                                net_amount: number;
                                payout: number | null;
                                statement_descriptor: string | null;
                                refunds: any[];
                                taxes: {
                                    inclusive: boolean;
                                    type: string;
                                    value: string;
                                    amount: number;
                                    currency: "PHP";
                                    name: string;
                                }[];
                                available_at: number;
                                paid_at: number;
                                billing?: any;
                                access_url?: string | undefined;
                                description?: string | undefined;
                                external_reference_number?: string | undefined;
                                tax_amount?: number | undefined;
                            };
                            id: string;
                        }[];
                        next_action: {
                            type: "redirect";
                            redirect: {
                                url: string;
                                return_url: string;
                            };
                        } | null;
                        setup_future_usage: boolean | null;
                        metadata?: any;
                        description?: string | undefined;
                        last_payment_error?: {
                            payment: string;
                            failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                            failed_message: string;
                            payment_method: string;
                        } | undefined;
                        payment_method_options?: {
                            card: {
                                request_three_d_secure: "any";
                            };
                        } | undefined;
                    };
                    id: string;
                };
                client_key: string;
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                cancel_url: string;
                line_items: {
                    amount: number;
                    currency: "PHP";
                    name: string;
                    description: string;
                    quantity: number;
                    images?: string[] | undefined;
                }[];
                payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
                reference_number: string;
                send_email_receipt: boolean;
                show_description: boolean;
                show_line_items: boolean;
                success_url: string;
                billing_information_fields_editable: "enabled";
                checkout_url: string;
                live_mode: boolean;
                merchant: string;
            };
            id: string;
        }>;
    };
    refund: {
        create: (data: {
            data: {
                attributes: {
                    amount: number;
                    notes: string;
                    payment_id: string;
                    payout_id: null;
                    reason: string;
                };
            };
        }) => Promise<{
            data: {
                type: string;
                attributes: {
                    status: string;
                    amount: number;
                    currency: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
                    notes: string;
                    payment_id: string;
                    payout_id: null;
                    reason: string;
                };
                id: string;
            };
        }>;
        retrieve: (data: {
            id: string;
        }) => Promise<{
            data: {
                type: string;
                attributes: {
                    status: string;
                    amount: number;
                    currency: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
                    notes: string;
                    payment_id: string;
                    payout_id: null;
                    reason: string;
                };
                id: string;
            };
        }>;
    };
    customer: {
        create: (data: {
            data: {
                attributes: {
                    created_at: number;
                    updated_at: number;
                    email: string;
                    phone: string | null;
                    default_device: string;
                    default_payment_method_id: null;
                    first_name: string;
                    last_name: string;
                };
            };
        }) => Promise<{
            type: string;
            attributes: {
                livemode: boolean;
                created_at: number;
                updated_at: number;
                email: string;
                phone: string;
                default_device: string;
                default_payment_method_id: string | null;
                first_name: string;
                has_vaulted_payment_methods: boolean;
                last_name: string;
                organization_id?: string | undefined;
            };
            id: string;
        }>;
        retrieve: (data: {
            id: string;
            email?: string | undefined;
            phone_number?: string | undefined;
        }) => Promise<{
            type: string;
            attributes: {
                livemode: boolean;
                created_at: number;
                updated_at: number;
                email: string;
                phone: string;
                default_device: string;
                default_payment_method_id: string | null;
                first_name: string;
                has_vaulted_payment_methods: boolean;
                last_name: string;
                organization_id?: string | undefined;
            };
            id: string;
        }>;
        edit: (data: {
            data: {
                attributes: {
                    email: string;
                    phone: string;
                    default_device: string;
                    first_name: string;
                    last_name: string;
                };
            };
            id: string;
        }) => Promise<{
            type: string;
            attributes: {
                livemode: boolean;
                created_at: number;
                updated_at: number;
                email: string;
                phone: string;
                default_device: string;
                default_payment_method_id: string | null;
                first_name: string;
                has_vaulted_payment_methods: boolean;
                last_name: string;
                organization_id?: string | undefined;
            };
            id: string;
        }>;
        delete: (data: {
            id: string;
        }) => Promise<{
            type: string;
            attributes: {
                livemode: boolean;
                created_at: number;
                updated_at: number;
                email: string;
                phone: string;
                default_device: string;
                default_payment_method_id: string | null;
                first_name: string;
                has_vaulted_payment_methods: boolean;
                last_name: string;
                organization_id?: string | undefined;
            };
            id: string;
        }>;
    };
    webhook: {
        create: (data: {
            url: string;
            events: string[];
        }) => Promise<{
            data: {
                type: string;
                attributes: {
                    status: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
                    url: string;
                    secret_key: string;
                    events: string[];
                };
                id: string;
            };
        }>;
        retrieve: (data: {
            id: string;
        }) => Promise<{
            data: {
                type: string;
                attributes: {
                    status: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
                    url: string;
                    secret_key: string;
                    events: string[];
                };
                id: string;
            };
        }>;
        list: () => Promise<{
            data: {
                type: string;
                attributes: {
                    status: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
                    url: string;
                    secret_key: string;
                    events: string[];
                };
                id: string;
            };
        }[]>;
        enable: (data: {
            id: string;
        }) => Promise<{
            data: {
                type: string;
                attributes: {
                    status: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
                    url: string;
                    secret_key: string;
                    events: string[];
                };
                id: string;
            };
        }>;
        disable: (data: {
            id: string;
        }) => Promise<{
            data: {
                type: string;
                attributes: {
                    status: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
                    url: string;
                    secret_key: string;
                    events: string[];
                };
                id: string;
            };
        }>;
        update: (data: {
            data: {
                url: string;
                events: string[];
            };
            id: string;
        }) => Promise<{
            data: {
                type: string;
                attributes: {
                    status: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
                    url: string;
                    secret_key: string;
                    events: string[];
                };
                id: string;
            };
        }>;
    };
    link: {
        create: (data: {
            data: {
                attributes: {
                    amount: number;
                    description: string;
                    remarks: string;
                };
            };
        }) => Promise<{
            type: string;
            attributes: {
                status: string;
                amount: number;
                currency: string;
                livemode: boolean;
                created_at: number;
                updated_at: number;
                description: string;
                fee: number;
                tax_amount: number;
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: string;
                    name: string;
                }[];
                payments: {
                    data: {
                        type: string;
                        attributes: {
                            status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                            amount: number;
                            currency: string;
                            billing: {
                                name: string;
                                address: {
                                    country: string;
                                    line1: string;
                                    line2: string;
                                    city: string;
                                    state: string;
                                    postal_code: string;
                                };
                                email: string;
                                phone: string;
                            };
                            livemode: boolean;
                            source: {
                                type: string;
                                id: string;
                            };
                            created_at: number;
                            updated_at: number;
                            access_url: null;
                            balance_transaction_id: string;
                            description: string;
                            disputed: boolean;
                            external_reference_number: string;
                            fee: number;
                            net_amount: number;
                            payout: null;
                            statement_descriptor: string;
                            tax_amount: number;
                            refunds: {
                                type: string;
                                attributes: {
                                    status: string;
                                    amount: number;
                                    currency: string;
                                    metadata: null;
                                    livemode: boolean;
                                    created_at: number;
                                    updated_at: number;
                                    balance_transaction_id: string;
                                    available_at: number;
                                    notes: null;
                                    payment_id: string;
                                    payout_id: null;
                                    reason: string;
                                };
                                id: string;
                            }[];
                            taxes: {
                                inclusive: boolean;
                                type: string;
                                value: string;
                                amount: number;
                                currency: string;
                                name: string;
                            }[];
                            available_at: number;
                            paid_at: number;
                            origin: string;
                            payment_intent_id: null;
                        };
                        id: string;
                    };
                }[];
                reference_number: string;
                checkout_url: string;
                archived: boolean;
                remarks: string;
            };
            id: string;
        }>;
        retrieve: (data: {
            id: string;
        }) => Promise<{
            type: string;
            attributes: {
                status: string;
                amount: number;
                currency: string;
                livemode: boolean;
                created_at: number;
                updated_at: number;
                description: string;
                fee: number;
                tax_amount: number;
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: string;
                    name: string;
                }[];
                payments: {
                    data: {
                        type: string;
                        attributes: {
                            status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                            amount: number;
                            currency: string;
                            billing: {
                                name: string;
                                address: {
                                    country: string;
                                    line1: string;
                                    line2: string;
                                    city: string;
                                    state: string;
                                    postal_code: string;
                                };
                                email: string;
                                phone: string;
                            };
                            livemode: boolean;
                            source: {
                                type: string;
                                id: string;
                            };
                            created_at: number;
                            updated_at: number;
                            access_url: null;
                            balance_transaction_id: string;
                            description: string;
                            disputed: boolean;
                            external_reference_number: string;
                            fee: number;
                            net_amount: number;
                            payout: null;
                            statement_descriptor: string;
                            tax_amount: number;
                            refunds: {
                                type: string;
                                attributes: {
                                    status: string;
                                    amount: number;
                                    currency: string;
                                    metadata: null;
                                    livemode: boolean;
                                    created_at: number;
                                    updated_at: number;
                                    balance_transaction_id: string;
                                    available_at: number;
                                    notes: null;
                                    payment_id: string;
                                    payout_id: null;
                                    reason: string;
                                };
                                id: string;
                            }[];
                            taxes: {
                                inclusive: boolean;
                                type: string;
                                value: string;
                                amount: number;
                                currency: string;
                                name: string;
                            }[];
                            available_at: number;
                            paid_at: number;
                            origin: string;
                            payment_intent_id: null;
                        };
                        id: string;
                    };
                }[];
                reference_number: string;
                checkout_url: string;
                archived: boolean;
                remarks: string;
            };
            id: string;
        }>;
        getByReferenceNumber: (data: {
            reference_number: string;
        }) => Promise<{
            type: string;
            attributes: {
                status: string;
                amount: number;
                currency: string;
                livemode: boolean;
                created_at: number;
                updated_at: number;
                description: string;
                fee: number;
                tax_amount: number;
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: string;
                    name: string;
                }[];
                payments: {
                    data: {
                        type: string;
                        attributes: {
                            status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                            amount: number;
                            currency: string;
                            billing: {
                                name: string;
                                address: {
                                    country: string;
                                    line1: string;
                                    line2: string;
                                    city: string;
                                    state: string;
                                    postal_code: string;
                                };
                                email: string;
                                phone: string;
                            };
                            livemode: boolean;
                            source: {
                                type: string;
                                id: string;
                            };
                            created_at: number;
                            updated_at: number;
                            access_url: null;
                            balance_transaction_id: string;
                            description: string;
                            disputed: boolean;
                            external_reference_number: string;
                            fee: number;
                            net_amount: number;
                            payout: null;
                            statement_descriptor: string;
                            tax_amount: number;
                            refunds: {
                                type: string;
                                attributes: {
                                    status: string;
                                    amount: number;
                                    currency: string;
                                    metadata: null;
                                    livemode: boolean;
                                    created_at: number;
                                    updated_at: number;
                                    balance_transaction_id: string;
                                    available_at: number;
                                    notes: null;
                                    payment_id: string;
                                    payout_id: null;
                                    reason: string;
                                };
                                id: string;
                            }[];
                            taxes: {
                                inclusive: boolean;
                                type: string;
                                value: string;
                                amount: number;
                                currency: string;
                                name: string;
                            }[];
                            available_at: number;
                            paid_at: number;
                            origin: string;
                            payment_intent_id: null;
                        };
                        id: string;
                    };
                }[];
                reference_number: string;
                checkout_url: string;
                archived: boolean;
                remarks: string;
            };
            id: string;
        }>;
        archive: (data: {
            id: string;
        }) => Promise<{
            type: string;
            attributes: {
                status: string;
                amount: number;
                currency: string;
                livemode: boolean;
                created_at: number;
                updated_at: number;
                description: string;
                fee: number;
                tax_amount: number;
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: string;
                    name: string;
                }[];
                payments: {
                    data: {
                        type: string;
                        attributes: {
                            status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                            amount: number;
                            currency: string;
                            billing: {
                                name: string;
                                address: {
                                    country: string;
                                    line1: string;
                                    line2: string;
                                    city: string;
                                    state: string;
                                    postal_code: string;
                                };
                                email: string;
                                phone: string;
                            };
                            livemode: boolean;
                            source: {
                                type: string;
                                id: string;
                            };
                            created_at: number;
                            updated_at: number;
                            access_url: null;
                            balance_transaction_id: string;
                            description: string;
                            disputed: boolean;
                            external_reference_number: string;
                            fee: number;
                            net_amount: number;
                            payout: null;
                            statement_descriptor: string;
                            tax_amount: number;
                            refunds: {
                                type: string;
                                attributes: {
                                    status: string;
                                    amount: number;
                                    currency: string;
                                    metadata: null;
                                    livemode: boolean;
                                    created_at: number;
                                    updated_at: number;
                                    balance_transaction_id: string;
                                    available_at: number;
                                    notes: null;
                                    payment_id: string;
                                    payout_id: null;
                                    reason: string;
                                };
                                id: string;
                            }[];
                            taxes: {
                                inclusive: boolean;
                                type: string;
                                value: string;
                                amount: number;
                                currency: string;
                                name: string;
                            }[];
                            available_at: number;
                            paid_at: number;
                            origin: string;
                            payment_intent_id: null;
                        };
                        id: string;
                    };
                }[];
                reference_number: string;
                checkout_url: string;
                archived: boolean;
                remarks: string;
            };
            id: string;
        }>;
        unarchive: (data: {
            id: string;
        }) => Promise<{
            type: string;
            attributes: {
                status: string;
                amount: number;
                currency: string;
                livemode: boolean;
                created_at: number;
                updated_at: number;
                description: string;
                fee: number;
                tax_amount: number;
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: string;
                    name: string;
                }[];
                payments: {
                    data: {
                        type: string;
                        attributes: {
                            status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                            amount: number;
                            currency: string;
                            billing: {
                                name: string;
                                address: {
                                    country: string;
                                    line1: string;
                                    line2: string;
                                    city: string;
                                    state: string;
                                    postal_code: string;
                                };
                                email: string;
                                phone: string;
                            };
                            livemode: boolean;
                            source: {
                                type: string;
                                id: string;
                            };
                            created_at: number;
                            updated_at: number;
                            access_url: null;
                            balance_transaction_id: string;
                            description: string;
                            disputed: boolean;
                            external_reference_number: string;
                            fee: number;
                            net_amount: number;
                            payout: null;
                            statement_descriptor: string;
                            tax_amount: number;
                            refunds: {
                                type: string;
                                attributes: {
                                    status: string;
                                    amount: number;
                                    currency: string;
                                    metadata: null;
                                    livemode: boolean;
                                    created_at: number;
                                    updated_at: number;
                                    balance_transaction_id: string;
                                    available_at: number;
                                    notes: null;
                                    payment_id: string;
                                    payout_id: null;
                                    reason: string;
                                };
                                id: string;
                            }[];
                            taxes: {
                                inclusive: boolean;
                                type: string;
                                value: string;
                                amount: number;
                                currency: string;
                                name: string;
                            }[];
                            available_at: number;
                            paid_at: number;
                            origin: string;
                            payment_intent_id: null;
                        };
                        id: string;
                    };
                }[];
                reference_number: string;
                checkout_url: string;
                archived: boolean;
                remarks: string;
            };
            id: string;
        }>;
    };
};

type HeadersRecord = Record<string, string>;
declare const createFetchClient: (baseUrl?: string, defaultHeaders?: HeadersRecord) => HttpClient;

declare const CheckoutParamsSchema: z.ZodObject<{
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            billing: z.ZodOptional<z.ZodObject<{
                address: z.ZodOptional<z.ZodObject<{
                    line1: z.ZodString;
                    line2: z.ZodString;
                    city: z.ZodString;
                    state: z.ZodString;
                    postal_code: z.ZodString;
                    country: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    country: string;
                    line1: string;
                    line2: string;
                    city: string;
                    state: string;
                    postal_code: string;
                }, {
                    country: string;
                    line1: string;
                    line2: string;
                    city: string;
                    state: string;
                    postal_code: string;
                }>>;
                name: z.ZodString;
                email: z.ZodString;
                phone: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                email: string;
                phone: string;
                address?: {
                    country: string;
                    line1: string;
                    line2: string;
                    city: string;
                    state: string;
                    postal_code: string;
                } | undefined;
            }, {
                name: string;
                email: string;
                phone: string;
                address?: {
                    country: string;
                    line1: string;
                    line2: string;
                    city: string;
                    state: string;
                    postal_code: string;
                } | undefined;
            }>>;
            cancel_url: z.ZodOptional<z.ZodString>;
            description: z.ZodNullable<z.ZodString>;
            images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            line_items: z.ZodArray<z.ZodObject<{
                amount: z.ZodNumber;
                currency: z.ZodLiteral<"PHP">;
                description: z.ZodString;
                images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                name: z.ZodString;
                quantity: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                amount: number;
                currency: "PHP";
                name: string;
                description: string;
                quantity: number;
                images?: string[] | undefined;
            }, {
                amount: number;
                currency: "PHP";
                name: string;
                description: string;
                quantity: number;
                images?: string[] | undefined;
            }>, "many">;
            payment_method_types: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"dob_ubp">, z.ZodLiteral<"brankas_bdo">, z.ZodLiteral<"brankas_landbank">, z.ZodLiteral<"brankas_metrobank">, z.ZodLiteral<"qrph">, z.ZodLiteral<"billease">]>, "many">;
            reference_number: z.ZodOptional<z.ZodString>;
            send_email_receipt: z.ZodDefault<z.ZodBoolean>;
            show_description: z.ZodDefault<z.ZodBoolean>;
            show_line_items: z.ZodDefault<z.ZodBoolean>;
            success_url: z.ZodOptional<z.ZodString>;
            statement_descriptor: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            description: string | null;
            line_items: {
                amount: number;
                currency: "PHP";
                name: string;
                description: string;
                quantity: number;
                images?: string[] | undefined;
            }[];
            payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            send_email_receipt: boolean;
            show_description: boolean;
            show_line_items: boolean;
            billing?: {
                name: string;
                email: string;
                phone: string;
                address?: {
                    country: string;
                    line1: string;
                    line2: string;
                    city: string;
                    state: string;
                    postal_code: string;
                } | undefined;
            } | undefined;
            statement_descriptor?: string | undefined;
            images?: string[] | undefined;
            cancel_url?: string | undefined;
            reference_number?: string | undefined;
            success_url?: string | undefined;
        }, {
            description: string | null;
            line_items: {
                amount: number;
                currency: "PHP";
                name: string;
                description: string;
                quantity: number;
                images?: string[] | undefined;
            }[];
            payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            billing?: {
                name: string;
                email: string;
                phone: string;
                address?: {
                    country: string;
                    line1: string;
                    line2: string;
                    city: string;
                    state: string;
                    postal_code: string;
                } | undefined;
            } | undefined;
            statement_descriptor?: string | undefined;
            images?: string[] | undefined;
            cancel_url?: string | undefined;
            reference_number?: string | undefined;
            send_email_receipt?: boolean | undefined;
            show_description?: boolean | undefined;
            show_line_items?: boolean | undefined;
            success_url?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            description: string | null;
            line_items: {
                amount: number;
                currency: "PHP";
                name: string;
                description: string;
                quantity: number;
                images?: string[] | undefined;
            }[];
            payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            send_email_receipt: boolean;
            show_description: boolean;
            show_line_items: boolean;
            billing?: {
                name: string;
                email: string;
                phone: string;
                address?: {
                    country: string;
                    line1: string;
                    line2: string;
                    city: string;
                    state: string;
                    postal_code: string;
                } | undefined;
            } | undefined;
            statement_descriptor?: string | undefined;
            images?: string[] | undefined;
            cancel_url?: string | undefined;
            reference_number?: string | undefined;
            success_url?: string | undefined;
        };
    }, {
        attributes: {
            description: string | null;
            line_items: {
                amount: number;
                currency: "PHP";
                name: string;
                description: string;
                quantity: number;
                images?: string[] | undefined;
            }[];
            payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            billing?: {
                name: string;
                email: string;
                phone: string;
                address?: {
                    country: string;
                    line1: string;
                    line2: string;
                    city: string;
                    state: string;
                    postal_code: string;
                } | undefined;
            } | undefined;
            statement_descriptor?: string | undefined;
            images?: string[] | undefined;
            cancel_url?: string | undefined;
            reference_number?: string | undefined;
            send_email_receipt?: boolean | undefined;
            show_description?: boolean | undefined;
            show_line_items?: boolean | undefined;
            success_url?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            description: string | null;
            line_items: {
                amount: number;
                currency: "PHP";
                name: string;
                description: string;
                quantity: number;
                images?: string[] | undefined;
            }[];
            payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            send_email_receipt: boolean;
            show_description: boolean;
            show_line_items: boolean;
            billing?: {
                name: string;
                email: string;
                phone: string;
                address?: {
                    country: string;
                    line1: string;
                    line2: string;
                    city: string;
                    state: string;
                    postal_code: string;
                } | undefined;
            } | undefined;
            statement_descriptor?: string | undefined;
            images?: string[] | undefined;
            cancel_url?: string | undefined;
            reference_number?: string | undefined;
            success_url?: string | undefined;
        };
    };
}, {
    data: {
        attributes: {
            description: string | null;
            line_items: {
                amount: number;
                currency: "PHP";
                name: string;
                description: string;
                quantity: number;
                images?: string[] | undefined;
            }[];
            payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            billing?: {
                name: string;
                email: string;
                phone: string;
                address?: {
                    country: string;
                    line1: string;
                    line2: string;
                    city: string;
                    state: string;
                    postal_code: string;
                } | undefined;
            } | undefined;
            statement_descriptor?: string | undefined;
            images?: string[] | undefined;
            cancel_url?: string | undefined;
            reference_number?: string | undefined;
            send_email_receipt?: boolean | undefined;
            show_description?: boolean | undefined;
            show_line_items?: boolean | undefined;
            success_url?: string | undefined;
        };
    };
}>;
type CheckoutParams = z.infer<typeof CheckoutParamsSchema>;
declare const CheckoutResourceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"checkout_session">;
    attributes: z.ZodObject<{
        billing: z.ZodObject<{
            address: z.ZodOptional<z.ZodObject<{
                line1: z.ZodString;
                line2: z.ZodString;
                city: z.ZodString;
                state: z.ZodString;
                postal_code: z.ZodString;
                country: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                country: string;
                line1: string;
                line2: string;
                city: string;
                state: string;
                postal_code: string;
            }, {
                country: string;
                line1: string;
                line2: string;
                city: string;
                state: string;
                postal_code: string;
            }>>;
            name: z.ZodString;
            email: z.ZodString;
            phone: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email: string;
            phone: string;
            address?: {
                country: string;
                line1: string;
                line2: string;
                city: string;
                state: string;
                postal_code: string;
            } | undefined;
        }, {
            name: string;
            email: string;
            phone: string;
            address?: {
                country: string;
                line1: string;
                line2: string;
                city: string;
                state: string;
                postal_code: string;
            } | undefined;
        }>;
        billing_information_fields_editable: z.ZodLiteral<"enabled">;
        cancel_url: z.ZodString;
        checkout_url: z.ZodString;
        client_key: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
        line_items: z.ZodArray<z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodLiteral<"PHP">;
            description: z.ZodString;
            images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            name: z.ZodString;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            currency: "PHP";
            name: string;
            description: string;
            quantity: number;
            images?: string[] | undefined;
        }, {
            amount: number;
            currency: "PHP";
            name: string;
            description: string;
            quantity: number;
            images?: string[] | undefined;
        }>, "many">;
        live_mode: z.ZodBoolean;
        merchant: z.ZodString;
        payments: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"payment">;
            attributes: z.ZodObject<{
                access_url: z.ZodOptional<z.ZodString>;
                amount: z.ZodNumber;
                balance_transaction_id: z.ZodString;
                billing: z.ZodOptional<z.ZodAny>;
                currency: z.ZodLiteral<"PHP">;
                description: z.ZodOptional<z.ZodString>;
                disputed: z.ZodBoolean;
                external_reference_number: z.ZodOptional<z.ZodString>;
                fee: z.ZodNumber;
                foreign_fee: z.ZodNumber;
                livemode: z.ZodBoolean;
                net_amount: z.ZodNumber;
                payout: z.ZodNullable<z.ZodNumber>;
                source: z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"source">;
                }, {
                    brand: z.ZodOptional<z.ZodString>;
                    country: z.ZodOptional<z.ZodString>;
                    last4: z.ZodOptional<z.ZodString>;
                }>, "strip", z.ZodTypeAny, {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                }, {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                }>;
                statement_descriptor: z.ZodNullable<z.ZodString>;
                status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"paid">, z.ZodLiteral<"fail">]>;
                tax_amount: z.ZodUnion<[z.ZodNumber, z.ZodUndefined]>;
                refunds: z.ZodArray<z.ZodAny, "many">;
                taxes: z.ZodArray<z.ZodObject<{
                    amount: z.ZodNumber;
                    currency: z.ZodLiteral<"PHP">;
                    inclusive: z.ZodBoolean;
                    name: z.ZodString;
                    type: z.ZodString;
                    value: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }, {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }>, "many">;
                available_at: z.ZodNumber;
                created_at: z.ZodNumber;
                paid_at: z.ZodNumber;
                updated_at: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            }, {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }, {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }>, "many">;
        payment_intent: z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"payment_intent">;
            attributes: z.ZodObject<{
                amount: z.ZodNumber;
                capture_type: z.ZodLiteral<"automatic">;
                client_key: z.ZodString;
                currency: z.ZodLiteral<"PHP">;
                description: z.ZodOptional<z.ZodString>;
                livemode: z.ZodBoolean;
                statement_descriptor: z.ZodString;
                status: z.ZodUnion<[z.ZodLiteral<"awaiting_payment_method">, z.ZodLiteral<"awaiting_next_action">, z.ZodLiteral<"processing">, z.ZodLiteral<"succeeded">]>;
                created_at: z.ZodNumber;
                updated_at: z.ZodNumber;
                last_payment_error: z.ZodOptional<z.ZodObject<{
                    payment: z.ZodString;
                    failed_code: z.ZodUnion<[z.ZodLiteral<"card_expired">, z.ZodLiteral<"cvc_invalid">, z.ZodLiteral<"generic_decline">, z.ZodLiteral<"fraudulent">, z.ZodLiteral<"insufficient_funds">, z.ZodLiteral<"processor_blocked">, z.ZodLiteral<"lost_card">, z.ZodLiteral<"stolen_card">, z.ZodLiteral<"processor_unavailable">, z.ZodLiteral<"blocked">]>;
                    failed_message: z.ZodString;
                    payment_method: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                }, {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                }>>;
                payment_method_allowed: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"brankas">, z.ZodLiteral<"billease">]>, "many">;
                payments: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"payment">;
                    attributes: z.ZodObject<{
                        access_url: z.ZodOptional<z.ZodString>;
                        amount: z.ZodNumber;
                        balance_transaction_id: z.ZodString;
                        billing: z.ZodOptional<z.ZodAny>;
                        currency: z.ZodLiteral<"PHP">;
                        description: z.ZodOptional<z.ZodString>;
                        disputed: z.ZodBoolean;
                        external_reference_number: z.ZodOptional<z.ZodString>;
                        fee: z.ZodNumber;
                        foreign_fee: z.ZodNumber;
                        livemode: z.ZodBoolean;
                        net_amount: z.ZodNumber;
                        payout: z.ZodNullable<z.ZodNumber>;
                        source: z.ZodObject<z.objectUtil.extendShape<{
                            id: z.ZodString;
                            type: z.ZodLiteral<"source">;
                        }, {
                            brand: z.ZodOptional<z.ZodString>;
                            country: z.ZodOptional<z.ZodString>;
                            last4: z.ZodOptional<z.ZodString>;
                        }>, "strip", z.ZodTypeAny, {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        }, {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        }>;
                        statement_descriptor: z.ZodNullable<z.ZodString>;
                        status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"paid">, z.ZodLiteral<"fail">]>;
                        tax_amount: z.ZodUnion<[z.ZodNumber, z.ZodUndefined]>;
                        refunds: z.ZodArray<z.ZodAny, "many">;
                        taxes: z.ZodArray<z.ZodObject<{
                            amount: z.ZodNumber;
                            currency: z.ZodLiteral<"PHP">;
                            inclusive: z.ZodBoolean;
                            name: z.ZodString;
                            type: z.ZodString;
                            value: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }, {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }>, "many">;
                        available_at: z.ZodNumber;
                        created_at: z.ZodNumber;
                        paid_at: z.ZodNumber;
                        updated_at: z.ZodNumber;
                    }, "strip", z.ZodTypeAny, {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    }, {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }, {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }>, "many">;
                next_action: z.ZodNullable<z.ZodObject<{
                    type: z.ZodLiteral<"redirect">;
                    redirect: z.ZodObject<{
                        url: z.ZodString;
                        return_url: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        url: string;
                        return_url: string;
                    }, {
                        url: string;
                        return_url: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                }, {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                }>>;
                payment_method_options: z.ZodOptional<z.ZodObject<{
                    card: z.ZodObject<{
                        request_three_d_secure: z.ZodLiteral<"any">;
                    }, "strip", z.ZodTypeAny, {
                        request_three_d_secure: "any";
                    }, {
                        request_three_d_secure: "any";
                    }>;
                }, "strip", z.ZodTypeAny, {
                    card: {
                        request_three_d_secure: "any";
                    };
                }, {
                    card: {
                        request_three_d_secure: "any";
                    };
                }>>;
                metadata: z.ZodUnion<[z.ZodAny, z.ZodAny]>;
                setup_future_usage: z.ZodNullable<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            }, {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "payment_intent";
            attributes: {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            };
            id: string;
        }, {
            type: "payment_intent";
            attributes: {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            };
            id: string;
        }>;
        payment_method_types: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"dob_ubp">, z.ZodLiteral<"brankas_bdo">, z.ZodLiteral<"brankas_landbank">, z.ZodLiteral<"brankas_metrobank">, z.ZodLiteral<"qrph">, z.ZodLiteral<"billease">]>, "many">;
        reference_number: z.ZodString;
        send_email_receipt: z.ZodDefault<z.ZodBoolean>;
        show_description: z.ZodDefault<z.ZodBoolean>;
        show_line_items: z.ZodDefault<z.ZodBoolean>;
        status: z.ZodUnion<[z.ZodLiteral<"active">, z.ZodLiteral<"inactive">]>;
        success_url: z.ZodString;
        created_at: z.ZodNumber;
        updated_at: z.ZodNumber;
        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "inactive";
        billing: {
            name: string;
            email: string;
            phone: string;
            address?: {
                country: string;
                line1: string;
                line2: string;
                city: string;
                state: string;
                postal_code: string;
            } | undefined;
        };
        metadata: Record<string, any> | null;
        created_at: number;
        updated_at: number;
        description: string | null;
        payment_intent: {
            type: "payment_intent";
            attributes: {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            };
            id: string;
        };
        client_key: string;
        payments: {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }[];
        cancel_url: string;
        line_items: {
            amount: number;
            currency: "PHP";
            name: string;
            description: string;
            quantity: number;
            images?: string[] | undefined;
        }[];
        payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
        reference_number: string;
        send_email_receipt: boolean;
        show_description: boolean;
        show_line_items: boolean;
        success_url: string;
        billing_information_fields_editable: "enabled";
        checkout_url: string;
        live_mode: boolean;
        merchant: string;
    }, {
        status: "active" | "inactive";
        billing: {
            name: string;
            email: string;
            phone: string;
            address?: {
                country: string;
                line1: string;
                line2: string;
                city: string;
                state: string;
                postal_code: string;
            } | undefined;
        };
        metadata: Record<string, any> | null;
        created_at: number;
        updated_at: number;
        description: string | null;
        payment_intent: {
            type: "payment_intent";
            attributes: {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            };
            id: string;
        };
        client_key: string;
        payments: {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }[];
        cancel_url: string;
        line_items: {
            amount: number;
            currency: "PHP";
            name: string;
            description: string;
            quantity: number;
            images?: string[] | undefined;
        }[];
        payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
        reference_number: string;
        success_url: string;
        billing_information_fields_editable: "enabled";
        checkout_url: string;
        live_mode: boolean;
        merchant: string;
        send_email_receipt?: boolean | undefined;
        show_description?: boolean | undefined;
        show_line_items?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "checkout_session";
    attributes: {
        status: "active" | "inactive";
        billing: {
            name: string;
            email: string;
            phone: string;
            address?: {
                country: string;
                line1: string;
                line2: string;
                city: string;
                state: string;
                postal_code: string;
            } | undefined;
        };
        metadata: Record<string, any> | null;
        created_at: number;
        updated_at: number;
        description: string | null;
        payment_intent: {
            type: "payment_intent";
            attributes: {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            };
            id: string;
        };
        client_key: string;
        payments: {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }[];
        cancel_url: string;
        line_items: {
            amount: number;
            currency: "PHP";
            name: string;
            description: string;
            quantity: number;
            images?: string[] | undefined;
        }[];
        payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
        reference_number: string;
        send_email_receipt: boolean;
        show_description: boolean;
        show_line_items: boolean;
        success_url: string;
        billing_information_fields_editable: "enabled";
        checkout_url: string;
        live_mode: boolean;
        merchant: string;
    };
    id: string;
}, {
    type: "checkout_session";
    attributes: {
        status: "active" | "inactive";
        billing: {
            name: string;
            email: string;
            phone: string;
            address?: {
                country: string;
                line1: string;
                line2: string;
                city: string;
                state: string;
                postal_code: string;
            } | undefined;
        };
        metadata: Record<string, any> | null;
        created_at: number;
        updated_at: number;
        description: string | null;
        payment_intent: {
            type: "payment_intent";
            attributes: {
                status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                created_at: number;
                updated_at: number;
                statement_descriptor: string;
                capture_type: "automatic";
                client_key: string;
                payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
                payments: {
                    type: "payment";
                    attributes: {
                        status: "pending" | "paid" | "fail";
                        amount: number;
                        currency: "PHP";
                        livemode: boolean;
                        source: {
                            type: "source";
                            id: string;
                            last4?: string | undefined;
                            brand?: string | undefined;
                            country?: string | undefined;
                        };
                        created_at: number;
                        updated_at: number;
                        balance_transaction_id: string;
                        disputed: boolean;
                        fee: number;
                        foreign_fee: number;
                        net_amount: number;
                        payout: number | null;
                        statement_descriptor: string | null;
                        refunds: any[];
                        taxes: {
                            inclusive: boolean;
                            type: string;
                            value: string;
                            amount: number;
                            currency: "PHP";
                            name: string;
                        }[];
                        available_at: number;
                        paid_at: number;
                        billing?: any;
                        access_url?: string | undefined;
                        description?: string | undefined;
                        external_reference_number?: string | undefined;
                        tax_amount?: number | undefined;
                    };
                    id: string;
                }[];
                next_action: {
                    type: "redirect";
                    redirect: {
                        url: string;
                        return_url: string;
                    };
                } | null;
                setup_future_usage: boolean | null;
                metadata?: any;
                description?: string | undefined;
                last_payment_error?: {
                    payment: string;
                    failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
                    failed_message: string;
                    payment_method: string;
                } | undefined;
                payment_method_options?: {
                    card: {
                        request_three_d_secure: "any";
                    };
                } | undefined;
            };
            id: string;
        };
        client_key: string;
        payments: {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }[];
        cancel_url: string;
        line_items: {
            amount: number;
            currency: "PHP";
            name: string;
            description: string;
            quantity: number;
            images?: string[] | undefined;
        }[];
        payment_method_types: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
        reference_number: string;
        success_url: string;
        billing_information_fields_editable: "enabled";
        checkout_url: string;
        live_mode: boolean;
        merchant: string;
        send_email_receipt?: boolean | undefined;
        show_description?: boolean | undefined;
        show_line_items?: boolean | undefined;
    };
    id: string;
}>;
type CheckoutResource = z.infer<typeof CheckoutResourceSchema>;
declare const RetrieveCheckoutParamsSchema: z.ZodObject<{
    checkout_session_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    checkout_session_id: string;
}, {
    checkout_session_id: string;
}>;
type RetrieveCheckoutParams = z.infer<typeof RetrieveCheckoutParamsSchema>;
declare const ExpireCheckoutParamsSchema: z.ZodObject<{
    checkout_session_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    checkout_session_id: string;
}, {
    checkout_session_id: string;
}>;
type ExpireCheckoutParams = z.infer<typeof ExpireCheckoutParamsSchema>;

declare const PaymentResourceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"payment">;
    attributes: z.ZodObject<{
        access_url: z.ZodOptional<z.ZodString>;
        amount: z.ZodNumber;
        balance_transaction_id: z.ZodString;
        billing: z.ZodOptional<z.ZodAny>;
        currency: z.ZodLiteral<"PHP">;
        description: z.ZodOptional<z.ZodString>;
        disputed: z.ZodBoolean;
        external_reference_number: z.ZodOptional<z.ZodString>;
        fee: z.ZodNumber;
        foreign_fee: z.ZodNumber;
        livemode: z.ZodBoolean;
        net_amount: z.ZodNumber;
        payout: z.ZodNullable<z.ZodNumber>;
        source: z.ZodObject<z.objectUtil.extendShape<{
            id: z.ZodString;
            type: z.ZodLiteral<"source">;
        }, {
            brand: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            last4: z.ZodOptional<z.ZodString>;
        }>, "strip", z.ZodTypeAny, {
            type: "source";
            id: string;
            last4?: string | undefined;
            brand?: string | undefined;
            country?: string | undefined;
        }, {
            type: "source";
            id: string;
            last4?: string | undefined;
            brand?: string | undefined;
            country?: string | undefined;
        }>;
        statement_descriptor: z.ZodNullable<z.ZodString>;
        status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"paid">, z.ZodLiteral<"fail">]>;
        tax_amount: z.ZodUnion<[z.ZodNumber, z.ZodUndefined]>;
        refunds: z.ZodArray<z.ZodAny, "many">;
        taxes: z.ZodArray<z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodLiteral<"PHP">;
            inclusive: z.ZodBoolean;
            name: z.ZodString;
            type: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: "PHP";
            name: string;
        }, {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: "PHP";
            name: string;
        }>, "many">;
        available_at: z.ZodNumber;
        created_at: z.ZodNumber;
        paid_at: z.ZodNumber;
        updated_at: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        status: "pending" | "paid" | "fail";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        source: {
            type: "source";
            id: string;
            last4?: string | undefined;
            brand?: string | undefined;
            country?: string | undefined;
        };
        created_at: number;
        updated_at: number;
        balance_transaction_id: string;
        disputed: boolean;
        fee: number;
        foreign_fee: number;
        net_amount: number;
        payout: number | null;
        statement_descriptor: string | null;
        refunds: any[];
        taxes: {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: "PHP";
            name: string;
        }[];
        available_at: number;
        paid_at: number;
        billing?: any;
        access_url?: string | undefined;
        description?: string | undefined;
        external_reference_number?: string | undefined;
        tax_amount?: number | undefined;
    }, {
        status: "pending" | "paid" | "fail";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        source: {
            type: "source";
            id: string;
            last4?: string | undefined;
            brand?: string | undefined;
            country?: string | undefined;
        };
        created_at: number;
        updated_at: number;
        balance_transaction_id: string;
        disputed: boolean;
        fee: number;
        foreign_fee: number;
        net_amount: number;
        payout: number | null;
        statement_descriptor: string | null;
        refunds: any[];
        taxes: {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: "PHP";
            name: string;
        }[];
        available_at: number;
        paid_at: number;
        billing?: any;
        access_url?: string | undefined;
        description?: string | undefined;
        external_reference_number?: string | undefined;
        tax_amount?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "payment";
    attributes: {
        status: "pending" | "paid" | "fail";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        source: {
            type: "source";
            id: string;
            last4?: string | undefined;
            brand?: string | undefined;
            country?: string | undefined;
        };
        created_at: number;
        updated_at: number;
        balance_transaction_id: string;
        disputed: boolean;
        fee: number;
        foreign_fee: number;
        net_amount: number;
        payout: number | null;
        statement_descriptor: string | null;
        refunds: any[];
        taxes: {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: "PHP";
            name: string;
        }[];
        available_at: number;
        paid_at: number;
        billing?: any;
        access_url?: string | undefined;
        description?: string | undefined;
        external_reference_number?: string | undefined;
        tax_amount?: number | undefined;
    };
    id: string;
}, {
    type: "payment";
    attributes: {
        status: "pending" | "paid" | "fail";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        source: {
            type: "source";
            id: string;
            last4?: string | undefined;
            brand?: string | undefined;
            country?: string | undefined;
        };
        created_at: number;
        updated_at: number;
        balance_transaction_id: string;
        disputed: boolean;
        fee: number;
        foreign_fee: number;
        net_amount: number;
        payout: number | null;
        statement_descriptor: string | null;
        refunds: any[];
        taxes: {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: "PHP";
            name: string;
        }[];
        available_at: number;
        paid_at: number;
        billing?: any;
        access_url?: string | undefined;
        description?: string | undefined;
        external_reference_number?: string | undefined;
        tax_amount?: number | undefined;
    };
    id: string;
}>;
type PaymentResource = z.infer<typeof PaymentResourceSchema>;
declare const CreatePaymentParamsSchema: z.ZodObject<{
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            amount: z.ZodNumber;
            description: z.ZodOptional<z.ZodString>;
            currency: z.ZodLiteral<"PHP">;
            statement_descriptor: z.ZodOptional<z.ZodString>;
            source: z.ZodObject<{
                id: z.ZodString;
                type: z.ZodLiteral<"source">;
            }, "strip", z.ZodTypeAny, {
                type: "source";
                id: string;
            }, {
                type: "source";
                id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            currency: "PHP";
            source: {
                type: "source";
                id: string;
            };
            description?: string | undefined;
            statement_descriptor?: string | undefined;
        }, {
            amount: number;
            currency: "PHP";
            source: {
                type: "source";
                id: string;
            };
            description?: string | undefined;
            statement_descriptor?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            amount: number;
            currency: "PHP";
            source: {
                type: "source";
                id: string;
            };
            description?: string | undefined;
            statement_descriptor?: string | undefined;
        };
    }, {
        attributes: {
            amount: number;
            currency: "PHP";
            source: {
                type: "source";
                id: string;
            };
            description?: string | undefined;
            statement_descriptor?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            amount: number;
            currency: "PHP";
            source: {
                type: "source";
                id: string;
            };
            description?: string | undefined;
            statement_descriptor?: string | undefined;
        };
    };
}, {
    data: {
        attributes: {
            amount: number;
            currency: "PHP";
            source: {
                type: "source";
                id: string;
            };
            description?: string | undefined;
            statement_descriptor?: string | undefined;
        };
    };
}>;
type CreatePaymentParams = z.infer<typeof CreatePaymentParamsSchema>;
declare const ListAllPaymentsParamsSchema: z.ZodObject<{
    before: z.ZodOptional<z.ZodString>;
    after: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    before?: string | undefined;
    after?: string | undefined;
    limit?: string | undefined;
}, {
    before?: string | undefined;
    after?: string | undefined;
    limit?: string | undefined;
}>;
type ListAllPaymentsParams = z.infer<typeof ListAllPaymentsParamsSchema>;
declare const RetrievePaymentParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type RetrievePaymentParams = z.infer<typeof RetrievePaymentParamsSchema>;

declare const PaymentIntentResourceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"payment_intent">;
    attributes: z.ZodObject<{
        amount: z.ZodNumber;
        capture_type: z.ZodLiteral<"automatic">;
        client_key: z.ZodString;
        currency: z.ZodLiteral<"PHP">;
        description: z.ZodOptional<z.ZodString>;
        livemode: z.ZodBoolean;
        statement_descriptor: z.ZodString;
        status: z.ZodUnion<[z.ZodLiteral<"awaiting_payment_method">, z.ZodLiteral<"awaiting_next_action">, z.ZodLiteral<"processing">, z.ZodLiteral<"succeeded">]>;
        created_at: z.ZodNumber;
        updated_at: z.ZodNumber;
        last_payment_error: z.ZodOptional<z.ZodObject<{
            payment: z.ZodString;
            failed_code: z.ZodUnion<[z.ZodLiteral<"card_expired">, z.ZodLiteral<"cvc_invalid">, z.ZodLiteral<"generic_decline">, z.ZodLiteral<"fraudulent">, z.ZodLiteral<"insufficient_funds">, z.ZodLiteral<"processor_blocked">, z.ZodLiteral<"lost_card">, z.ZodLiteral<"stolen_card">, z.ZodLiteral<"processor_unavailable">, z.ZodLiteral<"blocked">]>;
            failed_message: z.ZodString;
            payment_method: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            payment: string;
            failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
            failed_message: string;
            payment_method: string;
        }, {
            payment: string;
            failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
            failed_message: string;
            payment_method: string;
        }>>;
        payment_method_allowed: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"brankas">, z.ZodLiteral<"billease">]>, "many">;
        payments: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodLiteral<"payment">;
            attributes: z.ZodObject<{
                access_url: z.ZodOptional<z.ZodString>;
                amount: z.ZodNumber;
                balance_transaction_id: z.ZodString;
                billing: z.ZodOptional<z.ZodAny>;
                currency: z.ZodLiteral<"PHP">;
                description: z.ZodOptional<z.ZodString>;
                disputed: z.ZodBoolean;
                external_reference_number: z.ZodOptional<z.ZodString>;
                fee: z.ZodNumber;
                foreign_fee: z.ZodNumber;
                livemode: z.ZodBoolean;
                net_amount: z.ZodNumber;
                payout: z.ZodNullable<z.ZodNumber>;
                source: z.ZodObject<z.objectUtil.extendShape<{
                    id: z.ZodString;
                    type: z.ZodLiteral<"source">;
                }, {
                    brand: z.ZodOptional<z.ZodString>;
                    country: z.ZodOptional<z.ZodString>;
                    last4: z.ZodOptional<z.ZodString>;
                }>, "strip", z.ZodTypeAny, {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                }, {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                }>;
                statement_descriptor: z.ZodNullable<z.ZodString>;
                status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"paid">, z.ZodLiteral<"fail">]>;
                tax_amount: z.ZodUnion<[z.ZodNumber, z.ZodUndefined]>;
                refunds: z.ZodArray<z.ZodAny, "many">;
                taxes: z.ZodArray<z.ZodObject<{
                    amount: z.ZodNumber;
                    currency: z.ZodLiteral<"PHP">;
                    inclusive: z.ZodBoolean;
                    name: z.ZodString;
                    type: z.ZodString;
                    value: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }, {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }>, "many">;
                available_at: z.ZodNumber;
                created_at: z.ZodNumber;
                paid_at: z.ZodNumber;
                updated_at: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            }, {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }, {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }>, "many">;
        next_action: z.ZodNullable<z.ZodObject<{
            type: z.ZodLiteral<"redirect">;
            redirect: z.ZodObject<{
                url: z.ZodString;
                return_url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
                return_url: string;
            }, {
                url: string;
                return_url: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "redirect";
            redirect: {
                url: string;
                return_url: string;
            };
        }, {
            type: "redirect";
            redirect: {
                url: string;
                return_url: string;
            };
        }>>;
        payment_method_options: z.ZodOptional<z.ZodObject<{
            card: z.ZodObject<{
                request_three_d_secure: z.ZodLiteral<"any">;
            }, "strip", z.ZodTypeAny, {
                request_three_d_secure: "any";
            }, {
                request_three_d_secure: "any";
            }>;
        }, "strip", z.ZodTypeAny, {
            card: {
                request_three_d_secure: "any";
            };
        }, {
            card: {
                request_three_d_secure: "any";
            };
        }>>;
        metadata: z.ZodUnion<[z.ZodAny, z.ZodAny]>;
        setup_future_usage: z.ZodNullable<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        created_at: number;
        updated_at: number;
        statement_descriptor: string;
        capture_type: "automatic";
        client_key: string;
        payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
        payments: {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }[];
        next_action: {
            type: "redirect";
            redirect: {
                url: string;
                return_url: string;
            };
        } | null;
        setup_future_usage: boolean | null;
        metadata?: any;
        description?: string | undefined;
        last_payment_error?: {
            payment: string;
            failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
            failed_message: string;
            payment_method: string;
        } | undefined;
        payment_method_options?: {
            card: {
                request_three_d_secure: "any";
            };
        } | undefined;
    }, {
        status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        created_at: number;
        updated_at: number;
        statement_descriptor: string;
        capture_type: "automatic";
        client_key: string;
        payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
        payments: {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }[];
        next_action: {
            type: "redirect";
            redirect: {
                url: string;
                return_url: string;
            };
        } | null;
        setup_future_usage: boolean | null;
        metadata?: any;
        description?: string | undefined;
        last_payment_error?: {
            payment: string;
            failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
            failed_message: string;
            payment_method: string;
        } | undefined;
        payment_method_options?: {
            card: {
                request_three_d_secure: "any";
            };
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "payment_intent";
    attributes: {
        status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        created_at: number;
        updated_at: number;
        statement_descriptor: string;
        capture_type: "automatic";
        client_key: string;
        payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
        payments: {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }[];
        next_action: {
            type: "redirect";
            redirect: {
                url: string;
                return_url: string;
            };
        } | null;
        setup_future_usage: boolean | null;
        metadata?: any;
        description?: string | undefined;
        last_payment_error?: {
            payment: string;
            failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
            failed_message: string;
            payment_method: string;
        } | undefined;
        payment_method_options?: {
            card: {
                request_three_d_secure: "any";
            };
        } | undefined;
    };
    id: string;
}, {
    type: "payment_intent";
    attributes: {
        status: "awaiting_payment_method" | "awaiting_next_action" | "processing" | "succeeded";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        created_at: number;
        updated_at: number;
        statement_descriptor: string;
        capture_type: "automatic";
        client_key: string;
        payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "billease" | "brankas")[];
        payments: {
            type: "payment";
            attributes: {
                status: "pending" | "paid" | "fail";
                amount: number;
                currency: "PHP";
                livemode: boolean;
                source: {
                    type: "source";
                    id: string;
                    last4?: string | undefined;
                    brand?: string | undefined;
                    country?: string | undefined;
                };
                created_at: number;
                updated_at: number;
                balance_transaction_id: string;
                disputed: boolean;
                fee: number;
                foreign_fee: number;
                net_amount: number;
                payout: number | null;
                statement_descriptor: string | null;
                refunds: any[];
                taxes: {
                    inclusive: boolean;
                    type: string;
                    value: string;
                    amount: number;
                    currency: "PHP";
                    name: string;
                }[];
                available_at: number;
                paid_at: number;
                billing?: any;
                access_url?: string | undefined;
                description?: string | undefined;
                external_reference_number?: string | undefined;
                tax_amount?: number | undefined;
            };
            id: string;
        }[];
        next_action: {
            type: "redirect";
            redirect: {
                url: string;
                return_url: string;
            };
        } | null;
        setup_future_usage: boolean | null;
        metadata?: any;
        description?: string | undefined;
        last_payment_error?: {
            payment: string;
            failed_code: "card_expired" | "cvc_invalid" | "generic_decline" | "fraudulent" | "insufficient_funds" | "processor_blocked" | "lost_card" | "stolen_card" | "processor_unavailable" | "blocked";
            failed_message: string;
            payment_method: string;
        } | undefined;
        payment_method_options?: {
            card: {
                request_three_d_secure: "any";
            };
        } | undefined;
    };
    id: string;
}>;
type PaymentIntentResource = z.infer<typeof PaymentIntentResourceSchema>;
declare const CreatePaymentIntentParamsSchema: z.ZodObject<{
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodLiteral<"PHP">;
            payment_method_allowed: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"dob_ubp">, z.ZodLiteral<"brankas_bdo">, z.ZodLiteral<"brankas_landbank">, z.ZodLiteral<"brankas_metrobank">, z.ZodLiteral<"qrph">, z.ZodLiteral<"billease">]>, "many">;
            payment_method_options: z.ZodOptional<z.ZodObject<{
                card: z.ZodObject<{
                    request_three_d_secure: z.ZodLiteral<"any">;
                }, "strip", z.ZodTypeAny, {
                    request_three_d_secure: "any";
                }, {
                    request_three_d_secure: "any";
                }>;
            }, "strip", z.ZodTypeAny, {
                card: {
                    request_three_d_secure: "any";
                };
            }, {
                card: {
                    request_three_d_secure: "any";
                };
            }>>;
            capture_type: z.ZodLiteral<"automatic">;
            description: z.ZodOptional<z.ZodString>;
            statement_descriptor: z.ZodOptional<z.ZodString>;
            metadata: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodAny]>>;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            currency: "PHP";
            capture_type: "automatic";
            payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            metadata?: any;
            description?: string | undefined;
            statement_descriptor?: string | undefined;
            payment_method_options?: {
                card: {
                    request_three_d_secure: "any";
                };
            } | undefined;
        }, {
            amount: number;
            currency: "PHP";
            capture_type: "automatic";
            payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            metadata?: any;
            description?: string | undefined;
            statement_descriptor?: string | undefined;
            payment_method_options?: {
                card: {
                    request_three_d_secure: "any";
                };
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            amount: number;
            currency: "PHP";
            capture_type: "automatic";
            payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            metadata?: any;
            description?: string | undefined;
            statement_descriptor?: string | undefined;
            payment_method_options?: {
                card: {
                    request_three_d_secure: "any";
                };
            } | undefined;
        };
    }, {
        attributes: {
            amount: number;
            currency: "PHP";
            capture_type: "automatic";
            payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            metadata?: any;
            description?: string | undefined;
            statement_descriptor?: string | undefined;
            payment_method_options?: {
                card: {
                    request_three_d_secure: "any";
                };
            } | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            amount: number;
            currency: "PHP";
            capture_type: "automatic";
            payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            metadata?: any;
            description?: string | undefined;
            statement_descriptor?: string | undefined;
            payment_method_options?: {
                card: {
                    request_three_d_secure: "any";
                };
            } | undefined;
        };
    };
}, {
    data: {
        attributes: {
            amount: number;
            currency: "PHP";
            capture_type: "automatic";
            payment_method_allowed: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            metadata?: any;
            description?: string | undefined;
            statement_descriptor?: string | undefined;
            payment_method_options?: {
                card: {
                    request_three_d_secure: "any";
                };
            } | undefined;
        };
    };
}>;
type CreatePaymentIntentParams = z.infer<typeof CreatePaymentIntentParamsSchema>;
declare const RetrievePaymentIntentParamsUsingPublicSchema: z.ZodObject<{
    client_key: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    client_key: string;
}, {
    id: string;
    client_key: string;
}>;
type RetrievePaymentIntentParamsUsingPublic = z.infer<typeof RetrievePaymentIntentParamsUsingPublicSchema>;
declare const AttachPaymentIntentParamsUsingPublicSchema: z.ZodObject<{
    id: z.ZodString;
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            payment_method: z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"dob_ubp">, z.ZodLiteral<"brankas_bdo">, z.ZodLiteral<"brankas_landbank">, z.ZodLiteral<"brankas_metrobank">, z.ZodLiteral<"qrph">, z.ZodLiteral<"billease">]>;
            client_key: z.ZodString;
            return_url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            payment_method: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            client_key: string;
            return_url?: string | undefined;
        }, {
            payment_method: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            client_key: string;
            return_url?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            payment_method: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            client_key: string;
            return_url?: string | undefined;
        };
    }, {
        attributes: {
            payment_method: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            client_key: string;
            return_url?: string | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            payment_method: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            client_key: string;
            return_url?: string | undefined;
        };
    };
    id: string;
}, {
    data: {
        attributes: {
            payment_method: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            client_key: string;
            return_url?: string | undefined;
        };
    };
    id: string;
}>;
type AttachPaymentIntentParamsUsingPublic = z.infer<typeof AttachPaymentIntentParamsUsingPublicSchema>;

declare const CreatePaymentMethodParamsSchema: z.ZodObject<{
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            type: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"dob_ubp">, z.ZodLiteral<"brankas_bdo">, z.ZodLiteral<"brankas_landbank">, z.ZodLiteral<"brankas_metrobank">, z.ZodLiteral<"qrph">, z.ZodLiteral<"billease">]>, "many">;
            details: z.ZodOptional<z.ZodObject<{
                card_number: z.ZodString;
                exp_month: z.ZodNumber;
                exp_year: z.ZodNumber;
                cvc: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                card_number: string;
                exp_month: number;
                exp_year: number;
                cvc: string;
            }, {
                card_number: string;
                exp_month: number;
                exp_year: number;
                cvc: string;
            }>>;
            billing: z.ZodOptional<z.ZodAny>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            details?: {
                card_number: string;
                exp_month: number;
                exp_year: number;
                cvc: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        }, {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            details?: {
                card_number: string;
                exp_month: number;
                exp_year: number;
                cvc: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            details?: {
                card_number: string;
                exp_month: number;
                exp_year: number;
                cvc: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        };
    }, {
        attributes: {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            details?: {
                card_number: string;
                exp_month: number;
                exp_year: number;
                cvc: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            details?: {
                card_number: string;
                exp_month: number;
                exp_year: number;
                cvc: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        };
    };
}, {
    data: {
        attributes: {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            details?: {
                card_number: string;
                exp_month: number;
                exp_year: number;
                cvc: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        };
    };
}>;
type CreatePaymentMethodParams = z.infer<typeof CreatePaymentMethodParamsSchema>;
declare const PaymentMethodResourceSchema: z.ZodObject<{
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            livemode: z.ZodBoolean;
            type: z.ZodArray<z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"dob_ubp">, z.ZodLiteral<"brankas_bdo">, z.ZodLiteral<"brankas_landbank">, z.ZodLiteral<"brankas_metrobank">, z.ZodLiteral<"qrph">, z.ZodLiteral<"billease">]>, "many">;
            billing: z.ZodOptional<z.ZodAny>;
            details: z.ZodOptional<z.ZodObject<{
                last4: z.ZodString;
                exp_month: z.ZodNumber;
                exp_year: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                exp_month: number;
                exp_year: number;
                last4: string;
            }, {
                exp_month: number;
                exp_year: number;
                last4: string;
            }>>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            livemode: boolean;
            details?: {
                exp_month: number;
                exp_year: number;
                last4: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        }, {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            livemode: boolean;
            details?: {
                exp_month: number;
                exp_year: number;
                last4: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            livemode: boolean;
            details?: {
                exp_month: number;
                exp_year: number;
                last4: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        };
    }, {
        attributes: {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            livemode: boolean;
            details?: {
                exp_month: number;
                exp_year: number;
                last4: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            livemode: boolean;
            details?: {
                exp_month: number;
                exp_year: number;
                last4: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        };
    };
}, {
    data: {
        attributes: {
            type: ("gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease")[];
            livemode: boolean;
            details?: {
                exp_month: number;
                exp_year: number;
                last4: string;
            } | undefined;
            billing?: any;
            metadata?: Record<string, any> | undefined;
        };
    };
}>;
type PaymentMethodResource = z.infer<typeof PaymentMethodResourceSchema>;
declare const RetrievePaymentMethodParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type RetrievePaymentMethodParams = z.infer<typeof RetrievePaymentMethodParamsSchema>;

declare const SourceErrorSchema: z.ZodObject<{
    pointer: z.ZodString;
    attribute: z.ZodString;
}, "strip", z.ZodTypeAny, {
    pointer: string;
    attribute: string;
}, {
    pointer: string;
    attribute: string;
}>;
type SourceError = z.infer<typeof SourceErrorSchema>;
declare const SourceResourceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"source">;
    attributes: z.ZodObject<{
        amount: z.ZodNumber;
        billing: z.ZodOptional<z.ZodAny>;
        currency: z.ZodLiteral<"PHP">;
        livemode: z.ZodBoolean;
        redirect: z.ZodObject<{
            success: z.ZodString;
            failed: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            success: string;
            failed: string;
        }, {
            success: string;
            failed: string;
        }>;
        status: z.ZodUnion<[z.ZodLiteral<"pending">, z.ZodLiteral<"chargeable">, z.ZodLiteral<"cancelled">, z.ZodLiteral<"expired">, z.ZodLiteral<"paid">]>;
        type: z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"dob_ubp">, z.ZodLiteral<"brankas_bdo">, z.ZodLiteral<"brankas_landbank">, z.ZodLiteral<"brankas_metrobank">, z.ZodLiteral<"qrph">, z.ZodLiteral<"billease">]>;
        created_at: z.ZodNumber;
        updated_at: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
        status: "pending" | "chargeable" | "cancelled" | "expired" | "paid";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        redirect: {
            success: string;
            failed: string;
        };
        created_at: number;
        updated_at: number;
        billing?: any;
    }, {
        type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
        status: "pending" | "chargeable" | "cancelled" | "expired" | "paid";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        redirect: {
            success: string;
            failed: string;
        };
        created_at: number;
        updated_at: number;
        billing?: any;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "source";
    attributes: {
        type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
        status: "pending" | "chargeable" | "cancelled" | "expired" | "paid";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        redirect: {
            success: string;
            failed: string;
        };
        created_at: number;
        updated_at: number;
        billing?: any;
    };
    id: string;
}, {
    type: "source";
    attributes: {
        type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
        status: "pending" | "chargeable" | "cancelled" | "expired" | "paid";
        amount: number;
        currency: "PHP";
        livemode: boolean;
        redirect: {
            success: string;
            failed: string;
        };
        created_at: number;
        updated_at: number;
        billing?: any;
    };
    id: string;
}>;
type SourceResource = z.infer<typeof SourceResourceSchema>;
declare const CreateSourceParamsSchema: z.ZodObject<{
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            type: z.ZodUnion<[z.ZodLiteral<"gcash">, z.ZodLiteral<"card">, z.ZodLiteral<"grab_pay">, z.ZodLiteral<"paymaya">, z.ZodLiteral<"dob">, z.ZodLiteral<"dob_ubp">, z.ZodLiteral<"brankas_bdo">, z.ZodLiteral<"brankas_landbank">, z.ZodLiteral<"brankas_metrobank">, z.ZodLiteral<"qrph">, z.ZodLiteral<"billease">]>;
            amount: z.ZodNumber;
            currency: z.ZodLiteral<"PHP">;
            redirect: z.ZodObject<{
                success: z.ZodString;
                failed: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                success: string;
                failed: string;
            }, {
                success: string;
                failed: string;
            }>;
            billing: z.ZodOptional<z.ZodAny>;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodUnion<[z.ZodNumber, z.ZodBoolean]>]>>>;
        }, "strip", z.ZodTypeAny, {
            type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            amount: number;
            currency: "PHP";
            redirect: {
                success: string;
                failed: string;
            };
            billing?: any;
            metadata?: Record<string, string | number | boolean> | undefined;
        }, {
            type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            amount: number;
            currency: "PHP";
            redirect: {
                success: string;
                failed: string;
            };
            billing?: any;
            metadata?: Record<string, string | number | boolean> | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            amount: number;
            currency: "PHP";
            redirect: {
                success: string;
                failed: string;
            };
            billing?: any;
            metadata?: Record<string, string | number | boolean> | undefined;
        };
    }, {
        attributes: {
            type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            amount: number;
            currency: "PHP";
            redirect: {
                success: string;
                failed: string;
            };
            billing?: any;
            metadata?: Record<string, string | number | boolean> | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            amount: number;
            currency: "PHP";
            redirect: {
                success: string;
                failed: string;
            };
            billing?: any;
            metadata?: Record<string, string | number | boolean> | undefined;
        };
    };
}, {
    data: {
        attributes: {
            type: "gcash" | "card" | "grab_pay" | "paymaya" | "dob" | "dob_ubp" | "brankas_bdo" | "brankas_landbank" | "brankas_metrobank" | "qrph" | "billease";
            amount: number;
            currency: "PHP";
            redirect: {
                success: string;
                failed: string;
            };
            billing?: any;
            metadata?: Record<string, string | number | boolean> | undefined;
        };
    };
}>;
type CreateSourceParams = z.infer<typeof CreateSourceParamsSchema>;
declare const RetrieveSourceParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type RetrieveSourceParams = z.infer<typeof RetrieveSourceParamsSchema>;

declare const RefundResourceSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        attributes: z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodString;
            livemode: z.ZodBoolean;
            notes: z.ZodString;
            payment_id: z.ZodString;
            payout_id: z.ZodNull;
            reason: z.ZodString;
            status: z.ZodString;
            created_at: z.ZodNumber;
            updated_at: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            status: string;
            amount: number;
            currency: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        }, {
            status: string;
            amount: number;
            currency: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        attributes: {
            status: string;
            amount: number;
            currency: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        };
        id: string;
    }, {
        type: string;
        attributes: {
            status: string;
            amount: number;
            currency: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        };
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        type: string;
        attributes: {
            status: string;
            amount: number;
            currency: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        };
        id: string;
    };
}, {
    data: {
        type: string;
        attributes: {
            status: string;
            amount: number;
            currency: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        };
        id: string;
    };
}>;
type RefundResource = z.infer<typeof RefundResourceSchema>;
declare const CreateRefundParamsSchema: z.ZodObject<{
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            amount: z.ZodNumber;
            notes: z.ZodString;
            payment_id: z.ZodString;
            payout_id: z.ZodNull;
            reason: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        }, {
            amount: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            amount: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        };
    }, {
        attributes: {
            amount: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            amount: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        };
    };
}, {
    data: {
        attributes: {
            amount: number;
            notes: string;
            payment_id: string;
            payout_id: null;
            reason: string;
        };
    };
}>;
type CreateRefundParams = z.infer<typeof CreateRefundParamsSchema>;
declare const RetrieveRefundParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type RetrieveRefundParams = z.infer<typeof RetrieveRefundParamsSchema>;

declare const CustomerResourceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    attributes: z.ZodObject<{
        default_device: z.ZodString;
        default_payment_method_id: z.ZodNullable<z.ZodString>;
        email: z.ZodString;
        first_name: z.ZodString;
        has_vaulted_payment_methods: z.ZodBoolean;
        last_name: z.ZodString;
        livemode: z.ZodBoolean;
        organization_id: z.ZodOptional<z.ZodString>;
        phone: z.ZodString;
        created_at: z.ZodNumber;
        updated_at: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        livemode: boolean;
        created_at: number;
        updated_at: number;
        email: string;
        phone: string;
        default_device: string;
        default_payment_method_id: string | null;
        first_name: string;
        has_vaulted_payment_methods: boolean;
        last_name: string;
        organization_id?: string | undefined;
    }, {
        livemode: boolean;
        created_at: number;
        updated_at: number;
        email: string;
        phone: string;
        default_device: string;
        default_payment_method_id: string | null;
        first_name: string;
        has_vaulted_payment_methods: boolean;
        last_name: string;
        organization_id?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: string;
    attributes: {
        livemode: boolean;
        created_at: number;
        updated_at: number;
        email: string;
        phone: string;
        default_device: string;
        default_payment_method_id: string | null;
        first_name: string;
        has_vaulted_payment_methods: boolean;
        last_name: string;
        organization_id?: string | undefined;
    };
    id: string;
}, {
    type: string;
    attributes: {
        livemode: boolean;
        created_at: number;
        updated_at: number;
        email: string;
        phone: string;
        default_device: string;
        default_payment_method_id: string | null;
        first_name: string;
        has_vaulted_payment_methods: boolean;
        last_name: string;
        organization_id?: string | undefined;
    };
    id: string;
}>;
type CustomerResource = z.infer<typeof CustomerResourceSchema>;
declare const CreateCustomerParamsSchema: z.ZodObject<{
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            default_device: z.ZodString;
            default_payment_method_id: z.ZodNull;
            email: z.ZodString;
            first_name: z.ZodString;
            last_name: z.ZodString;
            phone: z.ZodNullable<z.ZodString>;
            created_at: z.ZodNumber;
            updated_at: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            created_at: number;
            updated_at: number;
            email: string;
            phone: string | null;
            default_device: string;
            default_payment_method_id: null;
            first_name: string;
            last_name: string;
        }, {
            created_at: number;
            updated_at: number;
            email: string;
            phone: string | null;
            default_device: string;
            default_payment_method_id: null;
            first_name: string;
            last_name: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            created_at: number;
            updated_at: number;
            email: string;
            phone: string | null;
            default_device: string;
            default_payment_method_id: null;
            first_name: string;
            last_name: string;
        };
    }, {
        attributes: {
            created_at: number;
            updated_at: number;
            email: string;
            phone: string | null;
            default_device: string;
            default_payment_method_id: null;
            first_name: string;
            last_name: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            created_at: number;
            updated_at: number;
            email: string;
            phone: string | null;
            default_device: string;
            default_payment_method_id: null;
            first_name: string;
            last_name: string;
        };
    };
}, {
    data: {
        attributes: {
            created_at: number;
            updated_at: number;
            email: string;
            phone: string | null;
            default_device: string;
            default_payment_method_id: null;
            first_name: string;
            last_name: string;
        };
    };
}>;
type CreateCustomerParams = z.infer<typeof CreateCustomerParamsSchema>;
declare const RetrieveCustomerParamsSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    phone_number: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email?: string | undefined;
    phone_number?: string | undefined;
}, {
    id: string;
    email?: string | undefined;
    phone_number?: string | undefined;
}>;
type RetrieveCustomerParams = z.infer<typeof RetrieveCustomerParamsSchema>;
declare const EditCustomerParamsSchema: z.ZodObject<{
    id: z.ZodString;
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            first_name: z.ZodString;
            last_name: z.ZodString;
            phone: z.ZodString;
            email: z.ZodString;
            default_device: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            email: string;
            phone: string;
            default_device: string;
            first_name: string;
            last_name: string;
        }, {
            email: string;
            phone: string;
            default_device: string;
            first_name: string;
            last_name: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            email: string;
            phone: string;
            default_device: string;
            first_name: string;
            last_name: string;
        };
    }, {
        attributes: {
            email: string;
            phone: string;
            default_device: string;
            first_name: string;
            last_name: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            email: string;
            phone: string;
            default_device: string;
            first_name: string;
            last_name: string;
        };
    };
    id: string;
}, {
    data: {
        attributes: {
            email: string;
            phone: string;
            default_device: string;
            first_name: string;
            last_name: string;
        };
    };
    id: string;
}>;
type EditCustomerParams = z.infer<typeof EditCustomerParamsSchema>;
declare const DeleteCustomerParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type DeleteCustomerParams = z.infer<typeof DeleteCustomerParamsSchema>;

declare const WebhookResourceSchema: z.ZodObject<{
    data: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        attributes: z.ZodObject<{
            livemode: z.ZodBoolean;
            secret_key: z.ZodString;
            status: z.ZodString;
            url: z.ZodString;
            events: z.ZodArray<z.ZodString, "many">;
            created_at: z.ZodNumber;
            updated_at: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            status: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            url: string;
            secret_key: string;
            events: string[];
        }, {
            status: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            url: string;
            secret_key: string;
            events: string[];
        }>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        attributes: {
            status: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            url: string;
            secret_key: string;
            events: string[];
        };
        id: string;
    }, {
        type: string;
        attributes: {
            status: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            url: string;
            secret_key: string;
            events: string[];
        };
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        type: string;
        attributes: {
            status: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            url: string;
            secret_key: string;
            events: string[];
        };
        id: string;
    };
}, {
    data: {
        type: string;
        attributes: {
            status: string;
            livemode: boolean;
            created_at: number;
            updated_at: number;
            url: string;
            secret_key: string;
            events: string[];
        };
        id: string;
    };
}>;
type WebhookResource = z.infer<typeof WebhookResourceSchema>;
declare const CreateWebhookParamsSchema: z.ZodObject<{
    url: z.ZodString;
    events: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    url: string;
    events: string[];
}, {
    url: string;
    events: string[];
}>;
type CreateWebhookParams = z.infer<typeof CreateWebhookParamsSchema>;
declare const RetrieveWebhookParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type RetrieveWebhookParams = z.infer<typeof RetrieveWebhookParamsSchema>;
declare const EnableWebhookParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type EnableWebhookParams = z.infer<typeof EnableWebhookParamsSchema>;
declare const DisableWebhookParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type DisableWebhookParams = z.infer<typeof DisableWebhookParamsSchema>;
declare const UpdateWebhookParamsSchema: z.ZodObject<{
    id: z.ZodString;
    data: z.ZodObject<{
        url: z.ZodString;
        events: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        url: string;
        events: string[];
    }, {
        url: string;
        events: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        url: string;
        events: string[];
    };
    id: string;
}, {
    data: {
        url: string;
        events: string[];
    };
    id: string;
}>;
type UpdateWebhookParams = z.infer<typeof UpdateWebhookParamsSchema>;

declare const LinkResourceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    attributes: z.ZodObject<{
        amount: z.ZodNumber;
        archived: z.ZodBoolean;
        currency: z.ZodString;
        description: z.ZodString;
        livemode: z.ZodBoolean;
        fee: z.ZodNumber;
        remarks: z.ZodString;
        status: z.ZodString;
        tax_amount: z.ZodNumber;
        taxes: z.ZodArray<z.ZodObject<{
            amount: z.ZodNumber;
            currency: z.ZodString;
            inclusive: z.ZodBoolean;
            name: z.ZodString;
            type: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: string;
            name: string;
        }, {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: string;
            name: string;
        }>, "many">;
        checkout_url: z.ZodString;
        reference_number: z.ZodString;
        created_at: z.ZodNumber;
        updated_at: z.ZodNumber;
        payments: z.ZodArray<z.ZodObject<{
            data: z.ZodObject<{
                id: z.ZodString;
                type: z.ZodString;
                attributes: z.ZodObject<{
                    access_url: z.ZodNull;
                    amount: z.ZodNumber;
                    balance_transaction_id: z.ZodString;
                    billing: z.ZodObject<{
                        address: z.ZodObject<{
                            city: z.ZodString;
                            country: z.ZodString;
                            line1: z.ZodString;
                            line2: z.ZodString;
                            postal_code: z.ZodString;
                            state: z.ZodString;
                        }, "strip", z.ZodTypeAny, {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        }, {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        }>;
                        email: z.ZodString;
                        name: z.ZodString;
                        phone: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    }, {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    }>;
                    currency: z.ZodString;
                    description: z.ZodString;
                    disputed: z.ZodBoolean;
                    external_reference_number: z.ZodString;
                    fee: z.ZodNumber;
                    livemode: z.ZodBoolean;
                    net_amount: z.ZodNumber;
                    origin: z.ZodString;
                    payment_intent_id: z.ZodNull;
                    payout: z.ZodNull;
                    source: z.ZodObject<{
                        id: z.ZodString;
                        type: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        type: string;
                        id: string;
                    }, {
                        type: string;
                        id: string;
                    }>;
                    statement_descriptor: z.ZodString;
                    status: z.ZodUnion<[z.ZodLiteral<"unpaid">, z.ZodLiteral<"paid">, z.ZodLiteral<"refunded">, z.ZodLiteral<"partially_refunded">, z.ZodLiteral<"disputed">]>;
                    tax_amount: z.ZodNumber;
                    refunds: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        type: z.ZodString;
                        attributes: z.ZodObject<{
                            amount: z.ZodNumber;
                            balance_transaction_id: z.ZodString;
                            currency: z.ZodString;
                            livemode: z.ZodBoolean;
                            metadata: z.ZodNull;
                            notes: z.ZodNull;
                            payment_id: z.ZodString;
                            payout_id: z.ZodNull;
                            reason: z.ZodString;
                            status: z.ZodString;
                            available_at: z.ZodNumber;
                            created_at: z.ZodNumber;
                            updated_at: z.ZodNumber;
                        }, "strip", z.ZodTypeAny, {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        }, {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        }>;
                    }, "strip", z.ZodTypeAny, {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }, {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }>, "many">;
                    taxes: z.ZodArray<z.ZodObject<{
                        amount: z.ZodNumber;
                        currency: z.ZodString;
                        inclusive: z.ZodBoolean;
                        name: z.ZodString;
                        type: z.ZodString;
                        value: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }, {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }>, "many">;
                    available_at: z.ZodNumber;
                    created_at: z.ZodNumber;
                    paid_at: z.ZodNumber;
                    updated_at: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                    amount: number;
                    currency: string;
                    billing: {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    };
                    livemode: boolean;
                    source: {
                        type: string;
                        id: string;
                    };
                    created_at: number;
                    updated_at: number;
                    access_url: null;
                    balance_transaction_id: string;
                    description: string;
                    disputed: boolean;
                    external_reference_number: string;
                    fee: number;
                    net_amount: number;
                    payout: null;
                    statement_descriptor: string;
                    tax_amount: number;
                    refunds: {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }[];
                    taxes: {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }[];
                    available_at: number;
                    paid_at: number;
                    origin: string;
                    payment_intent_id: null;
                }, {
                    status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                    amount: number;
                    currency: string;
                    billing: {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    };
                    livemode: boolean;
                    source: {
                        type: string;
                        id: string;
                    };
                    created_at: number;
                    updated_at: number;
                    access_url: null;
                    balance_transaction_id: string;
                    description: string;
                    disputed: boolean;
                    external_reference_number: string;
                    fee: number;
                    net_amount: number;
                    payout: null;
                    statement_descriptor: string;
                    tax_amount: number;
                    refunds: {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }[];
                    taxes: {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }[];
                    available_at: number;
                    paid_at: number;
                    origin: string;
                    payment_intent_id: null;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: string;
                attributes: {
                    status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                    amount: number;
                    currency: string;
                    billing: {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    };
                    livemode: boolean;
                    source: {
                        type: string;
                        id: string;
                    };
                    created_at: number;
                    updated_at: number;
                    access_url: null;
                    balance_transaction_id: string;
                    description: string;
                    disputed: boolean;
                    external_reference_number: string;
                    fee: number;
                    net_amount: number;
                    payout: null;
                    statement_descriptor: string;
                    tax_amount: number;
                    refunds: {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }[];
                    taxes: {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }[];
                    available_at: number;
                    paid_at: number;
                    origin: string;
                    payment_intent_id: null;
                };
                id: string;
            }, {
                type: string;
                attributes: {
                    status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                    amount: number;
                    currency: string;
                    billing: {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    };
                    livemode: boolean;
                    source: {
                        type: string;
                        id: string;
                    };
                    created_at: number;
                    updated_at: number;
                    access_url: null;
                    balance_transaction_id: string;
                    description: string;
                    disputed: boolean;
                    external_reference_number: string;
                    fee: number;
                    net_amount: number;
                    payout: null;
                    statement_descriptor: string;
                    tax_amount: number;
                    refunds: {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }[];
                    taxes: {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }[];
                    available_at: number;
                    paid_at: number;
                    origin: string;
                    payment_intent_id: null;
                };
                id: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            data: {
                type: string;
                attributes: {
                    status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                    amount: number;
                    currency: string;
                    billing: {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    };
                    livemode: boolean;
                    source: {
                        type: string;
                        id: string;
                    };
                    created_at: number;
                    updated_at: number;
                    access_url: null;
                    balance_transaction_id: string;
                    description: string;
                    disputed: boolean;
                    external_reference_number: string;
                    fee: number;
                    net_amount: number;
                    payout: null;
                    statement_descriptor: string;
                    tax_amount: number;
                    refunds: {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }[];
                    taxes: {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }[];
                    available_at: number;
                    paid_at: number;
                    origin: string;
                    payment_intent_id: null;
                };
                id: string;
            };
        }, {
            data: {
                type: string;
                attributes: {
                    status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                    amount: number;
                    currency: string;
                    billing: {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    };
                    livemode: boolean;
                    source: {
                        type: string;
                        id: string;
                    };
                    created_at: number;
                    updated_at: number;
                    access_url: null;
                    balance_transaction_id: string;
                    description: string;
                    disputed: boolean;
                    external_reference_number: string;
                    fee: number;
                    net_amount: number;
                    payout: null;
                    statement_descriptor: string;
                    tax_amount: number;
                    refunds: {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }[];
                    taxes: {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }[];
                    available_at: number;
                    paid_at: number;
                    origin: string;
                    payment_intent_id: null;
                };
                id: string;
            };
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        status: string;
        amount: number;
        currency: string;
        livemode: boolean;
        created_at: number;
        updated_at: number;
        description: string;
        fee: number;
        tax_amount: number;
        taxes: {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: string;
            name: string;
        }[];
        payments: {
            data: {
                type: string;
                attributes: {
                    status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                    amount: number;
                    currency: string;
                    billing: {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    };
                    livemode: boolean;
                    source: {
                        type: string;
                        id: string;
                    };
                    created_at: number;
                    updated_at: number;
                    access_url: null;
                    balance_transaction_id: string;
                    description: string;
                    disputed: boolean;
                    external_reference_number: string;
                    fee: number;
                    net_amount: number;
                    payout: null;
                    statement_descriptor: string;
                    tax_amount: number;
                    refunds: {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }[];
                    taxes: {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }[];
                    available_at: number;
                    paid_at: number;
                    origin: string;
                    payment_intent_id: null;
                };
                id: string;
            };
        }[];
        reference_number: string;
        checkout_url: string;
        archived: boolean;
        remarks: string;
    }, {
        status: string;
        amount: number;
        currency: string;
        livemode: boolean;
        created_at: number;
        updated_at: number;
        description: string;
        fee: number;
        tax_amount: number;
        taxes: {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: string;
            name: string;
        }[];
        payments: {
            data: {
                type: string;
                attributes: {
                    status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                    amount: number;
                    currency: string;
                    billing: {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    };
                    livemode: boolean;
                    source: {
                        type: string;
                        id: string;
                    };
                    created_at: number;
                    updated_at: number;
                    access_url: null;
                    balance_transaction_id: string;
                    description: string;
                    disputed: boolean;
                    external_reference_number: string;
                    fee: number;
                    net_amount: number;
                    payout: null;
                    statement_descriptor: string;
                    tax_amount: number;
                    refunds: {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }[];
                    taxes: {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }[];
                    available_at: number;
                    paid_at: number;
                    origin: string;
                    payment_intent_id: null;
                };
                id: string;
            };
        }[];
        reference_number: string;
        checkout_url: string;
        archived: boolean;
        remarks: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: string;
    attributes: {
        status: string;
        amount: number;
        currency: string;
        livemode: boolean;
        created_at: number;
        updated_at: number;
        description: string;
        fee: number;
        tax_amount: number;
        taxes: {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: string;
            name: string;
        }[];
        payments: {
            data: {
                type: string;
                attributes: {
                    status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                    amount: number;
                    currency: string;
                    billing: {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    };
                    livemode: boolean;
                    source: {
                        type: string;
                        id: string;
                    };
                    created_at: number;
                    updated_at: number;
                    access_url: null;
                    balance_transaction_id: string;
                    description: string;
                    disputed: boolean;
                    external_reference_number: string;
                    fee: number;
                    net_amount: number;
                    payout: null;
                    statement_descriptor: string;
                    tax_amount: number;
                    refunds: {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }[];
                    taxes: {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }[];
                    available_at: number;
                    paid_at: number;
                    origin: string;
                    payment_intent_id: null;
                };
                id: string;
            };
        }[];
        reference_number: string;
        checkout_url: string;
        archived: boolean;
        remarks: string;
    };
    id: string;
}, {
    type: string;
    attributes: {
        status: string;
        amount: number;
        currency: string;
        livemode: boolean;
        created_at: number;
        updated_at: number;
        description: string;
        fee: number;
        tax_amount: number;
        taxes: {
            inclusive: boolean;
            type: string;
            value: string;
            amount: number;
            currency: string;
            name: string;
        }[];
        payments: {
            data: {
                type: string;
                attributes: {
                    status: "paid" | "disputed" | "unpaid" | "refunded" | "partially_refunded";
                    amount: number;
                    currency: string;
                    billing: {
                        name: string;
                        address: {
                            country: string;
                            line1: string;
                            line2: string;
                            city: string;
                            state: string;
                            postal_code: string;
                        };
                        email: string;
                        phone: string;
                    };
                    livemode: boolean;
                    source: {
                        type: string;
                        id: string;
                    };
                    created_at: number;
                    updated_at: number;
                    access_url: null;
                    balance_transaction_id: string;
                    description: string;
                    disputed: boolean;
                    external_reference_number: string;
                    fee: number;
                    net_amount: number;
                    payout: null;
                    statement_descriptor: string;
                    tax_amount: number;
                    refunds: {
                        type: string;
                        attributes: {
                            status: string;
                            amount: number;
                            currency: string;
                            metadata: null;
                            livemode: boolean;
                            created_at: number;
                            updated_at: number;
                            balance_transaction_id: string;
                            available_at: number;
                            notes: null;
                            payment_id: string;
                            payout_id: null;
                            reason: string;
                        };
                        id: string;
                    }[];
                    taxes: {
                        inclusive: boolean;
                        type: string;
                        value: string;
                        amount: number;
                        currency: string;
                        name: string;
                    }[];
                    available_at: number;
                    paid_at: number;
                    origin: string;
                    payment_intent_id: null;
                };
                id: string;
            };
        }[];
        reference_number: string;
        checkout_url: string;
        archived: boolean;
        remarks: string;
    };
    id: string;
}>;
type LinkResource = z.infer<typeof LinkResourceSchema>;
declare const CreateLinkParamSchema: z.ZodObject<{
    data: z.ZodObject<{
        attributes: z.ZodObject<{
            amount: z.ZodNumber;
            description: z.ZodString;
            remarks: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            amount: number;
            description: string;
            remarks: string;
        }, {
            amount: number;
            description: string;
            remarks: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        attributes: {
            amount: number;
            description: string;
            remarks: string;
        };
    }, {
        attributes: {
            amount: number;
            description: string;
            remarks: string;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        attributes: {
            amount: number;
            description: string;
            remarks: string;
        };
    };
}, {
    data: {
        attributes: {
            amount: number;
            description: string;
            remarks: string;
        };
    };
}>;
type CreateLinkParam = z.infer<typeof CreateLinkParamSchema>;
declare const RetrieveLinkParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type RetrieveLinkParam = z.infer<typeof RetrieveLinkParamSchema>;
declare const GetLinkByRefParamSchema: z.ZodObject<{
    reference_number: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reference_number: string;
}, {
    reference_number: string;
}>;
type GetLinkByRefParam = z.infer<typeof GetLinkByRefParamSchema>;
declare const ArchiveLinkParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type ArchiveLinkParam = z.infer<typeof ArchiveLinkParamSchema>;
declare const UnrchiveLinkParamSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
type UnarchiveLinkParam = z.infer<typeof UnrchiveLinkParamSchema>;

export { type AllowedPaymentMethods, type ArchiveLinkParam, type AttachPaymentIntentParamsUsingPublic, type CheckoutParams, type CheckoutResource, type CreateCustomerParams, type CreateLinkParam, type CreatePaymentIntentParams, type CreatePaymentMethodParams, type CreatePaymentParams, type CreateRefundParams, type CreateSourceParams, type CreateWebhookParams, type CustomerResource, type DeleteCustomerParams, type DisableWebhookParams, type EditCustomerParams, type EnableWebhookParams, type ExpireCheckoutParams, type GetLinkByRefParam, type HttpClient, HttpError, type LinkResource, type ListAllPaymentsParams, type Metadata, type PaymentIntentResource, type PaymentMethodResource, type PaymentResource, Paymongo, type PublicKey, type RefundResource, type RequestOptions, type ResponseEnvelope, type RetrieveCheckoutParams, type RetrieveCustomerParams, type RetrieveLinkParam, type RetrievePaymentIntentParamsUsingPublic, type RetrievePaymentMethodParams, type RetrievePaymentParams, type RetrieveRefundParams, type RetrieveSourceParams, type RetrieveWebhookParams, type SecretKey, type SecretOrPublicKey, type SourceError, type SourceResource, type Tax, type UnarchiveLinkParam, type UpdateWebhookParams, type WebhookResource, createFetchClient };
