import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      {children}
      <SiteFooter />
    </>
  );
}