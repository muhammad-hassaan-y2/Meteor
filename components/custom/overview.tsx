import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-[500px] mt-20 mx-4 md:mx-0"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-muted/50 rounded-2xl p-6 flex flex-col gap-6 text-zinc-500 text-sm dark:text-zinc-400 shadow-md">
        {/* Icon and Heading */}
        <div className="flex flex-row justify-center items-center text-zinc-900 dark:text-zinc-50">
          <BrainCircuit className="w-6 h-6 text-indigo-600" />
          <h2 className="text-lg font-bold mx-2">Meteor Linker</h2>
        </div>

        {/* Tagline */}
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Discover the weather, explore destinations, and book flights seamlessly with Meteor Linker. Your ultimate travel assistant.
        </p>

        {/* Suggestions Message */}
        <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 p-4 rounded-md text-center">
          We value your feedback! Feel free to share suggestions to help us improve your experience.
        </div>
      </div>
    </motion.div>
  );
};
