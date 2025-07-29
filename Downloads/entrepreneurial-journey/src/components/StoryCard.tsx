'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Venture, ReactionType } from '@/types/venture';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Eye,
  ExternalLink,
  Share2,
  X
} from 'lucide-react';
import { useState } from 'react';

interface StoryCardProps {
  venture: Venture | null;
  isOpen: boolean;
  onClose: () => void;
  onReaction: (ventureId: string, reactionType: ReactionType) => void;
}

const reactionEmojis = {
  heart: { emoji: '❤️', label: 'Inspired', color: 'bg-red-100 text-red-700' },
  sad: { emoji: '😢', label: 'Sad', color: 'bg-blue-100 text-blue-700' },
  laugh: { emoji: '😂', label: 'Funny', color: 'bg-yellow-100 text-yellow-700' },
  surprise: { emoji: '😮', label: 'Surprised', color: 'bg-purple-100 text-purple-700' },
  angry: { emoji: '😡', label: 'Frustrated', color: 'bg-orange-100 text-orange-700' },
  thinking: { emoji: '🤔', label: 'Thought-Provoking', color: 'bg-green-100 text-green-700' }
};

export default function StoryCard({ venture, isOpen, onClose, onReaction }: StoryCardProps) {
  const [selectedReaction, setSelectedReaction] = useState<ReactionType | null>(null);
  const [showReactionFeedback, setShowReactionFeedback] = useState(false);

  if (!venture) return null;

  const totalReactions = Object.values(venture.reactions).reduce((sum, count) => sum + count, 0);

  const handleReaction = (reactionType: ReactionType) => {
    setSelectedReaction(reactionType);
    setShowReactionFeedback(true);
    onReaction(venture.id, reactionType);

    // Hide feedback after 2 seconds
    setTimeout(() => setShowReactionFeedback(false), 2000);
  };

  const getReactionPercentage = (count: number) => {
    return totalReactions > 0 ? Math.round((count / totalReactions) * 100) : 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl md:text-3xl font-bold text-military-green-700 mb-2">
                {venture.title}
              </DialogTitle>
              <p className="text-lg text-earth-clay-600 font-medium">
                {venture.ventureName}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Venture Animation Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-military-green-50 to-gold-ochre-50 rounded-xl p-8 text-center"
          >
            <div className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-4xl"
              >
                {venture.yearLaunched <= 2005 ? '🌱' :
                 venture.yearLaunched <= 2010 ? '🔧' :
                 venture.yearLaunched <= 2015 ? '🚀' :
                 venture.yearLaunched <= 2020 ? '💡' : '⚡'}
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Animation: {venture.animation || 'venture-growth'}
            </p>
          </motion.div>

          {/* Venture Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-military-green-600" />
              <span className="text-sm font-medium">
                {venture.yearLaunched}{venture.yearClosed ? ` - ${venture.yearClosed}` : ' - Present'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-military-green-600" />
              <span className="text-sm font-medium">
                {venture.views.toLocaleString()} views
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {totalReactions} reactions
              </span>
            </div>
          </div>

          {/* Story Sections */}
          <div className="space-y-6">
            {/* Background Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-muted/30 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <div className="w-3 h-3 bg-earth-clay-500 rounded-full mr-3"></div>
                The Foundation Story
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                {venture.backgroundStory}
              </p>
            </motion.div>

            {/* Traction Achieved */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-3" />
                Traction & Achievements
              </h3>
              <p className="text-green-700 leading-relaxed">
                {venture.tractionAchieved}
              </p>
            </motion.div>

            {/* Autopsy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 border border-red-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                <AlertCircle className="h-5 w-5 mr-3" />
                The Autopsy: Why It Failed
              </h3>
              <p className="text-red-700 leading-relaxed">
                {venture.autopsy}
              </p>
            </motion.div>

            {/* Lessons Gained */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gold-ochre-50 border border-gold-ochre-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-gold-ochre-800 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-3" />
                Lessons Gained (Scars of Growth)
              </h3>
              <ul className="space-y-2">
                {venture.lessonsGained.map((lesson, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-gold-ochre-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gold-ochre-700 leading-relaxed">{lesson}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Product Link (if available) */}
          {venture.productLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border border-dashed border-military-green-300 rounded-xl p-6 text-center"
            >
              <p className="text-sm text-muted-foreground mb-3">
                This venture's product/service is still available:
              </p>
              <Button
                variant="outline"
                className="border-military-green-500 text-military-green-700 hover:bg-military-green-50"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Product
              </Button>
            </motion.div>
          )}

          {/* Emotional Engagement Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-card border rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              How does this story make you feel?
            </h3>

            {/* Reaction Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              {Object.entries(reactionEmojis).map(([key, { emoji, label, color }]) => {
                const reactionKey = key as ReactionType;
                const count = venture.reactions[reactionKey];
                const percentage = getReactionPercentage(count);

                return (
                  <motion.button
                    key={key}
                    onClick={() => handleReaction(reactionKey)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${color} px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md relative group`}
                  >
                    <span className="mr-2">{emoji}</span>
                    {count}

                    {/* Hover tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {label} ({percentage}%)
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Reaction Feedback */}
            <AnimatePresence>
              {showReactionFeedback && selectedReaction && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-100 border border-green-300 rounded-lg p-3 text-center"
                >
                  <p className="text-green-700 text-sm font-medium">
                    Thanks for sharing how this story made you feel!
                    {reactionEmojis[selectedReaction].emoji}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Aggregate Stats */}
            <div className="text-xs text-muted-foreground">
              <p>
                People felt: {Object.entries(venture.reactions).map(([key, count]) => {
                  const percentage = getReactionPercentage(count);
                  return percentage > 0 ? `${reactionEmojis[key as ReactionType].emoji} ${percentage}%` : null;
                }).filter(Boolean).join(' · ')}
              </p>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share This Story
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
