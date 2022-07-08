const board = document.querySelector('.board')
const columns = 3
const rows = 3

let curr_tile
let other_tile // blank tile

let turns = 0

const image_order = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
const random_order = ['4', '2', '8', '5', '1', '6', '7', '9', '3']

// Drag Functionality
function dragStart(){
    curr_tile = this
}

function dragOver(e){
    e.preventDefault()
}

function dragEnter(e){
    e.preventDefault()
}

function dragDrop(){
    other_tile = this
}

function dragEnd(){
    const curr_coords = curr_tile.id.split('-')
    const curr_r = parseInt(curr_coords[0])
    const curr_c = parseInt(curr_coords[1])

    const other_coords = other_tile.id.split('-')
    const other_r = parseInt(other_coords[0])
    const other_c = parseInt(other_coords[1])

    const move_left = other_r == curr_r && other_c == curr_c - 1
    const move_right = other_r == curr_r && other_c == curr_c + 1
    const move_up = other_r == curr_r - 1 && other_c == curr_c
    const move_down = other_r == curr_r + 1 && other_c == curr_c

    const isValid = move_left || move_right || move_up || move_down
    console.log(other_tile.src)
    if(isValid && other_tile.src.includes('/images/3.jpg')){
        let curr_image = curr_tile.src
        curr_tile.src = other_tile.src
        other_tile.src = curr_image

        turns++
        document.querySelector('.turn_count').innerHTML = turns
    }
}

for(let i = 0; i < rows; ++i){
    for(let j = 0; j < columns; ++j){
        let tile = document.createElement('img')
        tile.id = i.toString() + '-' + j.toString()
        tile.src = './images/' + random_order.shift() + '.jpg'

        tile.addEventListener('dragstart', dragStart)
        tile.addEventListener('dragend', dragEnd)
        tile.addEventListener('dragover', dragOver)
        tile.addEventListener('dragenter', dragEnter)
        tile.addEventListener('drop', dragDrop)

        board.append(tile)
    }
}