import { randomUUID } from "node:crypto";

export const getUUID: () => string = () => randomUUID();
