import { spawn } from "child_process"
const path = require("path")

export default function handler(req, res) {
    if (req.method === "POST"){
        return new Promise((resolve, reject) => {
            const cropProgram = spawn("python", [process.cwd() + "\\public\\crop.py", req.body.file])
        
            cropProgram.stdout.on('data', (data)=>{
                resolve(res.status(200).json({"file": data.toString()}))
            })
        })
    }
}