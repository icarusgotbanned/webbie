export const metadata = {
  title: "Absolute Assistant",
  description: "Your local AI assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


