var turn = 'w'
var chessboard = [['T_black,0','S_black,0','L_black,0','D_black,0', 'K_black,0', 'L_black,1', 'S_black,1', 'T_black,1'],
              ['B_black,0','B_black,1','B_black,2','B_black,3','B_black,4','B_black,5','B_black,6','B_black,7'],
              ['0','0','0','0','0','0','0','0'],
              ['0','0','0','0','0','0','0','0'],
              ['0','0','0','0','0','0','0','0'],
              ['0','0','0','0','0','0','0','0'],
              ['B_white,0','B_white,1','B_white,2','B_white,3','B_white,4','B_white,5','B_white,6','B_white,7'],
              ['T_white,0','S_white,0','L_white,0','D_white,0', 'K_white,0', 'L_white,1', 'S_white,1', 'T_white,1']]

    
loadChessboard()
dragPiece()
makeMove()
//loads the chessboard
function loadChessboard(){
    for(i=7; i>=0; i--){
        for (j=0; j<=7; j+=1){
            var piece = chessboard[i][j];
            if (piece !== '0'){
                id = 7 - i
                row = document.getElementById(id.toString());
                squares = row.childNodes;
                var img = document.createElement("img")
                img.setAttribute("src", "imgs/" + piece.split(",")[0] + ".png");
                img.setAttribute('class', 'piece')
                img.setAttribute("id", piece.split(",")[0]+piece.split(",")[1])
                squares[(j+1)*2-1].appendChild(img);
            }
        }
    }
}

//handeling dragging and droping of the pieces
function dragPiece(){
    const squares = document.querySelectorAll('.black, .white')
    const pieces = document.querySelectorAll('.piece')
    pieces.forEach(piece =>{
        piece.addEventListener('dragstart', dragStart)
    })
    squares.forEach(square => {
        square.addEventListener('dragenter', dragEnter)
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', drop);
    });
}
function dragStart(e){
    if (turn == "w"){
        if(e.target.id.split("_")[1].includes("white")){
            e.dataTransfer.setData('text/plain', e.target.id);
            setTimeout(() => {
                e.target.classList.add('hide');
            }, 0);
        }
        else{
            return null;
        }
        turn = "b"
    }
    else{
        if(e.target.id.split("_")[1].includes("black")){
            e.dataTransfer.setData('text/plain', e.target.id);
            setTimeout(() => {
                e.target.classList.add('hide');
            }, 0);
        }
        else{
            return null;
        }
        turn = "w"
}
}
function dragEnter(e) {
    e.preventDefault();
}

function dragOver(e) {
    e.preventDefault();
}


function drop(e) {

    // get the draggable element
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    console.log(draggable)
    // add it to the drop target
    e.target.appendChild(draggable);

    // display the draggable element
  draggable.classList.remove('hide');
}