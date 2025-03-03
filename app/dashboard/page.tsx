import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { RiderDashboard } from "@/components/rider-dashboard";
import { FixerDashboard } from "@/components/fixer-dashboard";
import { AdminDashboard } from "@/components/admin-dashboard";

// Force dynamic rendering to handle session fetching
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }
  
  // Render different dashboard based on user role
  if (session.user.role === "ADMIN") {
    return <AdminDashboard />;
  } else if (session.user.role === "FIXER") {
    return <FixerDashboard />;
  } else {
    return <RiderDashboard />;
  }
}