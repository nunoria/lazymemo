
import { Routes, Route, Navigate } from 'react-router-dom';
import Navi from "./Navi";
import Dashboard from "./main/Dashboard";
import TagList from "./main/TagList";
import CardList from "./main/CardList";
import Slide from "./main/Slide";

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
    return (
        // 라우팅에 따라 Main 구성이 바뀜
        <Routes>
            <Route path="/" element={<Navigate replace to="/allurl" />} />
            <Route path="myurl" element={
                <main>
                    <Dashboard />
                    <TagList />
                    <CardList />
                </main>
            } />
            <Route path="allurl" element={
                <main>
                    <Slide />
                    <TagList />
                    <CardList />
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

export const TagButton = ({name, onClickEvent}) => {
    return (
        <button onClick={onClickEvent}>
            <span>{name}</span>
        </button>
    )
}

