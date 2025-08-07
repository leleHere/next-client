import "./globals.css";
import "antd/dist/reset.css";
import "react-loading-skeleton/dist/skeleton.css";
import { DarkModeProvider } from "../components/DarkModeProvider";
import DarkModeToggle from "../components/DarkModeToggle/DarkModeToggle";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          <DarkModeToggle />
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
