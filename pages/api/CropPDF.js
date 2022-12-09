const {spawn} = require("child_process")

export default function handler(req, res) {
    if (req.method === "POST"){
        const cropProgram = spawn("python", ['crop.py', req.body.file])

        cropProgram.stdout.on('data', (data)=>{
            res.status(200).json({"status": "window.location.origin/" + data})
        })
    }
}