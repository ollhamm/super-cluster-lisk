import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const RPC_URL = "https://rpc.testnet.mantle.xyz";

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    const bodyText = await request.text();
    console.log("📨 Received:", bodyText);

    let requestBody;
    try {
      requestBody = JSON.parse(bodyText);
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid JSON", message: "Request body must be valid JSON" },
        { status: 400 }
      );
    }

    // Ensure proper JSON-RPC format
    if (!requestBody.jsonrpc) {
      requestBody.jsonrpc = "2.0";
    }
    if (!requestBody.id) {
      requestBody.id = 1;
    }

    console.log("📤 Sending to RPC:", JSON.stringify(requestBody));

    const response = await fetch(RPC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
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
