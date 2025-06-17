import React from 'react';
import { motion } from 'framer-motion';

const GroupsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
        <span className="text-gradient">Travel</span> Groups
      </h1>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Connect with fellow travelers, plan group adventures, and share amazing experiences together
      </p>
    </motion.div>
  );
};

export default GroupsHeader;