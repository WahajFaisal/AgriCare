import React from "react";
const OurTeam = () => {
    const teamMenbers = [
      {
        name: "Fassih Ul Hassan",
       // designation: "Founder - CEO",
        img: "/fassih.jpg",
      },
      {
        name: "Wahaj Faisal",
       // designation: "COO",
        img: "/wahaj.jpg",
      },
      {
        name: "Talha Naseer",
        //designation: "Marketing Head",
        img: "/talha.jpg",
      },
    ];
  
    return (
      <section className="bg-white py-20 ">
        <div className="w-[70%] mx-auto">
          <div className="flex flex-col gap-3 justify-center items-center w-[50%] mx-auto text-center">
            <h2 className="text-5xl text-gray-700 font-semibold ">Our Team</h2>
            <p className="text-gray-700 text-lg">
              We are comprised of experienced with passion for technology and
              commitment to customer satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-10 py-20">
            {teamMenbers.map((member) => {
              return (
                <div className="flex flex-col gap-5 justify-center items-center bg-gray-50 py-10 px-0">
                  <div>
                    <img src={member.img} alt={member.name} />
                  </div>
                  <div className="text-center flex flex-col gap-2">
                    <h1 className="text-3xl font-semibold text-gray-700">
                      {member.name}
                    </h1>
                    <h3 className="text-gray-700  text-lg">
                      {member.designation}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };
  
  export default OurTeam;