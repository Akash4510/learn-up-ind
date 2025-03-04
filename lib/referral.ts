import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

export const getReferralCodeFromCookies = async () => {
  const cookieStore = await cookies();
  const referralCode = cookieStore.get("referralCode");
  return referralCode?.value;
};

export const generateReferralCode = (): string => {
  return uuidv4();
};
