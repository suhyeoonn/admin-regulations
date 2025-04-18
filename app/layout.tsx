import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import SidebarContainer from "@/components/layout/sidebar-container";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

async function getCategories() {
  const response = await fetch(`${process.env.API_URL}/api`); // TODO: next config로 프록시설정
  return response.json();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1 overflow-hidden">
            <SidebarContainer categories={categories}>
              {children}
            </SidebarContainer>
          </div>
        </div>
      </body>
    </html>
  );
}
