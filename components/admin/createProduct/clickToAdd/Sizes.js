import { useState } from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { sizesList } from "@/components/data/sizes";
import styles from "./styles.module.scss";

export default function Sizes({ sizes, setSizes }) {
  console.log("Sizes from size:", sizes);
  const [noSize, setNoSize] = useState(false);

  const handleSize = (i, e) => {
    const values = [...sizes];
    values[i][e.target.name] = e.target.value;
    setSizes(values);
  };

  const handleRemove = (i) => {
    const values = [...sizes];
    values.splice(i, 1);
    setSizes(values);
  };

  const handleAdd = () => {
    setSizes([
      ...sizes,
      {
        size: "",
        qty: 0,
        price: 0,
      },
    ]);
  };

  const handleToggleSize = () => {
    if (!noSize) {
      const data = sizes.map(item => ({ qty: item.qty, price: item.price }));
      setSizes(data);
    } else {
      const data = sizes.map(item => ({
        size: item.size || "",
        qty: item.qty,
        price: item.price,
      }));
      setSizes(data);
    }
    setNoSize(prev => !prev);
  };

  return (
    <div>
      <button type="reset" className={styles.click_btn} onClick={handleToggleSize}>
        {noSize ? "Click if product has size" : "Click if product has no size"}
      </button>
      {sizes && sizes.length > 0
        ? sizes.map((size, i) => (
          <div className={styles.clicktoadd} key={i}>
            <select
              name="size"
              value={noSize ? "" : size.size}
              disabled={noSize}
              style={{ display: `${noSize ? "none" : ""}` }}
              onChange={(e) => handleSize(i, e)}
            >
              <option value="">Select a size</option>
              {sizesList.map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </select>
            <input
              type="number"
              name="qty"
              placeholder={noSize ? "Product Quantity" : "Size Quantity"}
              min={1}
              value={size.qty}
              onChange={(e) => handleSize(i, e)}
            />
            <input
              type="number"
              name="price"
              placeholder={noSize ? "Product Price" : "Size Price"}
              min={1}
              value={size.price}
              onChange={(e) => handleSize(i, e)}
            />
            {!noSize && (
              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill onClick={handleAdd} />
              </>
            )}
          </div>
        ))
        : (
          !noSize && (
            <div className={styles.clicktoadd}>
              <BsFillPatchPlusFill onClick={handleAdd} />
            </div>
          )
        )}
    </div>
  );
}
