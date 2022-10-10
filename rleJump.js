const fs = require('fs');
let mode = (process.argv[2])
let file1 = (process.argv[3])
let file2 = (process.argv[4])
if ((fs.existsSync(file1)==false) || (fs.existsSync(file2)==false)){
	if (fs.existsSync(file1)==false){
		console.log("Файл (параметр 3) не найден")
	}
	if (fs.existsSync(file2)==false){
		console.log("Файл (параметр 4) не найден")
	}
	process.exit(1)
}

let str = fs.readFileSync(file1,'utf8');
let strEnd = new String;
let strTemporary = new String;
let i = 0
let countSim = 0
let countDifferentSim = 0

let strNew = new String;
let j = 0
let quantity = new Number
if (mode =='encode'){
    while (str.charAt(i)){
		if ((str.charAt(i) == str.charAt(i+1)) && (countSim < 127)){
			countSim++;
            if (countDifferentSim != 0){
                strEnd += String.fromCharCode(countDifferentSim + 128) + strTemporary;
                countDifferentSim = 0;
                strTemporary = new String;
            }
        }
        else{
            if (countSim != 0){
                countSim++
                strEnd += String.fromCharCode(countSim) + str.charAt(i);
                countSim = 0;
            }
            else{
                if (countDifferentSim < 127){
                    strTemporary += str.charAt(i);
                    countDifferentSim++;
                }
                else{
                    strTemporary += str.charAt(i);
                    countDifferentSim++;
                    strEnd += String.fromCharCode(countDifferentSim + 128) + strTemporary;
                    countDifferentSim = 0;
                    strTemporary = new String;
                }
            }
        }
        i++
    }
    if (countDifferentSim!=0){
        strEnd += String.fromCharCode(countDifferentSim + 128) + strTemporary
    }
	fs.writeFileSync('out.txt', strEnd)
}


else if (mode == 'decode'){
    let strEnd = fs.readFileSync('out.txt','utf8')
	while (strEnd.charAt(j)){
        if (strEnd.charCodeAt(j)>128){
            quantity=strEnd.charCodeAt(j)-128;
            for (let y = 0; y < quantity; y++){
                strNew+=strEnd.charAt(j+1);
                j++;
            }
        }
        else{
            quantity=strEnd.charCodeAt(j);
            for (let y = 0; y < quantity; y++){
                strNew+=strEnd.charAt(j+1)
            }
            j++
        }
        j++
    }
	fs.writeFileSync(file2, strNew)
}
else{
    console.log('Неверно указан режим работы!')
}


