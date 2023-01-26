import * as rsa from 'example-rsa'
import * as perm from './index'
import * as bcu from 'bigint-crypto-utils'

async function test () {

    const keypair = await rsa.generateRsaKeys(1024)
    
    const r = bcu.randBetween(keypair.publicKey.n - 1n)

    // Bob creates permission

    console.log('Permission Creation')
    
    const permission = await perm.createPermission("Bob", "file1");

    console.log('...Permission created for user: ' + permission.user + ' and file: ' + permission.filename + ' with a ' + permission.status + ' status')

    console.log('Permission Signing')

    // Alice signs permission
    console.log('...Creating signature content, encrypting it and signing it')

    const signatureContent = BigInt(await perm.prepareSignature(permission))

    const encryptedSignatureContent = signatureContent * keypair.publicKey.encrypt(r) % keypair.publicKey.n

    const signedContent = keypair.privateKey.sign(encryptedSignatureContent)
    const signedPermission = await perm.updatePermission(permission, "Alice", signedContent.toString(), r.toString())


    // Server checks signature
    console.log('...Checking if the obtained signature is a match')

    const obtainedSignature = BigInt(signedPermission.signature!) * bcu.modInv(r,keypair.publicKey.n)

    if (keypair.publicKey.verify(obtainedSignature) !== signatureContent) {
        console.log("...NO")
    } else {
        console.log("...YES")
    }

    console.log('Permission Revocation')
    // Bob revokes permison
    console.log('...Revocating permission, checking permission status')

    await perm.revokePermission(permission);
    console.log('...' + permission.status)

    console.log('...Unevocating permission, checking permission status')
    await perm.unrevokePermission(permission);
    console.log('...' + permission.status)

}

test()