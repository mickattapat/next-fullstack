import Providers from "@/components/Providers";

export const metadata = {
  title: "Dashboard Page",
  description: "Generated by create next app",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <>{children}</>
        </Providers>
      </body>
    </html>
  );
}