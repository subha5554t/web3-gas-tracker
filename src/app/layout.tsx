import "../styles/globals.css";
import { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import UserMenu from "@/components/UserMenu";

export const metadata: Metadata = {
  title: "Gas Tracker Dashboard",
  description: "Real-time gas prices for Ethereum, Polygon, and Arbitrum",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
              <div
                className="max-w-7xl mx-auto px-4 py-4"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <h1 className="text-2xl font-bold text-gray-900">
                  ⚡ Gas Tracker Dashboard
                </h1>
                <UserMenu />
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
