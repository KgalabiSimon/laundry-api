'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Venture } from '@/types/venture';
import { Badge } from '@/components/ui/badge';
import { Eye, Calendar, MapPin } from 'lucide-react';

interface TimelineRoadmapProps {
  ventures: Venture[];
  onVentureClick: (venture: Venture) => void;
}

export default function TimelineRoadmap({ ventures, onVentureClick }: TimelineRoadmapProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredVenture, setHoveredVenture] = useState<string | null>(null);

  const sortedVentures = ventures.sort((a, b) => a.yearLaunched - b.yearLaunched);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-military-green-700 mb-4">
            The Entrepreneurial Roadmap
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Each marker represents a venture, a lesson, and a step forward. Click on any milestone to explore the full story.
          </p>
          <div className="w-32 h-1 bg-gold-ochre-500 mx-auto mt-6"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Main Timeline Path */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-military-green-300 via-earth-clay-400 to-gold-ochre-400 h-full rounded-full shadow-lg"></div>

          {/* African Pattern Overlay on Timeline */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-full opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 0l8 8-8 8-8-8z' fill='%23C19A6B'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat-y'
            }}
          />

          {/* Venture Markers */}
          <div className="space-y-12">
            {sortedVentures.map((venture, index) => {
              const isLeft = index % 2 === 0;
              const totalReactions = Object.values(venture.reactions).reduce((sum, count) => sum + count, 0);

              return (
                <motion.div
                  key={venture.id}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 50 }}
                  animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                  className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Venture Card */}
                  <motion.div
                    className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setHoveredVenture(venture.id)}
                    onHoverEnd={() => setHoveredVenture(null)}
                  >
                    <motion.div
                      onClick={() => onVentureClick(venture)}
                      className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 group"
                      whileHover={{ y: -5 }}
                    >
                      {/* Year Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className="bg-military-green-100 text-military-green-700 border-military-green-300">
                          <Calendar className="w-3 h-3 mr-1" />
                          {venture.yearLaunched}{venture.yearClosed ? ` - ${venture.yearClosed}` : ''}
                        </Badge>

                        <div className="flex items-center text-xs text-muted-foreground">
                          <Eye className="w-3 h-3 mr-1" />
                          {venture.views.toLocaleString()}
                        </div>
                      </div>

                      {/* Venture Title */}
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-military-green-700 transition-colors">
                        {venture.title}
                      </h3>

                      <p className="text-earth-clay-600 font-medium mb-3">
                        {venture.ventureName}
                      </p>

                      {/* Preview Text */}
                      <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-3">
                        {venture.backgroundStory}
                      </p>

                      {/* Reaction Summary */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2 text-sm">
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                            ❤️ {venture.reactions.heart}
                          </span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                            🤔 {venture.reactions.thinking}
                          </span>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {totalReactions} reactions
                        </div>
                      </div>

                      {/* Hover Indicator */}
                      <motion.div
                        className="mt-4 text-xs text-military-green-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredVenture === venture.id ? 1 : 0 }}
                      >
                        Click to explore full story →
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Central Marker */}
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ scale: 0, rotate: 180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.2 }}
                      animate={{
                        scale: hoveredVenture === venture.id ? 1.15 : 1,
                        boxShadow: hoveredVenture === venture.id ? '0 0 20px rgba(75, 83, 32, 0.3)' : '0 0 0px rgba(0, 0, 0, 0)'
                      }}
                    >
                      {/* Marker Circle */}
                      <div className="w-12 h-12 bg-white border-4 border-military-green-600 rounded-full flex items-center justify-center shadow-lg">
                        <motion.div
                          className="w-4 h-4 bg-military-green-600 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        />
                      </div>

                      {/* Marker Label */}
                      <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-military-green-700 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                        {venture.yearLaunched}
                      </div>

                      {/* Animated Connections */}
                      <motion.div
                        className="absolute inset-0 w-12 h-12 border-2 border-gold-ochre-400 rounded-full opacity-0"
                        animate={{
                          scale: [1, 1.5, 2],
                          opacity: [0.5, 0.2, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* End Marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: sortedVentures.length * 0.15 + 0.5 }}
            className="relative mt-16 flex justify-center"
          >
            <div className="bg-gold-ochre-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Journey Continues...
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
