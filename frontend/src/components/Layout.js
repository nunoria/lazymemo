
import Navi from "./Navi";

const TOP_HEIGHT = "87px";
const FOOTER_HEIGHT = "200px";

export const Top = () => {

    return (
        <div className="flex justify-center bg-top h-[87px]">
            <Navi />
        </div>
    )
}

export const Main = () => {
    return (
        <div></div>
    )
}

export const Footer= () => {

    return (
        <div className=" bg-footer h-[200px]"></div>
    )
}
