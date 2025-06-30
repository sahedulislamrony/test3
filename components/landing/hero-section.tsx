"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  GitBranch, 
  Users, 
  Zap, 
  ArrowRight, 
  Play,
  CheckCircle,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    "Visual Schema Designer",
    "Real-time Collaboration", 
    "Multi-database Support",
    "Export & Share"
  ];

  const stats = [
    { icon: Database, label: "Databases Connected", value: "10,000+" },
    { icon: Users, label: "Active Users", value: "5,000+" },
    { icon: GitBranch, label: "Schemas Visualized", value: "50,000+" },
    { icon: Star, label: "GitHub Stars", value: "2,400+" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Zap className="w-3 h-3 mr-1" />
                New: MongoDB Support Added
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Visualize & Manage Your{' '}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Database Schemas
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Create beautiful, interactive database schema diagrams. Connect to PostgreSQL, MySQL, and MongoDB. 
                Collaborate with your team in real-time.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto group">
                  Start Building Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto group"
                onClick={() => setIsVideoPlaying(true)}
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-4"
            >
              <p className="text-sm text-muted-foreground mb-4">Trusted by developers worldwide</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 mx-auto mb-2">
                      <stat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="font-bold text-lg">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Visual/Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card border rounded-2xl shadow-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                {!isVideoPlaying ? (
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                      <Database className="w-10 h-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Interactive Schema Designer</h3>
                      <p className="text-sm text-muted-foreground max-w-xs">
                        Drag, drop, and connect tables to create beautiful database diagrams
                      </p>
                    </div>
                    <Button 
                      onClick={() => setIsVideoPlaying(true)}
                      className="mt-4"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Demo
                    </Button>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-black/90">
                    <div className="text-white text-center">
                      <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
                      <p>Loading demo video...</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mock UI Elements */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                  schema-designer.sql
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
            >
              Live Sync ✨
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-card border px-3 py-2 rounded-lg text-sm shadow-lg"
            >
              🚀 PostgreSQL Connected
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}