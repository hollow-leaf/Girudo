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
    if(result.data != null) {
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

export const uploadFile = async (fileToUpload: string, userID: string) => {
    try {
        const data = new FormData();
        data.set("file", fileToUpload);
        data.set("userId", userID)
        const res = await fetch("https://greenpower.wayneies1206.workers.dev/uploadAvater", {
            method: "POST",
            body: data,
        });
        const resData = await res.json();
        return resData.IpfsHash
    } catch (e) {
        console.log(e);
        return undefined
    }
};

export async function getAvater(userId: string){

    try {
        const data = new FormData();
        data.set("userId", userId);
        const res = await fetch("https://greenpower.wayneies1206.workers.dev/getAvater", {
            method: "POST",
            body: data,
        });

        const resData = await res.json();

        return resData.avater
    } catch (e) {
        console.log(e);
        return undefined
    }
};