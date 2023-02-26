
interface Props{
    title: string;
    href: string
}


export function Alink({href, title}:Props){
    return(
        <div className="flex justify-end">
                    <a href={href} className="text-sm text-green-800 hover:text-green-900 hover:underline mb-6">{title}</a>
                </div>
    )
}