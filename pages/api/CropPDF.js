import {PDFDocument, rgb} from 'pdf-lib'
const fs = require('fs')

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

                fs.writeFileSync('public/' + req.body.file.substring(req.body.file.lastIndexOf('/'), req.body.file.length), await pdfDoc.save()) 
                
                resolve(res.status(200).json({"result": req.body.file.substring(req.body.file.lastIndexOf('/'), req.body.file.length)}))
            })
        })

        
    }
}