

export default function Navi() {
    return (
        <div className=" pbox flex flex-row justify-between items-center">
            {/* 1/3 균등 메뉴 구성 */}
            <div className=" basis-1/3 flex justify-start gap-4 font-bold text-sm font-pretandard">
                <span>My URL</span>
                <span>All URL</span>
            </div>
            <div className=" basis-1/3">
                <span>Home</span>
            </div>
            <div className=" basis-1/3 flex justify-end gap-4">
                <span>Right Menu1</span>
                <span>Right Menu2</span>
            </div>
        </div>
    )
}