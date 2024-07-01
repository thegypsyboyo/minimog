/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
// import { FaStaylinked } from "react-icons/fa";
import { RiDeleteBin7Fill, RiShape2Line, RiUploadCloud2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { GiExtractionOrb } from "react-icons/gi";
import Image from "next/image";
import { FaDropbox } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { showDialog } from "../../../../store/dialogSlice";
import styles from "./styles.module.scss";

export default function Images({
  images,
  setImages,
  setImageColor,
  header,
  text,
  name,
  setColorImage,
  ...props
}: any) {
  const dispatch = useDispatch();
  const fileInput = useRef<any>(null);
  const [field, meta] = useField(props);
  const handleImages = (e: any) => {
    let files = Array.from(e.target.files);
    files.forEach((img: any, i) => {
      if (images.length == 6) {
        dispatch(
          showDialog({
            header: "Maximu 6 images are allowed.",
            msgs: [
              {
                msg: `Maximum of total six images are allowed.`,
                type: "error",
              },
            ],
          })
        );
        return;
      }
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
        files = files.filter((item) => item !== img.name);

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
          setImages((images: any) => [...images, e.target.result]);
        };
      }
    });
  };
  const handleRemove = (image: any) => {
    setImages((images: any) => images.filter((item: any) => item !== image));
  };
  return (
    <>
      {/* <div className={styles.images}>
        <div
        >
          <div className={styles.flex}>
            <span className="text-[27px] font-medium">
              {header}
            </span>
          </div>
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
          name={name}
          ref={fileInput}
          hidden
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImages}
        />
        <div className={styles.images__main}>
          <div
          >
            {!images.length ? (
              <div>
                <div className="rounded-[.475rem] border-dashed border-[#1b84ff] bg-[#e9f3ff] w-full h-auto py-[1.5rem] px-[1.7rem] border flex items-center cursor-pointer gap-5" onClick={() => fileInput?.current.click()}>

                  <RiUploadCloud2Fill className="text-[56px]" />
                  <div className="">
                    <h1 className="text-lg font-medium">Drop files here or click to upload</h1>
                    <span className="text-[#99a1b7] text-sm">Upload upto 10 files</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full gap-2 items-center flex-wrap">
                {images.map((img: any, i: any) => (
                  <div className={"flex relative"} key={i}>
                    <Image
                      width={200}
                      height={200}
                      src={img}
                      alt="image upload"
                      className="w-[200px] object-cover h-[200px] rounded-[5px]"
                    />
                    <div className={"absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"}>
                      <div className="flex items-center justify-center bg-black text-white pb-3.5 gap-4 h-[40px] rounded-[4px] px-4 relative">
                        <button onClick={() => handleRemove(img)}>
                          <RiDeleteBin7Fill />
                        </button>
                        <button onClick={() => setColorImage(img)}>
                          <GiExtractionOrb />
                        </button>
                        <button>
                          <RiShape2Line />
                        </button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div> */}

      <Card
        className="overflow-hidden bg-white mt-0" x-chunk="dashboard-07-chunk-4"
      >
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <CardDescription>
            Add a list of images here, max is 10 images.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {images.length > 0 ? (
              <div className="relative">
                <Image
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover"
                  height="300"
                  src={images[0]}
                  width="300"
                />
                <div className={"absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"}>
                  <div className="flex items-center justify-center bg-black text-white pb-3.5 gap-4 h-[40px] rounded-[4px] px-4 relative">
                    <button onClick={() => handleRemove(images[0])}>
                      <RiDeleteBin7Fill />
                    </button>
                    <button onClick={() => setColorImage(images[0])}>
                      <GiExtractionOrb />
                    </button>
                    <button>
                      <RiShape2Line />
                    </button>

                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="grid grid-cols-2 gap-2">
              {images.slice(1).map((image: any, index: number) => (
                <button key={index} className="relative">
                  <Image
                    alt={`Product image ${index + 1}`}
                    className="aspect-square w-full rounded-md object-cover"
                    height="84"
                    src={image}
                    width="84"
                  />
                  <div className={"absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"}>
                    <div className="flex items-center justify-center bg-black text-white pb-3.5 gap-4 h-[40px] rounded-[4px] px-4 relative">
                      <button onClick={() => handleRemove(image)}>
                        <RiDeleteBin7Fill />
                      </button>
                      <button onClick={() => setColorImage(image)}>
                        <GiExtractionOrb />
                      </button>
                      <button>
                        <RiShape2Line />
                      </button>

                    </div>
                  </div>
                </button>
              ))}

              <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed" onClick={() => fileInput?.current.click()}>
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
                <input
                  type="file"
                  name={name}
                  ref={fileInput}
                  hidden
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImages}
                />
              </button>
            </div>
          </div>
        </CardContent>
      </Card >
    </>
  );
}
