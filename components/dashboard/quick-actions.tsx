"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConnectionDialog } from '@/components/database/connection-dialog';
import { 
  Plus, 
  Database, 
  Import, 
  Users,
  FileText,
  Settings
} from 'lucide-react';
import { DatabaseSchema } from '@/lib/database-parser';
import { useRouter } from 'next/navigation';

export function QuickActions() {
  const router = useRouter();
  const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false);

  const handleSchemaCreated = (schema: DatabaseSchema, connectionInfo: any) => {
    // Save to localStorage (in a real app, this would be saved to a database)
    const schemaData = {
      id: connectionInfo.id,
      schema,
      connectionInfo,
      createdAt: new Date().toISOString()
    };

    const existingSchemas = JSON.parse(localStorage.getItem('database_schemas') || '[]');
    existingSchemas.push(schemaData);
    localStorage.setItem('database_schemas', JSON.stringify(existingSchemas));

    // Navigate to the schema view
    router.push(`/schema/${connectionInfo.id}`);
  };

  const actions = [
    {
      title: "New Schema",
      description: "Create a new database schema",
      icon: Plus,
      action: () => setIsConnectionDialogOpen(true)
    },
    {
      title: "Connect Database",
      description: "Add a new database connection",
      icon: Database,
      action: () => setIsConnectionDialogOpen(true)
    },
    {
      title: "Import SQL",
      description: "Import from SQL file",
      icon: Import,
      action: () => setIsConnectionDialogOpen(true)
    },
    {
      title: "Invite Team",
      description: "Add team members to projects",
      icon: Users,
      action: () => console.log('Invite team')
    }
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to get you started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {actions.map((action) => (
              <Button
                key={action.title}
                variant="ghost"
                className="w-full justify-start p-3 h-auto"
                onClick={action.action}
              >
                <action.icon className="h-4 w-4 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-sm font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <ConnectionDialog
        open={isConnectionDialogOpen}
        onOpenChange={setIsConnectionDialogOpen}
        onSchemaCreated={handleSchemaCreated}
      />
    </>
  );
}