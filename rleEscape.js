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

let str = fs.readFileSync(file1,'utf8')
let strEnd = new String;
let i = 0
let countSim = 1

let strNew = new String;
let j = 0

if (mode == 'encode'){
	while (str.charAt(i)){
		if ((str.charAt(i+1) == str.charAt(i)) && (countSim<255)){
			countSim++
		}
		else if ((countSim>3) || (str.charAt(i) == '#')){
			strEnd+='#' + String.fromCharCode(countSim) + str.charAt(i);
			countSim=1
		}
		else{
			strEnd += str.charAt(i).repeat(countSim);
			countSim = 1
		}
		i++
	}
	fs.writeFileSync(file2, strEnd)
}


else if (mode == 'decode'){
	let strEnd = fs.readFileSync(file1,'utf8')
	while (strEnd.charAt(j)){
		if (strEnd.charAt(j) == '#'){
			strNew += strEnd.charAt(j+2).repeat(strEnd.charCodeAt(j+1));
			j+=3
		}
		else{
			strNew+=strEnd.charAt(j);
			j++
		}
	}
	fs.writeFileSync(file2, strNew)
}
else{
	console.log('Неверно указан режим работы!')
}

