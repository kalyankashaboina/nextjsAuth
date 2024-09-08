// components/Navbar.js
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utilis/config';
import { signOut } from 'firebase/auth';
import styles from '../styles/Navbar.module.css'; // Adjust this to your CSS module path

const Navbar = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Successfully logged out");
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading indicator if needed

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>MyApp</div>
      <div className={styles.navLinks}>
        <a href="/" className={styles.navLink}>Home</a>
        <a href="/about" className={styles.navLink}>About</a>
        <a href="/contact" className={styles.navLink}>Contact</a>
        {user ? (
          <button onClick={handleLogout} className={styles.navLink}>
            Log Out
          </button>
        ) : (
          <a href="/login" className={styles.navLink}>Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
