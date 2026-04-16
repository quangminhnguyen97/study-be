# Backend Learning Roadmap (4 Weeks)

This roadmap is designed for steady progress with short sessions.

## Rules
- Study 25 minutes, break 5 minutes.
- One session = one small goal.
- End every session by updating `learning/LOG.md` and `learning/NEXT.md`.

## Week 1 - Express Basics
- Understand request/response lifecycle.
- Build simple CRUD routes for notes.
- Learn middleware order and `next()`.
- Add a global error handler.
- Practice status codes: `200`, `201`, `400`, `404`, `500`.

Done checklist:
- [ ] Create notes routes (`GET`, `POST`, `PUT`, `DELETE`)
- [ ] Add input validation for create/update
- [ ] Add error middleware and test one failure path

## Week 2 - Data Layer
- Connect to a database (MongoDB or PostgreSQL).
- Split layers: controller -> service -> repository.
- Add environment config (`.env`) and config module.
- Handle DB errors in a clean way.

Done checklist:
- [ ] Persist notes to DB
- [ ] Move logic from routes into service layer
- [ ] Add one migration or schema update

## Week 3 - Auth + Security Basics
- Implement login/register (basic version).
- Understand hashing passwords (bcrypt/argon2).
- Add auth middleware (JWT or session).
- Protect private routes.

Done checklist:
- [ ] Register + login endpoints
- [ ] Password hashing before save
- [ ] One protected route requires token

## Week 4 - Testing + Cleanup
- Write integration tests for critical endpoints.
- Add basic logging and request IDs.
- Refactor duplicated code.
- Prepare a mini release checklist.

Done checklist:
- [ ] Test success and error cases for core API
- [ ] Fix naming and folder structure inconsistencies
- [ ] Add API usage notes in `README.md`

## Graduation Task
Build a small "Notes API" with:
- CRUD notes
- Login/register
- Protected update/delete routes
- Basic tests

