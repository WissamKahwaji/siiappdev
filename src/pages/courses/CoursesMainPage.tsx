import MainHeader from "../../components/pages/courses/MainHeader";
import CoursesSection from "../../components/pages/courses/CoursesSection";
import TopCoursesCategories from "../../components/pages/courses/TopCoursesCategories";

const CoursesMainPage = () => {
  return (
    <div>
      <MainHeader />
      <CoursesSection />
      <TopCoursesCategories />
      <div className="h-10"></div>
    </div>
  );
};

export default CoursesMainPage;
