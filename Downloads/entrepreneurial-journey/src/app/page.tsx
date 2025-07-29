'use client';

import { useState, useRef } from 'react';
import { Venture, ReactionType } from '@/types/venture';
import { useAdmin } from '@/contexts/AdminContext';
import HeroSection from '@/components/HeroSection';
import TimelineRoadmap from '@/components/TimelineRoadmap';
import StoryCard from '@/components/StoryCard';
import MentorshipSection from '@/components/MentorshipSection';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [selectedVenture, setSelectedVenture] = useState<Venture | null>(null);
  const [showMentorship, setShowMentorship] = useState(false);
  const { ventures, incrementViews, updateVentureReaction } = useAdmin();

  const timelineRef = useRef<HTMLDivElement>(null);

  const handleExploreJourney = () => {
    timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMentorshipInfo = () => {
    setShowMentorship(true);
  };

  const handleVentureClick = (venture: Venture) => {
    incrementViews(venture.id);
    setSelectedVenture(venture);
  };

  const handleReaction = (ventureId: string, reactionType: ReactionType) => {
    updateVentureReaction(ventureId, reactionType);
  };

  const handleCloseStoryCard = () => {
    setSelectedVenture(null);
  };

  const handleCloseMentorship = () => {
    setShowMentorship(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Panel Access Button */}
      <div className="fixed top-4 right-4 z-50">
        <Link href="/admin">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm shadow-lg border-military-green-200 hover:bg-military-green-50"
          >
            <Settings className="w-4 h-4 mr-2" />
            Admin
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <HeroSection
        onExploreJourney={handleExploreJourney}
        onMentorshipInfo={handleMentorshipInfo}
      />

      {/* Timeline Roadmap */}
      <div ref={timelineRef}>
        <TimelineRoadmap
          ventures={ventures}
          onVentureClick={handleVentureClick}
        />
      </div>

      {/* Story Card Modal */}
      <StoryCard
        venture={selectedVenture}
        isOpen={!!selectedVenture}
        onClose={handleCloseStoryCard}
        onReaction={handleReaction}
      />

      {/* Mentorship Section */}
      <MentorshipSection
        isVisible={showMentorship}
        onClose={handleCloseMentorship}
      />
    </div>
  );
}
