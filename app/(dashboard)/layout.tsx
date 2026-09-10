import Sidebar from "@/components/sidebar";

import { requireUser } from "@/lib/auth-user";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <Sidebar
        user={{
          name: user.name || "User",
          email: user.email,
        }}
      />

      <div className="min-w-0 flex-1 break-words">{children}</div>
    </div>
  );
}
