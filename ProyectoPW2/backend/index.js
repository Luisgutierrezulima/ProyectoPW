"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Registro de usuario
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
        res.status(400).json({ error: 'Faltan campos' });
        return;
    }
    const existe = yield prisma.usuario.findUnique({ where: { email } });
    if (existe) {
        res.status(400).json({ error: 'El correo ya está registrado' });
        return;
    }
    const usuario = yield prisma.usuario.create({ data: { nombre, email, password } });
    res.json({ ok: true, userId: usuario.id, nombre: usuario.nombre, email: usuario.email });
}));
// Login de usuario
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const usuario = yield prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
        res.status(400).json({ error: 'Usuario no encontrado' });
        return;
    }
    if (usuario.password !== password) {
        res.status(400).json({ error: 'Contraseña incorrecta' });
        return;
    }
    res.json({ ok: true, userId: usuario.id, nombre: usuario.nombre, email: usuario.email });
}));
// Obtener perfil de usuario
app.get('/api/perfil/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuario = yield prisma.usuario.findUnique({ where: { id: Number(req.params.id) } });
    if (!usuario) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
    }
    res.json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
}));
// --- NUEVO: Endpoints para juegos ---
// Obtener todos los juegos
app.get('/api/juegos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const juegos = yield prisma.juego.findMany({
        include: {
            resenas: {
                include: { usuario: true }
            }
        }
    });
    // Mapear para que cada reseña tenga el campo usuario (nombre)
    const juegosConResenas = juegos.map((j) => (Object.assign(Object.assign({}, j), { resenas: (j.resenas || []).map((r) => {
            var _a;
            return ({
                id: r.id,
                texto: r.texto,
                estrellas: r.estrellas,
                usuario: ((_a = r.usuario) === null || _a === void 0 ? void 0 : _a.nombre) || 'Usuario'
            });
        }) })));
    res.json(juegosConResenas);
}));
// Registro de usuario
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
        res.status(400).json({ error: 'Faltan campos' });
        return;
    }
    const existe = yield prisma.usuario.findUnique({ where: { email } });
    if (existe) {
        res.status(400).json({ error: 'El correo ya está registrado' });
        return;
    }
    const usuario = yield prisma.usuario.create({ data: { nombre, email, password } });
    res.json({ ok: true, userId: usuario.id, nombre: usuario.nombre, email: usuario.email });
}));
// Obtener un juego por ID
app.get('/api/juegos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const juego = yield prisma.juego.findUnique({ where: { id } });
    if (!juego) {
        res.status(404).json({ error: 'Juego no encontrado' });
        return;
    }
    res.json(juego);
}));
app.post('/api/juegos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, descripcion, estrellas, imagen, trailer, precio, oferta, plataforma, categoria } = req.body;
    if (!titulo || !descripcion || !imagen || !trailer || !precio || !plataforma || !categoria) {
        res.status(400).json({ error: 'Faltan campos obligatorios' });
        return;
    }
    const juego = yield prisma.juego.create({
        data: { titulo, descripcion, estrellas: estrellas || 0, imagen, trailer, precio, oferta: oferta || false, plataforma, categoria }
    });
    res.json(juego);
}));
// Editar un juego existente
app.put('/api/juegos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { titulo, descripcion, estrellas, imagen, trailer, precio, oferta, plataforma, categoria } = req.body;
    try {
        const juego = yield prisma.juego.update({
            where: { id },
            data: { titulo, descripcion, estrellas, imagen, trailer, precio, oferta, plataforma, categoria }
        });
        res.json(juego);
    }
    catch (error) {
        res.status(404).json({ error: 'Juego no encontrado o datos inválidos' });
    }
}));
// Eliminar un juego
app.delete('/api/juegos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield prisma.juego.delete({ where: { id } });
        res.json({ ok: true });
    }
    catch (error) {
        res.status(404).json({ error: 'Juego no encontrado' });
    }
}));
// Obtener todas las noticias
app.get('/api/noticias', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noticias = yield prisma.noticia.findMany({ orderBy: { id: 'desc' } });
    res.json(noticias);
}));
// Crear noticia
app.post('/api/noticias', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, contenido } = req.body;
    if (!titulo || !contenido) {
        res.status(400).json({ error: 'Faltan campos' });
        return;
    }
    const noticia = yield prisma.noticia.create({
        data: { titulo, contenido, fecha: new Date().toISOString().split('T')[0] }
    });
    res.json(noticia);
}));
// Editar noticia
app.put('/api/noticias/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { titulo, contenido } = req.body;
    try {
        const noticia = yield prisma.noticia.update({
            where: { id },
            data: { titulo, contenido }
        });
        res.json(noticia);
    }
    catch (_a) {
        res.status(404).json({ error: 'Noticia no encontrada' });
    }
}));
// Eliminar noticia
app.delete('/api/noticias/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield prisma.noticia.delete({ where: { id } });
        res.json({ ok: true });
    }
    catch (_a) {
        res.status(404).json({ error: 'Noticia no encontrada' });
    }
}));
// Actualizar perfil de usuario
app.put('/api/perfil/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const { nombre, email, password, pais } = req.body;
    try {
        const data = { nombre, email };
        if (password)
            data.password = password;
        if (pais)
            data.pais = pais;
        const usuario = yield prisma.usuario.update({
            where: { id },
            data,
        });
        res.json(usuario);
    }
    catch (_a) {
        res.status(400).json({ error: 'No se pudo actualizar el usuario.' });
    }
}));
// Obtener carrito de un usuario
app.get('/api/carrito/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const items = yield prisma.carritoItem.findMany({
        where: { userId },
        include: { juego: true }
    });
    // Formatea para el frontend
    const carrito = items.map((item) => ({
        id: item.juegoId,
        nombre: item.juego.titulo,
        imagen: item.juego.imagen,
        precio: item.juego.precio,
        cantidad: item.cantidad
    }));
    res.json(carrito);
}));
// Agregar juego al carrito
app.post('/api/carrito/:userId/agregar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const { id, cantidad } = req.body; // id = juegoId
    // Si ya existe, aumenta cantidad
    const existente = yield prisma.carritoItem.findFirst({ where: { userId, juegoId: id } });
    if (existente) {
        yield prisma.carritoItem.update({
            where: { id: existente.id },
            data: { cantidad: existente.cantidad + (cantidad || 1) }
        });
    }
    else {
        yield prisma.carritoItem.create({
            data: { userId, juegoId: id, cantidad: cantidad || 1 }
        });
    }
    res.json({ ok: true });
}));
// Aumentar cantidad
app.post('/api/carrito/:userId/aumentar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const { id } = req.body; // id = juegoId
    const item = yield prisma.carritoItem.findFirst({ where: { userId, juegoId: id } });
    if (item) {
        yield prisma.carritoItem.update({
            where: { id: item.id },
            data: { cantidad: item.cantidad + 1 }
        });
    }
    res.json({ ok: true });
}));
// Disminuir cantidad
app.post('/api/carrito/:userId/disminuir', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const { id } = req.body; // id = juegoId
    const item = yield prisma.carritoItem.findFirst({ where: { userId, juegoId: id } });
    if (item && item.cantidad > 1) {
        yield prisma.carritoItem.update({
            where: { id: item.id },
            data: { cantidad: item.cantidad - 1 }
        });
    }
    else if (item) {
        yield prisma.carritoItem.delete({ where: { id: item.id } });
    }
    res.json({ ok: true });
}));
// Eliminar juego del carrito
app.post('/api/carrito/:userId/eliminar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const { id } = req.body; // id = juegoId
    yield prisma.carritoItem.deleteMany({ where: { userId, juegoId: id } });
    res.json({ ok: true });
}));
// Limpiar carrito
app.post('/api/carrito/:userId/limpiar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    yield prisma.carritoItem.deleteMany({ where: { userId } });
    res.json({ ok: true });
}));
app.post('/api/pago', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, carrito, email } = req.body;
    if (!userId || !carrito || !Array.isArray(carrito) || carrito.length === 0) {
        res.status(400).json({ error: 'Datos de compra inválidos' });
        return;
    }
    // 1. Registrar la compra
    const compra = yield prisma.compra.create({
        data: {
            userId: Number(userId),
            detalles: {
                create: carrito.map((item) => ({
                    juegoId: item.id,
                    cantidad: item.cantidad,
                    clave: generarClave(),
                })),
            },
        },
        include: { detalles: true },
    });
    // 2. Vaciar el carrito del usuario
    yield prisma.carritoItem.deleteMany({ where: { userId: Number(userId) } });
    // 3. Obtener las claves generadas
    const claves = compra.detalles.map((d) => d.clave);
    // 4. Enviar claves por email (simulado)
    res.json({ ok: true, claves });
}));
// Función simple para generar claves
function generarClave() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}
// Obtener historial de compras de un usuario
app.get('/api/compras/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(req.params.userId);
    const compras = yield prisma.compra.findMany({
        where: { userId },
        include: {
            detalles: {
                include: { juego: true }
            }
        },
        orderBy: { fecha: 'desc' }
    });
    res.json(compras);
}));
// ¿El usuario puede dejar reseña para este juego?
app.get('/api/juegos/:juegoId/puede-resenar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const juegoId = Number(req.params.juegoId);
    const userId = Number(req.query.userId);
    // ¿El usuario compró este juego?
    const compra = yield prisma.compraDetalle.findFirst({
        where: { juegoId, compra: { userId } }
    });
    res.json({ puedeResenar: !!compra });
}));
// Agregar reseña (solo si compró el juego)
app.post('/api/juegos/:juegoId/resena', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const juegoId = Number(req.params.juegoId);
    const { userId, texto, estrellas } = req.body;
    // ¿El usuario compró este juego?
    const compra = yield prisma.compraDetalle.findFirst({
        where: { juegoId, compra: { userId: Number(userId) } }
    });
    if (!compra) {
        res.status(403).json({ error: 'No puedes dejar reseña para este juego.' });
        return;
    }
    // (Opcional) Evitar reseñas duplicadas por usuario
    const yaReseno = yield prisma.resena.findFirst({
        where: { juegoId, texto, estrellas }
    });
    if (yaReseno) {
        res.status(400).json({ error: 'Ya dejaste una reseña similar.' });
        return;
    }
    const usuario = yield prisma.usuario.findUnique({ where: { id: Number(userId) } });
    const resena = yield prisma.resena.create({
        data: { juegoId, texto, estrellas, userId: Number(userId) }
    });
    res.json(Object.assign(Object.assign({}, resena), { usuario: (usuario === null || usuario === void 0 ? void 0 : usuario.nombre) || 'Usuario' }));
}));
// Obtener reseñas de un juego
app.get('/api/juegos/:juegoId/resenas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const juegoId = Number(req.params.juegoId);
    const resenas = yield prisma.resena.findMany({
        where: { juegoId },
        include: { usuario: true }
    });
    const resenasConUsuario = resenas.map((r) => {
        var _a;
        return ({
            id: r.id,
            texto: r.texto,
            estrellas: r.estrellas,
            usuario: ((_a = r.usuario) === null || _a === void 0 ? void 0 : _a.nombre) || 'Usuario'
        });
    });
    res.json(resenasConUsuario);
}));
// Agregar aquí más endpoints, app.listen siempre debe ir al FINAL!!!!
app.listen(3001, () => {
    console.log('Backend listening on http://localhost:3001');
});
