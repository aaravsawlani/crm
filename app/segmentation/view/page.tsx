"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Search,
  Users,
  Calendar,
  Filter,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Segment {
  id: number;
  name: string;
  description: string | null;
  filters: any[];
  member_count: number;
  created_at: string;
  updated_at: string;
}

const SegmentCard = ({ 
  segment, 
  onDelete,
  isDeleting 
}: { 
  segment: Segment;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${segment.name}"? This action cannot be undone.`)) {
      onDelete(segment.id);
    }
  };

  return (
    <Card className={`h-full ${isDeleting ? 'opacity-50' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold truncate">{segment.name}</CardTitle>
            {segment.description && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {segment.description}
              </p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="flex-shrink-0" disabled={isDeleting}>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem disabled={isDeleting}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem disabled={isDeleting}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span>{segment.member_count.toLocaleString()} members</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{formatDate(segment.created_at)}</span>
          </div>
        </div>

        {segment.filters && segment.filters.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Filters ({segment.filters.length})</p>
            </div>
            <div className="space-y-1.5 max-h-20 overflow-y-auto">
              {segment.filters.slice(0, 3).map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <Badge variant="secondary" className="font-normal text-xs">
                    {filter.property}
                  </Badge>
                  <span>{filter.operator}</span>
                  <Badge variant="outline" className="font-normal text-xs">
                    {Array.isArray(filter.value) 
                      ? `${filter.value.length} items` 
                      : typeof filter.value === 'object' && filter.value?.count 
                        ? `${filter.value.count} in ${filter.value.days} days`
                        : filter.value
                    }
                  </Badge>
                </div>
              ))}
              {segment.filters.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{segment.filters.length - 3} more filters
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function ViewSegmentsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [segments, setSegments] = React.useState<Segment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [deleting, setDeleting] = React.useState<number | null>(null);

  // Fetch segments on component mount
  React.useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/segments");
      const data = await response.json();
      
      if (data.success) {
        setSegments(data.segments);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSegment = async (segmentId: number) => {
    try {
      setDeleting(segmentId);
      
      const response = await fetch(`/api/segments/${segmentId}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove the deleted segment from the state
        setSegments(prevSegments => 
          prevSegments.filter(segment => segment.id !== segmentId)
        );
      } else {
        alert(`Error deleting segment: ${data.error}`);
      }
    } catch (error: any) {
      console.error("Error deleting segment:", error);
      alert(`Error deleting segment: ${error.message}`);
    } finally {
      setDeleting(null);
    }
  };

  const filteredSegments = React.useMemo(() => {
    if (!searchQuery) return segments;
    const query = searchQuery.toLowerCase();
    return segments.filter(
      (segment) =>
        segment.name.toLowerCase().includes(query) ||
        (segment.description && segment.description.toLowerCase().includes(query))
    );
  }, [searchQuery, segments]);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Audience Segments</h1>
        </div>
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-muted-foreground">Loading segments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Audience Segments</h1>
        </div>
        <div className="flex items-center justify-center h-[400px]">
          <p className="text-destructive">Error loading segments: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Audience Segments</h1>
        <div className="flex items-center gap-4">
          <Link href="/segmentation/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Segment
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search segments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        {filteredSegments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {segments.length === 0 ? "No segments created yet" : "No segments match your search"}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              {segments.length === 0 
                ? "Create your first audience segment to start targeting customers based on their behavior, membership status, and preferences."
                : "Try adjusting your search terms to find the segment you're looking for."
              }
            </p>
            {segments.length === 0 && (
              <Link href="/segmentation/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Segment
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSegments.map((segment) => (
              <SegmentCard 
                key={segment.id} 
                segment={segment} 
                onDelete={handleDeleteSegment}
                isDeleting={deleting === segment.id}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
} 