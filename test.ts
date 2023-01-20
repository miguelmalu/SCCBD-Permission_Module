import * as rsa from 'example-rsa'
import * as perm from './index'
import * as bcu from 'bigint-crypto-utils'

async function test () {

    const keypair = await rsa.generateRsaKeys(1024)
    
    const r = bcu.randBetween(keypair.publicKey.n - 1n)

    // Bob creates permision

    console.log('Permision Creation')
    
    const permision = await perm.createPermision("Bob", "file1");

    console.log('...Permision created for user: ' + permision.user + ' and file: ' + permision.filename + ' with a ' + permision.status + ' status')

    console.log('Permision Signing')

    // Bob signs permision
    console.log('...Creating signature content, encrypting it and signing it')

    const signatureContent = BigInt(await perm.prepareSignature(permision))

    const encryptedSignatureContent = signatureContent * keypair.publicKey.encrypt(r) % keypair.publicKey.n

    const signedContent = keypair.privateKey.sign(encryptedSignatureContent)

    //Alice checks signature
    console.log('...Checking if the obtained signature is a match')

    const obtainedSignature = signedContent * bcu.modInv(r,keypair.publicKey.n)

    if (keypair.publicKey.verify(obtainedSignature) !== signatureContent) {
        console.log("...NO")
    } else {
        console.log("...YES")
    }

    console.log('Permision Revocation')
    // Bob revokes permison
    console.log('...Revocating permision, checking permision status')

    await perm.revokePermision(permision);
    console.log('...' + permision.status)

    console.log('...Unevocating permision, checking permision status')
    await perm.unrevokePermision(permision);
    console.log('...' + permision.status)

}

test()