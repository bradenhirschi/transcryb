import Sidebar from "../../components/scaffold/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="sm:ml-64">{children}</div>
    </>
  );
}
