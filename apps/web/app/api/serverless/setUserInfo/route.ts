import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const sub: any = data.get("sub")
        const userInfo: any = data.get("userInfo")

        const response = await fetch(`https://girudo-app.kidneyweakx.workers.dev/api/add_data?member=solo&key=${sub}&data=${userInfo}`, {
            method: 'POST',
        });

        const result = await response.json();

        console.log(result)
        return NextResponse.json({ result: result.data }, { status: 200 });

    } catch (e) {
        console.log(e);
        return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
        );
    }
}