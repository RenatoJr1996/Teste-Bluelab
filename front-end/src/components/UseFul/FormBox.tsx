import { ReactNode } from "react";



interface IChildren {
    children: ReactNode;
  }


export function FormBox ({ children }: IChildren) {
    return(
        <div className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
            {children}
        </div>
    )
}