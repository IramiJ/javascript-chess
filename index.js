var turn = 'w'
var chessboard = [['T_black','L_black', 'S_black', 'D_black', 'K_black', 'L_black', 'S_black', 'T_black'],
              ['B_black','B_black','B_black','B_black','B_black','B_black','B_black','B_black',],
              ['0','0','0','0','0','0','0','0'],
              ['0','0','0','0','0','0','0','0'],
              ['0','0','0','0','0','0','0','0'],
              ['0','0','0','0','0','0','0','0'],
              ['B_white','B_white','B_white','B_white','B_white','B_white','B_white','B_white'],
              ['T_white','L_white', 'S_white', 'D_white', 'K_white', 'L_white', 'S_white', 'T_white']]

    
loadChessboard()
dragPiece()
function initialize(){

}
function loadChessboard(){
    for(i=7; i>=0; i--){
        for (j=0; j<=7; j+=1){
            var piece = chessboard[i][j];
            if (piece !== '0'){
                id = 7 - i
                row = document.getElementById(id.toString());
                squares = row.childNodes;
                var img = document.createElement("img")
                img.setAttribute("src", "imgs/" + piece + ".png");
                img.setAttribute('class', 'piece')
                squares[(j+1)*2-1].appendChild(img);
            }
        }
    }
}

function dragPiece(){
    const squares = document.querySelectorAll('.black, .white')
    const pieces = document.querySelectorAll('.piece')
    pieces.forEach(piece =>{
        piece.addEventListener('dragstart', dragStart)
    })
    squares.forEach(square => {
        square.addEventListener('dragenter', dragEnter)
        square.addEventListener('dragover', dragOver);
        square.addEventListener('dragleave', dragLeave);
        square.addEventListener('drop', drop);
    });
}
function dragStart(e){
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    console.log(id)
    const draggable = document.getElementById(id);
    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');
}