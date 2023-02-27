import { TagButton } from "../Buttons"
import { useUserStore } from "store"


export default function TagList() {

    const {userTags, userTagsChecked, setUserTagsChecked} = useUserStore();

    const onClick = (event) => {
        let {
            target: {
                name,
                value
            }
        } = event;
        setUserTagsChecked(name, (value==="false")); // true/false toggling, event 에서 올라오는 value는 문자열임.
    }

    return (
        <div className="bg-contents flex justify-center py-8">
            <div className=" pbox flex flex-row gap-4 flex-wrap">
                {
                    userTags && userTags.map((v, i) => {
                        return (
                            <TagButton key={i} name={v} onClick={onClick} isActive={userTagsChecked.includes(v)}/>
                        )
                    })
                }
            </div>
        </div>
    )
}