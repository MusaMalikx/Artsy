import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
};

/*
Motion layout for the Registration page
*/
const RegistrationLayout = ({ children, title }) => {
  document.title = title + ' | Artsy';

  return (
    <div>
      <motion.article
        // initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.45, type: 'easeInOut' }}
        style={{ position: 'relative' }}>
        {children}
      </motion.article>
    </div>
  );
};

export default RegistrationLayout;
