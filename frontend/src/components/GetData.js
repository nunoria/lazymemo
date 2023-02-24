import { useState } from "react";
import axios from "axios";
import * as cheerio from 'cheerio';
const url = "https://yozm.wishket.com/magazine/detail/1851/";
const url2 = "https://kim-solshar.tistory.com/57";
const url3 = "https://blog.wishket.com/%EB%A7%A4%EA%B1%B0%EC%A7%84-%EA%B0%99%EC%9D%80-%EC%87%BC%ED%95%91%EB%AA%B0-29cm-ux-ui%ED%8E%B8/";


// class UrlInfo  {
//     constructor(urlString, title, siteName, keyword, description, image) {
//         this.urlString = urlString;
//         this.title = title;
//         this.siteName = siteName;
//         this.keyword = keyword;
//         this.description = description
//         this.image = image
//     }

// }

export async function getHeader(url) {

    let start = Date.now();

    try {
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);

        let urlInfo = {};
        urlInfo.title = $('meta[property="og:title"]').attr('content');
        urlInfo.keyword = $('meta[property="og:keyword"]').attr('content');
        urlInfo.description = $('meta[property="og:description"]').attr('content');
        urlInfo.image = $('meta[property="og:image"]').attr('content');
        urlInfo.url = url
        // urlInfo.siteName = $('meta[property="og:site_name"]').attr('content'); // site_name 에 대해서 작동 안함.
        urlInfo.siteName = $('meta').filter((i, el) => {
            return $(el).attr('property') === "og:site_name"
        }).attr('content')

        console.log($);
        console.log(urlInfo);

        let end = Date.now();
        console.log(`경과시간: ${end - start}ms`);



        return urlInfo;

    } catch (err) {
        console.log("Error>>", err);
        return err;
    }

}

export async function getKeyword(url) {

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

export const getUrlMetaToLog = async (url) => {
    let start = Date.now();

    let urlInfo = {};

    try {
        const html = await axios.get(url);
        const $ = cheerio.load(html.data);

        // og:site_name 만 가져옴
        // let siteName = $('meta').filter((i, el) => {
        //     return $(el).attr('property') === "og:site_name"
        // }).attr('content');

        // meta 태그에서 og: 로 시작하는 태그들의 content 를 키,값의 객체로 가져옴
        $('meta').each((i, el) => {
            let props = $(el).attr('property')?.split(':');
            if (props && props[0] === "og") {
                urlInfo[props[1]] = $(el).attr('content');
            }
        })

        console.log("No    name    property   content")
        $('meta').each((i, el) => {
            console.log(i, $(el).attr('name'), $(el).attr('property'), $(el).attr('content'))
        })

        console.log(urlInfo);

        let end = Date.now();
        console.log(`경과시간: ${end - start}ms`);

    } catch (error) {
        console.log(error)
    }
}
