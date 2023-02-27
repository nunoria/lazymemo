import { create } from 'zustand'
import * as _ from 'lodash'
import { getUserDocById, updateUserDoc, setMyUrlsDoc, setUserDoc, addMyUrlsDoc, getMyUrlsDocs, delMyUrlsDoc } from 'components/db/Contorl'

const userInitialDbInfo = {
    deadline: 7,
    nickname: "",
    userMainTags: [],
    userTags: []
}

const initUserStore = {
    isLogin: false,
    user: null,
    userId: "",
    nickname: "",
    deadline: 7,
    userDbRef: null,
    userMainTags: [],
    userTags: [],
    userTagsChecked: [],
    myUrls: []
}

export class Url {
    constructor({ url, siteName, description, title, image, created, isShare, readDone, tags }) {
        this._url = url;
        this.siteName = siteName;
        this.description = description;
        this.title = title;
        this.image = image;
        this.created = created;
        this.isShare = isShare;
        this.readDone = readDone;
        this.tags = tags;
    }

    static createNew(item) {
        return new Url({ ...item, created: new Date() })
    }

    get url() {
        return this._url;
    }

    // DB에 저장하기 위한 data 는 1level 객체형태여야함. Url class 인스턴스에서 필요한 요소만 뽑아서
    // 1 level 객체로 만듬.
    convertToDbUrlData() {
        let { url,
            siteName,
            description,
            title,
            image,
            created,
            isShare,
            readDone,
            tags
        } = this;

        let tmpUrl = {
            url,
            siteName,
            description,
            title,
            image,
            created,
            isShare,
            readDone,
            tags
        }

        // DB에 undefined 는 저장 안됨.
        for (let key in tmpUrl) {
            if (tmpUrl[key] == undefined || tmpUrl[key] == null)
                tmpUrl[key] = "";
        }

        return tmpUrl
    }

    get urlDbRef() {
        return this._urlDbRef;
    }

    set urlDbRef(input) {
        this._urlDbRef = input;
    }
}

export const useUserStore = create((set, get) => ({
    isLogin: false,
    user: null, // firebase auth user 정보
    userId: "",
    nickname: "",
    deadline: 7,
    userDbRef: null,    // firebase DB doc instance
    userMainTags: [],
    userTags: [],
    userTagsChecked: [],
    myUrls: [],
    allUrls: [],

    setUser: async (user) => {

        try {
            if (user == null) {
                throw new Error("no login user data");
            }

            let res = await getUserDocById(user.email);

            if (res.docData == null) {
                // 신규 ID로 로그인 된경우(DB 에 ID가 없음), Initail Data 를 DB 로 보내서 설정
                await updateUserDoc(res.docRef, userInitialDbInfo);
                res.docData = userInitialDbInfo;
            }

            console.log("set User: received data from DB ", res);

            set(
                {
                    ...res.docData,
                    isLogin: true,
                    user: user,
                    userId: user.email,
                    userDbRef: res.docRef
                }
            )
        } catch (error) {
            console.log("error setUser :", error);
        }

    },
    clearUser: () => set(initUserStore),
    logUserInfo: () => {
        console.log(get());
    },
    setUserTagsChecked: (tag, check) => {
        let newUserTagsChecked = [...(get().userTagsChecked)];

        // console.log(tag, check)

        if (check)
            newUserTagsChecked.push(tag);
        else {
            let idx = newUserTagsChecked.indexOf(tag);
            newUserTagsChecked.splice(idx,1);
        }

        set({ userTagsChecked: newUserTagsChecked });
    },
    clearUserTagsChecked: () =>{
        console.log("clear userTagsChecked");
        set({userTagsChecked: []});
    },
    addTag: async (tag) => {
        try {
            if (get().isLogin == false) {
                throw new Error("Can not add tag because isLogin false.");
            }

            console.log('tag:', tag);
            console.log(typeof tag);

            if (!(typeof tag === 'string') || (tag.length < 2)) {
                throw new Error("A tag must be a string of length greater than 1.");
            }

            let newTags = [...(get().userTags), tag];

            await updateUserDoc(get().userDbRef, { userTags: newTags });

            set({ userTags: newTags });

            return newTags;
        } catch (error) {
            console.log("error addTag :", error);
            throw new Error("add Tag Failed");
        }
    },
    addMyUrl: async (urlInfo) => {

        try {
            if (get().isLogin == false) {
                throw new Error("Can not add urlInfo because isLogin false.");
            }

            if (urlInfo == null) {
                throw new Error("urlInfo param is required.")
            }

            let newUrl = Url.createNew(urlInfo);

            newUrl.urlDbRef = await addMyUrlsDoc(get().userDbRef, newUrl.convertToDbUrlData());

            console.log('addMyUrl: success!', newUrl);

            set((state) => ({
                myUrls: [
                    ...state.myUrls,
                    newUrl
                ]
            }))

        } catch (error) {
            console.log('error addMyUrl :', error);
            throw new Error("addMyUrl is failed!");
        }
    },
    delMyUrl: async (url) => {
        try {
            await delMyUrlsDoc(url.urlDbRef);

            let newMyUrls = get().myUrls.filter(item => item != url);
            console.log('newMyUrls:', newMyUrls);
            set({ myUrls: newMyUrls });

        } catch (error) {
            console.log('error delMyUrl :', error);
        }
    },
    modMyUrl: async (url) => {
        try {
            await setMyUrlsDoc(url.urlDbRef, url.convertToDbUrlData());

            // 이미 Url 정보는 바뀌어 있으니, set 에 새로운 배열로 업데이트만 해주면 됨
            set({ myUrls: [...(get().myUrls)] });

        } catch (error) {
            get().getMyUrls(); // DB 에서 다시 읽어 온다.
            console.log('error modMyUrl :', error);
            throw new Error("modification myUrl is failed!");
        }
    },
    getMyUrls: async () => {
        try {
            if (get().userDbRef == null)
                throw new Error("userDbRef is null");

            let res = await getMyUrlsDocs(get().userDbRef);

            console.log('getMyUrls: get Data', res)

            set(() => ({
                myUrls: res.map((item) => {
                    let tmpUrl = new Url(item.docData);
                    tmpUrl.urlDbRef = item.docRef;
                    return tmpUrl;
                })
            }))

        } catch (error) {
            console.log('error getMyUrls :', error);
        }
    }

}))
