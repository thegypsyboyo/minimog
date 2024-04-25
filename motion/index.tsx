/* eslint-disable import/prefer-default-export */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { motion } from 'framer-motion';

interface FaderAnimationProps {
    // direction?: 'up' | 'down' | 'left' | 'right';
    children: React.ReactNode
}

export const FaderAnimation: React.FC<FaderAnimationProps> = ({ children }) => {
    // const initial = {
    //     opacity: 0,
    //     y: direction === 'down' ? -100 : direction === 'up' ? 150 : 0,
    //     x: direction === 'right' ? -500 : direction === 'left' ? 150 : 0
    // };

    // const animate = {
    //     opacity: 1,
    //     y: 0,
    //     x: 0
    // };
    console.log("");

    return (
        <motion.div
            // initial={initial}
            // animate={animate}
            // key={"isndbfdffdg"}
            initial={{ opacity: 0, y: 50 }} // Initial state: invisible and 50px down
            animate={{ opacity: 1, y: 0 }}   // Animated state: visible and at its original position
            transition={{ duration: 0.5 }}   // Transition duration: 0.5 seconds
        // whileInView="visible"
        // transition={{ duration: 0.5 }}
        // viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
}

export const SlideIn = (direction: any, type: any, delay: any, duration: any) => ({
    hidden: {
        x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
        y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
    },
    show: {
        x: 0,
        y: 0,
        transition: {
            type,
            delay,
            duration,
            ease: 'easeOut',
        },
    },
});
