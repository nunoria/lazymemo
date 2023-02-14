import { create } from 'zustand'
import * as _ from 'lodash'
import { getUserDocById, updateUserDoc, setUserDoc } from 'components/db/Contorl'

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
    myurl: []
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
    myurl: [],

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

            console.log("set User: received data from DB ")
            console.log(res);

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
    }

}))
