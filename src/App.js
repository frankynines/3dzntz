import React, { Component } from "react";
import './App.css';

import * as THREE from "three";
import { ColladaLoader} from "three/examples/jsm/loaders/ColladaLoader"
import modelElf from "./Models/elf.dae";
export default class App extends Component {

  componentDidMount() {
    var color = new THREE.Color(0xffffff);
    var scene = new THREE.Scene();
    scene.background = color;
    
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    var clock = new THREE.Clock();
    var elf;

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.mount.appendChild(renderer.domElement);

    var loadingManager = new THREE.LoadingManager(function () {
      scene.add(elf);
    });

    var loader = new ColladaLoader(loadingManager);
    loader.load(modelElf, function (collada) {
      elf = collada.scene;
    });

    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.9);
    scene.add(ambientLight);
    
    var directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(1, 1, 0).normalize();
    scene.add(directionalLight);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
   
    camera.position.z = 15;

    var animate = function () {
      var delta = clock.getDelta();
      if (elf !== undefined) {
        elf.rotation.z += delta * 0.5;
      }
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }


  
  render() {
    return (
      <div className="App">
        <h2>3Dz Nutz</h2>
        
        <div ref={ref => (this.mount = ref)} />
      </div>
    );
  }
}


