import Sidebar from "@/components/sidebar";
import { requireUser } from "@/lib/auth-user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="flex min-h-screen">
      <Sidebar
        user={{
          name: user.name,
          email: user.email,
        }}
      />

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
