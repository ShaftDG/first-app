<template>
    <div id="app">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>
<script>
    import HelloWorld from './HelloWorld.vue'

    export default {
        name: 'mainComponent',
        components: {HelloWorld}
    }
</script>
<style>
    #app {
        position:absolute;
        top:0;
        right:0;
        z-index:5000;
        background: rgba(0, 160, 160, 0.25);
        width:100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #ffffff;
        margin-top: 60px;
    }
</style>