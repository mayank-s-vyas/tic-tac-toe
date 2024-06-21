// readline 
// fs (file system)


class User {
  private static lastId: number = 0;
  private id: number;
  private name: string;
  private userName: string;
  private password: string;
  private isDeleted: boolean;

  constructor(name: string, userName: string, password: string) {
    User.lastId++;
    this.id = User.lastId;
    this.name = name;
    this.userName = userName;
    this.password = password;
    this.isDeleted = false;
  }

  
  addAccount() {};
  deleteAccount(){};
  updatePassword() {};
  updateName() {};
  // logIn(){};
  // logOut(){};

}

class Task {
  private static lastId: number = 0;
  private id: number;
  name: string;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  isDeleted: boolean = false;
  taskCompletionDate: Date;
  userId: number;

  constructor(name: string, taskCompletionDate: Date, userId: number) {

    Task.lastId ++;
    this.id = Task.lastId;
    this.name = name;
    this.taskCompletionDate = taskCompletionDate;
    this.userId = userId;
  }

  addTask() {}

  removeTask() {}

  updateTask() {}
}



