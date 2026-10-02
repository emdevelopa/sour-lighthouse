import { NextRequest, NextResponse } from "next/server";
import { runLightweightAudit } from "@/lib/auditor";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body.url;

    if (!url || typeof url !== "string" || url.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a valid website address" },
        { status: 400 }
      );
    }

    const result = await runLightweightAudit(url);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : "Something went wrong while testing this website";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
