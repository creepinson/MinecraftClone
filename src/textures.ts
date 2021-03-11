import * as THREE from "three";
import { Game } from "./game";

// Originally I planned to do texture atlasing, then got lazy.
export class TextureAtlas {
    private _game: Game;
    onLoad: () => void;
    _manager: THREE.LoadingManager;
    _loader: THREE.TextureLoader;
    _textures: Record<
        string,
        {
            colorRange: number;
            uvOffset: number[];
            textures: THREE.Texture[];
            texture?: THREE.Texture;
        }
    >;
    constructor(game: Game) {
        this._game = game;
        this._Create(game);
        this.onLoad = () => {};
    }

    _Create(game) {
        this._manager = new THREE.LoadingManager();
        this._loader = new THREE.TextureLoader(this._manager);
        this._textures = {};

        this._LoadType(
            "grass",
            ["resources/minecraft/textures/blocks/grass_combined.png"],
            new THREE.Vector2(1.0, 1.0),
            [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(1.0, 1.0, 1.0)]
        );

        this._LoadType(
            "desert",
            ["resources/minecraft/textures/blocks/grass_combined.png"],
            new THREE.Vector2(1.0, 1.0),
            [new THREE.Color(0xbfb755), new THREE.Color(0xbfb755)]
        );

        this._LoadType(
            "dirt",
            ["resources/minecraft/textures/blocks/dirt.png"],
            new THREE.Vector2(1.0, 4.0),
            [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(1.0, 1.0, 1.0)]
        );

        this._LoadType(
            "sand",
            ["resources/minecraft/textures/blocks/sand.png"],
            new THREE.Vector2(1.0, 4.0),
            [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(1.0, 1.0, 1.0)]
        );

        this._LoadType(
            "ocean",
            ["resources/minecraft/textures/blocks/sand.png"],
            new THREE.Vector2(1.0, 4.0),
            [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(1.0, 1.0, 1.0)]
        );

        this._LoadType(
            "water",
            ["resources/minecraft/textures/blocks/water_single.png"],
            new THREE.Vector2(1.0, 2.0),
            [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(1.0, 1.0, 1.0)]
        );

        this._LoadType(
            "stone",
            ["resources/minecraft/textures/blocks/stone.png"],
            new THREE.Vector2(1.0, 4.0),
            [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(1.0, 1.0, 1.0)]
        );

        this._LoadType(
            "snow",
            ["resources/minecraft/textures/blocks/snow.png"],
            new THREE.Vector2(1.0, 4.0),
            [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(1.0, 1.0, 1.0)]
        );

        this._LoadType(
            "log_spruce",
            ["resources/minecraft/textures/blocks/log_spruce_combined.png"],
            new THREE.Vector2(1.0, 2.0),
            [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(1.0, 1.0, 1.0)]
        );

        this._LoadType(
            "leaves_spruce",
            ["resources/minecraft/textures/blocks/leaves_spruce_opaque.png"],
            new THREE.Vector2(1.0, 4.0),
            [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(1.0, 1.0, 1.0)]
        );

        // Whatever, don't judge me.
        this._LoadType(
            "cloud",
            ["resources/minecraft/textures/blocks/snow.png"],
            new THREE.Vector2(1.0, 4.0),
            [new THREE.Color(1.0, 1.0, 1.0), new THREE.Color(1.0, 1.0, 1.0)]
        );

        this._manager.onLoad = () => {
            this._OnLoad();
        };

        this._game = game;
    }

    get Info() {
        return this._textures;
    }

    _OnLoad() {
        this.onLoad();
    }

    _LoadType(name, textureNames, offset, colourRange) {
        this._textures[name] = {
            colorRange: colourRange,
            uvOffset: [offset.x, offset.y],
            textures: textureNames.map((n) => this._loader.load(n)),
        };
        if (this._textures[name].textures.length > 1) {
        } else {
            const caps = this._game.graphics._threejs.capabilities;
            const aniso = caps.getMaxAnisotropy();

            this._textures[name].texture = this._textures[name].textures[0];
            this._textures[name].texture.minFilter =
                THREE.LinearMipMapLinearFilter;
            this._textures[name].texture.magFilter = THREE.NearestFilter;
            this._textures[name].texture.wrapS = THREE.RepeatWrapping;
            this._textures[name].texture.wrapT = THREE.RepeatWrapping;
            this._textures[name].texture.anisotropy = aniso;
        }
    }
}
