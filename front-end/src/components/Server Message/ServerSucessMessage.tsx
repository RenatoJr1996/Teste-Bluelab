
interface Props {
    message: string
}


export function ServerSucessMessage({ message }: Props) {
    return (
        <div className='text-center bg-green-400'>
            <p className="text-white mb-2"> {message}</p>
        </div>
    )
}