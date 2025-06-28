import type { Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Registro de usuario
app.post('/api/register', async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    res.status(400).json({ error: 'Faltan campos' });
    return;
  }
  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe) {
    res.status(400).json({ error: 'El correo ya está registrado' });
    return;
  }
  const usuario = await prisma.usuario.create({ data: { nombre, email, password } });
  res.json({ ok: true, userId: usuario.id, nombre: usuario.nombre, email: usuario.email });
});

// Login de usuario
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) {
    res.status(400).json({ error: 'Usuario no encontrado' });
    return;
  }
  if (usuario.password !== password) {
    res.status(400).json({ error: 'Contraseña incorrecta' });
    return;
  }
  res.json({ ok: true, userId: usuario.id, nombre: usuario.nombre, email: usuario.email });
});

// Obtener perfil de usuario
app.get('/api/perfil/:id', async (req: Request, res: Response) => {
  const usuario = await prisma.usuario.findUnique({ where: { id: Number(req.params.id) } });
  if (!usuario) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }
  res.json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
});

// --- NUEVO: Endpoints para juegos ---

// Obtener todos los juegos
app.get('/api/juegos', async (req: Request, res: Response) => {
  const juegos = await prisma.juego.findMany({
    include: {
      resenas: {
        include: { usuario: true }
      }
    }
  });
  // Mapear para que cada reseña tenga el campo usuario (nombre)
  const juegosConResenas = juegos.map((j: any) => ({
    ...j,
    resenas: (j.resenas || []).map((r: any) => ({
      id: r.id,
      texto: r.texto,
      estrellas: r.estrellas,
      usuario: r.usuario?.nombre || 'Usuario'
    }))
  }));
  res.json(juegosConResenas);
});

// Registro de usuario
app.post('/api/register', async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    res.status(400).json({ error: 'Faltan campos' });
    return;
  }
  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe) {
    res.status(400).json({ error: 'El correo ya está registrado' });
    return;
  }
  const usuario = await prisma.usuario.create({ data: { nombre, email, password } });
  res.json({ ok: true, userId: usuario.id, nombre: usuario.nombre, email: usuario.email });
});

// Obtener un juego por ID
app.get('/api/juegos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const juego = await prisma.juego.findUnique({ where: { id } });
  if (!juego) {
    res.status(404).json({ error: 'Juego no encontrado' });
    return;
  }
  res.json(juego);
});

app.post('/api/juegos', async (req: Request, res: Response) => {
  const { titulo, descripcion, estrellas, imagen, trailer, precio, oferta, plataforma, categoria } = req.body;
  if (!titulo || !descripcion || !imagen || !trailer || !precio || !plataforma || !categoria) {
    res.status(400).json({ error: 'Faltan campos obligatorios' });
    return;
  }
  const juego = await prisma.juego.create({
    data: { titulo, descripcion, estrellas: estrellas || 0, imagen, trailer, precio, oferta: oferta || false, plataforma, categoria }
  });
  res.json(juego);
});

// Editar un juego existente
app.put('/api/juegos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { titulo, descripcion, estrellas, imagen, trailer, precio, oferta, plataforma, categoria } = req.body;
  try {
    const juego = await prisma.juego.update({
      where: { id },
      data: { titulo, descripcion, estrellas, imagen, trailer, precio, oferta, plataforma, categoria }
    });
    res.json(juego);
  } catch (error) {
    res.status(404).json({ error: 'Juego no encontrado o datos inválidos' });
  }
});

// Eliminar un juego
app.delete('/api/juegos/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.juego.delete({ where: { id } });
    res.json({ ok: true });
  } catch (error) {
    res.status(404).json({ error: 'Juego no encontrado' });
  }
});

// Obtener todas las noticias
app.get('/api/noticias', async (req: Request, res: Response) => {
  const noticias = await prisma.noticia.findMany({ orderBy: { id: 'desc' } });
  res.json(noticias);
});

// Crear noticia
app.post('/api/noticias', async (req: Request, res: Response) => {
  const { titulo, contenido } = req.body;
  if (!titulo || !contenido) {
    res.status(400).json({ error: 'Faltan campos' });
    return;
  }
  const noticia = await prisma.noticia.create({
    data: { titulo, contenido, fecha: new Date().toISOString().split('T')[0] }
  });
  res.json(noticia);
});

// Editar noticia
app.put('/api/noticias/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { titulo, contenido } = req.body;
  try {
    const noticia = await prisma.noticia.update({
      where: { id },
      data: { titulo, contenido }
    });
    res.json(noticia);
  } catch {
    res.status(404).json({ error: 'Noticia no encontrada' });
  }
});

// Eliminar noticia
app.delete('/api/noticias/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.noticia.delete({ where: { id } });
    res.json({ ok: true });
  } catch {
    res.status(404).json({ error: 'Noticia no encontrada' });
  }
});

// Actualizar perfil de usuario
app.put('/api/perfil/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nombre, email, password, pais } = req.body;
  try {
    const data: any = { nombre, email };
    if (password) data.password = password;
    if (pais) data.pais = pais;
    const usuario = await prisma.usuario.update({
      where: { id },
      data,
    });
    res.json(usuario);
  } catch {
    res.status(400).json({ error: 'No se pudo actualizar el usuario.' });
  }
});

// Obtener carrito de un usuario
app.get('/api/carrito/:userId', async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const items = await prisma.carritoItem.findMany({
    where: { userId },
    include: { juego: true }
  });
  // Formatea para el frontend
  const carrito = items.map((item: any) => ({
    id: item.juegoId,
    nombre: item.juego.titulo,
    imagen: item.juego.imagen,
    precio: item.juego.precio,
    cantidad: item.cantidad
  }));
  res.json(carrito);
});

// Agregar juego al carrito
app.post('/api/carrito/:userId/agregar', async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const { id, cantidad } = req.body; // id = juegoId
  // Si ya existe, aumenta cantidad
  const existente = await prisma.carritoItem.findFirst({ where: { userId, juegoId: id } });
  if (existente) {
    await prisma.carritoItem.update({
      where: { id: existente.id },
      data: { cantidad: existente.cantidad + (cantidad || 1) }
    });
  } else {
    await prisma.carritoItem.create({
      data: { userId, juegoId: id, cantidad: cantidad || 1 }
    });
  }
  res.json({ ok: true });
});

// Aumentar cantidad
app.post('/api/carrito/:userId/aumentar', async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const { id } = req.body; // id = juegoId
  const item = await prisma.carritoItem.findFirst({ where: { userId, juegoId: id } });
  if (item) {
    await prisma.carritoItem.update({
      where: { id: item.id },
      data: { cantidad: item.cantidad + 1 }
    });
  }
  res.json({ ok: true });
});

// Disminuir cantidad
app.post('/api/carrito/:userId/disminuir', async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const { id } = req.body; // id = juegoId
  const item = await prisma.carritoItem.findFirst({ where: { userId, juegoId: id } });
  if (item && item.cantidad > 1) {
    await prisma.carritoItem.update({
      where: { id: item.id },
      data: { cantidad: item.cantidad - 1 }
    });
  } else if (item) {
    await prisma.carritoItem.delete({ where: { id: item.id } });
  }
  res.json({ ok: true });
});

// Eliminar juego del carrito
app.post('/api/carrito/:userId/eliminar', async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const { id } = req.body; // id = juegoId
  await prisma.carritoItem.deleteMany({ where: { userId, juegoId: id } });
  res.json({ ok: true });
});

// Limpiar carrito
app.post('/api/carrito/:userId/limpiar', async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  await prisma.carritoItem.deleteMany({ where: { userId } });
  res.json({ ok: true });
});

app.post('/api/pago', async (req: Request, res: Response) => {
  const { userId, carrito, email } = req.body;
  if (!userId || !carrito || !Array.isArray(carrito) || carrito.length === 0) {
    res.status(400).json({ error: 'Datos de compra inválidos' });
    return;
  }

  // 1. Registrar la compra
  const compra = await prisma.compra.create({
    data: {
      userId: Number(userId),
      detalles: {
        create: (carrito as any[]).map((item) => ({
          juegoId: item.id,
          cantidad: item.cantidad,
          clave: generarClave(),
        })),
      },
    },
    include: { detalles: true },
  });

  // 2. Vaciar el carrito del usuario
  await prisma.carritoItem.deleteMany({ where: { userId: Number(userId) } });

  // 3. Obtener las claves generadas
  const claves = compra.detalles.map((d: any) => d.clave);

  // 4. Enviar claves por email (simulado)

  res.json({ ok: true, claves });
});

// Función simple para generar claves
function generarClave() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// Obtener historial de compras de un usuario
app.get('/api/compras/:userId', async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const compras = await prisma.compra.findMany({
    where: { userId },
    include: {
      detalles: {
        include: { juego: true }
      }
    },
    orderBy: { fecha: 'desc' }
  });
  res.json(compras);
});

// ¿El usuario puede dejar reseña para este juego?
app.get('/api/juegos/:juegoId/puede-resenar', async (req: Request, res: Response) => {
  const juegoId = Number(req.params.juegoId);
  const userId = Number(req.query.userId);
  // ¿El usuario compró este juego?
  const compra = await prisma.compraDetalle.findFirst({
    where: { juegoId, compra: { userId } }
  });
  res.json({ puedeResenar: !!compra });
});

// Agregar reseña (solo si compró el juego)
app.post('/api/juegos/:juegoId/resena', async (req: Request, res: Response) => {
  const juegoId = Number(req.params.juegoId);
  const { userId, texto, estrellas } = req.body;
  // ¿El usuario compró este juego?
  const compra = await prisma.compraDetalle.findFirst({
    where: { juegoId, compra: { userId: Number(userId) } }
  });
  if (!compra) {
    res.status(403).json({ error: 'No puedes dejar reseña para este juego.' });
    return;
  }

  // (Opcional) Evitar reseñas duplicadas por usuario
  const yaReseno = await prisma.resena.findFirst({
    where: { juegoId, texto, estrellas }
  });
  if (yaReseno) {
    res.status(400).json({ error: 'Ya dejaste una reseña similar.' });
    return;
  }

  const usuario = await prisma.usuario.findUnique({ where: { id: Number(userId) } });
  const resena = await prisma.resena.create({
    data: { juegoId, texto, estrellas, userId: Number(userId) }
  });
  res.json({ ...resena, usuario: usuario?.nombre || 'Usuario' });
});

// Obtener reseñas de un juego
app.get('/api/juegos/:juegoId/resenas', async (req: Request, res: Response) => {
  const juegoId = Number(req.params.juegoId);
  const resenas = await prisma.resena.findMany({
    where: { juegoId },
    include: { usuario: true }
  });
  const resenasConUsuario = resenas.map((r: any) => ({
    id: r.id,
    texto: r.texto,
    estrellas: r.estrellas,
    usuario: r.usuario?.nombre || 'Usuario'
  }));
  res.json(resenasConUsuario);
});

// Agregar aquí más endpoints, app.listen siempre debe ir al FINAL!!!!

app.listen(3001, () => {
  console.log('Backend listening on http://localhost:3001');
});