export interface TableColumn {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  foreignKey?: {
    table: string;
    column: string;
  };
  defaultValue?: string;
}

export interface DatabaseTable {
  name: string;
  columns: TableColumn[];
  relationships: TableRelationship[];
}

export interface TableRelationship {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

export interface DatabaseSchema {
  tables: DatabaseTable[];
  relationships: TableRelationship[];
}

export class DatabaseParser {
  static parseSQLSchema(sqlCode: string): DatabaseSchema {
    const tables: DatabaseTable[] = [];
    const relationships: TableRelationship[] = [];

    // Remove comments and normalize whitespace
    const cleanSQL = sqlCode
      .replace(/--.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Extract CREATE TABLE statements
    const tableMatches = cleanSQL.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([`"]?\w+[`"]?)\s*\(([\s\S]*?)\);/gi);

    if (tableMatches) {
      tableMatches.forEach(tableMatch => {
        const table = this.parseTable(tableMatch);
        if (table) {
          tables.push(table);
        }
      });
    }

    // Extract relationships from foreign key constraints
    tables.forEach(table => {
      table.columns.forEach(column => {
        if (column.foreignKey) {
          relationships.push({
            fromTable: table.name,
            fromColumn: column.name,
            toTable: column.foreignKey.table,
            toColumn: column.foreignKey.column,
            type: 'many-to-one'
          });
        }
      });
    });

    return { tables, relationships };
  }

  private static parseTable(tableSQL: string): DatabaseTable | null {
    const tableNameMatch = tableSQL.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([`"]?\w+[`"]?)/i);
    if (!tableNameMatch) return null;

    const tableName = tableNameMatch[1].replace(/[`"]/g, '');
    const columnsSection = tableSQL.match(/\(([\s\S]*)\)/)?.[1];
    if (!columnsSection) return null;

    const columns: TableColumn[] = [];
    const columnLines = columnsSection.split(',').map(line => line.trim());

    columnLines.forEach(line => {
      if (line.toLowerCase().includes('constraint') || 
          line.toLowerCase().includes('primary key') ||
          line.toLowerCase().includes('foreign key') ||
          line.toLowerCase().includes('unique') ||
          line.toLowerCase().includes('check')) {
        return; // Skip constraint definitions
      }

      const column = this.parseColumn(line);
      if (column) {
        columns.push(column);
      }
    });

    return {
      name: tableName,
      columns,
      relationships: []
    };
  }

  private static parseColumn(columnSQL: string): TableColumn | null {
    const parts = columnSQL.trim().split(/\s+/);
    if (parts.length < 2) return null;

    const name = parts[0].replace(/[`"]/g, '');
    const type = parts[1].toUpperCase();
    
    let nullable = true;
    let primaryKey = false;
    let foreignKey: { table: string; column: string } | undefined;
    let defaultValue: string | undefined;

    const upperSQL = columnSQL.toUpperCase();
    
    if (upperSQL.includes('NOT NULL')) {
      nullable = false;
    }
    
    if (upperSQL.includes('PRIMARY KEY')) {
      primaryKey = true;
      nullable = false;
    }

    // Check for foreign key references
    const fkMatch = columnSQL.match(/REFERENCES\s+([`"]?\w+[`"]?)\s*\(\s*([`"]?\w+[`"]?)\s*\)/i);
    if (fkMatch) {
      foreignKey = {
        table: fkMatch[1].replace(/[`"]/g, ''),
        column: fkMatch[2].replace(/[`"]/g, '')
      };
    }

    // Check for default values
    const defaultMatch = columnSQL.match(/DEFAULT\s+([^,\s]+)/i);
    if (defaultMatch) {
      defaultValue = defaultMatch[1];
    }

    return {
      name,
      type,
      nullable,
      primaryKey,
      foreignKey,
      defaultValue
    };
  }

  static generateMockData(schema: DatabaseSchema): Record<string, any[]> {
    const mockData: Record<string, any[]> = {};

    schema.tables.forEach(table => {
      const tableData: any[] = [];
      
      // Generate 5-10 mock rows per table
      const rowCount = Math.floor(Math.random() * 6) + 5;
      
      for (let i = 0; i < rowCount; i++) {
        const row: any = {};
        
        table.columns.forEach(column => {
          row[column.name] = this.generateMockValue(column, i + 1);
        });
        
        tableData.push(row);
      }
      
      mockData[table.name] = tableData;
    });

    return mockData;
  }

  private static generateMockValue(column: TableColumn, index: number): any {
    const type = column.type.toLowerCase();
    
    if (column.primaryKey) {
      return index;
    }

    if (column.name.toLowerCase().includes('email')) {
      return `user${index}@example.com`;
    }

    if (column.name.toLowerCase().includes('name')) {
      const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson'];
      return names[index % names.length];
    }

    if (column.name.toLowerCase().includes('phone')) {
      return `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    }

    if (column.name.toLowerCase().includes('date') || type.includes('date') || type.includes('timestamp')) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 365));
      return date.toISOString().split('T')[0];
    }

    if (type.includes('int') || type.includes('number') || type.includes('decimal')) {
      return Math.floor(Math.random() * 1000) + 1;
    }

    if (type.includes('bool')) {
      return Math.random() > 0.5;
    }

    if (type.includes('text') || type.includes('varchar') || type.includes('char')) {
      const words = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
      const wordCount = Math.floor(Math.random() * 5) + 1;
      return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
    }

    return `value_${index}`;
  }
}