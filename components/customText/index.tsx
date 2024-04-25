/* eslint-disable import/prefer-default-export */
import { motion } from "framer-motion"

import { textContainer, textVariant2 } from "@/utils/motion";

export const TypingText = ({ title, textStyles }: any) => (
    <motion.p
        variants={textContainer}
        className={`${textStyles}`}
    >
        {Array.from(title).map((letter: any, index: any) => (
            <motion.span
                variants={textVariant2}
                key={index}
            >
                {letter === ' ' ? '\u00A0' : letter}

            </motion.span>
        ))}
    </motion.p>
);



export const TitleText = ({ title, textStyles }: any) => (
    <motion.h2
        variants={textVariant2}
        initial="hidden"
        whileInView="show"
        className={`${textStyles}`}
    >

        {title}

    </motion.h2>
);
