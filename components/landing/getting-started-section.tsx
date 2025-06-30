"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Eye, 
  Users, 
  Download,
  ArrowRight,
  CheckCircle,
  Clock,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export function GettingStartedSection() {
  const steps = [
    {
      step: 1,
      icon: Database,
      title: "Connect Your Database",
      description: "Securely connect to PostgreSQL, MySQL, or MongoDB using connection strings or credentials.",
      time: "30 seconds",
      features: ["Encrypted connections", "Multiple database types", "Cloud & local support"]
    },
    {
      step: 2,
      icon: Eye,
      title: "Visualize Your Schema",
      description: "Automatically generate beautiful, interactive diagrams from your existing database structure.",
      time: "1 minute",
      features: ["Auto-layout", "Relationship mapping", "Interactive navigation"]
    },
    {
      step: 3,
      icon: Users,
      title: "Collaborate & Share",
      description: "Invite team members, add comments, and work together on your database design.",
      time: "2 minutes",
      features: ["Real-time collaboration", "Comments & annotations", "Team permissions"]
    },
    {
      step: 4,
      icon: Download,
      title: "Export & Document",
      description: "Export your schemas as images or documentation to share with stakeholders.",
      time: "15 seconds",
      features: ["PNG, SVG, JSON export", "Documentation generation", "Version history"]
    }
  ];

  const quickStart = [
    { text: "Sign up for free account", done: false },
    { text: "Connect your first database", done: false },
    { text: "Generate schema diagram", done: false },
    { text: "Share with your team", done: false }
  ];

  return (
    <section id="getting-started" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Quick Setup
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get started in{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                under 5 minutes
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From database connection to beautiful schema visualization - 
              follow these simple steps to start managing your database schemas.
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Card className="h-full">
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-xl font-semibold">{step.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {step.time}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="space-y-2">
                            {step.features.map((feature) => (
                              <div key={feature} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Visual */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="relative">
                    <Card className="aspect-[4/3] overflow-hidden">
                      <CardContent className="p-0 h-full">
                        <div className="h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                          <div className="text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                              <step.icon className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-sm font-medium">Step {step.step} Preview</div>
                          </div>
                          
                          {/* Floating indicator */}
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {step.time}
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Start Checklist & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Checklist */}
          <Card>
            <CardContent className="p-6 lg:p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Quick Start Checklist</h3>
                  <p className="text-muted-foreground">
                    Follow these steps to get your first schema diagram ready
                  </p>
                </div>
                
                <div className="space-y-4">
                  {quickStart.map((item, index) => (
                    <div key={item.text} className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center">
                        {item.done ? (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        ) : (
                          <span className="text-xs font-medium text-muted-foreground">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <span className={item.done ? "line-through text-muted-foreground" : ""}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-muted-foreground mb-3">
                    Estimated total time: <strong>5 minutes</strong>
                  </div>
                  <Button className="w-full group">
                    Start Now - It's Free
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Card */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
            <CardContent className="relative p-6 lg:p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ready to visualize your database?</h3>
                  <p className="text-muted-foreground">
                    Join thousands of developers who trust SchemaFlow for their 
                    database design and documentation needs.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">5K+</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">50K+</div>
                    <div className="text-xs text-muted-foreground">Schemas Created</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Get Started Free
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Documentation
                  </Button>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  No credit card required • 14-day free trial
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}