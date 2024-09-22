import * as axios from 'axios';
import { z } from 'zod';

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

declare const SecretOrPublicKeySchema: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodString, string, string>]>;
type SecretOrPublicKey = z.infer<typeof SecretOrPublicKeySchema>;

declare const Paymongo: (key: SecretOrPublicKey) => {
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
        }) => Promise<axios.AxiosResponse<{
            data: CustomerResource;
        }, any>>;
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
                    url: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
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
                    url: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
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
                    url: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
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
                    url: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
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
                    url: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
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
                    url: string;
                    livemode: boolean;
                    created_at: number;
                    updated_at: number;
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

export { Paymongo };
