import React, { useState, useEffect } from 'react';

const Modal = ({ modalCtl }) => {
    const [count, setCount] = useState(1);

    console.log(`count = ${count}`);

    useEffect(() => {
        console.log("scroll hidden");
        document.body.style.overflow = 'hidden';
        return () => {
            console.log("scroll auto");
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className=' left-0 top-0 w-screen h-screen fixed'>
            <div className=' bg-black top-0 left-0 w-full h-full opacity-50 fixed z-10' onClick={() => { modalCtl(false) }}>{/* 그레이 배경 */} </div>
            <div className="bg-white rounded-xl w-[600px] p-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
            flex flex-col">
                <div name="ModalHeader" className='relative pt-5 pb-9' >
                    <button type='button' className=' absolute -right-4 -top-4' onClick={() => { modalCtl(false) }}>
                        <img src={require('resource/cancel.svg').default} alt="close" />
                    </button>
                    <img src={require('resource/logo.svg').default} alt="logo" />

                    <body className='text-3xl font-extrabold pt-2'>URLTAG에 저장해 둘께요!</body>
                </div>
                <div name="ModalBody" className='my-5'>
                    <div>
                        <div className=' text-md font-semibold .text-theme-gray mb-3'>URL 정보를 입력해주세요</div>
                        <input type="text" name="url" id="url" placeholder="URL 주소를 입력해주세요."
                            className='w-full h-[38px] px-4 rounded-xl border-[1px] border-gray-300 outline-none' />
                    </div>
                    <div className='border-b-[1px] border-gray-300'>
                        <div className=' text-md font-semibold .text-theme-gray my-3'>해시태그를 선택해주세요.</div>
                        <div className=" h-[60px] w-full py-3">{/* 추천해시태그 블럭 */}</div>
                    </div>
                    <div>
                        <div className=" h-[60px] w-full py-3">{/* 나의해시태그 블럭 */}</div>
                        <div className=' text-md font-semibold .text-theme-gray my-3'>원하는 해시태그가 없으신가요?</div>
                        <div className='flex flex-row gap-2 justify-between items-center'>
                            <input type="text" name="hashtag" id="hashtag" placeholder='해시태그 이름을 입력해주세요'
                                className='w-full h-[38px] px-4 rounded-xl border-[1px] border-gray-300 outline-none' />
                            <button onClick={() => { setCount(count + 1) }} className=' bg-theme-yellow font-bold min-w-[45px] h-[45px] text-white rounded-lg'>+</button>
                        </div>
                    </div>
                </div>
                <div name="ModalSave" className='my-3'>
                    <button onClick={()=>{console.log("클릭")}}
                        className=' bg-theme-gray rounded-xl h-[48px] w-full text-center text-white font-semibold'>
                        <span>저장하기</span>
                        <img src={require("resource/logo_shape.svg").default} className="inline-block h-[18px] w-[18px] mx-2"alt="로고" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal