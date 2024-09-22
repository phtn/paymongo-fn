import axios from 'axios';

const createAxiosInstance = (config)=>axios.create({
        ...config,
        headers: {
            common: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            ...config?.headers
        },
        baseURL: "https://api.paymongo.com/v1"
    });

const createPaymentMethod = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post("/payment_methods", data, config);
    return res.data.data;
};
const retreivePaymentMethod = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.get(`/payment_methods/${data.id}`, config);
    return res.data.data;
};

const createPaymentIntent = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post("/payment_intents", data, config);
    return res.data.data;
};
const retrievePaymentIntent = async (data, axiosInstance, config)=>{
    const { id, client_key } = data;
    const res = await axiosInstance.get(`/payment_intents/${id}`, {
        params: {
            client_key
        },
        ...config
    });
    return res.data.data;
};
const attachPaymentIntent = async (data, axiosInstance, config)=>{
    const { id, ...params } = data;
    const res = await axiosInstance.post(`/payment_intents/${id}/attach`, params, config);
    return res.data.data;
};

const createSource = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post("/sources", data, config);
    return res.data.data;
};
const retrieveSource = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.get(`sources/${data.id}`, config);
    return res.data.data;
};

const createPayment = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post("/payments", data, config);
    return res.data.data;
};
const listAllPayments = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.get("/payments", {
        ...config,
        params: {
            ...data
        }
    });
    return res.data.data;
};
const retrievePayment = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.get(`/payments/${data.id}`, config);
    return res.data.data;
};

const createCheckoutSession = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post("/checkout_sessions", data, config);
    return res.data.data;
};
const retrieveCheckoutSession = async (values, axiosInstance, config)=>{
    const res = await axiosInstance.get(`/checkout_sessions/${values.checkout_session_id}`, config);
    return res.data.data;
};
const expireCheckoutSession = async (values, axiosInstance, config)=>{
    const res = await axiosInstance.post(`/checkout_sessions/${values.checkout_session_id}/expire`, config);
    return res.data.data;
};

const createRefund = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post("/refunds", {
        data
    }, config);
    return res.data.data;
};
const retrieveRefund = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.get(`/refunds/${data.id}`, config);
    return res.data.data;
}; // export const listAllRefunds = async (
 //   data: ListAllRefundsParam,
 //   axiosInstance: AxiosInstance,
 //   config?: AxiosRequestConfig,
 // ) => {
 //   const queryParams = new URLSearchParams();
 //   if (data.payment_id) queryParams.append("payment_id", data.payment_id);
 //   if (data.limit) queryParams.append("limit", data.limit.toString());
 //   if (data.before) queryParams.append("before", data.before);
 //   if (data.after) queryParams.append("after", data.after);
 //   const res = await axiosInstance.get<{ data: RefundResource[] }>(
 //     `/refunds?${queryParams.toString()}`,
 //     config,
 //   );
 //   return res.data.data;
 // };

const createCustomer = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post("/customers", data, config);
    return res.data.data;
};
const retrieveCustomer = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.get(`customers/${data.id}`, config);
    return res;
};
const editCustomer = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.put(`customers/${data.id}`, data, config);
    return res.data.data;
};
const deleteCustomer = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.delete(`customers/${data.id}`, config);
    return res.data.data;
};

const createWebhook = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post("/webhooks", {
        data
    }, config);
    return res.data.data;
};
const retrieveWebhook = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.get(`/webhooks/${data.id}`, config);
    return res.data.data;
};
const listWebhooks = async (axiosInstance, config)=>{
    const res = await axiosInstance.get("/webhooks", config);
    return res.data.data;
};
const enableWebhook = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post(`/webhooks/${data.id}/enable`, {}, config);
    return res.data.data;
};
const disableWebhook = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post(`/webhooks/${data.id}/disable`, {}, config);
    return res.data.data;
};
const updateWebhook = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.put(`/webhooks/${data.id}`, {
        data
    }, config);
    return res.data.data;
};

const createLink = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post("/links", {
        data
    }, config);
    return res.data.data;
};
const retrieveLink = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.get(`/links/${data.id}`, config);
    return res.data.data;
};
const getLinkByReferenceNumber = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.get(`/links?reference_number=${data.reference_number}`, config);
    return res.data.data;
};
const archiveLink = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post(`/links/${data.id}/archive`, {}, config);
    return res.data.data;
};
const unarchiveLink = async (data, axiosInstance, config)=>{
    const res = await axiosInstance.post(`/links/${data.id}/unarchive`, {}, config);
    return res.data.data;
};

const btoa = (string)=>{
    if (typeof window === "undefined") {
        return Buffer.from(string).toString("base64");
    }
    return window.btoa(string);
};
const createFn = (fn, axiosInstance)=>{
    return (data)=>fn(data, axiosInstance);
};
// New function for methods with optional parameters
const createNoParamFn = (fn, axiosInstance)=>{
    return ()=>fn(axiosInstance);
};
const Paymongo = (key)=>{
    const axiosInstance = createAxiosInstance({
        headers: {
            Authorization: `Basic ${btoa(key)}`
        }
    });
    const isSecret = key.includes("sk");
    if (typeof window !== "undefined" && isSecret) {
        throw new Error("Do not use the secret key in the browser");
    }
    return {
        paymentMethod: {
            create: createFn(createPaymentMethod, axiosInstance),
            retrieve: createFn(retreivePaymentMethod, axiosInstance)
        },
        paymentIntent: {
            create: createFn(createPaymentIntent, axiosInstance),
            retrieve: createFn(retrievePaymentIntent, axiosInstance),
            attach: createFn(attachPaymentIntent, axiosInstance)
        },
        source: {
            create: createFn(createSource, axiosInstance),
            retrieve: createFn(retrieveSource, axiosInstance)
        },
        payment: {
            create: createFn(createPayment, axiosInstance),
            retrieve: createFn(retrievePayment, axiosInstance),
            list: createFn(listAllPayments, axiosInstance)
        },
        checkout: {
            create: createFn(createCheckoutSession, axiosInstance),
            retrieve: createFn(retrieveCheckoutSession, axiosInstance),
            expire: createFn(expireCheckoutSession, axiosInstance)
        },
        refund: {
            create: createFn(createRefund, axiosInstance),
            retrieve: createFn(retrieveRefund, axiosInstance)
        },
        customer: {
            create: createFn(createCustomer, axiosInstance),
            retrieve: createFn(retrieveCustomer, axiosInstance),
            edit: createFn(editCustomer, axiosInstance),
            delete: createFn(deleteCustomer, axiosInstance)
        },
        webhook: {
            create: createFn(createWebhook, axiosInstance),
            retrieve: createFn(retrieveWebhook, axiosInstance),
            list: createNoParamFn(listWebhooks, axiosInstance),
            enable: createFn(enableWebhook, axiosInstance),
            disable: createFn(disableWebhook, axiosInstance),
            update: createFn(updateWebhook, axiosInstance)
        },
        link: {
            create: createFn(createLink, axiosInstance),
            retrieve: createFn(retrieveLink, axiosInstance),
            getByReferenceNumber: createFn(getLinkByReferenceNumber, axiosInstance),
            archive: createFn(archiveLink, axiosInstance),
            unarchive: createFn(unarchiveLink, axiosInstance)
        }
    };
};

export { Paymongo };
