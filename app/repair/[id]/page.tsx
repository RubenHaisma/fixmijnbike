import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { RepairDetails } from "@/components/repair-details";

interface PageParams {
  id: string;
}

interface Props {
  params: Promise<PageParams>;
}

const prisma = new PrismaClient();

export default async function RepairDetailsPage({ params: paramsPromise }: Props) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }
  
  // Since we redirect if !session.user, we can safely assert id exists
  const userId = session.user.id as string;
  const userRole = session.user.role as string;
  
  const params = await paramsPromise;
  
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
          fixerProfile: true,
        },
      },
    },
  });
  
  if (!repair) {
    redirect("/dashboard");
  }
  
  const isAuthorized = 
    userRole === "ADMIN" || 
    repair.riderId === userId || 
    repair.fixerId === userId;
  
  if (!isAuthorized) {
    redirect("/dashboard");
  }
  
  return <RepairDetails repair={repair} userRole={userRole} userId={userId} />;
}