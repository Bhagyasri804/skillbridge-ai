
import React from "react";

const categories = [
  "Java Programming",
  "Web Development",
  "Python",
  "Data Analysis",
  "UI/UX Design",
  "Communication Skills"
];

function SkillCategories() {
  return (
    <section style={{ padding: "30px", textAlign: "center" }}>
      <h2>Explore Skill Categories</h2>
      <p>Learn a skill or share your knowledge with others.</p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "15px"
      }}>
        {categories.map((category) => (
          <div
            key={category}
            style={{
              padding: "18px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              minWidth: "150px"
            }}
          >
            {category}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillCategories;
