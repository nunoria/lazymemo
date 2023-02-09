import Modal from "../Modal"
import { useState } from 'react';
import GetURLInfo from "../GetData";


export default function Slide() {

    const [modalState, setModalState] = useState(false);

    const modalCtl = (onOff) => {
        return setModalState(onOff);
    }

    return (
        <div className=" h-[400px]">
            <span>슬라이드</span>
            <br />
            <button className="bg-orange-300" onClick={() => { console.log("클릭"); modalState ? setModalState(false) : setModalState(true); }} >팝업생성</button>
            {
                modalState && <Modal modalCtl={modalCtl} />
            }
            <GetURLInfo />
        </div>
    )
}
