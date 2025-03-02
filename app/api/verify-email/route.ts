import { NextResponse } from "next/server";
import { verifyEmail } from "@/lib/email";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    
    if (!token) {
      return NextResponse.json(
        { error: "Token is vereist" },
        { status: 400 }
      );
    }
    
    await verifyEmail(token);
    
    return NextResponse.json(
      { success: true, message: "E-mailadres succesvol geverifieerd" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Email verification error:", error);
    
    if (error.message === "Invalid token") {
      return NextResponse.json(
        { error: "Ongeldig verificatietoken" },
        { status: 400 }
      );
    }
    
    if (error.message === "Token expired") {
      return NextResponse.json(
        { error: "Verificatietoken is verlopen. Vraag een nieuwe verificatie aan." },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verifiëren van je e-mailadres" },
      { status: 500 }
    );
  }
}