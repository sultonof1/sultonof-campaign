# Sultonof Campaign Website 🚀

🌍 **Multi-language (UZ/RU/EN) Campaign Management System**

To'liq ko'p tilli kampaniya boshqaruv va admin paneli bilan sayt.

## 🎯 Asosiy Xususiyatlari

✅ **3 Tillilik Tizim** - Uzbek, Russian, English  
✅ **Admin Panel** - Login/Parol bilan himoyalangan  
✅ **Xodimlar Boshqaruvi** - CRUD operatsiyalari + Rasm + Statistika  
✅ **Kompaniya Ma'lumoti** - Galereyasi, Tarixi, Yutuqlari  
✅ **Portfolio** - Loyihalar va ish namunalari  
✅ **Filter Tizimi** - Turli xil kontentni ko'rish  
✅ **Responsive Design** - Mobile, Tablet, Desktop  
✅ **Light Mode** - Pastel ranglar bilan toza dizayn  
✅ **Rasm Preview** - Yuklashdan oldin ko'rish  
✅ **Modal Tasdiqlash** - Ma'lumot o'chirishda xavfsizlik  

## 🛠️ Stack

**Backend:**
- Node.js + Express
- MongoDB
- JWT Authentication
- Multer (Rasm yuklash)

**Frontend:**
- React 18 + Vite
- React Router
- Axios
- CSS3 (Light Mode + Pastel ranglar)

## 🚀 Tezkor Boshlanish

### 1. Backend O'rnatish
```bash
cd backend
npm install
npm start
# Backend: http://localhost:5000
```

### 2. Frontend O'rnatish
```bash
cd frontend
npm install
npm run dev
# Frontend: http://localhost:3000
```

### 3. Admin Kirishi
```
Email: admin@sultonof.com
Password: admin123
```

## 📋 Admin Panel Funksiyalari

### 👥 Xodimlar Boshqaruvi
- ➕ Yangi xodim qo'shish
- ✏️ Tahrirlash
- 🗑️ O'chirish
- 🔍 Qidiruv va Sorting
- 📊 **Har xodim uchun 3 tilda kiritish:**
  - Ismi (UZ, RU, EN)
  - Lavozimi (UZ, RU, EN)
  - Rasm (1 ta, preview bilan)
  - Statistika (Loyihalar, Tajriba, Qoniqtirish %)

### ℹ️ Kompaniya Haqida
- 📝 Sarlavha, Tavsifi, Tarixi (3 tilda)
- 🖼️ Galereyada rasmlar qo'shish
- 🏆 Yutuqlar va erishgan natijalari

### 📦 Portfolio (Loyihalar)
- 📋 Yangi loyiha qo'shish
- ✏️ Tahrirlash
- 🗑️ O'chirish
- 📸 Ko'p rasmlar yuklash
- 📊 **Har loyiha uchun 3 tilda:**
  - Nomi (UZ, RU, EN)
  - Tavsifi (UZ, RU, EN)
  - Toifa (UZ, RU, EN)
  - Holati (UZ, RU, EN)

## 📂 Loyiha Struktura

```
sultonof-campaign/
├── backend/
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Employee.js
│   │   ├── About.js
│   │   └── Project.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── employeeController.js
│   │   ├── aboutController.js
│   │   └── projectController.js
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── EmployeeManagement.jsx
│   │   │   ├── AboutManagement.jsx
│   │   │   └── ProjectManagement.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── styles/
│   │   ├── services/api.js
│   │   ├── translations.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── INSTALLATION_GUIDE.md
└── README.md
```

## 🎨 Dizayn Xususiyatlari

- **Light Mode** ✨
- **Pastel Ranglar:**
  - `#a8d8ff` (Och ko'k)
  - `#ffc0d9` (Och pushti)
  - `#c0f0c0` (Och yashil)
  - `#fffacd` (Och sariq)
- **Responsiv** - Barcha cihazlarda ishlaydi
- **Modern UI** - Clean va Professional

## 🔧 API Endpoints

### Authentication
```
POST   /api/auth/login          - Admin kirish
POST   /api/auth/register       - Admin ro'yxatdan o'tish
```

### Employees
```
GET    /api/employees           - Barcha xodimlarni olish
POST   /api/employees           - Yangi xodim qo'shish
PUT    /api/employees/:id       - Xodimni tahrirlash
DELETE /api/employees/:id       - Xodimni o'chirish
```

### About
```
GET    /api/about               - Kompaniya ma'lumoti
PUT    /api/about               - Yangilash
DELETE /api/about/image         - Rasm o'chirish
```

### Projects
```
GET    /api/projects            - Barcha loyihalar
POST   /api/projects            - Yangi loyiha
PUT    /api/projects/:id        - Loyihani tahrirlash
DELETE /api/projects/:id        - Loyihani o'chirish
```

## 📖 Batafsil O'rnatish Qo'llanmasi

👉 **[INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)** - To'liq qo'llanma

## 🌍 Tillarni O'zgartirish

Yuqori o'ng burchakdagi **ComboBox** dan:
- **UZ** - O'zbek
- **RU** - Русский
- **EN** - English

Tilni o'zgartirganda saytdagi **barcha matnlar va admin kontenti** yangi tilga o'zgaradi!

## 🔐 Xavfsizlik

- JWT Token authentication
- Password hashing (bcryptjs)
- Protected admin routes
- CORS configuration

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Vercel-ga deploy qiling
```

### Backend (Heroku)
```bash
git push heroku main
```

## 📝 Litsenziya

MIT License

## 👨‍💻 Muallif

**Sultonof** - Full Stack Developer 🎯

---

**Sayt to'liq 3 tilda (Uzbek, Russian, English) ishlaydi!** 🌍✨

Bu loyiha "Sultonof" kampaniyasining professional boshqaruv platformasi!

### 🎁 Bonus Imkoniyatlari
- ✅ Search va Sorting
- ✅ Image Preview
- ✅ Modal Confirmation
- ✅ Responsive Images
- ✅ Light Mode Only
- ✅ Modern Gradients
- ✅ Smooth Animations
