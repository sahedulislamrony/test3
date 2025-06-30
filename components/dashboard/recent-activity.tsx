"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Users, 
  GitBranch, 
  Edit3,
  Eye,
  Share2
} from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'schema_updated',
      title: 'Updated E-commerce Schema',
      description: 'Added 3 new tables for order tracking',
      time: '2 hours ago',
      icon: Edit3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/50'
    },
    {
      id: 2,
      type: 'collaboration',
      title: 'Sarah joined the team',
      description: 'New team member added to Analytics project',
      time: '5 hours ago',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950/50'
    },
    {
      id: 3,
      type: 'schema_viewed',
      title: 'Schema shared with client',
      description: 'User Management schema shared via public link',
      time: '1 day ago',
      icon: Share2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950/50'
    },
    {
      id: 4,
      type: 'database_connected',
      title: 'New MongoDB connection',
      description: 'Successfully connected to production database',
      time: '2 days ago',
      icon: Database,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-950/50'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
        <CardDescription>
          Your latest actions and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
                <activity.icon className={`h-3 w-3 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}