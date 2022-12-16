export default function handler(req, res) {
    if (req.method === 'GET'){ 
        const { slug } = req.query
        var fs = require('fs')
        var pdf = fs.readFileSync('./public/downloads/' + slug)
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=name.Pdf')
        res.setHeader('Content-Length', pdf.length)
        res.end(pdf)
    }
}