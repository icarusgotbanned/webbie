import React from "react";

export const metadata = {
  title: "Absolute Assistant",
  description: "Your local AI assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
