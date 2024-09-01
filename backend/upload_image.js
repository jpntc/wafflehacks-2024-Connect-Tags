const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const { doc, setDoc } = require("firebase/firestore");
const {fs} = require("fs");

// Function to upload the image to Firebase Storage and get download URL
async function uploadImageToFirebase(outputImagePath, name) {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${name}_avatar.png`);

  const imageBuffer = fs.readFileSync(outputImagePath);

  await uploadBytes(storageRef, imageBuffer);

  const imageURL = await getDownloadURL(storageRef);

  return imageURL;
}

// Function to save user data to Firestore
async function saveUserDataToFirestore(name, description, imageURL) {
  class User {
    constructor(name, description, imageURL) {
      this.name = name;
      this.description = description;
      this.imageURL = imageURL;
    }
    toString() {
      return `${this.name}: ${this.description}`;
    }
  }

  const UserConverter = {
    toFirestore: (user) => {
      return {
        name: user.name,
        description: user.description,
        imageURL: user.imageURL,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new User(data.name, data.description, data.imageURL);
    },
  };

  const user = new User(name, description, imageURL);
  const ref = doc(db, "users", name).withConverter(UserConverter);
  await setDoc(ref, user);
}
