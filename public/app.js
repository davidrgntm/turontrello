const app = document.getElementById('app');
const modalRoot = document.getElementById('modal-root');
const toastRoot = document.getElementById('toast-root');

const messages = {
  uz: {
    appName: 'TuronTrello',
    authTitle: 'Ishlarni oddiy boshqaring',
    authSubtitle: 'Board, list va card bilan ishlang.',
    login: 'Kirish',
    register: 'Ro‘yxatdan o‘tish',
    name: 'Ism',
    email: 'Email',
    password: 'Parol',
    logout: 'Chiqish',
    workspaces: 'Workspacelar',
    createWorkspace: 'Workspace yaratish',
    workspaceName: 'Workspace nomi',
    createBoard: 'Board yaratish',
    boardName: 'Board nomi',
    open: 'Ochish',
    boards: 'board',
    noBoards: 'Board yo‘q',
    save: 'Saqlash',
    cancel: 'Bekor qilish',
    back: 'Orqaga',
    search: 'Qidiruv',
    searchPlaceholder: 'Card qidirish',
    label: 'Label',
    labelPlaceholder: 'Label',
    assignee: 'Mas’ul',
    allMembers: 'Barchasi',
    addList: 'List qo‘shish',
    listName: 'List nomi',
    newCard: 'Card qo‘shish',
    cardTitle: 'Card nomi',
    description: 'Tavsif',
    labels: 'Labellar',
    labelsHint: 'vergul bilan',
    unassigned: 'Biriktirilmagan',
    startDate: 'Boshlanish',
    dueDate: 'Muddat',
    list: 'List',
    completed: 'Bajarilgan',
    saveCard: 'Cardni saqlash',
    deleteCard: 'Cardni o‘chirish',
    close: 'Yopish',
    checklist: 'Checklist',
    newChecklistItem: 'Yangi checklist elementi',
    add: 'Qo‘shish',
    comments: 'Izohlar',
    writeComment: 'Izoh yozing',
    addComment: 'Izoh qo‘shish',
    attachments: 'Fayllar',
    link: 'Link',
    file: 'Fayl',
    addLink: 'Link qo‘shish',
    uploadFile: 'Fayl yuklash',
    noAttachments: 'Fayl yo‘q',
    noComments: 'Izoh yo‘q',
    emptyChecklist: 'Checklist bo‘sh',
    activity: 'Faollik',
    noCards: 'Card yo‘q',
    noResults: 'Hech narsa topilmadi',
    saveSuccess: 'Saqlandi',
    createdSuccess: 'Yaratildi',
    deletedSuccess: 'O‘chirildi',
    loginSuccess: 'Kirish muvaffaqiyatli',
    registerSuccess: 'Akkaunt yaratildi',
    confirmDeleteCard: 'Card o‘chirilsinmi?',
    dueSoon: '24 soatdan kam qoldi',
    overdue: 'Muddati o‘tgan',
    noDate: 'Sanasiz',
    loading: 'Yuklanmoqda...',
    members: 'A’zolar',
    noActivity: 'Faollik yo‘q',
    create: 'Yaratish',
    edit: 'Tahrirlash',
    delete: 'O‘chirish',
    today: 'Bugun',
    language: 'Til',
    done: 'Tayyor',
    addBoard: 'Board qo‘shish',
    addWorkspace: 'Workspace qo‘shish',
    addListInline: 'List qo‘shish',
    saveList: 'Listni saqlash',
    saveWorkspace: 'Workspace saqlash',
    saveBoard: 'Board saqlash',
    saveCardInline: 'Card saqlash',
    writeCardTitle: 'Card nomini yozing',
    dashboardEmpty: 'Hali workspace yo‘q',
    boardEmpty: 'Bu yerda hali hech narsa yo‘q',
    createdAt: 'Yaratilgan',
    rename: 'Nomlash',
    update: 'Yangilash',
    commentCreated: 'Izoh qo‘shildi',
    attachmentAdded: 'Fayl qo‘shildi',
    checklistAdded: 'Checklist elementi qo‘shildi',
    fileHint: 'Kichik fayl yuklash mumkin',
    defaultWorkspace: 'Mening workspaceim',
    defaultBoard: 'Mening boardim',
    defaultList_backlog: 'Reja',
    defaultList_in_progress: 'Jarayonda',
    defaultList_done: 'Tayyor',
    action_workspace_created: 'workspace yaratdi',
    action_workspace_renamed: 'workspace nomini o‘zgartirdi',
    action_workspace_member_added: 'workspacega a’zo qo‘shdi',
    action_board_created: 'board yaratdi',
    action_board_updated: 'boardni yangiladi',
    action_board_seeded: 'standart listlarni yaratdi',
    action_board_reordered: 'tartibni o‘zgartirdi',
    action_board_member_added: 'boardga a’zo qo‘shdi',
    action_list_created: 'list yaratdi',
    action_list_updated: 'listni yangiladi',
    action_list_deleted: 'listni o‘chirdi',
    action_card_created: 'card yaratdi',
    action_card_updated: 'cardni yangiladi',
    action_card_deleted: 'cardni o‘chirdi',
    action_comment_created: 'izoh qoldirdi',
    action_checklist_created: 'checklist elementi qo‘shdi',
    action_checklist_updated: 'checklistni yangiladi',
    action_checklist_deleted: 'checklist elementini o‘chirdi',
    action_attachment_created: 'fayl qo‘shdi',
    action_attachment_deleted: 'faylni o‘chirdi',
    addMember: 'A‘zo qo‘shish',
    memberEmail: 'Foydalanuvchi emaili',
    memberAdded: 'A‘zo qo‘shildi',
    owner: 'Egasi',
    member: 'A‘zo',
    inviteHint: 'Ro‘yxatdan o‘tgan emailni kiriting',
    boardMembers: 'Board a‘zolari'
  },
  ru: {
    appName: 'TuronTrello',
    authTitle: 'Управляйте задачами просто',
    authSubtitle: 'Работайте через board, list и card.',
    login: 'Войти',
    register: 'Регистрация',
    name: 'Имя',
    email: 'Email',
    password: 'Пароль',
    logout: 'Выйти',
    workspaces: 'Рабочие пространства',
    createWorkspace: 'Создать workspace',
    workspaceName: 'Название workspace',
    createBoard: 'Создать board',
    boardName: 'Название board',
    open: 'Открыть',
    boards: 'board',
    noBoards: 'Нет board',
    save: 'Сохранить',
    cancel: 'Отмена',
    back: 'Назад',
    search: 'Поиск',
    searchPlaceholder: 'Поиск card',
    label: 'Label',
    labelPlaceholder: 'Label',
    assignee: 'Ответственный',
    allMembers: 'Все',
    addList: 'Добавить list',
    listName: 'Название list',
    newCard: 'Добавить card',
    cardTitle: 'Название card',
    description: 'Описание',
    labels: 'Labels',
    labelsHint: 'через запятую',
    unassigned: 'Не назначено',
    startDate: 'Старт',
    dueDate: 'Срок',
    list: 'List',
    completed: 'Выполнено',
    saveCard: 'Сохранить card',
    deleteCard: 'Удалить card',
    close: 'Закрыть',
    checklist: 'Checklist',
    newChecklistItem: 'Новый пункт checklist',
    add: 'Добавить',
    comments: 'Комментарии',
    writeComment: 'Напишите комментарий',
    addComment: 'Добавить комментарий',
    attachments: 'Файлы',
    link: 'Ссылка',
    file: 'Файл',
    addLink: 'Добавить ссылку',
    uploadFile: 'Загрузить файл',
    noAttachments: 'Нет файлов',
    noComments: 'Нет комментариев',
    emptyChecklist: 'Checklist пуст',
    activity: 'Активность',
    noCards: 'Нет card',
    noResults: 'Ничего не найдено',
    saveSuccess: 'Сохранено',
    createdSuccess: 'Создано',
    deletedSuccess: 'Удалено',
    loginSuccess: 'Вход выполнен',
    registerSuccess: 'Аккаунт создан',
    confirmDeleteCard: 'Удалить card?',
    dueSoon: 'Осталось меньше 24 часов',
    overdue: 'Срок истёк',
    noDate: 'Без даты',
    loading: 'Загрузка...',
    members: 'Участники',
    noActivity: 'Нет активности',
    create: 'Создать',
    edit: 'Изменить',
    delete: 'Удалить',
    today: 'Сегодня',
    language: 'Язык',
    done: 'Готово',
    addBoard: 'Добавить board',
    addWorkspace: 'Добавить workspace',
    addListInline: 'Добавить list',
    saveList: 'Сохранить list',
    saveWorkspace: 'Сохранить workspace',
    saveBoard: 'Сохранить board',
    saveCardInline: 'Сохранить card',
    writeCardTitle: 'Введите название card',
    dashboardEmpty: 'Пока нет workspace',
    boardEmpty: 'Здесь пока пусто',
    createdAt: 'Создано',
    rename: 'Переименовать',
    update: 'Обновить',
    commentCreated: 'Комментарий добавлен',
    attachmentAdded: 'Файл добавлен',
    checklistAdded: 'Пункт checklist добавлен',
    fileHint: 'Можно загружать маленькие файлы',
    defaultWorkspace: 'Мой workspace',
    defaultBoard: 'Мой board',
    defaultList_backlog: 'План',
    defaultList_in_progress: 'В работе',
    defaultList_done: 'Готово',
    action_workspace_created: 'создал workspace',
    action_workspace_renamed: 'переименовал workspace',
    action_workspace_member_added: 'добавил участника в workspace',
    action_board_created: 'создал board',
    action_board_updated: 'обновил board',
    action_board_seeded: 'создал стандартные lists',
    action_board_reordered: 'изменил порядок',
    action_board_member_added: 'добавил участника в board',
    action_list_created: 'создал list',
    action_list_updated: 'обновил list',
    action_list_deleted: 'удалил list',
    action_card_created: 'создал card',
    action_card_updated: 'обновил card',
    action_card_deleted: 'удалил card',
    action_comment_created: 'оставил комментарий',
    action_checklist_created: 'добавил пункт checklist',
    action_checklist_updated: 'обновил checklist',
    action_checklist_deleted: 'удалил пункт checklist',
    action_attachment_created: 'добавил файл',
    action_attachment_deleted: 'удалил файл',
    addMember: 'Добавить участника',
    memberEmail: 'Email участника',
    memberAdded: 'Участник добавлен',
    owner: 'Владелец',
    member: 'Участник',
    inviteHint: 'Введите email зарегистрированного пользователя',
    boardMembers: 'Участники board'
  },
  en: {
    appName: 'TuronTrello',
    authTitle: 'Manage work simply',
    authSubtitle: 'Work with boards, lists, and cards.',
    login: 'Login',
    register: 'Register',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    logout: 'Logout',
    workspaces: 'Workspaces',
    createWorkspace: 'Create workspace',
    workspaceName: 'Workspace name',
    createBoard: 'Create board',
    boardName: 'Board name',
    open: 'Open',
    boards: 'boards',
    noBoards: 'No boards',
    save: 'Save',
    cancel: 'Cancel',
    back: 'Back',
    search: 'Search',
    searchPlaceholder: 'Search cards',
    label: 'Label',
    labelPlaceholder: 'Label',
    assignee: 'Assignee',
    allMembers: 'All',
    addList: 'Add list',
    listName: 'List name',
    newCard: 'Add card',
    cardTitle: 'Card title',
    description: 'Description',
    labels: 'Labels',
    labelsHint: 'comma separated',
    unassigned: 'Unassigned',
    startDate: 'Start date',
    dueDate: 'Due date',
    list: 'List',
    completed: 'Completed',
    saveCard: 'Save card',
    deleteCard: 'Delete card',
    close: 'Close',
    checklist: 'Checklist',
    newChecklistItem: 'New checklist item',
    add: 'Add',
    comments: 'Comments',
    writeComment: 'Write a comment',
    addComment: 'Add comment',
    attachments: 'Attachments',
    link: 'Link',
    file: 'File',
    addLink: 'Add link',
    uploadFile: 'Upload file',
    noAttachments: 'No attachments',
    noComments: 'No comments',
    emptyChecklist: 'Checklist is empty',
    activity: 'Activity',
    noCards: 'No cards',
    noResults: 'Nothing found',
    saveSuccess: 'Saved',
    createdSuccess: 'Created',
    deletedSuccess: 'Deleted',
    loginSuccess: 'Login successful',
    registerSuccess: 'Account created',
    confirmDeleteCard: 'Delete this card?',
    dueSoon: 'Less than 24 hours left',
    overdue: 'Overdue',
    noDate: 'No date',
    loading: 'Loading...',
    members: 'Members',
    noActivity: 'No activity',
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    today: 'Today',
    language: 'Language',
    done: 'Done',
    addBoard: 'Add board',
    addWorkspace: 'Add workspace',
    addListInline: 'Add list',
    saveList: 'Save list',
    saveWorkspace: 'Save workspace',
    saveBoard: 'Save board',
    saveCardInline: 'Save card',
    writeCardTitle: 'Enter card title',
    dashboardEmpty: 'No workspaces yet',
    boardEmpty: 'Nothing here yet',
    createdAt: 'Created',
    rename: 'Rename',
    update: 'Update',
    commentCreated: 'Comment added',
    attachmentAdded: 'Attachment added',
    checklistAdded: 'Checklist item added',
    fileHint: 'Small files only',
    defaultWorkspace: 'My workspace',
    defaultBoard: 'My board',
    defaultList_backlog: 'Backlog',
    defaultList_in_progress: 'In progress',
    defaultList_done: 'Done',
    action_workspace_created: 'created a workspace',
    action_workspace_renamed: 'renamed the workspace',
    action_workspace_member_added: 'added a workspace member',
    action_board_created: 'created a board',
    action_board_updated: 'updated the board',
    action_board_seeded: 'created default lists',
    action_board_reordered: 'changed the order',
    action_board_member_added: 'added a board member',
    action_list_created: 'created a list',
    action_list_updated: 'updated a list',
    action_list_deleted: 'deleted a list',
    action_card_created: 'created a card',
    action_card_updated: 'updated a card',
    action_card_deleted: 'deleted a card',
    action_comment_created: 'left a comment',
    action_checklist_created: 'added a checklist item',
    action_checklist_updated: 'updated a checklist item',
    action_checklist_deleted: 'deleted a checklist item',
    action_attachment_created: 'added an attachment',
    action_attachment_deleted: 'deleted an attachment',
    addMember: 'Add member',
    memberEmail: 'User email',
    memberAdded: 'Member added',
    owner: 'Owner',
    member: 'Member',
    inviteHint: 'Enter a registered email',
    boardMembers: 'Board members'
  }
};

Object.assign(messages.uz, {
  profile: "Profil",
  personalCabinet: "Shaxsiy kabinet",
  openProfile: "Kabinet",
  profileSaved: "Profil saqlandi",
  avatar: "Avatar",
  uploadAvatar: "Avatar yuklash",
  removeAvatar: "Avatarni olib tashlash",
  saveProfile: "Profilni saqlash",
  yourStats: "Statistika",
  boardsCount: "Boardlar",
  workspacesCount: "Workspacelar",
  cardsCount: "Cardlar",
  boardView: "Board",
  participantsPage: "Qatnashchilar",
  activityPage: "Activity",
  boardSettings: "Board tahriri",
  boardDescription: "Board tavsifi",
  boardColor: "Board rangi",
  saveBoardSettings: "Boardni saqlash",
  participants: "Qatnashchilar",
  addParticipant: "Qatnashchi qo'shish",
  selectRole: "Rol",
  admin: "Admin",
  role: "Rol",
  changeRole: "Rolni o'zgartirish",
  chooseListOwner: "List egasi",
  noPermission: "Sizda bu amal uchun ruxsat yo'q",
  yourListOnly: "Faqat o'zingizga biriktirilgan list bilan ishlay olasiz",
  ownerOnlyReorder: "List tartibini faqat workspace egasi o'zgartira oladi",
  editBoard: "Boardni tahrirlash",
  memberRole_owner: "Egasi",
  memberRole_admin: "Admin",
  memberRole_member: "A'zo",
  listOwner: "List egasi",
  boardUpdated: "Board yangilandi",
  noMembers: "Qatnashchilar yo'q",
  saveChanges: "O'zgarishlarni saqlash",
  listEditor: "Listni tahrirlash",
  deleteList: "Listni o'chirish",
  confirmDeleteList: "Rostdan ham shu listni o'chirmoqchimisiz?",
  listUpdated: "List yangilandi",
  cardStatus: "Card statusi",
  statusAll: "Barcha statuslar",
  statusOpen: "Jarayonda",
  statusDone: "Tayyor",
  theme: "Tema",
  themeLight: "Yorqin",
  themeDark: "Qorong'u",
  listColor: "List rangi"
});
Object.assign(messages.ru, {
  profile: "Профиль",
  personalCabinet: "Личный кабинет",
  openProfile: "Кабинет",
  profileSaved: "Профиль сохранён",
  avatar: "Аватар",
  uploadAvatar: "Загрузить аватар",
  removeAvatar: "Удалить аватар",
  saveProfile: "Сохранить профиль",
  yourStats: "Статистика",
  boardsCount: "Board",
  workspacesCount: "Workspaces",
  cardsCount: "Cards",
  boardView: "Board",
  participantsPage: "Участники",
  activityPage: "Activity",
  boardSettings: "Редактировать board",
  boardDescription: "Описание board",
  boardColor: "Цвет board",
  saveBoardSettings: "Сохранить board",
  participants: "Участники",
  addParticipant: "Добавить участника",
  selectRole: "Роль",
  admin: "Admin",
  role: "Роль",
  changeRole: "Изменить роль",
  chooseListOwner: "Владелец list",
  noPermission: "У вас нет доступа для этого действия",
  yourListOnly: "Вы можете работать только со своим list",
  ownerOnlyReorder: "Порядок list может менять только владелец workspace",
  editBoard: "Редактировать board",
  memberRole_owner: "Владелец",
  memberRole_admin: "Admin",
  memberRole_member: "Участник",
  listOwner: "Владелец list",
  boardUpdated: "Board обновлён",
  noMembers: "Нет участников",
  saveChanges: "Сохранить изменения",
  listEditor: "Редактировать list",
  deleteList: "Удалить list",
  confirmDeleteList: "Точно удалить этот list?",
  listUpdated: "List обновлён",
  cardStatus: "Статус card",
  statusAll: "Все статусы",
  statusOpen: "В работе",
  statusDone: "Готово",
  theme: "Тема",
  themeLight: "Светлая",
  themeDark: "Тёмная",
  listColor: "Цвет list"
});
Object.assign(messages.en, {
  profile: "Profile",
  personalCabinet: "Personal cabinet",
  openProfile: "Cabinet",
  profileSaved: "Profile saved",
  avatar: "Avatar",
  uploadAvatar: "Upload avatar",
  removeAvatar: "Remove avatar",
  saveProfile: "Save profile",
  yourStats: "Stats",
  boardsCount: "Boards",
  workspacesCount: "Workspaces",
  cardsCount: "Cards",
  boardView: "Board",
  participantsPage: "Participants",
  activityPage: "Activity",
  boardSettings: "Edit board",
  boardDescription: "Board description",
  boardColor: "Board color",
  saveBoardSettings: "Save board",
  participants: "Participants",
  addParticipant: "Add participant",
  selectRole: "Role",
  admin: "Admin",
  role: "Role",
  changeRole: "Change role",
  chooseListOwner: "List owner",
  noPermission: "You do not have permission for this action",
  yourListOnly: "You can work only with your assigned list",
  ownerOnlyReorder: "Only the workspace owner can reorder lists",
  editBoard: "Edit board",
  memberRole_owner: "Owner",
  memberRole_admin: "Admin",
  memberRole_member: "Member",
  listOwner: "List owner",
  boardUpdated: "Board updated",
  noMembers: "No participants",
  saveChanges: "Save changes",
  listEditor: "Edit list",
  deleteList: "Delete list",
  confirmDeleteList: "Are you sure you want to delete this list?",
  listUpdated: "List updated",
  cardStatus: "Card status",
  statusAll: "All statuses",
  statusOpen: "Open",
  statusDone: "Done",
  theme: "Theme",
  themeLight: "Light",
  themeDark: "Dark",
  listColor: "List color"
});

const state = {
  user: null,
  workspaces: [],
  authMode: 'login',
  board: null,
  boardId: null,
  cardDetail: null,
  filters: {
    search: '',
    label: '',
    assignee: '',
    status: ''
  },
  lang: localStorage.getItem('turontrello_lang') || 'uz',
  theme: localStorage.getItem('turontrello_theme') || 'dark',
  sse: null,
  refreshTimer: null,
  listColorSaveTimers: {},
  drag: {
    type: null,
    id: null,
    sourceListId: null
  },
  profile: null,
  ui: {
    workspaceComposerOpen: false,
    workspaceName: '',
    boardComposerFor: null,
    boardDrafts: {},
    listComposerOpen: false,
    listName: '',
    listOwnerUserId: '',
    listEditorOpenById: {},
    cardComposerOpenByList: {},
    cardDraftsByList: {},
    cardDetailDraft: null
  }
};

document.documentElement.lang = state.lang;
applyTheme();

const APP_TIME_ZONE = 'Asia/Tashkent';
const APP_TIME_ZONE_OFFSET = '+05:00';

function t(key) {
  return messages[state.lang]?.[key] || messages.en[key] || key;
}

function applyTheme() {
  const theme = state.theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('turontrello_theme', theme);
}

function themeButtonLabel() {
  return state.theme === 'light' ? `☾ ${t('themeDark')}` : `☀ ${t('themeLight')}`;
}

function listColorsStorageKey() {
  return `turontrello_list_colors_${state.user?.id || 'guest'}_${state.boardId || 'global'}`;
}

function readLocalListColors() {
  try {
    return JSON.parse(localStorage.getItem(listColorsStorageKey()) || '{}') || {};
  } catch {
    return {};
  }
}

function getListColors() {
  return { ...(state.board?.userListColors || {}), ...readLocalListColors() };
}

function getListColor(listId) {
  return getListColors()[listId] || '';
}

function setListColor(listId, color) {
  const colors = readLocalListColors();
  if (color) colors[listId] = color;
  else delete colors[listId];
  localStorage.setItem(listColorsStorageKey(), JSON.stringify(colors));
  if (!state.board) return;
  state.board.userListColors = state.board.userListColors || {};
  if (color) state.board.userListColors[listId] = color;
  else delete state.board.userListColors[listId];
}

function normalizeHexColor(color) {
  const value = String(color || '').trim();
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : '';
}

function applyListColorToColumn(listId, color) {
  const column = document.querySelector(`.list-column[data-list-id="${CSS.escape(listId)}"]`);
  if (column && color) column.style.setProperty('--list-accent', color);
}

function persistListColor(listId, color) {
  const normalized = normalizeHexColor(color);
  setListColor(listId, normalized);
  applyListColorToColumn(listId, normalized);
  clearTimeout(state.listColorSaveTimers[listId]);
  state.listColorSaveTimers[listId] = setTimeout(async () => {
    try {
      const response = await api(`/api/lists/${listId}/color`, { method: 'PATCH', body: { color: normalized } });
      if (state.board) state.board.userListColors = response.userListColors || state.board.userListColors || {};
    } catch (error) {
      showToast(error.message);
    }
  }, 250);
}

function defaultListAccent(index) {
  const palette = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a', '#0891b2'];
  return palette[index % palette.length];
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message) {
  const node = document.createElement('div');
  node.className = 'toast';
  node.textContent = message;
  toastRoot.appendChild(node);
  setTimeout(() => node.remove(), 2800);
}

async function api(path, options = {}) {
  const config = {
    method: options.method || 'GET',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'same-origin'
  };
  if (options.body !== undefined) config.body = JSON.stringify(options.body);
  const response = await fetch(path, config);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function formatDate(value) {
  if (!value) return t('noDate');
  const date = new Date(value);
  return new Intl.DateTimeFormat(state.lang === 'uz' ? 'uz-UZ' : state.lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: APP_TIME_ZONE
  }).format(date);
}

function toTashkentDateInput(value) {
  if (!value) return '';
  const date = new Date(value);
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: APP_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).formatToParts(date).reduce((acc, part) => {
    if (part.type !== 'literal') acc[part.type] = part.value;
    return acc;
  }, {});
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

function formatAgo(value) {
  if (!value) return '';
  const diff = Date.now() - new Date(value).getTime();
  const mins = Math.max(0, Math.floor(diff / 60000));
  if (mins < 1) return state.lang === 'ru' ? 'только что' : state.lang === 'en' ? 'just now' : 'hozir';
  if (mins < 60) return `${mins} ${state.lang === 'ru' ? 'мин назад' : state.lang === 'en' ? 'min ago' : 'daq oldin'}`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ${state.lang === 'ru' ? 'ч назад' : state.lang === 'en' ? 'h ago' : 'soat oldin'}`;
  const days = Math.floor(hours / 24);
  return `${days} ${state.lang === 'ru' ? 'дн назад' : state.lang === 'en' ? 'd ago' : 'kun oldin'}`;
}

function initials(name) {
  return String(name || '?').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function currentRoute() {
  const hash = location.hash || '#/';
  const activityMatch = hash.match(/^#\/board\/([^/]+)\/activity$/);
  if (activityMatch) return { name: 'board-activity', boardId: activityMatch[1] };
  const membersMatch = hash.match(/^#\/board\/([^/]+)\/members$/);
  if (membersMatch) return { name: 'board-members', boardId: membersMatch[1] };
  const settingsMatch = hash.match(/^#\/board\/([^/]+)\/settings$/);
  if (settingsMatch) return { name: 'board-settings', boardId: settingsMatch[1] };
  const match = hash.match(/^#\/board\/([^/]+)$/);
  if (match) return { name: 'board', boardId: match[1] };
  if (hash === '#/profile') return { name: 'profile' };
  return { name: 'dashboard' };
}

function renderLanguageBar() {
  return `
    <div class="langbar">
      <div class="langbar-inner">
        <span class="helper">${t('language')}</span>
        <button class="lang-btn ${state.lang === 'uz' ? 'active' : ''}" data-lang="uz">O‘z</button>
        <button class="lang-btn ${state.lang === 'ru' ? 'active' : ''}" data-lang="ru">Рус</button>
        <button class="lang-btn ${state.lang === 'en' ? 'active' : ''}" data-lang="en">Eng</button>
      </div>
    </div>
  `;
}

function bindLanguageBar() {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      localStorage.setItem('turontrello_lang', state.lang);
      document.documentElement.lang = state.lang;
      applyTheme();
      render();
    });
  });
}

function renderTopbar(title, rightHtml = '') {
  return `
    <div class="topbar">
      <div class="brand">
        <img class="brand-logo" src="/turontrello-logo.png" alt="TuronTrello" />
        <div class="brand-title">${escapeHtml(title)}</div>
      </div>
      <div class="row wrap-row topbar-actions">
        <button id="theme-toggle" class="ghost small theme-toggle" type="button" title="${t('theme')}">${themeButtonLabel()}</button>
        ${state.user ? `<button id="go-profile" class="ghost small">${t('openProfile')}</button>` : ''}
        ${state.user ? `<div class="member-pill">${renderAvatar(state.user)}<div>${escapeHtml(state.user.name)}</div></div>` : ''}
        ${rightHtml}
      </div>
    </div>
  `;
}

function renderAvatar(user, extraClass = '') {
  if (!user) return `<div class="avatar ${extraClass}">?</div>`;
  if (user.avatarData) {
    return `<div class="avatar avatar-photo ${extraClass}"><img src="${escapeHtml(user.avatarData)}" alt="${escapeHtml(user.name || 'avatar')}" /></div>`;
  }
  return `<div class="avatar ${extraClass}" style="background:${user.avatarColor || '#475569'}">${initials(user.name)}</div>`;
}

function bindTopbarCommonActions() {
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      captureDraftsFromDom();
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      applyTheme();
      render();
    });
  }

  const profileBtn = document.getElementById('go-profile');
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      location.hash = '#/profile';
    });
  }
}

async function logoutUser() {
  await api('/api/auth/logout', { method: 'POST' });
  state.user = null;
  state.workspaces = [];
  state.board = null;
  state.boardId = null;
  state.profile = null;
  if (state.sse) state.sse.close();
  location.hash = '#/';
  render();
}

function currentPermissions() {
  return state.board?.permissions || { role: 'member', canEditBoard: false, canManageMembers: false, canReorderLists: false, canAccessAllLists: false };
}

function canManageListUi(list) {
  const permissions = currentPermissions();
  if (permissions.canAccessAllLists || permissions.role === 'owner' || permissions.role === 'admin') return true;
  return Boolean(list && list.ownerUserId === state.user?.id);
}

function canManageCardUi(card) {
  const list = state.board?.lists?.find((entry) => entry.id === card.listId);
  return canManageListUi(list);
}

function memberRoleLabel(role) {
  return t(`memberRole_${role || 'member'}`);
}

function boardNav(boardId, active) {
  const permissions = currentPermissions();
  return `
    <div class="row wrap-row board-nav-row">
      <button class="ghost small ${active === 'board' ? 'active' : ''}" data-board-nav="board" data-board-id="${boardId}">${t('boardView')}</button>
      <button class="ghost small ${active === 'members' ? 'active' : ''}" data-board-nav="members" data-board-id="${boardId}">${t('participantsPage')}</button>
      <button class="ghost small ${active === 'activity' ? 'active' : ''}" data-board-nav="activity" data-board-id="${boardId}">${t('activityPage')}</button>
      ${permissions.canEditBoard ? `<button class="ghost small ${active === 'settings' ? 'active' : ''}" data-board-nav="settings" data-board-id="${boardId}">${t('editBoard')}</button>` : ''}
    </div>
  `;
}

function bindBoardNav() {
  document.querySelectorAll('[data-board-nav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const boardId = btn.dataset.boardId;
      const target = btn.dataset.boardNav;
      if (target === 'members') location.hash = `#/board/${boardId}/members`;
      else if (target === 'activity') location.hash = `#/board/${boardId}/activity`;
      else if (target === 'settings') location.hash = `#/board/${boardId}/settings`;
      else location.hash = `#/board/${boardId}`;
    });
  });
}

function getDisplayListName(name) {
  const normalized = String(name || '').trim().toLowerCase();
  if (['backlog', 'plan', 'reja'].includes(normalized)) return t('defaultList_backlog');
  if (['in progress', 'in-progress', 'doing', 'jarayonda', 'в работе'].includes(normalized)) return t('defaultList_in_progress');
  if (['done', 'tayyor', 'готово'].includes(normalized)) return t('defaultList_done');
  return name;
}

function dueInfo(card) {
  if (!card?.dueDate) return null;
  const diff = new Date(card.dueDate).getTime() - Date.now();
  if (card.isCompleted) {
    return { className: 'done', title: formatDate(card.dueDate) };
  }
  if (diff < 0) {
    return { className: 'overdue', title: formatDate(card.dueDate) };
  }
  if (diff <= 24 * 60 * 60 * 1000) {
    return { className: 'warning', title: formatDate(card.dueDate) };
  }
  return { className: 'normal', title: formatDate(card.dueDate) };
}

function activityText(item) {
  const key = `action_${String(item.actionType || '').replace(/\./g, '_')}`;
  const verb = t(key);
  if (verb !== key) return verb;
  return item.actionType || '';
}

function filteredCards(listId) {
  if (!state.board) return [];
  return state.board.cards
    .filter((card) => card.listId === listId)
    .filter((card) => {
      const search = state.filters.search.trim().toLowerCase();
      const label = state.filters.label.trim().toLowerCase();
      const assignee = state.filters.assignee;
      const status = state.filters.status;
      if (search) {
        const haystack = `${card.title} ${card.description || ''} ${(card.labels || []).join(' ')}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      if (label && !(card.labels || []).some((entry) => entry.toLowerCase().includes(label))) return false;
      if (assignee && card.assigneeUserId !== assignee) return false;
      if (status === 'done' && !card.isCompleted) return false;
      if (status === 'open' && card.isCompleted) return false;
      return true;
    });
}

function applyBoardFiltersDom() {
  const search = state.filters.search.trim().toLowerCase();
  const label = state.filters.label.trim().toLowerCase();
  const assignee = state.filters.assignee;
  const status = state.filters.status;

  document.querySelectorAll('.kanban-card[data-card-id]').forEach((cardNode) => {
    const searchable = cardNode.dataset.cardSearch || '';
    const labels = cardNode.dataset.cardLabels || '';
    const cardAssignee = cardNode.dataset.cardAssignee || '';
    const cardStatus = cardNode.dataset.cardStatus || 'open';
    const matches = (!search || searchable.includes(search))
      && (!label || labels.includes(label))
      && (!assignee || cardAssignee === assignee)
      && (!status || cardStatus === status);
    cardNode.classList.toggle('hidden-by-filter', !matches);
  });

  document.querySelectorAll('[data-card-dropzone]').forEach((zone) => {
    const column = zone.closest('.list-column');
    const cardNodes = [...zone.querySelectorAll('.kanban-card[data-card-id]')];
    const visibleCount = cardNodes.filter((node) => !node.classList.contains('hidden-by-filter')).length;
    const countNode = column?.querySelector('[data-visible-count]');
    if (countNode) countNode.textContent = String(visibleCount);
    const emptyNode = column?.querySelector('.list-empty');
    if (emptyNode) {
      emptyNode.textContent = cardNodes.length ? t('noResults') : t('noCards');
      emptyNode.classList.toggle('hidden', visibleCount > 0);
    }
  });
}

function toLocalDateInput(value) {
  return toTashkentDateInput(value);
}

function captureInlineDraftsFromDom() {
  document.querySelectorAll('[data-card-form]').forEach((form) => {
    const listId = form.dataset.cardForm;
    const field = form.querySelector('textarea[name="title"]');
    if (listId && field) state.ui.cardDraftsByList[listId] = field.value;
  });

  const listForm = document.getElementById('list-form');
  if (listForm) {
    state.ui.listName = listForm.querySelector('input[name="name"]')?.value || state.ui.listName;
    state.ui.listOwnerUserId = listForm.querySelector('select[name="ownerUserId"]')?.value || state.ui.listOwnerUserId;
  }
}

function captureCardDetailDraftFromDom() {
  if (!state.cardDetail?.card?.id) return;
  const form = document.getElementById('card-form');
  if (!form) return;

  const formData = new FormData(form);
  state.ui.cardDetailDraft = {
    cardId: state.cardDetail.card.id,
    title: String(formData.get('title') || ''),
    description: String(formData.get('description') || ''),
    labels: String(formData.get('labels') || ''),
    listId: String(formData.get('listId') || ''),
    assigneeUserId: String(formData.get('assigneeUserId') || ''),
    startDate: String(formData.get('startDate') || ''),
    dueDate: String(formData.get('dueDate') || ''),
    isCompleted: formData.get('isCompleted') === 'on'
  };
}

function captureDraftsFromDom() {
  captureInlineDraftsFromDom();
  captureCardDetailDraftFromDom();
}

function clearCardDetailDraft(cardId) {
  if (!cardId || state.ui.cardDetailDraft?.cardId === cardId) state.ui.cardDetailDraft = null;
}

function isEditingCardForm() {
  const active = document.activeElement;
  if (!active || !active.matches('input, textarea, select')) return false;
  return Boolean(active.closest('[data-card-form], #card-form, #comment-form, #checklist-add-form, #link-attachment-form, #file-attachment-form, .filter-bar, #list-form, [data-list-editor-form]'));
}

function connectBoardEvents() {
  if (state.sse) state.sse.close();
  if (!state.boardId) return;
  const workspaceId = state.board?.workspace?.id || '';
  state.sse = new EventSource(`/api/events?boardId=${encodeURIComponent(state.boardId)}&workspaceId=${encodeURIComponent(workspaceId)}`);
  state.sse.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload.type !== 'connected') queueRefresh();
    } catch {
      // ignore
    }
  };
  state.sse.onerror = () => queueRefresh();
}

function queueRefresh() {
  clearTimeout(state.refreshTimer);
  captureDraftsFromDom();
  state.refreshTimer = setTimeout(async () => {
    if (isEditingCardForm()) {
      queueRefresh();
      return;
    }

    try {
      captureDraftsFromDom();
      if (state.boardId) {
        const currentCardId = state.cardDetail?.card?.id;
        await loadBoard(state.boardId, false);
        if (currentCardId) {
          try {
            state.cardDetail = await api(`/api/cards/${currentCardId}`);
          } catch {
            clearCardDetailDraft(currentCardId);
            state.cardDetail = null;
          }
        }
      } else {
        await refreshDashboard();
      }
      render();
    } catch {
      // ignore transient refresh errors
    }
  }, 600);
}

async function refreshDashboard() {
  const data = await api('/api/dashboard');
  state.user = data.user;
  state.workspaces = data.workspaces || [];
}

async function loadMe() {
  const data = await api('/api/auth/me');
  state.user = data.user;
  state.workspaces = data.workspaces || [];
}

async function loadProfile() {
  state.profile = await api('/api/profile');
  if (state.profile?.user) state.user = state.profile.user;
}

async function loadBoard(boardId, rerender = true) {
  state.boardId = boardId;
  state.board = await api(`/api/boards/${boardId}`);
  connectBoardEvents();
  if (rerender) render();
}

async function openCard(cardId) {
  clearCardDetailDraft();
  state.cardDetail = await api(`/api/cards/${cardId}`);
  renderModal();
}

function closeCardModal() {
  clearCardDetailDraft(state.cardDetail?.card?.id);
  state.cardDetail = null;
  renderModal();
}

function renderAuth() {
  app.innerHTML = `
    <div class="center-wrap">
      <div class="auth-card compact-auth">
        <div class="auth-hero compact-auth-hero">
          <img class="auth-logo" src="/turontrello-logo.png" alt="TuronTrello" />
          <p>${t('authTitle')}</p>
        </div>
        <div class="auth-panel">
          <div class="auth-tabs">
            <button class="${state.authMode === 'login' ? 'active' : ''}" data-auth-tab="login">${t('login')}</button>
            <button class="${state.authMode === 'register' ? 'active' : ''}" data-auth-tab="register">${t('register')}</button>
          </div>
          <form id="auth-form" class="form-stack">
            ${state.authMode === 'register' ? `<label>${t('name')}<input name="name" required /></label>` : ''}
            <label>${t('email')}<input name="email" type="email" required /></label>
            <label>${t('password')}<input name="password" type="password" required /></label>
            <button class="primary" type="submit">${state.authMode === 'login' ? t('login') : t('register')}</button>
          </form>
        </div>
      </div>
    </div>
    ${renderLanguageBar()}
  `;

  bindLanguageBar();

  document.querySelectorAll('[data-auth-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.authMode = btn.dataset.authTab;
      render();
    });
  });

  document.getElementById('auth-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const data = await api(state.authMode === 'login' ? '/api/auth/login' : '/api/auth/register', { method: 'POST', body: payload });
      state.user = data.user;
      state.workspaces = data.workspaces || [];
      location.hash = '#/';
      render();
      showToast(state.authMode === 'login' ? t('loginSuccess') : t('registerSuccess'));
    } catch (error) {
      showToast(error.message);
    }
  });
}

function renderDashboard() {
  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar(t('appName'), `<button id="logout-btn" class="ghost">${t('logout')}</button>`)}
      <div class="page">
        <div class="section-head">
          <h2>${t('workspaces')}</h2>
          <button id="toggle-workspace-composer" class="primary">${t('addWorkspace')}</button>
        </div>

        ${state.ui.workspaceComposerOpen ? `
          <form id="workspace-form" class="panel compact-form">
            <input name="name" placeholder="${t('workspaceName')}" value="${escapeHtml(state.ui.workspaceName)}" required />
            <div class="row">
              <button class="primary" type="submit">${t('saveWorkspace')}</button>
              <button type="button" class="ghost" id="cancel-workspace-form">${t('cancel')}</button>
            </div>
          </form>
        ` : ''}

        <div class="workspace-grid">
          ${state.workspaces.length ? state.workspaces.map((workspace) => `
            <div class="card workspace-card">
              <div class="spread">
                <div>
                  <h3 style="margin:0;">${escapeHtml(workspace.name)}</h3>
                  <div class="helper">${workspace.boardCount} ${t('boards')}</div>
                </div>
                <button class="small ghost" data-toggle-board-form="${workspace.id}">${t('addBoard')}</button>
              </div>

              ${state.ui.boardComposerFor === workspace.id ? `
                <form class="compact-form" data-board-form="${workspace.id}">
                  <input name="name" placeholder="${t('boardName')}" value="${escapeHtml(state.ui.boardDrafts[workspace.id] || '')}" required />
                  <div class="row">
                    <button class="primary small" type="submit">${t('saveBoard')}</button>
                    <button type="button" class="ghost small" data-cancel-board-form="${workspace.id}">${t('cancel')}</button>
                  </div>
                </form>
              ` : ''}

              <div class="workspace-boards">
                ${workspace.boards.length ? workspace.boards.map((board) => `
                  <button class="board-chip" data-open-board="${board.id}">
                    <div class="board-chip-left">
                      <span class="board-dot" style="background:${board.color}"></span>
                      <div class="board-chip-title">${escapeHtml(board.name)}</div>
                    </div>
                    <span class="helper">${t('open')}</span>
                  </button>
                `).join('') : `<div class="empty-state">${t('noBoards')}</div>`}
              </div>
            </div>
          `).join('') : `<div class="empty-state">${t('dashboardEmpty')}</div>`}
        </div>
      </div>
      ${renderLanguageBar()}
    </div>
  `;

  bindLanguageBar();
  bindTopbarCommonActions();

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await api('/api/auth/logout', { method: 'POST' });
    state.user = null;
    state.workspaces = [];
    state.board = null;
    state.boardId = null;
    if (state.sse) state.sse.close();
    location.hash = '#/';
    render();
  });

  const toggleWorkspaceBtn = document.getElementById('toggle-workspace-composer');
  if (toggleWorkspaceBtn) {
    toggleWorkspaceBtn.addEventListener('click', () => {
      state.ui.workspaceComposerOpen = !state.ui.workspaceComposerOpen;
      render();
    });
  }

  const workspaceForm = document.getElementById('workspace-form');
  if (workspaceForm) {
    workspaceForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const name = String(form.get('name') || '').trim();
      if (!name) return;
      try {
        const data = await api('/api/workspaces', { method: 'POST', body: { name } });
        state.workspaces = data.workspaces || [];
        state.ui.workspaceComposerOpen = false;
        state.ui.workspaceName = '';
        render();
        showToast(t('createdSuccess'));
      } catch (error) {
        showToast(error.message);
      }
    });
    document.getElementById('cancel-workspace-form').addEventListener('click', () => {
      state.ui.workspaceComposerOpen = false;
      render();
    });
  }

  document.querySelectorAll('[data-toggle-board-form]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const workspaceId = btn.dataset.toggleBoardForm;
      state.ui.boardComposerFor = state.ui.boardComposerFor === workspaceId ? null : workspaceId;
      render();
    });
  });

  document.querySelectorAll('[data-cancel-board-form]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.ui.boardComposerFor = null;
      render();
    });
  });

  document.querySelectorAll('[data-board-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const workspaceId = form.dataset.boardForm;
      const name = String(new FormData(form).get('name') || '').trim();
      if (!name) return;
      try {
        const data = await api(`/api/workspaces/${workspaceId}/boards`, { method: 'POST', body: { name, description: '', color: '#0f172a' } });
        state.ui.boardComposerFor = null;
        await refreshDashboard();
        render();
        if (data.board?.board?.id) location.hash = `#/board/${data.board.board.id}`;
        showToast(t('createdSuccess'));
      } catch (error) {
        showToast(error.message);
      }
    });
  });

  document.querySelectorAll('[data-open-board]').forEach((btn) => {
    btn.addEventListener('click', () => {
      location.hash = `#/board/${btn.dataset.openBoard}`;
    });
  });
}

function renderProfile() {
  const profile = state.profile || { user: state.user, stats: { workspacesCount: state.workspaces.length, boardsCount: state.workspaces.reduce((sum, ws) => sum + (ws.boards?.length || 0), 0), cardsCount: 0 } };
  const user = profile.user || state.user;
  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar(t('personalCabinet'), `<button id="logout-btn" class="ghost">${t('logout')}</button>`)}
      <div class="page">
        <div class="section-head">
          <h2>${t('personalCabinet')}</h2>
          <button id="go-dashboard" class="ghost">${t('back')}</button>
        </div>
        <div class="workspace-grid profile-grid">
          <div class="card profile-card panel">
            <div class="section-head"><h3>${t('profile')}</h3></div>
            <div class="profile-avatar-wrap">${renderAvatar(user, 'profile-avatar')}</div>
            <form id="profile-form" class="form-stack">
              <label>${t('name')}<input name="name" value="${escapeHtml(user?.name || '')}" required /></label>
              <label>${t('email')}<input value="${escapeHtml(user?.email || '')}" disabled /></label>
              <label>${t('boardColor')}<input type="color" name="avatarColor" value="${escapeHtml(user?.avatarColor || '#2563eb')}" /></label>
              <label>${t('uploadAvatar')}<input type="file" name="avatarFile" accept="image/*" /></label>
              ${user?.avatarData ? `<button type="button" id="remove-avatar-btn" class="ghost">${t('removeAvatar')}</button>` : ''}
              <button class="primary" type="submit">${t('saveProfile')}</button>
            </form>
          </div>
          <div class="card panel">
            <div class="section-head"><h3>${t('yourStats')}</h3></div>
            <div class="stats-grid">
              <div class="stat-card"><div class="helper">${t('workspacesCount')}</div><div class="stat-value">${profile.stats?.workspacesCount || 0}</div></div>
              <div class="stat-card"><div class="helper">${t('boardsCount')}</div><div class="stat-value">${profile.stats?.boardsCount || 0}</div></div>
              <div class="stat-card"><div class="helper">${t('cardsCount')}</div><div class="stat-value">${profile.stats?.cardsCount || 0}</div></div>
            </div>
          </div>
        </div>
      </div>
      ${renderLanguageBar()}
    </div>
  `;

  bindLanguageBar();
  bindTopbarCommonActions();
  document.getElementById('logout-btn').addEventListener('click', logoutUser);
  document.getElementById('go-dashboard').addEventListener('click', () => { location.hash = '#/'; });

  const removeBtn = document.getElementById('remove-avatar-btn');
  if (removeBtn) {
    removeBtn.addEventListener('click', async () => {
      try {
        const data = await api('/api/profile', { method: 'PATCH', body: { name: user.name, avatarColor: user.avatarColor, avatarData: '' } });
        state.user = data.user;
        await loadProfile();
        render();
      } catch (error) { showToast(error.message); }
    });
  }

  document.getElementById('profile-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const avatarFile = form.get('avatarFile');
    let avatarData = user?.avatarData || '';
    if (avatarFile && avatarFile.size) avatarData = `data:${avatarFile.type || 'image/png'};base64,${await fileToBase64(avatarFile)}`;
    try {
      const data = await api('/api/profile', { method: 'PATCH', body: { name: String(form.get('name') || '').trim(), avatarColor: String(form.get('avatarColor') || user?.avatarColor || '#2563eb'), avatarData } });
      state.user = data.user;
      await loadProfile();
      render();
      showToast(t('profileSaved'));
    } catch (error) {
      showToast(error.message);
    }
  });
}

function renderBoardMembers() {
  if (!state.board) return renderBoard();
  const permissions = currentPermissions();
  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar(t('participantsPage'), `<button id="logout-btn" class="ghost">${t('logout')}</button>`)}
      <div class="page board-shell">
        <div class="board-hero" style="background:linear-gradient(135deg, ${state.board.board.color}, #111827);">
          <div class="board-topline">
            <div class="board-title-wrap">
              <button id="go-board" class="ghost back-btn">← ${t('back')}</button>
              <div>
                <h1>${escapeHtml(state.board.board.name)}</h1>
                <div class="helper">${escapeHtml(state.board.workspace.name)}</div>
              </div>
            </div>
          </div>
          ${boardNav(state.boardId, 'members')}
        </div>
        <div class="workspace-grid profile-grid">
          <div class="card panel">
            <div class="section-head"><h3>${t('participants')}</h3></div>
            <div class="members-list">
              ${state.board.members.length ? state.board.members.map((member) => `
                <div class="member-row card-like">
                  <div class="row">
                    ${renderAvatar(member)}
                    <div>
                      <div class="member-name">${escapeHtml(member.name)}</div>
                      <div class="helper">${escapeHtml(member.email)}</div>
                    </div>
                  </div>
                  <div class="row wrap-row">
                    <span class="member-role-badge ${member.role}">${memberRoleLabel(member.role)}</span>
                    ${permissions.canManageMembers && member.role !== 'owner' ? `
                      <select data-role-user="${member.id}" class="role-select">
                        <option value="member" ${member.role === 'member' ? 'selected' : ''}>${memberRoleLabel('member')}</option>
                        <option value="admin" ${member.role === 'admin' ? 'selected' : ''}>${memberRoleLabel('admin')}</option>
                      </select>
                    ` : ''}
                  </div>
                </div>
              `).join('') : `<div class="empty-state">${t('noMembers')}</div>`}
            </div>
          </div>
          ${permissions.canManageMembers ? `
            <div class="card panel">
              <div class="section-head"><h3>${t('addParticipant')}</h3></div>
              <form id="add-member-form" class="form-stack">
                <input name="email" type="email" placeholder="${t('memberEmail')}" required />
                <select name="role">
                  <option value="member">${memberRoleLabel('member')}</option>
                  <option value="admin">${memberRoleLabel('admin')}</option>
                </select>
                <button class="primary" type="submit">${t('addParticipant')}</button>
              </form>
              <div class="helper" style="margin-top:6px;">${t('inviteHint')}</div>
            </div>
          ` : ''}
        </div>
      </div>
      ${renderLanguageBar()}
    </div>
  `;

  bindLanguageBar();
  bindTopbarCommonActions();
  bindBoardNav();
  document.getElementById('logout-btn').addEventListener('click', logoutUser);
  document.getElementById('go-board').addEventListener('click', () => { location.hash = `#/board/${state.boardId}`; });

  const addMemberForm = document.getElementById('add-member-form');
  if (addMemberForm) {
    addMemberForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      try {
        await api(`/api/boards/${state.boardId}/members`, { method: 'POST', body: { email: String(form.get('email') || '').trim(), role: String(form.get('role') || 'member') } });
        await loadBoard(state.boardId, false);
        render();
        showToast(t('memberAdded'));
      } catch (error) { showToast(error.message); }
    });
  }

  document.querySelectorAll('[data-role-user]').forEach((select) => {
    select.addEventListener('change', async () => {
      try {
        await api(`/api/boards/${state.boardId}/members/${select.dataset.roleUser}`, { method: 'PATCH', body: { role: select.value } });
        await loadBoard(state.boardId, false);
        render();
        showToast(t('saveSuccess'));
      } catch (error) { showToast(error.message); }
    });
  });
}

function renderBoardActivity() {
  if (!state.board) return renderBoard();
  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar(t('activityPage'), `<button id="logout-btn" class="ghost">${t('logout')}</button>`)}
      <div class="page board-shell">
        <div class="board-hero" style="background:linear-gradient(135deg, ${state.board.board.color}, #111827);">
          <div class="board-topline">
            <div class="board-title-wrap">
              <button id="go-board" class="ghost back-btn">← ${t('back')}</button>
              <div>
                <h1>${escapeHtml(state.board.board.name)}</h1>
                <div class="helper">${escapeHtml(state.board.workspace.name)}</div>
              </div>
            </div>
          </div>
          ${boardNav(state.boardId, 'activity')}
        </div>
        <div class="card panel">
          <div class="section-head"><h3>${t('activity')}</h3></div>
          <div class="activity-list large-activity-list">
            ${state.board.activity.length ? state.board.activity.map((item) => `
              <div class="activity-item">
                <div class="row">
                  ${renderAvatar(item.actor || { name: 'System', avatarColor: '#475569' })}
                  <div>
                    <div>${escapeHtml(item.actor?.name || 'System')}</div>
                    <div class="helper">${escapeHtml(activityText(item))}</div>
                  </div>
                </div>
                <div class="helper">${escapeHtml(formatAgo(item.createdAt))}</div>
              </div>
            `).join('') : `<div class="empty-state">${t('noActivity')}</div>`}
          </div>
        </div>
      </div>
      ${renderLanguageBar()}
    </div>
  `;

  bindLanguageBar();
  bindTopbarCommonActions();
  bindBoardNav();
  document.getElementById('logout-btn').addEventListener('click', logoutUser);
  document.getElementById('go-board').addEventListener('click', () => { location.hash = `#/board/${state.boardId}`; });
}

function renderBoardSettings() {
  if (!state.board) return renderBoard();
  const permissions = currentPermissions();
  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar(t('boardSettings'), `<button id="logout-btn" class="ghost">${t('logout')}</button>`)}
      <div class="page board-shell">
        <div class="board-hero" style="background:linear-gradient(135deg, ${state.board.board.color}, #111827);">
          <div class="board-topline">
            <div class="board-title-wrap">
              <button id="go-board" class="ghost back-btn">← ${t('back')}</button>
              <div>
                <h1>${escapeHtml(state.board.board.name)}</h1>
                <div class="helper">${escapeHtml(state.board.workspace.name)}</div>
              </div>
            </div>
          </div>
          ${boardNav(state.boardId, 'settings')}
        </div>
        ${permissions.canEditBoard ? `
          <div class="card panel">
            <form id="board-settings-form" class="form-stack">
              <label>${t('boardName')}<input name="name" value="${escapeHtml(state.board.board.name)}" required /></label>
              <label>${t('boardDescription')}<textarea name="description">${escapeHtml(state.board.board.description || '')}</textarea></label>
              <label>${t('boardColor')}<input type="color" name="color" value="${escapeHtml(state.board.board.color || '#0f172a')}" /></label>
              <button class="primary" type="submit">${t('saveBoardSettings')}</button>
            </form>
          </div>
        ` : `<div class="empty-state">${t('noPermission')}</div>`}
      </div>
      ${renderLanguageBar()}
    </div>
  `;

  bindLanguageBar();
  bindTopbarCommonActions();
  bindBoardNav();
  document.getElementById('logout-btn').addEventListener('click', logoutUser);
  document.getElementById('go-board').addEventListener('click', () => { location.hash = `#/board/${state.boardId}`; });
  const form = document.getElementById('board-settings-form');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      try {
        state.board = await api(`/api/boards/${state.boardId}`, { method: 'PATCH', body: { name: String(formData.get('name') || '').trim(), description: String(formData.get('description') || ''), color: String(formData.get('color') || '#0f172a') } });
        render();
        showToast(t('boardUpdated'));
      } catch (error) { showToast(error.message); }
    });
  }
}

function renderCardCard(card) {
  const assignee = state.board.members.find((member) => member.id === card.assigneeUserId);
  const due = dueInfo(card);
  const canManage = canManageCardUi(card);
  return `
    <div class="kanban-card ${card.isCompleted ? 'completed' : ''} ${canManage ? '' : 'card-readonly'}" draggable="${canManage ? 'true' : 'false'}" data-card-id="${card.id}" data-open-card="${card.id}" data-card-search="${escapeHtml(`${card.title} ${card.description || ''} ${(card.labels || []).join(' ')}`.toLowerCase())}" data-card-labels="${escapeHtml((card.labels || []).join(' ').toLowerCase())}" data-card-assignee="${escapeHtml(card.assigneeUserId || '')}" data-card-status="${card.isCompleted ? 'done' : 'open'}">
      <div class="spread card-heading">
        <div class="card-title ${card.isCompleted ? 'is-done' : ''}">${escapeHtml(card.title)}</div>
        <button type="button" class="card-check ${card.isCompleted ? 'done' : ''}" data-toggle-complete="${card.id}" title="${t('completed')}" ${canManage ? '' : 'disabled'}>${card.isCompleted ? '✓' : ''}</button>
      </div>
      ${(card.labels || []).length ? `<div class="card-meta">${card.labels.map((label, index) => `<span class="badge label-badge palette-${index % 6}">${escapeHtml(label)}</span>`).join('')}</div>` : ''}
      <div class="card-meta">
        ${due ? `<span class="badge due-chip ${due.className}" title="${escapeHtml(due.title)}">${escapeHtml(due.title)}</span>` : ''}
        ${assignee ? `<span class="badge">${escapeHtml(assignee.name)}</span>` : ''}
        ${!canManage ? `<span class="badge">${t('yourListOnly')}</span>` : ''}
        ${card.isCompleted ? `<span class="badge status-done">${t('done')}</span>` : `<span class="badge status-open">${t('statusOpen')}</span>`}
      </div>
    </div>
  `;
}

function renderBoard() {
  if (!state.board) {
    app.innerHTML = `<div class="page">${t('loading')}</div>${renderLanguageBar()}`;
    bindLanguageBar();
    return;
  }

  const permissions = currentPermissions();

  app.innerHTML = `
    <div class="app-shell">
      ${renderTopbar(t('appName'), `<button id="logout-btn" class="ghost">${t('logout')}</button>`)}
      <div class="page board-shell board-workspace">
        <div class="board-hero" style="background:linear-gradient(135deg, ${state.board.board.color}, #111827);">
          <div class="board-topline">
            <div class="board-title-wrap">
              <button id="go-dashboard" class="ghost back-btn">← ${t('back')}</button>
              <div>
                <h1>${escapeHtml(state.board.board.name)}</h1>
                <div class="helper">${escapeHtml(state.board.workspace.name)}</div>
              </div>
            </div>
            ${permissions.canEditBoard ? `<button id="toggle-list-composer" class="primary">${t('addListInline')}</button>` : ''}
          </div>
          ${boardNav(state.boardId, 'board')}
          <div class="filter-bar">
            <input id="search-input" placeholder="${t('searchPlaceholder')}" value="${escapeHtml(state.filters.search)}" />
            <input id="label-input" placeholder="${t('labelPlaceholder')}" value="${escapeHtml(state.filters.label)}" />
            <select id="assignee-filter">
              <option value="">${t('allMembers')}</option>
              ${state.board.members.map((member) => `<option value="${member.id}" ${state.filters.assignee === member.id ? 'selected' : ''}>${escapeHtml(member.name)}</option>`).join('')}
            </select>
            <select id="status-filter" title="${t('cardStatus')}">
              <option value="" ${!state.filters.status ? 'selected' : ''}>${t('statusAll')}</option>
              <option value="open" ${state.filters.status === 'open' ? 'selected' : ''}>${t('statusOpen')}</option>
              <option value="done" ${state.filters.status === 'done' ? 'selected' : ''}>${t('statusDone')}</option>
            </select>
            <div class="helper align-end">${permissions.canReorderLists ? t('ownerOnlyReorder') : (permissions.canEditBoard ? t('listEditor') : t('yourListOnly'))}</div>
          </div>
        </div>

        ${state.ui.listComposerOpen && permissions.canEditBoard ? `
          <form id="list-form" class="panel compact-form">
            <input name="name" placeholder="${t('listName')}" value="${escapeHtml(state.ui.listName)}" required />
            <select name="ownerUserId">
              <option value="">${t('chooseListOwner')}</option>
              ${state.board.members.map((member) => `<option value="${member.id}" ${state.ui.listOwnerUserId === member.id ? 'selected' : ''}>${escapeHtml(member.name)}</option>`).join('')}
            </select>
            <div class="row">
              <button class="primary" type="submit">${t('saveList')}</button>
              <button class="ghost" type="button" id="cancel-list-form">${t('cancel')}</button>
            </div>
          </form>
        ` : ''}

        <div class="board-layout single-column-board">
          <div class="board-canvas">
            <div class="lists-wrap" id="lists-wrap">
              ${state.board.lists.map((list, index) => {
                const cards = state.board.cards.filter((card) => card.listId === list.id);
                const canManageThisList = canManageListUi(list);
                const listAccent = getListColor(list.id) || defaultListAccent(index);
                return `
                  <div class="list-column ${canManageThisList ? '' : 'list-readonly'}" data-list-id="${list.id}" draggable="${permissions.canReorderLists ? 'true' : 'false'}" style="--list-accent:${escapeHtml(listAccent)}">
                    <div class="list-header">
                      <div class="list-title-row">
                        <div>
                          <div class="list-title">${escapeHtml(getDisplayListName(list.name))}</div>
                          <div class="helper">${escapeHtml(list.owner?.name || '')}</div>
                        </div>
                        <div class="row list-tools">
                          <label class="list-color-control" title="${t('listColor')}">
                            <input type="color" value="${escapeHtml(listAccent)}" data-list-color="${list.id}" />
                          </label>
                          <div class="helper" data-visible-count>${cards.length}</div>
                          ${permissions.canEditBoard ? `<button type="button" class="ghost small icon-btn" data-open-list-editor="${list.id}" title="${t('listEditor')}">✎</button>` : ''}
                        </div>
                      </div>
                    </div>
                    <div class="list-body" data-card-dropzone="${list.id}">
                      ${cards.map(renderCardCard).join('')}
                      <div class="empty-state small-empty list-empty ${cards.length ? 'hidden' : ''}">${cards.length ? t('noResults') : t('noCards')}</div>
                    </div>
                    <div class="list-footer">
                      ${state.ui.listEditorOpenById[list.id] && permissions.canEditBoard ? `
                        <form class="list-composer list-editor" data-list-editor-form="${list.id}">
                          <input name="name" value="${escapeHtml(list.name)}" placeholder="${t('listName')}" required />
                          <select name="ownerUserId">
                            <option value="">${t('chooseListOwner')}</option>
                            ${state.board.members.map((member) => `<option value="${member.id}" ${String(list.ownerUserId || '') === member.id ? 'selected' : ''}>${escapeHtml(member.name)}</option>`).join('')}
                          </select>
                          <div class="row wrap-row">
                            <button class="primary small" type="submit">${t('saveChanges')}</button>
                            <button type="button" class="ghost small" data-cancel-list-editor="${list.id}">${t('cancel')}</button>
                            <button type="button" class="danger small" data-delete-list="${list.id}">${t('deleteList')}</button>
                          </div>
                        </form>
                      ` : ''}
                      ${canManageThisList ? (state.ui.cardComposerOpenByList[list.id] ? `
                        <form class="list-composer" data-card-form="${list.id}">
                          <textarea name="title" rows="3" placeholder="${t('writeCardTitle')}" required>${escapeHtml(state.ui.cardDraftsByList[list.id] || '')}</textarea>
                          <div class="row">
                            <button class="primary small" type="submit">${t('saveCardInline')}</button>
                            <button type="button" class="ghost small" data-cancel-card-form="${list.id}">${t('cancel')}</button>
                          </div>
                        </form>
                      ` : `<button class="ghost add-card-inline" data-open-card-form="${list.id}">+ ${t('newCard')}</button>`) : `<div class="helper">${t('yourListOnly')}</div>`}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
      ${renderLanguageBar()}
    </div>
  `;

  bindLanguageBar();
  bindTopbarCommonActions();
  bindBoardNav();
  applyBoardFiltersDom();

  document.getElementById('logout-btn').addEventListener('click', async () => {
    await api('/api/auth/logout', { method: 'POST' });
    state.user = null;
    state.workspaces = [];
    state.board = null;
    state.boardId = null;
    if (state.sse) state.sse.close();
    location.hash = '#/';
    render();
  });

  document.getElementById('go-dashboard').addEventListener('click', () => {
    location.hash = '#/';
  });

  const toggleListComposer = document.getElementById('toggle-list-composer');
  if (toggleListComposer) {
    toggleListComposer.addEventListener('click', () => {
      state.ui.listComposerOpen = !state.ui.listComposerOpen;
      if (!state.ui.listOwnerUserId) state.ui.listOwnerUserId = state.user?.id || '';
      render();
    });
  }

  const listForm = document.getElementById('list-form');
  if (listForm) {
    listForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const name = String(form.get('name') || '').trim();
      const ownerUserId = String(form.get('ownerUserId') || '').trim();
      if (!name) return;
      try {
        state.board = await api(`/api/boards/${state.boardId}/lists`, { method: 'POST', body: { name, ownerUserId } });
        state.ui.listComposerOpen = false;
        state.ui.listName = '';
        state.ui.listOwnerUserId = '';
        render();
        showToast(t('createdSuccess'));
      } catch (error) {
        showToast(error.message);
      }
    });
    document.getElementById('cancel-list-form').addEventListener('click', () => {
      state.ui.listComposerOpen = false;
      render();
    });
  }

  document.getElementById('search-input').addEventListener('input', (event) => {
    state.filters.search = event.target.value;
    applyBoardFiltersDom();
  });
  document.getElementById('label-input').addEventListener('input', (event) => {
    state.filters.label = event.target.value;
    applyBoardFiltersDom();
  });
  document.getElementById('assignee-filter').addEventListener('change', (event) => {
    state.filters.assignee = event.target.value;
    applyBoardFiltersDom();
  });
  document.getElementById('status-filter').addEventListener('change', (event) => {
    state.filters.status = event.target.value;
    applyBoardFiltersDom();
  });

  document.querySelectorAll('[data-list-color]').forEach((input) => {
    const updateColor = () => {
      const listId = input.dataset.listColor;
      const color = normalizeHexColor(input.value);
      if (!listId || !color) return;
      persistListColor(listId, color);
    };
    input.addEventListener('input', () => {
      const listId = input.dataset.listColor;
      const color = normalizeHexColor(input.value);
      if (!listId || !color) return;
      setListColor(listId, color);
      applyListColorToColumn(listId, color);
    });
    input.addEventListener('change', updateColor);
    input.addEventListener('blur', updateColor);
  });

  document.querySelectorAll('[data-open-list-editor]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const listId = btn.dataset.openListEditor;
      state.ui.listEditorOpenById[listId] = !state.ui.listEditorOpenById[listId];
      render();
    });
  });

  document.querySelectorAll('[data-cancel-list-editor]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.ui.listEditorOpenById[btn.dataset.cancelListEditor] = false;
      render();
    });
  });

  document.querySelectorAll('[data-list-editor-form]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const listId = form.dataset.listEditorForm;
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const ownerUserId = String(data.get('ownerUserId') || '').trim();
      if (!name) return;
      try {
        state.board = await api(`/api/lists/${listId}`, { method: 'PATCH', body: { name, ownerUserId } });
        state.ui.listEditorOpenById[listId] = false;
        render();
        showToast(t('listUpdated'));
      } catch (error) {
        showToast(error.message);
      }
    });
  });

  document.querySelectorAll('[data-delete-list]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const listId = btn.dataset.deleteList;
      if (!confirm(`${t('deleteList')}?`)) return;
      try {
        state.board = await api(`/api/lists/${listId}`, { method: 'DELETE' });
        delete state.ui.listEditorOpenById[listId];
        render();
        showToast(t('deletedSuccess'));
      } catch (error) {
        showToast(error.message);
      }
    });
  });


  document.querySelectorAll('[data-open-card-form]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.ui.cardComposerOpenByList[btn.dataset.openCardForm] = true;
      render();
    });
  });

  document.querySelectorAll('[data-cancel-card-form]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.ui.cardComposerOpenByList[btn.dataset.cancelCardForm] = false;
      render();
    });
  });

  document.querySelectorAll('[data-card-form]').forEach((form) => {
    form.addEventListener('input', () => {
      const listId = form.dataset.cardForm;
      const titleField = form.querySelector('textarea[name="title"]');
      if (listId && titleField) state.ui.cardDraftsByList[listId] = titleField.value;
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const listId = form.dataset.cardForm;
      const title = String(new FormData(form).get('title') || '').trim();
      if (!title) return;
      try {
        await api('/api/cards', { method: 'POST', body: { boardId: state.boardId, listId, title } });
        await loadBoard(state.boardId, false);
        state.ui.cardComposerOpenByList[listId] = false;
        state.ui.cardDraftsByList[listId] = '';
        render();
        showToast(t('createdSuccess'));
      } catch (error) {
        showToast(error.message);
      }
    });
  });

  document.querySelectorAll('[data-open-card]').forEach((cardNode) => {
    cardNode.addEventListener('click', async (event) => {
      if (event.target.closest('[data-toggle-complete]')) return;
      await openCard(cardNode.dataset.openCard);
    });
  });

  document.querySelectorAll('[data-toggle-complete]').forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      event.stopPropagation();
      const cardId = btn.dataset.toggleComplete;
      const card = state.board.cards.find((item) => item.id === cardId);
      if (!card || !canManageCardUi(card)) {
        showToast(t('yourListOnly'));
        return;
      }
      try {
        await api(`/api/cards/${cardId}`, { method: 'PATCH', body: { isCompleted: !card.isCompleted } });
        await loadBoard(state.boardId, false);
        if (state.cardDetail?.card?.id === cardId) state.cardDetail = await api(`/api/cards/${cardId}`);
        render();
      } catch (error) {
        showToast(error.message);
      }
    });
  });

  enableDragAndDrop();
}

function enableDragAndDrop() {
  document.querySelectorAll('.list-column').forEach((listNode) => {
    listNode.addEventListener('dragstart', (event) => {
      if (event.target !== listNode) return;
      state.drag = { type: 'list', id: listNode.dataset.listId, sourceListId: null };
      listNode.classList.add('dragging');
    });
    listNode.addEventListener('dragend', async () => {
      listNode.classList.remove('dragging');
      cleanupDropTargets();
      if (state.drag.type === 'list') await persistListOrder();
      state.drag = { type: null, id: null, sourceListId: null };
    });
  });

  document.querySelectorAll('.kanban-card').forEach((cardNode) => {
    cardNode.addEventListener('dragstart', (event) => {
      const list = cardNode.closest('.list-column');
      state.drag = { type: 'card', id: cardNode.dataset.cardId, sourceListId: list?.dataset.listId || null };
      cardNode.classList.add('dragging');
      event.stopPropagation();
    });
    cardNode.addEventListener('dragend', async () => {
      cardNode.classList.remove('dragging');
      cleanupDropTargets();
      if (state.drag.type === 'card') await persistCardOrder();
      state.drag = { type: null, id: null, sourceListId: null };
    });
  });

  const listsWrap = document.getElementById('lists-wrap');
  if (listsWrap) {
    listsWrap.addEventListener('dragover', (event) => {
      if (state.drag.type !== 'list') return;
      event.preventDefault();
      const dragging = document.querySelector('.list-column.dragging');
      const siblings = [...listsWrap.querySelectorAll('.list-column:not(.dragging)')];
      const next = siblings.find((item) => event.clientX < item.getBoundingClientRect().left + item.offsetWidth / 2);
      if (next) listsWrap.insertBefore(dragging, next);
      else listsWrap.appendChild(dragging);
    });
  }

  document.querySelectorAll('[data-card-dropzone]').forEach((zone) => {
    zone.addEventListener('dragover', (event) => {
      if (state.drag.type !== 'card') return;
      event.preventDefault();
      zone.classList.add('drop-target');
      const dragging = document.querySelector('.kanban-card.dragging');
      const siblings = [...zone.querySelectorAll('.kanban-card:not(.dragging)')];
      const next = siblings.find((item) => event.clientY < item.getBoundingClientRect().top + item.offsetHeight / 2);
      if (next) zone.insertBefore(dragging, next);
      else zone.appendChild(dragging);
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('drop-target'));
  });
}

function cleanupDropTargets() {
  document.querySelectorAll('.drop-target').forEach((node) => node.classList.remove('drop-target'));
}

async function persistListOrder() {
  const payload = [...document.querySelectorAll('.list-column')].map((node, index) => ({ id: node.dataset.listId, position: index }));
  try {
    state.board = await api(`/api/boards/${state.boardId}/reorder`, { method: 'POST', body: { lists: payload, cards: [] } });
    render();
  } catch (error) {
    showToast(error.message);
    await loadBoard(state.boardId);
  }
}

async function persistCardOrder() {
  const payload = [];
  document.querySelectorAll('[data-card-dropzone]').forEach((zone) => {
    [...zone.querySelectorAll('.kanban-card')].forEach((cardNode, index) => {
      payload.push({ id: cardNode.dataset.cardId, listId: zone.dataset.cardDropzone, position: index });
    });
  });
  try {
    state.board = await api(`/api/boards/${state.boardId}/reorder`, { method: 'POST', body: { lists: [], cards: payload } });
    render();
  } catch (error) {
    showToast(error.message);
    await loadBoard(state.boardId);
  }
}

function renderModal() {
  if (!state.cardDetail || !state.board) {
    modalRoot.innerHTML = '';
    return;
  }

  const card = state.cardDetail.card;
  const members = state.board.members || [];
  const canEdit = canManageCardUi(card);
  const editableLists = state.board.lists.filter((list) => canManageListUi(list));
  const availableLists = canEdit ? editableLists : state.board.lists;
  const draft = state.ui.cardDetailDraft?.cardId === card.id ? state.ui.cardDetailDraft : null;
  const draftTitle = draft ? draft.title : card.title;
  const draftDescription = draft ? draft.description : (card.description || '');
  const draftLabels = draft ? draft.labels : (card.labels || []).join(', ');
  const draftListId = draft ? draft.listId : card.listId;
  const draftAssigneeUserId = draft ? draft.assigneeUserId : (card.assigneeUserId || '');
  const draftStartDate = draft ? draft.startDate : toLocalDateInput(card.startDate);
  const draftDueDate = draft ? draft.dueDate : toLocalDateInput(card.dueDate);
  const draftIsCompleted = draft ? draft.isCompleted : card.isCompleted;

  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="modal-backdrop">
      <div class="modal-card">
        <div class="modal-header">
          <div>
            <h2 style="margin:0 0 6px;">${escapeHtml(card.title)}</h2>
            <div class="helper">${t('createdAt')}: ${escapeHtml(formatDate(card.createdAt))}</div>
          </div>
          <div class="row">
            ${canEdit ? `<button class="danger" id="delete-card-btn">${t('deleteCard')}</button>` : ''}
            <button class="ghost" id="close-modal-btn">${t('close')}</button>
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <form id="card-form" class="form-stack">
              <label>${t('cardTitle')}<input name="title" value="${escapeHtml(draftTitle)}" ${canEdit ? '' : 'disabled'} required /></label>
              <label>${t('description')}<textarea name="description" ${canEdit ? '' : 'disabled'}>${escapeHtml(draftDescription)}</textarea></label>
              <div class="grid-2">
                <label>${t('labels')}<input name="labels" value="${escapeHtml(draftLabels)}" placeholder="${t('labelsHint')}" ${canEdit ? '' : 'disabled'} /></label>
                <label>${t('assignee')}
                  <select name="assigneeUserId" ${canEdit ? '' : 'disabled'}>
                    <option value="">${t('unassigned')}</option>
                    ${members.map((member) => `<option value="${member.id}" ${draftAssigneeUserId === member.id ? 'selected' : ''}>${escapeHtml(member.name)}</option>`).join('')}
                  </select>
                </label>
              </div>
              <div class="grid-2">
                <label>${t('startDate')}<input type="datetime-local" name="startDate" value="${escapeHtml(draftStartDate)}" ${canEdit ? '' : 'disabled'} /></label>
                <label>${t('dueDate')}<input type="datetime-local" name="dueDate" value="${escapeHtml(draftDueDate)}" ${canEdit ? '' : 'disabled'} /></label>
              </div>
              <div class="grid-2">
                <label>${t('list')}
                  <select name="listId" ${canEdit ? '' : 'disabled'}>
                    ${availableLists.map((list) => `<option value="${list.id}" ${draftListId === list.id ? 'selected' : ''}>${escapeHtml(getDisplayListName(list.name))}</option>`).join('')}
                  </select>
                </label>
                <label class="checkbox-line"><input type="checkbox" name="isCompleted" ${draftIsCompleted ? 'checked' : ''} ${canEdit ? '' : 'disabled'} /> ${t('completed')}</label>
              </div>
              ${canEdit ? `<button class="primary" type="submit">${t('saveCard')}</button>` : `<div class="helper">${t('yourListOnly')}</div>`}
            </form>

            <div class="panel">
              <div class="section-head"><h3>${t('checklist')}</h3></div>
              ${canEdit ? `
                <form id="checklist-add-form" class="row">
                  <input name="title" placeholder="${t('newChecklistItem')}" />
                  <button class="primary" type="submit">${t('add')}</button>
                </form>
              ` : `<div class="helper">${t('yourListOnly')}</div>`}
              <div class="checklist-list" style="margin-top:12px;">
                ${state.cardDetail.checklist.length ? state.cardDetail.checklist.map((item) => `
                  <div class="check-item">
                    <input type="checkbox" ${item.isDone ? 'checked' : ''} data-toggle-check="${item.id}" ${canEdit ? '' : 'disabled'} />
                    <div>
                      <div>${escapeHtml(item.title)}</div>
                      <div class="helper">${item.dueDate ? escapeHtml(formatDate(item.dueDate)) : t('noDate')}</div>
                    </div>
                    ${canEdit ? `<div class="row"><button class="small ghost" type="button" data-edit-check="${item.id}">${t('edit')}</button><button class="small danger" type="button" data-delete-check="${item.id}">${t('delete')}</button></div>` : ''}
                  </div>
                `).join('') : `<div class="empty-state">${t('emptyChecklist')}</div>`}
              </div>
            </div>

            <div class="panel">
              <div class="section-head"><h3>${t('comments')}</h3></div>
              ${canEdit ? `
                <form id="comment-form" class="form-stack">
                  <textarea name="content" placeholder="${t('writeComment')}"></textarea>
                  <button class="primary" type="submit">${t('addComment')}</button>
                </form>
              ` : `<div class="helper">${t('yourListOnly')}</div>`}
              <div class="comment-list" style="margin-top:12px;">
                ${state.cardDetail.comments.length ? state.cardDetail.comments.map((comment) => `
                  <div class="comment-card">
                    <div class="row">
                      ${renderAvatar(comment.user)}
                      <div>
                        <div>${escapeHtml(comment.user.name)}</div>
                        <div class="helper">${escapeHtml(formatAgo(comment.createdAt))}</div>
                      </div>
                    </div>
                    <div style="margin-top:10px; white-space:pre-wrap;">${escapeHtml(comment.content)}</div>
                  </div>
                `).join('') : `<div class="empty-state">${t('noComments')}</div>`}
              </div>
            </div>
          </div>

          <div class="modal-section">
            <div class="panel">
              <div class="section-head"><h3>${t('attachments')}</h3></div>
              ${canEdit ? `
                <form id="link-attachment-form" class="form-stack">
                  <label>${t('link')}<input name="url" placeholder="https://..." /></label>
                  <button class="ghost" type="submit">${t('addLink')}</button>
                </form>
                <form id="file-attachment-form" class="form-stack" style="margin-top:12px;">
                  <label>${t('file')}<input type="file" name="file" /></label>
                  <div class="helper">${t('fileHint')}</div>
                  <button class="ghost" type="submit">${t('uploadFile')}</button>
                </form>
              ` : `<div class="helper">${t('yourListOnly')}</div>`}
              <div class="attachment-list" style="margin-top:12px;">
                ${state.cardDetail.attachments.length ? state.cardDetail.attachments.map((file) => `
                  <div class="attachment-item">
                    <div>
                      <div>${escapeHtml(file.name)}</div>
                      <div class="helper">${escapeHtml(file.kind)}${file.sizeBytes ? ` · ${(file.sizeBytes / 1024).toFixed(1)} KB` : ''}</div>
                    </div>
                    <div class="row">
                      <a href="${escapeHtml(file.downloadUrl)}" target="_blank" rel="noreferrer"><button type="button" class="small ghost">${t('open')}</button></a>
                      ${canEdit ? `<button type="button" class="small danger" data-delete-attachment="${file.id}">${t('delete')}</button>` : ''}
                    </div>
                  </div>
                `).join('') : `<div class="empty-state">${t('noAttachments')}</div>`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modal-backdrop').addEventListener('click', (event) => {
    if (event.target.id === 'modal-backdrop') closeCardModal();
  });
  document.getElementById('close-modal-btn').addEventListener('click', closeCardModal);

  const deleteBtn = document.getElementById('delete-card-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
      if (!confirm(t('confirmDeleteCard'))) return;
      try {
        await api(`/api/cards/${card.id}`, { method: 'DELETE' });
        closeCardModal();
        await loadBoard(state.boardId);
        showToast(t('deletedSuccess'));
      } catch (error) {
        showToast(error.message);
      }
    });
  }

  const cardForm = document.getElementById('card-form');
  if (canEdit && cardForm) {
    cardForm.addEventListener('input', captureCardDetailDraftFromDom);
    cardForm.addEventListener('change', captureCardDetailDraftFromDom);

    cardForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const payload = Object.fromEntries(form.entries());
      payload.isCompleted = form.get('isCompleted') === 'on';
      try {
        state.cardDetail = await api(`/api/cards/${card.id}`, { method: 'PATCH', body: payload });
        clearCardDetailDraft(card.id);
        await loadBoard(state.boardId, false);
        render();
        renderModal();
        showToast(t('saveSuccess'));
      } catch (error) {
        showToast(error.message);
      }
    });
  }

  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const content = String(new FormData(event.currentTarget).get('content') || '').trim();
      if (!content) return;
      try {
        state.cardDetail = await api(`/api/cards/${card.id}/comments`, { method: 'POST', body: { content } });
        await loadBoard(state.boardId, false);
        render();
        renderModal();
        showToast(t('commentCreated'));
      } catch (error) {
        showToast(error.message);
      }
    });
  }

  const checklistAddForm = document.getElementById('checklist-add-form');
  if (checklistAddForm) {
    checklistAddForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const title = String(new FormData(event.currentTarget).get('title') || '').trim();
      if (!title) return;
      try {
        state.cardDetail = await api(`/api/cards/${card.id}/checklist-items`, { method: 'POST', body: { title } });
        await loadBoard(state.boardId, false);
        render();
        renderModal();
        showToast(t('checklistAdded'));
      } catch (error) {
        showToast(error.message);
      }
    });
  }

  document.querySelectorAll('[data-toggle-check]').forEach((checkbox) => {
    checkbox.addEventListener('change', async () => {
      const item = state.cardDetail.checklist.find((entry) => entry.id === checkbox.dataset.toggleCheck);
      if (!item) return;
      try {
        state.cardDetail = await api(`/api/checklist-items/${item.id}`, { method: 'PATCH', body: { isDone: checkbox.checked } });
        renderModal();
      } catch (error) {
        showToast(error.message);
      }
    });
  });

  document.querySelectorAll('[data-edit-check]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const item = state.cardDetail.checklist.find((entry) => entry.id === btn.dataset.editCheck);
      if (!item) return;
      const title = prompt(t('edit'), item.title);
      if (title === null) return;
      try {
        state.cardDetail = await api(`/api/checklist-items/${item.id}`, { method: 'PATCH', body: { title } });
        renderModal();
      } catch (error) {
        showToast(error.message);
      }
    });
  });

  document.querySelectorAll('[data-delete-check]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        state.cardDetail = await api(`/api/checklist-items/${btn.dataset.deleteCheck}`, { method: 'DELETE' });
        renderModal();
      } catch (error) {
        showToast(error.message);
      }
    });
  });

  const linkAttachmentForm = document.getElementById('link-attachment-form');
  if (linkAttachmentForm) {
    linkAttachmentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const url = String(new FormData(event.currentTarget).get('url') || '').trim();
      if (!url) return;
      try {
        state.cardDetail = await api(`/api/cards/${card.id}/attachments`, { method: 'POST', body: { kind: 'link', url, name: url } });
        renderModal();
        showToast(t('attachmentAdded'));
      } catch (error) {
        showToast(error.message);
      }
    });
  }

  const fileAttachmentForm = document.getElementById('file-attachment-form');
  if (fileAttachmentForm) {
    fileAttachmentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const file = event.currentTarget.querySelector('input[type="file"]').files?.[0];
      if (!file) return;
      const dataBase64 = await fileToBase64(file);
      try {
        state.cardDetail = await api(`/api/cards/${card.id}/attachments`, {
          method: 'POST',
          body: { kind: 'file', name: file.name, mimeType: file.type || 'application/octet-stream', dataBase64 }
        });
        renderModal();
        showToast(t('attachmentAdded'));
      } catch (error) {
        showToast(error.message);
      }
    });
  }

  document.querySelectorAll('[data-delete-attachment]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        state.cardDetail = await api(`/api/attachments/${btn.dataset.deleteAttachment}`, { method: 'DELETE' });
        renderModal();
      } catch (error) {
        showToast(error.message);
      }
    });
  });
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      resolve(result.includes(',') ? result.split(',')[1] : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function render() {
  captureDraftsFromDom();

  if (!state.user) {
    renderAuth();
    renderModal();
    return;
  }
  const route = currentRoute();
  if (route.name === 'board') renderBoard();
  else if (route.name === 'board-members') renderBoardMembers();
  else if (route.name === 'board-activity') renderBoardActivity();
  else if (route.name === 'board-settings') renderBoardSettings();
  else if (route.name === 'profile') renderProfile();
  else renderDashboard();
  renderModal();
}

async function handleRouteChange() {
  const route = currentRoute();
  state.cardDetail = null;
  if (!state.user) {
    render();
    return;
  }
  if (['board', 'board-members', 'board-activity', 'board-settings'].includes(route.name)) {
    try {
      await loadBoard(route.boardId, false);
    } catch (error) {
      showToast(error.message);
      location.hash = '#/';
      state.board = null;
      state.boardId = null;
    }
  } else {
    state.board = null;
    state.boardId = null;
    if (state.sse) {
      state.sse.close();
      state.sse = null;
    }
    await refreshDashboard();
    if (route.name === 'profile') {
      try {
        await loadProfile();
      } catch (error) {
        showToast(error.message);
      }
    }
  }
  render();
}

async function boot() {
  try {
    await loadMe();
    const route = currentRoute();
    if (state.user && ['board', 'board-members', 'board-activity', 'board-settings'].includes(route.name)) {
      try {
        await loadBoard(route.boardId, false);
      } catch {
        location.hash = '#/';
      }
    }
    if (state.user && route.name === 'profile') {
      try {
        await loadProfile();
      } catch {
        location.hash = '#/';
      }
    }
  } catch {
    state.user = null;
    state.workspaces = [];
  }
  render();
}

window.addEventListener('hashchange', handleRouteChange);
setInterval(() => {
  if (state.boardId && !isEditingCardForm()) render();
}, 60000);

boot();
