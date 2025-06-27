# Here by I'm going to create a basic level Notes App using Python itself.

class Notes:
    def __init__(self, user):
        self.user = user
        self.users = []
        self.notesContent = []
    
    def authenticate(self):
        if self.user in self.users:
            print(f"Welcome back {self.user}!")
    
    def add_user(self):
        if self.user in self.users:
            print(f"User {self.user} already exists.")
        else:
            self.users.append(self.user)
            print(f"User {self.user} added successfully.")
        
    def add_note(self, note):
        if self.user not in self.users:
            print(f"User {self.user} does not exist. Please add the user first.")
        else:
            self.notesContent.append(note)
            print(f"Note added for {self.user}: {note}")
    
    # Hereby We have to link the notes with the user.
    def view_notes(self):
        if self.user not in self.users:
            print(f"User {self.user} does not exist. Please add the user first.")
        else:
            if not self.notesContent:
                print(f"No notes found for {self.user}.")
            else:
                print(f"Notes for {self.user}:")
                for note in self.notesContent:
                    print(f"- {note}")
    
    def delete_note(self, note):
        if self.user not in self.users:
            print(f"User {self.user} does not exist. Please add the user first.")
        else:
            if note in self.notesContent:
                self.notesContent.remove(note)
                print(f"Note deleted for {self.user}: {note}")
            else:
                print(f"Note not found for {self.user}: {note}")
# Example usage
if __name__ == "__main__":
    user = input("Enter your username: ")
    notes_app = Notes(user)
    
    notes_app.add_user()
    notes_app.authenticate()
    
    while True:
        action = input("Choose an action (add/view/delete/exit): ").strip().lower()
        
        if action == "add":
            note = input("Enter your note: ")
            notes_app.add_note(note)
        elif action == "view":
            notes_app.view_notes()
        elif action == "delete":
            note = input("Enter the note to delete: ")
            notes_app.delete_note(note)
        elif action == "exit":
            print("Exiting the Notes App. Goodbye!")
            break
        else:
            print("Invalid action. Please try again.")