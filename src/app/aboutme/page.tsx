"use client";
import React from "react";

export default function AboutMe() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Me</h1>
      <div style={styles.content}>
        <img
          src="/images/1704106455445.jpg" // Update the path to your image
          alt="Profile"
          style={styles.profileImage}
        />
        <div style={styles.text}>
          <p style={styles.paragraph}>
          ทวีศิลป์ ใจดี 653450509-5
          </p>
          <p style={styles.paragraph}>
           นั่งแก้โค้ดปวดหลังมากครับจาร
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center' as const,
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  profileImage: {
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    objectFit: 'cover' as const,
  },
  text: {
    maxWidth: '600px',
    lineHeight: '1.6',
    color: '#666',
  },
  paragraph: {
    marginBottom: '10px',
  },
};
