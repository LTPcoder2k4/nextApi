import {PDFDocument, rgb} from 'pdf-lib'
var fs = require('fs')

export default function handler(req, res) {
    if (req.method === "POST"){
        return new Promise((resolve, rejects)=>{
            fetch(req.body.file)
            .then(res => res.arrayBuffer())
            .then(async file =>{
                const pdfDoc = await PDFDocument.load(file)

                const pages = pdfDoc.getPages()

                for (let page of pages){
                    const svgPath =
                    `M0,0 ${page.getWidth()},0 ${page.getWidth()},50 0,50`
    
                    page.moveTo(0, 60)
                    page.drawSvgPath(svgPath, { color: rgb(1, 1, 1) })
                }

                let fileName = req.body.file.substring(req.body.file.lastIndexOf('/') + 1, req.body.file.length)
                fs.writeFileSync('./public/downloads/' + fileName, await pdfDoc.save())
                resolve(res.status(200).json({"file": '/downloads/' + fileName}))
                
            })
        })

        
    }
}