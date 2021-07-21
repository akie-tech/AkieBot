module.exports = fbdl = (url) => new Promise(async (resolve, reject) => {
    try {
        const Axios = require('axios');
        const resp = await Axios(url);

        if (url.includes('web.')) {
            url = url.replace('web', 'mbasic')
        } else if (url.includes('www.')) {
            url = url.replace('www', 'mbasic')
        } else if (url.includes('mobile.')) {
            url = url.replace('mobile', 'mbasic')
        }

        console.log(url);

        const regex = /href\=\"\/video\_redirect\/\?src\=(.*?)\"/;
        let m;
        if ((m = regex.exec(resp.data)) !== null) {
            resolve(m[1])
        } else {
            reject(false)
        }
    } catch (err) {
        reject(err)
    }
})
