import { Affiliate, Referral } from "@prisma/client";

export type AffiliateWithReferral = Affiliate & { referrals: Referral[] };
