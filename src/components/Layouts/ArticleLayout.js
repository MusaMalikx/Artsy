import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import SideNav from '../SideNav/SideNav';

/*
Motion layout for the article page
*/
const ArticleLayout = ({ children, title, bool }) => {
  document.title = title + ' | Artsy';

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <div>
      <motion.article style={{ position: 'relative' }}>
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-col">
            <SideNav />
          </div>
          <div className={`flex-grow min-h-screen ml-14 ${bool && 'container'}`}>{children}</div>
          <div className="ml-14">
            <Footer />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default ArticleLayout;
