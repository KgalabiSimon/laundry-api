'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/contexts/AdminContext';
import { Venture } from '@/types/venture';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Save,
  X,
  Heart,
  TrendingUp
} from 'lucide-react';

interface VentureFormData {
  title: string;
  ventureName: string;
  yearLaunched: number;
  yearClosed?: number;
  backgroundStory: string;
  tractionAchieved: string;
  autopsy: string;
  lessonsGained: string[];
  animation?: string;
  productLink?: string;
  isActive?: boolean;
}

export default function VentureManager() {
  const { ventures, updateVenture, deleteVenture, addVenture } = useAdmin();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<VentureFormData>({
    title: '',
    ventureName: '',
    yearLaunched: new Date().getFullYear(),
    backgroundStory: '',
    tractionAchieved: '',
    autopsy: '',
    lessonsGained: [''],
    animation: '',
    productLink: '',
    isActive: false
  });

  const resetForm = () => {
    setFormData({
      title: '',
      ventureName: '',
      yearLaunched: new Date().getFullYear(),
      backgroundStory: '',
      tractionAchieved: '',
      autopsy: '',
      lessonsGained: [''],
      animation: '',
      productLink: '',
      isActive: false
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
    resetForm();
  };

  const handleEdit = (venture: Venture) => {
    setEditingId(venture.id);
    setFormData({
      title: venture.title,
      ventureName: venture.ventureName,
      yearLaunched: venture.yearLaunched,
      yearClosed: venture.yearClosed,
      backgroundStory: venture.backgroundStory,
      tractionAchieved: venture.tractionAchieved,
      autopsy: venture.autopsy,
      lessonsGained: venture.lessonsGained,
      animation: venture.animation,
      productLink: venture.productLink,
      isActive: venture.isActive
    });
  };

  const handleSave = () => {
    if (isCreating) {
      addVenture(formData);
      setIsCreating(false);
    } else if (editingId) {
      const existingVenture = ventures.find(v => v.id === editingId);
      if (existingVenture) {
        updateVenture({
          ...existingVenture,
          ...formData
        });
      }
      setEditingId(null);
    }
    resetForm();
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteVenture(id);
  };

  const updateLessonsGained = (index: number, value: string) => {
    const newLessons = [...formData.lessonsGained];
    newLessons[index] = value;
    setFormData({ ...formData, lessonsGained: newLessons });
  };

  const addLesson = () => {
    setFormData({
      ...formData,
      lessonsGained: [...formData.lessonsGained, '']
    });
  };

  const removeLesson = (index: number) => {
    const newLessons = formData.lessonsGained.filter((_, i) => i !== index);
    setFormData({ ...formData, lessonsGained: newLessons });
  };

  const sortedVentures = [...ventures].sort((a, b) => b.yearLaunched - a.yearLaunched);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-military-green-700">Venture Management</h2>
          <p className="text-foreground/70 mt-1">Create, edit, and manage your entrepreneurial stories</p>
        </div>
        <Button
          onClick={handleCreate}
          disabled={isCreating || editingId !== null}
          className="bg-military-green-700 hover:bg-military-green-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Venture
        </Button>
      </div>

      {/* Create/Edit Form */}
      <AnimatePresence>
        {(isCreating || editingId) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-military-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {isCreating ? <Plus className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                  {isCreating ? 'Create New Venture' : 'Edit Venture'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="The lesson or key insight"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Venture Name *</label>
                    <Input
                      value={formData.ventureName}
                      onChange={(e) => setFormData({ ...formData, ventureName: e.target.value })}
                      placeholder="Business or product name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Year Launched *</label>
                    <Input
                      type="number"
                      value={formData.yearLaunched}
                      onChange={(e) => setFormData({ ...formData, yearLaunched: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Year Closed</label>
                    <Input
                      type="number"
                      value={formData.yearClosed || ''}
                      onChange={(e) => setFormData({ ...formData, yearClosed: e.target.value ? parseInt(e.target.value) : undefined })}
                      placeholder="Leave empty if still active"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Background Story *</label>
                  <Textarea
                    value={formData.backgroundStory}
                    onChange={(e) => setFormData({ ...formData, backgroundStory: e.target.value })}
                    placeholder="Why and how the venture started"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Traction Achieved *</label>
                  <Textarea
                    value={formData.tractionAchieved}
                    onChange={(e) => setFormData({ ...formData, tractionAchieved: e.target.value })}
                    placeholder="Successes, milestones, or achievements before failure"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Autopsy (Why it Failed) *</label>
                  <Textarea
                    value={formData.autopsy}
                    onChange={(e) => setFormData({ ...formData, autopsy: e.target.value })}
                    placeholder="Why the venture failed - be transparent and reflective"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Lessons Gained *</label>
                  <div className="space-y-2">
                    {formData.lessonsGained.map((lesson, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={lesson}
                          onChange={(e) => updateLessonsGained(index, e.target.value)}
                          placeholder={`Lesson ${index + 1}`}
                        />
                        {formData.lessonsGained.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeLesson(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addLesson}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Lesson
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Animation ID</label>
                    <Input
                      value={formData.animation || ''}
                      onChange={(e) => setFormData({ ...formData, animation: e.target.value })}
                      placeholder="Animation identifier"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Product Link</label>
                    <Input
                      value={formData.productLink || ''}
                      onChange={(e) => setFormData({ ...formData, productLink: e.target.value })}
                      placeholder="Link to product/service if still available"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Venture
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ventures Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Ventures ({ventures.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Venture</TableHead>
                  <TableHead>Years</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Reactions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedVentures.map((venture) => {
                  const totalReactions = Object.values(venture.reactions).reduce((sum, count) => sum + count, 0);

                  return (
                    <TableRow key={venture.id}>
                      <TableCell className="font-medium">
                        {venture.title}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{venture.ventureName}</p>
                          {venture.isActive && (
                            <Badge variant="outline" className="text-green-600 border-green-300">
                              Active
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {venture.yearLaunched}{venture.yearClosed ? ` - ${venture.yearClosed}` : ' - Present'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {venture.views.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {totalReactions}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(venture)}
                            disabled={isCreating || editingId !== null}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-300 hover:bg-red-50"
                                disabled={isCreating || editingId !== null}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Venture</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{venture.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(venture.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
