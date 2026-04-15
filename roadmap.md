# Backend Learning Roadmap (Node.js + TS + Express + Postgres)

## 🎯 Mục tiêu

- Hiểu backend flow
- Xây dựng API thực tế
- Làm chủ SQL cơ bản
- Biết tổ chức code backend

---

## 📌 Project xuyên suốt

Personal Knowledge API

- Auth (login/register)
- Note CRUD
- Tag (many-to-many)
- Search / filter

---

# Phase 0 — Backend mindset (1-2 ngày)

## Mục tiêu

- Hiểu request → response flow
- Hiểu server là gì
- Chạy Express server

## Task

- ✅ Setup project Node + TypeScript
- ✅ Cài Express
- ✅ Tạo server chạy được (port 3000)
- ✅ Tạo API:
  - ✅ GET /health → trả "OK"
  - ✅ GET /notes → trả fake data

## Kiến thức cần hiểu

- req / res
- route
- JSON response

---

# Phase 1 — API không có DB (2-3 ngày)

## Mục tiêu

- Hiểu cách build API
- Làm CRUD cơ bản

## Task

- ✅ GET /notes
- ✅ GET /notes/:id
- ✅ POST /notes
- ✅ PUT /notes/:id
- ✅ DELETE /notes/:id

## Gợi ý

- Dùng array in-memory làm database giả

## Kiến thức cần hiểu

- route params vs query params
- status code (200, 201, 404, 400)
- body parsing

---

# Phase 2 — Database (PostgreSQL) (3-5 ngày)

## Mục tiêu

- Hiểu SQL cơ bản
- Kết nối Node với DB

## Task

- ✅ Cài PostgreSQL
- ✅ Tạo database
- ✅ Tạo bảng `notes`
- ✅ Viết SQL:
  - ✅ INSERT note
  - ✅ SELECT notes
  - ✅ UPDATE note
  - ✅ DELETE note
- ✅ Connect Node với Postgres
- ✅ Thay fake data bằng DB thật

## Kiến thức cần hiểu

- table / row
- primary key
- query SQL cơ bản

---

# Phase 3 — Structure backend (3-5 ngày)

## Mục tiêu

- Viết code có tổ chức
- Tách layer

## Structure

```
src/
  routes/
  controllers/
  services/
  repositories/
  db/
```

## Task

- [ ] Tách route ra file riêng
- [ ] Tách controller
- [ ] Tách service
- [ ] Tách repository (query DB)
- [ ] Xử lý error chung

## Kiến thức cần hiểu

- separation of concerns
- flow: route → controller → service → repo

---

# Phase 4 — Auth + Relations (5-7 ngày)

## Mục tiêu

- Backend có logic thật
- Hiểu quan hệ DB

## Task

- [ ] Tạo bảng users
- [ ] Register / login
- [ ] JWT auth
- [ ] Middleware auth
- [ ] Tạo bảng tags
- [ ] Tạo bảng note_tags (many-to-many)
- [ ] Gán tag cho note
- [ ] Query note theo tag

## Kiến thức cần hiểu

- many-to-many
- foreign key
- auth flow

---

# Phase 5 — Search + cải thiện (optional)

## Task

- [ ] Search note theo keyword
- [ ] Filter theo tag
- [ ] Pagination (limit, offset)

---

# 📘 Learning Rules

## ❗ Nguyên tắc

- Không hiểu → dừng → hỏi / debug
- Không học lan man
- Không optimize sớm

## 📓 Ghi chép (learning.md)

- lỗi gặp phải
- điều hiểu ra
- câu hỏi còn mơ hồ

---

# 🚀 Done khi:

- API chạy ổn
- DB design đúng
- Code có structure rõ
- Có thể giải thích flow backend
