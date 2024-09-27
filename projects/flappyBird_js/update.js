import { pointExport } from "./game.js";
const scoreDiv = document.getElementById('score');
const nameDiv = document.getElementById('divname');

let maxPoint = 0
const fetchScore = () => {
    fetch('http://localhost:3001')
        .then(response => response.json())
        .then(data => {
            scoreDiv.innerHTML = `${data.name} has the Best Score: ${data.score}`
            maxPoint = data.score
        })
        .catch(error => console.error('Error:', error));

}
fetchScore()




const updateFetch = () => {
    let inputName = document.getElementById('name').value;
    if (inputName.length > 0) {
        const point = pointExport
        fetch('http://localhost:3001/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: inputName, score: point }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.score);
                fetchScore()
            })
            .catch(error => console.error('Error:', error));
    }else{
        alert('You must write your name')
    }
}

const buttton = document.getElementById('button')
buttton.addEventListener('click', () => {
    if (pointExport > maxPoint) {
        updateFetch()
        fetchScore()
    }
})