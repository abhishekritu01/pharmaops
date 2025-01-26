import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handle DELETE requests for deleting a record with a specific ID
export async function DELETE(request: NextRequest) {
  try {
    // Extract the `id` from the URL
    const id = request.nextUrl.pathname.split('/').pop(); // Get the last segment of the URL

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ message: 'Invalid ID provided' }, { status: 400 });
    }

    const recordId = parseInt(id, 10); // Parse ID to integer

    // Delete the record with the specified ID
    await prisma.sells_record.delete({
      where: {
        id: recordId,
      },
    });
    
    
    return NextResponse.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record:', error);
    return NextResponse.json({ message: 'Failed to delete record' }, { status: 500 });
  }
}
