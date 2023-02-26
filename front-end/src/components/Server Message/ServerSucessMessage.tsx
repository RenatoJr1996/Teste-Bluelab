
interface Props {
    message: string
}


export function ServerSucessMessage({ message }: Props) {
    return (
        <div className="bg-green-100 border mb-2 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">OK!</strong>
            <span className="block ml-2 sm:inline">{message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </span>
        </div>
    )
}