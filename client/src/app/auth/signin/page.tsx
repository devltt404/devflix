import Providers from "@/components/auth/providers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

const SigninPage = async () => {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  const providers = await getProviders();

  return (
    <div className="flex min-h-screen animate-page-enter items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Sign in with one of the following providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Providers providers={providers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;
