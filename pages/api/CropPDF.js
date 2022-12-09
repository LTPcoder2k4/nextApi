const {spawn} = require("child_process")

export default function handler(req, res) {
    if (req.method === "POST"){
        const cropProgram = spawn("python", ['/crop.py', req.body.file])
        res.status(200).json({"status": "oke"})
    }
}