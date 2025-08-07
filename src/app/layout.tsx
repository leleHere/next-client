import "./globals.css";
import "antd/dist/reset.css";
import "react-loading-skeleton/dist/skeleton.css";
import { DarkModeProvider } from "../components/DarkModeProvider";
import DarkModeToggle from "../components/DarkModeToggle";
import { Header } from "../components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          <Header />
          <div style={{ paddingTop: "64px" }}>{children}</div>
        </DarkModeProvider>
      </body>
    </html>
  );
}
