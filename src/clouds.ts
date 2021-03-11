import { IEntity } from "./components/entity";
import { Game } from "./game";
import * as math from "./math";
import { Cell, InstancedBlocksManager } from "./voxels";

export class CloudBlock {
    private _game: Game;
    _mgr: InstancedBlocksManager;
    private _cells: Record<string, Cell>;
    constructor(game: Game) {
        this._game = game;
        this._mgr = new InstancedBlocksManager(this._game);
        this._CreateClouds();
    }

    _CreateClouds() {
        this._cells = {};

        for (let i = 0; i < 25; i++) {
            const x = Math.floor(math.rand_range(-1000, 1000));
            const z = Math.floor(math.rand_range(-1000, 1000));

            const num = math.rand_int(2, 5);
            for (let j = 0; j < num; j++) {
                const w = 128;
                const h = 128;
                const xi = Math.floor(math.rand_range(-w * 0.75, w * 0.75));
                const zi = Math.floor(math.rand_range(-h * 0.75, h * 0.75));

                const xPos = x + xi;
                const zPos = z + zi;

                const k = xPos + "." + zPos;
                this._cells[k] = {
                    position: [xPos, 200, zPos],
                    type: "cloud",
                    visible: true,
                };
            }
        }

        this._mgr.RebuildFromCellBlock(this._cells);
    }
}

export class CloudManager implements IEntity {
    private _game: Game;
    private _clouds: CloudBlock;
    constructor(game: Game) {
        this._game = game;
        this.init();
    }

    init() {
        this._clouds = new CloudBlock(this._game);
    }

    update() {
        const cameraPosition = this._game.graphics._camera.position;

        this._clouds._mgr._meshes["cloud"].position.x = cameraPosition.x;
        this._clouds._mgr._meshes["cloud"].position.z = cameraPosition.z;
    }
}
