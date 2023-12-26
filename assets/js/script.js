let nodes = document.querySelector("section").querySelectorAll("button");
let buttons = document.querySelectorAll("button");

function run() {
    nodes.forEach(node => {

        let location = node.getAttribute("data-coord");
        let locationArray = location.split(',');
        let locationNumberArray = [Number(locationArray[0]), Number(locationArray[1])]
        let adjacent = [];

        // Even
        if (locationNumberArray[1] % 2 == 0) {
            let evenArray = [
                [1,0],
                [0,1],
                [-1,0],
                [0,-1],
                [-1,1],
                [-1,-1],
            ];

            evenArray.forEach(coord => {
                if (document.querySelector('[data-coord="' + (locationNumberArray[0] + coord[0]).toString() + "," + (locationNumberArray[1] + coord[1]).toString() + '"]')) {
                    adjacent.push((locationNumberArray[0] + coord[0]).toString() + "," + (locationNumberArray[1] + coord[1]).toString());
                }
            })
        }
        // Odd
        else {
            let oddArray = [
                [1,0],
                [0,1],
                [-1,0],
                [0,-1],
                [1,-1],
                [1,1]
            ];

            oddArray.forEach(coord => {
                if (document.querySelector('[data-coord="' + (locationNumberArray[0] + coord[0]).toString() + "," + (locationNumberArray[1] + coord[1]).toString() + '"]')) {
                    adjacent.push((locationNumberArray[0] + coord[0]).toString() + "," + (locationNumberArray[1] + coord[1]).toString());
                }
            })
        }

        count = 0;
        adjacent.forEach(neighbor => {
            let neighborButton = document.querySelector('[data-coord="' + neighbor + '"]');
            if (neighborButton.getAttribute("id")) {
                count++;
            }
        })

        // Alive
        if (node.getAttribute("id")) {
            if (count == 2 || count == 3) {
                node.setAttribute("data-next", "born");
            }
        }
        // Dead
        else {
            // Original game of life is (count == 2 || count == 3) when alive, (count == 3) when dead
            if (count == 2 || count == 3) {
                node.setAttribute("data-next", "born");
            }
        }
    });

    nodes.forEach(node => {
        if (node.getAttribute("data-next")) {
            node.setAttribute("id", "alive");
            node.removeAttribute("data-next");
        }
        else {
            node.removeAttribute("id");
        }
    });
}

// Toggle color of grid nodes
nodes.forEach(node => {
    function toggleColor() {
        if (node.getAttribute("id")) {
            node.removeAttribute("id");
        }
        else {
            node.setAttribute("id", "alive");
        }
    }

    node.addEventListener("click", toggleColor);
});

// Clear the grid
let clear = document.querySelector(".clear");
let alives = document.querySelectorAll("#alive");

function clearNodes() {
    alives.forEach(alive => {
        alive.removeAttribute("id");
    })
}

clear.addEventListener("click", clearNodes);

// Toggle color of "Run" button
let button = document.querySelector(".run");

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
            run();
        }, 10000);
    }
    else {
        clearInterval(game);
    }
}

button.addEventListener("click", start);
