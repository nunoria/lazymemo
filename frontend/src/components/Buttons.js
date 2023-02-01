
export const Button = ({ name, isActive, onClickEvent }) => {

    const activeClass = "bg-theme-gray text-white";
    const inActiveClass = "text-theme-gray";

    return (
        <button onClick={onClickEvent}
            className={"px-5 py-3 font-pretandard font-bold text-sm rounded-3xl " + (isActive ? activeClass : inActiveClass)} >
            <span>{name}</span>
        </button>
    )
}

export const TagButton = ({ name, onClickEvent }) => {
    return (
        <button onClick={onClickEvent}
            className="bg-white px-6 py-1 font-pretandard font-bold text-sm rounded-2xl focus:bg-theme-gray focus:text-white">
            <span>{name}</span>
        </button>
    )
}
