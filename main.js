load = false;
var count = 0;
timerID = setInterval('countup()', 1000);
function countup() {
    if (ready) count++;
    //console.log(count);
    if (count > 122) window.history.back(-1);
}
var canvas3D = document.getElementById('canvas3d');
var canvas2D = document.getElementById('canvas2d');
var ctx = canvas2D.getContext('2d');

var stats; //FPS表示用
var mesh, camera, scene, renderer, effect;
var helper;

var ready = false;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseX = 0, mouseY = 0;

var clock = new THREE.Clock();

init();
animate();

function init() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "rgb(47,107, 167)";
    ctx.fillRect(ctx.canvas.width / 3, ctx.canvas.height / 2, ctx.canvas.width / 3, ctx.canvas.height / 8);
    ctx.fillStyle = "white";
    ctx.fillText("NowLoading...", ctx.canvas.width / 5 * 2, ctx.canvas.height / 8 * 5);

    stats = initStats();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);


    var ambient = new THREE.AmbientLight(0x666666);
    scene.add(ambient);
    if (modelFile == 'models/Imas1L4V/chihaya_L4V.pmx') {
        var directionalLight = new THREE.DirectionalLight(0x444444);
    }
    else {
        var directionalLight = new THREE.DirectionalLight(0x777777);
    }
    directionalLight.position.set(1, 1, 1).normalize();
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    var spotLight = new THREE.SpotLight(0x000000);
    spotLight.position.set(5, 50, 15);
    spotLight.angle = 0.8;
    spotLight.intensity = 0.7;
    spotLight.penumbra = 0.8;
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.001;
    scene.add(spotLight);




    var texture1 = new THREE.ImageUtils.loadTexture('models/stage2/tex_yuka1.png');
    texture1.wrapS = THREE.RepeatWrapping;
    texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(8, 8);
    var planeGeometry = new THREE.PlaneGeometry(90, 80);
    var planeMaterial = new THREE.MeshLambertMaterial({ map: texture1 });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    if (loadStage) {
        loader = new THREE.JSONLoader();
        loader.load('models/stage2/untitled.json', function (geometry, materials) {
            var faceMaterial = new THREE.MeshFaceMaterial(materials);
            json = new THREE.Mesh(geometry, faceMaterial);
            json.position.set(0, 0, 0);
            json.scale.set(100, 100, 100);
            json.receiveShadow = true;
            scene.add(json);
        });
    }
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    canvas3D.appendChild(renderer.domElement);
    effect = new THREE.OutlineEffect(renderer, {
        defaultThickness: 0,
        defaultColor: new THREE.Color(0x888888),
        defaultAlpha: 0.8,
        defaultKeepAlive: true
    });

    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };
    helper = new THREE.MMDHelper();
    var loader = new THREE.MMDLoader();
    loader.load(modelFile, vmdFiles, function (object) {
        mesh = object;
        mesh.castShadow = true;
        //mesh.receiveShadow = true;
        helper.add(mesh);
        helper.setAnimation(mesh);
        helper.setPhysics(mesh);
        loader.loadVmds(cameraFiles, function (vmd) {
            helper.setCamera(camera);
            loader.pourVmdIntoCamera(camera, vmd);
            helper.setCameraAnimation(camera);
            load = true;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = "rgb(47,107, 167)";
            ctx.fillRect(ctx.canvas.width / 3, ctx.canvas.height / 2, ctx.canvas.width / 3, ctx.canvas.height / 8);
            ctx.fillStyle = "white";
            ctx.fillText("Click to Start.", ctx.canvas.width / 5 * 2, ctx.canvas.height / 8 * 5);
            scene.add(mesh);
        }, onProgress, onError);
    }, onProgress, onError);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

}
function initStats() { //fps表示用
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById("Stats-output").appendChild(stats.domElement);
    return stats;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
}
$(window).on("orientationchange resize", function () {
    onWindowResize();
});

function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}
window.onclick = function (event) {
    if (load) {
        console.log(mouseX, mouseY);
        load = false;
        ready = true;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        $(function () {
            ytPlayer.seekTo(3);
            ytPlayer.unMute();
            ytPlayer.playVideo();
        });
    }
}

function animate() {
    stats.update();
    requestAnimationFrame(animate);
    render();
}
function render() {
    if (ready) {
        helper.animate(clock.getDelta());
    }
    effect.render(scene, camera);
    //renderer.render( scene, camera );　//OutLine Effectを通さない
}
THREEx.FullScreen.bindKey({ dblclick: true });　//ダブルクリックでフルスクリーン解除