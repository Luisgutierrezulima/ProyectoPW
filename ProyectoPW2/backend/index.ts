import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Registro de usuario
app.post('/api/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ error: 'Faltan campos' });
  const existe = await prisma.usuario.findUnique({ where: { email } });
  if (existe) return res.status(400).json({ error: 'El correo ya está registrado' });
  const usuario = await prisma.usuario.create({ data: { nombre, email, password } });
  res.json({ ok: true, userId: usuario.id, nombre: usuario.nombre, email: usuario.email });
});

// Login de usuario
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado' });
  if (usuario.password !== password) return res.status(400).json({ error: 'Contraseña incorrecta' });
  res.json({ ok: true, userId: usuario.id, nombre: usuario.nombre, email: usuario.email });
});

// Obtener perfil de usuario
app.get('/api/perfil/:id', async (req, res) => {
  const usuario = await prisma.usuario.findUnique({ where: { id: Number(req.params.id) } });
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
});

// --- NUEVO: Endpoints para juegos ---

// Obtener todos los juegos
app.get('/api/juegos', async (req, res) => {
  const juegos = await prisma.juego.findMany();
  res.json(juegos);
});

// Crear un nuevo juego
app.post('/api/juegos', async (req, res) => {
  const { titulo, descripcion, estrellas, imagen, trailer, precio, oferta, plataforma, categoria } = req.body;
  if (!titulo || !descripcion || !imagen || !trailer || !precio || !plataforma || !categoria) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }
  const juego = await prisma.juego.create({
    data: { titulo, descripcion, estrellas: estrellas || 0, imagen, trailer, precio, oferta: oferta || false, plataforma, categoria }
  });
  res.json(juego);
});

// Obtener un juego por ID
app.get('/api/juegos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const juego = await prisma.juego.findUnique({ where: { id } });
  if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });
  res.json(juego);
});

// Editar un juego existente
app.put('/api/juegos/:id', async (req, res) => {
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
app.delete('/api/juegos/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.juego.delete({ where: { id } });
    res.json({ ok: true });
  } catch (error) {
    res.status(404).json({ error: 'Juego no encontrado' });
  }
});

// Obtener todas las noticias
app.get('/api/noticias', async (req, res) => {
  const noticias = await prisma.noticia.findMany({ orderBy: { id: 'desc' } });
  res.json(noticias);
});

// Crear noticia
app.post('/api/noticias', async (req, res) => {
  const { titulo, contenido } = req.body;
  if (!titulo || !contenido) return res.status(400).json({ error: 'Faltan campos' });
  const noticia = await prisma.noticia.create({
    data: { titulo, contenido, fecha: new Date().toISOString().split('T')[0] }
  });
  res.json(noticia);
});

// Editar noticia
app.put('/api/noticias/:id', async (req, res) => {
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
app.delete('/api/noticias/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.noticia.delete({ where: { id } });
    res.json({ ok: true });
  } catch {
    res.status(404).json({ error: 'Noticia no encontrada' });
  }
});

// Actualizar perfil de usuario
app.put('/api/perfil/:id', async (req, res) => {
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

// Puedes agregar aquí más endpoints para editar/eliminar juegos, etc.

app.listen(3001, () => {
  console.log('Backend listening on http://localhost:3001');
});