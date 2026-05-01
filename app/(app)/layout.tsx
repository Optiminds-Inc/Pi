import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <Sidebar />
      <div style={{ marginLeft: "var(--sidebar-width)" }}>{children}</div>
    </div>
  );
}
