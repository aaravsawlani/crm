import Database from 'better-sqlite3';
import path from 'path';

// Database path
const dbPath = path.join(process.cwd(), 'data', 'segments.db');

// Initialize database
const db = new Database(dbPath);

// Create segments table
db.exec(`
  CREATE TABLE IF NOT EXISTS segments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    filters TEXT NOT NULL,
    member_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface Segment {
  id: number;
  name: string;
  description: string | null;
  filters: string; // JSON string
  member_count: number;
  created_at: string;
  updated_at: string;
}

export interface SegmentInput {
  name: string;
  description?: string;
  filters: any[];
  member_count?: number;
}

// Prepared statements
const insertSegment = db.prepare(`
  INSERT INTO segments (name, description, filters, member_count)
  VALUES (?, ?, ?, ?)
`);

const getAllSegments = db.prepare(`
  SELECT * FROM segments ORDER BY created_at DESC
`);

const getSegmentById = db.prepare(`
  SELECT * FROM segments WHERE id = ?
`);

const updateSegment = db.prepare(`
  UPDATE segments 
  SET name = ?, description = ?, filters = ?, member_count = ?, updated_at = CURRENT_TIMESTAMP
  WHERE id = ?
`);

const deleteSegment = db.prepare(`
  DELETE FROM segments WHERE id = ?
`);

// Database functions
export const dbSegments = {
  create: (segment: SegmentInput): Segment => {
    const result = insertSegment.run(
      segment.name,
      segment.description || null,
      JSON.stringify(segment.filters),
      segment.member_count || 0
    );
    return getSegmentById.get(result.lastInsertRowid) as Segment;
  },

  getAll: (): Segment[] => {
    return getAllSegments.all() as Segment[];
  },

  getById: (id: number): Segment | undefined => {
    return getSegmentById.get(id) as Segment | undefined;
  },

  update: (id: number, segment: SegmentInput): Segment | undefined => {
    updateSegment.run(
      segment.name,
      segment.description || null,
      JSON.stringify(segment.filters),
      segment.member_count || 0,
      id
    );
    return getSegmentById.get(id) as Segment | undefined;
  },

  delete: (id: number): boolean => {
    const result = deleteSegment.run(id);
    return result.changes > 0;
  }
};

export default db; 