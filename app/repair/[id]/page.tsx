import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { RepairDetails } from "@/components/repair-details";

const prisma = new PrismaClient();

export default async function RepairDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }
  
  // Fetch repair details
  const repair = await prisma.repair.findUnique({
    where: {
      id: params.id,
    },
    include: {
      rider: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          postalCode: true,
        },
      },
      fixer: {
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          postalCode: true,
          hourlyRate: true,
        },
      },
    },
  });
  
  if (!repair) {
    redirect("/dashboard");
  }
  
  // Check if user is authorized to view this repair
  const isAuthorized = 
    session.user.role === "ADMIN" || 
    repair.riderId === session.user.id || 
    repair.fixerId === session.user.id;
  
  if (!isAuthorized) {
    redirect("/dashboard");
  }
  
  return <RepairDetails repair={repair} userRole={session.user.role} userId={session.user.id} />;
}