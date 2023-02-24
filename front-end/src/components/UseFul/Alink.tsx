
interface Props{
    title: string;
    href: string
}


export function Alink({href, title}:Props){
    return(
        <div className="flex justify-end">
                    <a href={href} className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">{title}</a>
                </div>
    )
}