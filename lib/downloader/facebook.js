module.exports = fbdl = async (url) => {
    try {
        const got = require("got");
        const Axios = require('axios');

        if (url.includes('web.')) {
            url = url.replace('web', 'mbasic')
        } else if (url.includes('www.')) {
            url = url.replace('www', 'mbasic')
        } else if (url.includes('mobile.')) {
            url = url.replace('mobile', 'mbasic')
        }

        console.log(url);
        const resp = await Axios(url);
        const cheerio = require("cheerio")
        const regex = /href\=\"\/video\_redirect\/\?src\=(.*?)\"/;
        let m;
        if ((m = regex.exec(resp.data)) !== null) {
            return m[1]
        }
        return false
    } catch (err) {
        return false
    }
}



// fbdl('https://mbasic.facebook.com/icener.barbanida.31/videos/609603370444506').then((res) => console.log(res))










// // btnGetLink.addEventListener("click", getLink);

// // //link download video from facebook
// // const getLinkSD = (link) => {
// //     return got(link)
// //         .then((res) => {
// //             const link = res.body.split('sd_src:"')[1].split('",hd_tag')[0];
// //             return {
// //                 url: link,
// //             };
// //         })
// //         .catch((error) => {
// //             hd.href = "#";
// //             hd.innerHTML = "Not found url video SD";
// //         });
// // };

// const getLinkHD = (link) => {
//     return got(link)
//         .then((res) => {
//             const link = res.body.split('hd_src:"')[1].split('",sd_src:"')[0];
//             return {
//                 url: link,
//             };
//         })
//         .catch((error) => {
//             hd.href = "#";
//             hd.innerHTML = "Not found url video HD";
//         });
// };

// getLinkHD('https://web.facebook.com/icener.barbanida.31/videos/609603370444506')
//     .then((res) => console.log(res))
//     .catch((err) => console.error(err));
// https://web.facebook.com/icener.barbanida.31/videos/609603370444506