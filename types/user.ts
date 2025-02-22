import { KYC, User } from "@prisma/client";

export type UserWithKYC = User & { kyc: KYC | null };
