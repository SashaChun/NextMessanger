# 🔐 Змінні оточення для NextMessanger

## Обов'язкові змінні (.env)

Створіть файл `.env` в корені проекту:

```env
# 1. База даних MongoDB
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/nextmessanger?retryWrites=true&w=majority"

# 2. NextAuth - автентифікація
NEXTAUTH_SECRET="your-secret-key-min-32-characters-long"

# 3. Pusher - real-time повідомлення
PUSHER_APP_ID="1234567"
NEXT_PUBLIC_PUSHER_APP_KEY="abcdef123456"
PUSHER_SECRET="secret123456"

# 4. Cloudinary - завантаження зображень
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
```

---

## 📝 Детальний опис кожної змінної

### 1️⃣ DATABASE_URL
**Призначення:** Підключення до MongoDB бази даних  
**Формат:** `mongodb+srv://username:password@cluster/database`

**Як отримати:**
1. Зареєструйтесь на https://www.mongodb.com/cloud/atlas
2. Створіть безкоштовний кластер (M0)
3. Database Access → Add New Database User
4. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
5. Databases → Connect → Connect your application → Copy connection string
6. Замініть `<password>` на ваш пароль

**Приклад:**
```
DATABASE_URL="mongodb+srv://myuser:MyPass123@cluster0.abc123.mongodb.net/nextmessanger?retryWrites=true&w=majority"
```

---

### 2️⃣ NEXTAUTH_SECRET
**Призначення:** Секретний ключ для шифрування JWT токенів  
**Формат:** Випадковий рядок мінімум 32 символи

**Як згенерувати:**

**Варіант 1 - OpenSSL:**
```bash
openssl rand -base64 32
```

**Варіант 2 - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Варіант 3 - Онлайн:**
https://generate-secret.vercel.app/32

**Приклад:**
```
NEXTAUTH_SECRET="Xy9kL2mN5pQ8rS1tU4vW7xY0zA3bC6dE9fG2hJ5kL8mN1pQ4rS7tU0vW3xY6zA9b"
```

---

### 3️⃣ Pusher (3 змінні)
**Призначення:** Real-time повідомлення між користувачами  
**Сервіс:** https://pusher.com/

**Як отримати:**
1. Зареєструйтесь на https://pusher.com/
2. Channels → Create app
3. Налаштування:
   - Name: `NextMessanger` (або будь-яка назва)
   - Cluster: **EU (Europe)** ⚠️ ВАЖЛИВО!
   - Tech stack: React + Node.js
4. App Keys → Скопіюйте:
   - `app_id` → PUSHER_APP_ID
   - `key` → NEXT_PUBLIC_PUSHER_APP_KEY
   - `secret` → PUSHER_SECRET

**⚠️ ВАЖЛИВО:** Кластер має бути `eu` (налаштовано в коді)

**Приклад:**
```
PUSHER_APP_ID="1234567"
NEXT_PUBLIC_PUSHER_APP_KEY="a1b2c3d4e5f6g7h8i9j0"
PUSHER_SECRET="k1l2m3n4o5p6q7r8s9t0"
```

---

### 4️⃣ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
**Призначення:** Завантаження та зберігання зображень  
**Сервіс:** https://cloudinary.com/

**Як отримати:**
1. Зареєструйтесь на https://cloudinary.com/
2. Dashboard → Скопіюйте "Cloud Name"
3. Settings → Upload → Upload presets
4. Add upload preset:
   - Preset name: `khil6cee` ⚠️ ВАЖЛИВО!
   - Signing Mode: **Unsigned**
   - Folder: `nextmessanger` (опціонально)
5. Save

**⚠️ ВАЖЛИВО:** Upload preset має називатись `khil6cee` (або змініть в коді)

**Приклад:**
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="my-cloud-name"
```

---

## 🚀 Швидкий старт

1. **Створіть `.env` файл:**
```bash
# Windows PowerShell
New-Item .env -ItemType File

# Linux/Mac
touch .env
```

2. **Скопіюйте шаблон:**
```bash
# Windows
copy env.example .env

# Linux/Mac
cp env.example .env
```

3. **Заповніть всі змінні** (див. інструкції вище)

4. **Встановіть залежності:**
```bash
npm install
```

5. **Налаштуйте базу даних:**
```bash
npx prisma generate
npx prisma db push
```

6. **Запустіть проект:**
```bash
npm run dev
```

---

## ✅ Перевірка налаштувань

Після створення `.env` файлу перевірте:

- [ ] Всі 6 змінних заповнені
- [ ] DATABASE_URL містить правильний пароль
- [ ] NEXTAUTH_SECRET має мінімум 32 символи
- [ ] Pusher кластер встановлено як `eu`
- [ ] Cloudinary preset `khil6cee` створено як Unsigned
- [ ] Немає пробілів навколо знаку `=`
- [ ] Немає лапок навколо значень (якщо не містять пробіли)

---

## 🐛 Типові помилки

### Помилка: "PrismaClientInitializationError"
❌ Проблема: Неправильний DATABASE_URL  
✅ Рішення: Перевірте connection string, пароль, та Network Access в MongoDB

### Помилка: "Invalid credentials"
❌ Проблема: NEXTAUTH_SECRET відсутній або неправильний  
✅ Рішення: Згенеруйте новий ключ за допомогою `openssl rand -base64 32`

### Помилка: Повідомлення не приходять в real-time
❌ Проблема: Неправильні Pusher ключі або кластер  
✅ Рішення: Перевірте що кластер `eu` та всі 3 ключі правильні

### Помилка: Зображення не завантажуються
❌ Проблема: Cloudinary preset не створено або має інше ім'я  
✅ Рішення: Створіть preset `khil6cee` з режимом Unsigned

---

## 📚 Додаткові ресурси

- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Pusher Channels Docs](https://pusher.com/docs/channels/)
- [Cloudinary Upload Docs](https://cloudinary.com/documentation/upload_images)

---

## 🔒 Безпека

⚠️ **НІКОЛИ** не коммітьте `.env` файл в Git!

Файл `.gitignore` вже налаштовано:
```gitignore
.env*
```

Для production додайте:
```env
NEXTAUTH_URL="https://your-domain.com"
NODE_ENV="production"
```
