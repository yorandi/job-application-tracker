import "./globals.css";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
