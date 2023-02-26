import { ReactNode } from "react";

interface ITable {
    title: string
    children: ReactNode;
}


export function Table({children, title}: ITable) {
    return(
        <section className="text-gray-600 body-font">
            <div className="px-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-4xl text-3xl p-2 font-medium title-font text-white bg-gradient-to-r from-green-400 via-green-800 to-green-400">{title}</h1>
                </div>
                <div className=" w-full mx-auto overflow-auto">
                    <table className="table-auto w-full whitespace-no-wrap">
                        {children}
                    </table>
                </div>
            </div>
        </section>
    )
}