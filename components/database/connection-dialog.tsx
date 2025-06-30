"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Code, 
  Link, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  Server,
  FileText
} from 'lucide-react';
import { DatabaseParser, DatabaseSchema } from '@/lib/database-parser';

interface ConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchemaCreated: (schema: DatabaseSchema, connectionInfo: any) => void;
}

export function ConnectionDialog({ open, onOpenChange, onSchemaCreated }: ConnectionDialogProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [connectionType, setConnectionType] = useState<'url' | 'sql'>('url');
  
  // URL Connection form
  const [urlForm, setUrlForm] = useState({
    name: '',
    type: 'postgresql',
    connectionUrl: '',
    host: '',
    port: '',
    database: '',
    username: '',
    password: ''
  });

  // SQL Code form
  const [sqlForm, setSqlForm] = useState({
    name: '',
    sqlCode: ''
  });

  const handleUrlConnection = async () => {
    setIsConnecting(true);
    setError('');

    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo purposes, create a sample schema
      const sampleSchema = createSampleSchema(urlForm.type);
      
      const connectionInfo = {
        id: Date.now().toString(),
        name: urlForm.name || `${urlForm.type} Database`,
        type: urlForm.type,
        host: urlForm.host || 'localhost',
        database: urlForm.database || 'sample_db',
        connectedAt: new Date().toISOString()
      };

      onSchemaCreated(sampleSchema, connectionInfo);
      onOpenChange(false);
      resetForms();
    } catch (err) {
      setError('Failed to connect to database. Please check your credentials.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSqlParsing = async () => {
    setIsConnecting(true);
    setError('');

    try {
      if (!sqlForm.sqlCode.trim()) {
        throw new Error('Please provide SQL code');
      }

      // Parse the SQL code
      const schema = DatabaseParser.parseSQLSchema(sqlForm.sqlCode);
      
      if (schema.tables.length === 0) {
        throw new Error('No tables found in the provided SQL code');
      }

      const connectionInfo = {
        id: Date.now().toString(),
        name: sqlForm.name || 'SQL Schema',
        type: 'sql',
        source: 'manual',
        tablesCount: schema.tables.length,
        createdAt: new Date().toISOString()
      };

      onSchemaCreated(schema, connectionInfo);
      onOpenChange(false);
      resetForms();
    } catch (err: any) {
      setError(err.message || 'Failed to parse SQL code');
    } finally {
      setIsConnecting(false);
    }
  };

  const resetForms = () => {
    setUrlForm({
      name: '',
      type: 'postgresql',
      connectionUrl: '',
      host: '',
      port: '',
      database: '',
      username: '',
      password: ''
    });
    setSqlForm({
      name: '',
      sqlCode: ''
    });
    setError('');
  };

  const loadSampleSQL = () => {
    const sampleSQL = `
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    created_by INTEGER REFERENCES users(id),
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);
    `.trim();

    setSqlForm(prev => ({
      ...prev,
      sqlCode: sampleSQL,
      name: 'E-commerce Sample Schema'
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-primary" />
            <span>Connect to Database</span>
          </DialogTitle>
          <DialogDescription>
            Connect to your database or provide SQL code to visualize your schema
          </DialogDescription>
        </DialogHeader>

        <Tabs value={connectionType} onValueChange={(value) => setConnectionType(value as 'url' | 'sql')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url" className="flex items-center space-x-2">
              <Link className="w-4 h-4" />
              <span>Database Connection</span>
            </TabsTrigger>
            <TabsTrigger value="sql" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>SQL Code</span>
            </TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="url" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="connection-name">Connection Name</Label>
                  <Input
                    id="connection-name"
                    placeholder="My Database"
                    value={urlForm.name}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="db-type">Database Type</Label>
                  <select
                    id="db-type"
                    className="w-full px-3 py-2 border border-input bg-background rounded-md"
                    value={urlForm.type}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="postgresql">PostgreSQL</option>
                    <option value="mysql">MySQL</option>
                    <option value="mongodb">MongoDB</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="connection-url">Connection URL (Optional)</Label>
                  <Input
                    id="connection-url"
                    placeholder="postgresql://user:password@localhost:5432/dbname"
                    value={urlForm.connectionUrl}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, connectionUrl: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Or fill in the individual fields below
                  </p>
                </div>
              </div>

              {/* Connection Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="host">Host</Label>
                    <Input
                      id="host"
                      placeholder="localhost"
                      value={urlForm.host}
                      onChange={(e) => setUrlForm(prev => ({ ...prev, host: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="port">Port</Label>
                    <Input
                      id="port"
                      placeholder="5432"
                      value={urlForm.port}
                      onChange={(e) => setUrlForm(prev => ({ ...prev, port: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="database">Database Name</Label>
                  <Input
                    id="database"
                    placeholder="my_database"
                    value={urlForm.database}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, database: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="username"
                    value={urlForm.username}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    value={urlForm.password}
                    onChange={(e) => setUrlForm(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleUrlConnection} disabled={isConnecting}>
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Server className="w-4 h-4 mr-2" />
                    Connect Database
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sql" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="schema-name">Schema Name</Label>
                <Input
                  id="schema-name"
                  placeholder="My Schema"
                  value={sqlForm.name}
                  onChange={(e) => setSqlForm(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="sql-code">SQL Code</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadSampleSQL}
                    className="text-xs"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    Load Sample
                  </Button>
                </div>
                <Textarea
                  id="sql-code"
                  placeholder="Paste your CREATE TABLE statements here..."
                  className="min-h-[300px] font-mono text-sm"
                  value={sqlForm.sqlCode}
                  onChange={(e) => setSqlForm(prev => ({ ...prev, sqlCode: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Supports CREATE TABLE statements with foreign key relationships
                </p>
              </div>

              {sqlForm.sqlCode && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">SQL Preview</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {sqlForm.sqlCode.split('\n').filter(line => 
                      line.trim().toLowerCase().startsWith('create table')
                    ).length} tables detected
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSqlParsing} disabled={isConnecting || !sqlForm.sqlCode.trim()}>
                {isConnecting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Parsing...
                  </>
                ) : (
                  <>
                    <Code className="w-4 h-4 mr-2" />
                    Parse Schema
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function createSampleSchema(dbType: string): DatabaseSchema {
  const sampleSQL = `
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    author_id INTEGER REFERENCES users(id),
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES posts(id),
    author_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `;

  return DatabaseParser.parseSQLSchema(sampleSQL);
}