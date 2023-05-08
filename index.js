import {snapToNearestTick, updateCanvas, removeHighlight, drawCircle, drawTimeLine, drawLineBetweenCircles, highlightCircle, isMouseInShape} from './util.js';


document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const tickXPositions = []

    //draw circles
    drawTimeLine(ctx, tickXPositions);
    let leftCircle = {x: tickXPositions[5], y: canvas.height/2, radius: 7, startAngle: 0, endAngle: 2*Math.PI};
    let rightCircle = {x: tickXPositions[6], y: canvas.height/2, radius: 7, startAngle: 0, endAngle: 2*Math.PI};
    drawCircle(leftCircle, ctx);
    drawCircle(rightCircle, ctx);
    drawLineBetweenCircles(leftCircle, rightCircle, ctx)


    //mouse events
    let isDragging = false;
    let startX;
    let startY;
    let currCircle;
    let mouseDown = function(event) {
        event.preventDefault();
        startX = parseInt(event.clientX);
        startY = parseInt(event.clientY);

        if(isMouseInShape(startX, startY, leftCircle, canvas)) {
            currCircle = leftCircle
        } else if(isMouseInShape(startX, startY, rightCircle, canvas)) {
            currCircle = rightCircle;
        }  else {
            currCircle = null;
            return;
        }
        isDragging = true;

        highlightCircle(currCircle, ctx);

    }

    let mouseOut = function(event) {
        if(currCircle == undefined || currCircle == null) {
            return;
        }
        event.preventDefault();

        //if mouse leaves canvas snap circle back to nearest tick
        snapToNearestTick(currCircle, leftCircle, rightCircle, tickXPositions, ctx)


        isDragging = false;

    }

    let mouseUp = function(event) {
        if(!isDragging) {
            return;
        }
        event.preventDefault();

        snapToNearestTick(currCircle, leftCircle, rightCircle, tickXPositions, ctx);


        isDragging = false;

    }

    let mouseMove = function(event) {
        if(!isDragging) {
            return;
        } else {
            let mouseX = parseInt(event.clientX);
            let mouseY = parseInt(event.clientY);

            let diffX = mouseX - startX;
            let diffY = mouseY - startY;

            currCircle.x += diffX;

            updateCanvas(leftCircle, rightCircle, currCircle, tickXPositions, ctx);
            startX = mouseX;
            startY = mouseY;
        }
    }

    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;
    canvas.onmouseout = mouseOut;
    canvas.onmousemove = mouseMove;


});
