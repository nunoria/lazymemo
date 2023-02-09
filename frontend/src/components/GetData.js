import { useState } from "react";
import axios from "axios";
import * as cheerio from 'cheerio';
const url = "https://yozm.wishket.com/magazine/detail/1851/";

async function getHeader(url) {

    let start = Date.now();

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        let header = {};
        header.title = $('meta[property="og:title"]').attr('content');
        header.site_name = $('meta[property="og:site_name"]').attr('content');
        header.keyword = $('meta[property="og:keyword"]').attr('content');
        header.description = $('meta[property="og:description"]').attr('content');
        header.image = $('meta[property="og:image"]').attr('content');

        console.log(header);

        let end = Date.now();
        console.log(`경과시간: ${end - start}ms`);

        return header;

    } catch (err) {
        console.log("Error>>", err);
        return err;
    }

}

async function getKeyword(url) {

    let start = Date.now();
    const keyword_count = 3;  // 최대 키워드 숫자

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        let header = {};
        header.keywordString = $('meta[property="og:keyword"]').attr('content');
        header.description = $('meta[property="og:description"]').attr('content');

        // open AI 에 description  주고, 키워드 받기를 구현 합시다
        if (header.keywordString != null) {
            header.keywords = header.keywordString.split(',');

            while (header.keywords.length > keyword_count) {
                header.keywords.pop()
            }
        }

        console.log(header);

        let end = Date.now();
        console.log(`경과시간: ${end - start}ms`);

        return header;

    } catch (err) {
        console.log("Error>>", err);
        return err;
    }

}


export default function GetURLInfo() {

    console.log("GetURLInfo");

    // let post_data = {
    //     url : url,
    //     user : "이기범"
    // }

    // axios.post("/api/header", post_data).then((response) => {

    //     console.log(response.data);
    // })

    return (
        <div>
            <button className=" bg-green-400 p-2 rounded-lg" onClick={() => {
                console.log("데이터 클릭");
                getHeader(url).then((res) => console.log(res));
            }}>데이터 가져오기</button>
        </div>
    )


}

export { getHeader, getKeyword }
