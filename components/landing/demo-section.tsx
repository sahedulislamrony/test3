"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Database, 
  GitBranch, 
  Users, 
  Download,
  Eye,
  Edit3,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

export function DemoSection() {
  const [activeDemo, setActiveDemo] = useState('visualization');

  const demos = [
    {
      id: 'visualization',
      title: 'Schema Visualization',
      description: 'See how easy it is to visualize complex database relationships',
      icon: Eye,
      badge: 'Interactive'
    },
    {
      id: 'editing',
      title: 'Real-time Editing',
      description: 'Make changes and see them reflected instantly',
      icon: Edit3,
      badge: 'Live'
    },
    {
      id: 'collaboration',
      title: 'Team Collaboration',
      description: 'Work together with your team in real-time',
      icon: Users,
      badge: 'Team'
    }
  ];

  const features = [
    "Drag & drop interface",
    "Auto-layout algorithms", 
    "Relationship highlighting",
    "Export in multiple formats"
  ];

  return (
    <section id="demo" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              <Play className="w-3 h-3 mr-1" />
              Live Demo
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              See SchemaFlow in{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                action
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of visual database design. Watch how SchemaFlow transforms 
              complex database structures into beautiful, interactive diagrams.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Demo Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">Choose a Demo</h3>
            {demos.map((demo) => (
              <Card 
                key={demo.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  activeDemo === demo.id ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => setActiveDemo(demo.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <demo.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{demo.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {demo.badge}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {demo.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Features List */}
            <div className="pt-6">
              <h4 className="font-medium mb-3">What you'll see:</h4>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={feature} className="flex items-center space-x-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Demo Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative">
                  {/* Demo Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {activeDemo === 'visualization' && (
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                          <Database className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Schema Visualization Demo</h3>
                          <p className="text-muted-foreground text-sm max-w-md">
                            Watch as we connect to a PostgreSQL database and automatically 
                            generate an interactive schema diagram
                          </p>
                        </div>
                        <Button className="mt-4">
                          <Play className="w-4 h-4 mr-2" />
                          Play Demo
                        </Button>
                      </div>
                    )}

                    {activeDemo === 'editing' && (
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                          <Edit3 className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Real-time Editing Demo</h3>
                          <p className="text-muted-foreground text-sm max-w-md">
                            See how changes to your database schema are reflected instantly 
                            in the visual diagram
                          </p>
                        </div>
                        <Button className="mt-4">
                          <Play className="w-4 h-4 mr-2" />
                          Play Demo
                        </Button>
                      </div>
                    )}

                    {activeDemo === 'collaboration' && (
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                          <Users className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Team Collaboration Demo</h3>
                          <p className="text-muted-foreground text-sm max-w-md">
                            Experience real-time collaboration as multiple team members 
                            work on the same schema simultaneously
                          </p>
                        </div>
                        <Button className="mt-4">
                          <Play className="w-4 h-4 mr-2" />
                          Play Demo
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Mock Browser UI */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                      demo.schemaflow.com
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-16 right-6 bg-card border px-3 py-2 rounded-lg text-sm shadow-lg"
                  >
                    🔄 Live Updates
                  </motion.div>
                </div>

                {/* Demo Controls */}
                <div className="p-6 border-t bg-card/50">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                      Interactive demo • No signup required
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm">
                        Try it Free
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Try Now CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="inline-block">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Ready to try SchemaFlow?</h3>
                  <p className="text-muted-foreground text-sm">
                    Start creating beautiful database diagrams in minutes
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button>
                    Get Started Free
                  </Button>
                  <Button variant="outline">
                    Schedule Demo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}