

export const Button = ({ name, onClickEvent }) => {
    return (
        <div>

        </div>
    )
}

export const TagButton = ({ name, onClickEvent }) => {
    return (
        <button onClick={onClickEvent}
            className="bg-white px-6 py-1 font-pretandard font-bold text-sm rounded-2xl">
            <span>{name}</span>
        </button>
    )
}

