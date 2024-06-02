/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
// import { FaStaylinked } from "react-icons/fa";
// import { RiDeleteBin7Fill, RiShape2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
// import { GiExtractionOrb } from "react-icons/gi";
import Image from "next/image";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { showDialog } from "../../../../store/dialogSlice";
import styles from "./styles.module.scss";

export default function Style({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}: any) {
  const dispatch = useDispatch();
  const fileInput = useRef<any>(null);
  const [field, meta] = useField(props);
  const handleImage = (e: any) => {
    const img = e.target.files[0];
    if (
      img.type !== "image/jpeg" &&
      img.type !== "image/png" &&
      img.type !== "image/webp"
    ) {
      dispatch(
        showDialog({
          header: "Unsopported Format.",
          msgs: [
            {
              msg: `${img.name} format is unsupported ! only JPEG,PNG,WEBP are allowed.`,
              type: "error",
            },
          ],
        })
      );

    } else if (img.size > 1024 * 1024 * 10) {
      dispatch(
        showDialog({
          header: "Unsopported Format.",
          msgs: [
            {
              msg: `${img.name} size is too large, maximum of 10mb allowed.`,
              type: "error",
            },
          ],
        })
      );

    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e: any) => {
        const obj = {
          color: product.color.color,
          image: e.target.result,
        };
        setProduct({
          ...product,
          color: obj,
        });
      };
    }
  };

  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${meta.error ? styles.header__error : ""}`}
      >
        <div className="rounded-[.475rem] border-dashed border-[#1b84ff] bg-[#e9f3ff] w-full h-auto py-[1.5rem] px-[1.7rem] border flex items-center flex-col cursor-pointer gap-5" onClick={() => fileInput?.current.click()}>

          <RiUploadCloud2Fill className="text-[56px]" />
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-lg font-medium">Upload Product Image Style</h1>
            <span className="text-[#99a1b7] text-sm">Upload only 1 image files</span>
          </div>
        </div>
        {/* <div className={styles.flex}>
          {meta.error && <Image src="/images/warning.png" width={50} height={50} alt="" />}
          Pick a Product style image
        </div> */}
        <span>
          {meta.touched && meta.error && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="file"
        name="colorImageInput"
        ref={fileInput}
        hidden
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImage}
      />

      {/* <button
        type="reset"
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn__primary}`}
      >
        Pick Style
      </button> */}
    </div>
  );
}
