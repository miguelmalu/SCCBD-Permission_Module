export declare class Permision {
    user: string;
    filename: string;
    status: boolean;
    constructor(user: string, filename: string, status: boolean);
    checkStatus(status: boolean): boolean;
}
export declare function createPermision(user: string, filename: string): Promise<Permision>;
export declare function revokePermision(permision: Permision): Promise<Permision>;
export declare function unrevokePermision(permision: Permision): Promise<Permision>;
export declare function prepareSignature(permision: Permision): Promise<string>;
