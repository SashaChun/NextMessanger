# NextMessanger - Інструкція з налаштування

## Необхідні змінні оточення (.env)

Створіть файл `.env` в корені проекту з наступними змінними:

```env
# Database (MongoDB)
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database_name"

# NextAuth - для автентифікації
NEXTAUTH_SECRET="your-nextauth-secret-key-here"
# Для production додайте:
# NEXTAUTH_URL="https://your-domain.com"

# Pusher - для real-time повідомлень
PUSHER_APP_ID="your-pusher-app-id"
NEXT_PUBLIC_PUSHER_APP_KEY="your-pusher-app-key"
PUSHER_SECRET="your-pusher-secret"

# Cloudinary - для завантаження зображень
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
```

## Як отримати ключі

### 1. MongoDB (DATABASE_URL)
1. Зареєструйтесь на https://www.mongodb.com/cloud/atlas
2. Створіть безкоштовний кластер
3. Натисніть "Connect" → "Connect your application"
4. Скопіюйте connection string і замініть `<password>` на ваш пароль

### 2. NextAuth Secret (NEXTAUTH_SECRET)
Згенеруйте випадковий ключ:
```bash
openssl rand -base64 32
```
Або використайте онлайн генератор: https://generate-secret.vercel.app/32

### 3. Pusher (Real-time messaging)
1. Зареєструйтесь на https://pusher.com/
2. Створіть новий Channels app
3. Виберіть кластер: `eu` (Europe)
4. Скопіюйте App ID, Key, та Secret з розділу "App Keys"

### 4. Cloudinary (Image uploads)
1. Зареєструйтесь на https://cloudinary.com/
2. Перейдіть в Dashboard
3. Скопіюйте "Cloud Name"
4. Створіть Upload Preset:
   - Settings → Upload → Upload presets
   - Створіть новий preset з назвою `khil6cee` (або змініть в коді)
   - Режим: Unsigned

## Кроки встановлення

1. **Встановіть залежності:**
```bash
npm install
```

2. **Налаштуйте базу даних:**
```bash
npx prisma generate
npx prisma db push
```

3. **Запустіть проект:**
```bash
npm run dev
```

Проект буде доступний на http://localhost:3000

## Перевірка роботи

- ✅ База даних підключена (Prisma)
- ✅ Автентифікація працює (NextAuth)
- ✅ Real-time повідомлення (Pusher)
- ✅ Завантаження зображень (Cloudinary)

## Можливі проблеми

### Помилка підключення до БД
- Перевірте правильність DATABASE_URL
- Переконайтесь що IP адреса дозволена в MongoDB Atlas (Network Access)

### Pusher не працює
- Перевірте що кластер встановлено як `eu` в коді
- Переконайтесь що всі 3 ключі правильні

### Cloudinary не завантажує
- Перевірте що Upload Preset створено і має режим "Unsigned"
- Переконайтесь що Cloud Name правильний
