"use client";

import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Panel,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Download, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Database,
  Table,
  Key,
  Link as LinkIcon,
  Eye,
  Settings
} from 'lucide-react';
import { DatabaseSchema, DatabaseTable } from '@/lib/database-parser';

interface SchemaVisualizerProps {
  schema: DatabaseSchema;
  connectionInfo: any;
  onTableSelect: (tableName: string) => void;
}

interface TableNodeData {
  table: DatabaseTable;
  onSelect: (tableName: string) => void;
}

function TableNode({ data }: { data: TableNodeData }) {
  const { table, onSelect } = data;

  return (
    <Card className="min-w-[250px] shadow-lg border-2 hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center space-x-2">
          <Table className="w-4 h-4 text-primary" />
          <span>{table.name}</span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-6 w-6 p-0"
            onClick={() => onSelect(table.name)}
          >
            <Eye className="w-3 h-3" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {table.columns.slice(0, 8).map((column) => (
            <div
              key={column.name}
              className="flex items-center justify-between text-xs py-1 px-2 rounded bg-muted/30"
            >
              <div className="flex items-center space-x-2">
                {column.primaryKey && (
                  <Key className="w-3 h-3 text-yellow-500" />
                )}
                {column.foreignKey && (
                  <LinkIcon className="w-3 h-3 text-blue-500" />
                )}
                <span className="font-medium">{column.name}</span>
              </div>
              <Badge variant="outline" className="text-xs py-0">
                {column.type}
              </Badge>
            </div>
          ))}
          {table.columns.length > 8 && (
            <div className="text-xs text-muted-foreground text-center py-1">
              +{table.columns.length - 8} more columns
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const nodeTypes = {
  table: TableNode,
};

export function SchemaVisualizer({ schema, connectionInfo, onTableSelect }: SchemaVisualizerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    // Create nodes for each table
    const tableNodes: Node[] = schema.tables.map((table, index) => {
      const x = (index % 3) * 300 + 50;
      const y = Math.floor(index / 3) * 200 + 50;

      return {
        id: table.name,
        type: 'table',
        position: { x, y },
        data: { 
          table,
          onSelect: onTableSelect
        },
      };
    });

    // Create edges for relationships
    const relationshipEdges: Edge[] = schema.relationships.map((rel, index) => ({
      id: `edge-${index}`,
      source: rel.fromTable,
      target: rel.toTable,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#10B981', strokeWidth: 2 },
      label: `${rel.fromColumn} → ${rel.toColumn}`,
      labelStyle: { fontSize: 10, fontWeight: 500 },
      labelBgStyle: { fill: '#ffffff', fillOpacity: 0.8 },
    }));

    setNodes(tableNodes);
    setEdges(relationshipEdges);
  }, [schema, onTableSelect, setNodes, setEdges]);

  const exportSchema = (format: 'png' | 'svg' | 'json') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(schema, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${connectionInfo.name.replace(/\s+/g, '_')}_schema.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    } else {
      // For PNG/SVG export, we would need to implement canvas/svg export
      // This is a placeholder for the actual implementation
      console.log(`Exporting as ${format}...`);
    }
  };

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <MiniMap 
          nodeColor="#10B981"
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        
        <Panel position="top-left">
          <Card className="bg-background/95 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">{connectionInfo.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {schema.tables.length} tables • {schema.relationships.length} relationships
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Panel>

        <Panel position="top-right">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportSchema('json')}
            >
              <Download className="w-4 h-4 mr-2" />
              Export JSON
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportSchema('png')}
            >
              <Download className="w-4 h-4 mr-2" />
              Export PNG
            </Button>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
}

export function SchemaVisualizerWrapper(props: SchemaVisualizerProps) {
  return (
    <ReactFlowProvider>
      <SchemaVisualizer {...props} />
    </ReactFlowProvider>
  );
}