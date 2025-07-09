import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.jastipers.findMany({
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
    const jastipers = await prisma.jastipers.create({
        data: { name },
    });
    return new Response(JSON.stringify(jastipers), { status: 201 });
}

export async function PUT(request) {
    const { id, name } = await request.json();
    if (!id || !name) return Response.json({ error: 'Field is Empty' }, { 
        status: 400 });
    const jastipers = await prisma.jastipers.update({
        where: { id },
        data: { name },
    });
    return Response.json(jastipers);
}

export async function DELETE(request) {
    const { id } = await request.json();
    if (!id) return Response.json({ error: 'ID Not Found' }, { status: 400 });
    await prisma.jastipers.delete({ where: { id } });
    return Response.json({ message: 'Deleted Successfully' });
}