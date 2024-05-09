/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
export const compareArrays = (array1: any, array2: any) => {
    if (array1.length !== array2.length) return false;
    const neww = (object: any) =>
        JSON.stringify(
            Object.keys(object)
                .sort()
                .map((key) => [key, object[key]])
        );
    array1 = new Set(array1.map(neww));
    return array2.every((object: any) => array1.has(neww(object)));
};