import React from 'react';
import { motion, useTransform, useViewportScroll, Variants } from 'framer-motion';
import useWindowSize from '../../hooks/useWindowSize';
import { Title, GradientText } from './styles';

const containerVariants: Variants = {
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3,
      delay: i,
    },
  }),
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const itemVariants: Variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

const percentOf = (value: number, max: number = 100): number => (value / 100) * max;

const SiteTitle = () => {
  const { scrollY } = useViewportScroll();
  const { height } = useWindowSize();

  const yPosAnim = useTransform(scrollY, [percentOf(15, height), percentOf(75, height)], [0, -1000]);
  const xPosAnim = useTransform(scrollY, [percentOf(20, height), percentOf(65, height)], [0, 1000]);
  const scale = useTransform(scrollY, [percentOf(20, height), percentOf(65, height)], [1, 3]);
  const opacity = useTransform(scrollY, [percentOf(50, height), percentOf(75, height)], [1, 0]);

  return (
    <Title initial="hidden" animate="visible" variants={containerVariants} custom={2}>
      <motion.small variants={itemVariants}>
        <motion.div style={{ x: yPosAnim, scale, opacity }}>Some</motion.div>
      </motion.small>
      <motion.span variants={itemVariants}>
        <GradientText style={{ y: yPosAnim, scale, opacity }}>Podcasts</GradientText>
      </motion.span>
      <motion.small variants={itemVariants}>
        <motion.div style={{ x: xPosAnim, scale, opacity }}>I Listen To</motion.div>
      </motion.small>
    </Title>
  );
};

export default SiteTitle;
