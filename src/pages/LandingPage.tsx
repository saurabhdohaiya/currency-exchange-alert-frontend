import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col flex-1 justify-center items-center bg-white">
      <p className="text-3xl font-bold p-6">Send Money</p>
      <motion.section
        className="flex-1 flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p>Content for text</p>
      </motion.section>
    </div>
  );
};
export default LandingPage;
