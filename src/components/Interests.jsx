import React from 'react';

const interests = [
  {
    name: "Reading",
    description: "I enjoy reading about a variety of topics, from science fiction to historical non-fiction."
  },
  {
    name: "Hiking",
    description: "Exploring new trails and spending time in nature is one of my favorite ways to unwind."
  },
  {
    name: "Photography",
    description: "I love capturing moments and landscapes with my camera."
  },
    {
    name: "Cooking",
    description: "Experimenting with new recipes and cooking for friends and family is a passion of mine."
  }
];

const Interests = () => {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4 text-center">Interests</h2>
        <div className="row">
          {interests.map((interest, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{interest.name}</h5>
                  <p className="card-text">{interest.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-muted mt-4">
          Feel free to ask me more about my interests!
        </p>
      </div>
    </section>
  );
};

export default Interests;
