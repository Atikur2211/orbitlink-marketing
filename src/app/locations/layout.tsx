import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      {children}
      <SiteFooter />
    </>
  );
}