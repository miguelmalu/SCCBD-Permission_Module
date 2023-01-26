export class Permission {
    constructor(user, filename) {
        this.user = user;
        this.filename = filename;
    }
    //Si no pots fer directament permission.status
    checkStatus(status) {
        return status;
    }
}
export async function createPermission(user, filename) {
    const permission = new Permission(user, filename);
    return permission;
}
export async function updatePermission(permission, owner, signature, r) {
    permission.owner = owner;
    permission.status = true;
    permission.signature = signature;
    permission.r = r;
    return permission;
}
export async function revokePermission(permission) {
    permission.status = false;
    return permission;
}
export async function unrevokePermission(permission) {
    permission.status = true;
    return permission;
}
export async function prepareSignature(permission) {
    let s = permission.user + '/' + permission.filename;
    let preparedSignature = '';
    for (let i = 0; i < s.length; i++) {
        let code = s.charCodeAt(i);
        preparedSignature += code.toString();
    }
    return preparedSignature;
}
