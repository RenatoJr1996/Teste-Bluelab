
interface Props {
    message: string
}


export function ServerFailMessage({ message }: Props) {
    return (
        <div className='text-center bg-red-400'>
            <p className="text-white mb-2"> {message}</p>
        </div>
    )
}