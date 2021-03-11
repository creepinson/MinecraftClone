import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { WEBGL } from "three/examples/jsm/WebGL.js";
import { Game } from "./game";

export class Graphics {
    renderer: THREE.WebGLRenderer;
    _stats: Stats;
    _camera: THREE.PerspectiveCamera;
    _scene: THREE.Scene;
    _threejs: any;

    constructor(game: Game) {}

    initialize() {
        if (!WEBGL.isWebGL2Available()) {
            return false;
        }

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        const target = document.getElementById("target");
        target.appendChild(this.renderer.domElement);

        this._stats = Stats();
        target.appendChild(this._stats.dom);

        window.addEventListener(
            "resize",
            () => {
                this._OnWindowResize();
            },
            false
        );

        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 0.1;
        const far = 10000.0;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

        this._scene = new THREE.Scene();
        this._scene.background = new THREE.Color(0xaaaaaa);

        return true;
    }

    _OnWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    get scene() {
        return this._scene;
    }

    get camera() {
        return this._camera;
    }

    render(timeInSeconds) {
        this.renderer.render(this._scene, this._camera);
        this._stats.update();
    }
}
