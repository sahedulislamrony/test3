"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Plus, 
  Eye, 
  Users, 
  Activity,
  Calendar,
  Clock,
  Settings,
  BarChart3,
  GitBranch
} from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { QuickActions } from '@/components/dashboard/quick-actions';

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const recentProjects = [
    {
      id: 1,
      name: "E-commerce Database",
      type: "PostgreSQL",
      lastAccessed: "2 hours ago",
      tables: 24,
      status: "active",
      collaborators: 3
    },
    {
      id: 2,
      name: "User Management System",
      type: "MySQL",
      lastAccessed: "1 day ago",
      tables: 12,
      status: "active",
      collaborators: 2
    },
    {
      id: 3,
      name: "Analytics Platform",
      type: "MongoDB",
      lastAccessed: "3 days ago",
      tables: 8,
      status: "inactive",
      collaborators: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Welcome back, John! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Button className="w-fit">
              <Plus className="w-4 h-4 mr-2" />
              New Schema
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>
                      Your recently accessed database schemas
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div 
                      key={project.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Database className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{project.name}</h3>
                            <Badge 
                              variant={project.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{project.type}</span>
                            <span>•</span>
                            <span>{project.tables} tables</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {project.collaborators}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">
                          {project.lastAccessed}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Activity */}
            <RecentActivity />

            {/* Usage Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Usage Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Database Connections</span>
                      <span className="font-medium">3/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Team Members</span>
                      <span className="font-medium">5/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '50%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Storage Used</span>
                      <span className="font-medium">2.1GB/5GB</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pro Trial Banner */}
        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-primary text-primary-foreground">
                    Pro Trial
                  </Badge>
                  <span className="text-sm font-medium">12 days remaining</span>
                </div>
                <h3 className="font-semibold">You're currently on a Pro trial</h3>
                <p className="text-sm text-muted-foreground">
                  Enjoy unlimited database connections, advanced visualizations, and team collaboration features.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
                <Button size="sm">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}