let numbers = prompt('Write the number to evaluate')
let total = 0
const armstrong = () => {
    for (let i = 0; i < numbers.length; i++) {
        let num = numbers[i]
        let power = Math.pow(num, numbers.length)
        total += power

    }
    if(total === Number(numbers)) {
        alert('Es un numero Armstrong')
    }
    if(total !== Number(numbers)) {
        alert ('No es un numero Armstrong')
    }
}
armstrong()