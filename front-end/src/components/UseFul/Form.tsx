import { FormHTMLAttributes, forwardRef, ReactNode } from "react";



interface Iform extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
  }



export const Form = forwardRef<HTMLFormElement, Iform> (({children,...rest  }: Iform, ref) => {
    return(
        <form {...rest} className="flex flex-col" >
            {children}
        </form>
    )
}
)