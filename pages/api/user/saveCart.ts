/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import nc from "next-connect";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);

handler.post(async (req: any, res: any) => {
    try {
        db.connectDb();
        const { cart } = req.body;
        const products = [] as any;
        const user = await User.findById(req.user);
        const existing_cart = await Cart.findOne({ user: user._id });
        if (existing_cart) {
            await existing_cart.remove();
        }
        for (let i = 0; i < cart.length; i++) {
            const dbProduct: any = await Product.findById(cart[i]._id).lean();
            const subProduct: any = dbProduct?.subProducts[cart[i].style];
            const tempProduct: any = {};
            tempProduct.name = dbProduct.name;
            tempProduct.product = dbProduct._id;
            tempProduct.color = {
                color: cart[i].color.color,
                image: cart[i].color.image,
            };
            tempProduct.image = subProduct.images[0].url;
            tempProduct.qty = Number(cart[i].qty);
            tempProduct.size = cart[i].size;
            const price = Number(
                subProduct.sizes.find((p: any) => p.size == cart[i].size).price
            );
            tempProduct.price =
                subProduct.discount > 0
                    ? (price - price / Number(subProduct.discount)).toFixed(2)
                    : price.toFixed(2);

            products.push(tempProduct);
        }
        let cartTotal = 0;

        for (let i = 0; i < products.length; i++) {
            cartTotal += products[i].price * products[i].qty;
        }
        await new Cart({
            products,
            cartTotal: cartTotal.toFixed(2),
            user: user._id,
        }).save();
        db.disconnectDb();
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

export default handler;
