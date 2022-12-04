function readNumber(num){
    let formattedNumber = []
    let i = 0
    for (i = 1; i * 3 <= num.length; i++){
        formattedNumber.push(num.substring(3 * (i - 1), 3 * i))
    }
    return formattedNumber
}

export default function handler(req, res) {
    if (req.method === "POST"){
        res.status(200).json({result: readNumber(req.body.number)})
    }
}