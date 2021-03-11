import * as THREE from "three";
import { WEBGL } from "three/examples/jsm/WebGL.js";
import { IEntity } from "./components/entity";
import { Graphics } from "./graphics";
import { TextureAtlas } from "./textures";

export class Game {
    private _graphics: Graphics;
    private _previousRAF: number;
    _atlas: TextureAtlas;
    protected _entities: Record<string, IEntity>;

    constructor() {
        this.initialize();
        this._entities = {};
    }

    findEntity<E extends IEntity>(name: string): E {
        return this._entities[name] && this._entities[name] as E;
    }

    get graphics() {
        return this._graphics;
    }

    initialize() {
        this._graphics = new Graphics(this);
        if (!this._graphics.initialize()) {
            this._DisplayError("WebGL2 is not available.");
            return;
        }

        this._previousRAF = null;

        this.onInitialize();
        this._RAF();
    }

    onInitialize() {}

    _DisplayError(errorText) {
        const error = document.getElementById("error");
        error.innerText = errorText;
    }

    _RAF() {
        requestAnimationFrame((t) => {
            if (this._previousRAF === null) this._previousRAF = t;

            this.render(t - this._previousRAF);
            this._previousRAF = t;
        });
    }

    render(timeInMS) {
        const timeInSeconds = timeInMS * 0.001;
        this.onStep(timeInSeconds);
        this._graphics.render(timeInSeconds);

        this._RAF();
    }
    onStep(timeInSeconds: number) {}
}
