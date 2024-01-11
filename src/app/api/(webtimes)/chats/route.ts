import { NextRequest, NextResponse } from "next/server";
import Ably from "ably/promises";

export async function GET(request: NextRequest) {
    const client = new Ably.Realtime(process.env.ABLY_API_KEY!);
    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'ably-nextjs-demo' });

    console.log(`Request: ${JSON.stringify(tokenRequestData)}`)
    return Response.json(tokenRequestData);
}
