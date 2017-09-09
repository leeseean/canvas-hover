const canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.insertAdjacentElement('afterbegin', canvas);

const context = canvas.getContext('2d');

class Circle {
    constructor(configObj) {
        this.handles = {}; //事件委托对象
        //canvas配置
        this.fillStyle = configObj.fillStyle || 'orange';
        this.strokeStyle = configObj.strokeStyle || 'blue';
        this.coordinate = configObj.coordinate;
        this.radius = configObj.radius;
        this.draw(configObj);
        this.on('hover', (mouseCoordinate) => {
            if (point_in_circle(mouseCoordinate, this.coordinate, this.radius)) {
                this.draw({
                    fillStyle: 'blue',
                    strokeStyle: 'orange',
                    coordinate: [500, 300],
                    radius: 100,
                });
            } else {
                this.draw(configObj);
            }
        });
    }
    draw(obj) {
        context.restore();
        context.fillStyle = obj.fillStyle;
        context.arc(...obj.coordinate, obj.radius, 0, 360);
        context.stroke();
        context.fill();
        context.save();
    }
    emit(eventName, mouseCoordinate) { //鼠标移入移出事件
        if (this.handles[eventName]) {
            for (let i = 0; i < this.handles[eventName].length; i++) {
                this.handles[eventName][i](mouseCoordinate);
            }
        }
    }
    on(eventName, callback) {
        this.handles[eventName] = this.handles[eventName] || [];
        this.handles[eventName].push(callback);
    }
}

let circle = new Circle({
    fillStyle: 'orange',
    strokeStyle: 'blue',
    coordinate: [500, 300],
    radius: 100,
});

//鼠标移入事件
window.addEventListener('mousemove', (event) => {
    let x = event.pageX;
    let y = event.pageY;
    circle.emit('hover', [x, y]);
});