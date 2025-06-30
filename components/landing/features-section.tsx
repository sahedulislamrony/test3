"use client";

import { 
  Database, 
  GitBranch, 
  Users, 
  Zap, 
  Shield, 
  Download,
  Eye,
  Edit3,
  Layers,
  BarChart3,
  Settings,
  Workflow
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export function FeaturesSection() {
  const primaryFeatures = [
    {
      icon: Database,
      title: "Multi-Database Support",
      description: "Connect to PostgreSQL, MySQL, and MongoDB databases with secure, encrypted connections.",
      badge: "Popular"
    },
    {
      icon: Eye,
      title: "Interactive Visualization",
      description: "Create beautiful, interactive schema diagrams with drag-and-drop functionality and zoom controls.",
      badge: "Core"
    },
    {
      icon: Edit3,
      title: "Real-time Editing",
      description: "Make changes to your database structure and see updates instantly across all connected clients.",
      badge: "Live"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share schemas with team members, comment on tables, and work together in real-time.",
      badge: "Team"
    }
  ];

  const secondaryFeatures = [
    {
      icon: Download,
      title: "Export Options",
      description: "Export your schemas as PNG, SVG, or JSON formats for documentation and sharing."
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security with encrypted connections and audit logging."
    },
    {
      icon: Workflow,
      title: "Schema Migration",
      description: "Generate migration scripts and track schema changes over time."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Monitor database performance and usage patterns with built-in analytics."
    },
    {
      icon: Layers,
      title: "Version Control",
      description: "Track schema versions and rollback changes when needed."
    },
    {
      icon: Settings,
      title: "Custom Themes",
      description: "Personalize your workspace with custom themes and layout options."
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
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
              Powerful Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to manage{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                database schemas
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From visualization to collaboration, SchemaFlow provides all the tools you need 
              to design, document, and maintain your database architecture.
            </p>
          </motion.div>
        </div>

        {/* Primary Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {primaryFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 text-xs"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Secondary Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {secondaryFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-card transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20" />
            <CardContent className="relative p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="secondary" className="mb-4">
                    <GitBranch className="w-3 h-3 mr-1" />
                    Advanced Workflow
                  </Badge>
                  <h3 className="text-2xl font-bold mb-4">
                    From Connection to Collaboration
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Connect your database, visualize your schema, collaborate with your team, 
                    and export your work. SchemaFlow streamlines your entire database design workflow.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Secure database connections",
                      "Automatic schema detection",
                      "Real-time team collaboration",
                      "Export and documentation tools"
                    ].map((item, index) => (
                      <div key={item} className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-card rounded-lg border-2 border-dashed border-primary/20 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                        <Workflow className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Workflow Preview</div>
                        <div className="text-xs text-muted-foreground">
                          Interactive demo coming soon
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}