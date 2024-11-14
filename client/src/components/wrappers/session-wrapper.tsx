import { auth } from "@/lib/auth";
import { Session } from "next-auth";
import React, { ReactElement } from "react";

interface SessionWrapperProps {
  children: ReactElement<{ session: Session | null }>;
}

const SessionWrapper = async ({ children }: SessionWrapperProps) => {
  const session = await auth();

  return React.cloneElement(children, { session });
};

export default SessionWrapper;
