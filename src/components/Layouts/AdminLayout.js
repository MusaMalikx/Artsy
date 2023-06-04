import { motion } from 'framer-motion';
import Navigation from '../Dashboard/Admin/Navigation';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
};

/*
Motion layout for the admin portal
*/
const AdminLayout = ({ children, title, bool }) => {
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
        <div className={`fixed ${bool ? 'top-3' : 'bottom-14'} flex justify-center w-full z-10`}>
          <Navigation bool={bool} />
        </div>
      </motion.article>
    </div>
  );
};

export default AdminLayout;
