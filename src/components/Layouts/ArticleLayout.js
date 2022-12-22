import { motion } from 'framer-motion';
import SideNav from '../SideNav/SideNav';

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
};

const ArticleLayout = ({ children, title, bool }) => {
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
        <div className="flex">
          <div className="flex flex-col">
            <SideNav />
          </div>
          <div className={`flex-grow ml-14 ${bool && 'container'}`}>{children}</div>
        </div>
      </motion.article>
    </div>
  );
};

export default ArticleLayout;
