"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { 
  ArrowLeft, 
  Database, 
  Share2, 
  Settings, 
  Download,
  Eye,
  Table as TableIcon
} from 'lucide-react';
import { SchemaVisualizerWrapper } from '@/components/database/schema-visualizer';
import { DataViewer } from '@/components/database/data-viewer';
import { DatabaseSchema } from '@/lib/database-parser';

export default function SchemaPage() {
  const params = useParams();
  const router = useRouter();
  const [schema, setSchema] = useState<DatabaseSchema | null>(null);
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'diagram' | 'data' | 'split'>('split');

  useEffect(() => {
    // Load schema from localStorage or API
    const savedSchemas = localStorage.getItem('database_schemas');
    if (savedSchemas) {
      const schemas = JSON.parse(savedSchemas);
      const currentSchema = schemas.find((s: any) => s.id === params.id);
      if (currentSchema) {
        setSchema(currentSchema.schema);
        setConnectionInfo(currentSchema.connectionInfo);
      }
    }
  }, [params.id]);

  if (!schema || !connectionInfo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Schema Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The requested schema could not be loaded.
            </p>
            <Button onClick={() => router.push('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{connectionInfo.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {schema.tables.length} tables • {schema.relationships.length} relationships
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={viewMode === 'diagram' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('diagram')}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'split' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('split')}
                >
                  <Database className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'data' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('data')}
                >
                  <TableIcon className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-4rem)]">
        {viewMode === 'diagram' && (
          <div className="h-full">
            <SchemaVisualizerWrapper
              schema={schema}
              connectionInfo={connectionInfo}
              onTableSelect={setSelectedTable}
            />
          </div>
        )}

        {viewMode === 'data' && (
          <div className="h-full p-6">
            <DataViewer
              schema={schema}
              selectedTable={selectedTable}
              onTableChange={setSelectedTable}
            />
          </div>
        )}

        {viewMode === 'split' && (
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={60} minSize={30}>
              <SchemaVisualizerWrapper
                schema={schema}
                connectionInfo={connectionInfo}
                onTableSelect={setSelectedTable}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40} minSize={30}>
              <div className="h-full p-6">
                <DataViewer
                  schema={schema}
                  selectedTable={selectedTable}
                  onTableChange={setSelectedTable}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </main>
    </div>
  );
}