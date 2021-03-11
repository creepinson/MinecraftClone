declare interface Document {
    mozPointerLockElement?: Element;
    webkitPointerLockElement?: Element;
    mozFullscreenElement?: Element;
    mozFullScreenElement?: Element;
    webkitFullscreenElement?: Element;
}

declare interface HTMLElement {
    mozRequestPointerLock?: () => void;
    webkitRequestPointerLock?: () => void;
    mozRequestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
    webkitRequestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
    mozRequestFullScreen?: (options?: FullscreenOptions) => Promise<void>;
}
