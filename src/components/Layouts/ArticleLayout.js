import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Footer from '../Footer/Footer';
import SideNav from '../SideNav/SideNav';
// import { useSelector } from 'react-redux';
// import { selectValue } from '../../redux/features/counter/counterReducer';

// const variants = {
//   hidden: { opacity: 0, x: 0, y: 20 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 0, x: 0, y: 20 }
// };

const ArticleLayout = ({ children, title, bool }) => {
  document.title = title + ' | Artsy';

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  // const count = useSelector(selectValue);
  // console.log(count);

  return (
    <div>
      <motion.article
        // initial={{ y: '50px', opacity: 0 }}
        // // initial="hidden"
        // animate={{ opacity: 1, y: '0px' }}
        // transition={{
        //   type: 'tween',
        //   duration: 1,
        //   repeat: 0
        // }}
        // variants={variants}
        style={{ position: 'relative' }}>
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
