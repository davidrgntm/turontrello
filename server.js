const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const url = require('node:url');
const crypto = require('node:crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = Number(process.env.PORT || 3000);
const APP_NAME = process.env.APP_NAME || 'TuronTrello';
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'turontrello.db');
const SESSION_DAYS = Number(process.env.SESSION_DAYS || 30);
const ATTACHMENT_LIMIT_MB = Number(process.env.ATTACHMENT_LIMIT_MB || 2);
const ATTACHMENT_LIMIT_BYTES = ATTACHMENT_LIMIT_MB * 1024 * 1024;
const DEFAULT_TIMEZONE_OFFSET = process.env.APP_TIMEZONE_OFFSET || '+05:00';
const publicDir = path.join(__dirname, 'public');

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec(`
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar_color TEXT NOT NULL DEFAULT '#2563eb',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workspaces (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS workspace_members (
  workspace_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (workspace_id, user_id),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS boards (
  id TEXT PRIMARY KEY,
  workspace_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  color TEXT NOT NULL DEFAULT '#0f172a',
  owner_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS board_members (
  board_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (board_id, user_id),
  FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS lists (
  id TEXT PRIMARY KEY,
  board_id TEXT NOT NULL,
  name TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_list_colors (
  user_id TEXT NOT NULL,
  board_id TEXT NOT NULL,
  list_id TEXT NOT NULL,
  color TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, board_id, list_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
  FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cards (
  id TEXT PRIMARY KEY,
  board_id TEXT NOT NULL,
  list_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL,
  due_date TEXT,
  start_date TEXT,
  labels_json TEXT NOT NULL DEFAULT '[]',
  assignee_user_id TEXT,
  archived INTEGER NOT NULL DEFAULT 0,
  is_completed INTEGER NOT NULL DEFAULT 0,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
  FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE,
  FOREIGN KEY (assignee_user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS card_comments (
  id TEXT PRIMARY KEY,
  card_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS card_checklist_items (
  id TEXT PRIMARY KEY,
  card_id TEXT NOT NULL,
  title TEXT NOT NULL,
  is_done INTEGER NOT NULL DEFAULT 0,
  position INTEGER NOT NULL,
  due_date TEXT,
  assignee_user_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
  FOREIGN KEY (assignee_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS card_attachments (
  id TEXT PRIMARY KEY,
  card_id TEXT NOT NULL,
  name TEXT NOT NULL,
  mime_type TEXT,
  kind TEXT NOT NULL DEFAULT 'link',
  size_bytes INTEGER NOT NULL DEFAULT 0,
  data_base64 TEXT,
  url TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  workspace_id TEXT,
  board_id TEXT,
  card_id TEXT,
  actor_user_id TEXT,
  action_type TEXT NOT NULL,
  details_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
  FOREIGN KEY (board_id) REFERENCES boards(id) ON DELETE CASCADE,
  FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE,
  FOREIGN KEY (actor_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_workspace_members_user ON workspace_members(user_id);
CREATE INDEX IF NOT EXISTS idx_board_members_user ON board_members(user_id);
CREATE INDEX IF NOT EXISTS idx_boards_workspace ON boards(workspace_id);
CREATE INDEX IF NOT EXISTS idx_lists_board ON lists(board_id);
CREATE INDEX IF NOT EXISTS idx_user_list_colors_user_board ON user_list_colors(user_id, board_id);
CREATE INDEX IF NOT EXISTS idx_cards_board ON cards(board_id);
CREATE INDEX IF NOT EXISTS idx_cards_list ON cards(list_id);
CREATE INDEX IF NOT EXISTS idx_activity_board ON activity_logs(board_id, created_at DESC);
`);

function ensureColumn(table, columnName, columnSql) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all();
  if (!columns.some((col) => col.name === columnName)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${columnSql}`);
  }
}

ensureColumn('cards', 'is_completed', 'is_completed INTEGER NOT NULL DEFAULT 0');
ensureColumn('users', 'avatar_data', "avatar_data TEXT NOT NULL DEFAULT ''");
ensureColumn('lists', 'owner_user_id', 'owner_user_id TEXT');
ensureColumn('lists', 'color', "color TEXT NOT NULL DEFAULT ''");

const palette = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a', '#0891b2', '#4f46e5', '#b91c1c'];
const sseClients = new Set();

const selectUserByEmail = db.prepare(`SELECT * FROM users WHERE email = ?`);
const selectUserById = db.prepare(`SELECT * FROM users WHERE id = ?`);
const insertUser = db.prepare(`INSERT INTO users (id, name, email, password_hash, avatar_color) VALUES (?, ?, ?, ?, ?)`);
const insertSession = db.prepare(`INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)`);
const deleteSessionStmt = db.prepare(`DELETE FROM sessions WHERE id = ?`);
const selectSessionUser = db.prepare(`
  SELECT s.id as session_id, s.expires_at, u.*
  FROM sessions s
  JOIN users u ON u.id = s.user_id
  WHERE s.id = ?
`);
const selectWorkspaceMembership = db.prepare(`SELECT * FROM workspace_members WHERE workspace_id = ? AND user_id = ?`);
const selectWorkspaceById = db.prepare(`SELECT * FROM workspaces WHERE id = ?`);
const selectBoardById = db.prepare(`SELECT * FROM boards WHERE id = ?`);
const selectBoardMembership = db.prepare(`SELECT * FROM board_members WHERE board_id = ? AND user_id = ?`);
const selectListById = db.prepare(`SELECT * FROM lists WHERE id = ?`);
const selectCardById = db.prepare(`SELECT * FROM cards WHERE id = ?`);

function uid() {
  return crypto.randomUUID();
}

function nowIso() {
  return new Date().toISOString();
}

function plusDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function parseCookies(req) {
  const header = req.headers.cookie || '';
  const out = {};
  header.split(';').forEach((part) => {
    const index = part.indexOf('=');
    if (index === -1) return;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  });
  return out;
}

function setCookie(res, name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (options.httpOnly !== false) parts.push('HttpOnly');
  parts.push('Path=/');
  parts.push(`SameSite=${options.sameSite || 'Lax'}`);
  if (process.env.NODE_ENV === 'production') parts.push('Secure');
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
  if (options.expires) parts.push(`Expires=${new Date(options.expires).toUTCString()}`);
  const existing = res.getHeader('Set-Cookie');
  if (existing) {
    const list = Array.isArray(existing) ? existing : [existing];
    res.setHeader('Set-Cookie', [...list, parts.join('; ')]);
  } else {
    res.setHeader('Set-Cookie', parts.join('; '));
  }
}

function clearCookie(res, name) {
  setCookie(res, name, '', { maxAge: 0, expires: 0 });
}

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function sendText(res, status, text, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': contentType, 'Content-Length': Buffer.byteLength(text) });
  res.end(text);
}

function notFound(res) {
  sendJson(res, 404, { error: 'Not found' });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 10 * 1024 * 1024) {
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, originalHash] = String(stored).split(':');
  const computed = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(originalHash, 'hex'), Buffer.from(computed, 'hex'));
}

function sanitizeText(value, fallback = '') {
  return String(value ?? fallback).trim();
}

function pickColor(seedText = '') {
  const sum = Array.from(seedText).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return palette[sum % palette.length];
}

function publicUser(user) {
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email, avatarColor: user.avatar_color, avatarData: user.avatar_data || '' };
}

function parseLabels(value) {
  if (Array.isArray(value)) return value.map((item) => sanitizeText(item)).filter(Boolean).slice(0, 10);
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 10);
}

function parseOptionalDate(value) {
  if (!value) return null;
  const normalized = String(value).trim();
  const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(normalized);
  const hasSeconds = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(normalized);
  const isDateTimeLocal = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?$/.test(normalized);
  const dateInput = isDateTimeLocal && !hasTimezone
    ? `${normalized}${hasSeconds ? '' : ':00'}${DEFAULT_TIMEZONE_OFFSET}`
    : normalized;
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function toNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function touchUpdated(table, id) {
  db.prepare(`UPDATE ${table} SET updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(id);
}

function logActivity({ workspaceId = null, boardId = null, cardId = null, actorUserId = null, actionType, details = {} }) {
  db.prepare(`
    INSERT INTO activity_logs (id, workspace_id, board_id, card_id, actor_user_id, action_type, details_json)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(uid(), workspaceId, boardId, cardId, actorUserId, actionType, JSON.stringify(details || {}));
}

function broadcast(event) {
  const payload = `data: ${JSON.stringify({ ...event, ts: nowIso() })}\n\n`;
  for (const client of [...sseClients]) {
    if (client.closed) continue;
    const allowed =
      !event.boardId ||
      client.boardId === event.boardId ||
      (event.workspaceId && client.workspaceId === event.workspaceId) ||
      client.userId === event.userId;
    if (allowed) {
      try {
        client.res.write(payload);
      } catch {
        client.closed = true;
        sseClients.delete(client);
      }
    }
  }
}

function getCurrentUser(req) {
  const cookies = parseCookies(req);
  const sessionId = cookies.tt_session;
  if (!sessionId) return null;
  const row = selectSessionUser.get(sessionId);
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    deleteSessionStmt.run(sessionId);
    return null;
  }
  return {
    sessionId,
    user: publicUser(row),
    rawUser: row
  };
}

function requireUser(req, res) {
  const current = getCurrentUser(req);
  if (!current) {
    sendJson(res, 401, { error: 'Authentication required' });
    return null;
  }
  return current;
}

function requireWorkspaceMember(req, res, userId, workspaceId) {
  const membership = selectWorkspaceMembership.get(workspaceId, userId);
  if (!membership) {
    sendJson(res, 403, { error: 'Workspace access denied' });
    return null;
  }
  const workspace = selectWorkspaceById.get(workspaceId);
  if (!workspace) {
    sendJson(res, 404, { error: 'Workspace not found' });
    return null;
  }
  return { workspace, membership };
}

function requireBoardMember(req, res, userId, boardId) {
  const board = selectBoardById.get(boardId);
  if (!board) {
    sendJson(res, 404, { error: 'Board not found' });
    return null;
  }
  const workspaceCheck = requireWorkspaceMember(req, res, userId, board.workspace_id);
  if (!workspaceCheck) return null;
  let membership = selectBoardMembership.get(boardId, userId);
  if (!membership) {
    db.prepare(`INSERT OR IGNORE INTO board_members (board_id, user_id, role) VALUES (?, ?, 'member')`).run(boardId, userId);
    membership = selectBoardMembership.get(boardId, userId);
  }
  return { board, membership, workspace: workspaceCheck.workspace, workspaceMembership: workspaceCheck.membership };
}

function isWorkspaceOwner(check, userId) {
  return Boolean(check && ((check.workspace && check.workspace.owner_id === userId) || check.workspaceMembership?.role === 'owner'));
}

function isBoardAdmin(check, userId) {
  return Boolean(check && (isWorkspaceOwner(check, userId) || check.membership?.role === 'owner' || check.membership?.role === 'admin'));
}

function canManageList(check, list, userId) {
  if (!check || !list) return false;
  if (isBoardAdmin(check, userId)) return true;
  return Boolean(list.owner_user_id && list.owner_user_id === userId);
}

function canManageCard(check, card, userId) {
  if (!check || !card) return false;
  if (isBoardAdmin(check, userId)) return true;
  const list = selectListById.get(card.list_id);
  return canManageList(check, list, userId);
}

function serializeBoard(board) {
  return {
    id: board.id,
    workspaceId: board.workspace_id,
    name: board.name,
    description: board.description,
    color: board.color,
    createdAt: board.created_at,
    updatedAt: board.updated_at
  };
}

function serializeList(list) {
  return {
    id: list.id,
    boardId: list.board_id,
    name: list.name,
    position: list.position,
    ownerUserId: list.owner_user_id || null,
    owner: list.owner_name ? { id: list.owner_user_id, name: list.owner_name, avatarColor: list.owner_avatar_color, avatarData: list.owner_avatar_data || '' } : null,
    color: list.color || '',
    createdAt: list.created_at,
    updatedAt: list.updated_at
  };
}

function serializeCard(card) {
  return {
    id: card.id,
    boardId: card.board_id,
    listId: card.list_id,
    title: card.title,
    description: card.description,
    position: card.position,
    dueDate: card.due_date,
    startDate: card.start_date,
    labels: JSON.parse(card.labels_json || '[]'),
    assigneeUserId: card.assignee_user_id,
    archived: Boolean(card.archived),
    isCompleted: Boolean(card.is_completed),
    createdBy: card.created_by,
    createdAt: card.created_at,
    updatedAt: card.updated_at
  };
}

function getBoardMembers(boardId) {
  return db.prepare(`
    SELECT u.*, bm.role
    FROM board_members bm
    JOIN users u ON u.id = bm.user_id
    WHERE bm.board_id = ?
    ORDER BY u.name COLLATE NOCASE
  `).all(boardId).map((row) => ({ ...publicUser(row), role: row.role }));
}

function getWorkspaceOverview(userId) {
  const workspaces = db.prepare(`
    SELECT w.*, wm.role,
      (SELECT COUNT(*) FROM boards b WHERE b.workspace_id = w.id) AS board_count
    FROM workspaces w
    JOIN workspace_members wm ON wm.workspace_id = w.id
    WHERE wm.user_id = ?
    ORDER BY w.updated_at DESC, w.created_at DESC
  `).all(userId).map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    boardCount: row.board_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    boards: db.prepare(`SELECT * FROM boards WHERE workspace_id = ? ORDER BY updated_at DESC, created_at DESC`).all(row.id).map(serializeBoard)
  }));

  return workspaces;
}

function getBoardPayload(boardId, currentUserId = null) {
  const board = selectBoardById.get(boardId);
  const workspace = selectWorkspaceById.get(board.workspace_id);
  const lists = db.prepare(`
    SELECT l.*, u.name AS owner_name, u.avatar_color AS owner_avatar_color, u.avatar_data AS owner_avatar_data
    FROM lists l
    LEFT JOIN users u ON u.id = l.owner_user_id
    WHERE l.board_id = ?
    ORDER BY l.position ASC, l.created_at ASC
  `).all(boardId).map(serializeList);
  const cards = db.prepare(`SELECT * FROM cards WHERE board_id = ? AND archived = 0 ORDER BY position ASC, created_at ASC`).all(boardId).map(serializeCard);
  const members = getBoardMembers(boardId);
  const activity = db.prepare(`
    SELECT a.*, u.name as actor_name, u.email as actor_email, u.avatar_color as actor_avatar_color, u.avatar_data as actor_avatar_data
    FROM activity_logs a
    LEFT JOIN users u ON u.id = a.actor_user_id
    WHERE a.board_id = ?
    ORDER BY a.created_at DESC
    LIMIT 40
  `).all(boardId).map((row) => ({
    id: row.id,
    boardId: row.board_id,
    cardId: row.card_id,
    workspaceId: row.workspace_id,
    actionType: row.action_type,
    createdAt: row.created_at,
    details: JSON.parse(row.details_json || '{}'),
    actor: row.actor_name ? { id: row.actor_user_id, name: row.actor_name, email: row.actor_email, avatarColor: row.actor_avatar_color, avatarData: row.actor_avatar_data || '' } : null
  }));

  const listColors = Object.fromEntries(lists.filter((list) => list.color).map((list) => [list.id, list.color]));
  const userListColors = listColors;

  let permissions = null;
  if (currentUserId) {
    const membership = selectBoardMembership.get(boardId, currentUserId) || { role: 'member' };
    const workspaceMembership = selectWorkspaceMembership.get(workspace.id, currentUserId) || { role: 'member' };
    const permissionCheck = { board, workspace, membership, workspaceMembership };
    permissions = {
      role: isWorkspaceOwner(permissionCheck, currentUserId) ? 'owner' : membership.role || 'member',
      canEditBoard: isBoardAdmin(permissionCheck, currentUserId),
      canManageMembers: isBoardAdmin(permissionCheck, currentUserId),
      canReorderLists: isWorkspaceOwner(permissionCheck, currentUserId),
      canAccessAllLists: isBoardAdmin(permissionCheck, currentUserId)
    };
  }

  return {
    board: serializeBoard(board),
    workspace: { id: workspace.id, name: workspace.name },
    lists,
    cards,
    members,
    activity,
    permissions,
    listColors,
    userListColors
  };
}

function getCardDetail(cardId) {
  const card = selectCardById.get(cardId);
  const comments = db.prepare(`
    SELECT c.*, u.name, u.email, u.avatar_color
    FROM card_comments c
    JOIN users u ON u.id = c.user_id
    WHERE c.card_id = ?
    ORDER BY c.created_at ASC
  `).all(cardId).map((row) => ({
    id: row.id,
    content: row.content,
    createdAt: row.created_at,
    user: { id: row.user_id, name: row.name, email: row.email, avatarColor: row.avatar_color }
  }));
  const checklist = db.prepare(`
    SELECT ci.*, u.name as assignee_name, u.email as assignee_email, u.avatar_color as assignee_avatar_color
    FROM card_checklist_items ci
    LEFT JOIN users u ON u.id = ci.assignee_user_id
    WHERE ci.card_id = ?
    ORDER BY ci.position ASC, ci.created_at ASC
  `).all(cardId).map((row) => ({
    id: row.id,
    title: row.title,
    isDone: Boolean(row.is_done),
    position: row.position,
    dueDate: row.due_date,
    assigneeUserId: row.assignee_user_id,
    assignee: row.assignee_name ? { id: row.assignee_user_id, name: row.assignee_name, email: row.assignee_email, avatarColor: row.assignee_avatar_color } : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }));
  const attachments = db.prepare(`SELECT * FROM card_attachments WHERE card_id = ? ORDER BY created_at DESC`).all(cardId).map((row) => ({
    id: row.id,
    name: row.name,
    mimeType: row.mime_type,
    kind: row.kind,
    sizeBytes: row.size_bytes,
    url: row.url,
    createdBy: row.created_by,
    createdAt: row.created_at,
    downloadUrl: row.kind === 'file' ? `/api/attachments/${row.id}/download` : row.url
  }));
  return {
    card: serializeCard(card),
    comments,
    checklist,
    attachments
  };
}

function ensurePersonalListForUser(boardId, userId) {
  const existing = db.prepare(`SELECT * FROM lists WHERE board_id = ? AND owner_user_id = ? LIMIT 1`).get(boardId, userId);
  if (existing) return existing;
  const user = selectUserById.get(userId);
  const maxPositionRow = db.prepare(`SELECT COALESCE(MAX(position), -1) AS max_position FROM lists WHERE board_id = ?`).get(boardId);
  const listId = uid();
  db.prepare(`INSERT INTO lists (id, board_id, name, position, owner_user_id) VALUES (?, ?, ?, ?, ?)`).run(listId, boardId, sanitizeText(user?.name || 'User'), maxPositionRow.max_position + 1, userId);
  return selectListById.get(listId);
}

function ensureDefaultLists(boardId, userId, workspaceId) {
  const memberIds = db.prepare(`SELECT user_id FROM board_members WHERE board_id = ? ORDER BY created_at ASC`).all(boardId).map((row) => row.user_id);
  let createdCount = 0;
  for (const memberId of memberIds) {
    const exists = db.prepare(`SELECT id FROM lists WHERE board_id = ? AND owner_user_id = ? LIMIT 1`).get(boardId, memberId);
    if (!exists) {
      ensurePersonalListForUser(boardId, memberId);
      createdCount += 1;
    }
  }
  if (createdCount > 0) {
    logActivity({ workspaceId, boardId, actorUserId: userId, actionType: 'board.seeded', details: { lists: createdCount } });
  }
}

function serveStatic(req, res, pathname) {
  let filePath = pathname === '/' ? path.join(publicDir, 'index.html') : path.join(publicDir, pathname);
  if (!filePath.startsWith(publicDir)) {
    notFound(res);
    return;
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(publicDir, 'index.html');
  }
  const ext = path.extname(filePath).toLowerCase();
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp'
  };
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    res.end(data);
  } catch (error) {
    sendJson(res, 500, { error: 'Failed to serve asset' });
  }
}

function handleSse(req, res, current, query) {
  const client = {
    id: uid(),
    userId: current.user.id,
    boardId: query.boardId || null,
    workspaceId: query.workspaceId || null,
    res,
    closed: false
  };
  sseClients.add(client);
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive'
  });
  res.write(`data: ${JSON.stringify({ type: 'connected', ts: nowIso() })}\n\n`);
  const interval = setInterval(() => {
    if (client.closed) return;
    try {
      res.write(`event: ping\ndata: ${Date.now()}\n\n`);
    } catch {
      client.closed = true;
    }
  }, 25000);
  req.on('close', () => {
    client.closed = true;
    clearInterval(interval);
    sseClients.delete(client);
  });
}

function respondError(res, error) {
  const message = error && error.message ? error.message : 'Unexpected error';
  const status = message === 'Authentication required' ? 401 : message.includes('denied') ? 403 : message.includes('not found') ? 404 : message.includes('Invalid') ? 400 : message.includes('required') ? 400 : message.includes('Payload too large') ? 413 : 500;
  sendJson(res, status, { error: message });
}

async function handleApi(req, res, pathname, query) {
  if (pathname === '/api/health' && req.method === 'GET') {
    return sendJson(res, 200, { ok: true, app: APP_NAME, now: nowIso() });
  }

  if (pathname === '/api/auth/register' && req.method === 'POST') {
    const body = await readBody(req);
    const name = sanitizeText(body.name);
    const email = sanitizeText(body.email).toLowerCase();
    const password = String(body.password || '');
    if (!name || !email || password.length < 6) throw new Error('Name, email, and password (min 6) are required');
    if (selectUserByEmail.get(email)) throw new Error('Email already exists');
    const id = uid();
    insertUser.run(id, name, email, hashPassword(password), pickColor(name));
    const workspaceId = uid();
    db.prepare(`INSERT INTO workspaces (id, name, owner_id) VALUES (?, ?, ?)`).run(workspaceId, 'My workspace', id);
    db.prepare(`INSERT INTO workspace_members (workspace_id, user_id, role) VALUES (?, ?, 'owner')`).run(workspaceId, id);
    const boardId = uid();
    db.prepare(`INSERT INTO boards (id, workspace_id, name, description, color, owner_id) VALUES (?, ?, ?, ?, ?, ?)`).run(boardId, workspaceId, 'My board', '', '#0f172a', id);
    db.prepare(`INSERT INTO board_members (board_id, user_id, role) VALUES (?, ?, 'owner')`).run(boardId, id);
    ensureDefaultLists(boardId, id, workspaceId);
    logActivity({ workspaceId, boardId, actorUserId: id, actionType: 'user.registered', details: { email } });
    const sessionId = uid();
    insertSession.run(sessionId, id, plusDays(SESSION_DAYS));
    setCookie(res, 'tt_session', sessionId, { maxAge: SESSION_DAYS * 24 * 60 * 60 });
    return sendJson(res, 201, { user: publicUser(selectUserById.get(id)), workspaces: getWorkspaceOverview(id) });
  }

  if (pathname === '/api/auth/login' && req.method === 'POST') {
    const body = await readBody(req);
    const email = sanitizeText(body.email).toLowerCase();
    const password = String(body.password || '');
    const user = selectUserByEmail.get(email);
    if (!user || !verifyPassword(password, user.password_hash)) throw new Error('Invalid email or password');
    const sessionId = uid();
    insertSession.run(sessionId, user.id, plusDays(SESSION_DAYS));
    setCookie(res, 'tt_session', sessionId, { maxAge: SESSION_DAYS * 24 * 60 * 60 });
    return sendJson(res, 200, { user: publicUser(user), workspaces: getWorkspaceOverview(user.id) });
  }

  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    const current = getCurrentUser(req);
    if (current) deleteSessionStmt.run(current.sessionId);
    clearCookie(res, 'tt_session');
    return sendJson(res, 200, { ok: true });
  }

  if (pathname === '/api/auth/me' && req.method === 'GET') {
    const current = getCurrentUser(req);
    if (!current) return sendJson(res, 200, { user: null });
    return sendJson(res, 200, { user: current.user, workspaces: getWorkspaceOverview(current.user.id) });
  }

  const current = requireUser(req, res);
  if (!current) return;

  if (pathname === '/api/profile' && req.method === 'GET') {
    const boardsCount = db.prepare(`SELECT COUNT(*) AS count FROM board_members WHERE user_id = ?`).get(current.user.id).count;
    const cardsCount = db.prepare(`SELECT COUNT(*) AS count FROM cards WHERE created_by = ?`).get(current.user.id).count;
    const workspacesCount = db.prepare(`SELECT COUNT(*) AS count FROM workspace_members WHERE user_id = ?`).get(current.user.id).count;
    return sendJson(res, 200, {
      user: publicUser(selectUserById.get(current.user.id)),
      stats: { workspacesCount, boardsCount, cardsCount }
    });
  }

  if (pathname === '/api/profile' && req.method === 'PATCH') {
    const body = await readBody(req);
    const name = sanitizeText(body.name, current.rawUser.name);
    const avatarColor = sanitizeText(body.avatarColor || current.rawUser.avatar_color || pickColor(name));
    const avatarData = typeof body.avatarData === 'string' ? body.avatarData.slice(0, 2 * 1024 * 1024) : (current.rawUser.avatar_data || '');
    if (!name) throw new Error('Name is required');
    db.prepare(`UPDATE users SET name = ?, avatar_color = ?, avatar_data = ? WHERE id = ?`).run(name, avatarColor, avatarData, current.user.id);
    return sendJson(res, 200, { user: publicUser(selectUserById.get(current.user.id)) });
  }

  if (pathname === '/api/events' && req.method === 'GET') {
    return handleSse(req, res, current, query);
  }

  if (pathname === '/api/dashboard' && req.method === 'GET') {
    return sendJson(res, 200, { user: current.user, workspaces: getWorkspaceOverview(current.user.id) });
  }

  if (pathname === '/api/workspaces' && req.method === 'POST') {
    const body = await readBody(req);
    const name = sanitizeText(body.name);
    if (!name) throw new Error('Workspace name is required');
    const workspaceId = uid();
    db.prepare(`INSERT INTO workspaces (id, name, owner_id) VALUES (?, ?, ?)`).run(workspaceId, name, current.user.id);
    db.prepare(`INSERT INTO workspace_members (workspace_id, user_id, role) VALUES (?, ?, 'owner')`).run(workspaceId, current.user.id);
    logActivity({ workspaceId, actorUserId: current.user.id, actionType: 'workspace.created', details: { name } });
    broadcast({ type: 'workspace.updated', workspaceId, userId: current.user.id });
    return sendJson(res, 201, { workspaces: getWorkspaceOverview(current.user.id) });
  }

  const workspaceMatch = pathname.match(/^\/api\/workspaces\/([^/]+)$/);
  if (workspaceMatch && req.method === 'PATCH') {
    const workspaceId = workspaceMatch[1];
    const check = requireWorkspaceMember(req, res, current.user.id, workspaceId);
    if (!check) return;
    const body = await readBody(req);
    const name = sanitizeText(body.name);
    if (!name) throw new Error('Workspace name is required');
    db.prepare(`UPDATE workspaces SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(name, workspaceId);
    logActivity({ workspaceId, actorUserId: current.user.id, actionType: 'workspace.renamed', details: { name } });
    broadcast({ type: 'workspace.updated', workspaceId, userId: current.user.id });
    return sendJson(res, 200, { workspaces: getWorkspaceOverview(current.user.id) });
  }

  const workspaceMembersMatch = pathname.match(/^\/api\/workspaces\/([^/]+)\/members$/);
  if (workspaceMembersMatch && req.method === 'POST') {
    const workspaceId = workspaceMembersMatch[1];
    const check = requireWorkspaceMember(req, res, current.user.id, workspaceId);
    if (!check) return;
    const body = await readBody(req);
    const email = sanitizeText(body.email).toLowerCase();
    const role = body.role === 'owner' ? 'owner' : 'member';
    if (!email) throw new Error('Email is required');
    const invitedUser = selectUserByEmail.get(email);
    if (!invitedUser) throw new Error('User with this email was not found. Ask them to register first.');
    db.prepare(`INSERT OR REPLACE INTO workspace_members (workspace_id, user_id, role, created_at) VALUES (?, ?, ?, COALESCE((SELECT created_at FROM workspace_members WHERE workspace_id = ? AND user_id = ?), CURRENT_TIMESTAMP))`).run(workspaceId, invitedUser.id, role, workspaceId, invitedUser.id);
    const boards = db.prepare(`SELECT id FROM boards WHERE workspace_id = ?`).all(workspaceId);
    for (const board of boards) {
      db.prepare(`INSERT OR IGNORE INTO board_members (board_id, user_id, role) VALUES (?, ?, 'member')`).run(board.id, invitedUser.id);
      ensureDefaultLists(board.id, current.user.id, workspaceId);
    }
    logActivity({ workspaceId, actorUserId: current.user.id, actionType: 'workspace.member_added', details: { email, role } });
    broadcast({ type: 'workspace.updated', workspaceId, userId: invitedUser.id });
    return sendJson(res, 200, { ok: true });
  }

  const workspaceBoardsMatch = pathname.match(/^\/api\/workspaces\/([^/]+)\/boards$/);
  if (workspaceBoardsMatch && req.method === 'POST') {
    const workspaceId = workspaceBoardsMatch[1];
    const check = requireWorkspaceMember(req, res, current.user.id, workspaceId);
    if (!check) return;
    const body = await readBody(req);
    const name = sanitizeText(body.name);
    const description = sanitizeText(body.description);
    const color = sanitizeText(body.color || '#0f172a');
    if (!name) throw new Error('Board name is required');
    const boardId = uid();
    db.prepare(`INSERT INTO boards (id, workspace_id, name, description, color, owner_id) VALUES (?, ?, ?, ?, ?, ?)`).run(boardId, workspaceId, name, description, color, current.user.id);
    const members = db.prepare(`SELECT user_id FROM workspace_members WHERE workspace_id = ?`).all(workspaceId);
    for (const member of members) {
      db.prepare(`INSERT OR IGNORE INTO board_members (board_id, user_id, role) VALUES (?, ?, ?)`).run(boardId, member.user_id, member.user_id === current.user.id ? 'owner' : 'member');
    }
    ensureDefaultLists(boardId, current.user.id, workspaceId);
    logActivity({ workspaceId, boardId, actorUserId: current.user.id, actionType: 'board.created', details: { name } });
    broadcast({ type: 'board.updated', workspaceId, boardId, userId: current.user.id });
    return sendJson(res, 201, { board: getBoardPayload(boardId, current.user.id) });
  }

  const boardMatch = pathname.match(/^\/api\/boards\/([^/]+)$/);
  if (boardMatch && req.method === 'GET') {
    const boardId = boardMatch[1];
    const check = requireBoardMember(req, res, current.user.id, boardId);
    if (!check) return;
    return sendJson(res, 200, getBoardPayload(boardId, current.user.id));
  }

  if (boardMatch && req.method === 'PATCH') {
    const boardId = boardMatch[1];
    const check = requireBoardMember(req, res, current.user.id, boardId);
    if (!check) return;
    if (!isBoardAdmin(check, current.user.id)) return sendJson(res, 403, { error: 'Only admin or owner can edit the board' });
    const body = await readBody(req);
    const name = sanitizeText(body.name, check.board.name);
    const description = String(body.description ?? check.board.description ?? '');
    const color = sanitizeText(body.color || check.board.color || '#0f172a');
    db.prepare(`UPDATE boards SET name = ?, description = ?, color = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(name, description, color, boardId);
    logActivity({ workspaceId: check.workspace.id, boardId, actorUserId: current.user.id, actionType: 'board.updated', details: { name } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId, userId: current.user.id });
    return sendJson(res, 200, getBoardPayload(boardId, current.user.id));
  }

  const boardActivityMatch = pathname.match(/^\/api\/boards\/([^/]+)\/activity$/);
  if (boardActivityMatch && req.method === 'GET') {
    const boardId = boardActivityMatch[1];
    const check = requireBoardMember(req, res, current.user.id, boardId);
    if (!check) return;
    return sendJson(res, 200, { activity: getBoardPayload(boardId, current.user.id).activity });
  }

  const boardReorderMatch = pathname.match(/^\/api\/boards\/([^/]+)\/reorder$/);
  if (boardReorderMatch && req.method === 'POST') {
    const boardId = boardReorderMatch[1];
    const check = requireBoardMember(req, res, current.user.id, boardId);
    if (!check) return;
    const body = await readBody(req);
    const lists = Array.isArray(body.lists) ? body.lists : [];
    const cards = Array.isArray(body.cards) ? body.cards : [];
    if (lists.length && !isWorkspaceOwner(check, current.user.id)) {
      return sendJson(res, 403, { error: 'Only the workspace owner can reorder lists' });
    }
    db.exec('BEGIN');
    try {
      for (const item of lists) {
        db.prepare(`UPDATE lists SET position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND board_id = ?`).run(toNumber(item.position), item.id, boardId);
      }
      for (const item of cards) {
        const card = selectCardById.get(item.id);
        const targetList = selectListById.get(item.listId);
        if (!card || card.board_id !== boardId) throw new Error('Card not found');
        if (!targetList || targetList.board_id !== boardId) throw new Error('Target list not found');
        if (!canManageCard(check, card, current.user.id) || !canManageList(check, targetList, current.user.id)) {
          throw new Error('You can only move cards inside your own list');
        }
        db.prepare(`UPDATE cards SET list_id = ?, position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND board_id = ?`).run(item.listId, toNumber(item.position), item.id, boardId);
      }
      db.exec('COMMIT');
    } catch (error) {
      db.exec('ROLLBACK');
      throw error;
    }
    logActivity({ workspaceId: check.workspace.id, boardId, actorUserId: current.user.id, actionType: 'board.reordered', details: { lists: lists.length, cards: cards.length } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId, userId: current.user.id });
    return sendJson(res, 200, getBoardPayload(boardId, current.user.id));
  }

  const boardMembersMatch = pathname.match(/^\/api\/boards\/([^/]+)\/members$/);
  if (boardMembersMatch && req.method === 'GET') {
    const boardId = boardMembersMatch[1];
    const check = requireBoardMember(req, res, current.user.id, boardId);
    if (!check) return;
    return sendJson(res, 200, { members: getBoardMembers(boardId) });
  }

  if (boardMembersMatch && req.method === 'POST') {
    const boardId = boardMembersMatch[1];
    const check = requireBoardMember(req, res, current.user.id, boardId);
    if (!check) return;
    if (!isBoardAdmin(check, current.user.id)) return sendJson(res, 403, { error: 'Only admin or owner can manage participants' });
    const body = await readBody(req);
    const email = sanitizeText(body.email).toLowerCase();
    const role = body.role === 'admin' ? 'admin' : 'member';
    if (!email) throw new Error('Email is required');
    const invitedUser = selectUserByEmail.get(email);
    if (!invitedUser) throw new Error('User with this email was not found. Ask them to register first.');
    db.prepare(`INSERT OR IGNORE INTO workspace_members (workspace_id, user_id, role) VALUES (?, ?, 'member')`).run(check.workspace.id, invitedUser.id);
    db.prepare(`INSERT OR REPLACE INTO board_members (board_id, user_id, role, created_at) VALUES (?, ?, ?, COALESCE((SELECT created_at FROM board_members WHERE board_id = ? AND user_id = ?), CURRENT_TIMESTAMP))`).run(boardId, invitedUser.id, role, boardId, invitedUser.id);
    ensureDefaultLists(boardId, current.user.id, check.workspace.id);
    logActivity({ workspaceId: check.workspace.id, boardId, actorUserId: current.user.id, actionType: 'board.member_added', details: { email, role } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId, userId: invitedUser.id });
    return sendJson(res, 200, { members: getBoardMembers(boardId) });
  }

  const boardMemberRoleMatch = pathname.match(/^\/api\/boards\/([^/]+)\/members\/([^/]+)$/);
  if (boardMemberRoleMatch && req.method === 'PATCH') {
    const boardId = boardMemberRoleMatch[1];
    const targetUserId = boardMemberRoleMatch[2];
    const check = requireBoardMember(req, res, current.user.id, boardId);
    if (!check) return;
    if (!isBoardAdmin(check, current.user.id)) return sendJson(res, 403, { error: 'Only admin or owner can manage participants' });
    const body = await readBody(req);
    const targetUser = selectUserById.get(targetUserId);
    if (!targetUser) throw new Error('User not found');
    const targetWorkspaceMembership = selectWorkspaceMembership.get(check.workspace.id, targetUserId);
    const nextRole = (body.role === 'admin' && targetWorkspaceMembership?.role !== 'owner') ? 'admin' : (targetWorkspaceMembership?.role === 'owner' ? 'owner' : 'member');
    db.prepare(`INSERT OR REPLACE INTO board_members (board_id, user_id, role, created_at) VALUES (?, ?, ?, COALESCE((SELECT created_at FROM board_members WHERE board_id = ? AND user_id = ?), CURRENT_TIMESTAMP))`).run(boardId, targetUserId, nextRole, boardId, targetUserId);
    logActivity({ workspaceId: check.workspace.id, boardId, actorUserId: current.user.id, actionType: 'board.updated', details: { memberRoleChangedFor: targetUser.email, role: nextRole } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId, userId: targetUserId });
    return sendJson(res, 200, { members: getBoardMembers(boardId) });
  }

  const boardListsMatch = pathname.match(/^\/api\/boards\/([^/]+)\/lists$/);
  if (boardListsMatch && req.method === 'POST') {
    const boardId = boardListsMatch[1];
    const check = requireBoardMember(req, res, current.user.id, boardId);
    if (!check) return;
    if (!isBoardAdmin(check, current.user.id)) return sendJson(res, 403, { error: 'Only admin or owner can add lists' });
    const body = await readBody(req);
    const name = sanitizeText(body.name);
    const ownerUserIdRaw = sanitizeText(body.ownerUserId || '');
    const ownerUserId = ownerUserIdRaw || null;
    if (!name) throw new Error('List name is required');
    if (ownerUserId) {
      const member = selectBoardMembership.get(boardId, ownerUserId);
      if (!member) throw new Error('Selected user is not a board participant');
    }
    const maxPositionRow = db.prepare(`SELECT COALESCE(MAX(position), -1) AS max_position FROM lists WHERE board_id = ?`).get(boardId);
    const listId = uid();
    db.prepare(`INSERT INTO lists (id, board_id, name, position, owner_user_id) VALUES (?, ?, ?, ?, ?)`).run(listId, boardId, name, maxPositionRow.max_position + 1, ownerUserId);
    logActivity({ workspaceId: check.workspace.id, boardId, actorUserId: current.user.id, actionType: 'list.created', details: { listId, name } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId, userId: current.user.id });
    return sendJson(res, 201, getBoardPayload(boardId, current.user.id));
  }

  const listColorMatch = pathname.match(/^\/api\/lists\/([^/]+)\/color$/);
  if (listColorMatch && req.method === 'PATCH') {
    const listId = listColorMatch[1];
    const list = selectListById.get(listId);
    if (!list) throw new Error('List not found');
    const check = requireBoardMember(req, res, current.user.id, list.board_id);
    if (!check) return;
    const body = await readBody(req);

    const color = sanitizeText(body.color || '');
    if (color && !/^#[0-9a-fA-F]{6}$/.test(color)) {
      return sendJson(res, 400, { error: 'Invalid list color' });
    }

    db.prepare(`UPDATE lists SET color = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(color, listId);
    logActivity({ workspaceId: check.workspace.id, boardId: list.board_id, actorUserId: current.user.id, actionType: 'list.color_updated', details: { listId, color } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: list.board_id, userId: current.user.id });

    const listColors = Object.fromEntries(db.prepare(`
      SELECT id, color
      FROM lists
      WHERE board_id = ? AND color != ''
    `).all(list.board_id).map((row) => [row.id, row.color]));

    return sendJson(res, 200, { ok: true, color, listColors, userListColors: listColors });
  }

  const listMatch = pathname.match(/^\/api\/lists\/([^/]+)$/);
  if (listMatch && req.method === 'PATCH') {
    const listId = listMatch[1];
    const list = selectListById.get(listId);
    if (!list) throw new Error('List not found');
    const check = requireBoardMember(req, res, current.user.id, list.board_id);
    if (!check) return;
    if (!isBoardAdmin(check, current.user.id)) return sendJson(res, 403, { error: 'Only admin or owner can edit lists' });
    const body = await readBody(req);
    const name = sanitizeText(body.name, list.name);
    const ownerUserIdRaw = sanitizeText(body.ownerUserId ?? list.owner_user_id ?? '');
    const ownerUserId = ownerUserIdRaw || null;
    if (!name) throw new Error('List name is required');
    if (ownerUserId) {
      const member = selectBoardMembership.get(list.board_id, ownerUserId);
      if (!member) throw new Error('Selected user is not a board participant');
    }
    db.prepare(`UPDATE lists SET name = ?, owner_user_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(name, ownerUserId, listId);
    logActivity({ workspaceId: check.workspace.id, boardId: list.board_id, actorUserId: current.user.id, actionType: 'list.updated', details: { listId, name, ownerUserId } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: list.board_id, userId: current.user.id });
    return sendJson(res, 200, getBoardPayload(list.board_id, current.user.id));
  }

  if (listMatch && req.method === 'DELETE') {
    const listId = listMatch[1];
    const list = selectListById.get(listId);
    if (!list) throw new Error('List not found');
    const check = requireBoardMember(req, res, current.user.id, list.board_id);
    if (!check) return;
    if (!isBoardAdmin(check, current.user.id)) return sendJson(res, 403, { error: 'Only admin or owner can delete lists' });
    const cardCount = db.prepare(`SELECT COUNT(*) AS total FROM cards WHERE list_id = ?`).get(listId).total;
    if (cardCount > 0) return sendJson(res, 400, { error: 'Before deleting the list, move or delete all cards inside it' });
    db.prepare(`DELETE FROM lists WHERE id = ?`).run(listId);
    logActivity({ workspaceId: check.workspace.id, boardId: list.board_id, actorUserId: current.user.id, actionType: 'list.deleted', details: { listId, name: list.name } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: list.board_id, userId: current.user.id });
    return sendJson(res, 200, getBoardPayload(list.board_id, current.user.id));
  }

  if (pathname === '/api/cards' && req.method === 'POST') {
    const body = await readBody(req);
    const boardId = sanitizeText(body.boardId);
    const listId = sanitizeText(body.listId);
    const title = sanitizeText(body.title);
    if (!boardId || !listId || !title) throw new Error('boardId, listId and title are required');
    const check = requireBoardMember(req, res, current.user.id, boardId);
    if (!check) return;
    const list = selectListById.get(listId);
    if (!list || list.board_id !== boardId) throw new Error('List not found');
    if (!canManageList(check, list, current.user.id)) return sendJson(res, 403, { error: 'You can only create cards in your own list' });
    const maxPositionRow = db.prepare(`SELECT COALESCE(MAX(position), -1) AS max_position FROM cards WHERE list_id = ?`).get(listId);
    const cardId = uid();
    db.prepare(`
      INSERT INTO cards (id, board_id, list_id, title, position, is_completed, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(cardId, boardId, listId, title, maxPositionRow.max_position + 1, 0, current.user.id);
    logActivity({ workspaceId: check.workspace.id, boardId, cardId, actorUserId: current.user.id, actionType: 'card.created', details: { title } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId, userId: current.user.id });
    return sendJson(res, 201, getCardDetail(cardId));
  }

  const cardMatch = pathname.match(/^\/api\/cards\/([^/]+)$/);
  if (cardMatch && req.method === 'GET') {
    const cardId = cardMatch[1];
    const card = selectCardById.get(cardId);
    if (!card) throw new Error('Card not found');
    const check = requireBoardMember(req, res, current.user.id, card.board_id);
    if (!check) return;
    return sendJson(res, 200, getCardDetail(cardId));
  }

  if (cardMatch && req.method === 'PATCH') {
    const cardId = cardMatch[1];
    const card = selectCardById.get(cardId);
    if (!card) throw new Error('Card not found');
    const check = requireBoardMember(req, res, current.user.id, card.board_id);
    if (!check) return;
    if (!canManageCard(check, card, current.user.id)) return sendJson(res, 403, { error: 'You can only manage cards in your own list' });
    const body = await readBody(req);
    const title = sanitizeText(body.title, card.title);
    if (!title) throw new Error('Card title is required');
    const description = String(body.description ?? card.description ?? '');
    const labels = parseLabels(body.labels ?? JSON.parse(card.labels_json || '[]'));
    const assigneeUserId = sanitizeText(body.assigneeUserId || card.assignee_user_id || '') || null;
    const dueDate = body.dueDate === '' ? null : parseOptionalDate(body.dueDate) ?? card.due_date;
    const startDate = body.startDate === '' ? null : parseOptionalDate(body.startDate) ?? card.start_date;
    const listId = sanitizeText(body.listId || card.list_id);
    const targetList = selectListById.get(listId);
    if (!targetList || targetList.board_id !== card.board_id) throw new Error('List not found');
    if (!canManageList(check, targetList, current.user.id)) return sendJson(res, 403, { error: 'You can only move cards inside your own list' });
    const position = body.position !== undefined ? toNumber(body.position, card.position) : card.position;
    const isCompleted = body.isCompleted === undefined ? card.is_completed : (body.isCompleted ? 1 : 0);
    db.prepare(`
      UPDATE cards
      SET title = ?, description = ?, labels_json = ?, assignee_user_id = ?, due_date = ?, start_date = ?, list_id = ?, position = ?, is_completed = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(title, description, JSON.stringify(labels), assigneeUserId, dueDate, startDate, listId, position, isCompleted, cardId);
    logActivity({ workspaceId: check.workspace.id, boardId: card.board_id, cardId, actorUserId: current.user.id, actionType: 'card.updated', details: { title, isCompleted: Boolean(isCompleted) } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: card.board_id, userId: current.user.id });
    return sendJson(res, 200, getCardDetail(cardId));
  }

  if (cardMatch && req.method === 'DELETE') {
    const cardId = cardMatch[1];
    const card = selectCardById.get(cardId);
    if (!card) throw new Error('Card not found');
    const check = requireBoardMember(req, res, current.user.id, card.board_id);
    if (!check) return;
    if (!canManageCard(check, card, current.user.id)) return sendJson(res, 403, { error: 'You can only manage cards in your own list' });
    db.prepare(`DELETE FROM cards WHERE id = ?`).run(cardId);
    logActivity({ workspaceId: check.workspace.id, boardId: card.board_id, actorUserId: current.user.id, actionType: 'card.deleted', details: { title: card.title } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: card.board_id, userId: current.user.id });
    return sendJson(res, 200, { ok: true });
  }

  const commentsMatch = pathname.match(/^\/api\/cards\/([^/]+)\/comments$/);
  if (commentsMatch && req.method === 'POST') {
    const cardId = commentsMatch[1];
    const card = selectCardById.get(cardId);
    if (!card) throw new Error('Card not found');
    const check = requireBoardMember(req, res, current.user.id, card.board_id);
    if (!check) return;
    if (!canManageCard(check, card, current.user.id)) return sendJson(res, 403, { error: 'You can only manage cards in your own list' });
    const body = await readBody(req);
    const content = sanitizeText(body.content);
    if (!content) throw new Error('Comment is required');
    db.prepare(`INSERT INTO card_comments (id, card_id, user_id, content) VALUES (?, ?, ?, ?)`).run(uid(), cardId, current.user.id, content);
    logActivity({ workspaceId: check.workspace.id, boardId: card.board_id, cardId, actorUserId: current.user.id, actionType: 'comment.created', details: { content } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: card.board_id, userId: current.user.id });
    return sendJson(res, 201, getCardDetail(cardId));
  }

  const checklistMatch = pathname.match(/^\/api\/cards\/([^/]+)\/checklist-items$/);
  if (checklistMatch && req.method === 'POST') {
    const cardId = checklistMatch[1];
    const card = selectCardById.get(cardId);
    if (!card) throw new Error('Card not found');
    const check = requireBoardMember(req, res, current.user.id, card.board_id);
    if (!check) return;
    if (!canManageCard(check, card, current.user.id)) return sendJson(res, 403, { error: 'You can only manage cards in your own list' });
    const body = await readBody(req);
    const title = sanitizeText(body.title);
    if (!title) throw new Error('Checklist item title is required');
    const maxPositionRow = db.prepare(`SELECT COALESCE(MAX(position), -1) AS max_position FROM card_checklist_items WHERE card_id = ?`).get(cardId);
    db.prepare(`INSERT INTO card_checklist_items (id, card_id, title, position) VALUES (?, ?, ?, ?)`).run(uid(), cardId, title, maxPositionRow.max_position + 1);
    logActivity({ workspaceId: check.workspace.id, boardId: card.board_id, cardId, actorUserId: current.user.id, actionType: 'checklist.created', details: { title } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: card.board_id, userId: current.user.id });
    return sendJson(res, 201, getCardDetail(cardId));
  }

  const checklistItemMatch = pathname.match(/^\/api\/checklist-items\/([^/]+)$/);
  if (checklistItemMatch && req.method === 'PATCH') {
    const itemId = checklistItemMatch[1];
    const item = db.prepare(`SELECT * FROM card_checklist_items WHERE id = ?`).get(itemId);
    if (!item) throw new Error('Checklist item not found');
    const card = selectCardById.get(item.card_id);
    const check = requireBoardMember(req, res, current.user.id, card.board_id);
    if (!check) return;
    if (!canManageCard(check, card, current.user.id)) return sendJson(res, 403, { error: 'You can only manage cards in your own list' });
    const body = await readBody(req);
    const title = sanitizeText(body.title, item.title);
    const isDone = body.isDone === undefined ? item.is_done : (body.isDone ? 1 : 0);
    const dueDate = body.dueDate === '' ? null : parseOptionalDate(body.dueDate) ?? item.due_date;
    const assigneeUserId = body.assigneeUserId === '' ? null : sanitizeText(body.assigneeUserId || item.assignee_user_id || '') || null;
    const position = body.position !== undefined ? toNumber(body.position, item.position) : item.position;
    db.prepare(`UPDATE card_checklist_items SET title = ?, is_done = ?, due_date = ?, assignee_user_id = ?, position = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`).run(title, isDone, dueDate, assigneeUserId, position, itemId);
    logActivity({ workspaceId: check.workspace.id, boardId: card.board_id, cardId: card.id, actorUserId: current.user.id, actionType: 'checklist.updated', details: { title, isDone: Boolean(isDone) } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: card.board_id, userId: current.user.id });
    return sendJson(res, 200, getCardDetail(card.id));
  }

  if (checklistItemMatch && req.method === 'DELETE') {
    const itemId = checklistItemMatch[1];
    const item = db.prepare(`SELECT * FROM card_checklist_items WHERE id = ?`).get(itemId);
    if (!item) throw new Error('Checklist item not found');
    const card = selectCardById.get(item.card_id);
    const check = requireBoardMember(req, res, current.user.id, card.board_id);
    if (!check) return;
    if (!canManageCard(check, card, current.user.id)) return sendJson(res, 403, { error: 'You can only manage cards in your own list' });
    db.prepare(`DELETE FROM card_checklist_items WHERE id = ?`).run(itemId);
    logActivity({ workspaceId: check.workspace.id, boardId: card.board_id, cardId: card.id, actorUserId: current.user.id, actionType: 'checklist.deleted', details: { title: item.title } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: card.board_id, userId: current.user.id });
    return sendJson(res, 200, getCardDetail(card.id));
  }

  const attachmentsMatch = pathname.match(/^\/api\/cards\/([^/]+)\/attachments$/);
  if (attachmentsMatch && req.method === 'POST') {
    const cardId = attachmentsMatch[1];
    const card = selectCardById.get(cardId);
    if (!card) throw new Error('Card not found');
    const check = requireBoardMember(req, res, current.user.id, card.board_id);
    if (!check) return;
    if (!canManageCard(check, card, current.user.id)) return sendJson(res, 403, { error: 'You can only manage cards in your own list' });
    const body = await readBody(req);
    const kind = body.kind === 'file' ? 'file' : 'link';
    const name = sanitizeText(body.name || (kind === 'link' ? body.url : 'attachment'));
    if (!name) throw new Error('Attachment name is required');
    let mimeType = sanitizeText(body.mimeType || 'application/octet-stream');
    let sizeBytes = 0;
    let dataBase64 = null;
    let targetUrl = null;
    if (kind === 'file') {
      dataBase64 = String(body.dataBase64 || '');
      if (!dataBase64) throw new Error('File payload is required');
      sizeBytes = Buffer.from(dataBase64, 'base64').byteLength;
      if (sizeBytes > ATTACHMENT_LIMIT_BYTES) throw new Error(`File is too large. Limit is ${ATTACHMENT_LIMIT_MB} MB`);
    } else {
      targetUrl = sanitizeText(body.url);
      if (!/^https?:\/\//i.test(targetUrl)) throw new Error('Valid URL is required');
      mimeType = 'text/uri-list';
    }
    db.prepare(`INSERT INTO card_attachments (id, card_id, name, mime_type, kind, size_bytes, data_base64, url, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(uid(), cardId, name, mimeType, kind, sizeBytes, dataBase64, targetUrl, current.user.id);
    logActivity({ workspaceId: check.workspace.id, boardId: card.board_id, cardId, actorUserId: current.user.id, actionType: 'attachment.created', details: { name, kind } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: card.board_id, userId: current.user.id });
    return sendJson(res, 201, getCardDetail(cardId));
  }

  const attachmentDownloadMatch = pathname.match(/^\/api\/attachments\/([^/]+)\/download$/);
  if (attachmentDownloadMatch && req.method === 'GET') {
    const attachmentId = attachmentDownloadMatch[1];
    const attachment = db.prepare(`SELECT a.*, c.board_id FROM card_attachments a JOIN cards c ON c.id = a.card_id WHERE a.id = ?`).get(attachmentId);
    if (!attachment) throw new Error('Attachment not found');
    const check = requireBoardMember(req, res, current.user.id, attachment.board_id);
    if (!check) return;
    if (attachment.kind !== 'file' || !attachment.data_base64) throw new Error('Only uploaded files can be downloaded');
    const buffer = Buffer.from(attachment.data_base64, 'base64');
    res.writeHead(200, {
      'Content-Type': attachment.mime_type || 'application/octet-stream',
      'Content-Length': buffer.length,
      'Content-Disposition': `attachment; filename="${attachment.name.replace(/"/g, '')}"`
    });
    return res.end(buffer);
  }

  const attachmentMatch = pathname.match(/^\/api\/attachments\/([^/]+)$/);
  if (attachmentMatch && req.method === 'DELETE') {
    const attachmentId = attachmentMatch[1];
    const attachment = db.prepare(`SELECT a.*, c.board_id, c.id as card_id FROM card_attachments a JOIN cards c ON c.id = a.card_id WHERE a.id = ?`).get(attachmentId);
    if (!attachment) throw new Error('Attachment not found');
    const check = requireBoardMember(req, res, current.user.id, attachment.board_id);
    if (!check) return;
    const attachmentCard = selectCardById.get(attachment.card_id);
    if (!canManageCard(check, attachmentCard, current.user.id)) return sendJson(res, 403, { error: 'You can only manage cards in your own list' });
    db.prepare(`DELETE FROM card_attachments WHERE id = ?`).run(attachmentId);
    logActivity({ workspaceId: check.workspace.id, boardId: attachment.board_id, cardId: attachment.card_id, actorUserId: current.user.id, actionType: 'attachment.deleted', details: { name: attachment.name } });
    broadcast({ type: 'board.updated', workspaceId: check.workspace.id, boardId: attachment.board_id, userId: current.user.id });
    return sendJson(res, 200, getCardDetail(attachment.card_id));
  }

  return notFound(res);
}

const server = http.createServer(async (req, res) => {
  try {
    const parsed = url.parse(req.url, true);
    const pathname = parsed.pathname || '/';
    if (pathname.startsWith('/api/')) {
      return await handleApi(req, res, pathname, parsed.query || {});
    }
    return serveStatic(req, res, pathname);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) return respondError(res, error);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} running on http://localhost:${PORT}`);
  console.log(`Database: ${DB_PATH}`);
});
