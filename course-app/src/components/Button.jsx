

export default function Button({text, loading}){ 
    return( 
        <button disabled={loading} className='w-full rounded-xl py-2 bg-blue-700 text-white font-bold disabled:bg-blue-900 disabled:text-black'>{text}</button>
    )
}