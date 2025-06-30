"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Database, 
  Users, 
  Activity, 
  TrendingUp,
  Clock,
  GitBranch
} from 'lucide-react';
import { motion } from 'framer-motion';

export function StatsCards() {
  const stats = [
    {
      title: "Total Schemas",
      value: "12",
      change: "+2 from last month",
      icon: Database,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/50"
    },
    {
      title: "Team Members",
      value: "8",
      change: "+3 new this week",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/50"
    },
    {
      title: "Active Connections",
      value: "5",
      change: "2 PostgreSQL, 2 MySQL, 1 MongoDB",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/50"
    },
    {
      title: "Views This Month",
      value: "2,847",
      change: "+12% from last month",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}