import {TagButtonSm} from 'components/Buttons'

export default function CardList({ cardInfos }) {


    return (
        <div className="bg-contents flex justify-center py-5">
            <div className="pbox grid grid-cols-[minmax(280px,_1fr)] lg:grid-cols-3 md:grid-cols-2 gap-5 xl:gap-8">
                {
                    cardInfos.length > 0 && cardInfos.map((v, id) => {
                        return (
                            <Card key={id} cardInfo={v} />
                        )
                    })
                }
            </div>
        </div>
    )
}


const Card = ({ cardInfo }) => {
    return (
        <div className=" bg-white rounded-2xl aspect-square overflow-hidden
        flex flex-col">
            <div name="imageWrapper " className=" basis-1/2 overflow-hidden">
                <img src={cardInfo.image} alt="이미지" className="h-full w-full object-cover object-center" />
            </div>
            <div name="infoWrapper" className=" basis-1/2 flex flex-col px-4 py-2">
           
                <div className="basis-1/3 flex flex-row justify-between items-center">
                    <div name="tagWrapper" className="  flex flex-row gap-3 ">
                        {
                            cardInfo.tags.map((v,i)=>(<TagButtonSm name={v} key={i}/>))
                        }
                    </div>
                    <div>
                        <span>수정</span>
                    </div>
                </div>
                <div name="titleWrapper" className=" basis-1/3">
                    <span className=" font-pretandard font-bold text-xl">{cardInfo.title}</span>

                </div>
                <div name="bottomInfoWrapper" className=" basis-1/3">
                    <div className=""><span>{cardInfo.site && cardInfo.site}</span></div>
                    <div className=""></div>
                </div>

            </div>
        </div>
    )
}