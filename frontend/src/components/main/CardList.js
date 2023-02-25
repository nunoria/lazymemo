import { TagButtonSm } from 'components/Buttons'
import React, { useState } from 'react';


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
    const [popUpVisible, setPopUpVisible] = useState({});

    const onMouseOver = (e) => {
        // 이벤트 발생한 요소의 좌표 얻기
        // let pos = document.getElementById(e.target.id).getBoundingClientRect();
        let pos = e.target.getBoundingClientRect();
        let obj = {
            name: e.target.name,
            posy: parseInt(pos.bottom + 10) + "px",
            posx: parseInt(pos.left + (pos.width / 2)) + "px",
        }
        // console.log(obj);
        setPopUpVisible(obj)
    }

    const onMouseOut = (e) => {
        setPopUpVisible({})
    }


    return (
        < >
            <div className="hover:-translate-y-4 transition duration-500 ease-in-out bg-white rounded-2xl aspect-square overflow-hidden
            flex flex-col cursor-pointer" onClick={() => window.open(cardInfo.url, '_blank')}>
                <div name="imageWrapper " className=" basis-1/2 overflow-hidden">
                    <img src={cardInfo.image} alt="이미지" className="h-full w-full object-cover object-center" />
                </div>
                <div name="infoWrapper" className=" basis-1/2 flex flex-col px-4 py-2">
                    <div className="basis-1/3 flex flex-row justify-between items-center">
                        <div name="tagWrapper" className="  flex flex-row gap-3 ">
                            {
                                cardInfo.tags.map((v, i) => (<TagButtonSm name={v} key={i} />))
                            }
                        </div>
                        <div>
                            <img src={require('resource/edit.svg').default} alt="edit"
                                name="정보 수정하기" onMouseOver={onMouseOver} onMouseOut={onMouseOut} />
                        </div>
                    </div>
                    <div name="titleWrapper" className=" basis-1/3">
                        <span className=" font-pretandard font-bold text-xl">{cardInfo.title}</span>
                    </div>
                    <div name="bottomInfoWrapper" className=" basis-1/3 flex flex-col gap-1 justify-end mb-3">
                        <div className="text-sm"><span>{cardInfo.siteName && cardInfo.siteName}</span></div>
                        <div className="flex flex-row justify-between items-center">
                            <div className="tracking-tight text-sm text-gray-400"><span>{cardInfo.created.toLocaleDateString()}</span></div>
                            <div className="flex flex-row gap-2">
                                <img className="w-[20px] h-[20px] mt-[2px]" src={require('resource/logo_shape.svg').default} alt="store"
                                    name="저장 해제하기" onMouseOver={onMouseOver} onMouseOut={onMouseOut} />
                                <img src={require('resource/more.svg').default} alt="more" name="더보기"
                                    onMouseOver={onMouseOver} onMouseOut={onMouseOut} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                popUpVisible.name && <PopUp props={popUpVisible} />
            }
        </>

    )
}

const PopUp = ({ props }) => {
    let { name, posy, posx } = props;
    return (
        /* top, lef 속성에 px를 동적으로 변경시, tailwind 방식으로는 동작하지 않음*/
        <div className='fixed z-10 bg-black p-2 rounded-md -translate-x-1/2 whitespace-nowrap'
            style={{ top: posy, left: posx }} >
            <span className=' text-white '>{name}</span>
        </div>
    )
}

