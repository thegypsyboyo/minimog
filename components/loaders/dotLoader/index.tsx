import DotLoader from "react-spinners/DotLoader";

// import styles from "./styles.module.scss";
export default function DotLoaderSpinner({ loading }: any) {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-white/[0.5] z-10 grid place-items-center">
            <DotLoader loading={loading} color="#2f82ff" />
        </div>
    );
}
