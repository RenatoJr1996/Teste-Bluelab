import UptdateAccount from "@/components/Update/UpdateUser";
import { useRouter } from "next/router"; import { useEffect, useState } from "react";
;


export default function UptdateAccountPage() {
    const { query} = useRouter();
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      console.log('teste');
      setLoading(false)
    }, [query])
    
    

    return (
        <div>
            {loading ? <div></div>
            :
            <UptdateAccount userCPF={query.cpf} />
            }
        </div>
        
         
    )
}