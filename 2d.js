/* (function() {
    var canvas2d = document.getElementById('canvas2d');
    var container = document.getElementById('wrap');
    sizing();
  
    function sizing() {
      canvas2d.height = container.offsetHeight;
      canvas2d.width = container.offsetWidth;
    }
  
    window.addEventListener('resize', function() {
      (!window.requestAnimationFrame) ? setTimeout(sizing, 300): window.requestAnimationFrame(sizing);
    });
  })();
 */
window.onload=function () {
    Button=document.getElementById('Button');
    Button.style.position="absolute";
    Button.style.left=30+"px";
    Button.style.top=50+"px";
    Button.onclick=function () {
    };
};

/* window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var canvas = document.getElementById('canvas2d');
var ctx = canvas.getContext('2d');

function init() {
    canvas.addEventListener('click', function (e) {
        ctx.rect(20, 20, 200, 200);
        ctx.stroke();
    }, false);
}


loop();
function loop() {
    requestAnimFrame(loop);
    // 描画をクリアー
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (load) {
        ctx.fillStyle = "rgb(100, 0, 0)";
        ctx.fillRect(ctx.canvas.width / 3, ctx.canvas.height / 2, ctx.canvas.width / 3, ctx.canvas.height / 4);
        ctx.fillStyle = "white";
        ctx.fillText("Start", ctx.canvas.width / 3, ctx.canvas.height / 4*3,ctx.canvas.width / 3);
    }
} */