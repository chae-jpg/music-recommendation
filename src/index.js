import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyDZTc4Y_fOTeET-5DZqw22NQP0tlsLmOpg",
   authDomain: "musicrec-3c2a5.firebaseapp.com",
   projectId: "musicrec-3c2a5",
   storageBucket: "musicrec-3c2a5.appspot.com",
   messagingSenderId: "1078897206763",
   appId: "1:1078897206763:web:840f0b3685fa9943c3e5ae",
   measurementId: "G-YJLP2ZH6PK"
 };
 import { QuerySnapshot, collection, setDoc } from "@firebase/firestore";

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 
 // Initialize Cloud Firestore and get a reference to the service
 const db = getFirestore(app);
 
 import { doc, getDoc, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(db, "song"));
let arr = [];
querySnapshot.forEach((doc) => {
  arr.push(doc.id);
})
const len = arr.length-1;
const idx = Math.floor(Math.random() * (len+1));
const docSnap = await getDoc(doc(db, 'song', arr[idx]));

 if (docSnap.exists()) {
    console.log(arr);
     console.log("Document data:", docSnap.data());
     // 앨범 커버
     var cover = document.createElement("img");
     var cover_link = docSnap.data().img_link;
     cover.src = cover_link;
     cover.className = "album_cover";
     var song_card = document.querySelector('.cover_div');
     cover.crossOrigin = 'Anonymous';
     song_card.appendChild(cover);
     //colorthief
     let colorThief = new ColorThief();
     // get color palette
     let color = null;
     if (cover.complete) {
       color = colorThief.getColor(cover);
       console.log("first", color);
       var body = document.querySelector('body');
       // set the background color
       body.style.backgroundColor = "rgb(" + color + ")";
       console.log("set body color", color);
      } else {
      cover.addEventListener('load', function() {
       color = colorThief.getColor(cover);
       console.log(color);
       var body = document.querySelector('body');
       // set the background color
       body.style.backgroundColor = "rgb(" + color + ")";
       console.log("set body color", color);
      });
     }

     
     
    //곡 텍스트
     var song_title = document.createElement("h1");
     song_title.textContent += docSnap.data().title;
     song_title.class = "song_text";
     var parent = document.querySelector(".song_text");
     var artist = document.createElement("h2");
     artist.textContent += docSnap.data().artist;
     artist.class = "song_text";
     parent.appendChild(song_title);
     parent.appendChild(artist);

    // 곡 링크

     
 } else {
  console.log(arr[idx]);
  console.log("no data recieved");
 }

