import { UserInfo } from "@/type";

const member = process.env.NEXT_PUBLIC_MEMBER;

export async function saltByUserIdToken(sub: string): Promise<{salt: string, userInfo: UserInfo}> {
    const data = new FormData();
    data.set("sub", sub)

    const response = await fetch(`https://girudo-app.kidneyweakx.workers.dev/api/get_data?key=${sub}`, {
       method: 'GET'
    });

    const result = await response.json();
    console.log(result)
    if(result) {
        return userInfoFromString(result.data)
    } else {
        return {salt: "", userInfo: {username: "", avater: "", email: "", suiAddress: ""}}
    }
}

export async function setSaltByUserIdToken(sub: string, salt: string, userInfo: UserInfo): Promise<boolean> {

    const response = await fetch(`https://girudo-app.kidneyweakx.workers.dev/api/add_data?member=solo&key=${sub}&data=${userInfoToString(salt, userInfo)}`, {
        method: 'POST',
    });
    if(response.status == 200) {
        return true
    } else {
        return false
    }
}

function userInfoToString(salt: string, userInfo: UserInfo): string {
    var res = ""
    for (const [key, value] of Object.entries(userInfo)) {
        res = res + String(`${value}`)+","
    }
    res = res + salt

    return res
}

function userInfoFromString(s: string): {salt: string, userInfo: UserInfo} {
    const a: any = s.split(",")
    return {salt: a[4], userInfo: {username: a[0], avater: a[2], email: a[1], suiAddress: a[3]}}
}