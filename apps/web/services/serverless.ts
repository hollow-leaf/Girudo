import { UserInfo } from "@/type";

const member = process.env.NEXT_PUBLIC_MEMBER;

export async function saltByUserIdToken(sub: string): Promise<{salt: string, userInfo: UserInfo}> {
    const data = new FormData();
    data.set("sub", sub)

    const response = await fetch(`api/serverless/UserInfo`, {
        method: 'POST',
        body: data
    });

    const result = await response.json();
    console.log(result)
    if(result) {
        return userInfoFromString(result.result)
    } else {
        return {salt: "", userInfo: {username: "", avater: "", email: "", suiAddress: ""}}
    }
}

export async function setSaltByUserIdToken(sub: string, salt: string, userInfo: UserInfo): Promise<boolean> {
    const data = new FormData();
    data.set("sub", sub)
    data.set("userInfo", userInfoToString(salt, userInfo))

    const response = await fetch(`api/serverless/setUserInfo`, {
        method: 'POST',
        body: data
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