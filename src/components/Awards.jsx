import React from 'react';

const awards = [
  {
    name: "Samsung Semiconductor Fellow Scholarship",
    date: "Jan 2026"
  },
  {
    name: "Deans List - College of Engineering, 4.0 GPA",
    date: "Spring Semester 2025"
  }
];

const Awards = () => {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4">Awards and Recognition</h2>
        <ul className="list-group">
          {awards.map((award, index) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
              {award.name}
              <span className="badge bg-primary rounded-pill">{award.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Awards;
