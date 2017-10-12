require('dotenv').config()
const os = require('os')
const prerender = require('prerender')

const server = prerender({ workers: process.env.NUM_WORKERS || os.cpus().length })

server.use(prerender.sendPrerenderHeader())
server.use(prerender.removeScriptTags())
server.use(prerender.httpHeaders())

if (
    process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY &&
    process.env.S3_BUCKET_NAME
) {
    server.use(prerender.s3HtmlCache());
} else {
    server.use(prerender.inMemoryHtmlCache());
}

// Start
server.start();
