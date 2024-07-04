import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "포켓몬 도감",
  description: "피카츄라이츄파이리꼬부기 우리는 모두 친구 마자용",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header
          style={{
            backgroundColor: "#393939",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <img
              src="/pokemon-logo.png"
              alt="Pokemon Logo"
              style={{ width: "149px" }}
            />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
