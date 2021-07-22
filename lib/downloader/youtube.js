const youtube = require('ytdl-core');
const fileSize = require('filesize');
// const fs = require('fs')
const readline = require('readline');
// const http = require('https')
const ffmpeg = require('fluent-ffmpeg');

const ytmp3 = (url, sender) => new Promise(async (resolve, reject) => {
    try {
        const info = await youtube.getInfo(url)
        const details = info.videoDetails
        let title = details.title
        let link = details.video_url
        let thumbnail = details.thumbnails[2].url

        const dl = youtube.filterFormats(info.formats, 'audioonly')[0]
        let size = fileSize(dl['contentLength'])
        let dlurl = dl['url']

        let stream = youtube(url, { quality: 'highestaudio' })
        let start = Date.now();
        ffmpeg(stream)
            .audioBitrate(128)
            .save(`./temp/${sender}_ytmp3.mp3`)
            .on('progress', p => {
                readline.cursorTo(process.stdout, 0);
                process.stdout.write(`${p.targetSize}kb downloaded`);
            })
            .on('end', () => {
                const arr = {
                    code: 200,
                    status: true,
                    link,
                    title,
                    size,
                    thumbnail,
                    dlurl
                }
                console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
                resolve(arr)
            });
    } catch (err) {
        reject({ code: 404, status: false, msg: err })
    }
})

const ytdl = (url) => new Promise(async (resolve, reject) => {
    try {
        const info = await youtube.getInfo(url)
        const details = info.videoDetails
        let title = details.title
        let link = details.video_url
        let thumbnail = details.thumbnails[0].url
        const dl = youtube.chooseFormat(info.formats, { quality: 'highest' })
        let size = fileSize(dl['contentLength'])
        let dlurl = dl['url']
        const arr = {
            code: 200,
            status: true,
            link,
            title,
            size,
            thumbnail,
            dlurl
        }
        resolve(arr)
    } catch (err) {
        reject({
            code: 404, status: false, msg: err
        })
    }
})

// ytmp3('https://www.youtube.com/watch?v=r1Fx0tqK5Z4', 'kikiaf')
//     .then(async (res) => {
//         console.log(res);
//     }).catch((err) => console.error(err))

module.exports = { ytdl, ytmp3 }