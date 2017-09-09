/**
 * 判断点是否在一个图形(圆除外)内
 * 
 * @param {array} point 坐标[x,y]
 * @param {array} vs 图形每个点的坐标[[1,2],[3,4],...]
 * @returns 
 */
function point_in_polygon(point, vs) {

    var x = point[0],
        y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0],
            yi = vs[i][1];
        var xj = vs[j][0],
            yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

/**
 * 
 * 
 * @param {any} point 
 * @param {any} circleCoordinate 
 * @param {any} circleRadius 
 * @returns 
 */
function point_in_circle(point, circleCoordinate, circleRadius) {
    let inside = false;

    let distance = Math.sqrt(
        Math.pow(point[0] - circleCoordinate[0], 2) + Math.pow(point[1] - circleCoordinate[1], 2)
    );

    if (distance <= circleRadius) {
        inside = true;
    }
    return inside;
}