import Modal from "../Modal"
import { useState } from 'react';
import GetURLInfo from "../GetData";
import { useUserStore } from "store"

import { getUserDocById } from "components/db/Contorl";


export default function Slide() {

    const [modalState, setModalState] = useState(false);
    const [email, setEmail] = useState("");
    const [tag, setTag] = useState("");

    const { setUser, addTag, clearUser } = useUserStore();


    const modalCtl = (onOff) => {
        return setModalState(onOff);
    }

    const onChange = (event) => {
        const {
            target: {
                name,
                value
            },
        } = event;

        if (name == "email") setEmail(value);
        if (name == "tag") setTag(value);
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
            <br />
            <input className=" mx-2 p-1 rounded-md border-[1px] border-gray-500 outline-none" type="text" name="email" value={email} onChange={onChange} placeholder="input email" />
            <button onClick={() => {
                let tmp = {
                    email: email
                }
                setUser(tmp);
            }}
                className=" bg-purple-400 rounded-md p-1"> 로그인 하기</button>

            <br />
            <input className=" mx-2 p-1 rounded-md border-[1px] border-gray-500 outline-none" type="text" name="tag" value={tag} onChange={onChange} placeholder="input Tag" />
            <button onClick={() => {
                addTag(tag);
            }}
                className=" bg-pink-400 rounded-md p-1"> 태그더하기</button>

            <br />
            <button onClick={() => {
                clearUser();
            }}
                className=" bg-pink-400 rounded-md p-1"> 로그아웃</button>

        </div>
    )
}
