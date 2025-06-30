"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Edit, 
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { DatabaseSchema, DatabaseTable } from '@/lib/database-parser';
import { DatabaseParser } from '@/lib/database-parser';

interface DataViewerProps {
  schema: DatabaseSchema;
  selectedTable: string | null;
  onTableChange: (tableName: string | null) => void;
}

export function DataViewer({ schema, selectedTable, onTableChange }: DataViewerProps) {
  const [tableData, setTableData] = useState<Record<string, any[]>>({});
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const currentTable = selectedTable ? schema.tables.find(t => t.name === selectedTable) : null;

  useEffect(() => {
    // Generate mock data for all tables
    const mockData = DatabaseParser.generateMockData(schema);
    setTableData(mockData);
  }, [schema]);

  useEffect(() => {
    if (selectedTable && tableData[selectedTable]) {
      let filtered = tableData[selectedTable];
      
      if (searchTerm) {
        filtered = filtered.filter(row =>
          Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      
      setFilteredData(filtered);
      setCurrentPage(1);
    } else {
      setFilteredData([]);
    }
  }, [selectedTable, tableData, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Regenerate mock data
    const mockData = DatabaseParser.generateMockData(schema);
    setTableData(mockData);
    setIsLoading(false);
  };

  const exportTableData = () => {
    if (!selectedTable || !tableData[selectedTable]) return;

    const data = tableData[selectedTable];
    const csv = [
      currentTable?.columns.map(col => col.name).join(','),
      ...data.map(row => 
        currentTable?.columns.map(col => 
          JSON.stringify(row[col.name] || '')
        ).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTable}_data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!selectedTable) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
              <Database className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Select a Table</h3>
              <p className="text-muted-foreground">
                Choose a table from the schema diagram to view its data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTableChange(null)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-primary" />
                  <span>{selectedTable}</span>
                  <Badge variant="secondary">
                    {filteredData.length} rows
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {currentTable?.columns.length} columns
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshData}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={exportTableData}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Row
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search in table data..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by column" />
              </SelectTrigger>
              <SelectContent>
                {currentTable?.columns.map((column) => (
                  <SelectItem key={column.name} value={column.name}>
                    {column.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-0 h-full">
          <div className="overflow-auto h-full">
            <Table>
              <TableHeader>
                <TableRow>
                  {currentTable?.columns.map((column) => (
                    <TableHead key={column.name} className="whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span>{column.name}</span>
                        {column.primaryKey && (
                          <Badge variant="outline" className="text-xs">PK</Badge>
                        )}
                        {column.foreignKey && (
                          <Badge variant="outline" className="text-xs">FK</Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground font-normal">
                        {column.type}
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((row, index) => (
                  <TableRow key={index}>
                    {currentTable?.columns.map((column) => (
                      <TableCell key={column.name} className="whitespace-nowrap">
                        {formatCellValue(row[column.name], column.type)}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function formatCellValue(value: any, type: string): React.ReactNode {
  if (value === null || value === undefined) {
    return <span className="text-muted-foreground italic">NULL</span>;
  }

  if (typeof value === 'boolean') {
    return (
      <Badge variant={value ? "default" : "secondary"}>
        {value ? 'TRUE' : 'FALSE'}
      </Badge>
    );
  }

  if (type.toLowerCase().includes('date') || type.toLowerCase().includes('timestamp')) {
    return <span className="text-blue-600">{value}</span>;
  }

  if (typeof value === 'number') {
    return <span className="text-green-600 font-mono">{value}</span>;
  }

  const stringValue = String(value);
  if (stringValue.length > 50) {
    return (
      <span title={stringValue}>
        {stringValue.substring(0, 50)}...
      </span>
    );
  }

  return stringValue;
}