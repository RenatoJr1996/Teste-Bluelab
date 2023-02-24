import { ReactNode } from "react";



interface Iform {
    children: ReactNode;
  }



export function Form({children}: Iform ) {
    return(
        <form className="flex flex-col" >
            {children}
        </form>
    )
}