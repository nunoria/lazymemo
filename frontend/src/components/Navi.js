
import { Link } from 'react-router-dom';


export default function Navi() {
    return (
        <div className=" pbox flex flex-row justify-between items-center">
            {/* 1/3 균등 메뉴 구성 */}
            <div className=" basis-1/3 flex justify-start gap-4 font-bold text-sm font-pretandard">
                <Link to="/myurl"><span>My URL</span></Link>
                <Link to="/allurl"><span>All URL</span></Link>
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
    )
}