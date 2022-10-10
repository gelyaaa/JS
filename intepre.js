const fs = require("fs")
const prompt = require("prompt-sync")()

let rem = []
let file = (process.argv[2])
if (fs.existsSync(file)==false){
    console.log("Файл (параметр 2) не найден")
    process.exit(1)
}
let text = fs.readFileSync(file, 'utf8')
text=text.replace(/[\r\n]+/g," ")+' '+' '+' '+' '+'exit'
/*console.log(text)*/
rem=text.split(' ')
/*console.log(rem)
for(let count=0;count<rem.length;count++){
    console.log('В ячейке ',count, 'хранится ',rem[count])
}*/
let i=0
while (rem[i]!='exit'){
    if (rem[i]=='input'){
        let y = prompt('Введите значение: ');
        rem[rem[i+1]]=y
        i+=2
        continue
    }
    if (rem[i]=='init'){
        rem[rem[i+2]]=rem[i+1]
        i+=3
        continue
    }
    if (rem[i]=='fromin'){
        rem[rem[i+2]]=rem[rem[i+1]]
        i+=3
        continue
    }
    if (rem[i]=='sum'){
        rem[rem[i+3]]=Number(rem[rem[i+1]])+Number(rem[rem[i+2]])
        i+=4
        continue
    }
    if (rem[i]=='diff'){
        rem[rem[i+3]]=Number(rem[rem[i+1]])-Number(rem[rem[i+2]])
        i+=4
        continue
    }
    if (rem[i]=='less'){
        if (Number(rem[rem[i+1]])<Number(rem[rem[i+2]])){
            rem[rem[i+3]]=1
        }
        else{
            rem[rem[i+3]]=0
        }
        i+=4
        continue
    }
    if (rem[i]=='more'){
        if (Number(rem[rem[i+1]])>=Number(rem[rem[i+2]])){
            rem[rem[i+3]]=1
        }
        else{
            rem[rem[i+3]]=0
        }
        i+=4
        continue
    }
    if (rem[i]=='gotoif'){
        if (rem[rem[i+1]]==1){
            i=Number(rem[i+2])
        }
        else{
            i+=3
        }
        continue
    }
    if (rem[i]=='equally'){
        if (Number(rem[rem[i+1]])==Number(rem[rem[i+2]])){
            rem[rem[i+3]]=1
        }
        else{
            rem[rem[i+3]]=0
        }
        i+=4
        continue
    }
    if (rem[i]=='print'){
        console.log("Результат: ",rem[rem[i+1]])
        i+=2
        break
    }
    if (rem[i]=='exit'){
        break
    }
    i++
}
