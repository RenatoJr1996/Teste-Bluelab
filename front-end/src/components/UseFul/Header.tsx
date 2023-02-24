interface Props{
    title: string;
    span: string;
}



export function Header({title, span}:Props){
    return (
        <section className="mb-10" >
        <h3 className="font-bold text-2xl">{title}</h3>
        <p className="text-gray-600 pt-2">{span}</p> 
    </section>
    )
}