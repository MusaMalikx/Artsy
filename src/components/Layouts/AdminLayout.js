import { motion } from 'framer-motion';
import Navigation from '../Dashboard/Admin/Navigation';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
};

const AdminLayout = ({ children, title }) => {
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
        <div className="fixed bottom-16 flex justify-center w-full">
          <Navigation />
        </div>
      </motion.article>
    </div>
  );
};

export default AdminLayout;
