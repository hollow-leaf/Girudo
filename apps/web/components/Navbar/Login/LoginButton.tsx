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
import { saltByUserIdToken, setSaltByUserIdToken } from '@/services/serverless/user';
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

    const { epoch } = await suiClient.getLatestSuiSystemState();

    const randomness = generateRandomness();
    const nonce = generateNonce(
      ephemeralKeyPair.getPublicKey(),
      Number(epoch) + 100,
      randomness
    );

    const params = new URLSearchParams({
      client_id: "1084217679515-8kvnn78pvg38dc88prm202c9dta2tsvd.apps.googleusercontent.com",
      redirect_uri: "https://girudo.pages.dev",
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
          <ModalXs isLoading={isLoading} showBox={isShow} closed={()=>{setIsShow(false)}}>
            <div className='w-[330px] lg:w-[450px] h-[600px] p-2'>
              <div className='w-full flex justify-center mt-6 px-2 lg:px-8'>
              {activeStep == 0 && <SignInWithGoogle loginHandler={zkLogin}/>}
              {activeStep == 1 && <div>Successful</div>}
              {activeStep == 2 && <RegisterForm sub={decodedJwt?.sub} loading={setIsLoading}/>}
              </div>
            </div>
          </ModalXs>
      </div>
  )
}