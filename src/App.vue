<template>
  <mainComponent/>
</template>

<script>
    import MainComponent from "./components/MainComponent";
    import "babylonjs";
    import "babylonjs-gui";
    // import "../assets/libs/CustomLoadingScreen.js";
    // import "../assets/libs/CreateCustomScene.js";

    // import * as GUI from "babylonjs-gui";
    // import * as showFps from "../assets/libs/showFps.js";
    // import * as CustomLoadingScreen from "../assets/libs/CustomLoadingScreen.js";
    // import * as CreateCustomScene from "../assets/libs/CreateCustomScene.js";

    export default {
        name: 'app',
        components: {
            mainComponent: MainComponent
        },
        mounted() {
           /* const showFps = document.createElement("script");
            showFps.setAttribute(
                "src",
                "libs/showFps.js"
            );
            showFps.async = true;
            document.head.appendChild(showFps);*/

            const CustomLoadingScreen = document.createElement("script");
            CustomLoadingScreen.setAttribute(
                "src",
                "libs/CustomLoadingScreen.js"
            );
            CustomLoadingScreen.async = true;
            document.head.appendChild(CustomLoadingScreen);

            const CreateCustomScene = document.createElement("script");
            CreateCustomScene.setAttribute(
                "src",
                "libs/CreateCustomScene.js"
            );
            CreateCustomScene.async = true;
            document.head.appendChild(CreateCustomScene);

            const init = document.createElement("script");
            init.setAttribute(
                "src",
                "libs/init.js"
            );
            // init.async = true;
            document.head.appendChild(init);
        }
    }
</script>

