class HttpError extends Error {
    constructor(message, status, code, details){
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.code = code;
        this.details = details;
    }
}

const isObject = (v)=>typeof v === "object" && v !== null;
const encodeQuery = (query)=>{
    if (!query) return "";
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(query)){
        if (v === undefined) continue;
        params.append(k, String(v));
    }
    const s = params.toString();
    return s ? `?${s}` : "";
};
const mergeHeaders = (a, b)=>({
        ...a ?? {},
        ...b ?? {}
    });
const toJson = (body)=>body === undefined ? undefined : JSON.stringify(body);
async function parseJsonSafe(res) {
    const text = await res.text();
    if (!text) return undefined;
    try {
        return JSON.parse(text);
    } catch  {
        return undefined;
    }
}
function extractErrorInfo(payload) {
    // PayMongo error shape is typically { errors: [{ code, detail, ... }] }
    if (isObject(payload) && Array.isArray(payload.errors) && payload.errors.length > 0) {
        const first = payload.errors[0];
        if (isObject(first)) {
            const msg = (typeof first.detail === "string" ? first.detail : undefined) ?? "Request failed";
            const code = typeof first.code === "string" ? first.code : undefined;
            return {
                message: msg,
                code,
                details: first
            };
        }
    }
    // Fallback
    return {
        message: "Request failed",
        details: payload
    };
}
const createFetchClient = (baseUrl, defaultHeaders)=>{
    const request = async (method, path, options)=>{
        const url = `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\/?/, "")}${encodeQuery(options?.query)}`;
        const headers = mergeHeaders({
            Accept: "application/json",
            "Content-Type": "application/json"
        }, mergeHeaders(defaultHeaders, options?.headers));
        const res = await fetch(url, {
            method,
            headers,
            body: method === "GET" || method === "DELETE" ? undefined : toJson(options?.body),
            signal: options?.signal
        });
        if (!res.ok) {
            const payload = await parseJsonSafe(res);
            const info = extractErrorInfo(payload);
            throw new HttpError(info.message, res.status, info.code, info.details);
        }
        // Successful; expect { data: T }
        const payload = await parseJsonSafe(res);
        if (isObject(payload) && "data" in payload) {
            return {
                data: payload.data
            };
        }
        // Some endpoints may return raw responses; treat entire payload as data
        return {
            data: payload
        };
    };
    const client = {
        get: (path, options)=>request("GET", path, options),
        post: (path, options)=>request("POST", path, options),
        put: (path, options)=>request("PUT", path, options),
        patch: (path, options)=>request("PATCH", path, options),
        delete: (path, options)=>request("DELETE", path, options)
    };
    return client;
};

const createPaymentMethod = async (data, client, options)=>{
    const res = await client.post("/payment_methods", {
        ...options,
        body: data
    });
    return res.data.data;
};
const retrievePaymentMethod = async (data, client, options)=>{
    const res = await client.get(`/payment_methods/${data.id}`, options);
    return res.data.data;
};

const createPaymentIntent = async (data, client, options)=>{
    const res = await client.post("/payment_intents", {
        ...options,
        body: data
    });
    return res.data.data;
};
const retrievePaymentIntent = async (data, client, options)=>{
    const { id, client_key } = data;
    const res = await client.get(`/payment_intents/${id}`, {
        ...options,
        query: {
            client_key
        }
    });
    return res.data.data;
};
const attachPaymentIntent = async (data, client, options)=>{
    const { id, ...params } = data;
    const res = await client.post(`/payment_intents/${id}/attach`, {
        ...options,
        body: params
    });
    return res.data.data;
};

const createSource = async (data, client, options)=>{
    const res = await client.post("/sources", {
        ...options,
        body: data
    });
    return res.data.data;
};
const retrieveSource = async (data, client, options)=>{
    const res = await client.get(`sources/${data.id}`, options);
    return res.data.data;
};

const createPayment = async (data, client, options)=>{
    const res = await client.post("/payments", {
        ...options,
        body: data
    });
    return res.data.data;
};
const listAllPayments = async (data, client, options)=>{
    const res = await client.get("/payments", {
        ...options,
        query: {
            ...data
        }
    });
    return res.data.data;
};
const retrievePayment = async (data, client, options)=>{
    const res = await client.get(`/payments/${data.id}`, options);
    return res.data.data;
};

const createCheckoutSession = async (data, client, options)=>{
    const res = await client.post("/checkout_sessions", {
        ...options,
        body: data
    });
    return res.data.data;
};
const retrieveCheckoutSession = async (values, client, options)=>{
    const res = await client.get(`/checkout_sessions/${values.checkout_session_id}`, options);
    return res.data.data;
};
const expireCheckoutSession = async (values, client, options)=>{
    const res = await client.post(`/checkout_sessions/${values.checkout_session_id}/expire`, {
        ...options
    });
    return res.data.data;
};

const createRefund = async (data, client, options)=>{
    const res = await client.post("/refunds", {
        ...options,
        body: {
            data
        }
    });
    return res.data.data;
};
const retrieveRefund = async (data, client, options)=>{
    const res = await client.get(`/refunds/${data.id}`, options);
    return res.data.data;
}; // export const listAllRefunds = async (
 //   data: ListAllRefundsParam,
 //   client: HttpClient,
 //   options?: RequestOptions,
 // ) => {
 //   const queryParams: Record<string, string> = {};
 //   if (data.payment_id) queryParams.payment_id = data.payment_id;
 //   if (data.limit) queryParams.limit = String(data.limit);
 //   if (data.before) queryParams.before = data.before;
 //   if (data.after) queryParams.after = data.after;
 //   const res = await client.get<{ data: RefundResource[] }>("/refunds", {
 //     ...options,
 //     query: queryParams,
 //   });
 //   return res.data.data;
 // };

const createCustomer = async (data, client, options)=>{
    const res = await client.post("/customers", {
        ...options,
        body: data
    });
    return res.data.data;
};
const retrieveCustomer = async (data, client, options)=>{
    const res = await client.get(`/customers/${data.id}`, options);
    return res.data.data;
};
const editCustomer = async (data, client, options)=>{
    const res = await client.put(`/customers/${data.id}`, {
        ...options,
        body: data
    });
    return res.data.data;
};
const deleteCustomer = async (data, client, options)=>{
    const res = await client.delete(`/customers/${data.id}`, options);
    return res.data.data;
};

const createWebhook = async (data, client, options)=>{
    const res = await client.post("/webhooks", {
        ...options,
        body: {
            data
        }
    });
    return res.data.data;
};
const retrieveWebhook = async (data, client, options)=>{
    const res = await client.get(`/webhooks/${data.id}`, options);
    return res.data.data;
};
const listWebhooks = async (client)=>{
    const res = await client.get("/webhooks");
    return res.data.data;
};
const enableWebhook = async (data, client, options)=>{
    const res = await client.post(`/webhooks/${data.id}/enable`, {
        ...options,
        body: {}
    });
    return res.data.data;
};
const disableWebhook = async (data, client, options)=>{
    const res = await client.post(`/webhooks/${data.id}/disable`, {
        ...options,
        body: {}
    });
    return res.data.data;
};
const updateWebhook = async (data, client, options)=>{
    const res = await client.put(`/webhooks/${data.id}`, {
        ...options,
        body: {
            data
        }
    });
    return res.data.data;
};

const createLink = async (data, client, options)=>{
    const res = await client.post("/links", {
        ...options,
        body: {
            data
        }
    });
    return res.data.data;
};
const retrieveLink = async (data, client, options)=>{
    const res = await client.get(`/links/${data.id}`, options);
    return res.data.data;
};
const getLinkByReferenceNumber = async (data, client, options)=>{
    const res = await client.get(`/links`, {
        ...options,
        query: {
            reference_number: data.reference_number
        }
    });
    return res.data.data;
};
const archiveLink = async (data, client, options)=>{
    const res = await client.post(`/links/${data.id}/archive`, {
        ...options,
        body: {}
    });
    return res.data.data;
};
const unarchiveLink = async (data, client, options)=>{
    const res = await client.post(`/links/${data.id}/unarchive`, {
        ...options,
        body: {}
    });
    return res.data.data;
};

const toBase64 = (value)=>{
    // Prefer browser's btoa when available
    if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
        return globalThis.btoa(value);
    }
    // Fallback to Node/Bun Buffer API
    return Buffer.from(value, "utf8").toString("base64");
};
const createFn = (fn, client)=>{
    return (data)=>fn(data, client);
};
// New function for methods with optional parameters
const createNoParamFn = (fn, client)=>{
    return ()=>fn(client);
};
const Paymongo = (key, opts)=>{
    const client = opts?.client ?? createFetchClient("https://api.paymongo.com/v1", {
        // PayMongo expects Basic auth using base64(`${key}:`)
        Authorization: `Basic ${toBase64(`${key}:`)}`
    });
    const isSecret = key.includes("sk");
    if (typeof window !== "undefined" && isSecret) {
        throw new Error("Do not use the secret key in the browser");
    }
    return {
        paymentMethod: {
            create: createFn(createPaymentMethod, client),
            retrieve: createFn(retrievePaymentMethod, client)
        },
        paymentIntent: {
            create: createFn(createPaymentIntent, client),
            retrieve: createFn(retrievePaymentIntent, client),
            attach: createFn(attachPaymentIntent, client)
        },
        source: {
            create: createFn(createSource, client),
            retrieve: createFn(retrieveSource, client)
        },
        payment: {
            create: createFn(createPayment, client),
            retrieve: createFn(retrievePayment, client),
            list: createFn(listAllPayments, client)
        },
        checkout: {
            create: createFn(createCheckoutSession, client),
            retrieve: createFn(retrieveCheckoutSession, client),
            expire: createFn(expireCheckoutSession, client)
        },
        refund: {
            create: createFn(createRefund, client),
            retrieve: createFn(retrieveRefund, client)
        },
        customer: {
            create: createFn(createCustomer, client),
            retrieve: createFn(retrieveCustomer, client),
            edit: createFn(editCustomer, client),
            delete: createFn(deleteCustomer, client)
        },
        webhook: {
            create: createFn(createWebhook, client),
            retrieve: createFn(retrieveWebhook, client),
            list: createNoParamFn(listWebhooks, client),
            enable: createFn(enableWebhook, client),
            disable: createFn(disableWebhook, client),
            update: createFn(updateWebhook, client)
        },
        link: {
            create: createFn(createLink, client),
            retrieve: createFn(retrieveLink, client),
            getByReferenceNumber: createFn(getLinkByReferenceNumber, client),
            archive: createFn(archiveLink, client),
            unarchive: createFn(unarchiveLink, client)
        }
    };
};

export { HttpError, Paymongo, createFetchClient };
