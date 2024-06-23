"use client";

import { cn } from "@/lib/utils";
import { useDisconnectWallet } from "@mysten/dapp-kit";
import { SlMagnifier } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import { useMemo } from "react";
import useMeidaSize from "@/hooks/useMeidaSize";
import { toast } from "sonner";

const LoginMenu = () => {
  const screenWidth = useMeidaSize();
  const isDesktop = screenWidth >= 1280;
  const { mutate: disconnectWallet } = useDisconnectWallet();

  // const displayName = useMemo(() => {
  //   if (suiName) {
  //     if (suiName.length > 14) {
  //       return suiName.slice(0, 4) + "..." + suiName.slice(-3);
  //     }
  //
  //     return suiName;
  //   }
  //
  //   if (walletAddress) {
  //     return walletAddress?.slice(0, 5) + "..." + walletAddress?.slice(-4);
  //   }
  //
  //   return undefined;
  // }, [walletAddress, suiName]);

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger className="w-full h-full py-2 px-6 outline-none">
        <span>{"Jarek"}</span>
      </DropdownMenuTrigger>
      {/* Content */}
      <DropdownMenuContent
        align={"end"}
        className={cn(
          "relative flex w-40 flex-col items-center border-none overflow-hidden",
        )}
      >
        <DropdownMenuGroup className="w-full p-0 m-0 flex flex-col gap-2 py-1">
          {/* SUI */}
          <DropdownMenuItem className="DropdownMenuItem w-full">
            <button className="w-full flex items-center">
              <Image
                src="/images/sui-logo.svg"
                alt="sui-log"
                width={20}
                height={20}
              />
              <span className="w-2/3 ml-5 text-sm text-black text-left">
                Sui
              </span>
            </button>
          </DropdownMenuItem>
          {/* Ethereum */}
          <DropdownMenuItem className="DropdownMenuItem w-full">
            <button className="w-full flex items-center">
              <svg
                className="w-5"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Ethereum"
                role="img"
                viewBox="0 0 512 512"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path fill="#3C3C3B" d="m256 362v107l131-185z"></path>
                  <path fill="#343434" d="m256 41l131 218-131 78-132-78"></path>
                  <path
                    fill="#8C8C8C"
                    d="m256 41v158l-132 60m0 25l132 78v107"
                  ></path>
                  <path fill="#141414" d="m256 199v138l131-78"></path>
                  <path fill="#393939" d="m124 259l132-60v138"></path>
                </g>
              </svg>
              <span className="w-2/3 ml-5 text-sm text-black text-left">
                Ethereum
              </span>
            </button>
          </DropdownMenuItem>
          {/* Solana */}
          <DropdownMenuItem className="DropdownMenuItem w-full">
            <button className="w-full flex items-center">
              <Image
                src="/images/solana-logo.svg"
                alt="solana-log"
                width={20}
                height={20}
              />
              <span className="w-2/3 ml-5 text-sm text-black text-left">
                Solana
              </span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LoginMenu;
