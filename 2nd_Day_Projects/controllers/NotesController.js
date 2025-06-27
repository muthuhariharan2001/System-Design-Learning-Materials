let cache = {};

class NotesController {
    constructor(user) {
        this.user = user;
        this.notes = [];
    }

    isValidUser(user) {
        return user && typeof user === 'string' && user.trim() !== '';
    }

    addNote(notesContent) {
        if (this.isValidUser(this.user)) {
            if (!cache[this.user]) {
                cache[this.user] = [];
            }
            this.notes.push(notesContent);
            cache[this.user].push(notesContent);
            return `Note added for ${this.user}: ${notesContent}`;
        }
        return "Invalid user";
    }

    getNotes() {
        if (this.isValidUser(this.user)) {
            if (cache[this.user] && cache[this.user].length > 0) {
                return cache[this.user];
            } else {
                return "No notes found for this user";
            }
        }
        return "User not authorized";
    }

    deleteNotes(noteIndex) {
        if (this.isValidUser(this.user) && noteIndex >= 0 && noteIndex < this.notes.length) {
            const removed = this.notes.splice(noteIndex, 1);
            cache[this.user] = this.notes; // Sync cache
            return `Note deleted: ${removed}`;
        }
        return "Invalid user or note index";
    }
}

module.exports = NotesController;
