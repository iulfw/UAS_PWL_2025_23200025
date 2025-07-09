import prisma from '@/lib/prisma';

export async function GET() {
    const data = await prisma.orders.findMany({
        include: { jastipers: true, vendors: true },
        orderBy: { id: 'asc' },
    });
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const { date, customer, jastiper, vendor, menu, qty, price, notes, status } = await request.json();
    if (!date || !customer || !jastiper || !vendor || !menu || !qty || !price || !status) {
        return new Response(JSON.stringify({ error: 'All Fields Are Required' }), {
            status: 400,
        });
    }
    const orders = await prisma.orders.create({
        data: { date: new Date(date), customer, jastiper: Number(jastiper), vendor: Number(vendor), menu, qty: Number(qty), price: Number(price), notes, status: status === "Paid" ? true:false },
    });
    return new Response(JSON.stringify(orders), { status: 201 });
}

export async function PUT(request) {
    const { id, date, customer, jastiper, vendor, menu, qty, price, notes, status } = await request.json();
    if (!id || !date || !customer || !jastiper || !vendor || !menu || !qty || !price || !status) return Response.json({ error: 'Field is Empty' }, { 
        status: 400 });
    const orders = await prisma.orders.update({
        where: { id },
        data: { date: new Date(date), customer, jastiper: Number(jastiper), vendor: Number(vendor), menu, qty: Number(qty), price: Number(price), notes, status: status === "Paid" ? true:false },
    });
    return Response.json(orders);
}

export async function DELETE(request) {
    const { id } = await request.json();
    if (!id) return Response.json({ error: 'ID Not Found' }, { status: 400 });
    await prisma.orders.delete({ where: { id } });
    return Response.json({ message: 'Deleted Successfully' });
}