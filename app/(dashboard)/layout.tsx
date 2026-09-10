import Sidebar from "@/components/sidebar";

import { requireUser } from "@/lib/auth-user";
type SidebarProps = {
  user: {
    name: string;
    email: string;
  };
};
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
          name: user.name || "User",
          email: user.email,
        }}
      />

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
