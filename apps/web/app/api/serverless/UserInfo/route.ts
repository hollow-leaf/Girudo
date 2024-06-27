import { NextResponse, NextRequest } from "next/server";

export const runtime = 'edge'

export async function POST(request: NextRequest) {
try {
    const data = await request.formData();
    const sub: any = data.get("sub")

    const response = await fetch(`https://girudo-app.kidneyweakx.workers.dev/api/get_data?key=${sub}`, {
        method: 'GET',
    });

    const result = await response.json();

    return NextResponse.json({ result: result.data }, { status: 200 });

} catch (e) {
    console.log(e);
    return NextResponse.json(
    { error: "Internal Server Error" },
    { status: 500 }
    );
}
}