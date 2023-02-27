import { useState } from 'react';


export const Button = ({ name, isActive, onClickEvent }) => {

    const activeClass = "bg-theme-gray text-white";
    const inActiveClass = "text-theme-gray";

    return (
        <button onClick={onClickEvent}
            className={"px-4 py-3 font-pretandard font-bold text-sm rounded-3xl " + (isActive ? activeClass : inActiveClass)} >
            {name}
        </button>
    )
}

export const ModalTagButton = ({ name, isActive, onClickEvent }) => {

    const activeClass = "bg-theme-yellow text-white border-yellow-400";
    const inActiveClass = "text-gray-400 border-gray-400";

    return (
        <button onClick={onClickEvent}
            className={"px-6 py-1 font-pretandard font-bold text-sm rounded-2xl border-[1px] h-fit " + (isActive ? activeClass : inActiveClass)}>
            {name}
        </button>
    )
}

export const ModalTagButtonSm = ({name}) => {
    return (
        <button className="px-2 py-1 text-gray-500 text-xs bg-contents rounded-md h-fit">
            {name}
        </button>
    )
}

export const TagButton = ({ name, isActive, onClick }) => {

    const activeClass = "text-white bg-theme-gray";
    const inActiveClass = "text-theme-gray bg-white";

    return (
        <button onClick={onClick} name={name} value={isActive}
            className={"px-6 py-1 font-pretandard font-medium text-sm rounded-2xl h-fit " + (isActive ? activeClass : inActiveClass)}>
            {name}
        </button>
    )
}

