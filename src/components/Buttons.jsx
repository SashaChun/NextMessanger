'use Client'

export default function Buttons({
    type , fullWidht , children ,onClick ,secondary , danger ,disable
                                }){
    return <button
        className={'w-full py-2 mt-4 bg-background text-white rounded-lg flex items-center justify-center border-gray-300 shadow-md hover:shadow-lg focus:outline-none'}
        onClick={onClick}
        type={type}
        disabled={disable}
    >
        {children}
    </button>
}