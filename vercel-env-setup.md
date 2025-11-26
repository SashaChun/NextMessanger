# Налаштування змінних оточення для Vercel

## Змінні які треба додати в Vercel Dashboard

Перейдіть: **Project Settings → Environment Variables**

Додайте наступні змінні:

### 1. DATABASE_URL
```
mongodb+srv://chunsasha273_db_user:JfFLjWD3L0VRFZC9@cluster0.ooultp0.mongodb.net/nextmessanger
```

### 2. NEXTAUTH_SECRET
```
your-nextauth-secret-key-here
```

### 3. NEXTAUTH_URL
```
https://your-vercel-app-url.vercel.app
```
⚠️ Замініть на реальний URL вашого Vercel додатку після деплою

### 4. PUSHER_APP_ID
```
1940487
```

### 5. NEXT_PUBLIC_PUSHER_APP_KEY
```
b39ef5e4f9a6ba9b3f8b
```

### 6. PUSHER_SECRET
```
937a5dfddb7979659fe1
```

### 7. NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
```
dwdm8iruc
```

---

## Важливо для MongoDB Atlas

Переконайтесь що в **MongoDB Atlas → Network Access**:
- Додано IP адресу `0.0.0.0/0` (дозволити всі IP)
- Або додано IP адреси Vercel

---

## Кроки деплою:

1. ✅ Виправлено помилки в коді
2. ⬜ Закоммітити зміни в Git
3. ⬜ Запушити в GitHub
4. ⬜ Додати змінні оточення в Vercel
5. ⬜ Redeploy в Vercel
