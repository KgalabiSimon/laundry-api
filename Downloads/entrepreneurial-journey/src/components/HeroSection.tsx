'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Heart, Target } from 'lucide-react';

interface HeroSectionProps {
  onExploreJourney: () => void;
  onMentorshipInfo: () => void;
}

export default function HeroSection({ onExploreJourney, onMentorshipInfo }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-gold-ochre-50">
      {/* African Pattern Background */}
      <div className="absolute inset-0 african-pattern opacity-30" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating African Symbols */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 text-gold-ochre-400 opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3"/>
            <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="currentColor"/>
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 w-12 h-12 text-earth-clay-400 opacity-20"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 90,90 10,90" fill="currentColor"/>
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-20 w-20 h-20 text-military-green-400 opacity-15"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50 10 L80 40 L50 70 L20 40 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="50" cy="40" r="15" fill="currentColor"/>
          </svg>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Animated Main Figure */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="relative w-48 h-48 mx-auto mb-8">
            {/* African Trail Figure */}
            <motion.div
              className="absolute inset-0"
              animate={{
                y: [0, -8, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Trail/Path */}
                <path
                  d="M20 180 Q100 150 180 180"
                  fill="none"
                  stroke="#B76E4D"
                  strokeWidth="4"
                  opacity="0.6"
                />

                {/* Baobab Tree Silhouette */}
                <motion.g
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <rect x="85" y="120" width="30" height="60" fill="#4B5320" opacity="0.7"/>
                  <circle cx="100" cy="100" r="35" fill="#4B5320" opacity="0.4"/>
                </motion.g>

                {/* Walking Figure */}
                <motion.g
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Body */}
                  <circle cx="140" cy="140" r="8" fill="#C19A6B"/>
                  <rect x="136" y="148" width="8" height="20" fill="#B76E4D"/>

                  {/* Arms carrying tools */}
                  <line x1="132" y1="150" x2="125" y2="145" stroke="#C19A6B" strokeWidth="3"/>
                  <line x1="148" y1="150" x2="155" y2="145" stroke="#C19A6B" strokeWidth="3"/>

                  {/* Tools/Lessons symbolized */}
                  <circle cx="122" cy="142" r="3" fill="#4B5320" opacity="0.8"/>
                  <circle cx="158" cy="142" r="3" fill="#4B5320" opacity="0.8"/>

                  {/* Legs */}
                  <line x1="136" y1="168" x2="130" y2="180" stroke="#B76E4D" strokeWidth="3"/>
                  <line x1="144" y1="168" x2="150" y2="180" stroke="#B76E4D" strokeWidth="3"/>
                </motion.g>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-military-green-700 mb-4 leading-tight">
            The Road Less
            <span className="block text-earth-clay-600">Travelled</span>
          </h1>
          <div className="w-24 h-1 bg-gold-ochre-500 mx-auto mb-6"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium">
            Since the age of 8, I've built over 8 ventures and learned from each fall.
            This is my roadmap—a living document of scars, lessons, and the courage to keep building in Africa.
          </h2>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            onClick={onExploreJourney}
            size="lg"
            className="bg-military-green-700 hover:bg-military-green-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Target className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Explore My Journey
          </Button>

          <Button
            onClick={onMentorshipInfo}
            variant="outline"
            size="lg"
            className="border-earth-clay-500 text-earth-clay-700 hover:bg-earth-clay-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Why Mentorship Matters
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center text-foreground/60"
        >
          <p className="text-sm mb-2 font-medium">Scroll to explore the journey</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
