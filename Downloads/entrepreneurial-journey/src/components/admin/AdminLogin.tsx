'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdmin } from '@/contexts/AdminContext';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(password);
    if (!success) {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-military-green-50 to-gold-ochre-50 flex items-center justify-center p-4">
      {/* African Pattern Background */}
      <div className="absolute inset-0 african-pattern opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-military-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lock className="w-8 h-8 text-military-green-700" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-military-green-700">
              Admin Panel
            </CardTitle>
            <p className="text-foreground/70 mt-2">
              Enter your password to access content management
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-military-green-700 hover:bg-military-green-800 text-white py-6"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Demo Password:</strong> admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
