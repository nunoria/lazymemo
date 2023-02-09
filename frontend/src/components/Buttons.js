import { useState } from 'react';


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

export const TagButton = ({ name, isActive, onClickEvent }) => {

    const activeClass = "bg-theme-yellow text-white border-yellow-400";
    const inActiveClass = "text-gray-400 border-gray-400";

    return (
        <button onClick={onClickEvent}
            className={"px-6 py-1 font-pretandard font-bold text-sm rounded-2xl border-[1px] h-fit " + (isActive ? activeClass : inActiveClass)}>
            <span>{name}</span>
        </button>
    )
}
