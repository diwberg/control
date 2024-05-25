import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from "@clerk/localizations";

import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-client-provider";
import { SheetProvider } from "@/components/providers/sheet-provider";
import "./globals.css";
import 'intro.js/introjs.css';
import 'intro.js/themes/introjs-modern.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Control",
  description: "Gestor de finanças pessoais, não perca mais o controle do seu fluxo de caixa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <QueryProvider>
              <SheetProvider />
              <Toaster />
              {children}
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
