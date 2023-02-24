import React, { useState, useEffect } from 'react';
import { getKeyword, getHeader } from './GetData';
import { Button, TagButton } from './Buttons';
import { useUserStore, Url } from "store"

const INPUT_TIMEOUT = 2000;

const Modal = ({ modalCtl }) => {

    const [timer, setTimer] = useState(null);
    const [urlText, setUrlText] = useState('');
    const [addTagText, setAddTagText] = useState('');
    const [proposalTag, setProposalTag] = useState([]);
    const [myTag, setMyTag] = useState([]);
    const [urlInfo, setUrlInfo] = useState(null);

    const { userTags, addTag, addMyUrl } = useUserStore();

    useEffect(() => {
        setMyTag(userTags.map((v) => ({ tagname: v, checked: false })));
        return () => {
            setMyTag([])
        }
    }, [])

    const onChangeAddTag = (e) => {
        setAddTagText(e.target.value);
    }

    const onChangeUrl = (e) => {

        setUrlText(e.target.value);

        // url 인풋박스에 마지막 키보드 입력후 일정시간 이후에 url 값을 읽어 오도록 함
        timer != null && clearTimeout(timer)
        setProposalTag([]);

        // input 값이 URL 형식인지 확인할까 했는데, 최소 숫자만 확인 ex) a.com 이 가장 짧은 URL이므로
        // length 가 5 이하인지만 확인
        if (e.target.value.length < 5) return;

        setTimer(setTimeout(() => {
            getHeader(e.target.value)    // URL 을 헤더정보 받아오기
                .then((response) => {

                    setUrlInfo({ ...response });

                    // 키워드가 있는경우 추천 해시태그로 보여주기
                    if (response.keywords) {

                        console.log(response.keywords)

                        setProposalTag(response.keywords.map((v, i) => {
                            return { tagname: v, checked: false };
                        }));
                    }

                })
                .catch((error) => console.log(error));

        }, INPUT_TIMEOUT));
    }

    useEffect(() => {
        console.log("scroll hidden");
        document.body.style.overflow = 'hidden';
        return () => {
            console.log("scroll auto");
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className=' left-0 top-0 w-screen h-screen fixed'>
            <div className=' bg-black top-0 left-0 w-full h-full opacity-50 fixed z-10' onClick={() => { modalCtl(false) }}>{/* 그레이 배경 */} </div>
            <div className="bg-white rounded-xl w-[600px] p-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20
            flex flex-col">
                <div name="ModalHeader" className='relative pt-5 pb-9' >
                    <button type='button' className=' absolute -right-4 -top-4' onClick={() => { modalCtl(false) }}>
                        <img src={require('resource/cancel.svg').default} alt="close" />
                    </button>
                    <img src={require('resource/logo.svg').default} alt="logo" />

                    <body className='text-3xl font-extrabold pt-2'>URLTAG에 저장해 둘께요!</body>
                </div>
                <div name="ModalBody" className='my-5'>
                    <div>
                        <div className=' text-md font-semibold .text-theme-gray mb-3'>URL 정보를 입력해주세요</div>
                        <input type="text" name="url" id="url" placeholder="URL 주소를 입력해주세요." onChange={onChangeUrl} value={urlText}
                            className='w-full h-[38px] px-4 rounded-xl border-[1px] border-gray-300 outline-none' />
                    </div>
                    <div className='border-b-[1px] border-gray-300'>
                        <div className=' text-md font-semibold .text-theme-gray my-3'>해시태그를 선택해주세요.</div>
                        <div className=" min-h-[70px] w-full py-3 flex gap-2">
                            {/* 추천해시태그 블럭 */
                                proposalTag.length > 0 && proposalTag.map((v, i) => {
                                    return <TagButton name={v.tagname} key={i} isActive={v.checked}
                                        onClickEvent={
                                            (e) => {
                                                let prevPoeposalTag = [...proposalTag];
                                                prevPoeposalTag[i].checked = !prevPoeposalTag[i].checked;
                                                setProposalTag(prevPoeposalTag);
                                            }
                                        } />
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <div className=" min-h-[70px] w-full py-3 flex gap-2 flex-wrap">
                            {/* 나의해시태그 블럭 */
                                myTag.length > 0 && myTag.map((v, i) => {
                                    return <TagButton name={v.tagname} key={i} isActive={v.checked}
                                        onClickEvent={
                                            (e) => {
                                                let prevMyTag = [...myTag];
                                                prevMyTag[i].checked = !prevMyTag[i].checked;
                                                setMyTag(prevMyTag);
                                            }
                                        } />
                                })
                            }
                        </div>
                        <div className=' text-md font-semibold .text-theme-gray my-3'>원하는 해시태그가 없으신가요?</div>
                        <div className='flex flex-row gap-2 justify-between items-center'>
                            <input type="text" name="hashtag" id="hashtag" placeholder='해시태그 이름을 입력해주세요' onChange={onChangeAddTag} value={addTagText}
                                className='w-full h-[38px] px-4 rounded-xl border-[1px] border-gray-300 outline-none' />
                            <button onClick={() => {
                                addTag(addTagText)
                                    .then(() => {
                                        setMyTag(
                                            [...myTag,
                                            {
                                                tagname: addTagText,
                                                checked: true
                                            }
                                            ]
                                        )
                                        setAddTagText("");
                                    });

                            }}
                                className=' bg-theme-yellow font-bold min-w-[45px] h-[45px] text-white rounded-lg'>+</button>
                        </div>
                    </div>
                </div>
                <div name="ModalSave" className='my-3'>
                    <button onClick={() => {
                        addMyUrl({ ...urlInfo, tags: makeTagsArray([...proposalTag, ...myTag]) })
                            .then(modalCtl(false))
                            .catch(console.log("저장실패"));
                    }}
                        className=' bg-theme-gray rounded-xl h-[48px] w-full text-center text-white font-semibold'>
                        <span>저장하기</span>
                        <img src={require("resource/logo_shape.svg").default} className="inline-block h-[18px] w-[18px] mx-2" alt="로고" />
                    </button>
                </div>
            </div>
        </div>
    )
}

// 저장하기 버튼
// url Class 인스턴스 새로 만들어야 함

// 수정하기 버늩
// 있는 url Class 인스턴스 사용

const makeTagsArray = (tagList) => {
    if (tagList.length == 0) {
        console.log("makeTags(error): No Tag!!");
    }

    let tags = [];
    tagList.forEach((v, i) => {
        if (v.checked) tags.push(v.tagname);
    });

    return tags;
}

const makeSendData = (tagList, urlInfo) => {

    if (tagList.length == 0 || urlInfo == null) {
        console.log("makeSendData(error): ", tagList);
        console.log("makeSendData(error): ", urlInfo);
        //error
        return;
    }

    let tags = [];
    tagList.forEach((v, i) => {
        if (v.checked) tags.push(v.tagname);
    });


    let sendData = new Url({
        tags: tags,
        ...urlInfo,
    })

    console.log("makeSendData", sendData);
    console.log("makeSendData. convert", sendData.convertToDbUrlData());

    return sendData;

}

export default Modal