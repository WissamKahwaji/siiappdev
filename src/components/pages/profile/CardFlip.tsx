import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import yellowCard from "../../../assets/yellow_card.png";

const CardFlip = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Variants for the card animation
  const cardVariants = {
    front: {
      rotateY: 0,
    },
    back: {
      rotateY: 180,
    },
  };

  return (
    <div className="perspective">
      <motion.div
        className="card"
        onClick={handleFlip}
        animate={isFlipped ? "back" : "front"}
        variants={cardVariants}
        transition={{ flip: { duration: 0.6 } }}
        style={{ position: "relative" }}
      >
        <AnimatePresence>
          {!isFlipped && (
            <motion.img
              key="front"
              src={yellowCard}
              alt="Yellow Card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute", backfaceVisibility: "hidden" }}
            />
          )}
          {isFlipped && (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: "absolute", backfaceVisibility: "hidden" }}
            >
              {/* Your back of card content here */}
              <p className="text-primary"> Back Content</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CardFlip;
