export class Permission {
    owner?: string
    user: string
    filename: string
    status?: boolean
    signature?: string
    r?: string
    constructor (user: string, filename: string) {
        this.user = user
        this.filename = filename
    }

    //Si no pots fer directament permission.status
    checkStatus (status: boolean) {
        return status
    }
}

export async function createPermission(user: string, filename:string) {
    const permission = new Permission(user, filename)
    return permission
}

export async function updatePermission(permission:Permission, owner: string, signature:string, r:string) {
    permission.owner = owner
    permission.status = true
    permission.signature = signature
    permission.r = r
    return permission
}

export async function revokePermission(permission: Permission) {
    permission.status = false;
    return permission
}

export async function unrevokePermission(permission: Permission) {
    permission.status = true;
    return permission
}

export async function prepareSignature(permission: Permission) {
    let s = permission.user + '/' + permission.filename
    let preparedSignature = ''
    for(let i = 0; i < s.length; i++){
        let code = s.charCodeAt(i);
        preparedSignature += code.toString();
    }

    return preparedSignature
}
