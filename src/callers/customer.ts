"use server";

import { asyncFn } from "@utils/utils";
import { trpc } from "@@trpc/router";

export const createCustomer = asyncFn(trpc.paymongo.createCustomer);

export const retrieveCustomer = asyncFn(trpc.paymongo.retrieveCustomer);

export const editCustomer = asyncFn(trpc.paymongo.editCustomer);

// export const listAllCustomers = asyncFn(trpc.paymongo.listAllCustomers);
