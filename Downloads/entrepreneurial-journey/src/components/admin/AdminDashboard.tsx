'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  TrendingUp,
  Eye,
  Heart,
  Users,
  Calendar,
  LogOut,
  Plus,
  Settings,
  FileText
} from 'lucide-react';
import VentureManager from './VentureManager';
import AnalyticsDashboard from './AnalyticsDashboard';

export default function AdminDashboard() {
  const { logout, ventures } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');

  const totalVentures = ventures.length;
  const totalViews = ventures.reduce((sum, venture) => sum + venture.views, 0);
  const totalReactions = ventures.reduce((sum, venture) =>
    sum + Object.values(venture.reactions).reduce((reactionSum, count) => reactionSum + count, 0), 0
  );

  const avgViewsPerVenture = totalVentures > 0 ? Math.round(totalViews / totalVentures) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-military-green-700">
                Admin Dashboard
              </h1>
              <p className="text-foreground/70 mt-1">
                Manage your entrepreneurial journey content
              </p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="ventures" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Manage Ventures
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Ventures</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-military-green-700">{totalVentures}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Stories published
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
                    <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-earth-clay-600">{totalViews.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Across all ventures
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
                    <CardTitle className="text-sm font-medium">Total Reactions</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gold-ochre-600">{totalReactions.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Emotional engagement
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
                    <CardTitle className="text-sm font-medium">Avg Views</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-military-green-600">{avgViewsPerVenture}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Per venture
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ventures
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 5)
                      .map((venture, index) => {
                        const totalVentureReactions = Object.values(venture.reactions).reduce((sum, count) => sum + count, 0);
                        return (
                          <div key={venture.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-military-green-100 rounded-full flex items-center justify-center text-sm font-medium text-military-green-700">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium">{venture.title}</p>
                                <p className="text-sm text-muted-foreground">{venture.ventureName}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{venture.views} views</p>
                              <p className="text-sm text-muted-foreground">{totalVentureReactions} reactions</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="ventures">
            <VentureManager />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
