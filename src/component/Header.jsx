// import { Link } from "react-router";
import logo from "../assets/translate.png";
import { motion } from "framer-motion";
import { NavAnimation } from "../utils/animations";
import { useNavigate } from "react-router-dom";


export default function Header(){
    const navigate = useNavigate();

    return(
        <header>
            <nav className="py-5">
                <div className="container flex justify-between items-center font-inter">
                    <motion.div 
                        initial={{opacity: 0, scale: 0}}
                        whileInView={{ opacity: 1, scale: 1}}
                        className="flex items-center gap-2 uppercase text-2xl font-bold"
                    >
                        <img className="logo mr-2" src={logo} alt="" />
                        <p className="">Translator</p>
                    </motion.div>
                    

                    <motion.div
                        variants={NavAnimation(1)}
                        initial="hidden"
                        whileInView={"show"}
                        className="flex items-center gap-4"
                    >
                        <button 
                            onClick={()=>navigate("/translator")}
                            className="home-btn hover:!scale-110 flex items-center gap-2 py-3 font-semibold px-5"
                        >
                            TRANSLATE               
                        </button>
                       
                    </motion.div>

                  
                </div>
            </nav>
        </header>
    )
}