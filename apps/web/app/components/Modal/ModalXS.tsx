import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react";
import React from "react";

export function ModalXs(props: {showBox: any, closed: any, children: React.ReactNode}) {
    return (
    <Transition appear show={props.showBox} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={props.closed}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-10" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-2 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="transform overflow-hidden rounded-md glass6 text-left align-middle shadow-xl transition-all">
                        <div className="flex justify-center items-center p-1">
                            {props.children}
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>)
}