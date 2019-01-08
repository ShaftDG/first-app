function CreateCustomScene(parameters) {
    var loadingScreen = new CustomLoadingScreen();
    engine.loadingScreen = loadingScreen;

    var scene = new BABYLON.Scene(engine);
    scene.name = parameters.nameScene;
    scene.clearColor = new BABYLON.Color4(0.3,0.3,0.4, 0.75);

    var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/" + parameters.cubeMap + "/", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, parameters.cameraPosition, scene);
   // scene.showFps();
    camera.setTarget(parameters.cameraTarget);
    // camera.attachControl(canvas, false);
    camera.inertia = 0.5;
    camera.lowerRadiusLimit = 40;
    camera.upperRadiusLimit = 40;
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = 2.0;
    camera.storeState();
    engine.displayLoadingUI();

    var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(1, -3, -5), scene);
    light.position = new BABYLON.Vector3(10, 30, 50);
    light.setDirectionToTarget(new BABYLON.Vector3(0, 2, 0));
    light.shadowMinZ = 1;
    light.shadowMaxZ = 160;
    light.intensity = 1.25;
    light.shadowEnabled = true;

    var fadeLevel = parameters.fadeLevel;
    var postProcess = new BABYLON.PostProcess("Fade", "fade", ["fadeLevel"], null, 1.0, camera);
    postProcess.onApply = (effect) => {
        effect.setFloat("fadeLevel", fadeLevel);
    };

    scene.executeWhenReady(function () {
        engine.hideLoadingUI();
    });

    scene.isTransitionSceneOff = false;
    scene.isTransitionSceneOn = false;
    for (var i = 0; i < parameters.exits.length; i++) {
        var exitRoom = BABYLON.MeshBuilder.CreatePlane("exitRoom_"+parameters.exits[i].nameExitRoom, {width: 7, height: 4});
        exitRoom.position = parameters.exits[i].positionExitRoom;
        exitRoom.rotation = parameters.exits[i].rotationExitRoom;
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(exitRoom);
        var button = BABYLON.GUI.Button.CreateImageOnlyButton("but_"+parameters.exits[i].nameExitRoom, "textures/arrowUp.png");
        button.width = 1;
        button.height = 1;
        button.thickness = 0;
        advancedTexture.addControl(button);

        var tempSceneName = "";

        button.onPointerUpObservable.add(function (a,b) {
            scene.isTransitionSceneOff = true;
            tempSceneName = b.target.name.split("_")[1];

        });
    }

    scene.registerBeforeRender(function () {
        if (scene.isTransitionSceneOff) {
            if (fadeLevel <= 0) {
                scene.isTransitionSceneOff = false;
                currentSceneName = tempSceneName;
                camera._restoreStateValues();
                camera.detachControl(canvas);
                fadeLevel = 0;
            } else {
                fadeLevel -= 0.1;
            }
        } else if (scene.isTransitionSceneOn) {
            if (fadeLevel >= 1) {
                scene.isTransitionSceneOn = false;
                fadeLevel = 1;
            } else {
                fadeLevel += 0.05;
            }
        }
    });
    
    this.scene = scene;
};

CreateCustomScene.prototype.constructor = CreateCustomScene;

CreateCustomScene.prototype.getScene = function () {
   return this.scene;
};