"use server";

import { asyncFn } from "@utils/utils";
import { trpc } from "@@trpc/router";

export const createCheckout = asyncFn(trpc.paymongo.createCheckout);
