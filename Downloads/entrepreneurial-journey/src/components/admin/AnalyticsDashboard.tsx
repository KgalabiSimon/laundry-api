'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  TrendingUp,
  Eye,
  Heart,
  Calendar,
  Target,
  Award,
  Users
} from 'lucide-react';

export default function AnalyticsDashboard() {
  const { ventures } = useAdmin();

  const analytics = useMemo(() => {
    const totalVentures = ventures.length;
    const totalViews = ventures.reduce((sum, venture) => sum + venture.views, 0);
    const totalReactions = ventures.reduce((sum, venture) =>
      sum + Object.values(venture.reactions).reduce((reactionSum, count) => reactionSum + count, 0), 0
    );

    // Most popular venture by views
    const mostViewedVenture = ventures.reduce((max, venture) =>
      venture.views > max.views ? venture : max, ventures[0] || { views: 0, title: 'N/A' }
    );

    // Most reacted venture
    const mostReactedVenture = ventures.reduce((max, venture) => {
      const ventureReactions = Object.values(venture.reactions).reduce((sum, count) => sum + count, 0);
      const maxReactions = Object.values(max.reactions || {}).reduce((sum, count) => sum + count, 0);
      return ventureReactions > maxReactions ? venture : max;
    }, ventures[0] || { reactions: {}, title: 'N/A' });

    // Reaction breakdown
    const reactionBreakdown = ventures.reduce((acc, venture) => {
      Object.entries(venture.reactions).forEach(([type, count]) => {
        acc[type] = (acc[type] || 0) + count;
      });
      return acc;
    }, {} as Record<string, number>);

    // Ventures by decade
    const venturesByDecade = ventures.reduce((acc, venture) => {
      const decade = Math.floor(venture.yearLaunched / 10) * 10;
      acc[decade] = (acc[decade] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // Average engagement (reactions per view)
    const avgEngagement = totalViews > 0 ? (totalReactions / totalViews * 100) : 0;

    return {
      totalVentures,
      totalViews,
      totalReactions,
      mostViewedVenture,
      mostReactedVenture,
      reactionBreakdown,
      venturesByDecade,
      avgEngagement
    };
  }, [ventures]);

  const reactionEmojis = {
    heart: { emoji: '❤️', label: 'Inspired', color: 'bg-red-100 text-red-700' },
    sad: { emoji: '😢', label: 'Sad', color: 'bg-blue-100 text-blue-700' },
    laugh: { emoji: '😂', label: 'Funny', color: 'bg-yellow-100 text-yellow-700' },
    surprise: { emoji: '😮', label: 'Surprised', color: 'bg-purple-100 text-purple-700' },
    angry: { emoji: '😡', label: 'Frustrated', color: 'bg-orange-100 text-orange-700' },
    thinking: { emoji: '🤔', label: 'Thought-Provoking', color: 'bg-green-100 text-green-700' }
  };

  const topVenturesByViews = [...ventures]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const topVenturesByReactions = [...ventures]
    .sort((a, b) => {
      const aReactions = Object.values(a.reactions).reduce((sum, count) => sum + count, 0);
      const bReactions = Object.values(b.reactions).reduce((sum, count) => sum + count, 0);
      return bReactions - aReactions;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-military-green-700">Analytics Dashboard</h2>
        <p className="text-foreground/70 mt-1">Detailed insights into your content performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-military-green-700">
                {analytics.avgEngagement.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Reactions per view
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Views per Venture</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-earth-clay-600">
                {analytics.totalVentures > 0 ? Math.round(analytics.totalViews / analytics.totalVentures) : 0}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Average performance
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-gold-ochre-600 truncate">
                {analytics.mostViewedVenture.title}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {analytics.mostViewedVenture.views} views
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Journey Span</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-military-green-600">
                {ventures.length > 0 ?
                  Math.max(...ventures.map(v => v.yearLaunched)) - Math.min(...ventures.map(v => v.yearLaunched)) + 1
                  : 0
                } years
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Entrepreneurial journey
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reaction Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Emotional Response Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.reactionBreakdown)
                  .sort(([,a], [,b]) => b - a)
                  .map(([type, count]) => {
                    const percentage = analytics.totalReactions > 0 ? (count / analytics.totalReactions * 100) : 0;
                    const reaction = reactionEmojis[type as keyof typeof reactionEmojis];

                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{reaction?.emoji}</span>
                          <span className="font-medium">{reaction?.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="font-medium">{count}</div>
                            <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
                          </div>
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-military-green-500 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ventures by Decade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Ventures by Decade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.venturesByDecade)
                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                  .map(([decade, count]) => {
                    const percentage = analytics.totalVentures > 0 ? (count / analytics.totalVentures * 100) : 0;

                    return (
                      <div key={decade} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{decade}s</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <div className="font-medium">{count} ventures</div>
                            <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
                          </div>
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-earth-clay-500 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top by Views */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Top Ventures by Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topVenturesByViews.map((venture, index) => (
                  <div key={venture.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium">{venture.title}</p>
                        <p className="text-sm text-muted-foreground">{venture.ventureName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{venture.views.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top by Reactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Top Ventures by Reactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topVenturesByReactions.map((venture, index) => {
                  const totalReactions = Object.values(venture.reactions).reduce((sum, count) => sum + count, 0);
                  return (
                    <div key={venture.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                          {index + 1}
                        </Badge>
                        <div>
                          <p className="font-medium">{venture.title}</p>
                          <p className="text-sm text-muted-foreground">{venture.ventureName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{totalReactions.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">reactions</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
