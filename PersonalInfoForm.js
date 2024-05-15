import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAN-iGBlvsDA81SJYLx7pmgYwMz7udCK3U",
    authDomain: "introduction-4ff54.firebaseapp.com",
    projectId: "introduction-4ff54",
    storageBucket: "introduction-4ff54.appspot.com",
    messagingSenderId: "924430865940",
    appId: "1:924430865940:web:e366eb3636299f8dcf3901",
    measurementId: "G-G972CDWJ65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PersonalInfoForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [infoList, setInfoList] = useState([]);

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const fetchPersonalInfo = async () => {
    const q = query(collection(db, 'personal_info'));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => doc.data());
    setInfoList(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add personal information to Firestore
      const docRef = await addDoc(collection(db, 'personal_info'), {
        name: name,
        email: email,
        age: age
      });

      console.log('Document written with ID: ', docRef.id);

      // Reset form fields
      setName('');
      setEmail('');
      setAge('');

      // Fetch and update personal info list
      fetchPersonalInfo();
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <h2>Personal Information Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required /><br />
        <button type="submit">Save Information</button>
      </form>

      <h2>Personal Information List</h2>
      <ul>
        {infoList.map((info, index) => (
          <li key={index}>{info.name} - {info.email} - Age: {info.age}</li>
        ))}
      </ul>
    </div>
  );
};

export default PersonalInfoForm;
