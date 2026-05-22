"use client";

import {signIn} from "next-auth/react";
import {useParams} from "next/navigation";

export default function SignInPage() {
  const params = useParams<{locale: string}>();
  const locale = params?.locale ?? "en";

  return (
    <div className="mx-auto mt-24 max-w-md rounded-2xl border p-6">
      <div className="text-xl font-semibold">Sign in</div>
      <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
        Google аккаунт orqali kirish.
      </div>

      <button
        onClick={() => signIn("google", {callbackUrl: `/${locale}`})}
        className="mt-6 w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Continue with Google
      </button>
    </div>
  );
}

