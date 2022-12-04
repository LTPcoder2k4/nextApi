function checkNegative(num){
    let isNegative = false
    if (num[0] === '-'){
        isNegative = true
        num.splice(0, 1)
    }
    return [isNegative, num]
}

function checkValid(num){
    if (typeof(num) !== "string"){
        return false
    }
    for (let i of num){
        if (i > '9' || i < '0'){
            return false
        }
    }
    return true
}

function trimNumber(num){
    //Delete 0 digit at head
    while (num[0] === '0'){
        num.splice(0, 1)
    }
    return num
}

function formatNumber(num){
    let formattedNumber = []
    let i = 0

    for (i = 1; i * 3 <= num.length; i++){
        formattedNumber.push(num.substring(3 * (i - 1), 3 * i))
    }

    if (i < num.length){
        formattedNumber.push(3 * (i - 1), num.length)
    }
    return formattedNumber
}

function readPart(num){
    let numberName = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"]
    let result = ""

    for (let i = 0; i < num.length; i++){
        let numberDigit = ""
        switch (num - i){
            case 1:
                numberDigit += numberName[parseInt(num[i])] + " "
                if (num.length > 1){
                    //In case of [1..9] stand right before 5
                    if (num[i] === '5' && num[i - 1] !== '0'){
                        numberDigit = "lăm "
                    }
                    //In case of [2..9] stand right before 1 
                    if (num[i] === '1' && num[i - 1] !== '1' && num[i - 1] !== '0'){
                        numberDigit = "mốt "
                    }
                    if (num[i] === '0'){
                        numberDigit = ""
                    }
                }
                break
            case 2:
                if (num[i] === '0'){
                    //In case of [1..9] stand right before 0
                    if (num[i + 1] !== '0'){
                        numberDigit =  "lẻ "
                      }
                    //In case of 10
                }else if (num[i] === '1'){
                    numberDigit =  "mười "
                }else{
                    numberDigit =  numberName[parseInt(num[i])] + " mươi "
                }
                break
            case 3:
                numberDigit = numberName[parseInt(num[i])] + " trăm "
                if (num[i] == '0' && num[i + 1] == '0' && num[i + 2] == '0'){
                    numberDigit = ""
                }
                break
            default:
                break
        }
        result += numberDigit
    }

    return result
}

function readNumber(num){
    //Check if num is a string and just contain only number character or negative sign
    let isNegative = false
    [isNegative, num] = checkNegative(num)
    if (!checkValid(num)){
        return [400, "The number is in wrong format"]
    }

    //Standardize num before optimizing
    num = trimNumber(num)
    //num if divided into parts of 3 digit
    let numArr = formatNumber(num)
    let reader = ""

    //For loop to read each part of numArr
    for (let i = 0; i < numArr.length; i++){
        let digitReader = ""
        if (parseInt(numArr) !== 0 || i === 0){
            digitReader += readPart(numArr[i])
            switch (i % 4){
                case 1: 
                    digitReader += "nghìn "
                    break
                case 2:
                    digitReader += "triệu "
                case 3:
                    digitReader += "tỷ "
            }
        }
        reader += digitReader
    }

    return [200, reader]
}

export default function handler(req, res) {
    if (req.method === "POST"){
        let result = readNumber(req.body.number)
        res.status(result[0]).json({result: result[1]})
    }
}