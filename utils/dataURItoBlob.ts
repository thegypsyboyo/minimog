// /* eslint-disable no-plusplus */
// export default function dataURItoBlob(dataURI: any) {
//     // convert base64/URLEncoded data component to raw binary data held in a string
//     let byteString;
//     if (dataURI.split(",")[0].indexOf("base64") >= 0)
//         byteString = atob(dataURI.split(",")[1]);
//     else byteString = unescape(dataURI.split(",")[1]);

//     // separate out the mime component
//     const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

//     // write the bytes of the string to a typed array
//     const ia = new Uint8Array(byteString.length);
//     for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([ia], { type: mimeString });
// }

/* eslint-disable no-plusplus */
// export default function dataURItoBlob(dataURI: string) {
//     // Convert base64/URLEncoded data component to raw binary data held in a string
//     let byteString;
//     if (dataURI.split(",")[0].indexOf("base64") >= 0)
//         byteString = atob(dataURI.split(",")[1]);
//     else
//         byteString = unescape(dataURI.split(",")[1]);

//     // Separate out the mime component
//     const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

//     // Write the bytes of the string to a typed array
//     const ia = new Uint8Array(byteString.length);
//     for (let i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([ia], { type: mimeString });
// }

export default function dataURItoBlob(dataURI: string) {
    if (!dataURI) {
        throw new Error("Invalid dataURI: null or undefined");
    }

    // Convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(dataURI.split(",")[1]);
    } else {
        byteString = unescape(dataURI.split(",")[1]);
    }

    // Separate out the mime component
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // Write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
}
