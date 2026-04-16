export function parseNoteIdParam(id: string | undefined): number | null {
    if (id === undefined) return null;
    const noteId = Number(id);
    return Number.isInteger(noteId) && noteId > 0 ? noteId : null;
}

type ValidateNoteResult = { ok: true; title: string; content: string } | { ok: false; message: string };

export function validateNoteBody(title: unknown, content: unknown): ValidateNoteResult {
    if (title == null || content == null) {
        return { ok: false, message: 'Title and content are required' };
    }
    if (typeof title !== 'string' || typeof content !== 'string') {
        return { ok: false, message: 'Title and content must be strings' };
    }
    const normalizedTitle = title.trim();
    const normalizedContent = content.trim();
    if (normalizedTitle.length === 0 || normalizedContent.length === 0) {
        return { ok: false, message: 'Title and content must not be empty' };
    }
    if (normalizedTitle.length > 100 || normalizedContent.length > 1000) {
        return {
            ok: false,
            message: 'Title and content must be less than 100 and 1000 characters respectively',
        };
    }
    return { ok: true, title: normalizedTitle, content: normalizedContent };
}