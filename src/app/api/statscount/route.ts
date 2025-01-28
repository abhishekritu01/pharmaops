import { PrismaClient } from '@prisma/client';

// Create a Prisma Client instance
const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  try {
    const stats = await prisma.sells_record.aggregate({
      _sum: {
        total: true,        // Total Revenue
        discount: true,     // Total Discounts Given
        quantity: true,     // Total Products Sold
      },
      _avg: {
        price: true,        // Average Price per Product
      },
      _max: {
        quantity: true,     // Highest Sale Quantity
        price: true,        // Highest Price
      },
      _min: {
        quantity: true,     // Lowest Sale Quantity
        price: true,        // Lowest Price
      },
      _count: {
        productname: true,  // Total Unique Products Sold
        _all: true,         // Total Transactions
      },
    });

    const paymentStats = await prisma.sells_record.groupBy({
      by: ['paymentStatus'],
      _count: {
        _all: true,
      },
    });

    const paymentTypeStats = await prisma.sells_record.groupBy({
      by: ['paymentType'],
      _count: {
        _all: true,
      },
    });

    const medicineTypeStats = await prisma.sells_record.groupBy({
      by: ['type'],
      _count: {
        _all: true,
      },
    });

    // Format the stats data for the component
    const formattedStats = [
      { name: 'Total Revenue', value: stats._sum.total || 0 },
      { name: 'Total Discounts Given', value: stats._sum.discount || 0 },
      { name: 'Total Products Sold', value: stats._sum.quantity || 0 },
      { name: 'Average Price per Product', value: stats._avg.price || 0 },
      { name: 'Highest Sale Quantity', value: stats._max.quantity || 0 },
      { name: 'Highest Price', value: stats._max.price || 0 },
      { name: 'Lowest Sale Quantity', value: stats._min.quantity || 0 },
      { name: 'Lowest Price', value: stats._min.price || 0 },
      { name: 'Total Unique Products Sold', value: stats._count.productname || 0 },
      { name: 'Total Transactions', value: stats._count._all || 0 },
    ];

    // Add breakdown stats
    paymentStats.forEach((stat) =>
      formattedStats.push({
        name: `Payment Status: ${stat.paymentStatus}`,
        value: stat._count._all,
      })
    );

    paymentTypeStats.forEach((stat) =>
      formattedStats.push({
        name: `Payment Type: ${stat.paymentType}`,
        value: stat._count._all,
      })
    );

    medicineTypeStats.forEach((stat) =>
      formattedStats.push({
        name: `Medicine Type: ${stat.type}`,
        value: stat._count._all,
      })
    );

    return new Response(JSON.stringify(formattedStats), { status: 200 });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch stats' }),
      { status: 500 }
    );
  }
}
