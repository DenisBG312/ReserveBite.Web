import React from 'react';
import { motion } from 'framer-motion';
import aboupngt from '../../assets/images/about.png';
import { FaClock, FaUsers, FaCogs } from 'react-icons/fa';

const About = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 bg-primary w-full">
        {/* About ReserveBite */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-2 md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-3xl lg:text-4xl font-bold pr-8 text-txtPrimary mb-2">
                About ReserveBite
              </h2>
              <div className="relative flex items-center mb-4">
                <div className="h-1 w-40 bg-secondary rounded-b-full"></div>
              </div>

              <p className="text-txtSecondary text-lg leading-relaxed pr-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
                architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
                sequi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
                architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
                sequi.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe.
              </p>
            </div>

            {/* Icons Below Text in the Same Column */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <FaClock
                  className="text-5xl text-secondary mb-4 mx-auto transition-transform duration-300 hover:scale-110"
                />
                <h3 className="text-xl font-semibold text-txtPrimary mb-2">Fast Booking</h3>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <FaUsers
                  className="text-5xl text-secondary mb-4 mx-auto transition-transform duration-300 hover:scale-110"
                />
                <h3 className="text-xl font-semibold text-txtPrimary mb-2">Community</h3>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <FaCogs
                  className="text-5xl text-secondary mb-4 mx-auto transition-transform duration-300 hover:scale-110"
                />
                <h3 className="text-xl font-semibold text-txtPrimary mb-2">Easy to Use</h3>
              </motion.div>
            </div>
          </div>

          <div>
            <img
              src={aboupngt}
              className="rounded-full"
              alt="About ReserveBite"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
