import UptdateAccount from "@/components/Update/UpdateUser";
import { useRouter } from "next/router"; 
import { useEffect, useState } from "react";
;


export default function UptdateAccountPage() {
 const {query, isReady} = useRouter();

 useEffect(() => {
    
 }, [isReady])
 
 
    return (
    <UptdateAccount userCPF={query.cpf} />
    )
}