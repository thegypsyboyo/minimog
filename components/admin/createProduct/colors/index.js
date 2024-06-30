/* eslint-disable no-shadow */
import { useField } from "formik";
import { useState } from "react";
import { ColorExtractor } from "react-color-extractor";
import { TbArrowUpRightCircle } from "react-icons/tb";
// import Image from "next/image";
import Image from "next/image";
import styles from "./styles.module.scss";

export default function Colors({
  // product,
  // setProduct,
  name,
  colorImage,
  setColorImage,
  ...props
}) {
  const [toggle, setToggle] = useState(false);
  const [colors, setColors] = useState([]);
  const [field, meta] = useField(props);

  console.log("Color imagess:", colorImage)
  const renderSwatches = () => colors.map((color, id) => (
    <div
      className={styles.square__color}
      key={id}
      style={{ backgroundColor: color }}
      onClick={() => {
        setColorImage({
          color: { color, image: colorImage.image },
        });
      }}
    >
      {color}
    </div>
  ));

  return (
    <div className={"styles.colors w-full bg-green-600"}>
      <div
        className={`w-full ${"styles.header"} ${meta.error[name] ? "text-red-600" : ""
          }`}
      >
        <div className={"flex items-center justify-center gap-1 w-full"}>
          {meta.error[name] && < Image
            src="/images/warning.png"
            alt=""
            width={15}
            height={15}
          />
          }
          <p className="text-lg w-full text-center font-semibold">
            Pick a color
          </p>
        </div>
        {/* <span>
          {meta.touched && meta.error && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span> */}
      </div>
      <input
        type="text"
        value={colorImage?.color}
        name={name}
        hidden
        {...field}
        {...props}
      />
      {/* <div className={styles.colors__infos}></div> */}
      <div className={toggle ? styles.toggle : ""}>
        <ColorExtractor getColors={(colors) => setColors(colors)}>
          <img
            width={50}
            height={50}
            className="w-[60px] h-[60px]" src={colorImage} alt="" style={{ display: "none" }} />
          {/* <span>{colorImage}</span> */}
        </ColorExtractor>
        <div className={styles.wheel}>{renderSwatches()}</div>
      </div>
      {colors.length > 0 && (
        <TbArrowUpRightCircle
          className={styles.toggle__btn}
          onClick={() => setToggle((prev) => !prev)}
          style={{ transform: `${toggle ? "rotate(180deg)" : ""}` }}
        />
      )}
    </div>
  );
}
