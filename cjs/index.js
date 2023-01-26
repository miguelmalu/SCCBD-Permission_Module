"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSignature = exports.unrevokePermission = exports.revokePermission = exports.updatePermission = exports.createPermission = exports.Permission = void 0;
class Permission {
    constructor(user, filename) {
        this.user = user;
        this.filename = filename;
    }
    //Si no pots fer directament permission.status
    checkStatus(status) {
        return status;
    }
}
exports.Permission = Permission;
async function createPermission(user, filename) {
    const permission = new Permission(user, filename);
    return permission;
}
exports.createPermission = createPermission;
async function updatePermission(permission, owner, signature, r) {
    permission.owner = owner;
    permission.status = true;
    permission.signature = signature;
    permission.r = r;
    return permission;
}
exports.updatePermission = updatePermission;
async function revokePermission(permission) {
    permission.status = false;
    return permission;
}
exports.revokePermission = revokePermission;
async function unrevokePermission(permission) {
    permission.status = true;
    return permission;
}
exports.unrevokePermission = unrevokePermission;
async function prepareSignature(permission) {
    let s = permission.user + '/' + permission.filename;
    let preparedSignature = '';
    for (let i = 0; i < s.length; i++) {
        let code = s.charCodeAt(i);
        preparedSignature += code.toString();
    }
    return preparedSignature;
}
exports.prepareSignature = prepareSignature;
