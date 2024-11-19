import { motion } from "framer-motion";

const GradientRectangle: React.FC = () => {
  return (
    <motion.div
      className="absolute -top-24 w-[444px] h-[444px] bg-custom-radial-bg-dark-blue opacity-75 rounded-custom backdrop-blur-[248px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1.5 }}
    ></motion.div>
  );
};

export default GradientRectangle;
