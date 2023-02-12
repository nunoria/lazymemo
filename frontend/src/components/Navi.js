import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Buttons';
import { useUserStore } from "store"
import { getAuth } from "firebase/auth";

const NAVI_BTN_MYURL = {
    name: "My URL",
    url: "/myurl"
}

const NAVI_BTN_ALLURL = {
    name: "All URL",
    url: "/allurl"
}

export default function Navi() {

    const { user, isLogin } = useUserStore();
    const [popupOn, setPopupOn] = useState(false);
    let location = useLocation();
    // console.log(location.pathname);

    return (
        <div className="bg-top flex justify-center h-[87px] py-3">
            <div className=" pbox flex flex-row items-center">
                {/* 1/3 균등 메뉴 구성 */}
                <div className=" basis-1/3 flex justify-start gap-1">
                    <Link to={NAVI_BTN_MYURL.url}><Button name={NAVI_BTN_MYURL.name} isActive={location.pathname == NAVI_BTN_MYURL.url ? true : false} /></Link>
                    <Link to={NAVI_BTN_ALLURL.url}><Button name={NAVI_BTN_ALLURL.name} isActive={location.pathname == NAVI_BTN_ALLURL.url ? true : false} /></Link>
                </div>
                <div className=" basis-1/3 text-center">
                    <Link to="/">
                        <span>Home</span>
                    </Link>
                </div>
                <div className=" basis-1/3 flex justify-end gap-4">
                    <button onClick={() => {
                        console.log(user);
                        console.log('isLogin:', isLogin)
                    }}>info</button>

                    <div className=' relative' onMouseOver={() => setPopupOn(true)} onMouseOut={() => setPopupOn(false)}>
                        <span className=' font-bold'>
                            {
                                user ? user.email : "GUEST"
                            }
                        </span>
                        <div className={"absolute top-6 " + (popupOn ? "" : "hidden")}>
                            <div className=' flex flex-col items-center gap-2 bg-white w-[100px] rounded-md'>
                                <Link to="setting"><span>설정</span></Link>

                                <button onClick={() => {
                                    const auth = getAuth();

                                    auth.signOut();
                                    auth.updateCurrentUser();
                                }}>로그아웃</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}