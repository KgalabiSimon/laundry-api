'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  Target,
  Heart,
  TrendingUp,
  MapPin,
  Mail,
  MessageSquare,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface MentorshipSectionProps {
  isVisible: boolean;
  onClose: () => void;
}

const mentorshipBenefits = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Avoid Common Pitfalls",
    description: "Learn from my 8+ failures to navigate challenges that kill 90% of African startups before they begin."
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "African Market Insights",
    description: "Understand the unique dynamics of building in Africa - from payment systems to customer behavior."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Network Access",
    description: "Connect with other entrepreneurs, potential partners, and investors within my network."
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Emotional Support",
    description: "Navigate the emotional rollercoaster of entrepreneurship with someone who's been there."
  }
];

const successStories = [
  {
    name: "Sarah M.",
    business: "AgriTech Startup",
    outcome: "Avoided payment processing mistakes that cost me $5,000 in my e-commerce venture.",
    impact: "Saved 6 months of trial and error"
  },
  {
    name: "David K.",
    business: "EdTech Platform",
    outcome: "Learned about regulatory requirements early, preventing shutdown like my fintech venture.",
    impact: "Secured proper licensing from day 1"
  },
  {
    name: "Amina R.",
    business: "Digital Marketing Agency",
    outcome: "Understood customer acquisition costs and built sustainable unit economics.",
    impact: "Achieved profitability in month 8"
  }
];

export default function MentorshipSection({ isVisible, onClose }: MentorshipSectionProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-military-green-700 mb-4"
            >
              Why Mentorship Matters in Africa
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-foreground/70 max-w-3xl mx-auto"
            >
              In Africa, 9 out of 10 startups fail not because of bad ideas, but because of avoidable mistakes.
              Let my scars become your shortcuts to success.
            </motion.p>
            <div className="w-24 h-1 bg-gold-ochre-500 mx-auto mt-6"></div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="text-center p-6 bg-military-green-50 rounded-xl">
              <div className="text-3xl font-bold text-military-green-700">8+</div>
              <div className="text-sm text-military-green-600">Failed Ventures</div>
            </div>
            <div className="text-center p-6 bg-earth-clay-50 rounded-xl">
              <div className="text-3xl font-bold text-earth-clay-700">15</div>
              <div className="text-sm text-earth-clay-600">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-gold-ochre-50 rounded-xl">
              <div className="text-3xl font-bold text-gold-ochre-700">$100K+</div>
              <div className="text-sm text-gold-ochre-600">Lessons Learned</div>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-700">25+</div>
              <div className="text-sm text-green-600">Entrepreneurs Helped</div>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">
              What You'll Gain from Mentorship
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentorshipBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-military-green-100 p-3 rounded-lg text-military-green-600">
                          {benefit.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            {benefit.title}
                          </h4>
                          <p className="text-foreground/70 text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Success Stories */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center text-foreground mb-8">
              Real Stories, Real Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h4 className="font-semibold text-foreground">{story.name}</h4>
                        <p className="text-sm text-earth-clay-600">{story.business}</p>
                      </div>
                      <blockquote className="text-sm text-foreground/80 italic mb-4">
                        "{story.outcome}"
                      </blockquote>
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {story.impact}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* My Approach */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-military-green-50 to-gold-ochre-50 rounded-xl p-8 mb-12"
          >
            <h3 className="text-2xl font-bold text-center text-military-green-700 mb-6">
              My Mentorship Approach
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-military-green-600" />
                  Africa-First Perspective
                </h4>
                <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                  Every lesson is contextualized for the African market. From payment infrastructure
                  challenges to customer behavior patterns unique to our continent.
                </p>

                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-earth-clay-600" />
                  Authentic Vulnerability
                </h4>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  I share the raw truth about failure, including the emotional toll.
                  Entrepreneurship is 80% mental game.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-gold-ochre-600" />
                  Action-Oriented Guidance
                </h4>
                <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                  No generic advice. Every conversation focuses on your specific challenges
                  with concrete next steps and accountability.
                </p>

                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-military-green-600" />
                  Community Building
                </h4>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  Connect you with other entrepreneurs in my network. Success in Africa
                  often comes through collaboration, not competition.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Turn My Failures Into Your Success?
            </h3>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Limited mentorship spots available. I work with entrepreneurs who are serious
              about building sustainable businesses in Africa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-military-green-700 hover:bg-military-green-800 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Apply for Mentorship
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-earth-clay-500 text-earth-clay-700 hover:bg-earth-clay-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <MessageSquare className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Schedule a Call
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Free 30-minute discovery call to see if we're a good fit
            </p>
          </motion.div>

          {/* Close Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center mt-12"
          >
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              Close
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
