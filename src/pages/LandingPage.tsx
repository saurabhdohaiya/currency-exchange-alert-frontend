import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="text-3xl font-bold p-6">Currency Exchange</header>
      <motion.section
        className="flex-1 flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p>Landing page content goes here</p>
      </motion.section>
    </div>
  );
};
export default LandingPage;
