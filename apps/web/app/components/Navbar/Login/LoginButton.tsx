import React from 'react';
import { useState } from "react"
import { ModalXs } from "../../../../components/Modal/ModalXS"
import { startRegistration } from '@simplewebauthn/browser'
import { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types'
import { generateRegistrationOptions } from '@simplewebauthn/server'
import type { GenerateRegistrationOptionsOpts } from '@simplewebauthn/server'
import { Button } from '../../common/button';

export function LoginButton() {

    const [isShow, setIsShow] = useState<boolean>(true)

    async function webAuthenTest() {
        const opts: GenerateRegistrationOptionsOpts = {
            rpName: 'Girudo Login',
            rpID: "Girudo20240624",
            userName: "Solo",
            timeout: 60000,
            attestationType: 'none',
            authenticatorSelection: {
              residentKey: 'discouraged',
              userVerification: 'preferred',
            },
            supportedAlgorithmIDs: [-7, -257],
        };
        const options = await generateRegistrationOptions(opts);

        const t = await startRegistration(options)
        console.log(t)
    }

    return (
        <div>
            <button onClick={()=>{setIsShow(true)}} className="bg-cBlue px-4 py-2 text-medium rounded-lg">Login</button>
            <ModalXs showBox={isShow} closed={()=>{setIsShow(false)}}>
                <Button name='Login' handler={webAuthenTest} />
            </ModalXs>
        </div>
    )
}