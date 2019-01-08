if (BABYLON.Engine.isSupported()) {
    var canvas = document.querySelector("#renderCanvas");
    var engine = new BABYLON.Engine(canvas, true, { stencil: true }, false);
    engine.disableManifestCheck = true;

    BABYLON.Effect.ShadersStore["fadePixelShader"] =
        "precision highp float;" +
        "varying vec2 vUV;" +
        "uniform sampler2D textureSampler; " +
        "uniform float fadeLevel; " +
        "void main(void){" +
        "vec4 baseColor = texture2D(textureSampler, vUV) * fadeLevel;" +
        "baseColor.a = 1.0;" +
        "gl_FragColor = baseColor;" +
        "}";

    var parameters1 = {
        nameScene: "scene1",
        cameraPosition:  new BABYLON.Vector3(0, 7, 20),
        cameraTarget: new BABYLON.Vector3(0, 5, 0),
        fadeLevel: 1,
        cubeMap: "1",
        exits: [
            {
                nameExitRoom: "scene3",
                positionExitRoom: new BABYLON.Vector3(-5,-13,49),
                rotationExitRoom:  new BABYLON.Vector3(0,0,0),
            }
        ]
    };
    var scene1 = new CreateCustomScene(parameters1);

    var parameters2 = {
        nameScene: "scene2",
        cameraPosition: new BABYLON.Vector3(20, 7, 0),
        cameraTarget: new BABYLON.Vector3(0, 5, 0),
        fadeLevel: 0,
        cubeMap: "2",
        exits: [
            {
                nameExitRoom: "scene3",
                positionExitRoom: new BABYLON.Vector3(49,-11,-4),
                rotationExitRoom:  new BABYLON.Vector3(0,Math.PI / 2,0.07),
            }
        ]
    };
    var scene2 = new CreateCustomScene(parameters2);


    var parameters3 = {
        nameScene: "scene3",
        cameraPosition: new BABYLON.Vector3(-20, 7, 0),
        cameraTarget: new BABYLON.Vector3(0, 5, 0),
        fadeLevel: 0,
        cubeMap: "3",
        exits: [
            {
                nameExitRoom: "scene1",
                positionExitRoom: new BABYLON.Vector3(-49,-11,-20),
                rotationExitRoom:  new BABYLON.Vector3(0,-Math.PI / 2,0.1),
            },
            {
                nameExitRoom: "scene2",
                positionExitRoom: new BABYLON.Vector3(-10,-22,49),
                rotationExitRoom:  new BABYLON.Vector3(0,0,0),
            },
            {
                nameExitRoom: "scene4",
                positionExitRoom: new BABYLON.Vector3(49,-11,-25),
                rotationExitRoom:  new BABYLON.Vector3(0,Math.PI / 2,0.07),
            }
        ]
    };
    var scene3 = new CreateCustomScene(parameters3);

    var parameters4 = {
        nameScene: "scene4",
        cameraPosition: new BABYLON.Vector3(-20, 7, 0),
        cameraTarget: new BABYLON.Vector3(0, 5, 0),
        fadeLevel: 0,
        cubeMap: "4",
        exits: [
            {
                nameExitRoom: "scene3",
                positionExitRoom: new BABYLON.Vector3(-49,-11,0),
                rotationExitRoom:  new BABYLON.Vector3(0,-Math.PI / 2,0),
            },
            {
                nameExitRoom: "scene5",
                positionExitRoom: new BABYLON.Vector3(10,-11,-49),
                rotationExitRoom:  new BABYLON.Vector3(0,0,0),
            }
        ]
    };
    var scene4 = new CreateCustomScene(parameters4);

    var parameters5 = {
        nameScene: "scene5",
        cameraPosition: new BABYLON.Vector3(-20, 7, 0),
        cameraTarget: new BABYLON.Vector3(0, 5, 0),
        fadeLevel: 0,
        cubeMap: "5",
        exits: [
            {
                nameExitRoom: "scene4",
                positionExitRoom: new BABYLON.Vector3(15,-11,-49),
                rotationExitRoom:  new BABYLON.Vector3(0,0,0),
            },
            {
                nameExitRoom: "scene6",
                positionExitRoom: new BABYLON.Vector3(15,-11,49),
                rotationExitRoom:  new BABYLON.Vector3(0,0,0),
            },
        ]
    };
    var scene5 = new CreateCustomScene(parameters5);

    var parameters6 = {
        nameScene: "scene6",
        cameraPosition: new BABYLON.Vector3(-20, 7, 0),
        cameraTarget: new BABYLON.Vector3(0, 5, 0),
        fadeLevel: 0,
        cubeMap: "6",
        exits: [
            {
                nameExitRoom: "scene5",
                positionExitRoom: new BABYLON.Vector3(0,-11,-49),
                rotationExitRoom:  new BABYLON.Vector3(0,0,0),
            },
            {
                nameExitRoom: "scene7",
                positionExitRoom: new BABYLON.Vector3(0,-11,49),
                rotationExitRoom:  new BABYLON.Vector3(0,0,0),
            },

        ]
    };
    var scene6 = new CreateCustomScene(parameters6);

    var parameters7 = {
        nameScene: "scene7",
        cameraPosition: new BABYLON.Vector3(-20, 7, 0),
        cameraTarget: new BABYLON.Vector3(0, 5, 0),
        fadeLevel: 0,
        cubeMap: "7",
        exits: [
            {
                nameExitRoom: "scene6",
                positionExitRoom: new BABYLON.Vector3(0,-11,-49),
                rotationExitRoom:  new BABYLON.Vector3(0,0,0),
            }
        ]
    };
    var scene7 = new CreateCustomScene(parameters7);

    var currentSceneName = scene1.name;
    var currentScene = scene1.getScene();
    currentScene.activeCamera.attachControl(canvas, false);

    console.log(engine.scenes);
    engine.runRenderLoop(function () {
        if (currentSceneName !== currentScene.name) {
            engine.scenes.map(v => {
                if (v.name === currentSceneName) {
                    currentScene = v;
                    currentScene.activeCamera.attachControl(canvas, false);
                    currentScene.isTransitionSceneOn = true;
                }
            })
        }
        currentScene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
}