import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.vendors.findMany({
        orderBy: { id: 'asc' },
    });
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const { name } = await request.json();
    if (!name) {
        return new Response(JSON.stringify({ error: 'All Fields Are Required' }), {
            status: 400,
        });
    }
    const vendors = await prisma.vendors.create({
        data: { name },
    });
    return new Response(JSON.stringify(vendors), { status: 201 });
}

export async function PUT(request) {
    const { id, name } = await request.json();
    if (!id || !name) return Response.json({ error: 'Field is Empty' }, { 
        status: 400 });
    const vendors = await prisma.vendors.update({
        where: { id },
        data: { name },
    });
    return Response.json(vendors);
}

export async function DELETE(request) {
    const { id } = await request.json();
    if (!id) return Response.json({ error: 'ID Not Found' }, { status: 400 });
    await prisma.vendors.delete({ where: { id } });
    return Response.json({ message: 'Deleted Successfully' });
}