/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable block-scoped-var */
/* eslint-disable no-useless-escape */
// eslint-disable-next-line import/prefer-default-export
export const validateEmail = (email: any) => {
    const regextSt =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regextSt.test(email);
};

export const validateCreateProduct = (product: any, images: any) => {
    const { sizes } = product;
    const { details } = product;
    const { questions } = product;
    const checks = [
        {
            msg: "Name, Description, Brand added successfully.",
            type: "success",
        },
    ];
    if (images.length < 3) {
        checks.push({
            msg: `Choose atleast 3 images (${3 - images.length} remaining).`,
            type: "error",
        });
    } else {
        checks.push({
            msg: `${images.length} images choosen.`,
            type: "success",
        });
    }
    if (!product.color.color) {
        checks.push({
            msg: `Choose a main product color.`,
            type: "error",
        });
    } else {
        checks.push({
            msg: `Product color been choosen.`,
            type: "success",
        });
    }
    if (!product.color.image) {
        checks.push({
            msg: `Choose a product style image.`,
            type: "error",
        });
    } else {
        checks.push({
            msg: `Product style image been choosen.`,
            type: "success",
        });
    }
    for (let i = 0; i < sizes.length; i++) {
        if (sizes[i].qty == "" || sizes[i].price == "" || sizes[i].size == "") {
            checks.push({
                msg: `Please fill all informations on sizes.`,
                type: "error",
            });
            break;
        } else {
            checks.push({
                msg: `Atleast one size/qty/price added.`,
                type: "success",
            });
        }
    }
    for (let i = 0; i < details.length; i++) {
        if (details[i].name == "" || details[i].value == "") {
            checks.push({
                msg: `Please fill all informations on details.`,
                type: "error",
            });
            break;
        } else {
            checks.push({
                msg: `Atleast one detail added.`,
                type: "success",
            });
        }
    }
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].question == "" || details[i].answer == "") {
            checks.push({
                msg: `Please fill all informations on questions.`,
                type: "error",
            });
            break;
        } else {
            checks.push({
                msg: `Atleast one question added.`,
                type: "success",
            });
        }
    }
    const s_test = checks.find((c) => c.type == "error");
    if (s_test) {
        return checks;
    }
    return "valid";

};

// export const validateCreateHeader = (images: any) => {
//     const checks = [
//         {
//             msg: "Title and Description added successfully.",
//             type: "success",
//         },
//     ];

//     if (images.length <= 0) {
//         checks.push({
//             msg: `Choose one 1 image (${1 - images.length} remaining).`,
//             type: "error",
//         });
//     } else {
//         checks.push({
//             msg: `${images.length} image choosen.`,
//             type: "success",
//         });
//     };
//     const s_test = checks.find((c) => c.type == "error");
//     if (s_test) {
//         return checks;
//     }
//     return "valid";

// }

export const validateCreateHeader = (images: any, videos: any) => {
    const checks = [
        {
            msg: "Title and Description added successfully.",
            type: "success",
        },
    ];

    if (images.length <= 0 && videos.length <= 0) {
        checks.push({
            msg: "Choose at least 1 image or video.",
            type: "error",
        });
    } else {
        if (images.length < 0) {
            checks.push({
                msg: `${images.length} image(s) chosen.`,
                type: "success",
            });
        }
        if (videos.length < 0) {
            checks.push({
                msg: `${videos.length} video(s) chosen.`,
                type: "success",
            });
        }
    }

    const errorCheck = checks.find((c) => c.type === "error");
    if (errorCheck) {
        return checks;
    }
    return "valid";
};