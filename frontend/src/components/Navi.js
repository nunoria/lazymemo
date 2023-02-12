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
                <div className=" basis-1/3 flex justify-start">
                    <Link to={NAVI_BTN_MYURL.url}><Button name={NAVI_BTN_MYURL.name} isActive={location.pathname == NAVI_BTN_MYURL.url ? true : false} /></Link>
                    <Link to={NAVI_BTN_ALLURL.url}><Button name={NAVI_BTN_ALLURL.name} isActive={location.pathname == NAVI_BTN_ALLURL.url ? true : false} /></Link>
                </div>
                <div className=" basis-1/3 flex justify-center px-1">
                    <Link to={NAVI_BTN_ALLURL.url}>
                        <img src={require('resource/logo_navi.svg').default} alt="home" />
                    </Link>
                </div>
                <div className=" basis-1/3 flex justify-end gap-1">
                    <button onClick={() => {
                        console.log(user);
                        console.log('isLogin:', isLogin)
                    }}><img className="w-[28px] h-[28px]" src={require('resource/info.svg').default} alt="info" /></button>

                    <div className=' relative' onMouseOver={() => {if(isLogin)setPopupOn(true)}} onMouseOut={() => setPopupOn(false)}>
                        {
                            user 
                            ? <img className="w-[40px] h-[40px]" src={require('resource/profile.svg').default} alt="info" />
                            : <img className="w-[28px] h-[28px] ml-2" src={require('resource/guest.svg').default} alt="info" />
                        }
                        <div className={"absolute top-10 left-1/2 -translate-x-1/2 " + (popupOn ? "" : "hidden")}>
                            <div className=' flex flex-col items-center gap-2 bg-white w-[120px] rounded-md text-gray-400 py-2 font-bold '>
                                <Link to="setting"><button className=' hover:text-gray-600'>설정</button></Link>

                                <button onClick={() => {
                                    const auth = getAuth();

                                    auth.signOut();
                                    auth.updateCurrentUser();
                                }} className=' hover:text-gray-600'>로그아웃</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}