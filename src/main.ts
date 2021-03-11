import * as THREE from "three";
import * as clouds from "./clouds";
import { IEntity } from "./components/entity";
import * as controls from "./controls";
import * as game from "./game";
import * as graphics from "./graphics";
import * as math from "./math";
import * as textures from "./textures";
import * as voxels from "./voxels";

let _APP = null;

export class ChatlabGame extends game.Game {
    constructor() {
        super();
    }

    onInitialize() {
        this._LoadBackground();

        this._atlas = new textures.TextureAtlas(this);
        this._atlas.onLoad = () => {
            this._entities["_voxels"] = new voxels.SparseVoxelCellManager(this);
            this._entities["_clouds"] = new clouds.CloudManager(this);
            this._entities["_controls"] = new controls.FPSControls({
                cells: this.findEntity("_voxels"),
                scene: this.graphics.scene,
                camera: this.graphics.camera,
            });
        };
    }

    _LoadBackground() {
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            "./resources/posx.jpg",
            "./resources/posx.jpg",
            "./resources/posy.jpg",
            "./resources/negy.jpg",
            "./resources/posx.jpg",
            "./resources/posx.jpg",
        ]);
        this.graphics.scene.background = texture;
    }

    onStep(timeInSeconds) {
        timeInSeconds = Math.min(timeInSeconds, 1 / 10.0);

        this._StepEntities(timeInSeconds);
    }

    _StepEntities(timeInSeconds) {
        for (let k in this._entities) {
            this._entities[k].update(timeInSeconds);
        }
    }
}

const _Main = () => {
    _APP = new ChatlabGame();
};

_Main();
