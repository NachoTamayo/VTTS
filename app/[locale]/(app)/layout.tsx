import { Layout } from "@/components/layout/layout";
import "@/styles/globals.css";
import { Toaster } from "sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
      <Toaster richColors closeButton position="top-center" />
    </Layout>
  );
}
