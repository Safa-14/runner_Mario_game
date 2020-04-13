window.onload = function () {
    //get html elements
    let gameCanvas = document.querySelector('#gameCanvas')
    let spanScore = document.querySelector('#score')


    //draw a horizontal line
    let context = gameCanvas.getContext('2d')
    //start a ligne
    context.moveTo(0, 100)
    //draw a ligne
    context.lineTo(600, 100)


    let boxCounter = 580
    let boxSpeed =  200

    let myFunction = function () { 
        
        context.clearRect(boxCounter + 20, 79, 20, 20) //should reduce the last one
        context.fillRect(boxCounter, 79, 20, 20)
        if (boxCounter == 0) {
            boxCounter = 580
        } else {
            boxCounter -= 20
        }
        boxInterval =setTimeout(myFunction, boxSpeed);
    }

    let boxInterval = setTimeout(myFunction, boxSpeed);

    //create Image
    let img = document.createElement('img')
    img.src = './imgs/player_big.png'

    img.onload = function (e) {
        
        let framCounter = 0
        let scoreCounter = 0
        let characterInterval = setInterval(function () { //the errow function make problem with jquery and internet explorer
            
            context.clearRect(0, 0, 48, 99)
            //context.clearRect(0, 39, 48, 60)
            if (status == 'running') {
                context.drawImage(img, framCounter, 0, 48, 60, 0, 39, 48, 60)
            }else {
                context.drawImage(img, framCounter, 0, 48, 60, 0, 0, 48, 60)
            }

            if (framCounter == 336) {
                framCounter = 0
            } else {
                framCounter += 48
            }

            if (boxCounter <= 39 && status == 'running') {
                console.log('crash');
                clearTimeout(boxInterval)
                clearInterval(characterInterval)
                //draw text crash in canvas
                context.fillStyle = 'red'
                context.font = "40px Arial";
                context.fillText("Crash", 250, 50);
            }


            //add 1 for score
            if (boxCounter <= 39 && status == 'jumpping' ) {
                //code
                scoreCounter++
                spanScore.innerText = scoreCounter 
                
                boxSpeed   -= 10
                //console.log(boxSpeed)
                 
                
            }

        }, 200);


    }

    //make all line visible
    context.stroke()

    //declare the status of the image character
    let status = 'running'
    window.onkeypress = function (e) {
        if (e.key == ' ') {
            status = 'jumpping'
            //console.log('jump')
            setTimeout(() => {
                status = 'running'
            }, 600);
        }
    }

} 

