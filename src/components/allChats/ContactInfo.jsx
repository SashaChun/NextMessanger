import Image from "next/image";
import x from "../../../public/x.png";
import setening from "../../../public/settings-5-line.png";
export default function ContactInfo({rightWidth ,currentUser , Close}) {

    return <div className="bg-foreground overflow-y-auto scroll-container min-h-screen border-2 border-[#2b2c2f]"
                style={{width: `${rightWidth}vw`}}>

        <div className={'flex flex-row items-center  space-x-5 text-xl  px-[20px] py-[10px]'}>
            <p className={'flex flex-row items-center h-[45px] w-[45px] hover:bg-[#25262d] opacity-80 justify-center p-3 rounded-[100%] '}><Image onClick={Close} src={x} alt={'x'}/></p>
            <p className={' flex flex-row items-center h-[45px]'}>Contact info</p>
        </div>
        <div className={'h-[1px] w-[100%] bg-[#2b2c2f]'}></div>
        <div className={'flex flex-col items-center'}>
            <Image src={''}
                   className={'border-2 border-gray-800  w-[120px]  mt-[24px]  h-[120px]  rounded-[100%] bg-white flex-shrink-0'}
                   alt="image"/>
            <p className={'mt-4 text-xl'}>{''}</p>
            <p className={'mt-2 text-sm'}>+49 1522 792358</p>
        </div>
        <div className={'h-[1px] w-[100%] mt-[24px] bg-[#2b2c2f]'}></div>
        <div className={'mt-[24px] flex flex-col ml-4 '}>
            <h1 className={'text-2xl'}>Info</h1>
            <p className={'text-gray-400 text-'}>Гав🐱</p>
        </div>
        <div className={'h-[1px] w-[100%] mt-[24px] bg-[#2b2c2f]'}></div>
        <div className={'mt-[24px] flex flex-col ml-4 '}>
            <h1 className={'text-gray-400'}>Media, Links and Documents</h1>
            <div className={'flex overflow-x-hidden mt-[15px] space-x-3'}>
                {Array(10).fill(null).map((_, index) => (
                    <div key={index} className={'w-[90px] h-[70px] rounded-[10px] bg-white flex-shrink-0'}></div>
                ))}
            </div>
        </div>
        <div className={'h-[1px] w-[100%] mt-[24px] bg-[#2b2c2f]'}></div>
        <div className={'mt-[24px] flex flex-col px-6'}>
            <div className={'flex flex-row space-x-3 px-2 h-10 items-center rounded-[5px] bg-[#26272d] '}>
                <Image src={setening} width={10} height={10} alt={'dots'} className="h-[20px] w-[20px]"/>
                <p>Settings</p>
            </div>
        </div>
        <div className={'h-[1px] w-[100%] mt-[24px] bg-[#2b2c2f]'}></div>
    </div>
}