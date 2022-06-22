type User = {
  id: string;
  name: string;
  posts: Post[];
}

type Post = {
  id: string;
  text: string;
  user: User;
}

type Select<T> = {
  [key in keyof T]:
    T[key] extends Array<infer U> ? Select<Partial<U>> :
      T[key] extends object ? Select<Partial<T[key]>> :
        boolean;
};


const userSelect: Select<User> = {
  id: true,
  name: true,
  posts: {
    id: true,
    text: true
  }
}

const postSelect: Select<Post> = {
  id: true,
  text: true,
  user: {
    id: true,
    name: true
  }
}