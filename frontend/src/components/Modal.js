import React, { useState, useEffect } from 'react';
import { getKeyword, getHeader } from './GetData';
import { Button, ModalTagButton } from './Buttons';
import { useUserStore, Url } from "store"

const INPUT_TIMEOUT = 2000;
const N_MAXTAGS = 4;
const N_MINTAGLENGTH = 2;

const Modal = ({ modalCtl, url }) => {

    const [timer, setTimer] = useState(null);
    const [urlText, setUrlText] = useState('');
    const [subjectText, setSubjectText] = useState('');
    const [addTagText, setAddTagText] = useState('');
    const [proposalTag, setProposalTag] = useState([]);
    const [myTag, setMyTag] = useState([]);
    const [urlInfo, setUrlInfo] = useState(null);
    const [opacity, setOpacity] = useState(" opacity-0");
    const [maxTagWarn, setMaxTagWarn] = useState(false);
    const [tagLenWarn, setTagLenWarn] = useState(false);

    const { userTags, addTag, addMyUrl, modMyUrl } = useUserStore();

    useEffect(() => {
        if (url) {
            setMyTag(userTags.map((v) => {
                if (url.tags.find(item => item == v) != undefined)
                    return { tagname: v, checked: true };
                return { tagname: v, checked: false };
            }));
            setSubjectText(url.title);
        } else {
            setMyTag(userTags.map((v) => ({ tagname: v, checked: false })));
        }
        return () => {
            setMyTag([])
        }
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        setOpacity(" opacity-100")
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const onChange = (event) => {
        const {
            target: {
                name,
                value,
            },
        } = event;
        if (name == "subjectText") setSubjectText(value);
        if (name == "addTagText") {
            value.length < N_MINTAGLENGTH ? setTagLenWarn(true) : setTagLenWarn(false);
            setAddTagText(value);
        }
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



    return (
        <div className={'left-0 top-0 w-screen h-screen fixed z-10 transition duration-300 ease-in-out' + opacity} >
            <div className='bg-black top-0 left-0 w-full h-full opacity-50 fixed z-10 ' onClick={() => { modalCtl(false) }}>{/* 그레이 배경 */} </div>
            <div className='bg-white rounded-xl w-[600px] p-8 flex flex-col
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20'>
                <div name="ModalHeader" className='relative pt-5 pb-9' >
                    <button type='button' className=' absolute -right-4 -top-4' onClick={() => { modalCtl(false) }}>
                        <img src={require('resource/cancel.svg').default} alt="close" />
                    </button>
                    <img src={require('resource/logo.svg').default} alt="logo" />

                    <div className='text-3xl font-extrabold pt-2'>
                        {
                            url ? "이 URL의 정보를 변경해주세요!" : "URLTAG에 저장해 둘께요!"
                        }
                    </div>
                </div>
                <div name="ModalBody" className='my-5'>
                    <div>
                        <div className=' text-md font-semibold .text-theme-gray mb-3'>
                            {url ? "제목을 수정해주세요" : "URL 정보를 입력해주세요"}
                        </div>
                        {url
                            ? <input type="text" name="subjectText" id="subjectText" placeholder="제목을 수정해주세요" onChange={onChange} value={subjectText}
                                className='w-full h-[38px] px-4 rounded-xl border-[1px] border-gray-300 outline-none' />
                            : <input type="text" name="url" id="url" placeholder="URL 주소를 입력해주세요." onChange={onChangeUrl} value={urlText}
                                className='w-full h-[38px] px-4 rounded-xl border-[1px] border-gray-300 outline-none' />
                        }

                    </div>
                    <div className='border-b-[1px] border-gray-300'>
                        <div className='flex flex-row gap-2 items-center'>
                            <div className=' text-md font-semibold .text-theme-gray my-3'>해시태그를 선택해주세요.</div>
                            {maxTagWarn && <div className='text-sm font-semibold text-red-500'> 태그를 4개 이상 선택할수 없습니다! </div>}
                        </div>
                        <div className=" min-h-[70px] w-full py-3 flex gap-2">
                            {/* 추천해시태그 블럭 */
                                proposalTag.length > 0 && proposalTag.map((v, i) => {
                                    return <ModalTagButton name={v.tagname} key={i} isActive={v.checked}
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
                                    return <ModalTagButton name={v.tagname} key={i} isActive={v.checked}
                                        onClickEvent={
                                            (e) => {
                                                // 태그를 Active로 바꾸기 전에 Active된 태그의 갯수 확인후 MAXTAGS 를 넘어가면 리턴
                                                if (v.checked == false) {
                                                    let checked = myTag.filter(item => (item.checked == true));
                                                    if (checked.length >= N_MAXTAGS) return setMaxTagWarn(true);
                                                }
                                                let prevMyTag = [...myTag];
                                                prevMyTag[i].checked = !prevMyTag[i].checked;
                                                setMyTag(prevMyTag);
                                                setMaxTagWarn(false);
                                            }
                                        } />
                                })
                            }
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <div className=' text-md font-semibold .text-theme-gray my-3'>원하는 해시태그가 없으신가요?</div>
                            {tagLenWarn && <div className='text-sm font-semibold text-red-500'> 태그는 2글자 이상입니다 </div>}
                        </div>
                        <div className='flex flex-row gap-2 justify-between items-center'>
                            <input type="text" name="addTagText" id="addTagText" placeholder='해시태그 이름을 입력해주세요' onChange={onChange} value={addTagText}
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
                                    })
                                    .catch(err => console.log('Modal err:', err))
                            }}
                                className=' bg-theme-yellow font-bold min-w-[45px] h-[45px] text-white rounded-lg'>+</button>
                        </div>
                    </div>
                </div>
                <div name="ModalSave" className='my-3'>
                    <button onClick={() => {
                        if (url) {
                            url.title = subjectText;
                            url.tags = makeTagsArray([...proposalTag, ...myTag]);
                            modMyUrl(url)
                                .then(modalCtl(false))
                                .catch(err => console.log('Modal err', err));
                        }
                        else {
                            addMyUrl({ ...urlInfo, tags: makeTagsArray([...proposalTag, ...myTag]) })
                                .then(modalCtl(false))
                                .catch(err => console.log('Modal err', err))
                        }
                    }}
                        className=' bg-theme-gray rounded-xl h-[48px] w-full text-center text-white font-semibold'>
                        <span>저장하기</span>
                        <img src={require("resource/logo_shape.svg").default} className="inline-block h-[18px] w-[18px] mx-2" alt="로고" />
                    </button>
                </div>
            </div>
        </div >
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