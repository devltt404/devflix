"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { Button } from "../ui/button";

interface ProvidersProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType>,
    ClientSafeProvider
  > | null;
}

const Providers = ({ providers }: ProvidersProps) => {
  return Object.values(providers ?? {}).map((provider) => (
    <div key={provider.name}>
      <Button className="w-full" onClick={() => signIn(provider.id)}>
        Sign in with {provider.name}
      </Button>
    </div>
  ));
};

export default Providers;
