/* eslint-disable arrow-body-style */
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

export const removeDuplicates = (array: []) => {
    return [...new Set(array)];
}; // this uses Set to remove duplicates: new set creates a new uniques array. A set is a collection of Unique values.Any duplicates are automatically removed.

export const randomize = (array: []) => {
    return [...array].sort(() => 0.5 - Math.random())
}
// [ ...array] creates a shallow copy of the array to avoid mutating the original array;
// .sort(() => 0.5 - Math.random()) sorts the values with a random coparator function and returns values between -0.5 to 0.5

