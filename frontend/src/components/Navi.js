
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Buttons';


const NAVI_BTN_MYURL = {
    name: "My URL",
    url: "/myurl"
}

const NAVI_BTN_ALLURL = {
    name: "All URL",
    url: "/allurl"
}

export default function Navi() {

    let location = useLocation();
    // console.log(location.pathname);

    return (
        <div className="bg-top flex justify-center h-[87px] py-3">
            <div className=" pbox flex flex-row items-center">
                {/* 1/3 균등 메뉴 구성 */}
                <div className=" basis-1/3 flex justify-start gap-1">
                    <Link to={NAVI_BTN_MYURL.url}><Button name={NAVI_BTN_MYURL.name}  isActive={location.pathname==NAVI_BTN_MYURL.url?true:false}/></Link>
                    <Link to={NAVI_BTN_ALLURL.url}><Button name={NAVI_BTN_ALLURL.name} isActive={location.pathname==NAVI_BTN_ALLURL.url?true:false}/></Link>
                </div>
                <div className=" basis-1/3">
                    <Link to="/">
                        <span>Home</span>
                    </Link>
                </div>
                <div className=" basis-1/3 flex justify-end gap-4">
                    <Link to="info"><span>info</span></Link>
                    <Link to="setting"><span>My profile</span></Link>
                </div>
            </div>
        </div>
    )
}