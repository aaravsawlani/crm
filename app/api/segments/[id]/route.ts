import { NextRequest, NextResponse } from "next/server";
import { dbSegments } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// DELETE - Delete a specific segment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const segmentId = parseInt(params.id);
    
    if (isNaN(segmentId)) {
      return NextResponse.json({
        success: false,
        error: "Invalid segment ID"
      }, { status: 400 });
    }

    // Check if segment exists
    const existingSegment = dbSegments.getById(segmentId);
    if (!existingSegment) {
      return NextResponse.json({
        success: false,
        error: "Segment not found"
      }, { status: 404 });
    }

    // Delete the segment
    const deleted = dbSegments.delete(segmentId);
    
    if (deleted) {
      return NextResponse.json({
        success: true,
        message: "Segment deleted successfully"
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "Failed to delete segment"
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Error deleting segment:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

// GET - Get a specific segment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const segmentId = parseInt(params.id);
    
    if (isNaN(segmentId)) {
      return NextResponse.json({
        success: false,
        error: "Invalid segment ID"
      }, { status: 400 });
    }

    const segment = dbSegments.getById(segmentId);
    
    if (!segment) {
      return NextResponse.json({
        success: false,
        error: "Segment not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      segment: {
        ...segment,
        filters: JSON.parse(segment.filters)
      }
    });
  } catch (error: any) {
    console.error("Error fetching segment:", error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 