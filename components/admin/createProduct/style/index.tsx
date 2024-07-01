/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { showDialog } from "../../../../store/dialogSlice";
import styles from "./styles.module.scss";

export default function Style({ setColorImage, colorImage, ...props }: any) {
  const dispatch = useDispatch();
  const fileInput = useRef<any>(null);
  const [field, meta] = useField(props);

  const handleImage = (e: any) => {
    const img = e.target.files[0];
    if (!img) return;

    if (
      img.type !== "image/jpeg" &&
      img.type !== "image/png" &&
      img.type !== "image/webp"
    ) {
      dispatch(
        showDialog({
          header: "Unsupported Format.",
          msgs: [
            {
              msg: `${img.name} format is unsupported! Only JPEG, PNG, WEBP are allowed.`,
              type: "error",
            },
          ],
        })
      );
    } else if (img.size > 1024 * 1024 * 10) {
      dispatch(
        showDialog({
          header: "Unsupported Format.",
          msgs: [
            {
              msg: `${img.name} size is too large, maximum of 10MB allowed.`,
              type: "error",
            },
          ],
        })
      );
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setColorImage({
            color: colorImage?.color,
            image: e.target.result,
          });
        }
      };
      reader.readAsDataURL(img);
    }
  };

  return (
    <div className={styles.images}>
      <div className={`${styles.header} ${meta.error ? "" : ""}`}>
        <div
          className="rounded-[.475rem] border-dashed border-[#1b84ff] bg-[#e9f3ff] w-full h-auto py-[1.5rem] px-[1.7rem] border flex items-center flex-col cursor-pointer gap-5"
          onClick={() => fileInput?.current.click()}
        >
          <RiUploadCloud2Fill className="text-[56px]" />
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-base text-center font-bold">
              Upload Image <br /> style
            </h1>
            <span className="text-[#99a1b7] text-sm">
              Upload only 1 image file
            </span>
          </div>
        </div>
      </div>
      <input
        type="file"
        name="colorImageInput"
        ref={fileInput}
        hidden
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImage}
      />
    </div>
  );
}
