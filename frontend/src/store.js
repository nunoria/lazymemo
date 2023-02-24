import { create } from 'zustand'
import * as _ from 'lodash'
import { getUserDocById, updateUserDoc, setUserDoc, addMyUrlsDoc, getMyUrlsDocs } from 'components/db/Contorl'

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
    myUrls: []
}

export class Url {
    constructor({ url, site, description, title, image, created, isShare, readDone, tags }) {
        this._url = url;
        this.site = site;
        this.description = description;
        this.title = title;
        this.image = image;
        this.created = created;
        this.isShare = isShare;
        this.readDone = readDone;
        this.tags = tags;
    }

    get url() {
        return this._url;
    }

    convertToDbUrlData() {
        let { url,
            site,
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
            site,
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
    addTag: async (tag) => {
        try {
            if (get().isLogin == false) {
                throw new Error("Can not add tag because isLogin false.");
            }

            console.log('tag:', tag);
            console.log(typeof tag);

            if (!(typeof tag === 'string') || (tag.length < 1)) {
                throw new Error("A tag must be a string of length greater than 1.");
            }

            let newTags = [...(get().userTags), tag];

            await updateUserDoc(get().userDbRef, { userTags: newTags });

            set({ userTags: newTags })

            return newTags;
        } catch (error) {
            console.log("error addTag :", error);
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

            // // DB에 undefined 는 저장 안됨.
            // for (let key in urlInfo) {
            //     if (urlInfo[key] == undefined || urlInfo[key] == null)
            //         urlInfo[key] = "";
            // }

            urlInfo.urlDbRef = await addMyUrlsDoc(get().userDbRef, urlInfo.convertToDbUrlData());

            if (urlInfo.urlDbRef == null) {
                throw new Error("add to DB is failed.")
            }

            console.log('addMyUrl: success!', urlInfo);

            set((state) => ({
                myUrls: [
                    ...state.myUrls,
                    urlInfo
                ]
            }))

        } catch (error) {
            console.log('error addMyUrl :', error);
        }
    },
    getMyUrls: async () => {
        try {
            if (get().userDbRef == null)
                throw new Error("userDbRef is null");

            let res = await getMyUrlsDocs(get().userDbRef);

            set(() => ({
                myUrls: res.map((item) => {
                    let tmpUrl = new Url(item.docData);
                    tmpUrl.urlDbRef = item.docRef
                    return tmpUrl;
                })
            }))

        } catch (error) {
            console.log('error getMyUrls :', error);
        }

    }

}))
