import "../style.css";

export default function Animate() {
    return (
        <div className="absolute inset-x-0 top-[50%] transform -translate-y-[50%] flex items-center justify-center">
            <div className="BarOne"></div>
            <div className="BarTwo"></div>
            <div className="BarThree"></div>
            <div className="BarFour"></div>
            <div className="BarFive"></div>
            <div className="BarSix"></div>
        </div>
    );
}
