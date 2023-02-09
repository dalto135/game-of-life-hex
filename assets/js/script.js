let squares = document.querySelector("section").querySelectorAll("button");
let buttons = document.querySelectorAll("button");

function be() {
    squares.forEach(square => {

        let location = square.getAttribute("data-coord");
        let locationArray = location.split(',');
        let locationNumberArray = [Number(locationArray[0]), Number(locationArray[1])]
        let adjacent = [];

        // Odd
        // 4,3  [4,2  5,2  3,3  5,3  4,4  5,4]
        // 0,0  [0,-1  1,-1  -1,0  1,0  0,1  1,1]

        // 3,3  4,2  4,4  5,3  5,2  5,4

        // Even
        // 9,2  [8,1  9,1  8,2  10,2  8,3  9,3]
        // 0,0  [-1,-1  0,-1  -1,0  1,0  -1,1  0,1]

        // 8,2  9,1  9,3  10,2  8,1  8,3

        // 99,0

        // 98,0  98,1

        // 98,0  

        // [-1,0]
        if (locationNumberArray[0] - 1 >= 0) {
            adjacent.push((locationNumberArray[0] - 1).toString() + ',' + (locationNumberArray[1]).toString());
        }

        // [0,-1]
        if (locationNumberArray[1] - 1 >= 0 && locationNumberArray[0] <= 98) {
            adjacent.push((locationNumberArray[0]).toString() + ',' + (locationNumberArray[1] - 1).toString());
        }

        // [0,1]
        if (locationNumberArray[1] + 1 <= 99 && locationNumberArray[0] <= 98) {
            adjacent.push((locationNumberArray[0]).toString() + ',' + (locationNumberArray[1] + 1).toString());
        }

        // Even
        if (locationNumberArray[1] % 2 == 0) {
            // [1,0]
            if (locationNumberArray[0] + 1 <= 99) {
                adjacent.push((locationNumberArray[0] + 1).toString() + ',' + (locationNumberArray[1]).toString());
            }
            if (locationNumberArray[0] - 1 >= 0) {
                // [-1,-1]
                if (locationNumberArray[1] - 1 >= 0) {
                    adjacent.push((locationNumberArray[0] - 1).toString() + ',' + (locationNumberArray[1] - 1).toString());
                }
                // [-1,1]
                if (locationNumberArray[1] + 1 <= 99) {
                    adjacent.push((locationNumberArray[0] - 1).toString() + ',' + (locationNumberArray[1] + 1).toString());
                }
            }
        }
        // Odd
        else {
            // [1,0]
            if (locationNumberArray[0] + 1 <= 98) {
                adjacent.push((locationNumberArray[0] + 1).toString() + ',' + (locationNumberArray[1]).toString());

                // [1,-1]
                if (locationNumberArray[1] - 1 >= 0) {
                    adjacent.push((locationNumberArray[0] + 1).toString() + ',' + (locationNumberArray[1] - 1).toString());
                }
                // [1,1]
                if (locationNumberArray[1] + 1 <= 99) {
                    adjacent.push((locationNumberArray[0] + 1).toString() + ',' + (locationNumberArray[1] + 1).toString());
                }
            }
        }

        // console.log("SQUARE");
        // console.log(location);
        // console.log("ADJACENT");
        // console.log(adjacent);

        // if (locationNumberArray[0] - 1 >= 0) {
        //     adjacent.push((locationNumberArray[0] - 1).toString() + ',' + (locationNumberArray[1]).toString());

        //     if (locationNumberArray[1] - 1 >= 0) {
        //         adjacent.push((locationNumberArray[0] - 1).toString() + ',' + (locationNumberArray[1] - 1).toString());
        //     }
        //     if (locationNumberArray[1] + 1 <= 99) {
        //         adjacent.push((locationNumberArray[0] - 1).toString() + ',' + (locationNumberArray[1] + 1).toString());
        //     }
        // }

        // if (locationNumberArray[1] - 1 >= 0) {
        //     adjacent.push((locationNumberArray[0]).toString() + ',' + (locationNumberArray[1] - 1).toString());
        // }
        // if (locationNumberArray[1] + 1 <= 99) {
        //     adjacent.push((locationNumberArray[0]).toString() + ',' + (locationNumberArray[1] + 1).toString());
        // }

        // if (locationNumberArray[0] + 1 <= 99) {
        //     adjacent.push((locationNumberArray[0] + 1).toString() + ',' + (locationNumberArray[1]).toString());

        //     if (locationNumberArray[1] - 1 >= 0) {
        //         adjacent.push((locationNumberArray[0] + 1).toString() + ',' + (locationNumberArray[1] - 1).toString());
        //     }
        //     if (locationNumberArray[1] + 1 <= 99) {
        //         adjacent.push((locationNumberArray[0] + 1).toString() + ',' + (locationNumberArray[1] + 1).toString());
        //     }
        // }

        count = 0;
        adjacent.forEach(neighbor => {
            let neighborButton = document.querySelector('[data-coord="' + neighbor + '"]');
            if (neighborButton.getAttribute("id")) {
                count++;
            }
        })

        // Alive
        if (square.getAttribute("id")) {
            if (count == 2 || count == 3) {
                square.setAttribute("data-next", "born");
            }
        }
        // Dead
        else {
            // Original game of life is (count == 2 || count == 3) when alive, (count == 3) when dead
            if (count == 2 || count == 3) {
                square.setAttribute("data-next", "born");
            }
        }

        // if (square == squares[101]) {
        //     console.log("SQUARE");
        //     console.log(location);
        //     console.log("ADJACENT");
        //     console.log(adjacent);
        // }
    });

    squares.forEach(square => {
        if (square.getAttribute("data-next")) {
            square.setAttribute("id", "alive");
            square.removeAttribute("data-next");
        }
        else {
            square.removeAttribute("id");
        }
    });
}

// Toggle color of grid squares
squares.forEach(square => {
    function cross() {
        if (square.getAttribute("id")) {
            square.removeAttribute("id");
        }
        else {
            square.setAttribute("id", "alive");
        }
    }

    square.addEventListener("click", cross);
});

// Clear the grid
let clear = document.querySelector(".clear");

function clearSquares() {
    squares.forEach(square => {
        square.removeAttribute("id");
    })
}

clear.addEventListener("click", clearSquares);

// Toggle color of "Be" button
let button = document.querySelector(".be");

function toggle() {
    if (button.getAttribute("id")) {
        button.removeAttribute("id");
    }
    else {
        button.setAttribute("id", "alive");
    }
}

button.addEventListener("click", toggle);

// Run the game
let game;
function start() {
    if (button.getAttribute("id")) {
        game = setInterval(() => {
            be();
        }, 10000);
    }
    else {
        clearInterval(game);
    }
}

button.addEventListener("click", start);