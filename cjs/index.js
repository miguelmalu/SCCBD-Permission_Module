"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareSignature = exports.unrevokePermision = exports.revokePermision = exports.createPermision = exports.Permision = void 0;
class Permision {
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
exports.Permision = Permision;
async function createPermision(user, filename) {
    let status = true;
    const permision = new Permision(user, filename, status);
    return permision;
}
exports.createPermision = createPermision;
async function revokePermision(permision) {
    permision.status = false;
    return permision;
}
exports.revokePermision = revokePermision;
async function unrevokePermision(permision) {
    permision.status = true;
    return permision;
}
exports.unrevokePermision = unrevokePermision;
async function prepareSignature(permision) {
    let s = permision.user + '/' + permision.filename;
    let preparedSignature = '';
    for (let i = 0; i < s.length; i++) {
        let code = s.charCodeAt(i);
        preparedSignature += code.toString();
    }
    return preparedSignature;
}
exports.prepareSignature = prepareSignature;
