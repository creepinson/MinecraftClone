export const utils = (function () {
    return {
        DictIntersection: function (dictA, dictB) {
            const intersection = {};
            for (let k in dictB) {
                if (k in dictA) {
                    intersection[k] = dictA[k];
                }
            }
            return intersection;
        },

        DictDifference: <R = Record<string, unknown>>(
            dictA: Record<string, unknown>,
            dictB: Record<string, unknown>
        ): R => {
            const diff = { ...dictA };
            for (let k in dictB) {
                delete diff[k];
            }
            return diff as unknown as R;
        },
    };
})();
