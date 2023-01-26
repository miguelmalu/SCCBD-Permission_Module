export declare class Permission {
    owner?: string;
    user: string;
    filename: string;
    status?: boolean;
    signature?: string;
    r?: string;
    constructor(user: string, filename: string);
    checkStatus(status: boolean): boolean;
}
export declare function createPermission(user: string, filename: string): Promise<Permission>;
export declare function updatePermission(permission: Permission, owner: string, signature: string, r: string): Promise<Permission>;
export declare function revokePermission(permission: Permission): Promise<Permission>;
export declare function unrevokePermission(permission: Permission): Promise<Permission>;
export declare function prepareSignature(permission: Permission): Promise<string>;
