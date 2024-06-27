"use client";
import React, { useEffect } from 'react';
import { useState } from "react"
import { ModalXs } from "../../../components/Modal/ModalXS"
import { Button } from '../../../app/components/common/button';
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { SuiClient } from "@mysten/sui.js/client";
import {
  genAddressSeed,
  generateNonce,
  generateRandomness,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
  jwtToAddress,
} from "@mysten/zklogin";
import { JwtPayload, jwtDecode } from "jwt-decode";
import queryString from "query-string";
import { saltByUserIdToken, setSaltByUserIdToken } from '@/services/serverless';
import { useLoginStore } from '@/stores/useUserStore';
import { RegisterForm } from './RegisterForm';
import { Loading } from '@/app/components/common/loading';
import { SignInWithGoogle } from './SignInWithGoogle';

const suiClient = new SuiClient({ url: "https://sui-rpc.publicnode.com" });

//step0: google login, step1: login complete, step2: register page

export function LoginButton() {
  
  const {suiUserInfo, userInfo, loginByJwt} = useLoginStore();

  const [isShow, setIsShow] = useState<boolean>(false)
  const [ephemeralKeyPair, setEphemeralKeyPair] = useState<Ed25519Keypair>()
  const [oauthParams, setOauthParams] = useState<queryString.ParsedQuery<string>>();
  const [jwtString, setJwtString] = useState("");
  const [decodedJwt, setDecodedJwt] = useState<JwtPayload>();
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const res = queryString.parse(window.location.hash);
    setOauthParams(res);
  }, []);

  useEffect(() => {
    if (oauthParams && oauthParams.id_token) {
      const decodedJwt = jwtDecode(oauthParams.id_token as string);
      setJwtString(oauthParams.id_token as string);
      console.log(oauthParams.id_token)
      setDecodedJwt(decodedJwt);
      loginBySub(oauthParams.id_token as string, decodedJwt.sub as string)
    }
  }, [oauthParams]);

  async function zkLogin() {
    setIsLoading(true)
    const ephemeralKeyPair = Ed25519Keypair.generate();
                window.sessionStorage.setItem(
                  "girudo_ephemeral_key_pair",
                  ephemeralKeyPair.export().privateKey
                );
    setEphemeralKeyPair(ephemeralKeyPair);
    console.log(ephemeralKeyPair)

    const { epoch } = await suiClient.getLatestSuiSystemState();

    console.log("Epoch now: ", epoch)
    const randomness = generateRandomness();
    const nonce = generateNonce(
      ephemeralKeyPair.getPublicKey(),
      Number(epoch) + 100,
      randomness
    );

    console.log("Nonce: ", nonce)

    const params = new URLSearchParams({
      client_id: "1084217679515-8kvnn78pvg38dc88prm202c9dta2tsvd.apps.googleusercontent.com",
      redirect_uri: "http://localhost:3000",
      response_type: "id_token",
      scope: "openid",
      nonce: nonce,
    });

    googleAuthen(params)
    setIsLoading(false)
  }

  async function googleAuthen(params: URLSearchParams) {
    const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    window.location.replace(loginURL);
  }

  async function loginBySub(_jwt: string, sub: string) {
    const _userInfo = await saltByUserIdToken(sub)
    if(_userInfo.salt == "") {
      setActiveStep(2)
      setIsShow(true)
      return
    }
    loginByJwt(_jwt)
    setActiveStep(1)
  }

  return (
      <div>
          <button onClick={()=>{setIsShow(true)}} className="bg-cBlue text-white px-4 py-2 text-medium rounded-lg">Login</button>
          <ModalXs showBox={isShow} closed={()=>{setIsShow(false)}}>
            {isLoading && <Loading />}
            <div className='w-[420px] h-[600px] p-2'>
              <div className="flex justify-end opacity-60">
                  <svg onClick={() => {setIsShow(false)}} className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                  <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
                  </svg>
              </div>
              <div className='mt-6 px-8'>
              {activeStep == 0 && <SignInWithGoogle loginHandler={zkLogin}/>}
              {activeStep == 1 && <div>Successful</div>}
              {activeStep == 2 && <RegisterForm sub={decodedJwt?.sub} loading={setIsLoading}/>}
              </div>
            </div>
          </ModalXs>
      </div>
  )
}