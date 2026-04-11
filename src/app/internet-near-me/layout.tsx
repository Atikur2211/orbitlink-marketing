import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";

export default function InternetNearMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      {children}
      <SiteFooter />
    </>
  );
}