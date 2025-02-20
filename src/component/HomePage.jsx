import { motion } from "framer-motion";
import { SlideRight } from "../utils/animations";
import Lottie from "lottie-react";
import animation from "../assets/animation.json";
import { IoMdArrowRoundForward } from "react-icons/io";
import { Navigate, useNavigate } from "react-router-dom";


export default function HomePage(){
    const navigate = useNavigate();

    return(
        <section  >
            <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[600px] px-12 mx-7">
                <div className="flex flex-col justify-center py-14 md:py-0">
                    <div className="text-center md:text-left space-y-6">
                        <motion.h1 
                            className="text-5xl lg:text-6xl font-bold leading-relaxed"
                            variants={SlideRight(0.6)}
                            initial="hidden"
                            animate="visible"
                        >
                            Translate Instantly   <span className="">Between</span> English and Kinyarwanda                       </motion.h1>
                        <motion.p
                            variants={SlideRight(1.2)}
                            initial="hidden"
                            animate="visible"
                            className="text-gray-600 text-lg xl:max-w-[500px]"
                        >
                            Speak to translate and see your words transformed into text in real-time.                           
                            Type and translate between English and Kinyarwanda with ease.
                        </motion.p>
                        <motion.div 
                            variants={SlideRight(1.6)}
                            initial="hidden"
                            animate="visible"
                            className="flex justify-center items-center gap-8 md:justify-start !mt-4"
                        >
                            <button 
                                onClick={()=>navigate("/translator")}
                                className="home-btn hover:!scale-110 flex items-center gap-2 py-3 font-semibold px-5"
                            >
                                TRANSLATE  <IoMdArrowRoundForward size={24} />
                            </button>
                        </motion.div>
                    </div>
                </div>

                <div className="flex justify-center items-center">
                    <Lottie animationData={animation} loop={true} className="h-[450px] w-[450px]"/>
                </div>
            </div>
        </section>
    )
}