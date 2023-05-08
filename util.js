    export function isMouseInShape(x,y,circle, canvas) {
        //convert screen mouse coords to canvas coords
        const adjustedX = x - canvas.getBoundingClientRect().left;
        const adjustedY = y - canvas.getBoundingClientRect().top;
        let dist = Math.sqrt((adjustedX-circle.x)**2 + (adjustedY-circle.y)**2);

        //if our mouse is inside circle
        if(dist < circle.radius) {
            return true;
        }
        return false;
    }
    export function snapToNearestTick(currCircle, leftCircle, rightCircle, tickXPositions, ctx) {
        //going to do linear for now, could be optimized with 
        //variation of binary search
        let minDist = 601;
        let tick = undefined;
        for(let i = 0; i < 11; ++i) {
            let dist = Math.abs(currCircle.x-tickXPositions[i]);
            if(dist < minDist) {
                minDist = dist;
                tick = tickXPositions[i];
            }
        }
        currCircle.x = tick;
        removeHighlight(leftCircle,rightCircle, tickXPositions, ctx);

    }

    export function updateCanvas(leftCircle, rightCircle, currCircle, tickXPositions, ctx) {
        ctx.clearRect(0,0,600,600);
        drawCircle(leftCircle, ctx);
        drawCircle(rightCircle, ctx)
        drawTimeLine(ctx, tickXPositions);
        drawLineBetweenCircles(leftCircle, rightCircle, ctx);
        highlightCircle(currCircle, ctx);
    }

    export function removeHighlight(leftCircle, rightCircle, tickXPositions, ctx) {
        ctx.clearRect(0,0,600,600);
        drawCircle(leftCircle, ctx);
        drawCircle(rightCircle, ctx)
        drawTimeLine(ctx, tickXPositions);
        drawLineBetweenCircles(leftCircle, rightCircle, ctx);
    }

    export function drawCircle(currCircle, ctx) {
        ctx.beginPath();
        ctx.arc(currCircle.x, currCircle.y, currCircle.radius, currCircle.startAngle, currCircle.endAngle);
        ctx.stroke();
        ctx.fillStyle = 'black';
        ctx.fill();
    }

    export function drawTimeLine(ctx, tickXPositions) {
        //create line
        ctx.moveTo(0,canvas.height / 2);
        ctx.lineTo(600,canvas.height / 2);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        //create vertical fencing
        for(var i = 0; i < 11; ++i) {
            var xPoint = i * ((canvas.width+15)/11);
            var num = -5+i;
            tickXPositions[i] = (xPoint+20);
            ctx.beginPath();
            ctx.moveTo(xPoint+20, (canvas.height / 2) - 10);
            ctx.lineTo(xPoint+20, (canvas.height / 2) + 10);
            ctx.stroke();

            // Draw label
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.fillText(num, xPoint+15, (canvas.height / 2) - 25);
        }

        //create arrows at ends
        ctx.moveTo(0,canvas.height / 2);
        ctx.lineTo(10, (canvas.height / 2)-30);
        ctx.stroke();

        ctx.moveTo(0,canvas.height / 2);
        ctx.lineTo(10, (canvas.height / 2)+30);
        ctx.stroke();

        ctx.moveTo(600,canvas.height / 2);
        ctx.lineTo(590, (canvas.height / 2)-30);
        ctx.stroke();

        ctx.moveTo(600,canvas.height / 2);
        ctx.lineTo(590, (canvas.height / 2)+30);
        ctx.stroke();
        ctx.closePath();
    }

    export function drawOneCircle(circle) {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, circle.startAngle, circle.endAngle);
        ctx.stroke();
        ctx.fill();
    }

    export function drawLineBetweenCircles(leftCircle, rightCircle, ctx) {
        //draw line between circles
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.moveTo(leftCircle.x,leftCircle.y);
        ctx.lineTo(rightCircle.x-4, rightCircle.y);
        ctx.stroke();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
    }

    export function highlightCircle(currCircle, ctx) {
        //add translucent circle
        ctx.beginPath();
        ctx.arc(currCircle.x,currCircle.y, currCircle.radius+5,0,2*Math.PI);
        ctx.fillStyle = 'rgba(0,0,255,0.5)';
        ctx.fill();
    }