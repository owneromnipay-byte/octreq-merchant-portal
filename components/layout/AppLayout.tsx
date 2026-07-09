import Sidebar from "./sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">

        <Sidebar />

        <section className="flex-1 p-8">
          {children}
        </section>

      </div>
    </main>
  );
}