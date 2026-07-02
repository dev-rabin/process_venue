import WebSocketProvider from "@/components/WebsocketProvider";
import "./globals.css";
import Providers from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <WebSocketProvider>{children}</WebSocketProvider>
        </Providers>
      </body>
    </html>
  );
}
