# Study Log

Use this template for each study session.

---

## YYYY-MM-DD
- Session target:
- What I built:
- What blocked me:
- Key takeaway:
- Next 3 small tasks:
  1)
  2)
  3)

---

## 2026-04-16
- Session target: Understand middleware flow and global error handling.
- What I built: Reviewed `src/server.ts`, traced route and middleware order.
- What blocked me: Still not fully clear how thrown async errors reach the handler.
- Key takeaway: Middleware order matters; register error handler after routes.
- Next 3 small tasks:
  1) Add/verify global error middleware behavior.
  2) Create one custom error class for bad request.
  3) Test one endpoint with invalid payload and confirm status code.

