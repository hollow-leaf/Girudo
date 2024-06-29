import Image from 'next/image'
import { member } from "../../type";
import { useEffect, useState } from 'react';
import { Button } from '@/app/components/common/button';

export function ManageMember(props: {members: member[]}) {

    useEffect(() => {
        initialize()
    }, [props])

    async function initialize() {

    }

    return (
        <div className="w-[400px] lg:w-[700px] my-4 relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right">
                <thead className="bg-white/50 text-xs text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Role
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Management
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.members.map((member) => {
                            return (
                                <tr className="border-b bg-white/40">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {member.user_name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {member.member_role}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button name="Management" handler={() => {}}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}