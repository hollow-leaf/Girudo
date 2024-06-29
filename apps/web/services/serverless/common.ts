export const serverlessHost = "https://greenpower.wayneies1206.workers.dev"

export const uploadFile = async (fileToUpload: string, userID: string) => {
    try {
        const data = new FormData();
        data.set("file", fileToUpload);
        data.set("userId", userID.split(" ")[0] as string)
        const res = await fetch(serverlessHost + "/uploadAvater", {
            method: "POST",
            body: data,
        });
        const resData = await res.json();
        return resData
    } catch (e) {
        console.log(e)
        return undefined
    }
};

export async function getAvater(userId: string): Promise<string | undefined>{

    try {
        const data = new FormData();
        data.set("userId", userId.split(" ")[0] as string);
        const res = await fetch(serverlessHost + "/getAvater", {
            method: "POST",
            body: data,
        });

        const resData = await res.json();

        return resData.avater
    } catch (e) {
        return undefined
    }
};

export async function getUserIdByEmail(userEmail: string): Promise<string> {
    try {
        const response = await fetch(serverlessHost + "/user/infoByemail", {
            method: 'POST',
            body: JSON.stringify({
                "email": userEmail
            })
        });
        if(response.status == 200) {
            const r = await response.json()
            if(r.length > 0) {
                console.log(r)
                return r[0].user_id
            } else {
                return ""
            }
        } else {
            return ""
        }
    } catch (e) {
        return ""
    }
}