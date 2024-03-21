import { ScaleLoader } from "react-spinners";

const override = {
    display: "flex",
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
};

// Component renders loading spinner
const LoadingSpinner = ({ loading }) => {

    return (

    <div className="loading-spinner">
        <ScaleLoader
        cssOverride={override}
        size={400}
        color={"#2c3e50f1"}
        loading={loading}
        />
    </div>
    );
};

export default LoadingSpinner;