export class Permision {
    constructor(user, filename, status) {
        this.user = user;
        this.filename = filename;
        this.status = status;
    }
    //Si no pots fer directament permision.status
    checkStatus(status) {
        return status;
    }
}
export async function createPermision(user, filename) {
    let status = true;
    const permision = new Permision(user, filename, status);
    return permision;
}
export async function revokePermision(permision) {
    permision.status = false;
    return permision;
}
export async function unrevokePermision(permision) {
    permision.status = true;
    return permision;
}
export async function prepareSignature(permision) {
    let s = permision.user + '/' + permision.filename;
    let preparedSignature = '';
    for (let i = 0; i < s.length; i++) {
        let code = s.charCodeAt(i);
        preparedSignature += code.toString();
    }
    return preparedSignature;
}
