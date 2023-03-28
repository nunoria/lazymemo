
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { useUserStore, useTestAuthStore } from "store"
import Navi from "./Navi";
import Dashboard from "./main/Dashboard";
import TagList from "./main/TagList";
import CardList from "./main/CardList";
import Slide from "./main/Slide";
import Login, {TestLogin} from "./main/Login";


const TOP_HEIGHT = "87px";
const FOOTER_HEIGHT = "200px";

export const Top = () => {

    return (
        <nav>
            <Navi />
        </nav>
    )
}

export const Main = () => {
    const auth = getAuth();

    let cardInfos = Array.from({length: 10}, (v, i) => i+1); // i(index) 1씩 증가


    const { setUser, isLogin, clearUser, myUrls, allUrls, getAllUrls, getMyUrls } = useUserStore();
    const { setTestAuthCb } = useTestAuthStore();

    useEffect(() => {
        getAllUrls();
        auth.onAuthStateChanged((res) => {

            if (res) {
                // 로그인
                console.log("로그인");
                setUser(res);
            }
            else {
                // 로그아웃
                console.log("로그아웃");
                clearUser();
            }
            // console.log(res);
        })

        setTestAuthCb((res) => {

            if (res) {
                // 로그인
                console.log("로그인");
                setUser(res)
                .then(getMyUrls)
                .catch(err => console.log(err));
            }
            else {
                // 로그아웃
                console.log("로그아웃");
                clearUser();
            }
            // console.log(res);
        })

        return () => {
            clearUser();
        };
    }, []);


    return (
        // 라우팅에 따라 Main 구성이 바뀜
        <Routes>
            <Route path="/" element={<Navigate replace to="/allurl" />} />
            <Route path="myurl" element={
                isLogin ?
                    (
                        <main>
                            <Dashboard />
                            <TagList />
                            <CardList cardInfos={myUrls} isMyUrl={true}/>
                        </main>
                    ) :
                    (
                        <main>
                            {/* <Login /> */}
                            <TestLogin />
                        </main>
                    )
            } />
            <Route path="allurl" element={
                <main>
                    <Slide />
                    <TagList />
                    <CardList cardInfos={allUrls}/>
                </main>
            } />
            <Route path="setting" element={"setting"} />
            <Route path="*" element={<div> 404 error, 없는 페이지</div>}></Route> //  그외 모든 주소
        </Routes>
    )
}

export const Footer = () => {

    return (
        <footer>
            <div className=" bg-footer h-[200px]"></div>
        </footer>
    )
}

export const TagButton = ({ name, onClickEvent }) => {
    return (
        <button onClick={onClickEvent}>
            <span>{name}</span>
        </button>
    )
}

