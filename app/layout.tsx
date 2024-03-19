import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components";
import StyledComponentsRegistry from "@/lib/registry";
import { navData } from "@/data/nav-data";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        suppressHydrationWarning={true}
        style={{
          maxWidth: "100%",
          overflowX: "hidden",
        }}
      >
        <StyledComponentsRegistry>
          <Nav navData={navData} />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
