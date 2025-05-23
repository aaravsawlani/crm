import { NextRequest, NextResponse } from "next/server";
import { dbSegments } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - Fetch all segments
export async function GET() {
  try {
    const segments = dbSegments.getAll();
    
    // Parse filters back to objects
    const segmentsWithParsedFilters = segments.map(segment => ({
      ...segment,
      filters: JSON.parse(segment.filters)
    }));
    
    return NextResponse.json({
      success: true,
      segments: segmentsWithParsedFilters
    });
  } catch (error: any) {
    console.error("Error fetching segments:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// POST - Create new segment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, filters, excludedAudiences } = body;
    
    if (!name || !name.trim()) {
      return NextResponse.json({
        success: false,
        error: "Segment name is required"
      }, { status: 400 });
    }
    
    if (!filters || !Array.isArray(filters) || filters.length === 0) {
      return NextResponse.json({
        success: false,
        error: "At least one filter is required"
      }, { status: 400 });
    }
    
    // Generate description based on filters
    const description = generateSegmentDescription(filters);
    
    // Create segment in database
    const segment = dbSegments.create({
      name: name.trim(),
      description,
      filters,
      member_count: 0 // Will be calculated later
    });
    
    return NextResponse.json({
      success: true,
      segment: {
        ...segment,
        filters: JSON.parse(segment.filters)
      }
    });
  } catch (error: any) {
    console.error("Error creating segment:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// Helper function to generate description
function generateSegmentDescription(filters: any[]): string {
  if (filters.length === 0) return "No filters applied";
  
  const descriptions = filters.map(filter => {
    let desc = filter.property;
    
    if (filter.operator) {
      desc += ` ${filter.operator}`;
    }
    
    if (filter.value !== undefined && filter.value !== null) {
      if (Array.isArray(filter.value)) {
        desc += ` ${filter.value.length} option(s)`;
      } else if (typeof filter.value === 'object' && filter.value.count && filter.value.days) {
        desc += ` ${filter.value.count} within last ${filter.value.days} days`;
      } else {
        desc += ` ${filter.value}`;
      }
    }
    
    return desc;
  });
  
  return descriptions.join(", ");
} 