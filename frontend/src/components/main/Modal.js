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
            <div className={"bg-white rounded-xl w-[400px] h-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"} >
                <span>모달창</span>
                <input type="button" value="닫기" onClick={() => { modalCtl(false) }} className=' bg-orange-300 p-2 font-bold' />
                <input type="button" value="count" onClick={() => { setCount(count + 1) }} className=' bg-orange-300 p-2 font-bold' />
            </div>
        </div>
    )
}

export default Modal