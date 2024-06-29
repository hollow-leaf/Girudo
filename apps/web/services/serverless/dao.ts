import { randomBytes } from "crypto"
import { getUserIdByEmail, serverlessHost, uploadFile } from "./common";
import { member, task } from "@/app/type";

export async function createDAO(dao_name: string, dao_description: string, sub: string, avater: string): Promise<boolean> {
    const dao_id = randomBytes(32);
    const dao_id_string = dao_id.toString('base64');

    const response = await fetch(serverlessHost + "/dao/new", {
        method: 'POST',
        body: JSON.stringify({
            "dao_id": dao_id_string,
            "dao_name": dao_name,
            "dao_description": dao_description,
        })
    });
    if(response.status == 200) {
        //Set creator
        const _r = await addCreator(dao_id_string, "creator", sub)
        if(avater != "") await uploadFile(avater, dao_id_string)

        return _r
    } else {
        return false
    }
}

export async function addMember(dao_id: string, member_role: string, userEmail: string): Promise<boolean> {

    const userId = await getUserIdByEmail(userEmail)
    console.log(userId)

    const response = await fetch(serverlessHost + "/dao/newMember", {
        method: 'POST',
        body: JSON.stringify({
            "sub": userId,
            "dao_id": dao_id,
            "member_role": member_role,
        })
    });
    if(response.status == 200) {
        return true
    } else {
        return false
    }
}

export async function addCreator(dao_id: string, member_role: string, userId: string): Promise<boolean> {

    const response = await fetch(serverlessHost + "/dao/newMember", {
        method: 'POST',
        body: JSON.stringify({
            "sub": userId,
            "dao_id": dao_id,
            "member_role": member_role,
        })
    });
    if(response.status == 200) {
        return true
    } else {
        return false
    }
}

export async function daoMember(dao_id: string): Promise<member[]> {
    const response = await fetch(serverlessHost + "/dao/member", {
        method: 'POST',
        body: JSON.stringify({
            "dao_id": dao_id,
        })
    });
    if(response.status == 200) {
        const r = await response.json()
        console.log(r)
        return r
    } else {
        return []
    }
}

export async function daoTask(dao_id: string): Promise<task[]> {
    const response = await fetch(serverlessHost + "/dao/task", {
        method: 'POST',
        body: JSON.stringify({
            "dao_id": dao_id,
        })
    });
    if(response.status == 200) {
        const r = await response.json()
        console.log(r)
        return r
    } else {
        return []
    }
}
