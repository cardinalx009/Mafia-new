import {SessionProvider} from "@/components/providers/SessionProvider";
import {AppHeader} from "@/components/AppHeader";
import {getServerAuthSession} from "@/server/auth";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession().catch(() => null);

  return (
    <SessionProvider session={session}>
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        {children}
      </main>
    </SessionProvider>
  );
}
