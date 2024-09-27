import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import AuthProvider from "./auth/AuthProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Theme accentColor="purple" appearance="light">
            <Container>
            <NavBar></NavBar>
            </Container>
            <main className="p-5">
              <Container maxWidth="xl">{children}</Container>
            </main>
            {/* <ThemePanel /> */}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
