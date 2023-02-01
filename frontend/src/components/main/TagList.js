import { TagButton } from "../Buttons"

export default function TagList() {

    const btns = Array.from({ length: 18 }, (v, i) => (i + 1) * 100);

    return (
        <div className="bg-contents flex justify-center py-8">
            <div className=" pbox flex flex-row gap-4 flex-wrap">
                {
                    btns.length && btns.map((v, i) => {
                        return (
                            <TagButton key={i} name={v} />
                        )
                    })
                }
            </div>
        </div>
    )
}