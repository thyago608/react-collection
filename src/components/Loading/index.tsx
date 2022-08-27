import Lottie from "react-lottie";
import animation from "assets/animation/loading.json";
import styles from "./styles.module.scss";

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

interface LoadingProps {
    isRefetching?: boolean;
}

export function Loading({ isRefetching = false }: LoadingProps) {
    return (
        <div className={isRefetching ? styles.isRefetching : styles.isLoading}>
            <Lottie options={defaultOptions} height={50} width={80} />
        </div>
    );
}