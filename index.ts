import * as bcu from 'bigint-crypto-utils'

export class Permision {
    user: string
    filename: string
    status: boolean
    constructor (user: string, filename: string, status:boolean) {
        this.user = user
        this.filename = filename
        this.status = status
    }

    //Si no pots fer directament permision.status
    checkStatus (status: boolean) {
        return status
    }
}

export async function createPermision(user: string, filename:string) {
    let status = true
    const permision = new Permision(user, filename, status)

    return permision
}

export async function revokePermision(permision: Permision) {
    permision.status = false;
    return permision
}

export async function unrevokePermision(permision: Permision) {
    permision.status = true;
    return permision
}

export async function prepareSignature(permision: Permision) {
    let s = permision.user + '/' + permision.filename
    let preparedSignature = ''
    for(let i = 0; i < s.length; i++){
        let code = s.charCodeAt(i);
        preparedSignature += code.toString();
    }

    return preparedSignature
}
