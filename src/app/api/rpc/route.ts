import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const RPC_URL = "https://rpc.testnet.mantle.xyz";

export async function POST(request: NextRequest) {
  try {
    // Get raw body to preserve exact format
    const body = await request.text();

    console.log("📨 RPC Request:", body.substring(0, 200));

    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    const responseText = await response.text();
    console.log(
      "📥 RPC Response:",
      response.status,
      responseText.substring(0, 200)
    );

    if (!response.ok) {
      console.error("❌ RPC Error:", response.status, responseText);
      return new NextResponse(responseText, {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    return new NextResponse(responseText, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("💥 RPC Proxy Error:", error);
    return NextResponse.json(
      { error: "RPC request failed", message: String(error) },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
