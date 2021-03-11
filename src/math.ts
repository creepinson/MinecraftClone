export const rand_range = (a: number, b: number) => {
    return Math.random() * (b - a) + a;
};
export const rand_normalish = () => {
    const r = Math.random() + Math.random() + Math.random() + Math.random();
    return (r / 4.0) * 2.0 - 1;
};

export const rand_int = (a: number, b: number) => {
    return Math.round(Math.random() * (b - a) + a);
};

export const lerp = (x: number, a: number, b: number) => {
    return x * (b - a) + a;
};

export const clamp = (x: number, a: number, b: number) => {
    return Math.min(Math.max(x, a), b);
};

export const sat = (x: number) => {
    return Math.min(Math.max(x, 0.0), 1.0);
};
