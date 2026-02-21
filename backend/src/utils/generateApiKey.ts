import crypto from "crypto";

export const generateApiKey = (prefix: string) => {
  const random = crypto.randomBytes(32).toString("hex");
  return `${prefix}_${random}`;
};