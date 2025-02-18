import { useSession } from "next-auth/react";

export const useAuth = () => {
  const session = useSession();
  const user = session.data?.user;
  const authStatus = session.status;

  return { user, authStatus, session };
};
