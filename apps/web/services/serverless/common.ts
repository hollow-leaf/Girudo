export const serverlessHost = "https://greenpower.wayneies1206.workers.dev"

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
        console.log(e)
        return undefined
    }
};

export async function getAvater(userId: string): Promise<string | undefined>{

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
        return undefined
    }
};