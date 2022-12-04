function readNumber(num){
    return num
}

export default function handler(req, res) {
    if (req.method === "POST"){
        res.status(200).json({result: readNumber(req.body.number)})
    }
}