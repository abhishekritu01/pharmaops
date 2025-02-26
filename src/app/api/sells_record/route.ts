

import { PrismaClient, PaymentStatus, medicineType,PaymentType } from '@prisma/client';

// Create a Prisma Client instance
const prisma = new PrismaClient();

// Define the expected structure of the request body
interface SellsRecordRequestBody {
  productname: string;
  quantity: number;
  price: number;
  discount: number;
  paymentStatus: PaymentStatus;
  type: medicineType;
  paymentType: PaymentType;
  transactionId?: string;  // Optional for digital payment tracking
  capacity?: string; // Optional field for dosage/volume
}

// POST endpoint to create a new sells record
// export async function POST(req: Request): Promise<Response> {
//   const { productname, quantity, price, discount, paymentStatus, type, paymentType, transactionId, capacity }: SellsRecordRequestBody = await req.json();

//   try {
//     const newRecord = await prisma.sells_record.create({
//       data: {
//         productname,
//         quantity,
//         price,
//         total: price * quantity, // Calculate the total
//         discount,
//         paymentStatus,
//         type,
//         paymentType,
//         transactionId,
//         capacity,
//       },
//     });
//     return new Response(JSON.stringify(newRecord), { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ error: 'Error creating record' }), { status: 500 });
    
//   }
// }

export async function POST(req: Request): Promise<Response> {
  try {
    const records: SellsRecordRequestBody[] = await req.json(); // Accept an array of records

    if (!Array.isArray(records)) {
      return new Response(JSON.stringify({ error: "Expected an array of records" }), { status: 400 });
    }

    const formattedRecords = records.map(record => ({
      productname: record.productname,
      quantity: record.quantity,
      price: record.price,
      total: record.price * record.quantity, // Calculate total for each record
      discount: record.discount,
      paymentStatus: record.paymentStatus,
      type: record.type,
      paymentType: record.paymentType,
      transactionId: record.transactionId,
      capacity: record.capacity,
    }));

    const createdRecords = await prisma.sells_record.createMany({
      data: formattedRecords,
    });

    return new Response(JSON.stringify({ count: createdRecords.count }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error creating records" }), { status: 500 });
  }
}


// GET endpoint to fetch all sells records
export async function GET(): Promise<Response> {
  try {
    const records = await prisma.sells_record.findMany();
    return new Response(JSON.stringify(records), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'Error fetching records' }), { status: 500 });
  }
}






